const users = require('./users');

const createMock = (instance, obj) => {
  instance.push(obj);

  return { id: instance.length, ...obj };
};

const userMock = {
  create: async (obj) => createMock(users, obj)
};

module.exports = {
  userMock
};