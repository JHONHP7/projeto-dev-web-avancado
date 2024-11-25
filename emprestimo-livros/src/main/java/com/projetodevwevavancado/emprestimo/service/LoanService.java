package com.projetodevwevavancado.emprestimo.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.projetodevwevavancado.emprestimo.entity.BookEntity;
import com.projetodevwevavancado.emprestimo.entity.LoanEntity;
import com.projetodevwevavancado.emprestimo.repository.BookRepository;
import com.projetodevwevavancado.emprestimo.repository.LoanRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoanService {

	private final LoanRepository loanRepository;
	private final BookRepository bookRepository;

	public List<LoanEntity> findAll() {
		return loanRepository.findAll();
	}

	public LoanEntity findById(Long id) {
		return loanRepository.findById(id).orElseThrow(() -> new RuntimeException("Empréstimo não encontrado"));
	}

	@Transactional
	public LoanEntity createLoan(LoanEntity loanEntity) {
		// Obtém o livro do repositório para garantir que todos os dados estejam
		// carregados
		BookEntity book = bookRepository.findById(loanEntity.getLivro().getId())
				.orElseThrow(() -> new IllegalArgumentException("Livro não encontrado"));

		// Obtenha a quantidade de exemplares disponíveis
		Integer quantidade = book.getQuantidadeExemplares();

		// Verifica se há exemplares disponíveis
		if (!book.temExemplaresDisponiveis()) {
			throw new IllegalArgumentException("Não há exemplares disponíveis para empréstimo");
		}

		// Diminui a quantidade de exemplares
		book.ajustarQuantidadeExemplares(-1);
		bookRepository.save(book); // Salva a atualização do livro

		// Define a data do empréstimo e o status
		loanEntity.setDataEmprestimo(new Date());
		loanEntity.setStatus("Emprestado");
		loanEntity.setLivro(book); // Certifique-se de que o livro está atualizado no empréstimo

		return loanRepository.save(loanEntity);
	}

	@Transactional
	public LoanEntity markAsReturned(Long loanId) {
		LoanEntity loan = findById(loanId);

		// Verifica se o empréstimo já está marcado como devolvido
		if ("Devolvido".equalsIgnoreCase(loan.getStatus())) {
			throw new IllegalStateException("Empréstimo já devolvido.");
		}

		// Atualiza o status e a data de devolução
		loan.setStatus("Devolvido");
		loan.setDataDevolucao(new Date());

		// Aumenta a quantidade de exemplares do livro
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
}
