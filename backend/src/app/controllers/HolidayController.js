const Sequelize = require("sequelize");

const { Holiday } = require("../models");
const { City } = require("../models");

const { existsOrError } = require("../utils/validation");

const Operation = Sequelize.Op;

module.exports = {
  index(req, res) {
    Holiday.findAll({
      order: [
        ['nome','ASC']
      ]
    })
      .then(holidays => res.json(holidays))
      .catch(err => res.status(500).send(err));
  },

  async store(req, res) {
    const holiday = { ...req.body };

    try {
      existsOrError(holiday.nome, "O nome do feriado deve ser informado");
      existsOrError(holiday.cidade, "O nome da cidade deve ser informado");
      existsOrError(holiday.init, "O inicio do feriado deve ser informado");
      existsOrError(holiday.end, "O fim do feriado deve ser informado");

      const city = await City.findOne({
        where: {
          nome: holiday.cidade
        }
      });

      existsOrError(city, "A cidade não existe");
      delete holiday.cidade;
      holiday.city_id = city.id;
    } catch (msg) {
      return res.status(400).send(msg);
    }

    Holiday.create(holiday)
      .then(_ => res.status(204).send())
      .catch(err => res.status(500).send(err));
  },

  show(req, res) {
    // Holiday.findOne({
    //     where: {
    //         id: req.params.id
    //     }
    // })
    //     .then(holiday => {
    //         res.json(holiday)
    //     })
    //     .catch(err => res.status(500).send(err));
    let checkById = false;
    const holidayData = req.params.data;
    console.log(holidayData);
    /*
        Verifica se o dado passado para a url é um número, para, assim, 
        fazer (ou não) uma pesquisa por id
        */
    if (!isNaN(holidayData)) checkById = true;

    /* 
        Caso a condição seja verdadeira será feita uma pesquisa por id,
        retornando, assim, apenas um usuário. Caso seja falsa, será feita
        uma pesquisa por nome, retornado vários usuários. 
        */
    if (checkById) {
      Holiday.findOne({
        where: {
          id: holidayData
        }
      })
        .then(holidays => res.json(holidays))
        .catch(err => {
          console.log(holidayData), res.status(500).send(err);
        });
    } else {
      Holiday.findAll({
        where: {
          nome: { [Operation.like]: `%${holidayData}%` }
        }
      })
        .then(holidays => {
          console.log(holidays);
          res.json(holidays);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    }
  },

  async update(req, res) {
    const holiday = { ...req.body };

    try {
      existsOrError(holiday.nome, "O nome do feriado deve ser informado");
      existsOrError(holiday.cidade, "O nome da cidade deve ser informado");
      existsOrError(holiday.init, "O inicio do feriado deve ser informado");
      existsOrError(holiday.end, "O fim do feriado deve ser informado");

      const city = await City.findOne({
        where: {
          nome: holiday.cidade
        }
      });

      existsOrError(city, "A cidade não existe");
      delete holiday.cidade;
      holiday.city_id = city.id;
    } catch (msg) {
      return res.status(400).send(msg);
    }

    Holiday.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(resultFromDB => {
        if (resultFromDB) {
          resultFromDB
            .update(holiday)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err));
        }
      })
      .catch(err => res.status(500).send(err));
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const resultFromDB = await Holiday.findOne({
        where: {
          id
        }
      });
      existsOrError(resultFromDB, "Esse feriado não existe");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    Holiday.destroy({
      where: { id }
    })
      .then(_ => res.status(204).send())
      .catch(err => res.status(500).send(err));
  }
};
