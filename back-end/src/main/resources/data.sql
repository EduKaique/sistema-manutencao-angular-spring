
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

INSERT IGNORE INTO employees (user_id, birth_date, active, wage, phone, cpf) VALUES
(1, '1990-01-01', 1, 5000.00, '41999991111', '10020030040'),
(2, '1995-05-20', 1, 3500.50, '41999992222', '50060070080'),
(3, '1988-12-15', 1, 4200.00, '41999993333', '90080070060');

INSERT IGNORE INTO clients (user_id, cpf, phone_number, zip_code, street, number, neighborhood, city, state) VALUES
(4, '11111111111', '41999999991', '80000000', 'Rua das Flores', '100', 'Centro', 'Curitiba', 'PR'),
(5, '22222222222', '41999999992', '80000000', 'Av. Brasil', '200', 'Batel', 'Curitiba', 'PR'),
(6, '33333333333', '41999999993', '80000000', 'Rua XV', '300', 'Centro', 'Curitiba', 'PR'),
(7, '44444444444', '41999999994', '80000000', 'Rua 24 Horas', '400', 'Centro', 'Curitiba', 'PR');


INSERT IGNORE INTO services (id, nome, valor_servico) VALUES 
(1, 'Diagnóstico', 50.00),
(2, 'Limpeza interna', 80.00),
(3, 'Limpeza externa', 40.00),
(4, 'Troca de componentes', 120.00),
(5, 'Conserto geral', 200.00),
(6, 'Atualização de software', 60.00),
(7, 'Reparo de placa lógica', 350.00),
(8, 'Substituição de conectores', 90.00),
(9, 'Teste de funcionamento completo', 30.00),
(10, 'Reparo urgente (prioridade)', 150.00);