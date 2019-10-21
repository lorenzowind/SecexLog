const UserController = require('./app/controllers/UserController');
const OpinionController = require('./app/controllers/OpinionController');


module.exports = app => {

    /* ROTAS DE USUÁRIOS */

    app.route('/users')
       .get(UserController.index)
       .post(UserController.store);
    
    app.route('/users/:data')
       .get(UserController.show)
       .put(UserController.update)
       .delete(UserController.delete);
    
   /* ROTAS DE OPINIÕES */

   app.route('/opinions')
      .get(OpinionController.index)
      .post(OpinionController.store)
   
   app.route('/opinions/:id')
      .get(OpinionController.show)
      .put(OpinionController.update)
      .delete(OpinionController.delete)

}