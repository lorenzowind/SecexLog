'use strict';
module.exports = (sequelize, DataTypes) => {
  const Opinion = sequelize.define('Opinion', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty(value){
          if(!value){
            throw new Error("O título não pode estar vazio");
          }
        }
      }
    },
    desc: { 
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty(value){
          if(!value){
            throw new Error("A descrição não pode estar vazia");
          }
        }
      }
    }
  }, {
    
      defaultScope: {
        attributes: { exclude: ['createdAt','updatedAt'] },
      }
  });
  Opinion.associate = function(models) {
    // associations can be defined here
  };
  return Opinion;
};