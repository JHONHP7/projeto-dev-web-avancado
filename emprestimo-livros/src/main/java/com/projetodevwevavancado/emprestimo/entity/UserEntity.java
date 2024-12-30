package com.projetodevwevavancado.emprestimo.entity;

import java.io.Serial;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.projetodevwevavancado.emprestimo.commons.enums.UserRole;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
public class UserEntity implements Serializable, UserDetails {

	@Serial
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

	@Column(name = "blocked_until")
	private Date suspendedUntil;

	@Enumerated(EnumType.STRING)
	@JsonProperty("role")
	private UserRole role;

	public UserEntity(Long id, String nome, String email, String senha, UserRole role) {
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

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		if (this.role == UserRole.ADMIN) {
			return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
		} else {
			return List.of(new SimpleGrantedAuthority("ROLE_USER"));
		}

	}

	@Override
	public String getPassword() {

		return senha;
	}

	@Override
	public String getUsername() {

		return email;
	}

	public UserEntity(String nome, String email, String senha, UserRole role) {
		super();
		this.nome = nome;
		this.email = email;
		this.senha = senha;
		this.role = role;
	}

	public UserEntity(Long id, String nome, String email, String senha, Date suspendedUntil, UserRole role) {
		super();
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.senha = senha;
		this.suspendedUntil = suspendedUntil;
		this.role = role;
	}

	public UserEntity(String nome, String email, String senha, Date suspendedUntil, UserRole role) {
		super();
		this.nome = nome;
		this.email = email;
		this.senha = senha;
		this.suspendedUntil = suspendedUntil;
		this.role = role;
	}

}
