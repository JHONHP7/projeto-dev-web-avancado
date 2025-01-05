package com.projetodevwevavancado.emprestimo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.projetodevwevavancado.emprestimo.api.dto.request.FavoriteRequestDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.BookDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.FavoriteResponseByUserDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.FavoriteResponseDTO;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.FavoriteAlreadyExistsException;
import com.projetodevwevavancado.emprestimo.entity.BookEntity;
import com.projetodevwevavancado.emprestimo.entity.FavoriteEntity;
import com.projetodevwevavancado.emprestimo.entity.UserEntity;
import com.projetodevwevavancado.emprestimo.repository.BookRepository;
import com.projetodevwevavancado.emprestimo.repository.FavoriteRepository;
import com.projetodevwevavancado.emprestimo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class FavoriteService {

	static final String USER_NOT_FOUND = "Usuário não escontrado";
	static final String BOOK_NOT_FOUND = "Livro não escontrado";
	private final FavoriteRepository favoriteRepository;
	private final UserRepository userRepository;
	private final BookRepository bookRepository;

	public FavoriteResponseDTO addFavorito(FavoriteRequestDTO favorito) {
		
		if (favoriteRepository.findByUsuarioIdAndLivroId(favorito.idUsuario(), favorito.idLivro()).isPresent()) {
		    throw new FavoriteAlreadyExistsException("Este livro já está nos favoritos do usuário!");
		}

		UserEntity usuario = userRepository.findById(favorito.idUsuario())
				.orElseThrow(() -> new IllegalArgumentException(USER_NOT_FOUND));
		BookEntity livro = bookRepository.findById(favorito.idLivro())
				.orElseThrow(() -> new IllegalArgumentException(BOOK_NOT_FOUND));


		FavoriteEntity favorite = new FavoriteEntity(usuario, livro);
		FavoriteEntity savedFavorito = favoriteRepository.save(favorite);

		return FavoriteResponseDTO.builder().userName(savedFavorito.getUsuario().getNome())
				.title(savedFavorito.getLivro().getTitulo()).build();
	}

	public void removeFavorito(FavoriteEntity favorito) {
		favoriteRepository.delete(favorito);
	}

	public List<FavoriteEntity> findAll() {
		return favoriteRepository.findAll();
	}

	public FavoriteResponseByUserDTO findFavoritosByUsuario(Long id) {
		UserEntity usuario = userRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException(USER_NOT_FOUND));

		List<FavoriteEntity> favoritos = favoriteRepository.findByUsuario(usuario);
		List<BookDTO> books = favoritos.stream()
				.map(fav -> BookDTO.builder()
						.bookId(fav.getLivro().getId())
						.bookTitle(fav.getLivro().getTitulo())
						.bookAuthor(fav.getLivro().getAutor())
						.bookAvailable(fav.getLivro().getDisponivel())
						.bookQuantity(fav.getLivro().getQuantidadeExemplares())
						.build())
				.toList();

		boolean isActive = usuario.getSuspendedUntil() == null;

		return FavoriteResponseByUserDTO.builder()
				.userId(usuario.getId())
				.userName(usuario.getNome())
				.active(isActive)
				.suspendedUntil(usuario.getSuspendedUntil())
				.books(books)
				.build();
	}

	public void deleteFavorito(Long idUsuario, Long idLivro) {
		FavoriteEntity favorito = favoriteRepository.findByUsuarioIdAndLivroId(idUsuario, idLivro)
				.orElseThrow(() -> new IllegalArgumentException("Favorito não encontrado"));
		favoriteRepository.delete(favorito);
	}
}
