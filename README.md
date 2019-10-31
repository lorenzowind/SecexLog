### SecexLog

## Sprint 01
- 29/11/2019

## Como usar o backend: 

### 1. Inicialização

- Instalar os pacotes dentro da pasta (comando: npm i --save)
- Dentro do terminal rodar o comando: npm run dev (uma mensagem de sucesso vai aparecer)

### 2. Fazer as tabelas aparecerem no banco de dados 

- É necessário ter um banco de dados chamado secex_log criado 
- O usuário do banco deve ser root e a senha deve estar vazia (padrão do Xampp)
- Com o terminal aberto dentro da pasta backend, entrar na pasta src (cd src) e rodar o comando npx sequelize db:migrate

### 3. Rotas para consumo de dados:

##### OBS: Todos os retornos são em JSON

#### Login:

- POST:
> localhost:3333/login (realizará a autenticação do usuário através do login e senha)
###### OBS: A resposta dessa rota (em caso de sucesso) será um `json` com as informações do usuário junto com o `token` de autenticação do mesmo, o token servirá, basicamente, para verificar se o usuário está logado e para controlar seu nível de acesso (por exemplo: verificar se ele pode, ou não, acessar uma área de administrador). O json da resposta em caso de sucesso no login será desse formato: 
```
{
  id,
  login,
  nome,
  email,
  cargo,
  token,
  iat,
  exp
}
```
###### Os campos estarão exatamente com esses mesmos nomes. Os campos iat e exp significam, respectivamente, `emitido em (...)` e `expira em (...)`. Como os nomes sugerem, esses campos indicarão quando o token foi criado e quando ele será expirado (1 dia após a criação), isso serve para manter o controle das autenticações no sistema. Reiterando: é importante guardar o token do usuário pelos motivos explicados anteriormente, `o token deve ser passado como header (o name do header deve ser, exatamente, Authorization)` quando o usuário fizer alguma requisição (por exemplo: cadastrar um usuário), `já que o usuário não tem acesso a ele` (front-end deve predefinir isso). Exemplo de como deve estar o token no header Authorization: `bearer tokendeexemplo12345`

- GET: 
> localhost:3333/validateToken (validar o token)
###### OBS: deve receber o token já predefinido em uma requisição do tipo body. Essa rota retorna true ou false.

#### Recuperar senha:

- POST:
> localhost:3333/forgot_password
##### OBS: deve receber o email do usuário em uma requisição do tipo body e, em caso de sucesso, enviará um email para o usuário com uma nova senha gerada automaticamente. Como o sistema não está em produção, a plataforma usada para o teste dos emails foi o `mailtrap`.

#### Usuários: 

###### Os names dos inputs são: nome, cargo, login, senha e email 

- Rotas com método GET: 
> - localhost:3333/users (retorna todos os usuários cadastrados)
> - localhost:3333/users/id_ou_login (retorna um usuário com parametro passado, podendo ser ID ou Login)

- POST: 
> localhost:3333/users (insere um usuário)

- PUT / DELETE: 
> localhost:3333/users/id (atualiza/deleta um usuário com o ID informado)

#### Opiniões:

###### Os names dos inputs são: titulo e desc

- Rotas com método GET: 
> - localhost:3333/opinions (retorna todas as opiniões cadastradas)
> - localhost:3333/opinions/id (retorna uma opinião com parametro ID passado) *talvez  não seja útil, fiz por precaução* 

- POST: 
> localhost:3333/opinions (insere uma opiniao)

- PUT / DELETE:
> localhost:3333/opinions/id (atualiza/deleta uma opinião com ID informado) *talvez não seja útil, fiz por precaução*

#### Cidades:

##### Os names dos inputs são: nome(String), cBase(booleano -> indica se a cidade é base ou não), cAuditada(booleano -> indica se a cidade é auditada ou não), initDataFeriado(String), endDataFeriado(String), initDataCheia(String), endDataCheia(String), obsInterdicao(String -> observação de interdição), obsCidade(String -> observação de cidade). Somente os três primeiros campos são obrigatórios no back-end. 

- Rotas com método GET: 
> - localhost:3333/cities (retorna todas as cidades cadastradas)
> - localhost:3333/cities/id_ou_nome (retorna uma cidade com parametro id ou nome passado)  

- POST: 
> localhost:3333/cities (insere uma cidade)

- PUT / DELETE:
> localhost:3333/cities/id (atualiza/deleta uma opinião com ID informado)

#### Trajetos: 

##### Os names dos inputs são: initCidade(String), endCidade(String), modalTipo(String), prestNome(String), dia(String), hora(String), duration(String), quilometragem(Double), valor(Double), embarque(String), desembarque(String), telefone(String), email(String), modal(String)

#### OBS: Essa rota trabalha em conjunto com a rota de prestadores (próxima rota)

- Rotas com método GET: 
> - localhost:3333/paths (retorna todos os trajetos cadastrados)
> - localhost:3333/cities/id (retorna um trajeto com parametro id informado)  

- POST: 
> localhost:3333/paths (insere um trajeto)

- PUT / DELETE:
> localhost:3333/paths/id (atualiza/deleta um trajeto com ID informado)

#### Prestadores:

#### OBS: Essa rota trabalha junto com a rota de trajetos, portanto, vai recuperar, no cadastro de trajetos, somente os campos em comum entre essas duas tabelas: prestNome, telefone e email.

- GET: 
> - localhost:3333/paths (procura um prestador com o nome informado pelo input prestNome)
> - - Se o prestador existir, vai retornar um JSON no formato: 
```
  {
    "id": 5,
    "nome": "nomeDeExemplo",
    "telefone": "99999999",
    "email": "emailexemplo@email.com",
    "createdAt": "2019-10-30T21:59:06.000Z",
    "updatedAt": "2019-10-30T21:59:06.000Z"
  }
```
> - - Se o prestador não existir, a requisição retorna um erro do tipo 500 (internal server error) e um json no formato:
```
  {
    "error": "provider not exists"
  }
```

- POST: 
> - localhost:3333/paths (insere um prestador)
> - - Essa rota só deve ser chamada caso o prestador não exista e somente quando o usuário confirmar o cadastro do trajeto. 
