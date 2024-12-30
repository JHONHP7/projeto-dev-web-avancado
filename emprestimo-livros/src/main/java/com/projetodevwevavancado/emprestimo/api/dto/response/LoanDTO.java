package com.projetodevwevavancado.emprestimo.api.dto.response;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Builder;

@Builder
public record LoanDTO (Long loanId,
	    Long bookId,
	    Long userId,
	    String bookName,
	    String userName,
		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone = "GMT-3")
	    Date loanDate,
	    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone = "GMT-3")
	    Date returnDate,
	    String status) {

}
