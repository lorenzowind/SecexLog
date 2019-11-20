const passport = require('passport');
const passportJwt = require('passport-jwt');
const Sequelize = require('sequelize');

const { Path } = require('../models');
const { authSecret } = require('../../.env');
const { Strategy, ExtractJwt } = passportJwt;

module.exports = () => {

    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };

    const strategy = new Strategy(params, (payload, done) => {
        console.log(payload);
        Path.findOne({
            where: {
                id: payload.id
            }
        })
            .then(city => done(null, city ? { ...payload } : false))
            .catch(err => done(err, false));
    });

    passport.use(strategy);

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}