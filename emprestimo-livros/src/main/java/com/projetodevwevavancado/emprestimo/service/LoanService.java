package com.projetodevwevavancado.emprestimo.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

import com.projetodevwevavancado.emprestimo.api.dto.request.LoanSaveRequestDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.LoanByUserResponseDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.LoanDTO;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.DuplicateLoanException;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.LoanLimitExceededException;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.ResourceNotFoundException;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.UserSuspendedException;
import com.projetodevwevavancado.emprestimo.commons.util.SuspendedUtil;
import com.projetodevwevavancado.emprestimo.entity.BookEntity;
import com.projetodevwevavancado.emprestimo.entity.LoanEntity;
import com.projetodevwevavancado.emprestimo.entity.UserEntity;
import com.projetodevwevavancado.emprestimo.repository.BookRepository;
import com.projetodevwevavancado.emprestimo.repository.LoanRepository;
import com.projetodevwevavancado.emprestimo.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoanService {

	private final UserRepository userRepository;
	private final LoanRepository loanRepository;
	private final BookRepository bookRepository;
	private static final String EMPRESTADO_STATUS = "Emprestado";

	public List<LoanDTO> findAll() {
		return loanRepository.findAll()
				.stream()
				.map(this::toLoanPageDTO)
				.toList();
	}

	public LoanEntity findById(Long id) {
		return loanRepository.findById(id).orElseThrow(() -> new RuntimeException("Empréstimo não encontrado"));
	}

	@Transactional
	public LoanEntity markAsReturned(Long loanId) throws ParseException {
		LoanEntity loan = findById(loanId);

		if ("Devolvido".equalsIgnoreCase(loan.getStatus())) {
			throw new IllegalStateException("Empréstimo já devolvido.");
		}

		Date today = new Date();

		// Atualiza a data de devolução do empréstimo para hoje
		// loan.setDataDevolucao(today);

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date dataAtualFormatada = sdf.parse(sdf.format(today));
		//Date dataDevolucaoEsperadaFormatada = sdf.parse(sdf.format(loan.getDataDevolucao()));

		if (dataAtualFormatada.after(loan.getDataDevolucao())) {
			long atrasoDias = calcularDiasAtraso(dataAtualFormatada, loan.getDataDevolucao());
			if (atrasoDias > 0) {
				UserEntity usuario = loan.getUsuario();
				Date novaSuspensao = SuspendedUtil.suspendForDays((int) atrasoDias);
				usuario.setSuspendedUntil(novaSuspensao);
				userRepository.save(usuario);
			}
		}

		loan.setStatus("Devolvido");

		BookEntity book = loan.getLivro();
		book.ajustarQuantidadeExemplares(1);
		bookRepository.save(book);

		return loanRepository.save(loan);
	}

	private long calcularDiasAtraso(Date dataAtual, Date dataDevolucaoEsperada) {
		long diff = dataAtual.getTime() - dataDevolucaoEsperada.getTime();
		return TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
	}

	public LoanEntity updateLoan(LoanEntity loanEntity) {

		LoanEntity entity = findById(loanEntity.getId());
		if (entity == null) {
			throw new IllegalArgumentException("Empréstimo com ID " + loanEntity.getId() + " não encontrado.");
		}

		atualizarCampos(entity, loanEntity);

		return loanRepository.save(entity);
	}

	private void atualizarCampos(LoanEntity entity, LoanEntity novosDados) {
		Optional.ofNullable(novosDados.getDataDevolucao()).ifPresent(entity::setDataDevolucao);
		Optional.ofNullable(novosDados.getDataEmprestimo()).ifPresent(entity::setDataEmprestimo);
		Optional.ofNullable(novosDados.getLivro()).ifPresent(entity::setLivro);
		Optional.ofNullable(novosDados.getUsuario()).ifPresent(entity::setUsuario);
		Optional.ofNullable(novosDados.getStatus()).ifPresent(entity::setStatus);
	}

	public List<LoanEntity> findByBookTitle(String titulo) {
		return loanRepository.findByBookTitle(titulo);
	}

	public List<LoanEntity> findByUserName(String nomeUsuario) {
		return loanRepository.findByUserName(nomeUsuario);
	}

	/**
	 * Renova o empréstimo por 7 dias, com limite de 2 renovações
	 * 
	 * @param loanId
	 * @return
	 */
	public LoanEntity renovarEmprestimo(Long loanId) {
		LoanEntity loan = loanRepository.findById(loanId)
				.orElseThrow(() -> new IllegalArgumentException("Empréstimo não encontrado"));

		if (loan.getRenovacoes() >= 2) {
			throw new LoanLimitExceededException("Limite de renovações atingido.");
		}

		if ("Devolvido".equals(loan.getStatus())) {
			throw new IllegalStateException("Empréstimo já foi devolvido, não pode ser renovado!");
		}

		// Verificar se pode renovar
		verificarDataRenovacao(loan);

		// Adicionar 7 dias à data de devolução
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(loan.getDataDevolucao());
		calendar.add(Calendar.DAY_OF_MONTH, 7);
		loan.setDataDevolucao(calendar.getTime());

		loan.setRenovacoes(loan.getRenovacoes() + 1);

		return loanRepository.save(loan);
	}

	/**
	 * Verifica se a data de devolução é igual à data atual
	 * 
	 * @param loan
	 */
	private void verificarDataRenovacao(LoanEntity loan) {
		Calendar hoje = Calendar.getInstance();
		Calendar dataDevolucao = Calendar.getInstance();
		dataDevolucao.setTime(loan.getDataDevolucao());

		if (hoje.get(Calendar.DAY_OF_MONTH) != dataDevolucao.get(Calendar.DAY_OF_MONTH) ||
				hoje.get(Calendar.MONTH) != dataDevolucao.get(Calendar.MONTH) ||
				hoje.get(Calendar.YEAR) != dataDevolucao.get(Calendar.YEAR)) {
			throw new LoanLimitExceededException("A renovação só pode ser feita no dia da devolução.");
		}
	}

	/**
	 * Converter DTOS
	 */
	public LoanDTO toLoanPageDTO(LoanEntity loanEntity) {
		return new LoanDTO(
				loanEntity.getId(),
				loanEntity.getLivro().getId(),
				loanEntity.getUsuario().getId(),
				loanEntity.getLivro().getTitulo(),
				loanEntity.getUsuario().getNome(),
				loanEntity.getUsuario().getEmail(),
				loanEntity.getDataEmprestimo(),
				loanEntity.getDataDevolucao(),
				loanEntity.getStatus());
	}

	/**
	 * Create Loan particionado com seu métodos auxiliares
	 */
	@Transactional
	public LoanEntity createLoan(LoanSaveRequestDTO loanRequestDTO) {
		UserEntity user = userRepository.findById(loanRequestDTO.idUser())
				.orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

		checkUserSuspension(user);
		checkActiveLoans(loanRequestDTO.idUser());
		checkDuplicateLoan(loanRequestDTO.idUser(), loanRequestDTO.idBook());

		BookEntity book = checkBookAvailability(loanRequestDTO.idBook());

		adjustBookExemplars(book);

		LoanEntity loanEntity = createLoanEntity(book, user);

		return loanRepository.save(loanEntity);
	}

	private void checkDuplicateLoan(Long userId, Long bookId) {
		boolean exists = loanRepository.existsByUsuarioIdAndLivroIdAndStatus(userId, bookId, EMPRESTADO_STATUS);
		if (exists) {
			throw new DuplicateLoanException("Usuário já possui um empréstimo ativo para este livro.");
		}
	}

	private void checkUserSuspension(UserEntity user) {
		if (user.getSuspendedUntil() != null) {
			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
			String formattedSuspendedUntil = sdf.format(user.getSuspendedUntil());
			System.out.println("A data de suspensão é: " + formattedSuspendedUntil);

			if (SuspendedUtil.isSuspended(user.getSuspendedUntil())) {
				throw new UserSuspendedException("Usuário está suspenso.", formattedSuspendedUntil);
			}
		}
	}

	private void checkActiveLoans(Long userId) {
		long activeLoans = loanRepository.countByUsuarioIdAndStatus(userId, EMPRESTADO_STATUS);
		if (activeLoans >= 2) {
			throw new IllegalStateException("Usuário já possui o limite de dois empréstimos ativos.");
		}
	}

	private BookEntity checkBookAvailability(Long bookId) {
		BookEntity book = bookRepository.findById(bookId)
				.orElseThrow(() -> new ResourceNotFoundException("Livro não encontrado"));

		if (Boolean.FALSE.equals(book.getDisponivel())) {
			throw new IllegalStateException("Livro não está disponível no momento.");
		}

		if (!book.temExemplaresDisponiveis() && book.getDisponivel()) {
			throw new IllegalStateException("Não há exemplares disponíveis para empréstimo.");
		}

		return book;
	}

	private void adjustBookExemplars(BookEntity book) {
		book.ajustarQuantidadeExemplares(-1);
		if (book.getQuantidadeExemplares() == 0) {
			book.setDisponivel(false);
		}
		bookRepository.save(book);
	}

	private LoanEntity createLoanEntity(BookEntity book, UserEntity user) {
		LoanEntity loanEntity = new LoanEntity();
		loanEntity.setLivro(book);
		loanEntity.setUsuario(user);
		loanEntity.setDataEmprestimo(new Date());
		loanEntity.setStatus(EMPRESTADO_STATUS);
		return loanEntity;
	}

	public List<LoanByUserResponseDTO> findByUserId(Long userId) {
		return loanRepository.findByUsuarioId(userId)
				.stream()
				.map(this::loanToLoanByUserResponseDTO)
				.toList();
	}

	public LoanByUserResponseDTO loanToLoanByUserResponseDTO(LoanEntity loanEntity) {
		return LoanByUserResponseDTO.builder()
				.loanId(loanEntity.getId())
				.bookTitle(loanEntity.getLivro().getTitulo())
				.dtDevolucao(loanEntity.getDataDevolucao())
				.nrRenovacoes(loanEntity.getRenovacoes())
				.bookStatus(loanEntity.getStatus())
				.build();
	}

}
