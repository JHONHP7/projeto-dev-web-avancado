package com.projetodevwevavancado.emprestimo.entity;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "TB_LOAN")
@SequenceGenerator(sequenceName = "SE_LOAN", allocationSize = 1, name = "SEQ")
@AttributeOverrides({ @AttributeOverride(name = "id", column = @Column(name = "SQ_LOAN")) })
public class LoanEntity implements Serializable {

	private static final long serialVersionUID = 5880540814450443693L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "livro_id")
	private BookEntity livro;

	@ManyToOne
	@JoinColumn(name = "usuario_id")
	private UserEntity usuario;

	private Date dataEmprestimo;
	private Date dataDevolucao;
	private String status;

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