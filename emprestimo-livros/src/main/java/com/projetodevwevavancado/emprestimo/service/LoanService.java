package com.projetodevwevavancado.emprestimo.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.projetodevwevavancado.emprestimo.api.dto.request.LoanSaveRequestDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.LoanDTO;
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
	public LoanEntity createLoan(LoanSaveRequestDTO loanRequestDTO) {
	    UserEntity user = userRepository.findById(loanRequestDTO.idUser())
	        .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

	    long activeLoans = loanRepository.countByUsuarioIdAndStatus(loanRequestDTO.idUser(), "Emprestado");
	    if (activeLoans >= 2) {
	        throw new IllegalStateException("Usuário já possui o limite de dois empréstimos ativos.");
	    }

	    BookEntity book = bookRepository.findById(loanRequestDTO.idBook())
	        .orElseThrow(() -> new IllegalArgumentException("Livro não encontrado"));
	    
	    if(Boolean.FALSE.equals(book.getDisponivel())) {
	    	throw new IllegalArgumentException("Livro não está disponível no momento.");
	    }

	    if (!book.temExemplaresDisponiveis() && book.getDisponivel()) {
	        throw new IllegalArgumentException("Não há exemplares disponíveis para empréstimo.");
	    }


	    book.ajustarQuantidadeExemplares(-1);

	    if (book.getQuantidadeExemplares() == 0) {
	        book.setDisponivel(false);
	    }
	    bookRepository.save(book);

	    LoanEntity loanEntity = new LoanEntity();
	    loanEntity.setLivro(book);
	    loanEntity.setUsuario(user);
	    loanEntity.setDataEmprestimo(new Date());
	    loanEntity.setStatus("Emprestado");

	    return loanRepository.save(loanEntity);
	}



	@Transactional
	public LoanEntity markAsReturned(Long loanId) {
		LoanEntity loan = findById(loanId);

		if ("Devolvido".equalsIgnoreCase(loan.getStatus())) {
			throw new IllegalStateException("Empréstimo já devolvido.");
		}

		loan.setStatus("Devolvido");
		loan.setDataDevolucao(new Date());

		BookEntity book = loan.getLivro();
		book.ajustarQuantidadeExemplares(1);
		bookRepository.save(book);

		return loanRepository.save(loan);
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
	 * @param loanId
	 * @return
	 */
    public LoanEntity renovarEmprestimo(Long loanId) {
    	
        LoanEntity loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new IllegalArgumentException("Empréstimo não encontrado"));

        if (loan.getRenovacoes() >= 2) {
            throw new IllegalStateException("Limite de renovações atingido");
        }
        if ("Devolvido".equals(loan.getStatus())) {
        	System.out.println("O status  eh: " + loan.getStatus());
            throw new IllegalStateException("Empréstimo já foi devolvido, não pode ser renovado!");
        }

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(loan.getDataDevolucao());
        calendar.add(Calendar.DAY_OF_MONTH, 7);
        loan.setDataDevolucao(calendar.getTime());

        loan.setRenovacoes(loan.getRenovacoes() + 1);

        return loanRepository.save(loan);
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
	        loanEntity.getDataEmprestimo(),
	        loanEntity.getDataDevolucao(),
	        loanEntity.getStatus()
	    );
	}

}
