package com.projetodevwevavancado.emprestimo.api.dto.request;

import lombok.Builder;

@Builder
public record FavoriteRequestDTO(Long idUsuario, Long idLivro) {

}
