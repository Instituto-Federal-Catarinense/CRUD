const { readData, saveData } = require('../config/storage');

const User = {
    create: (user, callback) => {
        try {
            const data = readData();
            const id = data.nextIds.users++;
            const newUser = {
                id,
                username: user.username,
                password: user.password,
                role: user.role
            };
            data.users.push(newUser);
            saveData(data);
            callback(null, id);
        } catch (err) {
            callback(err);
        }
    },

    findById: (id, callback) => {
        try {
            const data = readData();
            const user = data.users.find(u => u.id == id);
            callback(null, user);
        } catch (err) {
            callback(err);
        }
    },

    findByUsername: (username, callback) => {
        try {
            const data = readData();
            const user = data.users.find(u => u.username === username);
            callback(null, user);
        } catch (err) {
            callback(err);
        }
    },

    update: (id, user, callback) => {
        try {
            const data = readData();
            const index = data.users.findIndex(u => u.id == id);
            if (index !== -1) {
                data.users[index] = {
                    ...data.users[index],
                    username: user.username,
                    password: user.password,
                    role: user.role
                };
                saveData(data);
            }
            callback(null, { affectedRows: index !== -1 ? 1 : 0 });
        } catch (err) {
            callback(err);
        }
    },

    delete: (id, callback) => {
        try {
            const data = readData();
            data.users = data.users.filter(u => u.id != id);
            saveData(data);
            callback(null, { affectedRows: 1 });
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
            const term = (name || '').toLowerCase();
            const filtered = data.users.filter(u => u.username.toLowerCase().includes(term));
            callback(null, filtered);
        } catch (err) {
            callback(err);
        }
    },
};

module.exports = User;
