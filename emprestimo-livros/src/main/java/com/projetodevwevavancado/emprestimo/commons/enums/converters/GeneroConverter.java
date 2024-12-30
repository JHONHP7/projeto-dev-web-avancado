package com.projetodevwevavancado.emprestimo.commons.enums.converters;

import com.projetodevwevavancado.emprestimo.commons.enums.Genero;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class GeneroConverter implements AttributeConverter<Genero, String> {

    /**
     * Converts the {@link Genero} enum to its corresponding database column value.
     * Salva o "nome" (ex.: "ficção") no banco
     * @param genero the {@link Genero} enum instance to be converted; may be null
     * @return the integer ID of the {@link Genero} instance, or null if the input is null
     */
    @Override
    public String convertToDatabaseColumn(Genero genero) {
        if (genero == null) {
            return null;
        }
        return genero.getNome();
    }

    /**
     * Converts the given database column value (integer ID) to a corresponding {@link Genero} enum instance.
     * Converte o "nome" recuperado para o Enum
     * @param id the integer ID of the {@link Genero} enum stored in the database column; may be null
     * @return the corresponding {@link Genero} enum instance, or null if the input is null
     * @throws IllegalArgumentException if the given ID does not match any {@link Genero} enum
     */
    @Override
    public Genero convertToEntityAttribute(String nome) {
        if (nome == null || nome.isEmpty()) {
            return null;
        }
        return Genero.fromValue(nome);
    }
}