'use strict';
module.exports = (sequelize, DataTypes) => {
  const Style = sequelize.define('Style', {
    name: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  Style.associate = function(models) {
    Style.hasMany(models.Product, { foreignKey: 'styleId' });
  };
  return Style;
};