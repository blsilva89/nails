CREATE TABLE cliente ( id SERIAL PRIMARY KEY, nome VARCHAR(100) NOT NULL, cpf VARCHAR(11) UNIQUE NOT NULL, data_nascimento DATE NOT NULL, telefone VARCHAR(15) NOT NULL, endereco VARCHAR(255) NOT NULL );
CREATE TABLE agendamento ( id SERIAL PRIMARY KEY, cliente_id INTEGER REFERENCES cliente(id), data_hora_agendamento TIMESTAMP NOT NULL );
