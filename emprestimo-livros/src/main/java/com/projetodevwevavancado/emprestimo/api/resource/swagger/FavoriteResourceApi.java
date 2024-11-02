package com.projetodevwevavancado.emprestimo.api.resource.swagger;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.projetodevwevavancado.emprestimo.entity.FavoriteEntity;

import io.swagger.v3.oas.annotations.Operation;

public interface FavoriteResourceApi {

	@Operation(summary = "Criar favorito")
	public ResponseEntity<FavoriteEntity> addFavorito(FavoriteEntity favorito);

	@Operation(summary = "Buscar favorito por usuário")
	public ResponseEntity<List<FavoriteEntity>> findFavoritosByUsuario(Long idUsuario);

	@Operation(summary = "Deletar favorito")
	public ResponseEntity<Void> removeFavorito(FavoriteEntity favorito);

	@Operation(summary = "Buscar todos os favorito")
	public ResponseEntity<List<FavoriteEntity>> getAll();

}
