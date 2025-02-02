package com.projetodevwevavancado.emprestimo.api.resource.handler;

import java.util.stream.Collectors;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.AuthenticationFailedException;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.DataNotFoundException;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.DuplicateLoanException;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.EmailAlreadyExistsException;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.FavoriteAlreadyExistsException;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.LoanLimitExceededException;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.NegativeQuantityException;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.ResourceNotFoundException;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.UserSuspendedException;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.ValidationException;
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

	@ExceptionHandler(DataAccessException.class)
	public ResponseEntity<ApiResponse> handleDataAccessException(DataAccessException ex) {
		ApiResponse response = new ApiResponse("Erro ao acessar o banco de dados. Tente novamente mais tarde.", false);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	}

	@ExceptionHandler(DataNotFoundException.class)
	public ResponseEntity<ApiResponse> handleDataNotFoundException(DataNotFoundException ex) {
		ApiResponse response = new ApiResponse(ex.getMessage(), false);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}

	@ExceptionHandler(FavoriteAlreadyExistsException.class)
	public ResponseEntity<ApiResponse> handleFavoriteAlreadyExistsException(FavoriteAlreadyExistsException ex) {
		ApiResponse response = new ApiResponse(ex.getMessage(), false);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse> handleResourceNotFoundException(ResourceNotFoundException ex) {
		ApiResponse response = new ApiResponse(ex.getMessage(), false);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}

	@ExceptionHandler(NegativeQuantityException.class)
	public ResponseEntity<ApiResponse> handleNegativeQuantityException(NegativeQuantityException ex) {
		ApiResponse response = new ApiResponse(ex.getMessage(), false);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@ExceptionHandler(UserSuspendedException.class)
	public ResponseEntity<ApiResponse> handleUserSuspendedException(UserSuspendedException ex) {
		String message = String.format("%s Suspenso até: %s.", ex.getMessage(), ex.getSuspendedUntil());

		ApiResponse response = new ApiResponse(message, false);
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
	}

	@ExceptionHandler(DuplicateLoanException.class)
	public ResponseEntity<ApiResponse> handleDuplicateLoanException(DuplicateLoanException ex) {
		ApiResponse response = new ApiResponse(ex.getMessage(), false);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@ExceptionHandler(ValidationException.class)
	public ResponseEntity<ApiResponse> handleValidationException(ValidationException ex) {
		String message = "Erro de validação: " + ex.getErrors().stream().collect(Collectors.joining(", "));
		ApiResponse response = new ApiResponse(message, false);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@ExceptionHandler(LoanLimitExceededException.class)
	public ResponseEntity<ApiResponse> handleLoanLimitExceededException(LoanLimitExceededException ex) {
		ApiResponse response = new ApiResponse(ex.getMessage(), false);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

}
