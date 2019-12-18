"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("modals");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("modals", Sequelize.STRING);
  }
};
