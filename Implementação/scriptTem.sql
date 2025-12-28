USE gracaKids;

CREATE TABLE Tem(
cod INTEGER NOT NULL UNIQUE,
aluno INTEGER,
responsavel INTEGER,
PRIMARY KEY (cod),
FOREIGN KEY (aluno) REFERENCES Aluno (cod),
FOREIGN KEY (responsavel) REFERENCES Responsavel (cod));
