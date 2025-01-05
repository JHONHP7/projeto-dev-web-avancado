package com.projetodevwevavancado.emprestimo.api.dto.response;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.projetodevwevavancado.emprestimo.commons.enums.Genero;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Builder;

@Builder
public record BookUpdateDTO(
    Long bookId, 
    String bookTitle, 
    String bookAuthor,
    String bookIsbn,
    Boolean bookAvailable, 
    Integer bookQuantity, 
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone = "America/Sao_Paulo")
    @Temporal(TemporalType.DATE)
    Date publicationDate,
    Genero bookGenero
) {
}
