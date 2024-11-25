package com.projetodevwevavancado.emprestimo.api.resource.swagger;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.projetodevwevavancado.emprestimo.entity.BookEntity;

import io.swagger.v3.oas.annotations.Operation;

public interface BookResourceApi {

	@Operation(summary = "Criar livro")
	public ResponseEntity<BookEntity> save(BookEntity bookEntity);

	@Operation(summary = "Buscar lista de livros")
	public ResponseEntity<List<BookEntity>> findAll();

	@Operation(summary = "Deletar livro")
	public ResponseEntity<Void> delete(BookEntity bookEntity);

	@Operation(summary = "Update livro")
	public ResponseEntity<BookEntity> update(BookEntity bookEntity);

}
