package com.projetodevwevavancado.emprestimo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projetodevwevavancado.emprestimo.entity.LoanEntity;

@Repository
public interface LoanRepository extends JpaRepository<LoanEntity, Long> {

	public static final String FIND_BY_BOOK_TITLE = "SELECT l "
													+ "	FROM LoanEntity l"
													+ "	WHERE l.livro.titulo"
													+ "	LIKE %:titulo%";

	public static final String FIND_BY_USERBNAME = "SELECT l "
													+ "	FROM LoanEntity l"
													+ "	WHERE l.usuario.nome"
													+ "	LIKE %:nomeUsuario%";

	@Query(value = FIND_BY_BOOK_TITLE)
	List<LoanEntity> findByBookTitle(@Param("titulo") String titulo);

	@Query(value = FIND_BY_USERBNAME)
	List<LoanEntity> findByUserName(@Param("nomeUsuario") String nomeUsuario);

	@Query("SELECT COUNT(l) FROM LoanEntity l WHERE l.usuario.id = :userId AND l.status = :status")
	long countByUsuarioIdAndStatus(@Param("userId") Long userId, @Param("status") String status);

}
