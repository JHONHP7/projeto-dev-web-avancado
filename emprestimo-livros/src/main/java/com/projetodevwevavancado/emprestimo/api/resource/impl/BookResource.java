package com.projetodevwevavancado.emprestimo.api.resource.impl;

import com.projetodevwevavancado.emprestimo.api.dto.request.BookRequestByTitleDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.BookDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.BookResponseDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.BookUpdateDTO;
import com.projetodevwevavancado.emprestimo.api.resource.swagger.BookResourceApi;
import com.projetodevwevavancado.emprestimo.entity.BookEntity;
import com.projetodevwevavancado.emprestimo.service.BookService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Tag(name = "Livros")
public class BookResource implements BookResourceApi {

	private final BookService bookService;

	 @PostMapping("/save")
	    public ResponseEntity<BookResponseDTO> save(@Valid @RequestBody BookEntity bookEntity) {
	        BookResponseDTO responseDTO = bookService.saveOrUpdateBook(bookEntity);
	        return ResponseEntity.ok(responseDTO);
	    }

	    @PutMapping("/update")
	    public ResponseEntity<BookResponseDTO> update(@Valid @RequestBody BookEntity bookEntity) {
	        BookResponseDTO updatedBookDTO = bookService.saveOrUpdateBook(bookEntity);
	        return ResponseEntity.ok(updatedBookDTO);
	    }

	@GetMapping
	public ResponseEntity<List<BookResponseDTO>> findAll() {
		
		List<BookResponseDTO> books = bookService.getAllBooks();
		return ResponseEntity.ok(books);
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
