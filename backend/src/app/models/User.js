'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty(value) {
          if(!value)
            throw new Error('O nome do usuário não foi informado');
        }
      }
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty(value) {
          if(!value)
            throw new Error('O login do usuário não foi informado');
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty(value) {
          if(!value)
            throw new Error('O email do usuário não foi informado');
        },
        isEmail: true
      }
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty(value) {
          if(!value)
            throw new Error('O login do usuário não foi informado');
        }
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty(value) {
          if(!value)
            throw new Error('A senha do usuário não foi informada');
        }
      }
    }
  }, {
      defaultScope: {
        attributes: { exclude: ['senha', 'createdAt','updatedAt'] },
      }
    });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};