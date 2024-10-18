package com.projetodevwevavancado.emprestimo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.projetodevwevavancado.emprestimo.commons.util.BookToDtoUtil;
import com.projetodevwevavancado.emprestimo.entity.BookEntity;
import com.projetodevwevavancado.emprestimo.repository.BookRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {
	private final BookRepository bookRepository;

	public List<BookEntity> findAll() {
		return bookRepository.findAll();
	}

	public BookEntity findById(BookEntity entity) {
		return bookRepository.findById(entity.getId()).orElseThrow(() -> new RuntimeException("Livro não encontrado"));
	}

	public BookEntity findByTitle(String title) {
		List<BookEntity> allBooks = bookRepository.findAll();
		for (BookEntity book : allBooks) {
			if (book.getTitulo().equalsIgnoreCase(title)) {
				return book;
			}
		}
		return null;
	}

	public Void delete(BookEntity entity) {
		bookRepository.delete(findById(entity));
		return null;
	}
	
	public BookEntity save(BookEntity bookEntity) {
		return bookRepository.save(bookEntity);
	}

	public BookEntity saveOrUpdate(BookEntity bookEntity) {
		// Se o ID não for nulo, significa que estamos atualizando um registro existente
		if (bookEntity.getId() != null) {
			BookEntity existingBook = bookRepository.findById(bookEntity.getId()).orElseThrow(
					() -> new IllegalArgumentException("Livro não encontrado para o id: " + bookEntity.getId()));

			// Atualiza apenas os campos que não são nulos na entidade recebida
			if (bookEntity.getTitulo() != null) {
				existingBook.setTitulo(bookEntity.getTitulo());
			}
			if (bookEntity.getAutor() != null) {
				existingBook.setAutor(bookEntity.getAutor());
			}
			if (bookEntity.getDataPublicacao() != null) {
				existingBook.setDataPublicacao(bookEntity.getDataPublicacao());
			}
			if (bookEntity.getDisponivel() != null) {
				existingBook.setDisponivel(bookEntity.getDisponivel());
			}
			if (bookEntity.getIsbn() != null) {
				existingBook.setIsbn(bookEntity.getIsbn());
			}

			// Salva as alterações
			return bookRepository.save(existingBook);

		} else {
			// Para uma nova entidade, garante que todos os campos obrigatórios estão
			// preenchidos
			if (bookEntity.getTitulo() == null || bookEntity.getAutor() == null || bookEntity.getIsbn() == null) {
				throw new IllegalArgumentException("Campos obrigatórios não podem ser nulos para inserção.");
			}

			// Salva uma nova entidade
			return bookRepository.save(bookEntity);
		}
	}

}
