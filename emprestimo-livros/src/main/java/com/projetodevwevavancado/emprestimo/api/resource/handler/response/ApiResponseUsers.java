package com.projetodevwevavancado.emprestimo.api.resource.handler.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponseUsers<T> {

	private T data;
	private String message;
    private boolean success;
    private int httpCode;
}
