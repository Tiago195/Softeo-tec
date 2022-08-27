/**
 * 
 * @param {import('sequelize').Sequelize} Sequelize 
 * @param {import('sequelize').DataTypes} dataTypes 
 * @returns 
 */

module.exports = (Sequelize, dataTypes) => (
  Sequelize.define('User', {
    name: dataTypes.STRING
  }, {
    timestamps: false
  })
);