'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'paths',
      'modalTipo',
      'modal'
      )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'paths',
      'modal',
      'modalTipo'
      )
  }
};
