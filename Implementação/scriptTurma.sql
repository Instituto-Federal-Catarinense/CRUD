USE gracaKids;

CREATE TABLE Turma (
cod INTEGER NOT NULL UNIQUE,
nome VARCHAR (15) NOT NULL,
descricao VARCHAR (70),
intervaloldade INTEGER NOT NULL,
escalaMinistro VARCHAR (70),
PRIMARY KEY (cod));
