const { User } = require('../database/models');

module.exports = {
  create: async (newUser) => {
    const user = await User.create(newUser);

    return user;
  }
};