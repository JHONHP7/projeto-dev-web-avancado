package com.projetodevwevavancado.emprestimo.api.dto.response;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Builder;

@Builder
public record FavoriteResponseByUserDTO(Long userId, 
										String userName,
										@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone = "America/Sao_Paulo")
										Date suspendedUntil, 
										Boolean active,
										List<BookDTO> books) {
}
