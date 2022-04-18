'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categoryProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      categoryProduct.belongsTo(models.product, {
        as: "product",
        foreignKey: {
          name: "idProduct",
        },
      });

      categoryProduct.belongsTo(models.category, {
        as: "categories",
        foreignKey: {
          name: "idCategory",
        },
      });
    }
  }
  categoryProduct.init({
    idProduct: DataTypes.INTEGER,
    idCategory: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'categoryProduct',
  });
  return categoryProduct;
};