const bcrypt = require("bcryptjs");
const User = require('../models/userModel');

const ROLES_VALIDOS = ["admin", "user"];

function roleValido(role) {
    return ROLES_VALIDOS.includes(role) ? role : "user";
}

function semSenha(user) {
    if (!user) return user;
    const { password, ...resto } = user;
    return resto;
}

const userController = {
    createUser: async (req, res) => {
        const username = (req.body.username || "").trim();
        const password = req.body.password || "";
        const role = roleValido(req.body.role);

        if (!username) {
            return res.status(400).send("Nome de usuário é obrigatório.");
        }
        if (password.length < 6) {
            return res.status(400).send("A senha deve ter ao menos 6 caracteres.");
        }

        const hash = await bcrypt.hash(password, 10);

        User.create({ username, password: hash, role }, (err) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).send("Nome de usuário já existe.");
                }
                return res.status(500).send("Erro ao cadastrar usuário.");
            }
            res.redirect("/users");
        });
    },

    getUserById: (req, res) => {
        const userId = req.params.id;

        User.findById(userId, (err, user) => {
            if (err) {
                return res.status(500).send("Erro ao buscar usuário.");
            }
            if (!user) {
                return res.status(404).send("Usuário não encontrado.");
            }
            res.render('users/show', { user: semSenha(user) });
        });
    },

    getAllUsers: (req, res) => {
        User.getAll((err, users) => {
            if (err) {
                return res.status(500).send("Erro ao listar usuários.");
            }
            res.render('users/index', { users });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('users/create');
    },

    renderEditForm: (req, res) => {
        const userId = req.params.id;

        User.findById(userId, (err, user) => {
            if (err) {
                return res.status(500).send("Erro ao buscar usuário.");
            }
            if (!user) {
                return res.status(404).send("Usuário não encontrado.");
            }
            res.render('users/edit', { user: semSenha(user) });
        });
    },

    updateUser: async (req, res) => {
        const userId = req.params.id;
        const username = (req.body.username || "").trim();
        const password = req.body.password || "";
        const role = roleValido(req.body.role);

        if (!username) {
            return res.status(400).send("Nome de usuário é obrigatório.");
        }

        const aplicar = (hash) => {
            User.update(userId, { username, password: hash, role }, (err) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(409).send("Nome de usuário já existe.");
                    }
                    return res.status(500).send("Erro ao atualizar usuário.");
                }
                res.redirect('/users');
            });
        };

        if (password) {
            if (password.length < 6) {
                return res.status(400).send("A senha deve ter ao menos 6 caracteres.");
            }
            return aplicar(await bcrypt.hash(password, 10));
        }

        User.findById(userId, (err, userAtual) => {
            if (err || !userAtual) {
                return res.status(404).send("Usuário não encontrado.");
            }
            aplicar(userAtual.password);
        });
    },

    deleteUser: (req, res) => {
        const userId = req.params.id;

        User.delete(userId, (err) => {
            if (err) {
                return res.status(500).send("Erro ao excluir usuário.");
            }
            res.redirect('/users');
        });
    },

    searchUsers: (req, res) => {
        const search = req.query.search || '';

        User.searchByName(search, (err, users) => {
            if (err) {
                return res.status(500).json({ error: "Erro ao buscar usuários." });
            }
            res.json({ users });
        });
    },
};

module.exports = userController;
