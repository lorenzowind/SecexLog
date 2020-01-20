require('dotenv/config');

const passport = require('passport');
const passportJwt = require('passport-jwt');
const Sequelize = require('sequelize');

const { User } = require('../models');
const { Strategy, ExtractJwt } = passportJwt;

const authSecret = process.env.AUTH_SECRET

module.exports = () => {

    //parametros usados para criar a estratégia
    const params = {
        //segredo usado para decodificar o token
        secretOrKey: authSecret,
        //vai pegar o token que veio seguido de 'bearer' no header Authorization
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };

    const strategy = new Strategy(params, (payload, done) => {
        User.findOne({
            // attributes: ['id','nome','login','cargo','email'],
            where: {
                id: payload.id
            }
        })
            .then(usuario => done(null, usuario ? { ...payload } : false))
            .catch(err => done(err, false));
    });

    passport.use(strategy);

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}