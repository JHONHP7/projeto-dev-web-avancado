package com.projetodevwevavancado.emprestimo.entity;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "TB_BOOK", schema = "emprestimo")
@SequenceGenerator(sequenceName = "SE_BOOK", allocationSize = 1, name = "SEQ")
@AttributeOverrides({ @AttributeOverride(name = "id", column = @Column(name = "SQ_BOOK")) })
public class BookEntity implements Serializable {

	private static final long serialVersionUID = -8159949584762850570L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("id")
	private Long id;

	@JsonProperty("titulo")
	private String titulo;

	@JsonProperty("autor")
	private String autor;

	@JsonProperty("isbn")
	private String isbn;

	@JsonProperty("disponivel")
	private Boolean disponivel;

	@Min(0)
	@JsonProperty("quantidadeExemplares")
	private Integer quantidadeExemplares;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy", timezone = "GMT-3")
	@Temporal(TemporalType.DATE)
	private Date dataPublicacao;

	/**
	 * Método auxiliar para verificar se há exemplares disponíveis
	 * @return
	 */
	public boolean temExemplaresDisponiveis() {
		return this.quantidadeExemplares != null && this.quantidadeExemplares > 0;
	}

	/**
	 *  Método auxiliar para ajustar a quantidade de exemplares
	 * @param ajuste
	 */
	public void ajustarQuantidadeExemplares(int ajuste) {
		if (this.quantidadeExemplares != null) {
			this.quantidadeExemplares += ajuste;
			this.disponivel = this.quantidadeExemplares > 0;
		}
	}

}