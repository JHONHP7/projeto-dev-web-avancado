package com.projetodevwevavancado.emprestimo.api.resource.swagger;

import java.text.ParseException;
import java.util.List;

import org.springframework.http.ResponseEntity;

import com.projetodevwevavancado.emprestimo.api.dto.request.LoanSaveRequestDTO;
import com.projetodevwevavancado.emprestimo.api.dto.request.LoanSearchRequestDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.LoanByUserResponseDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.LoanDTO;
import com.projetodevwevavancado.emprestimo.commons.util.ApiResponse;
import com.projetodevwevavancado.emprestimo.entity.LoanEntity;

import io.swagger.v3.oas.annotations.Operation;

public interface LoanResourceApi {

	@Operation(summary = "Criar empréstimo")
	public ResponseEntity<ApiResponse> createLoan(LoanSaveRequestDTO loanRequestDTO);

	@Operation(summary = "Buscar lista de empréstimos")
	public ResponseEntity<List<LoanDTO>> findAll();

	@Operation(summary = "Marcar empréstimo como devolvido")
	public ResponseEntity<ApiResponse> markAsReturned(Long loanId) throws ParseException;

	@Operation(summary = "Atualizar empréstimo")
	public ResponseEntity<ApiResponse> updateLoan(LoanEntity loanEntity);

	@Operation(summary = "Buscar empréstimos pelo título do livro")
	public ResponseEntity<List<LoanEntity>> findByBookTitle(LoanSearchRequestDTO request);

	@Operation(summary = "Buscar empréstimos pelo nome do usuário")
	public ResponseEntity<List<LoanEntity>> findByUserName(LoanSearchRequestDTO request);

	@Operation(summary = "Renova empréstimos por 7 dias")
	public ResponseEntity<ApiResponse> renovarEmprestimo(Long loanId);

	@Operation(summary = "Buscar empréstimos por id do usuário")
	public ResponseEntity<List<LoanByUserResponseDTO>> findByUserId(Long userId);
}
