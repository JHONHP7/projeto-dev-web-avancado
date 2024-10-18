package com.projetodevwevavancado.emprestimo.commons.util;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.projetodevwevavancado.emprestimo.api.dto.request.BookRequestDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.BookResponseDTO;
import com.projetodevwevavancado.emprestimo.entity.BookEntity;

@Component
public class BookToDtoUtil {

    private final ModelMapper modelMapper;

    public BookToDtoUtil() {
        this.modelMapper = new ModelMapper();
    }

    public BookResponseDTO convertToResponseDTO(BookEntity bookEntity) {
        return modelMapper.map(bookEntity, BookResponseDTO.class);
    }

    public BookEntity convertToEntity(BookRequestDTO bookRequestDTO) {
        return modelMapper.map(bookRequestDTO, BookEntity.class);
    }
}