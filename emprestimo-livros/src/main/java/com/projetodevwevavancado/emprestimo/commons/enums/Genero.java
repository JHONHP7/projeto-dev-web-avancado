package com.projetodevwevavancado.emprestimo.commons.enums;

import lombok.Getter;

@Getter
public enum Genero {
    FICCAO(1, "ficção"),
    NAO_FICCAO(2, "não ficção"),
    ROMANCE(3, "romance"),
    FANTASIA(4, "fantasia"),
    TERROR(5, "terror"),
    SUSPENSE(6, "suspense"),
    BIOGRAFIA(7, "biografia"),
    HISTORIA(8, "história"),
    POESIA(9, "poesia");

    private final int id;
    private final String nome;

    Genero(int id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    public static Genero fromId(int id) {
        for (Genero genero : Genero.values()) {
            if (genero.getId() == id) {
                return genero;
            }
        }
        throw new IllegalArgumentException("ID desconhecido: " + id);
    }

    public static Genero fromValue(String value) {
        for (Genero genero : Genero.values()) {
            if (genero.getNome().equalsIgnoreCase(value)) {
                return genero;
            }
        }
        throw new IllegalArgumentException("Valor desconhecido: " + value);
    }
}