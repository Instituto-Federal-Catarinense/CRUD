CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
);

CREATE TABLE categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL
);

CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category INTEGER NOT NULL,
    author INTEGER NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category) REFERENCES categorias(id),
    FOREIGN KEY (author) REFERENCES users(id)
);

-- Insert sample users
INSERT INTO users (username, password, role) VALUES ('admin', 'admin123', 'admin');
INSERT INTO users (username, password, role) VALUES ('user1', 'pass1', 'user');
INSERT INTO users (username, password, role) VALUES ('user2', 'pass2', 'user');

-- Insert sample categories
INSERT INTO categorias (nome) VALUES ('Treinos');
INSERT INTO categorias (nome) VALUES ('Nutrição');
INSERT INTO categorias (nome) VALUES ('Estilo de Vida');

-- Insert sample posts
INSERT INTO posts (title, content, category, author) VALUES ('Dicas para Treinos Intensos', 'Conteúdo sobre treinos com roupas MD ESSENTIAL...', 1, 1);
INSERT INTO posts (title, content, category, author) VALUES ('Alimentação Saudável', 'Dicas de nutrição para atletas...', 2, 1);
INSERT INTO posts (title, content, category, author) VALUES ('Motivação Diária', 'Inspire-se com histórias de sucesso...', 3, 1);
