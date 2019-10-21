const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);
/* Função usada para criptografar a senha, 
retorna o hash da senha digitada pelo usuário */
function cryptPsw(password)
{
    return bcrypt.hashSync(password, salt);
}
/*Função usada para descriptografar a senha
  Recebe a senha que está no database e a senha digitada
*/
function uncryptPsw(password, typedpass)
{

}

module.exports = { cryptPsw }