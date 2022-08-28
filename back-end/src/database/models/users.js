/**
 * 
 * @param {import('sequelize').Sequelize} Sequelize 
 * @param {import('sequelize').DataTypes} dataTypes 
 * @returns 
 */

module.exports = (Sequelize, dataTypes) => {
  const User = Sequelize.define('User', {
    name: dataTypes.STRING,
    phoneNumber: dataTypes.STRING(11),
    email: dataTypes.STRING()
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'Users'
  });

  User.associate = ({ Installment }) => {
    User.hasMany(Installment, {
      as: 'installments',
      foreignKey: 'userId'
    });
  };

  return User;
};