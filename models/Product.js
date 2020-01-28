'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    discountPrice: DataTypes.DOUBLE,
    styleId: DataTypes.INTEGER
  }, {
    freezeTableName: true
  });
  Product.associate = function(models) {
    Product.hasMany(models.Picture, { foreignKey: 'productId', as: 'pictures' });
    Product.belongsTo(models.Style, { foreignKey: 'styleId', as: 'style' });
  };
  return Product;
};