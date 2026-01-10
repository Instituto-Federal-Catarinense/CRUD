const Fornecedor = require("../models/fornecedorModel");

const fornecedorController = {
  criarFornecedor: (req, res) => {
    const novoFornecedor = req.body;
    Fornecedor.create(novoFornecedor, (err, id) => {
      if (err) {
        return res
          .status(500)
          .json({ erro: "Erro ao cadastrar fornecedor", detalhes: err });
      }
      res.redirect("/fornecedores");
    });
  },

  listarFornecedores: (req, res) => {
    Fornecedor.getAll((err, fornecedores) => {
      if (err) {
        return res
          .status(500)
          .json({ erro: "Erro ao buscar fornecedores", detalhes: err });
      }
      res.render("fornecedores/index", { fornecedores });
    });
  },

  exibirFormularioCriacao: (req, res) => {
    res.render("fornecedores/criar");
  },

  exibirFormularioEdicao: (req, res) => {
    const id = req.params.id;
    Fornecedor.findById(id, (err, fornecedor) => {
      if (err || !fornecedor) {
        return res.status(404).send("Fornecedor não encontrado");
      }
      res.render("fornecedores/editar", { fornecedor });
    });
  },

  exibirDetalhesFornecedor: (req, res) => {
    const id = req.params.id;
    Fornecedor.findById(id, (err, fornecedor) => {
      if (err || !fornecedor) {
        return res.status(404).send("Fornecedor não encontrado");
      }
      res.render("fornecedores/show", { fornecedor });
    });
  },

  atualizarFornecedor: (req, res) => {
    const id = req.params.id;
    const dadosAtualizados = req.body;
    Fornecedor.update(id, dadosAtualizados, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ erro: "Erro ao atualizar fornecedor", detalhes: err });
      }
      res.redirect("/fornecedores");
    });
  },

  deletarFornecedor: (req, res) => {
    const id = req.params.id;
    Fornecedor.delete(id, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ erro: "Erro ao deletar fornecedor", detalhes: err });
      }
      res.redirect("/fornecedores");
    });
  },
};

module.exports = fornecedorController;
