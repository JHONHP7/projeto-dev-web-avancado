package com.projetodevwevavancado.emprestimo.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Service;

import com.projetodevwevavancado.emprestimo.api.dto.response.BookDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.BookUpdateDTO;
import com.projetodevwevavancado.emprestimo.entity.BookEntity;
import com.projetodevwevavancado.emprestimo.repository.BookRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {
	private final BookRepository bookRepository;
	
	
	public BookDTO convertBookEntityToBookDTO(BookEntity bookEntity) {
	    return new BookDTO(
	            bookEntity.getId(),
	            bookEntity.getTitulo(),
	            bookEntity.getAutor(),
	            bookEntity.getDisponivel(),
	            bookEntity.getQuantidadeExemplares()
	    );
	}
	
	public BookUpdateDTO mapToDTO(BookEntity entity) {
	    SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
	    sdf.setTimeZone(TimeZone.getTimeZone("GMT-3"));
	    return BookUpdateDTO.builder()
	        .bookId(entity.getId())
	        .bookTitle(entity.getTitulo())
	        .bookAuthor(entity.getAutor())
	        .bookIsbn(entity.getIsbn())
	        .bookAvailable(entity.getDisponivel())
	        .bookQuantity(entity.getQuantidadeExemplares())
	        .publicationDate(entity.getDataPublicacao() != null 
	            ? sdf.format(entity.getDataPublicacao()) 
	            : null)
	        .build();
	}





	public List<BookEntity> findAll() {
		return bookRepository.findAll();
	}

	public BookEntity findById(BookEntity entity) {
		return bookRepository.findById(entity.getId()).orElseThrow(() -> new RuntimeException("Livro não encontrado"));
	}
	

	public BookUpdateDTO findByBookById( Long id) {
		 BookEntity bookEntity = bookRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));
	        
	        return mapToDTO(bookEntity);
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
	        BookEntity existingBook = bookRepository.findById(bookEntity.getId())
	            .orElseThrow(() -> new IllegalArgumentException("Livro não encontrado para o id: " + bookEntity.getId()));

	        // Se a data de publicação não estiver nula, converta para o formato correto com o fuso horário
	        if (bookEntity.getDataPublicacao() != null) {
	            SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
	            sdf.setTimeZone(TimeZone.getTimeZone("GMT-3"));  // Define o fuso horário de Brasília

	            try {
	                Date parsedDate = sdf.parse(sdf.format(bookEntity.getDataPublicacao()));
	                existingBook.setDataPublicacao(parsedDate);
	            } catch (Exception e) {
	                throw new IllegalArgumentException("Erro ao formatar data de publicação");
	            }
	        }

	        BeanUtils.copyProperties(bookEntity, existingBook, getNullPropertyNames(bookEntity));
	        return bookRepository.save(existingBook);
	    } else {
	        if (bookEntity.getTitulo() == null || bookEntity.getAutor() == null || bookEntity.getIsbn() == null) {
	            throw new IllegalArgumentException("Campos obrigatórios não podem ser nulos para inserção.");
	        }

	        // Se a data de publicação não estiver nula, formate ela antes de salvar com o fuso horário correto
	        if (bookEntity.getDataPublicacao() != null) {
	            SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
	            sdf.setTimeZone(TimeZone.getTimeZone("GMT-3"));  // Define o fuso horário de Brasília
	            try {
	                Date parsedDate = sdf.parse(sdf.format(bookEntity.getDataPublicacao()));
	                bookEntity.setDataPublicacao(parsedDate);
	            } catch (Exception e) {
	                throw new IllegalArgumentException("Erro ao formatar data de publicação");
	            }
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
