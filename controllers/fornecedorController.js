const db = require('../config/db'); // adapte para o seu arquivo de conexão

exports.getAllFornecedores = (req, res) => {
    db.query('SELECT * FROM fornecedores', (err, results) => {
        if (err) throw err;
        res.render('fornecedores/index', { fornecedores: results });
    });
};

exports.renderCreateForm = (req, res) => {
    res.render('fornecedores/new');
};

exports.createFornecedor = (req, res) => {
    const { nome, cnpj, email } = req.body;
    db.query('INSERT INTO fornecedores (nome, cnpj, email) VALUES (?, ?, ?)', 
    [nome, cnpj, email], (err) => {
        if (err) throw err;
        res.redirect('/fornecedores');
    });
};

exports.getFornecedorById = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM fornecedores WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        if (results.length === 0) return res.status(404).send('Fornecedor não encontrado');
        res.render('fornecedores/show', { fornecedor: results[0] });
    });
};

exports.renderEditForm = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM fornecedores WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        if (results.length === 0) return res.status(404).send('Fornecedor não encontrado');
        res.render('fornecedores/edit', { fornecedor: results[0] });
    });
};

exports.updateFornecedor = (req, res) => {
    const id = req.params.id;
    const { nome, cnpj, email } = req.body;
    db.query('UPDATE fornecedores SET nome = ?, cnpj = ?, email = ? WHERE id = ?', 
    [nome, cnpj, email, id], (err) => {
        if (err) throw err;
        res.redirect('/fornecedores');
    });
};

exports.deleteFornecedor = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM fornecedores WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.redirect('/fornecedores');
    });
};
