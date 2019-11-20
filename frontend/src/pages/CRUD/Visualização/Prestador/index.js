import React, { Component } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/HeaderPrestador/index";

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
      nome: "",
      telefone: "",
      email: "",
      modal: "",

      row: [],

      popUp: []
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    // await setTimeout(() => {
    //   api
    //     .get("/users")
    //     .then(res => {
    //       const row = this.state.row;
    //       for (var i = 0; i < res.data.length; i++) {
    //         row.push(res.data[i]);
    //       }
    //       return row;
    //     })
    //     .then(row => {
    //       this.setState({ row: row, load: true });
    //     })
    //     .catch(err => {
    //       if (err.message === "Request failed with status code 401") {
    //         alert("Nível de acesso negado! Contate o administrador do sistema");
    //         window.location.replace("/menu");
    //       } else {
    //         alert(err);
    //         window.location.replace("/");
    //       }
    //     });
    // }, 1200);
  };

  editPopUp = c => {
    let { popUp } = this.state;

    let h1 = "Editar Cidade";
    let nome = "Nome do Prestador";
    let telefone = "Telefone";
    let email = "E-mail";
    let modal = "Modal";

    let name = c.aux.nome;
    let cellphone = c.aux.telefone;
    let e_mail = c.aux.email;
    let modalValue = c.aux.modal;

    let text = { h1, nome, telefone, email, modal };
    let value = { name, cellphone, e_mail, modalValue };

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

          <h1>Pesquisar Prestador</h1>
          <div className="searchCity">
            <input type="text" name="searchCidade" />
            <img src={Lupa} alt="" />
          </div>

          <div className="addCity">
            <div className="add">
              <h1>Adicionar Prestador</h1>
              <Link to="/cadastro/prestador/create">
                <img src={Mais} alt="" style={{ bottom: "15px" }} />
              </Link>
            </div>

            <div className="listCity">
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th align="left">Nome</th>
                      <th align="left">Telefone</th>
                      <th align="left">E-mail</th>
                      <th align="left">Modal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.row.map((c, i) => (
                      <tr key={i}>
                        <td>{c.nome}</td>
                        <td>{c.telefone}</td>
                        <td>{c.email}</td>
                        <td>{c.modal}</td>
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
