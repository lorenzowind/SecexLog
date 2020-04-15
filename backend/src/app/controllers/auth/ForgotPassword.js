require('dotenv/config');

const { User } = require('../../models');
const { generatePassword, cryptPsw } = require('../../utils/ProcessPassword');

const mailer = require('../../../modules/mailer');

module.exports = {

    async recoverPass(req, res) {

        const { email } = req.body;

        try {

            const user = await User.findOne({
                where: { email }
            })

            if (!user) return res.status(400).send('Usuário não encontrado');

            const newPass = generatePassword();

            User.findOne({
                where: {
                    id: user.id
                }
            }).then(resultFromDB => {
                if (resultFromDB) {
                    resultFromDB.update({
                        senha: cryptPsw(newPass)
                    })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(500).send(err));

                }
            })
                .catch(err => res.status(500).send(err));

            mailer.sendMail({
                to: email,
                from: process.env.ACCOUNT_EMAIL,
                template: '/auth/forgot_password',
                subject: "SecexLog - Mudança de Senha",
                context: { newPass, user }
            })

        } catch (err) {
            console.log(err);
            return res.status(400).send({ erro: 'erro ao recuperar senha' });
        }

    }

}