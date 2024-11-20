package com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions;

public class AuthenticationFailedException extends RuntimeException {
	
    private static final long serialVersionUID = -3585067944484895634L;

	public AuthenticationFailedException(String message) {
        super(message);
    }
}
