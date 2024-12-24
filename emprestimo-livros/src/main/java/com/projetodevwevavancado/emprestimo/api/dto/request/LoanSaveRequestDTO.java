package com.projetodevwevavancado.emprestimo.api.dto.request;

import com.google.auto.value.AutoValue.Builder;

@Builder
public record LoanSaveRequestDTO(Long idUser, Long idBook) {

}
