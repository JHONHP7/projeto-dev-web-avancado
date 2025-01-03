package com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions;

import java.util.List;

public class ValidationException extends RuntimeException {

	private static final long serialVersionUID = -7099661194599634525L;
	private List<String> errors;

	public ValidationException(List<String> errors) {
		super("Erro de validação");
		this.errors = errors;
	}

	public List<String> getErrors() {
		return errors;
	}

	public void setErrors(List<String> errors) {
		this.errors = errors;
	}
}