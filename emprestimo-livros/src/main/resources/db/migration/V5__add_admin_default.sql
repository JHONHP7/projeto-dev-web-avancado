-- V5__add_admin_default.sql
-- Adiciona o usuário admin com senha "administrador" à tabela TB_USER para facilitar o login
INSERT INTO TB_USER (sq_user, email, nome, role, senha, blocked_until) 
VALUES (13, 'adm@emprestimo.com', 'Administrador', 'ADMIN', '$2a$10$8YefML1fwQDOWkysCVF2fe.nOU3CV2tJkMEWueEZ3JAtgDd/VnyEu', NULL);