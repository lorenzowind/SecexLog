[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
![size-shield]
![commit-shield]

<br />
<p align="center">
  <a href="https://github.com/lorenzowind/SecexLog">
    <img src="logo.png" alt="Logo" width="480" height="120">
  </a>

  <h3 align="center">SecexLog Project</h3>

  <p align="center">
    Web software for planning the performance of audits in the state of Amazonas!
    <br />
    <a href="https://app.swaggerhub.com/apis/lorenzowind/SecexLog/1.0.0"><strong>Explore the API Spec »</strong></a>
    <br />
    <br />
    <a href="https://github.com/lorenzowind/SecexLog/issues/new">Report Bug</a>
    ·
    <a href="https://github.com/lorenzowind/SecexLog/issues/new">Request Feature</a>
  </p>
</p>

## Table of Contents
* [About the Project](#about-the-project)
* [Team](#team)
* [How to install?](#how-to-install)
* [Built With](#built-with)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

## About The Project
This project is about a software solution for the [Tribunal de Contas do Estado do Amazonas](https://www2.tce.am.gov.br/) in partnership of [Fundação Matias Machline](https://www.fundacaomatiasmachline.org.br/) that intends to improve the efficiency of the planning the performance of Audits in the interior of the State of Amazonas with logistical information such as Dates, Travel Time and Possible Travel Modes. 

The System aims to inform TCE officials responsible for planning the audits a complete logistical view since your departure until your return, also informing you of possible holidays in the desired period, or occurrence of public calamities, such as floods, and being possible to be updated with recent information on the use of logistics (eg New Modals, new service providers, new routes, etc). 

This system must be able to perform the logistical functions from Manaus to one, two or even 3 audited cities, eventually passing through a base city, and the return to Manaus.

## Team
- Débora Colhyer (Designer)
- Euclides Lins (Back-end developer)
- Gustavo Fadel (Front-end developer)
- Leonardo Viana (Back-end developer)
- Lorenzo Windmoller Martins (Full-stack developer)
- Pedro Henrique Martins (Back-end developer)
- Pedro Henrique Souza (Front-end developer)

## How to install?
1. To run the back-end, follow these steps:
- Navigate to the backend folder and install the dependencies:
```bash
// Navigate to the backend folder
$ cd backend

// Install application dependencies
$ yarn
```
- Install MySQL, Redis and Adminer Docker images using docker-compose:
```bash
// Run the Docker images
$ docker-compose up -d
```
- Create a file called .env based on .env.example and enter your AWS credentials;
- Create a file called .ormconfig.json based on .ormconfig.example.json and insert the MySQL host and port according to the previously installed Docker images, in addition to exchanging the src recipient for dist and .ts for .js;
- Configure the credentials of the MySQL Docker image using the following commands:
```bash
// Enter the MySQL image bash
$ docker exec -it IMAGE_NAME bash
// Enter the MySQL image root
$ mysql -u root -p
// Change the password
$ ALTER USER root IDENTIFIED WITH mysql_native_password BY ‘ROOT_USER_PASSWORD’;
```
- Run the database migrations using the command:
```bash
// Run the migrations
$ node_modules/.bin/typeorm migration:run
```
- Add a no-restart configuration for each Docker image using the command:
```bash
// Change the configuration of the Docker images
$ docker update --restart=unless-stopped ID_DA_IMAGEM
```
- Start the server using the command:
```bash
// Start the server
$ yarn dev:server
```
2. To run the front-end, follow these steps:
- Navigate to the frontend folder and install the dependencies:
```bash
// Navigate to the frontend folder
$ cd frontend

// Install application dependencies
$ yarn
```
- Create a file called .env based on .env.example and enter the API URL;
- Start the application using the command:
```bash
// Start the application
$ yarn start
```

## Built With
* Frontend framework: [React.js](https://reactjs.org/)
* Back-end framework: [Node.js](https://nodejs.org)
* Back-end data processing technology: [TypeORM](https://typeorm.io)
* Database technology: [MySQL](https://www.mysql.com/), [MongoDB](https://www.mongodb.com/), and [Redis](https://redis.io/)
* Technology for testing implementation: [Jest](https://jestjs.io/)
* Environment creation tool: [Docker](https://www.docker.com/)
* API documentation tool: [SwaggerHUB](https://swagger.io/tools/swaggerhub/)
* Prototyping tool: [Adobe XD](https://www.adobe.com/br/products/xd/features.html)

## Contact

Débora Colhyer - [LinkedIn](linkedin.com/in/débora-colhyer-395061195) - dcolhyer@gmail.com

Gustavo Fadel - [LinkedIn](linkedin.com/in/gustavo-fadel) - ghffadel@gmail.com

Euclides Lins - [LinkedIn](linkedin.com/in/euclides-lins) - euclidesvasconcelos01@gmail.com

Leonardo Viana - [LinkedIn](https://www.linkedin.com/in/leo-viana/) - vianaleonardo.es@gmail.com

Lorenzo Windmoller Martins - [LinkedIn](https://www.linkedin.com/in/lorenzo-windmoller-martins/) - lorenzomart01@gmail.com

Pedro Henrique Martins - [LinkedIn](linkedin.com/in/pedro-henrique-663094199) - pedroh93601@gmail.com

Pedro Henrique Souza - [LinkedIn](linkedin.com/in/pedroharaujo1952) - pedroaraujo1952@hotmail.com

## Acknowledgements
* [README Template by othneildrew](https://github.com/othneildrew/Best-README-Template)
* [Img Shields](https://shields.io)

[contributors-shield]: https://img.shields.io/github/contributors/lorenzowind/SecexLog?style=flat-square
[contributors-url]: https://github.com/lorenzowind/SecexLog/graphs/contributors

[issues-shield]: https://img.shields.io/github/issues/lorenzowind/SecexLog?style=flat-square
[issues-url]: https://github.com/lorenzowind/SecexLog/issues

[size-shield]: https://img.shields.io/github/repo-size/lorenzowind/SecexLog?style=flat-square

[commit-shield]: https://img.shields.io/github/last-commit/lorenzowind/SecexLog?style=flat-square