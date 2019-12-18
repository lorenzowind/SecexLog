const Sequelize = require("sequelize");

const { Modal } = require("../models");
const { existsOrError, notExistsOrError } = require("../utils/validation");

const Operation = Sequelize.Op;

module.exports = {
  index(req, res) {
    Modal.findAll()
      .then(modals => res.json(modals))
      .catch(err => res.status(500).send(err));
  },

  async store(req, res) {
    const modal = { ...req.body };

    try {
      existsOrError(modal.name, "O name do Modal deve ser informado");
      //   existsOrError(modal.imgUrl, "a imagem do modal deve ser informada");
      //   existsOrError(modal.safety, "informe se o local é seguro");
      //   existsOrError(modal.cost, "informe se o moda é caro");
      //   existsOrError(modal.fast, "informe se o modal é rápido");
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
    Modal.create(modal)
      .then(_ => res.status(204).send())
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  async show(req, res) {
    // const { id } = req.params;

    // Modal.findOne({
    //   where: { id }
    // })
    //   .then(modal => res.json(modal))
    //   .catch(err => res.status(500).send(err));
    let checkById = false;
    const modalData = req.params.data;
    console.log(modalData);
    /*
        Verifica se o dado passado para a url é um número, para, assim, 
        fazer (ou não) uma pesquisa por id
        */
    if (!isNaN(modalData)) checkById = true;

    /* 
        Caso a condição seja verdadeira será feita uma pesquisa por id,
        retornando, assim, apenas um usuário. Caso seja falsa, será feita
        uma pesquisa por nome, retornado vários usuários. 
        */
    if (checkById) {
      Modal.findOne({
        where: {
          id: modalData
        }
      })
        .then(modals => res.json(modals))
        .catch(err => {
          console.log(modalData), res.status(500).send(err);
        });
    } else {
      Modal.findAll({
        where: {
          name: { [Operation.like]: `%${modalData}%` }
        }
      })
        .then(modals => {
          console.log(modals);
          res.json(modals);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    }
  },

  update(req, res) {
    const { id } = req.params;
    const modal = { ...req.body };

    /*try {
            let resultFromDB = await Modal.findAll({
                where: {
                    name: modal.name
                }
            });

            if (resultFromDB.name !== modal.name)
                notExistsOrError(resultFromDB, `Já existe uma cidade cadastrada com o nome ${modal.name}`);

        } catch (error) {
            return res.status(400).send(error);
        }*/

    Modal.findOne({
      where: {
        id
      }
    }).then(resultFromDB => {
      if (resultFromDB) {
        resultFromDB
          .update({
            ...modal
          })
          .then(_ => res.status(204).send())
          .catch(err => res.status(500).send(err));
      }
    });
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const resultFromDB = await Modal.findOne({
        where: {
          id
        }
      });

      existsOrError(
        resultFromDB,
        "Não foi encontrado modal com o ID informado"
      );
    } catch (error) {
      return res.status(500).send(error);
    }

    Modal.destroy({
      where: { id }
    })
      .then(_ => res.status(204).send())
      .catch(err => res.status(500).send(err));
  }
};
