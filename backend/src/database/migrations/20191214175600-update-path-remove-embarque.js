'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "paths",
      "embarque");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "paths",
      "embarque",
      Sequelize.STRING);
  }
};
