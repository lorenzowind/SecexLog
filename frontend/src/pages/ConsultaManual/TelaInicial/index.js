import React from "react";
import { Redirect } from "react-router";

import secexlog_logo from "../../../assets/ConsultaManual/secexlog_logo.png";
import barra_progresso from "../../../assets/ConsultaManual/barra_progresso.png";

import Header from "../../../components/Menu/MenuBar/index";
import Campos from "../components/Campos/index";

import "./styles.css";

var Style = {
  display: "none"
};

class Trajeto {
  constructor(
    cidadeIda_,
    cidadeVolta_,
    data_,
    exists_,
    path_id_
  ){
    this.cidadeIda = cidadeIda_;
    this.cidadeVolta = cidadeVolta_;
    this.data = data_;
    this.exists = exists_;
    this.path_id = path_id_;
  }
}

class MatrizTrajetos {
  constructor(trajetos_){
    this.trajetos = trajetos_;
  }
}

export default class Tela_inicial extends React.Component {
  
  trajetos = [{ num: 1 }];

  constructor(props){
    super(props);
    this.state = {
      trajetos: this.trajetos,
      resultado: false,
      matriz_trajetos: null
    }
  }

  evento_adicionarTrajeto = e => {
    let novo_trajeto = {
      num: this.trajetos.length + 1
    };

    this.trajetos.push(novo_trajeto);

    this.setState({trajetos: this.trajetos});

    if (this.trajetos.length > 1) {
      Style.display = "table-cell";
    }
  };

  evento_retirarTrajeto = e => {
    if (this.trajetos.length > 1) {
      this.trajetos.pop();

      this.setState({trajetos: this.trajetos});
    }

    if (this.trajetos.length === 1) {
      Style.display = "none";
    }
  };

  evento_consultar = () => {

    var campos = document.getElementsByClassName("campos");
    
    var trajetos = [];

    for(var i=0;i<campos.length;i++){
      var cidadeIda = campos[i].children[0].children[1].children[0].value;
      var cidadeVolta = campos[i].children[0].children[2].children[0].value;
      var data = campos[i].children[0].children[3].childNodes[0].childNodes[0].childNodes[0].childNodes[0].value;
      trajetos.push(new Trajeto(cidadeIda, cidadeVolta, data, false, []));
    }

    var matriz_trajetos = new MatrizTrajetos(trajetos);

    this.setState({resultado: true, matriz_trajetos: matriz_trajetos});

  }

  componentDidMount = () => {
    if (this.trajetos.length === 1) {
      Style.display = "none";
    }
  };

  render() {
    const { trajetos } = this.state;

    const { resultado } = this.state;

    if (resultado) {
      return <Redirect to={{pathname: "/consulta-manual", state: {matriz_trajetos: this.state.matriz_trajetos}}}/>;
    }

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

        <div className="operacao">
          {this.state.trajetos.length > 1 ? (
            <div className="retirar-cidade" id="retirarCidade">
              <h1 id="retira" onClick={this.evento_retirarTrajeto}>
                -
              </h1>
              <h1 id="retirar-cidade" onClick={this.evento_retirarTrajeto}>
                Retirar cidade
              </h1>
            </div>
          ) : (
            <div></div>
          )}

          {this.state.trajetos.length <= 3 ? (
            <div className="adicionar-cidade">
              <h1 id="adiciona" onClick={this.evento_adicionarTrajeto}>
                +
              </h1>
              <h1 id="adicionar-cidade" onClick={this.evento_adicionarTrajeto}>
                Mais cidades para auditar
              </h1>
            </div>
          ) : (
            <div />
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
    );
  }
}
