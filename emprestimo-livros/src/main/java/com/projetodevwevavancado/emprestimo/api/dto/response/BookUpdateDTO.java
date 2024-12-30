package com.projetodevwevavancado.emprestimo.api.dto.response;

import com.projetodevwevavancado.emprestimo.commons.enums.Genero;

import lombok.Builder;

@Builder
public record BookUpdateDTO(
    Long bookId, 
    String bookTitle, 
    String bookAuthor,
    String bookIsbn,
    Boolean bookAvailable, 
    Integer bookQuantity, 
    String publicationDate,
    Genero bookGenero
) {
}
