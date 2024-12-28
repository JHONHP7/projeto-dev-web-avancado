-- V3__AddBlockedUntilToUser.sql
-- Adiciona a coluna blocked_until à tabela TB_USER para gerenciar bloqueios de usuários por atrasos

ALTER TABLE emprestimo.TB_USER
ADD COLUMN blocked_until TIMESTAMP NULL;

-- Insira um comentário explicativo sobre a nova coluna
COMMENT ON COLUMN emprestimo.TB_USER.blocked_until IS 'Data até a qual o usuário está bloqueado para novos empréstimos devido a atrasos na devolução';
