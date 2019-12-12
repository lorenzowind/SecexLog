// const Sequelize = require('sequelize');

const { Path } = require('../models');
const { City } = require('../models');

const { existsOrError} = require('../utils/validation');

// const Operation = Sequelize.Op;

module.exports = {

    index(req, res) {
        Path.findAll()
            .then(paths => res.json(paths))
            .catch(err => res.status(500).send(err));
    },

    async store(req, res) {
        try {

            const path = { ...req.body };

            existsOrError(path.initCidade, "A cidade inicial deve ser informada");
            existsOrError(path.endCidade, "A cidade final deve ser informada");
            existsOrError(path.modalTipo, "O tipo modal ser informado");
            existsOrError(path.prestNome, "O nome do prestador deve ser informado");
            existsOrError(path.duration, "A duração do percurso deve ser informada");
            existsOrError(path.quilometragem, "A quilometragem deve ser informada");
            existsOrError(path.valor, "O valor da viagem deve ser informado");
            existsOrError(path.embarque, "O lugar de embarque deve ser informado");
            existsOrError(path.desembarque, "O lugar de desembarque deve ser informado");
            existsOrError(path.telefone, "O telefone do provedor deve ser informado");
            existsOrError(path.email, "O email do provedor deve ser informado");
            existsOrError(path.modal, "O modal da viagem deve ser informada");
            existsOrError(path.dia, "O dia do trajeto deve ser informado");
            existsOrError(path.hora, "A hora do trajeto deve ser informada");

            const initCityValidation = await City.findAll({
                where: {
                    nome: path.initCidade
                }
            })
            
            const endCityValidation = await City.findAll({
                where: {
                    nome: path.endCidade
                }
            })
            console.log(initCityValidation)
            console.log(endCityValidation)

            existsOrError(initCityValidation, `Não existe nenhuma cidade cadastrada com o nome ${initCityValidation.nome} no sistema.`);
            existsOrError(endCityValidation, `Não existe nenhuma cidade cadastrada com o nome ${endCityValidation.nome} no sistema.`);



            Path.create(path)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
            
            

        } catch (error) {
            return res.status(500).send(error)
        }
    },

    async show(req, res) {
        // let checkId = false;
        const pathData = req.params.data;

        // if (!isNaN(pathData)) checkId = true;

        // if (checkId) {
        Path.findOne({
            where: {
                id: pathData
            }
        })
            .then(path => res.json(path))
            .catch(err => res.status(500).send(err));
        // }
        // else {
        //     Path.findAll({
        //         where: {
        //             name: { [Operation.like]: `%${pathData}%` }
        //         }
        //     })
        //         .then(paths => res.json(paths))
        //         .catch(err => res.status(500).send(err));
        // }
    },

    async update(req, res) {
        const pathId = req.params.data;
        const path = { ...req.body }

        try {

            existsOrError(path.initCidade, "A cidade inicial deve ser informada");
            existsOrError(path.endCidade, "A cidade final deve ser informada");
            existsOrError(path.modalTipo, "O tipo modal ser informado");
            existsOrError(path.prestNome, "O nome do prestador deve ser informado");
            existsOrError(path.duration, "A duração do percurso deve ser informada");
            existsOrError(path.quilometragem, "A quilometragem deve ser informada");
            existsOrError(path.valor, "O valor da viagem deve ser informado");
            existsOrError(path.embarque, "O local de embarque deve ser informado");
            existsOrError(path.desembarque, "O local de desembarque deve ser informado");
            existsOrError(path.telefone, "O telefone do provedor deve ser informado");
            existsOrError(path.email, "O email do provedor deve ser informado");
            existsOrError(path.modal, "O modal da viagem deve ser informado");

            // let resultFromDB = await Path.findOne({
            //     where: { initCidade: path.initCidade }
            // });

            // if(resultFromDB.initCidade !== path.initCidade)
            //     notExistsOrError(resultFromDB, `Já existe uma cidade com o nome ${path.initCidade}`);

            // resultFromDB = await Path.findOne({
            //     where: { endCidade: path.endCidade }
            // });

            // if(resultFromDB.endCidade !== path.endCidade)
            //     notExistsOrError(resultFromDB, `${path.endCidade}`);

        } catch (msg) {
            return res.status(400).send(msg);
        }

        Path.findOne({
            where: {
                id: pathId
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
        const pathId = req.params.data;

        try {
            const resultFromDB = await Path.findOne({
                where: {
                    id: pathId
                }
            })

            existsOrError(resultFromDB, "Não foi encontrado um trajeto com o ID informado");

        } catch (msg) {
            return res.status(400).send(msg);
        }

        Path.destroy({
            where: { id: pathId }
        })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err));
    }
}