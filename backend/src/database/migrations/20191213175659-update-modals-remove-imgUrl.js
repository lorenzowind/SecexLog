"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("modals", "ImgUrl");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("modals", "ImgUrl", Sequelize.STRING);
  }
};
