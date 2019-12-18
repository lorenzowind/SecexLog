'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "paths",
      "telefone");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "paths",
      "telefone",
      Sequelize.STRING);
  }
};
