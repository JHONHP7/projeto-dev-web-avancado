package com.projetodevwevavancado.emprestimo.api.resource.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetodevwevavancado.emprestimo.api.dto.response.UserResponseDTO;
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
	public ResponseEntity<List<UserResponseDTO>> listAll() {
		try {
			List<UserResponseDTO> users = userService.listAll();
			if (users.isEmpty()) {
				return ResponseEntity.noContent().build(); 
			}
			return ResponseEntity.ok(users); 
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

}
