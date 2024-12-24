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

import com.projetodevwevavancado.emprestimo.api.dto.response.BookUpdateDTO;
import com.projetodevwevavancado.emprestimo.api.resource.swagger.BookResourceApi;
import com.projetodevwevavancado.emprestimo.entity.BookEntity;
import com.projetodevwevavancado.emprestimo.service.BookService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Tag(name = "Livros")
public class BookResource implements BookResourceApi {

	private final BookService bookService;

	@PostMapping("/save")
	public ResponseEntity<BookEntity> save(@RequestBody BookEntity bookEntity) {
		bookService.saveOrUpdate(bookEntity);
		return ResponseEntity.ok().build();
	}

	@PutMapping("/update")
	public ResponseEntity<BookEntity> update(@RequestBody BookEntity bookEntity) {
		BookEntity updatedBook = bookService.saveOrUpdate(bookEntity);
		return ResponseEntity.ok(updatedBook);
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

}
