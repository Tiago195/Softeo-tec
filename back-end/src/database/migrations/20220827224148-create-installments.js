'use strict';
module.exports = {
  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize')} Sequelize 
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Installments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      value: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      month: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      service: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_paid: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      }
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Installments');
  }
};