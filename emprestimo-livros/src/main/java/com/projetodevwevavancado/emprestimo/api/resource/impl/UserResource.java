package com.projetodevwevavancado.emprestimo.api.resource.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetodevwevavancado.emprestimo.api.dto.request.UserRequestDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.UserResponseDTO;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.DataNotFoundException;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.EmailAlreadyExistsException;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.ResourceNotFoundException;
import com.projetodevwevavancado.emprestimo.api.resource.handler.response.ApiResponseUsers;
import com.projetodevwevavancado.emprestimo.api.resource.swagger.UserResourceApi;
import com.projetodevwevavancado.emprestimo.commons.util.ApiResponse;
import com.projetodevwevavancado.emprestimo.service.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Tag(name = "usuários")
public class UserResource implements UserResourceApi {

	@Autowired
	private UserService userService;

	@GetMapping
	public ResponseEntity<ApiResponseUsers<List<UserResponseDTO>>> listAll() {
		try {
			List<UserResponseDTO> users = userService.listAll();

			if (users.isEmpty()) {
				ApiResponseUsers<List<UserResponseDTO>> response = new ApiResponseUsers<>(null,
						"Nenhum usuário encontrado.", false, HttpStatus.NOT_FOUND.value());
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
			}

			ApiResponseUsers<List<UserResponseDTO>> response = new ApiResponseUsers<>(users,
					"Usuários listados com sucesso", true, HttpStatus.OK.value());
			return ResponseEntity.ok(response);

		} catch (Exception e) {
			e.printStackTrace();

			ApiResponseUsers<List<UserResponseDTO>> response = new ApiResponseUsers<>(null,
					"Erro ao listar usuários. Tente novamente mais tarde.", false,
					HttpStatus.INTERNAL_SERVER_ERROR.value());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long id) {
		try {
			userService.deleteUser(id);
			ApiResponse response = new ApiResponse("Usuário excluído com sucesso.", true);
			return ResponseEntity.ok(response);
		} catch (DataNotFoundException e) {
			ApiResponse response = new ApiResponse(e.getMessage(), false);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		} catch (Exception e) {
			ApiResponse response = new ApiResponse("Erro ao excluir usuário. Tente novamente mais tarde.", false);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@PostMapping("/update")
	public ResponseEntity<ApiResponseUsers<UserResponseDTO>> updateUser(
			@RequestBody @Valid UserRequestDTO userRequest) {

		try {
			UserResponseDTO updatedUser = userService.updateUser(userRequest);

			ApiResponseUsers<UserResponseDTO> response = new ApiResponseUsers<>(updatedUser,
					"Usuário atualizado com sucesso.", true, HttpStatus.OK.value());
			return ResponseEntity.ok(response);

		} catch (DataNotFoundException e) {
			ApiResponseUsers<UserResponseDTO> response = new ApiResponseUsers<>(null, e.getMessage(), false,
					HttpStatus.NOT_FOUND.value());
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

		} catch (EmailAlreadyExistsException e) {
			ApiResponseUsers<UserResponseDTO> response = new ApiResponseUsers<>(null, e.getMessage(), false,
					HttpStatus.BAD_REQUEST.value());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

		} catch (Exception e) {
			ApiResponseUsers<UserResponseDTO> response = new ApiResponseUsers<>(null,
					"Erro ao atualizar usuário. Tente novamente mais tarde.", false,
					HttpStatus.INTERNAL_SERVER_ERROR.value());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@GetMapping("/email/{email}")
	public ResponseEntity<List<UserResponseDTO>> getAllByEmail(@PathVariable String email) {
		List<UserResponseDTO> usuarios = userService.findUserByEmail(email);

		if (usuarios == null || usuarios.isEmpty()) {
			throw new ResourceNotFoundException("Nenhum usuário encontrado com o e-mail fornecido: " + email);
		}

		return ResponseEntity.ok(usuarios);
	}

	@GetMapping("/{id}")
	public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {

		UserResponseDTO user = userService.findUserById(id);

		if (user == null) {
			throw new ResourceNotFoundException("Nenhum usuário encontrado com o id fornecido: " + id);
		}

		return ResponseEntity.ok(user);
	}
}
