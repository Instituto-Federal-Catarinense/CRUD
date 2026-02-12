const Fornecedor = require('../models/fornecedorModel');

const fornecedorController = {

    listarFornecedores: async (req, res) => {
        try {
            const fornecedores = await Fornecedor.findAll();
            res.render('fornecedores/list', { fornecedores });
        } catch (error) {
            res.status(500).send('Erro ao listar fornecedores');
        }
    },

    novoFornecedorForm: (req, res) => {
        res.render('fornecedores/new');
    },

    criarFornecedor: async (req, res) => {
        const { nome, cnpj, telefone, email, endereco } = req.body;
        
        try {
            // Verifica se CNPJ já existe
            const fornecedorExistente = await Fornecedor.findByCnpj(cnpj);
            if (fornecedorExistente) {
                return res.status(400).render('fornecedores/new', { 
                    error: 'CNPJ já cadastrado',
                    formData: req.body
                });
            }

            await Fornecedor.create(nome, cnpj, telefone, email, endereco);
            req.flash('success', 'Fornecedor cadastrado com sucesso!');
            res.redirect('/fornecedores');
        } catch (error) {
            res.status(500).render('fornecedores/new', { 
                error: 'Erro ao cadastrar fornecedor',
                formData: req.body
            });
        }
    },

    editarFornecedorForm: async (req, res) => {
        try {
            const fornecedor = await Fornecedor.findById(req.params.id);
            if (!fornecedor) {
                req.flash('error', 'Fornecedor não encontrado');
                return res.redirect('/fornecedores');
            }
            res.render('fornecedores/edit', { fornecedor });
        } catch (error) {
            res.status(500).send('Erro ao carregar formulário de edição');
        }
    },

    atualizarFornecedor: async (req, res) => {
        const { id } = req.params;
        const { nome, cnpj, telefone, email, endereco } = req.body;
        
        try {
            await Fornecedor.update(id, nome, cnpj, telefone, email, endereco);
            req.flash('success', 'Fornecedor atualizado com sucesso!');
            res.redirect('/fornecedores');
        } catch (error) {
            res.status(500).render('fornecedores/edit', { 
                error: 'Erro ao atualizar fornecedor',
                fornecedor: { id, nome, cnpj, telefone, email, endereco }
            });
        }
    },

    excluirFornecedor: async (req, res) => {
        try {
            await Fornecedor.delete(req.params.id);
            req.flash('success', 'Fornecedor excluído com sucesso!');
            res.redirect('/fornecedores');
        } catch (error) {
            req.flash('error', 'Erro ao excluir fornecedor');
            res.redirect('/fornecedores');
        }
    }
};

module.exports = fornecedorController;