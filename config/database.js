const mysql = require('mysql2');

class MemoryDatabase {
    constructor() {
        this.users = [
            { id: 1, username: 'admin', password: 'admin', role: 'admin' }
        ];
        this.categorias = [];
        this.produtos = [];
        this.nextId = 2;
    }

    query(sql, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = [];
        }

        const query = sql.trim().toLowerCase();

        if (query.startsWith('insert into users')) {
            const userData = {
                id: this.nextId++,
                username: params[0],
                password: params[1],
                role: params[2]
            };
            this.users.push(userData);
            return callback(null, { insertId: userData.id });
        }

        if (query.startsWith('select') && query.includes('from users')) {
            const whereIndex = query.indexOf('where');
            if (whereIndex !== -1) {
                const field = query.includes('username') ? 'username' : 'id';
                const value = params[0];
                const rows = this.users.filter((user) => user[field] === value);
                return callback(null, rows);
            }

            const rows = this.users.map(({ id, username, role }) => ({ id, username, role }));
            return callback(null, rows);
        }

        if (query.startsWith('update users')) {
            const id = params[3];
            const user = this.users.find((item) => item.id === id);
            if (user) {
                user.username = params[0];
                user.password = params[1];
                user.role = params[2];
            }
            return callback(null, { affectedRows: user ? 1 : 0 });
        }

        if (query.startsWith('delete from users')) {
            const id = params[0];
            this.users = this.users.filter((user) => user.id !== id);
            return callback(null, { affectedRows: 1 });
        }

        if (query.startsWith('insert into categorias')) {
            const categoria = { id: this.nextId++, nome: params[0] };
            this.categorias.push(categoria);
            return callback(null, { insertId: categoria.id });
        }

        if (query.startsWith('select') && query.includes('from categorias')) {
            return callback(null, this.categorias);
        }

        if (query.startsWith('insert into produtos')) {
            const produto = { id: this.nextId++, ...params };
            this.produtos.push(produto);
            return callback(null, { insertId: produto.id });
        }

        if (query.startsWith('select') && query.includes('from produtos')) {
            return callback(null, this.produtos);
        }

        callback(null, []);
    }
}

const memoryDb = new MemoryDatabase();
const mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'CRUD'
});

const connection = {
    _useMemory: true,
    connect(callback) {
        mysqlConnection.connect((err) => {
            if (err) {
                console.warn('MySQL indisponível, usando armazenamento em memória para continuar:', err.message);
                this._useMemory = true;
                if (callback) callback(null);
                return;
            }

            console.log('Conectado ao banco de dados MySQL');
            this._useMemory = false;
            if (callback) callback(null);
        });
    },
    query(sql, params, callback) {
        if (this._useMemory) {
            return memoryDb.query(sql, params, callback);
        }
        return mysqlConnection.query(sql, params, callback);
    },
    end(callback) {
        if (this._useMemory) {
            return callback && callback();
        }
        return mysqlConnection.end(callback);
    }
};

connection.connect(() => {});

module.exports = connection;