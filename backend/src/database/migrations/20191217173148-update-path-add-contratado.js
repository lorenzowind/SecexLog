'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "paths",
      "contratado",
      Sequelize.BOOLEAN);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "paths",
      "contratado");
  }
};
