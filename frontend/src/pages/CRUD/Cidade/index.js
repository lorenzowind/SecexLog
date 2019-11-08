import React, { Component } from "react";

import Header from "../components/HeaderCidade/index";

import Lupa from "../../../assets/Cadastro de usuário/pesquisar.png";
import Mais from "../../../assets/6_Cadastro_de_Cidade_Trejetos/mais.png";
import Ir from "../../../assets/6_Cadastro_de_Cidade_Trejetos/ir.png";

import "./styles.css";

export default class Cidade extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      popUp: [],
      popUpStats: false
    };
  }

  handleAddClick = ev => {
    ev.preventDefault();

    let { popUp } = this.state;

    let h1 = "Cadastrar Cidade";
    let nome = "Nome";
    let cidadesRelacionadas = "Cidades Relacionadas";
    let feriados = "Feriados";
    let cheia = "Período de Cheia";

    popUp.push({
      h1,
      nome,
      cidadesRelacionadas,
      feriados,
      cheia
    });

    this.setState({ popUp: popUp, popUpStats: true });
  };

  render() {
    return (
      <div className="cadastro">
        <Header />

        <h1>Pesquisar cidades</h1>
        <div className="searchCity">
          <input type="text" name="searchCidade" />
          <img src={Lupa} alt="" />
        </div>

        <div className="addCity">
          <div className="add">
            <h1>Adicionar Cidade</h1>
            <img src={Mais} alt="" onClick={this.handleAddClick} />
          </div>

          <div className="listCity">
            <table name="table1">
              <thead>
                <tr>
                  <th align="left">Nome</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>

            <hr
              style={{
                width: "1px",
                height: "78%",
                display: "inline-block",
                marginTop: "5%"
              }}
            />

            <table name="table2">
              <thead>
                <tr>
                  <th align="left">Nome</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>

            <hr
              style={{
                width: "1px",
                height: "78%",
                display: "inline-block",
                marginTop: "5%"
              }}
            />

            <table name="table3">
              <thead>
                <tr>
                  <th align="left">Nome</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {this.state.popUp.map((c, i) => (
          <div className="popUp" key={i}>
            <h1>{c.h1}</h1>

            <h2>{c.nome}</h2>
            <input type="text" />

            <h2>{c.cidadesRelacionadas}</h2>
            <input type="text" />

            <h2>{c.feriados}</h2>
            <input type="text" />

            <h2>{c.cheia}</h2>
            <div>
              <input type="text" />
              <img src={Ir} alt="" />
              <input type="text" />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
