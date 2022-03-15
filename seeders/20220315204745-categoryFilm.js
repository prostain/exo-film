'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('CategoryFilm', [{
      categoryId: 1,
      filmId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
  }, {
    categoryId: 2,
    filmId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    categoryId: 3,
    filmId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    categoryId: 1,
    filmId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
}, {
  categoryId: 1,
  filmId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  categoryId: 2,
  filmId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
}]);

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('CategoryFilm', null, {});

  }
};
