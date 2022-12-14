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
    month: dataTypes.DATEONLY,
    service: dataTypes.STRING,
    isPaid: dataTypes.BOOLEAN
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'Installments'
  });

  Installments.associate = ({ User }) => {
    Installments.belongsTo(User, {
      as: 'user',
      foreignKey: 'userId'
    });
  };

  return Installments;
};