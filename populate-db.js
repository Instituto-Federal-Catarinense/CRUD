/**
 * Script para verificar e popular o banco de dados com usuários de teste
 */
const User = require('./models/userModel');
const db = require('./config/db');

console.log('Verificando e populando banco de dados...\n');

// 1. Listar usuários existentes
User.getAll((err, users) => {
    if (err) {
        console.error('❌ Erro ao listar usuários:', err.message);
        process.exit(1);
    }

    console.log('📊 Usuários atuais no banco:');
    if (users.length === 0) {
        console.log('   (nenhum usuário encontrado)\n');
    } else {
        users.forEach(u => {
            console.log(`   - ID: ${u.id}, Username: ${u.username}, Role: ${u.role}`);
        });
        console.log();
    }

    // 2. Inserir usuários de teste se não existirem
    console.log('Inserindo usuários de teste...');
    
    const testUsers = [
        { username: 'jorge', password: '1234', role: 'user' },
        { username: 'admin', password: 'admin123', role: 'admin' }
    ];

    let inserted = 0;
    
    testUsers.forEach(testUser => {
        User.findByUsername(testUser.username, (err, existingUser) => {
            if (err) {
                console.error(`❌ Erro ao verificar ${testUser.username}:`, err.message);
                return;
            }

            if (!existingUser) {
                User.create(testUser, (err, userId) => {
                    if (err) {
                        console.error(`❌ Erro ao criar ${testUser.username}:`, err.message);
                        return;
                    }
                    console.log(`✅ Usuário '${testUser.username}' criado com ID: ${userId}`);
                    inserted++;
                    
                    // Quando terminar todos, listar novamente
                    if (inserted === testUsers.length) {
                        setTimeout(finalCheck, 500);
                    }
                });
            } else {
                console.log(`ℹ️  Usuário '${testUser.username}' já existe`);
                inserted++;
                
                if (inserted === testUsers.length) {
                    setTimeout(finalCheck, 500);
                }
            }
        });
    });
});

function finalCheck() {
    console.log('\n📊 Usuários finais no banco:');
    User.getAll((err, users) => {
        if (err) {
            console.error('❌ Erro:', err.message);
            process.exit(1);
        }

        if (users.length === 0) {
            console.log('   (nenhum usuário)');
        } else {
            users.forEach(u => {
                console.log(`   - Username: ${u.username}, Password: ${u.password}, Role: ${u.role}`);
            });
        }
        
        console.log('\n✅ Banco de dados pronto! Pode fazer login agora.\n');
        process.exit(0);
    });
}
