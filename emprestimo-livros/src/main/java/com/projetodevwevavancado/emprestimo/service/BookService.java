package com.projetodevwevavancado.emprestimo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Service;

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
	    if (bookEntity.getId() != null) {
	        BookEntity existingBook = bookRepository.findById(bookEntity.getId()).orElseThrow(
	                () -> new IllegalArgumentException("Livro não encontrado para o id: " + bookEntity.getId()));

	        BeanUtils.copyProperties(bookEntity, existingBook, getNullPropertyNames(bookEntity));

	        return bookRepository.save(existingBook);
	    } else {
	        if (bookEntity.getTitulo() == null || bookEntity.getAutor() == null || bookEntity.getIsbn() == null) {
	            throw new IllegalArgumentException("Campos obrigatórios não podem ser nulos para inserção.");
	        }

	        return bookRepository.save(bookEntity);
	    }
	}

	private String[] getNullPropertyNames(Object source) {
	    final BeanWrapper src = new BeanWrapperImpl(source);
	    java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();
	    List<String> nullPropertyNames = new ArrayList<>();
	    for (java.beans.PropertyDescriptor pd : pds) {
	        if (src.getPropertyValue(pd.getName()) == null) {
	            nullPropertyNames.add(pd.getName());
	        }
	    }
	    return nullPropertyNames.toArray(new String[0]);
	}

}
