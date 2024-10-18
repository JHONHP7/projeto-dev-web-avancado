package com.projetodevwevavancado.emprestimo.api.dto.request;

import java.util.Date;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookRequestDTO {
	
	private Long id;

    @NotBlank(message = "O título é obrigatório.")
    private String titulo;

    @NotBlank(message = "O autor é obrigatório.")
    private String autor;

    @NotBlank(message = "O ISBN é obrigatório.")
    private String isbn;

    @NotNull(message = "A disponibilidade é obrigatória.")
    private Boolean disponivel;

    @NotNull(message = "A data de publicação é obrigatória.")
    private Date dataPublicacao;
}
