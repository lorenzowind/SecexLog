const express = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const { server } = require('./.env');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.listen(server.port, () => {
  console.log(
    `Backend executado e rodando em ${server.host} na porta ${server.port}\nCTRL + C para parar`
  );
});
