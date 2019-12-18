const Sequelize = require("sequelize");

const { Provider, Modal } = require("../models");
const { existsOrError, notExistsOrError } = require("../utils/validation");

const Operation = Sequelize.Op;

module.exports = {
  index(req, res) {
    Provider.findAll()
      .then(providers => res.send(providers))
      .catch(err => res.status(500).send({ error: err }));
  },

  async store(req, res) {
    const provider = { ...req.body };

    try {
      existsOrError(provider.nome, "O nome do provedor deve ser informado");
      existsOrError(
        provider.telefone,
        "O telefone do prestador deve ser informado"
      );
      existsOrError(provider.email, "O email do prestador deve ser informado");
      existsOrError(provider.modal, "O modal do prestador deve ser informado");
      existsOrError(
        provider.preference,
        "Deve ser informada a preferência do prestador"
      );
      existsOrError(
        provider.preferenceTxt,
        "O CPF ou RG do prestador deve ser informado"
      );
      const modal = await Modal.findAll({
        where: {
          name: provider.modal
        }
      });
      existsOrError(modal, "O modal informado não existe");
    } catch (error) {
      return res.status(400).send(error);
    }

    Provider.create(provider)
      .then(_ => res.status(204).send())
      .catch(err => res.status(500).send(err));
  },

  show(req, res) {
    let checkById = false;
    const providersData = req.params.data;
    console.log(providersData);
    /*
        Verifica se o dado passado para a url é um número, para, assim, 
        fazer (ou não) uma pesquisa por id
        */
    if (!isNaN(providersData)) checkById = true;

    /* 
        Caso a condição seja verdadeira será feita uma pesquisa por id,
        retornando, assim, apenas um usuário. Caso seja falsa, será feita
        uma pesquisa por nome, retornado vários usuários. 
        */
    if (checkById) {
      Provider.findOne({
        where: {
          id: providersData
        }
      })
        .then(providers => res.json(providers))
        .catch(err => {
          console.log(providersData), res.status(500).send(err);
        });
    } else {
      Provider.findAll({
        where: {
          nome: { [Operation.like]: `%${providersData}%` }
        }
      })
        .then(providers => {
          console.log(providers);
          res.json(providers);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    }
  },

  update(req, res) {
    const { id } = req.params;
    const provider = { ...req.body };

    try {
      existsOrError(provider.nome, "O nome do provedor deve ser informado");
      existsOrError(
        provider.telefone,
        "O telefone do prestador deve ser informado"
      );
      existsOrError(provider.email, "O email do prestador deve ser informado");
      existsOrError(provider.modal, "O modal do prestador deve ser informado");
    } catch (error) {
      return res.status(500).send({ error: error });
    }

    Provider.findOne({
      where: {
        id
      }
    }).then(resultFromDB => {
      if (resultFromDB) {
        resultFromDB
          .update({
            ...provider
          })
          .then(_ => res.status(204).send())
          .catch(err => res.status(500).send(err));
      }
    });
  },

  delete(req, res) {
    const { id } = req.params;

    Provider.destroy({
      where: { id }
    })
      .then(_ => res.status(204).send())
      .catch(err => res.status(500).send(err));
  }
};
