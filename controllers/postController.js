const Post = require('../models/postModel');
const Categoria = require('../models/categoriaModel');

const postController = {

    createPost: (req, res) => {

        const newPost = {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            author: 1 // Assume admin for now
        };

        Post.create(newPost, (err, postId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/posts?msg=' + encodeURIComponent('Post criado com sucesso!'));
        });
    },

    getPostById: (req, res) => {
        const postId = req.params.id;

        Post.findById(postId, (err, post) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.render('posts/show', { post });
        });
    },
    
    getAllPosts: (req, res) => {
        const categoria = req.query.categoria || null;
        
        Post.getAll(categoria, (err, posts) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('posts/index', { posts, categorias, categoriaSelecionada: categoria });
            });
        });
    },

    renderCreateForm: (req, res) => {
        Categoria.getAll((err, categorias) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('posts/create', { categorias });
        });
    },

    renderEditForm: (req, res) => {
        const postId = req.params.id;

        Post.findById(postId, (err, post) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('posts/edit', { post, categorias });
            });
        });
    },

    updatePost: (req, res) => {
        const postId = req.params.id;
        
        const updatedPost = {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            author: 1 // Assume admin
        };

        Post.update(postId, updatedPost, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/posts?msg=' + encodeURIComponent('Post atualizado com sucesso!'));
        });
    },

    deletePost: (req, res) => {
        const postId = req.params.id;

        Post.delete(postId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/posts?msg=' + encodeURIComponent('Post excluído com sucesso!'));
        });
    }
};

module.exports = postController;