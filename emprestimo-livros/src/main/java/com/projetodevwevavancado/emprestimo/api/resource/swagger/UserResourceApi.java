package com.projetodevwevavancado.emprestimo.api.resource.swagger;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.projetodevwevavancado.emprestimo.api.dto.response.UserResponseDTO;

import io.swagger.v3.oas.annotations.Operation;

public interface UserResourceApi {
	
	@Operation(summary = "Listar todos os usuários")
	public ResponseEntity<List<UserResponseDTO>> listAll();

}
