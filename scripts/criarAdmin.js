const bcrypt = require('bcrypt');
const readline = require('readline');

const pool = require('../config/db');

const Usuario =
    require('../models/usuarioModel');

const perguntar = (leitor, mensagem) => {
    return new Promise((resolve) => {
        leitor.question(
            mensagem,
            resolve
        );
    });
};

const criarAdministrador = async () => {
    let leitor;

    try {
        /*
         * Testa a conexão antes de começar
         * as perguntas no terminal.
         */
        await pool.promise().query(
            'SELECT 1'
        );

        leitor = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const nome = String(
            await perguntar(
                leitor,
                'Nome do administrador: '
            )
        ).trim();

        const email = String(
            await perguntar(
                leitor,
                'E-mail do administrador: '
            )
        )
            .trim()
            .toLowerCase();

        const senha = String(
            await perguntar(
                leitor,
                'Senha do administrador: '
            )
        );

        if (!nome || !email || !senha) {
            throw new Error(
                'Nome, e-mail e senha são obrigatórios.'
            );
        }

        if (!email.includes('@')) {
            throw new Error(
                'Informe um e-mail válido.'
            );
        }

        if (senha.length < 8) {
            throw new Error(
                'A senha precisa ter pelo menos 8 caracteres.'
            );
        }

        const usuarioExistente =
            await Usuario.buscarPorEmail(email);

        if (usuarioExistente) {
            throw new Error(
                'Já existe um usuário com esse e-mail.'
            );
        }

        const senhaCriptografada =
            await bcrypt.hash(
                senha,
                12
            );

        const idUsuario =
            await Usuario.criar({
                nome,
                email,
                senha: senhaCriptografada,
                perfil: 'ADMIN'
            });

        console.log('');
        console.log(
            'Administrador criado com sucesso!'
        );

        console.log(`ID: ${idUsuario}`);
        console.log(`Nome: ${nome}`);
        console.log(`E-mail: ${email}`);
        console.log('Perfil: ADMIN');
    } catch (erro) {
        console.error('');
        console.error(
            'Não foi possível criar o administrador.'
        );

        console.error(erro.message);

        process.exitCode = 1;
    } finally {
        if (leitor) {
            leitor.close();
        }

        try {
            await pool.promise().end();
        } catch (erro) {
            console.error(
                'Erro ao encerrar o banco:',
                erro.message
            );
        }
    }
};

criarAdministrador();