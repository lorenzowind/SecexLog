const Sequelize = require("sequelize");

const { Path } = require("../../models");
const Operation = Sequelize.Op;

module.exports = {
  index(req, res) {
    path = { ...req.body };

    Path.findAll({
      where: {
        initCidade: { [Operation.like]: `%${path.initCidade}%` },
        endCidade: { [Operation.like]: `%${path.endCidade}%` }
      }
    })
      .then(paths => res.json(paths))
      .catch(err => res.status(500).send(err));
  }
};
