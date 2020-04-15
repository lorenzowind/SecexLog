const Holiday = require('../../models');

module.exports = {
    show(req, res)
     {
        const holiday = { ...req.body };
        Holiday.findAll({
            where: {
                cidade: holiday.cidade
            }
        })
            .then(holiday => {
                res.json(holiday)
            })
            .catch(err => res.status(500).send(err));
    },
}