package com.projetodevwevavancado.emprestimo.api.resource.impl;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetodevwevavancado.emprestimo.api.resource.swagger.FavoriteResourceApi;
import com.projetodevwevavancado.emprestimo.entity.FavoriteEntity;
import com.projetodevwevavancado.emprestimo.entity.UserEntity;
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
	public ResponseEntity<FavoriteEntity> addFavorito(@RequestBody FavoriteEntity favorito) {
		FavoriteEntity savedFavorito = favoriteService.addFavorito(favorito.getUsuario(), favorito.getLivro());
		return ResponseEntity.ok(savedFavorito);
	}

	@DeleteMapping("/remove")
	public ResponseEntity<Void> removeFavorito(@RequestBody FavoriteEntity favorito) {
		favoriteService.removeFavorito(favorito);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/usuario/{usuarioId}")
	public ResponseEntity<List<FavoriteEntity>> findFavoritosByUsuario(@PathVariable Long usuarioId) {
		List<FavoriteEntity> favoritos = favoriteService.findFavoritosByUsuario(new UserEntity(usuarioId));
		return ResponseEntity.ok(favoritos);
	}

	@GetMapping
	public ResponseEntity<List<FavoriteEntity>> findAll() {
		return ResponseEntity.ok(favoriteService.findAll());
	}

}
