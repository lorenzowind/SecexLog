const { Path } = require("../../models");


module.exports = {
    index(req, res) {

        path = { ... req.body }


        Path.findAll({where: {
          path.initCidade,
          path.endCidade
}
})
            .then(paths => res.json(paths))
            .catch(err => res.status(500).send(err));
    }


}