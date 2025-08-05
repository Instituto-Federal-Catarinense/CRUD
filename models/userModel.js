const db = require('../config/db');

const UserService = {
  create: async (user) => {
    try {
      const newUser = await User.create({
        username: user.username,
        password: user.password,
        role: user.role,
      });
      return newUser.id;
    } catch (err) {
      throw err;
    }
  },

  findById: async (id) => {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (err) {
      throw err;
    }
  },

  findByUsername: async (username) => {
    try {
      const user = await User.findOne({ where: { username } });
      return user;
    } catch (err) {
      throw err;
    }
  },

  update: async (id, user) => {
    try {
      await User.update(user, { where: { id } });
      return id;
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    try {
      await User.destroy({ where: { id } });
      return id;
    } catch (err) {
      throw err;
    }
  },

  getAll: async () => {
    try {
      const users = await User.findAll();
      return users;
    } catch (err) {
      throw err;
    }
  },

  searchByName: async (name) => {
    try {
      const users = await User.findAll({
        where: {
          username: {
            [Sequelize.Op.like]: `%${name}%`,
          },
        },
      });
      return users;
    } catch (err) {
      throw err;
    }
  }
};

module.exports = UserService;
