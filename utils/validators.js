const validateUserPayload = (payload) => {
    const errors = [];

    if (!payload.username || payload.username.trim().length < 3) {
        errors.push('O nome de usuário deve ter pelo menos 3 caracteres.');
    }

    if (!payload.password || payload.password.length < 6) {
        errors.push('A senha deve ter pelo menos 6 caracteres.');
    }

    if (!['admin', 'user'].includes(payload.role)) {
        errors.push('O perfil informado é inválido.');
    }

    return errors;
};

const validateProdutoPayload = (payload) => {
    const errors = [];

    if (!payload.nome || payload.nome.trim().length < 3) {
        errors.push('O nome do produto deve ter pelo menos 3 caracteres.');
    }

    if (!payload.descricao || payload.descricao.trim().length < 5) {
        errors.push('A descrição deve ter pelo menos 5 caracteres.');
    }

    if (!payload.preco || Number(payload.preco) <= 0) {
        errors.push('O preço deve ser maior que zero.');
    }

    if (!payload.quantidade || Number(payload.quantidade) < 0) {
        errors.push('A quantidade não pode ser negativa.');
    }

    return errors;
};

module.exports = {
    validateUserPayload,
    validateProdutoPayload,
};
