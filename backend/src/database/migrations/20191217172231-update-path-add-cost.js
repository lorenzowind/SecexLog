'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "paths",
      "cost",
      Sequelize.DOUBLE);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "paths",
      "cost");
  }
};
