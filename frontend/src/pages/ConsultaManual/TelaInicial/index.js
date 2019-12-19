import React from "react";

import secexlog_logo from "../../../assets/ConsultaManual/secexlog_logo.png";
import barra_progresso from "../../../assets/ConsultaManual/barra_progresso.png";

import Header from "../../../components/Menu/MenuBar/index";
import Campos from "../components/Campos/index";

import "./styles.css";

var Style = {
  display: "none"
};

export default class Tela_inicial extends React.Component {
  trajetos = [{ num: 1 }];

  state = {
    trajetos: this.trajetos
  };

  evento_adicionarTrajeto = e => {
    let novo_trajeto = {
      num: this.trajetos.length + 1
    };

    this.trajetos.push(novo_trajeto);

    this.setState(state => ({
      trajetos: this.trajetos
    }));

    if (this.trajetos.length > 1) {
      Style.display = "table-cell";
    }
  };

  evento_retirarTrajeto = e => {
    if (this.trajetos.length > 1) {
      this.trajetos.pop();

      this.setState(state => ({
        trajetos: this.trajetos
      }));
    }

    if (this.trajetos.length === 1) {
      Style.display = "none";
    }
  };

  evento_consultar() {}

  componentDidMount = () => {
    if (this.trajetos.length === 1) {
      Style.display = "none";
    }
  };

  operacao = () => {
    const { trajetos } = this.state;
    const Style1Element = {
      display: "table-cell",
      float: "left",
      marginLeft: "67%",
      paddingTop: "2%"
    };
    const Style2Element = {
      display: "table-cell",
      float: "left",
      marginLeft: "54%",
      paddingTop: "2%"
    };
    const StyleLastElement = {
      display: "table-cell",
      float: "left",
      marginLeft: "76%",
      paddingTop: "2%"
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
          <div className="retirar-cidade" id="retirarCidade">
            <h1 id="retira" onClick={this.evento_retirarTrajeto}>
              -
            </h1>
            <h1 id="retirar-cidade" onClick={this.evento_retirarTrajeto}>
              Retirar cidade
            </h1>

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

    return (
      <div className="tela-inicial">
        <Header />

        <div className="logo_secexlog">
          <img src={secexlog_logo} alt="" />
        </div>

        <div className="barra_progresso">
          <img src={barra_progresso} alt="" />
        </div>

        {trajetos.map((item, index) => (
          <Campos num={item.num} key={index} />
        ))}

        <div>{this.operacao()}</div>

        <div className="consulta">
          <input
            type="button"
            name="consulta"
            onClick={this.evento_consultar}
          />
        </div>
      </div>
    );
  }
}
