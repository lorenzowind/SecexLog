import React from "react";

import secexlog_logo from "../../../assets/ConsultaManual/secexlog_logo.png";
import barra_progresso from "../../../assets/ConsultaManual/barra_progresso.png";

import Header from "../../../components/Menu/MenuBar/index";
import Campos from "../components/Campos/index";
import TelaLogin from "../../../components/Menu/TelaLogin/index";

import "./styles.css";

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
  };

  evento_retirarTrajeto = e => {
    if (this.trajetos.length > 1) {
      this.trajetos.pop();

      this.setState(state => ({
        trajetos: this.trajetos
      }));
    }
  };

  evento_consultar() {
    console.log("consultar");
  }

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

        {trajetos.map(item => (
          <Campos num={item.num} />
        ))}

        <div className="retirar-cidade">
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

        <div className="consulta">
          <input
            type="button"
            name="consulta"
            onClick={this.evento_consultar}
          />
        </div>

        <TelaLogin />
      </div>
    );
  }
}
