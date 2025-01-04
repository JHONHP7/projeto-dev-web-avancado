package com.projetodevwevavancado.emprestimo.api.dto.response;

import lombok.Builder;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

@Builder
public record LoanByUserResponseDTO(
        Long loanId,
        String bookTitle,
        @JsonFormat(shape = Shape.STRING, pattern = "dd/MM/yyyy", timezone = "America/Sao_Paulo") Date dtDevolucao,
        int nrRenovacoes,
        String bookStatus) {
}
