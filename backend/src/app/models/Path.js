const City = require('./City');
const Provider = require('./Provider');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Path = sequelize.define('Path', {
    initCidade: {
      type:DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'cities',
        key:'nome'
      }

 
    },
    endCidade: {
      type:DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'cities',
        key: 'nome'
      }

  },
    modalTipo: {
      type:DataTypes.STRING,
      allowNull: false,

    },
    prestNome: {
      type:DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'providers',
        key: 'nome'
      }

    },
    dia: {
      type:DataTypes.STRING,
    
    },
    hora:{
      type:DataTypes.STRING,

    },
    duration: {
      type:DataTypes.STRING,
      allowNull: false,
    //   validate: {
    //     notEmpty(value) {
    //       if(!value)
    //         throw new Error('A duração não foi informada');
    //     }
    // }
    },
    valor: {
      type:DataTypes.DOUBLE
    },
    quilometragem: {
      type: DataTypes.DOUBLE
    },
    embarque: {
      type:DataTypes.STRING,
      allowNull: false,
    //   validate: {
    //     notEmpty(value) {
    //       if(!value)
    //         throw new Error('O nome da cidade embarque não foi informado');
    //     }
    // }
    },
    desembarque: {
      type:DataTypes.STRING,
      allowNull: false,
    //   validate: {
    //     notEmpty(value) {
    //       if(!value)
    //         throw new Error('O nome da cidade desembarque não foi informado');
    //     }
    // }
    },
    telefone: {
      type:DataTypes.STRING,
      references: {
        model: 'provider',
        key: 'telefone'
      }
    },
    email: {
      type:DataTypes.STRING,
      references: {
        model: 'provider',
        key: 'email'
      },
      validate: {
        isEmail: true
      }
    },
    modal: {
      type:DataTypes.STRING,
      allowNull: false,
    //   validate: {
    //     notEmpty(value) {
    //       if(!value)
    //         throw new Error('O modal não foi informado');
    //     }
    // }
    },
  }, {
    defaultScope: {
      attributes: { exclude: ['createdAt','updatedAt'] },
    }
  });
  Path.associate = function(models) {
    // associations can be defined here
    // Path.hasMany(City);
    // Path.hasOne(Provider);
  };
  return Path;
};