package com.projetodevwevavancado.emprestimo.api.resource.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.AuthenticationFailedException;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.EmailAlreadyExistsException;
import com.projetodevwevavancado.emprestimo.commons.util.ApiResponse;

@ControllerAdvice
public class ResourceExceptionHandler {

	@ExceptionHandler(EmailAlreadyExistsException.class)
	public ResponseEntity<ApiResponse> handleEmailAlreadyExistsException(EmailAlreadyExistsException ex) {
	    ApiResponse response = new ApiResponse(ex.getMessage(), false);
	    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@ExceptionHandler(AuthenticationFailedException.class)
	public ResponseEntity<ApiResponse> handleAuthenticationFailedException(AuthenticationFailedException ex) {
	    ApiResponse response = new ApiResponse(ex.getMessage(), false);
	    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiResponse> handleException(Exception ex) {
	    ApiResponse response = new ApiResponse("Ocorreu um erro interno. Tente novamente mais tarde.", false);
	    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	}

}
