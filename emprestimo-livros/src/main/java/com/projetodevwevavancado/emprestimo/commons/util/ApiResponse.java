package com.projetodevwevavancado.emprestimo.commons.util;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiResponse {
    private String message;
    private boolean success;
}
