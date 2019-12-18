'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "paths",
      "desembarque");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "paths",
      "desembarque",
      Sequelize.STRING);
  }
};
