package com.projetodevwevavancado.emprestimo.api.dto.response;

import com.projetodevwevavancado.emprestimo.commons.enums.UserRole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
	
	private String nome;
	private String email;
	private UserRole role;
}
