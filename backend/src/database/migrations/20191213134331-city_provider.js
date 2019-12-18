'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cityProviders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, 


      City_Id : {
        type: Sequelize.INTEGER,
        references: {  model: 'cities', key: 'id'  },
        onDelete: 'CASCADE',
        allowNull: false,
      },

      
      Provider_Id : {
        type: Sequelize.INTEGER,
        references: {  model: 'providers', key: 'id'  },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cityProviders');
  }
};
