const Sequelize = require('sequelize');

const { Provider } = require('../models');

module.exports = {
    async storeOrShow(req,res){
        const provedor = { ...req.body };
        const resultFromDB = await Provider.findOne({
            where: {
                nome: provedor.nome
            }
        })
        if(resultFromDB){
            res.status(204).json(resultFromDB);
        }
        else{
            Provider.create(provedor)
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err));
        }
    }
   
}
