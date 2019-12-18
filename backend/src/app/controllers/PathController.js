// const Sequelize = require('sequelize');

const { Path } = require('../models');
const { City } = require('../models');

const { existsOrError } = require('../utils/validation');

// const Operation = Sequelize.Op;

module.exports = {

    index(req, res) {
        Path.findAll()
            .then(paths => res.json(paths))
            .catch(err => { console.log(err); return res.status(500).send(err) });
    },

    async store(req, res) {
        try {

            const path = { ...req.body };

            existsOrError(path.initCidade, "A cidade inicial deve ser informada");
            existsOrError(path.endCidade, "A cidade final deve ser informada");
            existsOrError(path.modal, "O modal ser informado");
            existsOrError(path.prestNome, "O nome do prestador deve ser informado");
            existsOrError(path.dia, "O dia do trajeto deve ser informado");
            existsOrError(path.hora, "A hora do trajeto deve ser informada");
            //--
            existsOrError(path.duration, "A duration do trajeto deve ser informada");
            existsOrError(path.mileage, "A mileage do trajeto deve ser informada");
            existsOrError(path.cost, "O cost do trajeto deve ser informada");
            existsOrError(path.departure, "O departure do trajeto deve ser informada");
            existsOrError(path.arrival, "O arrival do trajeto deve ser informada");

            const initCityValidation = await City.findAll({
                where: {
                    nome: path.initCidade
                }
            })

            existsOrError(initCityValidation, `Não existe nenhuma cidade cadastrada com o nome ${initCityValidation.nome} no sistema.`);

            const endCityValidation = await City.findAll({
                where: {
                    nome: path.endCidade
                }
            })

            existsOrError(endCityValidation, `Não existe nenhuma cidade cadastrada com o nome ${endCityValidation.nome} no sistema.`);

            Path.create(path)
                .then(_ => res.status(204).send())
                .catch(err => { console.log(err); return res.status(500).send(err) });


        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    },

    async show(req, res) {
        const { id } = req.params;

        Path.findOne({
            where: {
                id
            }
        })
            .then(path => res.json(path))
            .catch(err => res.status(500).send(err));
    },

    async update(req, res) {
        const { id } = req.params;
        const path = { ...req.body }

        try {

            existsOrError(path.initCidade, "A cidade inicial deve ser informada");
            existsOrError(path.endCidade, "A cidade final deve ser informada");
            existsOrError(path.modal, "O modal ser informado");
            existsOrError(path.prestNome, "O nome do prestador deve ser informado");
            existsOrError(path.dia, "O dia do trajeto deve ser informado");
            existsOrError(path.hora, "A hora do trajeto deve ser informada");
            //--
            existsOrError(path.duration, "A duration do trajeto deve ser informada");
            existsOrError(path.mileage, "A mileage do trajeto deve ser informada");
            existsOrError(path.cost, "O cost do trajeto deve ser informada");
            existsOrError(path.departure, "O departure do trajeto deve ser informada");
            existsOrError(path.arrival, "O arrival do trajeto deve ser informada");


            const initCityValidation = await City.findAll({
                where: {
                    nome: path.initCidade
                }
            })

            existsOrError(initCityValidation, `Não existe nenhuma cidade cadastrada com o nome ${initCityValidation.nome} no sistema.`);

            const endCityValidation = await City.findAll({
                where: {
                    nome: path.endCidade
                }
            })

            existsOrError(endCityValidation, `Não existe nenhuma cidade cadastrada com o nome ${endCityValidation.nome} no sistema.`);

        } catch (msg) {
            return res.status(400).send(msg);
        }

        Path.findOne({
            where: {
                id
            }
        }).then(resultFromDB => {
            if (resultFromDB) {
                resultFromDB.update({
                    ...path,
                })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err));
            }
        })
            .catch(err => res.status(500).send(err));
    },

    async delete(req, res) {
        const { id } = req.params;

        try {
            const resultFromDB = await Path.findOne({
                where: {
                    id
                }
            })

            existsOrError(resultFromDB, "Não foi encontrado um trajeto com o ID informado");

        } catch (msg) {
            return res.status(400).send(msg);
        }

        Path.destroy({
            where: { id }
        })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err));
    }
}