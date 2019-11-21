import React, { Component } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/HeaderModal/index";

import Lupa from "../../../../assets/Cadastro de usuário/pesquisar.png";
import Mais from "../../../../assets/6_Cadastro_de_Cidade_Trejetos/mais.png";
import Edit from "../../../../assets/Cadastro de usuário/editar.png";
import Close from "../../../../assets/Cadastro de usuário/sair_secex.png";

import api from "../../../../services/api";

import "./styles.css";

export default class Feriado extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      holiday1: [],
      holiday2: [],
      holiday3: [],

      popUp: []
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    // const res = await api.get("/holiday").catch(err => {
    //   alert(err);
    //   window.location.reload();
    // });
    // const data = res.data;
    // const holiday1 = [];
    // const holiday2 = [];
    // const holiday3 = [];
    // console.log(data.length);
    // let cont = 0;
    // for (var i = 0; i < data.length; i++) {
    //   let aux = data[i];
    //   if (cont >= 0 && cont <= 3) {
    //     console.log(cont);
    //     holiday1.push({ aux });
    //     cont++;
    //   } else if (cont >= 4 && cont <= 7) {
    //     holiday2.push({ aux });
    //     cont++;
    //   } else if (cont >= 8 && cont <= 11) {
    //     holiday3.push({ aux });
    //     cont++;
    //     if (cont > 11) cont = 0;
    //   }
    // }
    // this.setState({ holiday1, holiday2, holiday3 });
  };

  render() {
    return (
      <div className="body">
        <div className="cadastroCidade">
          <Header />

          <h1>Pesquisar Modal</h1>
          <div className="searchCity">
            <input type="text" name="searchCidade" />
            <img src={Lupa} alt="" />
          </div>

          <div className="addCity">
            <div className="add">
              <h1>Adicionar Modal</h1>
              <Link to="/cadastro/modal/create">
                <img src={Mais} alt="" />
              </Link>
            </div>

            <div
              style={{
                height: "190px",
                width: "800px",
                borderRadius: "34px",
                border: "solid 1px #707070",
                backgroundColor: "#ffffff",
                overflow: "hidden"
              }}
            >
              <div className="listCity">
                <div className="table">
                  <table name="table1">
                    <thead>
                      <tr>
                        <th align="left">Nome</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.holiday1.map((c, i) => (
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
                      {this.state.holiday2.map((c, i) => (
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
                      {this.state.holiday3.map((c, i) => (
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
          </div>

          {/* {this.state.popUp.map((c, i) => (
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
                <img src="" alt="" />
                <input
                  type="text"
                  value={new Date(c.value.endFlood)}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          ))} */}
        </div>
      </div>
    );
  }
}
