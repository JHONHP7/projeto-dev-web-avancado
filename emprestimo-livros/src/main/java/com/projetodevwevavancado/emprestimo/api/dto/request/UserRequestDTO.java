package com.projetodevwevavancado.emprestimo.api.dto.request;

import com.projetodevwevavancado.emprestimo.commons.enums.UserRole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDTO {

	private Long id;
	private String nome;
	private String email;
	private String password;
	private UserRole role;
}
