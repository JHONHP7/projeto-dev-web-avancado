package com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions;

public class DuplicateLoanException extends RuntimeException {

	private static final long serialVersionUID = -2544138857216840430L;

	public DuplicateLoanException(String message) {
		super(message);
	}
}
