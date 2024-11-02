package com.projetodevwevavancado.emprestimo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.projetodevwevavancado.emprestimo.entity.BookEntity;
import com.projetodevwevavancado.emprestimo.entity.FavoriteEntity;
import com.projetodevwevavancado.emprestimo.entity.UserEntity;
import com.projetodevwevavancado.emprestimo.repository.FavoriteRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class FavoriteService {

	private final FavoriteRepository favoriteRepository;

	public FavoriteEntity addFavorito(UserEntity usuario, BookEntity livro) {
		FavoriteEntity favorito = new FavoriteEntity(usuario, livro);
		return favoriteRepository.save(favorito);
	}

	public void removeFavorito(FavoriteEntity favorito) {
		favoriteRepository.delete(favorito);
	}

	public List<FavoriteEntity> findFavoritosByUsuario(UserEntity usuario) {
		return favoriteRepository.findByUsuario(usuario);
	}

	public List<FavoriteEntity> findAll() {
		return favoriteRepository.findAll();
	}
}
