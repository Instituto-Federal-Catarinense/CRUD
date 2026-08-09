/**
 * Script de teste para debugar o login
 */
const User = require('./models/userModel');

// Testar se consegue buscar o usuário "jorge"
User.findByUsername('jorge', (err, user) => {
    if (err) {
        console.error('ERRO ao buscar usuário:', err);
        process.exit(1);
    }

    console.log('Resultado da busca:');
    console.log(user);

    if (!user) {
        console.log('❌ Usuário "jorge" NÃO encontrado no banco');
        
        // Tentar listar todos os usuários
        User.getAll((err, users) => {
            if (err) {
                console.error('Erro ao listar usuários:', err);
                process.exit(1);
            }
            console.log('\nTodos os usuários no banco:');
            console.log(users);
            process.exit(0);
        });
    } else {
        console.log('✅ Usuário encontrado!');
        console.log('ID:', user.id);
        console.log('Username:', user.username);
        console.log('Senha no banco:', user.password);
        console.log('Senha esperada: 1234');
        console.log('Senhas batem?', user.password === '1234');
        process.exit(0);
    }
});
