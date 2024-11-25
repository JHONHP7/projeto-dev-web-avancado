package com.projetodevwevavancado.emprestimo.api.resource.swagger;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.projetodevwevavancado.emprestimo.api.dto.request.LoanSearchRequestDTO;
import com.projetodevwevavancado.emprestimo.commons.util.ApiResponse;
import com.projetodevwevavancado.emprestimo.entity.LoanEntity;

import io.swagger.v3.oas.annotations.Operation;

public interface LoanResourceApi {

	@Operation(summary = "Criar empréstimo")
    public ResponseEntity<ApiResponse> createLoan(LoanEntity loanEntity);

    @Operation(summary = "Buscar lista de empréstimos")
    public ResponseEntity<List<LoanEntity>> findAll();

    @Operation(summary = "Marcar empréstimo como devolvido")
    public ResponseEntity<ApiResponse> markAsReturned(Long loanId);

    @Operation(summary = "Atualizar empréstimo")
    public ResponseEntity<ApiResponse> updateLoan(LoanEntity loanEntity);

    @Operation(summary = "Buscar empréstimos pelo título do livro")
    public ResponseEntity<List<LoanEntity>> findByBookTitle(LoanSearchRequestDTO request);

    @Operation(summary = "Buscar empréstimos pelo nome do usuário")
    public ResponseEntity<List<LoanEntity>> findByUserName(LoanSearchRequestDTO request);
}
