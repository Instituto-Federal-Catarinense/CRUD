const bcrypt = require('bcrypt');

const Usuario =
    require('../models/usuarioModel');

const dadosPaginaLogin = ({
    erro = null,
    email = ''
} = {}) => {
    return {
        title: 'Entrar - Cantina Federal',
        erro,
        email
    };
};

const AuthController = {
    mostrarLogin: (req, res) => {
        if (req.session.usuario) {
            return res.redirect('/');
        }

        return res.render(
            'auth/login',
            dadosPaginaLogin()
        );
    },

    entrar: async (req, res) => {
        try {
            const email = String(
                req.body.email || ''
            )
                .trim()
                .toLowerCase();

            const senha = String(
                req.body.senha || ''
            );

            if (!email || !senha) {
                return res.status(400).render(
                    'auth/login',
                    dadosPaginaLogin({
                        erro:
                            'Informe o e-mail e a senha.',
                        email
                    })
                );
            }

            const usuario =
                await Usuario.buscarPorEmail(email);

            if (!usuario) {
                return res.status(401).render(
                    'auth/login',
                    dadosPaginaLogin({
                        erro:
                            'E-mail ou senha incorretos.',
                        email
                    })
                );
            }

            if (!usuario.ativo) {
                return res.status(403).render(
                    'auth/login',
                    dadosPaginaLogin({
                        erro:
                            'Este usuário está desativado.',
                        email
                    })
                );
            }

            const senhaCorreta =
                await bcrypt.compare(
                    senha,
                    usuario.senha
                );

            if (!senhaCorreta) {
                return res.status(401).render(
                    'auth/login',
                    dadosPaginaLogin({
                        erro:
                            'E-mail ou senha incorretos.',
                        email
                    })
                );
            }

            /*
             * Cria uma nova sessão após o login,
             * evitando reutilizar uma sessão antiga.
             */
            req.session.regenerate(
                (erroSessao) => {
                    if (erroSessao) {
                        console.error(
                            'Erro ao criar sessão:',
                            erroSessao
                        );

                        return res
                            .status(500)
                            .render(
                                'auth/login',
                                dadosPaginaLogin({
                                    erro:
                                        'Não foi possível entrar.',
                                    email
                                })
                            );
                    }

                    req.session.usuario = {
                        id: usuario.id,
                        nome: usuario.nome,
                        email: usuario.email,
                        perfil: usuario.perfil
                    };

                    return req.session.save(
                        (erroSalvar) => {
                            if (erroSalvar) {
                                console.error(
                                    'Erro ao salvar sessão:',
                                    erroSalvar
                                );

                                return res
                                    .status(500)
                                    .render(
                                        'auth/login',
                                        dadosPaginaLogin({
                                            erro:
                                                'Não foi possível entrar.',
                                            email
                                        })
                                    );
                            }

                            return res.redirect('/');
                        }
                    );
                }
            );
        } catch (erro) {
            console.error(
                'Erro ao realizar login:',
                erro
            );

            return res.status(500).render(
                'auth/login',
                dadosPaginaLogin({
                    erro:
                        'Erro interno ao realizar login.',

                    email:
                        req.body.email || ''
                })
            );
        }
    },

    sair: (req, res) => {
        req.session.destroy((erro) => {
            if (erro) {
                console.error(
                    'Erro ao encerrar sessão:',
                    erro
                );

                return res.redirect('/');
            }

            res.clearCookie(
                'cantina.sid',
                {
                    path: '/'
                }
            );

            return res.redirect('/auth/login');
        });
    }
};

module.exports = AuthController;