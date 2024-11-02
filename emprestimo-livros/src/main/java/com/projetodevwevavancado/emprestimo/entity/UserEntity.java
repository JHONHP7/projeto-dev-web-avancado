package com.projetodevwevavancado.emprestimo.entity;

import java.io.Serializable;

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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "TB_USER", schema = "emprestimo")
@SequenceGenerator(sequenceName = "SE_USER", allocationSize = 1, name = "SEQ")
@AttributeOverrides({ @AttributeOverride(name = "id", column = @Column(name = "SQ_USER")) })
public class UserEntity implements Serializable {

	private static final long serialVersionUID = -391564656606632983L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JsonProperty("nome")
	private String nome;
	
	@JsonProperty("email")
	private String email;
	
	@JsonProperty("senha")
	private String senha;
	
	@JsonProperty("role")
	private String role;

	public UserEntity(Long id, String nome, String email, String senha, String role) {
		super();
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.senha = senha;
		this.role = role;
	}

	public UserEntity(Long id) {
		super();
		this.id = id;
	}
	
	

}
