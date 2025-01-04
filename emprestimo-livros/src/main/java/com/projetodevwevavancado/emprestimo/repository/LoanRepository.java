package com.projetodevwevavancado.emprestimo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projetodevwevavancado.emprestimo.entity.LoanEntity;

@Repository
public interface LoanRepository extends JpaRepository<LoanEntity, Long> {

	/*
	 * Strings de consultas
	 */
	public static final String FIND_BY_BOOK_TITLE = "SELECT l "
			+ "	FROM LoanEntity l"
			+ "	WHERE l.livro.titulo"
			+ "	LIKE %:titulo%";

	public static final String FIND_BY_USERBNAME = "SELECT l "
			+ "	FROM LoanEntity l"
			+ "	WHERE l.usuario.nome"
			+ "	LIKE %:nomeUsuario%";

	public static final String FIND_BY_USERID = "SELECT l "
			+ "	FROM LoanEntity l"
			+ "	WHERE l.usuario.id = :userId";

	public static final String FIND_BY_USERID_AND_STATUS = "SELECT CASE WHEN COUNT(l) > 0 THEN true ELSE false END "
			+ "FROM LoanEntity l "
			+ "WHERE l.usuario.id = :usuarioId "
			+ "AND l.livro.id = :livroId "
			+ "AND l.status = :status";


	/**
	 * Querys de consulta
	 */

	@Query(value = FIND_BY_BOOK_TITLE)
	List<LoanEntity> findByBookTitle(@Param("titulo") String titulo);

	@Query(value = FIND_BY_USERBNAME)
	List<LoanEntity> findByUserName(@Param("nomeUsuario") String nomeUsuario);

	@Query("SELECT COUNT(l) FROM LoanEntity l WHERE l.usuario.id = :userId AND l.status = :status")
	long countByUsuarioIdAndStatus(@Param("userId") Long userId, @Param("status") String status);

	@Query(value = FIND_BY_USERID_AND_STATUS)
	boolean existsByUsuarioIdAndLivroIdAndStatus(
			@Param("usuarioId") Long usuarioId,
			@Param("livroId") Long livroId,
			@Param("status") String status);

	@Query(value = FIND_BY_USERID)
	List<LoanEntity> findByUsuarioId(@Param("userId") Long userId);

}
