package com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions;

public class EmailAlreadyExistsException extends RuntimeException {
	
    private static final long serialVersionUID = 2159496904246663798L;

	public EmailAlreadyExistsException(String message) {
        super(message);
    }
}
