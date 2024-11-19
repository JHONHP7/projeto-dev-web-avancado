package com.projetodevwevavancado.emprestimo.api.resource.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetodevwevavancado.emprestimo.api.dto.request.authentication.AuthenticationDTO;
import com.projetodevwevavancado.emprestimo.api.dto.request.authentication.LoginResponseDTO;
import com.projetodevwevavancado.emprestimo.api.dto.request.authentication.RegisterDTO;
import com.projetodevwevavancado.emprestimo.configuration.security.TokenService;
import com.projetodevwevavancado.emprestimo.entity.UserEntity;
import com.projetodevwevavancado.emprestimo.repository.UserRepository;

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

	@Operation(summary = "Fazer login e receber token JWT")
	@PostMapping("/login")
	public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {

		var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
		var auth = authenticationManager.authenticate(usernamePassword);

		var token = tokenService.generateToken((UserEntity) auth.getPrincipal());

		return ResponseEntity.ok(new LoginResponseDTO(token));
	}

	@Operation(summary = "Criar novo usuário")
	@PostMapping("/register")
	public ResponseEntity register(@RequestBody @Valid RegisterDTO register) {

		if (this.repository.findByEmail(register.email()) != null) {
			return ResponseEntity.badRequest().build();
		}

		String encryptedPassword = new BCryptPasswordEncoder().encode(register.senha());
		UserEntity newUser = new UserEntity(register.nome(), register.email(), encryptedPassword, register.role());

		this.repository.save(newUser);
		return ResponseEntity.ok().build();
	}
}