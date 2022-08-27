/**
 * 
 * @param {import('sequelize').Sequelize} Sequelize 
 * @param {import('sequelize').DataTypes} dataTypes 
 * @returns 
 */

module.exports = (Sequelize, dataTypes) => {
  const User = Sequelize.define('User', {
    name: dataTypes.STRING
  }, {
    timestamps: false
  });

  User.associate = ({ Installment }) => {
    User.hasMany(Installment, {
      as: 'installments',
      foreignKey: 'userId'
    });
  };

  return User;
};