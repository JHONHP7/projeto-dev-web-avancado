package com.projetodevwevavancado.emprestimo.entity;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "TB_LOAN", schema = "emprestimo")
@SequenceGenerator(sequenceName = "SE_LOAN", allocationSize = 1, name = "SEQ")
@AttributeOverrides({ @AttributeOverride(name = "id", column = @Column(name = "SQ_LOAN")) })
public class LoanEntity implements Serializable {

	private static final long serialVersionUID = 5880540814450443693L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "livro_id")
	private BookEntity livro;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "usuario_id")
	private UserEntity usuario;

	@JsonProperty("dataEmprestimo")
	private Date dataEmprestimo;

	@JsonProperty("dataDevolucao")
	private Date dataDevolucao;

	@JsonProperty("status")
	private String status;

	@PrePersist
	public void prePersist() {
		if (dataEmprestimo != null) {
			this.dataDevolucao = calcularDataDevolucao(dataEmprestimo);
		}
	}

	private Date calcularDataDevolucao(Date dataEmprestimo) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(dataEmprestimo);
		calendar.add(Calendar.DAY_OF_MONTH, 7);
		return calendar.getTime();
	}

	public LoanEntity(Long id, BookEntity livro, UserEntity usuario, Date dataEmprestimo, Date dataDevolucao,
			String status) {
		super();
		this.id = id;
		this.livro = livro;
		this.usuario = usuario;
		this.dataEmprestimo = dataEmprestimo;
		this.dataDevolucao = dataDevolucao;
		this.status = status;
	}

}