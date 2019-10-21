const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");

const app = express();

const port = 3333;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.listen(port, () => {
  console.log(
    `Backend executado e rodando em localhost na porta ${port}\nCTRL + C para parar`
  );
});
