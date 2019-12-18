'use strict';
module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    nome: DataTypes.STRING,
    telefone: DataTypes.STRING,
    preference: DataTypes.STRING,
    preferenceTxt: DataTypes.STRING,
    modal: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
    

    }
  }, {});
  Provider.associate = (models) =>{
    // Provider.belongsToMany(models.City, {
    //     through: 'cityProviders',
    //     as : 'citys',
    //     foreignKey: 'Provider_Id'        
    //     });
    };
  return Provider;
};