"use strict";
module.exports = (sequelize, DataTypes) => {
  const Modal = sequelize.define(
    "Modal",
    {
      name: DataTypes.STRING,
      safety: DataTypes.BOOLEAN,
      cost: DataTypes.BOOLEAN,
      fast: DataTypes.BOOLEAN,
      imgUrl: DataTypes.TEXT
    },
    {}
  );
  Modal.associate = function(models) {
    // associations can be defined here
  };
  return Modal;
};
