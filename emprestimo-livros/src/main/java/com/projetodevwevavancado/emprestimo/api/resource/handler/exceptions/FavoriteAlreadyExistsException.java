package com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions;

public class FavoriteAlreadyExistsException extends RuntimeException {

	private static final long serialVersionUID = -808766829393909646L;

	public FavoriteAlreadyExistsException(String message) {
		super(message);
	}
}
