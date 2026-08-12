const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// Página de login
exports.showLogin = (req, res) => {
    res.render("login");
};

// Página de cadastro
exports.showRegister = (req, res) => {
    res.render("users/create");
};

// Cadastro
exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        const senhaHash = await bcrypt.hash(password, 10);

        const newUser = {
            username: username,
            password: senhaHash,
            role: role
        };

        User.create(newUser, (err, userId) => {
            if (err) {
                console.error("Erro ao cadastrar:", err);
                return res.status(500).send("Erro ao cadastrar usuário.");
            }

            res.redirect("/login");
        });

    } catch (err) {
        console.error("Erro:", err);
        res.status(500).send("Erro ao cadastrar usuário.");
    }
};

// Login
exports.login = (req, res) => {
    const { username, password } = req.body;

    console.log("========== LOGIN ==========");
    console.log("Usuário recebido:", username);
    console.log("Senha recebida:", password);

    User.findByUsername(username, async (err, user) => {

        if (err) {
            console.error("ERRO NO BANCO:", err);
            return res.status(500).send("Erro no servidor.");
        }

        console.log("Usuário encontrado:", user);

        if (!user) {
            console.log("❌ USUÁRIO NÃO ENCONTRADO");
            return res.send("Usuário ou senha inválidos.");
        }

        console.log("Hash salvo no banco:", user.password);

        try {
            const senhaCorreta = await bcrypt.compare(
                password,
                user.password
            );

            console.log("Resultado do bcrypt:", senhaCorreta);

            if (!senhaCorreta) {
                console.log("❌ SENHA INCORRETA");
                return res.send("Usuário ou senha inválidos.");
            }

            console.log("✅ SENHA CORRETA");

            req.session.user = user;

            console.log("✅ LOGIN REALIZADO");

            res.redirect("/");

        } catch (error) {
            console.error("ERRO NO BCRYPT:", error);
            res.status(500).send("Erro ao verificar senha.");
        }
    });
};
// Logout
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};