USE gracaKids;

CREATE TABLE TipoSanguineo (
cod INTEGER NOT NULL UNIQUE,
descricao VARCHAR (3) NOT NULL,
PRIMARY KEY (cod));
