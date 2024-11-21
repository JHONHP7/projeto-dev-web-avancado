package com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions;

public class DataNotFoundException extends RuntimeException {
	
    private static final long serialVersionUID = -1262326125486425296L;

	public DataNotFoundException(String message) {
        super(message);
    }
}