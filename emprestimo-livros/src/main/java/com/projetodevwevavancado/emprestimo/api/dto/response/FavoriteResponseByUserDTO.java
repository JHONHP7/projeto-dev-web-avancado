package com.projetodevwevavancado.emprestimo.api.dto.response;

import java.util.List;

import lombok.Builder;

@Builder
public record FavoriteResponseByUserDTO(Long userId, 
										String userName, 
										List<BookDTO> books) {
}
