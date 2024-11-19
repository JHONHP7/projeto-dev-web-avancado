package com.projetodevwevavancado.emprestimo.api.dto.request.authentication;

import com.projetodevwevavancado.emprestimo.commons.enums.UserRole;

public record RegisterDTO(String nome, String email, String senha, UserRole role) {

}
