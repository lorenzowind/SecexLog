const Sequelize = require('sequelize');
const crypto = require('crypto');

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

            if(!user) return res.status(400).send('Usuário não encontrado');

            // const token = crypto.randomBytes(20).toString('hex');

            // const now = new Date();
            // now.setHours(now.getHours() + 1);

            const newPass = generatePassword();

            User.findOne({
                where: {
                    id: user.id
                }
            }).then(resultFromDB => {
                if(resultFromDB)
                {
                    resultFromDB.update({
                        // senhaResetToken: token,
                        // senhaResetExpires: now,
                        senha: cryptPsw(newPass)
                        
                    })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err));

                }
            })
            .catch(err => res.status(500).send(err));

            mailer.sendMail({
                to: email,
                from: 'aphoreofficial@gmail.com',
                template: '/auth/forgot_password',
                context: { newPass, user }
            }, (err) => {
                if(err)
                    return res.status(400).send(err)
                
                return res.send();
            })  

        } catch (err) {
            console.log(err);
            return res.status(400).send({ erro: 'erro ao recuperar senha' });
        }

    }

}