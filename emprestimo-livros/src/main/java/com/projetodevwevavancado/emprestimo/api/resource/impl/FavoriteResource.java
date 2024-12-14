package com.projetodevwevavancado.emprestimo.api.resource.impl;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetodevwevavancado.emprestimo.api.dto.request.FavoriteRequestDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.FavoriteResponseByUserDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.FavoriteResponseDTO;
import com.projetodevwevavancado.emprestimo.api.resource.swagger.FavoriteResourceApi;
import com.projetodevwevavancado.emprestimo.commons.util.ApiResponse;
import com.projetodevwevavancado.emprestimo.entity.FavoriteEntity;
import com.projetodevwevavancado.emprestimo.service.FavoriteService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/favorites")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Tag(name = "Favoritos")
public class FavoriteResource implements FavoriteResourceApi {

	private final FavoriteService favoriteService;

	@PostMapping("/add")
	public ResponseEntity<FavoriteResponseDTO> addFavorito(@RequestBody FavoriteRequestDTO favorito) {
		FavoriteResponseDTO responseDTO = favoriteService.addFavorito(favorito);
		return ResponseEntity.ok(responseDTO);
	}

	@DeleteMapping("/delete/favorite/{idUsuario}/{idLivro}")
	public ResponseEntity<ApiResponse> removeFavorite(@PathVariable Long idUsuario, @PathVariable Long idLivro) {
		try {
			favoriteService.deleteFavorito(idUsuario, idLivro);
			ApiResponse response = new ApiResponse("Favorito deletado com sucesso", true);
			return ResponseEntity.ok(response);
		} catch (IllegalArgumentException e) {
			ApiResponse response = new ApiResponse(e.getMessage(), false);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		} catch (Exception e) {
			ApiResponse response = new ApiResponse("Erro ao deletar favorito. Tente novamente mais tarde.", false);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@GetMapping("/usuario/{usuarioId}")
	public ResponseEntity<FavoriteResponseByUserDTO> findFavoritosByUsuario(@PathVariable Long usuarioId) {
		FavoriteResponseByUserDTO responseDTO = favoriteService.findFavoritosByUsuario(usuarioId);
		return ResponseEntity.ok(responseDTO);
	}

	@GetMapping
	public ResponseEntity<List<FavoriteEntity>> getAll() {
		return ResponseEntity.ok(favoriteService.findAll());
	}

}
