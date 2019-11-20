const Sequelize = require('sequelize');

const { City } = require('../models');
const { existsOrError, notExistsOrError } = require('../utils/validation');


const Operation = Sequelize.Op;


module.exports = {

    //Show all cities
    index(req, res) {
        City.findAll()
            .then(cities => res.json(cities))
            .catch(err => res.status(500).send(err));
    },


    //Saving Users city information
    async store(req, res) {
        try {
            const city = { ...req.body };

            existsOrError(city.nome, "O nome da cidade deve ser informado");
            existsOrError(city.relations, "As cidades relacionadas devem ser informadas");

            let resultFromDB = await City.findOne({
                where: { nome: city.nome }
            });
            notExistsOrError(resultFromDB, `Já existe uma cidade cadastrada com o nome ${city.nome}`);

            City.create(city)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));

        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async show(req, res) {
        let checkId = false;
        const cityData = req.params.data;

        if (!isNaN(cityData)) checkId = true;

        if (checkId) {
            City.findOne({
                where: { id: cityData }
            })
                .then(city => res.json(city))
                .catch(err => res.status(500).send(err));
        }
        else {
            City.findAll({
                where: {
                    nome: { [Operation.like]: `%${cityData}%` }
                }
            })
                .then(cities => res.json(cities))
                .catch(err => res.status(500).send(err));
        }
    },

    //Updating a city status
    async update(req, res) {
        const cityId = req.params.data;
        const city = { ...req.body };

        try {
            let resultFromDB = await City.findAll({
                where: {
                    nome: city.nome
                }
            });

            if (resultFromDB.nome !== city.nome)
                notExistsOrError(resultFromDB, `Já existe uma cidade cadastrada com o nome ${city.nome}`);

        } catch (error) {
            return res.status(400).send(error);
        }

        City.findOne({
            where: {
                id: cityId
            }
        }).then(resultFromDB => {
            if (resultFromDB) {
                resultFromDB.update({
                    ...city,
                })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err));
            }
        })

    },


    // This function deletes an city by id 
    async delete(req, res) {
        const cityId = req.params.data;

        try {
            const resultFromDB = await City.findOne({
                where: {
                    id: cityId
                }
            })

            existsOrError(resultFromDB, "Não foi encontrada uma cidade com o ID informado");


        } catch (error) {
            return res.status(500).send(error);
        }

        City.destroy({
            where: { id: cityId }
        })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err));
    }

}