'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "paths",
      "email");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "paths",
      "email",
      Sequelize.STRING);
  }
};
