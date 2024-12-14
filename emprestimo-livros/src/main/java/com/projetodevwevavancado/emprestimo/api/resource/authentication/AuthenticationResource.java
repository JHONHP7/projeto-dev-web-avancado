package com.projetodevwevavancado.emprestimo.api.resource.authentication;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.projetodevwevavancado.emprestimo.api.dto.request.authentication.AuthenticationDTO;
import com.projetodevwevavancado.emprestimo.api.dto.request.authentication.LoginResponseDTO;
import com.projetodevwevavancado.emprestimo.api.dto.request.authentication.RegisterDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.UserResponseDTO;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.AuthenticationFailedException;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.EmailAlreadyExistsException;
import com.projetodevwevavancado.emprestimo.commons.enums.UserRole;
import com.projetodevwevavancado.emprestimo.commons.util.ApiResponse;
import com.projetodevwevavancado.emprestimo.configuration.security.TokenService;
import com.projetodevwevavancado.emprestimo.entity.UserEntity;
import com.projetodevwevavancado.emprestimo.repository.UserRepository;
import com.projetodevwevavancado.emprestimo.service.AuthorizationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@Tag(name = "autenticação")
public class AuthenticationResource {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserRepository repository;

	@Autowired
	private TokenService tokenService;

	@Autowired
	private AuthorizationService authorizationService;

	@Operation(summary = "Fazer login e receber token JWT")
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody @Valid AuthenticationDTO data) {
		try {
			var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());

			var auth = authenticationManager.authenticate(usernamePassword);

			var token = tokenService.generateToken((UserEntity) auth.getPrincipal());

			return ResponseEntity.ok(new LoginResponseDTO(token));
		} catch (AuthenticationException e) {
			throw new AuthenticationFailedException("Usuário ou senha inválidos!");
		}
	}

	@Operation(summary = "Criar novo usuário")
	@PostMapping("/register")
	public ResponseEntity<ApiResponse> register(@RequestBody @Valid RegisterDTO register) {

		if (this.repository.findByEmail(register.email()) != null) {
			throw new EmailAlreadyExistsException("E-mail já está em uso!");
		}

		try {
			String encryptedPassword = new BCryptPasswordEncoder().encode(register.senha());
			UserEntity newUser = new UserEntity(register.nome(), register.email(), encryptedPassword, register.role());

			this.repository.save(newUser);
			ApiResponse response = new ApiResponse("Usuário cadastrado com sucesso", true);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			ApiResponse response = new ApiResponse("Erro ao cadastrar o usuário. Tente novamente mais tarde.", false);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@PostMapping("/google-login")
	public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request) {
		try {
			String token = request.get("token");
			if (token == null || token.isEmpty()) {
				return ResponseEntity.badRequest().body("Token is required.");
			}
			GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
					GoogleNetHttpTransport.newTrustedTransport(), GsonFactory.getDefaultInstance())
					.setAudience(Collections.singletonList("1080697336488-lqffnqk5lppnqkionbrnit6ubr0hpam6.apps.googleusercontent.com")).build();
			GoogleIdToken idToken = verifier.verify(token);
			if (idToken != null) {
				GoogleIdToken.Payload payload = idToken.getPayload();
				String email = payload.getEmail();
				String name = (String) payload.get("name");
				String role = "USER";
				if ("jhonatansilva@id.uff.br".equals(email)) {
					role = "ADMIN";
				}
				String senha = new BCryptPasswordEncoder().encode(email.split("@")[0]);
				UserEntity existingUser = (UserEntity) repository.findByEmail(email);
				if (existingUser != null) {
					String jwt = tokenService.generateToken(existingUser);
					return ResponseEntity.ok(new LoginResponseDTO(jwt));
				}
				UserEntity newUser = new UserEntity(name, email, senha, UserRole.valueOf(role));
				repository.save(newUser);
				String jwt = tokenService.generateToken(newUser);
				return ResponseEntity.ok(new LoginResponseDTO(jwt));
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Google token.");
			}
		} catch (GeneralSecurityException | IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error validating Google token.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
		}
	}

	@GetMapping("/usuario/logado")
	public ResponseEntity<UserResponseDTO> getAuthenticatedUserInfo() {
		try {
			UserEntity user = authorizationService.getAuthenticatedUser();
			UserResponseDTO response = UserResponseDTO.builder()
					.id(user.getId())
					.nome(user.getNome())
					.email(user.getEmail())
					.role(user.getRole()).build();
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

}