const Fornecedor = require("../models/fornecedorModel");

const fornecedorController = {
  criarFornecedor: async (req, res) => {
    try {
      await Fornecedor.create(req.body);
      res.redirect("/fornecedores");
    } catch (err) {
      res
        .status(500)
        .json({ erro: "Erro ao cadastrar fornecedor", detalhes: err.message });
    }
  },

  listarFornecedores: async (req, res) => {
    try {
      const fornecedores = await Fornecedor.findAll();
      res.render("fornecedores/index", { fornecedores });
    } catch (err) {
      res
        .status(500)
        .json({ erro: "Erro ao buscar fornecedores", detalhes: err.message });
    }
  },

  exibirFormularioCriacao: (req, res) => {
    res.render("fornecedores/criar");
  },

  exibirFormularioEdicao: async (req, res) => {
    try {
      const fornecedor = await Fornecedor.findByPk(req.params.id);
      if (!fornecedor) {
        return res.status(404).send("Fornecedor não encontrado");
      }
      res.render("fornecedores/editar", { fornecedor });
    } catch (err) {
      res.status(500).send("Erro ao buscar fornecedor");
    }
  },

  exibirDetalhesFornecedor: async (req, res) => {
    try {
      const fornecedor = await Fornecedor.findByPk(req.params.id);
      if (!fornecedor) {
        return res.status(404).send("Fornecedor não encontrado");
      }
      res.render("fornecedores/show", { fornecedor });
    } catch (err) {
      res.status(500).send("Erro ao buscar fornecedor");
    }
  },

  atualizarFornecedor: async (req, res) => {
    try {
      const [updated] = await Fornecedor.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated) {
        return res
          .status(404)
          .json({ erro: "Fornecedor não encontrado" });
      }
      res.redirect("/fornecedores");
    } catch (err) {
      res
        .status(500)
        .json({ erro: "Erro ao atualizar fornecedor", detalhes: err.message });
    }
  },

  deletarFornecedor: async (req, res) => {
    try {
      const deleted = await Fornecedor.destroy({
        where: { id: req.params.id },
      });
      if (!deleted) {
        return res
          .status(404)
          .json({ erro: "Fornecedor não encontrado" });
      }
      res.redirect("/fornecedores");
    } catch (err) {
      res
        .status(500)
        .json({ erro: "Erro ao deletar fornecedor", detalhes: err.message });
    }
  },
};

module.exports = fornecedorController;