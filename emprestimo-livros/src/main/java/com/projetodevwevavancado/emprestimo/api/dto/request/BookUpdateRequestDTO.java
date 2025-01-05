package com.projetodevwevavancado.emprestimo.api.dto.request;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.projetodevwevavancado.emprestimo.entity.BookEntity;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookUpdateRequestDTO {

	private Long id;
	private String titulo;
	private String autor;
	private Boolean disponivel;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone = "America/Sao_Paulo")
	@Temporal(TemporalType.DATE)
	private Date dataPublicacao;
	private int quantidadeExemplares;
	private String genero;
	
	public BookUpdateRequestDTO(BookEntity bookEntity) {
        this.id = bookEntity.getId();
        this.titulo = bookEntity.getTitulo();
        this.autor = bookEntity.getAutor();
        this.disponivel = bookEntity.getDisponivel();
        this.quantidadeExemplares = bookEntity.getQuantidadeExemplares();
        this.dataPublicacao = bookEntity.getDataPublicacao();
        this.genero = bookEntity.getGeneroNome();
    }
}
