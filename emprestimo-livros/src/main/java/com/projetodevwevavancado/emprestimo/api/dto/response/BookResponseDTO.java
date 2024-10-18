package com.projetodevwevavancado.emprestimo.api.dto.response;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookResponseDTO {

    private String titulo;
    private String autor;
    private String isbn;
    private Boolean disponivel;
    private Date dataPublicacao;

}
