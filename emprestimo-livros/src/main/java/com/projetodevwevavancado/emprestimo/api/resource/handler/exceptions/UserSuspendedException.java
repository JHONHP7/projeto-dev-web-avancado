package com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions;

public class UserSuspendedException extends RuntimeException {

    private static final long serialVersionUID = 5367030467094508022L;

    private final String suspendedUntil;

    public UserSuspendedException(String message, String suspendedUntil) {
        super(message);
        this.suspendedUntil = suspendedUntil;
    }

    public String getSuspendedUntil() {
        return suspendedUntil;
    }
}
