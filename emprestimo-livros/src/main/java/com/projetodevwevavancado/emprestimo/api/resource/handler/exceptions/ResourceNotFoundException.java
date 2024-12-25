package com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions;

public class ResourceNotFoundException extends RuntimeException {
  
	private static final long serialVersionUID = 1476612166074292317L;

	public ResourceNotFoundException(String message) {
        super(message);
    }
}