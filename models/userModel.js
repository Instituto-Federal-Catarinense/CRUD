const { readData, saveData } = require('../config/dataStore');

const User = {
    create: (user, callback) => {
        try {
            const data = readData();
            const newUser = {
                id: data.nextId,
                username: user.username,
                password: user.password,
                role: user.role
            };
            data.users.push(newUser);
            data.nextId += 1;
            saveData(data);
            callback(null, newUser.id);
        } catch (err) {
            callback(err);
        }
    },

    findById: (id, callback) => {
        try {
            const data = readData();
            const user = data.users.find(u => u.id === id);
            callback(null, user || null);
        } catch (err) {
            callback(err);
        }
    },

    findByUsername: (username, callback) => {
        try {
            const data = readData();
            const user = data.users.find(u => u.username === username);
            callback(null, user || null);
        } catch (err) {
            callback(err);
        }
    },

    update: (id, user, callback) => {
        try {
            const data = readData();
            const index = data.users.findIndex(u => u.id === id);
            if (index !== -1) {
                data.users[index] = {
                    id: data.users[index].id,
                    username: user.username,
                    password: user.password,
                    role: user.role
                };
                saveData(data);
                callback(null, { affectedRows: 1 });
            } else {
                callback(null, { affectedRows: 0 });
            }
        } catch (err) {
            callback(err);
        }
    },

    updatePassword: (id, password, callback) => {
        try {
            const data = readData();
            const user = data.users.find(u => u.id === id);
            if (user) {
                user.password = password;
                saveData(data);
                callback(null, { affectedRows: 1 });
            } else {
                callback(null, { affectedRows: 0 });
            }
        } catch (err) {
            callback(err);
        }
    },

    delete: (id, callback) => {
        try {
            const data = readData();
            const index = data.users.findIndex(u => u.id === id);
            if (index !== -1) {
                data.users.splice(index, 1);
                saveData(data);
                callback(null, { affectedRows: 1 });
            } else {
                callback(null, { affectedRows: 0 });
            }
        } catch (err) {
            callback(err);
        }
    },

    getAll: (callback) => {
        try {
            const data = readData();
            callback(null, data.users);
        } catch (err) {
            callback(err);
        }
    },

    searchByName: (name, callback) => {
        try {
            const data = readData();
            const results = data.users.filter(u => 
                u.username.toLowerCase().includes(name.toLowerCase())
            );
            callback(null, results);
        } catch (err) {
            callback(err);
        }
    }
};

module.exports = User;
