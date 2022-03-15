'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Categories', [{
      name: "Fiction",
      createdAt: new Date(),
      updatedAt: new Date()
  }, {
    name: "Policier",
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    name: "Western",
    createdAt: new Date(),
    updatedAt: new Date()
  }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});

  }
};
