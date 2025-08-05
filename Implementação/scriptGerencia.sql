USE gracaKids;

CREATE TABLE Gerencia (
cod INTEGER NOT NULL UNIQUE,
ministro INTEGER,
turma INTEGER,
PRIMARY KEY (cod),
FOREIGN KEY (ministro) REFERENCES Ministro(cod),
FOREIGN KEY (turma) REFERENCES Turma(cod));
