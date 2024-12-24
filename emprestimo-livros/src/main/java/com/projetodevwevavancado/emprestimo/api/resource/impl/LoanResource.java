package com.projetodevwevavancado.emprestimo.api.resource.impl;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetodevwevavancado.emprestimo.api.dto.request.LoanSaveRequestDTO;
import com.projetodevwevavancado.emprestimo.api.dto.request.LoanSearchRequestDTO;
import com.projetodevwevavancado.emprestimo.api.resource.swagger.LoanResourceApi;
import com.projetodevwevavancado.emprestimo.commons.util.ApiResponse;
import com.projetodevwevavancado.emprestimo.entity.LoanEntity;
import com.projetodevwevavancado.emprestimo.service.LoanService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/loans")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Tag(name = "Empréstimos")
public class LoanResource implements LoanResourceApi {

	private final LoanService loanService;

	@GetMapping
	public ResponseEntity<List<LoanEntity>> findAll() {
		return ResponseEntity.ok(loanService.findAll());
	}

	@PostMapping("/create")
	public ResponseEntity<ApiResponse> createLoan(@RequestBody LoanSaveRequestDTO loanRequestDTO) {
	    try {
	        LoanEntity createdLoan = loanService.createLoan(loanRequestDTO);
	        ApiResponse response = new ApiResponse("Empréstimo criado com sucesso!", true);
	        return ResponseEntity.ok(response);
	    } catch (Exception e) {
	        ApiResponse response = new ApiResponse("Erro ao criar empréstimo: " + e.getMessage(), false);
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	    }
	}


	@PutMapping("/return/{loanId}")
    public ResponseEntity<ApiResponse> markAsReturned(@PathVariable Long loanId) {
        try {
            LoanEntity returnedLoan = loanService.markAsReturned(loanId);
            ApiResponse response = new ApiResponse("Empréstimo marcado como devolvido com sucesso!", true);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse response = new ApiResponse("Erro ao marcar empréstimo como devolvido: " + e.getMessage(), false);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> updateLoan(@RequestBody LoanEntity loanEntity) {
        try {
            LoanEntity updatedLoan = loanService.updateLoan(loanEntity);
            ApiResponse response = new ApiResponse("Empréstimo atualizado com sucesso!", true);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse response = new ApiResponse("Erro ao atualizar empréstimo: " + e.getMessage(), false);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

	@PostMapping("/search-by-book")
	public ResponseEntity<List<LoanEntity>> findByBookTitle(@RequestBody LoanSearchRequestDTO request) {
		List<LoanEntity> loans = loanService.findByBookTitle(request.getTitulo());
		return ResponseEntity.ok(loans);
	}

	@PostMapping("/search-by-user")
	public ResponseEntity<List<LoanEntity>> findByUserName(@RequestBody LoanSearchRequestDTO request) {
		List<LoanEntity> loans = loanService.findByUserName(request.getNomeUsuario());
		return ResponseEntity.ok(loans);
	}

}
