const { User } = require('../database/models');

module.exports = {
  create: async (newUser) => {
    console.log(newUser);
    const user = await User.create(newUser);

    return user;
  },
  // getAll: async (innit, end) => {
  //   const users = await User.findAll({
  //     where: {
  //       month:
  //     }
  //   });

  //   return users;
  // }
};