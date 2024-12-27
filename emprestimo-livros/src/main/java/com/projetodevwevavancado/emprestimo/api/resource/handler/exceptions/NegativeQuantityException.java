package com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions;

public class NegativeQuantityException extends RuntimeException {
	private static final long serialVersionUID = -305009736399196727L;

	public NegativeQuantityException(String message) {
		super(message);
	}
}
