const Sequelize = require('sequelize');
const jwt = require('jwt-simple');

const { User } = require('../../models');
const { authSecret } = require('../../../.env');
const { comparePsw } = require('../../utils/ProcessPassword');

module.exports = {

    async signIn(req, res) {

        if (!req.body.login || !req.body.senha) {
            return res.status(400).send('É necessário preencher todos os campos');
        }

        const user = await User.findOne({
            attributes: ['id','nome','login','senha','email','cargo'],
            where: {
                login: req.body.login
            }
        })

        if (!user) {
            return res.status(400).send('Usuário não encontrado');
        }
        /*
            Verifica se as senha do usuário está certa, passando para o primeiro parâmetro 
            a senha do banco de dados e, no segundo, a senha digitada.
        */
        const isMatch = comparePsw(req.body.senha, user.senha);

        if(!isMatch) return res.status(400).send('Login ou senha incorreta!');
        /*
            Constante que irá armazenar a data atual em segundos para criar a data de emissão
            do token do usuário
        */
        const dateNow = Math.floor(Date.now() / 1000);
        //conteúdo do token a ser passado para gerar o mesmo
        const payload = {
            id: user.id,
            login: user.login,
            nome: user.nome,
            email: user.email,
            cargo: user.cargo,
            //iat: sigla para Emitido em...
            iat: dateNow,
            /* exp: data de expiração do token (1 dia)
               Para adicionar mais dias na expiração do token deve-se multiplicar o 24 pela quantidade
               de dias desejada, ex: (60 * 60 * 24 * 2) -> dois dias para o token expirar.
            */
            exp: dateNow + (60 * 60 * 2)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    },

    validateToken(req,res){
        const userData = req.body || null;
        try{
            if(userData)
            {
                const token = jwt.decode(userData.token, authSecret);
                if(new Date(token.exp * 1000) > new Date()){
                    //token ainda está valido
                    return res.send(true);
                }
            }
        }catch(e){
            /** 
             
                NÃO NECESSÁRIO
                problema com o token: expirou ou authSecret errada.

            **/
        }
        res.send(false);
    }

}
