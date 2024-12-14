package com.projetodevwevavancado.emprestimo.api.dto.response;

import lombok.Builder;

@Builder
public record BookDTO(Long bookId, 
					String bookTitle, 
					String bookAuthor, 
					Boolean bookAvailable, 
					Integer bookQuantity) {
}
