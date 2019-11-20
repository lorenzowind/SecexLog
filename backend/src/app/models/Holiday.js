'use strict';
module.exports = (sequelize, DataTypes) => {
  const Holiday = sequelize.define('Holiday', {
    nome: DataTypes.STRING,
    city_id: DataTypes.INTEGER,
    init: DataTypes.STRING,
    end: DataTypes.STRING
  }, {});
  Holiday.associate = function(models) {
    // associations can be defined here
  };
  return Holiday;
};