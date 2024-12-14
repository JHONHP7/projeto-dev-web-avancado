package com.projetodevwevavancado.emprestimo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projetodevwevavancado.emprestimo.entity.FavoriteEntity;
import com.projetodevwevavancado.emprestimo.entity.UserEntity;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, Long> {

	List<FavoriteEntity> findByUsuario(UserEntity usuario);
	
	Optional<FavoriteEntity> findByUsuarioIdAndLivroId(Long idUser, Long idBook);

}
