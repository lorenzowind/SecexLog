'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "paths",
      "quilometragem");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "paths",
      "quilometragem",
      Sequelize.STRING);
  }
};
