package com.projetodevwevavancado.emprestimo.api.resource.swagger;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import com.projetodevwevavancado.emprestimo.api.dto.request.FavoriteRequestDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.FavoriteResponseByUserDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.FavoriteResponseDTO;
import com.projetodevwevavancado.emprestimo.commons.util.ApiResponse;
import com.projetodevwevavancado.emprestimo.entity.FavoriteEntity;

import io.swagger.v3.oas.annotations.Operation;

public interface FavoriteResourceApi {

	@Operation(summary = "Criar favorito")
	public ResponseEntity<FavoriteResponseDTO> addFavorito(FavoriteRequestDTO favorito);

	@Operation(summary = "Buscar favorito por usuário")
	public ResponseEntity<FavoriteResponseByUserDTO> findFavoritosByUsuario(Long idUsuario);

	@Operation(summary = "Deletar favorito")
	public ResponseEntity<ApiResponse> removeFavorite(Long idUser, Long idLivro);

	@Operation(summary = "Buscar todos os favorito")
	public ResponseEntity<List<FavoriteEntity>> getAll();

}
