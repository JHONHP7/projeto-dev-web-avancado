package com.projetodevwevavancado.emprestimo.api.resource.swagger;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import com.projetodevwevavancado.emprestimo.api.dto.request.UserRequestDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.UserResponseDTO;
import com.projetodevwevavancado.emprestimo.api.resource.handler.response.ApiResponseUsers;
import com.projetodevwevavancado.emprestimo.commons.util.ApiResponse;
import com.projetodevwevavancado.emprestimo.entity.UserEntity;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;

public interface UserResourceApi {

	@Operation(summary = "Listar todos os usuários")
	ResponseEntity<ApiResponseUsers<List<UserResponseDTO>>> listAll();

	@Operation(summary = "Excluir usuário por ID")
	ResponseEntity<ApiResponse> deleteUser(Long id);

	@Operation(summary = "Atualizar usuário")
	public ResponseEntity<ApiResponseUsers<UserResponseDTO>> updateUser(UserRequestDTO userRequest);

}
