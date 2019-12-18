'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'modals',
      'imgUrl',
      Sequelize.STRING,
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'modals',
      'imgUrl'
    );
  }
};
