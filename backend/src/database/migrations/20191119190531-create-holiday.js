'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Holidays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      city_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'cities', key:'id'},
        onUpdate: 'CASCADE',
        onDelete: "CASCADE"
      },
      nome: {
        type: Sequelize.STRING
      },
      init: {
        type: Sequelize.STRING
      },
      end: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Holidays');
  }
};