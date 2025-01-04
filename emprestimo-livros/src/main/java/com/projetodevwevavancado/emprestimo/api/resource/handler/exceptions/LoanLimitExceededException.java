package com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions;

public class LoanLimitExceededException extends RuntimeException {
    
    public LoanLimitExceededException(String message) {
        super(message);
    }
}