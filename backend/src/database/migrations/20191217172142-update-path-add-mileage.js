'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "paths",
      "mileage",
      Sequelize.DOUBLE);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "paths",
      "mileage");
  }
};
