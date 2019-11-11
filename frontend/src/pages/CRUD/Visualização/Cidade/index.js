import React, { Component } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/HeaderCidade/index";

import api from "../../../../services/api";

import Lupa from "../../../../assets/Cadastro de usuário/pesquisar.png";
import Mais from "../../../../assets/6_Cadastro_de_Cidade_Trejetos/mais.png";
import Ir from "../../../../assets/6_Cadastro_de_Cidade_Trejetos/ir.png";
import Edit from "../../../../assets/Cadastro de usuário/editar.png";
import Close from "../../../../assets/Cadastro de usuário/sair_secex.png";

import "./styles.css";

export default class Cidade extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      city1: [],
      city2: [],
      city3: [],

      popUp: []
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const res = await api.get("/cities").catch(err => {
      alert(err);
      window.location.reload();
    });

    const data = res.data;

    const city1 = [];
    const city2 = [];
    const city3 = [];

    console.log(data.length);
    let cont = 0;
    for (var i = 0; i < data.length; i++) {
      let aux = data[i];

      if (cont >= 0 && cont <= 3) {
        console.log(cont);
        city1.push({ aux });
        cont++;
      } else if (cont >= 4 && cont <= 7) {
        city2.push({ aux });
        cont++;
      } else if (cont >= 8 && cont <= 11) {
        city3.push({ aux });
        cont++;
        if (cont > 11) cont = 0;
      }
    }

    console.log(city1);

    this.setState({ city1, city2, city3 });
  };

  editPopUp = c => {
    let { popUp } = this.state;

    let h1 = "Cadastrar Cidade";
    let nome = "Nome";
    let cidadesRelacionadas = "Cidades Relacionadas";
    let feriados = "Feriados";
    let cheia = "Período de Cheia";

    let name = c.aux.nome;
    let relatedCities = "Ainda Nenhuma";
    let holidays = "Ainda Nenhum";
    let initFlood = c.aux.initDataCheia;
    let endFlood = c.aux.endDataCheia;

    let text = { h1, nome, cidadesRelacionadas, feriados, cheia };
    let value = { name, relatedCities, holidays, initFlood, endFlood };

    popUp.push({ text, value });

    this.setState({ popUp: popUp, popUpStats: true });
  };

  handleClose = ev => {
    ev.preventDefault();
    this.setState({ popUp: [] });
  };

  handleChange = () => {};

  render() {
    return (
      <div className="body">
        <div className="cadastroCidade">
          <Header />

          <h1>Pesquisar cidades</h1>
          <div className="searchCity">
            <input type="text" name="searchCidade" />
            <img src={Lupa} alt="" />
          </div>

          <div className="addCity">
            <div className="add">
              <h1>Adicionar Cidade</h1>
              <Link to="/cadastro/cidade/create">
                <img src={Mais} alt="" />
              </Link>
            </div>

            <div className="listCity">
              <div className="table">
                <table name="table1">
                  <thead>
                    <tr>
                      <th align="left">Nome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.city1.map((c, i) => (
                      <tr key={i}>
                        <td>{c.aux.nome}</td>
                        <td>
                          <img
                            src={Edit}
                            alt=""
                            onClick={() => {
                              const content = c;
                              this.editPopUp(content);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <hr
                  style={{
                    width: "1px",
                    height: "78%",
                    display: "inline-block",
                    marginTop: "3%"
                  }}
                />

                <table name="table2">
                  <thead>
                    <tr>
                      <th align="left">Nome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.city2.map((c, i) => (
                      <tr key={i}>
                        <td>{c.aux.nome}</td>
                        <td>
                          <img
                            src={Edit}
                            alt=""
                            onClick={() => {
                              const content = c;
                              this.editPopUp(content);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <hr
                  style={{
                    width: "1px",
                    height: "78%",
                    display: "inline-block",
                    marginTop: "3%"
                  }}
                />

                <table name="table3">
                  <thead>
                    <tr>
                      <th align="left">Nome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.city3.map((c, i) => (
                      <tr key={i}>
                        <td>{c.aux.nome}</td>
                        <td>
                          <img
                            src={Edit}
                            alt=""
                            onClick={() => {
                              const content = c;
                              this.editPopUp(content);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {this.state.popUp.map((c, i) => (
            <div className="popUp" key={i}>
              <div className="title">
                <h2>{c.text.h1}</h2>
                <img src={Close} alt="" onClick={this.handleClose} />
              </div>

              <h4>{c.text.nome}</h4>
              <input
                type="text"
                value={c.value.name}
                onChange={this.handleChange}
              />

              <h4>{c.text.cidadesRelacionadas}</h4>
              <input
                type="text"
                value={c.value.relatedCities}
                onChange={this.handleChange}
              />

              <h4>{c.text.feriados}</h4>
              <input
                type="text"
                value={c.value.holidays}
                onChange={this.handleChange}
              />

              <h4>{c.text.cheia}</h4>
              <div className="flood">
                <input
                  type="text"
                  value={new Date(c.value.initFlood)}
                  onChange={this.handleChange}
                />
                <img src={Ir} alt="" />
                <input
                  type="text"
                  value={new Date(c.value.endFlood)}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
