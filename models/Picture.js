'use strict';
module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define('Picture', {
    productId: DataTypes.INTEGER,
    uri: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  Picture.associate = function(models) {
    Picture.belongsTo(models.Product, { onDelete: 'CASCADE', foreignKey: 'productId' });
  };
  return Picture;
};