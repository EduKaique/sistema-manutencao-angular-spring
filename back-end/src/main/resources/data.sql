
INSERT IGNORE INTO status (id, name, color) VALUES 
(1, 'ABERTA', '#627877'),
(2, 'ORÇADA', '#7C3804'),
(3, 'REJEITADA', '#FF5E5B'),
(4, 'APROVADA', '#FFAE36'),
(5, 'REDIRECIONADA', '#8A84E2'),
(6, 'ARRUMADA', '#2B3E61'),
(7, 'PAGA', '#EC7505'),
(8, 'FINALIZADA', '#136947');

INSERT IGNORE INTO category (id, name, icon) VALUES
(1, 'Notebook', 'laptop'),
(2, 'Desktop', 'computer'),
(3, 'Impressora', 'printer'),
(4, 'Mouse', 'mouse'),
(5, 'Teclado', 'keyboard');

-- Admin (Senha: 9876)
INSERT IGNORE INTO users (id, name, email, password, role) VALUES (1, 'Admin', 'admin@remont.com', 'v8HE2LXv/pO01KY6YD/9Ng==$F+AHe/3jYWuxf7KYlxH6YtCfZkSmDAJDYgA4m/tDfQc=', 'ROLE_EMPLOYEE');

-- Funcionários (Senha: 4321)
INSERT IGNORE INTO users (id, name, email, password, role) VALUES (2, 'Maria', 'maria@remont.com', 'PycDJLjUpDWA4rckoxXHnQ==$tjac3RTeqObHCLlHsNZj6B1dAlfPsAiPU5+qfauH0io=', 'ROLE_EMPLOYEE');
INSERT IGNORE INTO users (id, name, email, password, role) VALUES (3, 'Mário', 'mario@remont.com', 'PycDJLjUpDWA4rckoxXHnQ==$tjac3RTeqObHCLlHsNZj6B1dAlfPsAiPU5+qfauH0io=', 'ROLE_EMPLOYEE');

-- Clientes (Senha: 1234)
INSERT IGNORE INTO users (id, name, email, password, role) VALUES (4, 'João', 'joao@gmail.com', 'j2IK4ncufg7B96M4SruwHw==$R0x65S+oatz0Owpzv3CsS36xVX0lqO03Z78rYXrv208=', 'ROLE_CLIENT');
INSERT IGNORE INTO users (id, name, email, password, role) VALUES (5, 'José', 'jose@gmail.com', 'j2IK4ncufg7B96M4SruwHw==$R0x65S+oatz0Owpzv3CsS36xVX0lqO03Z78rYXrv208=', 'ROLE_CLIENT');
INSERT IGNORE INTO users (id, name, email, password, role) VALUES (6, 'Joana', 'joana@gmail.com', 'j2IK4ncufg7B96M4SruwHw==$R0x65S+oatz0Owpzv3CsS36xVX0lqO03Z78rYXrv208=', 'ROLE_CLIENT');
INSERT IGNORE INTO users (id, name, email, password, role) VALUES (7, 'Joaquina', 'joaquina@gmail.com', 'j2IK4ncufg7B96M4SruwHw==$R0x65S+oatz0Owpzv3CsS36xVX0lqO03Z78rYXrv208=', 'ROLE_CLIENT');

INSERT IGNORE INTO employees (user_id, birth_date, active) VALUES
(1, '1990-01-01', 1),
(2, '1995-05-20', 1),
(3, '1988-12-15', 1);

INSERT IGNORE INTO clients (user_id, cpf, phone_number, zip_code, street, number, neighborhood, city, state) VALUES
(4, '11111111111', '41999999991', '80000000', 'Rua das Flores', '100', 'Centro', 'Curitiba', 'PR'),
(5, '22222222222', '41999999992', '80000000', 'Av. Brasil', '200', 'Batel', 'Curitiba', 'PR'),
(6, '33333333333', '41999999993', '80000000', 'Rua XV', '300', 'Centro', 'Curitiba', 'PR'),
(7, '44444444444', '41999999994', '80000000', 'Rua 24 Horas', '400', 'Centro', 'Curitiba', 'PR');