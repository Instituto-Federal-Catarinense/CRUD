const db = require('../config/db');

const Post = {
    create: (post, callback) => {
        const query = 'INSERT INTO posts (title, content, category, author) VALUES (?, ?, ?, ?)';
        db.run(query, [post.title, post.content, post.category, post.author], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.lastID);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT posts.*, categorias.nome AS categoria_nome, users.username AS author_nome FROM posts JOIN categorias ON posts.category = categorias.id JOIN users ON posts.author = users.id WHERE posts.id = ?';
        db.get(query, [id], (err, row) => {
            if (err) {
                return callback(err);
            }
            callback(null, row);
        });
    },

    update: (id, post, callback) => {
        const query = 'UPDATE posts SET title = ?, content = ?, category = ?, author = ? WHERE id = ?';
        db.run(query, [post.title, post.content, post.category, post.author, id], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.changes);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM posts WHERE id = ?';
        db.run(query, [id], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.changes);
        });
    },

    getAll: (categoria, callback) => {
        let query = 'SELECT posts.id, posts.title, posts.content, posts.created_at, categorias.nome AS categoria_nome, users.username AS author_nome FROM posts JOIN categorias ON posts.category = categorias.id JOIN users ON posts.author = users.id';
        
        if (categoria) {
            query += ' WHERE posts.category = ?';
        }
        
        query += ' ORDER BY posts.created_at DESC';
        
        db.all(query, categoria ? [categoria] : [], (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        });
    }
};

module.exports = Post;