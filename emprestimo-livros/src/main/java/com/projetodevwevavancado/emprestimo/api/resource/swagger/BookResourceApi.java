package com.projetodevwevavancado.emprestimo.api.resource.swagger;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.projetodevwevavancado.emprestimo.api.dto.request.BookRequestDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.BookResponseDTO;
import com.projetodevwevavancado.emprestimo.entity.BookEntity;
import com.projetodevwevavancado.emprestimo.repository.BookRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

public interface BookResourceApi {

	@Operation(summary = "Criar livro")
	public ResponseEntity<BookEntity> save(@RequestBody BookEntity bookEntity);

	@Operation(summary = "Buscar lista de livros")
	public ResponseEntity<List<BookEntity>> findAll();

	@Operation(summary = "Deletar livro")
	public ResponseEntity<Void> delete(BookEntity bookEntity);

	@Operation(summary = "Update livro")
	public ResponseEntity<BookEntity> update(BookEntity bookEntity);

}
