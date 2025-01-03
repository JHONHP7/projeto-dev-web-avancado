package com.projetodevwevavancado.emprestimo.api.dto.response;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.projetodevwevavancado.emprestimo.entity.BookEntity;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookResponseDTO {

    private Long id;
    private String titulo;
    private String autor;
    private String isbn;
    private Boolean disponivel;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone = "America/Sao_Paulo")
    @Temporal(TemporalType.DATE)
    private Date dataPublicacao;
    private int quantidadeExemplares;
    private String genero;

    /**
     * Constructor for the BookResponseDTO class that converts a BookEntity object into a BookResponseDTO.
     * This initializes the fields of BookResponseDTO using the corresponding attributes of the BookEntity instance.
     * Construtor que aceita a entidade para conversão
     *
     * @param bookEntity the BookEntity instance containing the data to populate the BookResponseDTO fields
     */
    public BookResponseDTO(BookEntity bookEntity) {
        this.id = bookEntity.getId();
        this.titulo = bookEntity.getTitulo();
        this.autor = bookEntity.getAutor();
        this.isbn = bookEntity.getIsbn();
        this.disponivel = bookEntity.getDisponivel();
        this.quantidadeExemplares = bookEntity.getQuantidadeExemplares();
        this.dataPublicacao = bookEntity.getDataPublicacao();
        this.genero = bookEntity.getGeneroNome();
    }
}