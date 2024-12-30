-- V4__AddGeneroToBook.sql
-- Adiciona a coluna genero à tabela TB_BOOK para gerenciar os gêneros dos livros

ALTER TABLE emprestimo.TB_BOOK
ADD COLUMN genero VARCHAR(20) NULL;

-- Insira um comentário explicativo sobre a nova coluna
COMMENT ON COLUMN emprestimo.TB_BOOK.genero IS 'Gênero literário do livro (exemplo: ficção, romance)';