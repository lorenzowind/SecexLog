const Sequelize = require('sequelize');

const { Opinion } = require('../models');
const { existsOrError } = require('../utils/validation');


module.exports = {

    index(req, res) {
        Opinion.findAll()
            .then(opinioes => res.json(opinioes))
            .catch(err => res.status(500).send(err));
    },

    store(req, res) {
        const opiniao = { ...req.body };

        try {
            existsOrError(opiniao.titulo, "O título da opinião não foi informado");
            existsOrError(opiniao.desc, "A descrição da opinião está vazia");
        } catch (msg) {
            return res.status(400).send(msg);
        }
        Opinion.create(opiniao)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err));
    },

    show(req, res) {
        Opinion.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(opiniao => res.json(opiniao))
            .catch(err => res.status(500).send(err));


    },

    update(req, res) {
        const opiniao = { ...req.body };

        try {
            existsOrError(opiniao.titulo, "O título da opinião não foi informado");
            existsOrError(opiniao.desc, "A descrição da opinião está vazia");
        } catch (msg) {
            return res.status(400).send(msg);
        }

        Opinion.findOne({
            where: {
                id: req.params.id
            }
        }).then(resultFromDB => {
            if (resultFromDB) {
                resultFromDB.update(opiniao)
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err));
            }
        })
            .catch(err => res.status(500).send(err));

    },

    async delete(req, res) {
        const { id } = req.params;

        try {
            const resultFromDB = await Opinion.findOne({
                where: {
                    id
                }
            })
            existsOrError(resultFromDB, "Essa opinião não existe");
        } catch (msg) {
            return res.status(400).send(msg);
        }

        Opinion.destroy({
            where: { id }
        })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err));
    }
}