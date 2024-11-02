package com.projetodevwevavancado.emprestimo.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoanSearchRequestDTO {
	
	private String titulo;
	private String nomeUsuario;
}
