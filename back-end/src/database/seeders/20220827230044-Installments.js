'use strict';

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Installments', [
      {
        user_id: 1,
        value: 50,
        month: new Date(2022, 11, 5)
      },
      {
        user_id: 1,
        value: 50,
        month: new Date(2022, 12, 5)
      },
      {
        user_id: 1,
        value: 50,
        month: new Date(2023, 1, 5)
      },
      {
        user_id: 2,
        value: 25,
        month: new Date(2022, 11, 5)
      },
      {
        user_id: 2,
        value: 25,
        month: new Date(2022, 12, 5)
      },
      {
        user_id: 2,
        value: 25,
        month: new Date(2023, 1, 5)
      },
      {
        user_id: 2,
        value: 25,
        month: new Date(2023, 2, 5)
      },
      {
        user_id: 2,
        value: 25,
        month: new Date(2023, 3, 5)
      },
      {
        user_id: 2,
        value: 25,
        month: new Date(2023, 4, 5)
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Installments', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
