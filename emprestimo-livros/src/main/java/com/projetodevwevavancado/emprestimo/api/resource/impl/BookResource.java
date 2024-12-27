package com.projetodevwevavancado.emprestimo.api.resource.impl;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetodevwevavancado.emprestimo.api.dto.request.BookRequestByTitleDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.BookDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.BookUpdateDTO;
import com.projetodevwevavancado.emprestimo.api.resource.swagger.BookResourceApi;
import com.projetodevwevavancado.emprestimo.entity.BookEntity;
import com.projetodevwevavancado.emprestimo.service.BookService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Tag(name = "Livros")
public class BookResource implements BookResourceApi {

	private final BookService bookService;

	@PostMapping("/save")
    public ResponseEntity<BookUpdateDTO> save(@Valid @RequestBody BookEntity bookEntity) {
        BookUpdateDTO responseDTO = bookService.saveOrUpdateBook(bookEntity);
        return ResponseEntity.ok(responseDTO); // Retorna diretamente o DTO
    }

	@PutMapping("/update")
	public ResponseEntity<BookUpdateDTO> update(@Valid @RequestBody BookEntity bookEntity) {
	    // Chama o método saveOrUpdate do serviço, que agora retorna um BookUpdateDTO
	    BookUpdateDTO updatedBookDTO = bookService.saveOrUpdateBook(bookEntity);
	    return ResponseEntity.ok(updatedBookDTO); // Retorna diretamente o BookUpdateDTO
	}


	@GetMapping
	public ResponseEntity<List<BookEntity>> findAll() {
		return ResponseEntity.ok(bookService.findAll());
	}

	@DeleteMapping("/delete")
	public ResponseEntity<Void> delete(@RequestBody BookEntity entity) {
		return ResponseEntity.ok(bookService.delete(entity));
	}

	@GetMapping("/{id}")
	public ResponseEntity<BookUpdateDTO> findById(@PathVariable Long id) {
		return ResponseEntity.ok(bookService.findByBookById(id));
	}

	@PostMapping("/title")
	public ResponseEntity<List<BookDTO>> findBooksByTitle(@RequestBody BookRequestByTitleDTO title) {
	    List<BookDTO> books = bookService.findBookAllBookById(title);
	    if (books.isEmpty()) {
	        return ResponseEntity.noContent().build();
	    }
	    return ResponseEntity.ok(books);
	}


}
