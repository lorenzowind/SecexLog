# Secex Log © [API]

Esta é a API do projeto SecexLog, um projeto do [Tribunal de Contas do Estado do Amazonas (TCE-AM)](https://www.tce.am.gov.br) feito por alunos da [Fundação Matias Machline (FMM)](https://www.fundacaomatiasmachline.org.br). 

- [Clique aqui](https://github.com/leoskrr/SecexLog-API) para acessar o repositório oficial do back-end.
 
## 1. Configurações iniciais:

Ao digitar `npm install --save` no seu terminal todas as dependências da API serão instaladas.

### 1.1. Variáveis de Ambiente

As variáveis de ambiente seguem o formato exposto no arquivo [.env.example](https://github.com/leoskrr/SecexLog-API/blob/master/.env.example) na raíz do projeto, e sua descrição pode ser encontrada a seguir:
```
AUTH_SECRET= hash md5 secreto da aplicação

SERVER_HOST= endereço que será usado para acesso à API. (ex: localhost)
SERVER_PORT= porta do endereço da API

DB_USER= usuário que será usado no banco de dados
DB_PASS= senha do usuário do banco de dados
DB_NAME= nome do banco de dados
DB_HOST= endereço do banco de dados (ex: 127.0.0.1)

MAIL_HOST= host smtp/imap/pop do serviço que será utilizado para envio de e-mails
MAIL_PORT= porta do host de e-mails
MAIL_USER= usuário usado para serviços de e-mail
MAIL_PASS= senha do usuário

ACCOUNT_EMAIL= conta utilizada para serviços de e-mail
```

O arquivo `.env` deve ser criado na raíz do projeto.

### 1.2. Banco de dados

O banco de dados é manipulado através da biblioteca [Sequelize ORM V5](https://sequelize.org/v5/), suas credenciais podem ser encontradas no arquivo `config/database.js` e alteradas no .env da aplicação. Para preencher o banco de dados com as tabelas da aplicação, siga estes passos: 

- 1. Crie um banco de dados com o mesmo nome da variável de ambiente "DB_NAME" existente no arquivo .env;
- 2. No terminal, digite `npx sequelize db:migrate` para realizar todas as migrações no banco de dados. Obs: As migrações podem ser encontradas no arquivo `database/migrations.js`

> Mais informações sobre a CLI do Sequelize podem ser encontradas [aqui](https://sequelize.org/v5/manual/migrations.html).