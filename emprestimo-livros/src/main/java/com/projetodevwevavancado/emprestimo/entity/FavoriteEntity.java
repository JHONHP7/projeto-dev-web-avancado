package com.projetodevwevavancado.emprestimo.entity;

import java.io.Serializable;

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
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
@Getter
@Setter
@Table(name = "TB_FAVORITE", schema = "emprestimo")
@SequenceGenerator(sequenceName = "SE_FAVORITE", allocationSize = 1, name = "SEQ")
@AttributeOverrides({ @AttributeOverride(name = "id", column = @Column(name = "SQ_FAVORITE")) })
public class FavoriteEntity implements Serializable {

	private static final long serialVersionUID = 2628467162047036953L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "usuario_id")
	private UserEntity usuario;

	@ManyToOne
	@JoinColumn(name = "livro_id")
	private BookEntity livro;

	public FavoriteEntity(UserEntity usuario, BookEntity livro) {
		super();
		this.usuario = usuario;
		this.livro = livro;
	}

}
