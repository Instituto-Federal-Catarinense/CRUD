const Cliente = require('../models/clienteModel');

function limparCampo(valor) {
    if (typeof valor !== 'string') {
        return null;
    }

    const campo = valor.trim();

    return campo || null;
}

function normalizarCep(valor) {
    const cep = limparCampo(valor);

    if (!cep) {
        return null;
    }

    const numeros = cep.replace(/\D/g, '');

    if (numeros.length === 8) {
        return (
            numeros.substring(0, 5) +
            '-' +
            numeros.substring(5)
        );
    }

    return cep;
}

function montarCliente(body) {
    return {
        nome: limparCampo(body.nome),
        email: limparCampo(body.email),
        telefone: limparCampo(body.telefone),
        cpf: limparCampo(body.cpf),
        instituicao: limparCampo(body.instituicao)
    };
}

function montarEndereco(body) {
    const endereco = {
        rua: limparCampo(body.rua),
        numero: limparCampo(body.numero),
        bairro: limparCampo(body.bairro),
        municipio: limparCampo(body.municipio),
        ponto_referencia:
            limparCampo(body.ponto_referencia),
        cep: normalizarCep(body.cep)
    };

    const algumCampoPreenchido =
        Object.values(endereco).some(Boolean);

    return algumCampoPreenchido
        ? endereco
        : null;
}

function validarDados(cliente, endereco) {
    if (!cliente.nome) {
        return 'O nome do cliente é obrigatório.';
    }

    if (
        endereco &&
        (
            !endereco.rua ||
            !endereco.bairro ||
            !endereco.municipio
        )
    ) {
        return (
            'Ao informar um endereço, preencha ' +
            'rua, bairro e município.'
        );
    }

    if (
        endereco?.cep &&
        !/^\d{5}-\d{3}$/.test(endereco.cep)
    ) {
        return 'Informe o CEP no formato 00000-000.';
    }

    return null;
}

function tratarErro(res, erro, mensagem) {
    if (erro.code === 'ER_DUP_ENTRY') {
        return res.status(409).send(
            'Já existe um cliente com este e-mail ou CPF.'
        );
    }

    if (
        erro.code ===
        'CLIENTE_NAO_ENCONTRADO'
    ) {
        return res
            .status(404)
            .send('Cliente não encontrado.');
    }

    if (
        erro.code ===
        'ER_ROW_IS_REFERENCED_2'
    ) {
        return res.status(409).send(
            'Este cliente possui pedidos ou outros registros vinculados e não pode ser excluído.'
        );
    }

    console.error(erro);

    return res.status(500).json({
        mensagem,
        erro: erro.message
    });
}

const clienteController = {
    listarClientes: async (req, res) => {
        try {
            const clientes =
                await Cliente.listarTodos();

            res.render('clientes/index', {
                clientes
            });
        } catch (erro) {
            tratarErro(
                res,
                erro,
                'Erro ao buscar clientes'
            );
        }
    },

    buscarClientePorId: async (req, res) => {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res
                    .status(400)
                    .send('ID de cliente inválido.');
            }

            const cliente =
                await Cliente.buscarPorId(id);

            if (!cliente) {
                return res
                    .status(404)
                    .send('Cliente não encontrado.');
            }

            res.render('clientes/show', {
                cliente
            });
        } catch (erro) {
            tratarErro(
                res,
                erro,
                'Erro ao buscar cliente'
            );
        }
    },

    exibirFormularioCadastro: (
        req,
        res
    ) => {
        res.render('clientes/create');
    },

    cadastrarCliente: async (req, res) => {
        try {
            const cliente =
                montarCliente(req.body);

            const endereco =
                montarEndereco(req.body);

            const erroValidacao =
                validarDados(cliente, endereco);

            if (erroValidacao) {
                return res
                    .status(400)
                    .send(erroValidacao);
            }

            const idCliente =
                await Cliente.cadastrarCompleto(
                    cliente,
                    endereco
                );

            res.redirect(`/clientes/${idCliente}`);
        } catch (erro) {
            tratarErro(
                res,
                erro,
                'Erro ao cadastrar cliente'
            );
        }
    },

    exibirFormularioEdicao: async (
        req,
        res
    ) => {
        try {
            const cliente =
                await Cliente.buscarPorId(
                    Number(req.params.id)
                );

            if (!cliente) {
                return res
                    .status(404)
                    .send('Cliente não encontrado.');
            }

            res.render('clientes/edit', {
                cliente
            });
        } catch (erro) {
            tratarErro(
                res,
                erro,
                'Erro ao buscar cliente'
            );
        }
    },

    atualizarCliente: async (req, res) => {
        try {
            const id = Number(req.params.id);

            const cliente =
                montarCliente(req.body);

            const endereco =
                montarEndereco(req.body);

            const erroValidacao =
                validarDados(cliente, endereco);

            if (erroValidacao) {
                return res
                    .status(400)
                    .send(erroValidacao);
            }

            await Cliente.atualizarCompleto(
                id,
                cliente,
                endereco
            );

            res.redirect(`/clientes/${id}`);
        } catch (erro) {
            tratarErro(
                res,
                erro,
                'Erro ao atualizar cliente'
            );
        }
    },

    excluirCliente: async (req, res) => {
        try {
            const excluidos =
                await Cliente.excluirCompleto(
                    Number(req.params.id)
                );

            if (excluidos === 0) {
                return res
                    .status(404)
                    .send('Cliente não encontrado.');
            }

            res.redirect('/clientes');
        } catch (erro) {
            tratarErro(
                res,
                erro,
                'Erro ao excluir cliente'
            );
        }
    },

    pesquisarClientes: async (req, res) => {
        try {
            const pesquisa =
                req.query.search || '';

            const clientes =
                await Cliente.pesquisarPorNome(
                    pesquisa
                );

            res.json({ clientes });
        } catch (erro) {
            tratarErro(
                res,
                erro,
                'Erro ao pesquisar clientes'
            );
        }
    }
};

module.exports = clienteController;