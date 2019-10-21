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

#### Usuários: 

###### OBS: Os names dos inputs devem ser: nome, cargo, login, senha e email 

- Rotas com método GET: 
> - localhost:3333/users (retorna todos os usuários cadastrados)
> - localhost:3333/users/id_ou_login (retorna um usuário com parametro passado, podendo ser ID ou Login)

- POST: 
> localhost:3333/users (insere um usuário)

- PUT / DELETE: 
> localhost:3333/users/id (atualiza/deleta um usuário com o ID informado)

#### Opiniões:

###### OBS: Os names dos inputs devem ser: titulo e desc

- Rotas com método GET: 
> - localhost:3333/opinions (retorna todas as opiniões cadastradas)
> - localhost:3333/opinions/id (retorna uma opinião com parametro ID passado) *talvez  não seja útil, fiz por precaução* 

- POST: 
> localhost:3333/opinions (insere uma opiniao)

- PUT / DELETE:
> localhost:3333/opinions/id (atualiza/deleta uma opinião com ID informado) *talvez não seja útil, fiz por precaução*

