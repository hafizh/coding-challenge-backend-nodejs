'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('PoliceOfficers', [{
      name: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Garfield McChicken',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Bamby Deer',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Max Mustermann',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('People', null, {});
  }
};
