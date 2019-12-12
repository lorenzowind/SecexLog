'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Paths', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      initCidade: {
        type: Sequelize.STRING
      },
      endCidade: {
        type: Sequelize.STRING
      },
      modalTipo: {
        type: Sequelize.STRING
      },
      prestNome: {
        type: Sequelize.STRING
      },
      dia: {
        type: Sequelize.STRING
      },
      hora: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      valor: {
        type: Sequelize.DOUBLE
      },
      quilometragem: {
        type: Sequelize.DOUBLE
      },
      embarque: {
        type: Sequelize.STRING
      },
      desembarque: {
        type: Sequelize.STRING
      },
      telefone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      modal: {
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
    return queryInterface.dropTable('Paths');
  }
};