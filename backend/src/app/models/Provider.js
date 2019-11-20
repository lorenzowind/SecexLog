'use strict';
module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    nome: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }

    }
  }, {});
  Provider.associate = function (models) {
    // associations can be defined here
  };
  return Provider;
};