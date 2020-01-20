const Sequelize = require("sequelize");

const { Path } = require("../models");
const { City } = require("../models");

const { existsOrError } = require("../utils/validation");

const Operation = Sequelize.Op;

module.exports = {
  index(req, res) {
    Path.findAll()
      .then(paths => res.json(paths))
      .catch(err => {
        console.log(err);
        return res.status(500).send(err);
      });
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
      existsOrError(
        path.departure,
        "O departure do trajeto deve ser informada"
      );
      existsOrError(path.arrival, "O arrival do trajeto deve ser informada");

      const initCityValidation = await City.findAll({
        where: {
          nome: path.initCidade
        }
      });

      existsOrError(
        initCityValidation,
        `Não existe nenhuma cidade cadastrada com o nome ${initCityValidation.nome} no sistema.`
      );

      const endCityValidation = await City.findAll({
        where: {
          nome: path.endCidade
        }
      });

      existsOrError(
        endCityValidation,
        `Não existe nenhuma cidade cadastrada com o nome ${endCityValidation.nome} no sistema.`
      );

      Path.create(path)
        .then(_ => res.status(204).send())
        .catch(err => {
          console.log(err);
          return res.status(500).send(err);
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },

  async show(req, res) {
    let checkById = false;
    const pathsData = req.params.data;
    console.log(pathsData);
    /*
        Verifica se o dado passado para a url é um número, para, assim, 
        fazer (ou não) uma pesquisa por id
        */
    if (!isNaN(pathsData)) checkById = true;

    /* 
        Caso a condição seja verdadeira será feita uma pesquisa por id,
        retornando, assim, apenas um usuário. Caso seja falsa, será feita
        uma pesquisa por nome, retornado vários usuários. 
        */
    if (checkById) {
      Path.findOne({
        where: {
          id: pathsData
        }
      })
        .then(paths => res.json(paths))
        .catch(err => {
          console.log(pathsData), res.status(500).send(err);
        });
    } else {
      Path.findAll({
        where: {
          initCidade: { [Operation.like]: `%${pathsData}%` }
        }
      })
        .then(paths => {
          console.log(paths);
          res.json(paths);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const path = { ...req.body };

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
      existsOrError(
        path.departure,
        "O departure do trajeto deve ser informada"
      );
      existsOrError(path.arrival, "O arrival do trajeto deve ser informada");

      const initCityValidation = await City.findAll({
        where: {
          nome: path.initCidade
        }
      });

      existsOrError(
        initCityValidation,
        `Não existe nenhuma cidade cadastrada com o nome ${initCityValidation.nome} no sistema.`
      );

      const endCityValidation = await City.findAll({
        where: {
          nome: path.endCidade
        }
      });

      existsOrError(
        endCityValidation,
        `Não existe nenhuma cidade cadastrada com o nome ${endCityValidation.nome} no sistema.`
      );
    } catch (msg) {
      return res.status(400).send(msg);
    }

    Path.findOne({
      where: {
        id
      }
    })
      .then(resultFromDB => {
        if (resultFromDB) {
          resultFromDB
            .update({
              ...path
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
      });

      existsOrError(
        resultFromDB,
        "Não foi encontrado um trajeto com o ID informado"
      );
    } catch (msg) {
      return res.status(400).send(msg);
    }

    Path.destroy({
      where: { id }
    })
      .then(_ => res.status(204).send())
      .catch(err => res.status(500).send(err));
  }
};
