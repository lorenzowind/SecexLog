'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      relations: {
        type: Sequelize.STRING
      },
      cBase: {
        type: Sequelize.BOOLEAN
      },
      cAuditada: {
        type: Sequelize.BOOLEAN
      },
      initDataCheia: {
        type: Sequelize.STRING
      },
      endDataCheia: {
        type: Sequelize.STRING
      },
      obsInterdicao: {
        type: Sequelize.TEXT
      },
      obsCidade: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('Cities');
  }
};