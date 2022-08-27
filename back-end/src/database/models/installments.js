/**
 * 
 * @param {import('sequelize').Sequelize} Sequelize 
 * @param {import('sequelize').DataTypes} dataTypes 
 * @returns 
 */

module.exports = (Sequelize, dataTypes) => {
  const Installments = Sequelize.define('Installment', {
    userId: dataTypes.INTEGER,
    value: dataTypes.DECIMAL(12, 2),
    month: dataTypes.DATEONLY
  }, {
    timestamps: false,
    underscored: true
  });

  Installments.associate = ({ User }) => {
    Installments.belongsTo(User, {
      as: 'user',
      foreignKey: 'userId'
    });
  };

  return Installments;
};