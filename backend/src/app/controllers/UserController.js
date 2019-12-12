const Sequelize = require('sequelize');

const { User } = require('../models');
const { cryptPsw } = require('../utils/ProcessPassword');
const { existsOrError, notExistsOrError } = require('../utils/validation');

const Operation = Sequelize.Op;

module.exports = {
    //Mostra todos os usuários
    index(req, res) {
        User.findAll()
            .then(usuarios => res.json(usuarios))
            .catch(err => res.status(500).send(err));
    },
    //Salva um usuário
    async store(req, res) {
        const usuario = { ...req.body };

        try {
            existsOrError(usuario.nome, "O nome do usuário deve ser informado");
            existsOrError(usuario.login, "O login do usuário deve ser informado");
            existsOrError(usuario.email, "O email do usuário deve ser informado");
            existsOrError(usuario.cargo, "O cargo do usuário deve ser informado");
            existsOrError(usuario.senha, "A senha do usuário deve ser informada");

            let resultFromDB = await User.findOne({
                where: { login: usuario.login }
            });

            notExistsOrError(resultFromDB, `Já existe um usuário com o login ${usuario.login}`);

            resultFromDB = await User.findOne({
                where: { email: usuario.email }
            });

            notExistsOrError(resultFromDB, `Já existe um usuário com o email ${usuario.email}`);

        } catch (msg) {
            return res.status(400).send(msg);
        }

        //fazendo a criptografia Hash da senha do usuário
        usuario.senha = cryptPsw(usuario.senha);

        User.create(usuario)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err));


    },
    //Mostrar usuário(s) resultante(s) da pesquisa por id ou por nome
    async show(req, res) {
        let checkById = false;
        const userData = req.params.data;
        /*
        Verifica se o dado passado para a url é um número, para, assim, 
        fazer (ou não) uma pesquisa por id
        */
        if (!isNaN(userData)) checkById = true;

        /* 
        Caso a condição seja verdadeira será feita uma pesquisa por id,
        retornando, assim, apenas um usuário. Caso seja falsa, será feita
        uma pesquisa por nome, retornado vários usuários. 
        */
        if (checkById) {
            User.findOne({
                where: {
                    id: userData
                }
            })
                .then(usuario => res.json(usuario))
                .catch(err => res.status(500).send(err));
        }
        else {
            User.findAll({
                where: {
                    name: { [Operation.like]: `%${userData}%` }
                }
            })
                .then(usuarios => {
                    usuarios.forEach(user => {
                        // user.senha = 
                    });
                })
                .catch(err => res.status(500).send(err));
        }

    },
    //Atualiza um usuário
    async update(req, res) {
        const userId = req.params.data;
        const usuario = { ...req.body }
        try {
            existsOrError(usuario.nome, "O nome do usuário deve ser informado");
            existsOrError(usuario.login, "O login do usuário deve ser informado");
            existsOrError(usuario.email, "O email do usuário deve ser informado");
            existsOrError(usuario.cargo, "O cargo do usuário deve ser informado");
            existsOrError(usuario.senha, "A senha do usuário deve ser informada");

            let resultFromDB = await User.findOne({
                where: { login: usuario.login }
            });

            if(resultFromDB.login !== usuario.login)
                notExistsOrError(resultFromDB, `Já existe um usuário com o login ${usuario.login}`);

            resultFromDB = await User.findOne({
                where: { email: usuario.email }
            });

            if(resultFromDB.email !== usuario.email)
                notExistsOrError(resultFromDB, `Já existe um usuário com o email ${usuario.email}`);

        } catch (msg) {
            return res.status(400).send(msg);
        }

        User.findOne({
            where: {
                id: userId
            }
        }).then(resultFromDB => {
            if (resultFromDB) {
                resultFromDB.update({
                    ...usuario,
                    senha: cryptPsw(usuario.senha)
                })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err));
            }
        })
            .catch(err => res.status(500).send(err));

    },
    //Deleta um usuário
    async delete(req, res) {
        const userId = req.params.data;

        try {
            const resultFromDB = await User.findOne({
                where: {
                    id: userId
                }
            })

            existsOrError(resultFromDB, "Não foi encontrado um usuário com o ID informado");

        } catch (msg) {
            return res.status(400).send(msg);
        }

        User.destroy({
            where: { id: userId }
        })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err));

    }


}