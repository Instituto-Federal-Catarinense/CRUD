const Produto = require('../models/produtoModel');

function montarProduto(body) {
    return {
        nome: body.nome ? body.nome.trim() : '',
        descricao: body.descricao
            ? body.descricao.trim()
            : null,
        preco: Number(body.preco),
        tamanho: body.tamanho
            ? body.tamanho.trim()
            : null,
        imagem_url: body.imagem_url
            ? body.imagem_url.trim()
            : null,
        obs: body.obs
            ? body.obs.trim()
            : null,
        disponivel: body.disponivel === '1'
    };
}

function validarProduto(produto) {
    if (!produto.nome) {
        return 'O nome do produto é obrigatório.';
    }

    if (
        !Number.isFinite(produto.preco) ||
        produto.preco <= 0
    ) {
        return 'O preço deve ser maior que zero.';
    }

    return null;
}

const produtoController = {
    listarProdutos: (req, res) => {
        Produto.listarTodos((erro, produtos) => {
            if (erro) {
                return res.status(500).json({
                    mensagem: 'Erro ao buscar produtos',
                    erro: erro.message
                });
            }

            res.render('produtos/index', { produtos });
        });
    },

    pesquisarProdutos: (req, res) => {
        const pesquisa = req.query.search || '';

        Produto.pesquisarPorNome(
            pesquisa,
            (erro, produtos) => {
                if (erro) {
                    return res.status(500).json({
                        mensagem: 'Erro ao pesquisar produtos',
                        erro: erro.message
                    });
                }

                res.json({ produtos });
            }
        );
    },

    buscarProdutoPorId: (req, res) => {
        Produto.buscarPorId(
            req.params.id,
            (erro, produto) => {
                if (erro) {
                    return res.status(500).json({
                        mensagem: 'Erro ao buscar produto',
                        erro: erro.message
                    });
                }

                if (!produto) {
                    return res
                        .status(404)
                        .send('Produto não encontrado');
                }

                res.render('produtos/show', { produto });
            }
        );
    },

    exibirFormularioCadastro: (req, res) => {
        res.render('produtos/create');
    },

    cadastrarProduto: (req, res) => {
        const produto = montarProduto(req.body);
        const erroValidacao = validarProduto(produto);

        if (erroValidacao) {
            return res.status(400).send(erroValidacao);
        }

        Produto.cadastrar(produto, (erro) => {
            if (erro) {
                return res.status(500).json({
                    mensagem: 'Erro ao cadastrar produto',
                    erro: erro.message
                });
            }

            res.redirect('/produtos');
        });
    },

    exibirFormularioEdicao: (req, res) => {
        Produto.buscarPorId(
            req.params.id,
            (erro, produto) => {
                if (erro) {
                    return res.status(500).json({
                        mensagem: 'Erro ao buscar produto',
                        erro: erro.message
                    });
                }

                if (!produto) {
                    return res
                        .status(404)
                        .send('Produto não encontrado');
                }

                res.render('produtos/edit', { produto });
            }
        );
    },

    atualizarProduto: (req, res) => {
        const produto = montarProduto(req.body);
        const erroValidacao = validarProduto(produto);

        if (erroValidacao) {
            return res.status(400).send(erroValidacao);
        }

        Produto.atualizar(
            req.params.id,
            produto,
            (erro) => {
                if (erro) {
                    return res.status(500).json({
                        mensagem: 'Erro ao atualizar produto',
                        erro: erro.message
                    });
                }

                res.redirect('/produtos');
            }
        );
    },

    excluirProduto: (req, res) => {
        Produto.excluir(req.params.id, (erro) => {
            if (erro) {
                if (erro.code === 'ER_ROW_IS_REFERENCED_2') {
                    return res.status(409).send(
                        'Este produto está ligado a um pedido e não pode ser excluído.'
                    );
                }

                return res.status(500).json({
                    mensagem: 'Erro ao excluir produto',
                    erro: erro.message
                });
            }

            res.redirect('/produtos');
        });
    }
};

module.exports = produtoController;