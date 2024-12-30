package com.projetodevwevavancado.emprestimo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projetodevwevavancado.emprestimo.api.dto.request.BookRequestByTitleDTO;
import com.projetodevwevavancado.emprestimo.entity.BookEntity;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, Long> {
	
	boolean existsByIsbn(String isbn);

	static final String FIND_QUANTIDADE_BY_ID_BOOK = "SELECT tb.quantidade_exemplares" 
													+ "	FROM emprestimo.tb_book tb"
													+ "	WHERE tb.sq_book = :idBook";

	@Query(value = FIND_QUANTIDADE_BY_ID_BOOK, nativeQuery = true)
	int findQuantidadeByIdBook(@Param("idBook") Long idBook);
	
	@Query(value = "SELECT * FROM emprestimo.tb_book tb WHERE tb.sq_book = :idBook", nativeQuery = true)
	BookEntity findBookById(@Param("idBook") Long idBook);

	@Query(value = "SELECT * FROM emprestimo.tb_book b WHERE LOWER(b.titulo) LIKE LOWER(:title)", nativeQuery = true)
	List<BookEntity> findBookAllBookByTitle(@Param("title") String title);


}