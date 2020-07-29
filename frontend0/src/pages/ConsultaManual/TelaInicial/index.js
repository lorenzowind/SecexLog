import React from "react";
import { Redirect } from "react-router";
import DatePicker from "../components/DatePicker/index";
import Select from "react-select";

import secexlog_logo from "../../../assets/ConsultaManual/secexlog_logo.png";
import barra_progresso from "../../../assets/ConsultaManual/barra_progresso.png";

import Header from "../../../components/Menu/MenuBar/index";
import Campos from "../components/Campos/index";
import Loading from "../../../components/Loading";

import api from "../../../services/api";

import "./styles.css";

var Style = {
  display: "none",
};

class Trajeto {
  constructor(cidadeIda_, dataIda_, cidadeVolta_, dataVolta_) {
    this.cityDeparture = cidadeIda_;
    this.dateDeparture = dataIda_;
    this.cityRegress = cidadeVolta_;
    this.dateRegress = dataVolta_;
  }
}

class MatrizTrajetos {
  constructor(trajetos_) {
    this.trajetos = trajetos_;
  }
}

export default class Tela_inicial extends React.Component {
  trajetos = [{ num: 1 }];

  constructor(props) {
    super(props);
    this.state = {
      saida: "",
      destino: "",

      trajetos: this.trajetos,
      resultado: false,
      matriz_trajetos: null,
      cidades: null,
      loading: false,

      testState: null,
    };
  }

  componentWillMount() {
    this.loadCities();
  }

  loadCities = async () => {
    this.setState({ loading: false });

    await setTimeout(() => {
      api
        .get("/cities")
        .then((res) => {
          let cidades = [];
          res.data.forEach((element, index) => {
            if (element.nome !== "Nacional") {
              cidades.push({
                label: element.nome,
                value: element.nome,
              });
            }
          });
          this.setState({ loading: true, cidades });
        })
        .catch((err) => {
          alert(err);
          window.location.reload();
        });
    }, 1200);
  };

  evento_adicionarTrajeto = (e) => {
    let novo_trajeto = {
      num: this.trajetos.length + 1,
    };

    this.trajetos.push(novo_trajeto);

    this.setState({ trajetos: this.trajetos });

    if (this.trajetos.length > 1) {
      Style.display = "table-cell";
    }
  };

  evento_retirarTrajeto = (e) => {
    if (this.trajetos.length > 1) {
      this.trajetos.pop();

      this.setState({ trajetos: this.trajetos });
    }

    if (this.trajetos.length === 1) {
      Style.display = "none";
    }
  };

  evento_consultar = () => {
    if (this.state.trajetos.length > 1) {
      var campos = document.getElementsByClassName("campos");
      var ida = document.getElementsByClassName("ida");

      var trajetos = [];

      for (var i = 0; i < campos.length; i++) {
        var cidadeIda = campos[i].children[0].children[1].innerText;
        var cidadeVolta = campos[i].children[0].children[2].innerText;

        var dataIda =
          ida[i].children[0].childNodes[0].childNodes[0].childNodes[0]
            .childNodes[0].value;
        var dataVolta =
          ida[i].children[1].childNodes[0].childNodes[0].childNodes[0]
            .childNodes[0].childNodes[0].value;
        trajetos.push(
          new Trajeto(
            cidadeIda,
            dataIda.substr(0, 5),
            cidadeVolta,
            dataVolta.substr(0, 5)
          )
        );
      }

      var matriz_trajetos = new MatrizTrajetos(trajetos);

      this.setState({ resultado: true, matriz_trajetos: matriz_trajetos });
    } else {
      var campos1 = document.getElementsByClassName("ida1");

      trajetos = [];

      for (i = 0; i < campos1.length; i++) {
        cidadeIda = this.state.saida;
        cidadeVolta = this.state.destino;
        dataIda =
          campos1[i].children[0].childNodes[0].childNodes[0].childNodes[0]
            .childNodes[0].value;
        dataVolta =
          campos1[i].children[2].childNodes[0].childNodes[0].childNodes[0]
            .childNodes[0].value;
        trajetos.push(
          new Trajeto(
            cidadeIda,
            dataIda.substr(0, 5),
            cidadeVolta,
            dataVolta.substr(0, 5)
          )
        );
      }

      matriz_trajetos = new MatrizTrajetos(trajetos);
      this.setState({ resultado: true, matriz_trajetos: matriz_trajetos });
    }
  };

  componentDidMount() {
    if (this.trajetos.length === 1) {
      Style.display = "none";
    }
  }

  getDay = (state) => {};

  handleChange = (cidade, name) => {
    cidade = cidade.value;
    if (name.name === "saida") {
      this.setState({ saida: cidade });
    } else {
      this.setState({ destino: cidade });
    }
  };

  operacao = () => {
    const { trajetos } = this.state;
    const Style1Element = {
      float: "left",
      marginTop: "5%",
    };
    const Style2Element = {
      display: "flex",
      float: "left",
      marginTop: "5%",
    };
    const StyleLastElement = {
      display: "flex",
      float: "left",
      marginTop: "5%",
    };

    if (trajetos.length === 1) {
      return (
        <div className="operacao" style={Style1Element}>
          <div className="adicionar-cidade">
            <h1 id="adiciona" onClick={this.evento_adicionarTrajeto}>
              +
            </h1>
            <h1 id="adicionar-cidade" onClick={this.evento_adicionarTrajeto}>
              Mais cidades para auditar
            </h1>
          </div>
        </div>
      );
    } else if (trajetos.length > 1 && trajetos.length < 4) {
      return (
        <div className="operacao" style={Style2Element}>
          <div className="operacao2">
            <div className="retirar-cidade" id="retirarCidade">
              <h1 id="retira" onClick={this.evento_retirarTrajeto}>
                -
              </h1>
              <h1 id="retirar-cidade" onClick={this.evento_retirarTrajeto}>
                Retirar cidade
              </h1>
            </div>
            <div className="adicionar-cidade">
              <h1 id="adiciona" onClick={this.evento_adicionarTrajeto}>
                +
              </h1>
              <h1 id="adicionar-cidade" onClick={this.evento_adicionarTrajeto}>
                Mais cidades para auditar
              </h1>
            </div>
          </div>
        </div>
      );
    } else if (trajetos.length >= 4) {
      return (
        <div className="operacao" style={StyleLastElement}>
          <h1 id="retira" onClick={this.evento_retirarTrajeto}>
            -
          </h1>
          <h1 id="retirar-cidade" onClick={this.evento_retirarTrajeto}>
            Retirar cidade
          </h1>
        </div>
      );
    }
  };

  render() {
    const { trajetos } = this.state;

    const { resultado } = this.state;

    if (resultado) {
      return (
        <Redirect
          to={{
            pathname: "/consulta-manual",
            state: { matriz_trajetos: this.state.matriz_trajetos },
          }}
        />
      );
    }

    const theme = (theme) => ({
      ...theme,

      colors: {
        ...theme.colors,
        primary25: "",
        primary: "#b0b0b0",
      },
    });

    const selectStyle = {
      control: (styles) => ({
        ...styles,
        outline: "none",
        height: "61px",
        width: "97%",
        border: "none",
      }),
      option: (styles) => ({ ...styles }),
    };

    return this.state.loading ? (
      <div className="tela-inicial">
        <Header />

        <div className="logo_secexlog">
          <img src={secexlog_logo} alt="" />
        </div>

        <div className="barra_progresso">
          <img src={barra_progresso} alt="" />
        </div>

        <div className="operations">
          {trajetos.length > 1 ? (
            <div>
              {trajetos.map((item, index) => (
                <div key={index}>
                  <Campos
                    num={item.num}
                    key={index}
                    cidades={this.state.cidades}
                  />
                </div>
              ))}
              {this.operacao()}
            </div>
          ) : (
            <div className="campos1">
              <div className="cidade-saida1">
                <div className="selectInitial saida">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="saida"
                    placeholder=""
                    options={this.state.cidades}
                    theme={theme}
                    styles={selectStyle}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="cidade-destino1">
                <div className="selectInitial destino">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="destino"
                    placeholder=""
                    options={this.state.cidades}
                    theme={theme}
                    onChange={this.handleChange}
                    styles={selectStyle}
                  />
                </div>
              </div>

              <div className="ida1">
                <div>
                  <DatePicker getDay={this.getDay.bind(this)} sum={0} />
                </div>
                <hr />
                <div>
                  <DatePicker getDay={this.getDay.bind(this)} sum={1} />
                </div>
              </div>
              {this.operacao()}
            </div>
          )}
        </div>

        <div className="consulta">
          <input
            type="button"
            name="consulta"
            onClick={this.evento_consultar}
          />
        </div>
      </div>
    ) : (
      <Loading />
    );
  }
}
