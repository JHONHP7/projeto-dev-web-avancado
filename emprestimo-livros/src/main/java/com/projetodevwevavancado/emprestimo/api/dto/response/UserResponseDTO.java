package com.projetodevwevavancado.emprestimo.api.dto.response;

import com.projetodevwevavancado.emprestimo.commons.enums.UserRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDTO {
	
	private Long id;
	private String nome;
	private String email;
	private UserRole role;
}
