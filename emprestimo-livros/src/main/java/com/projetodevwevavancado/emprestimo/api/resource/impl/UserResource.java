package com.projetodevwevavancado.emprestimo.api.resource.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetodevwevavancado.emprestimo.api.dto.response.UserResponseDTO;
import com.projetodevwevavancado.emprestimo.api.resource.handler.response.ApiResponseUsers;
import com.projetodevwevavancado.emprestimo.api.resource.swagger.UserResourceApi;
import com.projetodevwevavancado.emprestimo.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserResource implements UserResourceApi {

	@Autowired
	private UserService userService;

	@GetMapping
	public ResponseEntity<ApiResponseUsers<List<UserResponseDTO>>> listAll() {
	    try {
	        List<UserResponseDTO> users = userService.listAll();

	        if (users.isEmpty()) {
	            ApiResponseUsers<List<UserResponseDTO>> response = new ApiResponseUsers<>(
	                null, 
	                "Nenhum usuário encontrado.", 
	                false, 
	                HttpStatus.NOT_FOUND.value()
	            );
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	        }

	        ApiResponseUsers<List<UserResponseDTO>> response = new ApiResponseUsers<>(
	            users, 
	            "Usuários listados com sucesso", 
	            true, 
	            HttpStatus.OK.value()
	        );
	        return ResponseEntity.ok(response);

	    } catch (Exception e) {
	        ApiResponseUsers<List<UserResponseDTO>> response = new ApiResponseUsers<>(
	            null, 
	            "Erro ao listar usuários. Tente novamente mais tarde.", 
	            false, 
	            HttpStatus.INTERNAL_SERVER_ERROR.value()
	        );
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	    }
	}




}
