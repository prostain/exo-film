'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryFilm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Category.belongsToMany(models.Film, { as: 'films', through: CategoryFilm, foreignKey: 'filmId', otherKey: 'categoryId' });
      models.Film.belongsToMany(models.Category, { as: 'categories', through: CategoryFilm, foreignKey: 'categoryId', otherKey: 'filmId' });
    }
  }
  CategoryFilm.init({
    categoryId: DataTypes.INTEGER,
    filmId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CategoryFilm',
    freezeTableName: true
    });
  return CategoryFilm;
};