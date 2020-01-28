'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Style', [
      {
        name: 'Classic',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Modern',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Renaissance',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Contemporary',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Style', null, {});
  }
};
