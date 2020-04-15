require('dotenv/config');

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Backend executado e rodando em ${process.env.SERVER_HOST} na porta ${process.env.SERVER_PORT}\nCTRL + C para parar\n`
  );
});
