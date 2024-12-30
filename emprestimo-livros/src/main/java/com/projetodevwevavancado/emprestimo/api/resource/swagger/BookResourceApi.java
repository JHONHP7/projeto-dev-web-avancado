package com.projetodevwevavancado.emprestimo.api.resource.swagger;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.projetodevwevavancado.emprestimo.api.dto.request.BookRequestByTitleDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.BookDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.BookResponseDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.BookUpdateDTO;
import com.projetodevwevavancado.emprestimo.entity.BookEntity;

import io.swagger.v3.oas.annotations.Operation;

public interface BookResourceApi {

	@Operation(summary = "Criar livro")
	public ResponseEntity<BookUpdateDTO> save(BookEntity bookEntity);

	@Operation(summary = "Buscar lista de livros")
	public ResponseEntity<List<BookResponseDTO>> findAll();

	@Operation(summary = "Deletar livro")
	public ResponseEntity<Void> delete(BookEntity bookEntity);

	@Operation(summary = "Update livro")
	public ResponseEntity<BookUpdateDTO> update(BookEntity bookEntity);

	@Operation(summary = "Update livro")
	public ResponseEntity<BookUpdateDTO> findById(Long id);


	@Operation(summary = "Buscar lista de livro por titulo")
	public ResponseEntity<List<BookDTO>> findBooksByTitle(BookRequestByTitleDTO title);
}
