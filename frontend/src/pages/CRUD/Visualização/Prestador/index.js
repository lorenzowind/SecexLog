import React, { Component } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/HeaderPrestador/index";

import api from "../../../../services/api";

import Lupa from "../../../../assets/Cadastro de usuário/pesquisar.png";
import Mais from "../../../../assets/6_Cadastro_de_Cidade_Trejetos/mais.png";
import Edit from "../../../../assets/Cadastro de usuário/editar.png";
import Close from "../../../../assets/Cadastro de usuário/sair_secex.png";
import Trash from "../../../../assets/Cadastro de usuário/lixeira.png";

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

      search: "",
      busca: false,

      row: [],
      modals: [],

      popUp: []
    };
  }

  componentDidMount() {
    this.loadData();
    this.loadModals();
  }

  loadModals = async () => {
    const res = await api.get("/modals").catch(err => {
      alert(err);
      window.location.reload();
    });

    const modals = res.data;
    console.log(res.data);
    this.setState({ modals });
  };

  loadData = async () => {
    api
      .get("/providers")
      .then(res => {
        this.setState({ row: res.data, busca: false });
      })
      .catch(err => {
        if (err.message === "Request failed with status code 401") {
          alert("Nível de acesso negado! Contate o administrador do sistema");
          window.location.replace("/menu");
        } else {
          alert(err);
          window.location.replace("/");
        }
      });
  };

  handleSearch = async () => {
    if (this.state.busca) {
      this.loadData();
    } else {
      console.log(this.state.search);
      const res = await api
        .get(`/providers/${this.state.search}`)
        .catch(err => {
          if (err.message === "Request failed with status code 401") {
            alert("Nível de acesso negado! Contate o administrador do sistema");
            window.location.replace("/menu");
          } else {
            alert(err);
            window.location.replace("/");
          }
        });

      console.log(res.data);

      console.log(res.data);

      this.setState({ row: res.data, busca: true });
    }
  };

  editPopUp = c => {
    let { popUp } = this.state;

    let h1 = "Editar Prestador";
    let nome = "Nome do Prestador";
    let telefone = "Telefone";
    let email = "E-mail";
    let modal = "Modal";

    let text = { h1, nome, telefone, email, modal };

    popUp.push({ text });

    this.setState({
      popUp: popUp,
      popUpStats: true,
      id: c.id,
      nome: c.nome,
      telefone: c.telefone,
      email: c.email,
      modal: c.modal
    });
  };

  handleClose = ev => {
    ev.preventDefault();
    this.setState({ popUp: [] });
  };

  handleChange = ev => {
    const state = Object.assign({}, this.state);
    const name = ev.target.name;

    state[name] = ev.target.value;

    this.setState(state);
  };

  handleEditSubmit = async ev => {
    ev.preventDefault();

    const state = {
      nome: this.state.nome,
      telefone: this.state.telefone,
      email: this.state.email,
      modal: this.state.modal
    };

    console.log(JSON.stringify(state));

    await api
      .put(`/providers/${this.state.id}`, state)
      .then(() => {
        this.setState({ popUp: [] });
        window.location.reload();
      })
      .catch(err => {
        alert(err);
      });
  };

  handleDelete = async ev => {
    ev.preventDefault();

    await api
      .delete(`/providers/${this.state.id}`)
      .then(window.location.reload())
      .catch(err => {
        alert(err);
      });
  };

  render() {
    const inputStyles = {
      width: "250px"
    };

    return (
      <div className="body">
        <div className="cadastroCidade">
          <Header />

          <h1>Pesquisar Prestador</h1>
          <div className="searchCity">
            <input type="text" name="search" onChange={this.handleChange} />
            <img
              src={this.state.busca ? Close : Lupa}
              alt=""
              onClick={this.handleSearch}
            />
          </div>

          <div className="addCity">
            <div className="add">
              <h1>Adicionar Prestador</h1>
              <Link to="/cadastro/prestador/create">
                <img src={Mais} alt="" style={{ bottom: "15px" }} />
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
              <div className="listCity" style={{ overflowY: "auto" }}>
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
                          <td style={{ padding: "1%" }}>{c.nome}</td>
                          <td style={{ padding: "1%" }}>{c.telefone}</td>
                          <td style={{ padding: "1%" }}>{c.email}</td>
                          <td style={{ padding: "1%" }}>{c.modal}</td>
                          <td style={{ padding: "1%" }}>
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

          {this.state.popUp.map((c, i) => (
            <div className="popUp_Providers" key={i} style={{ top: "2600px" }}>
              <div className="title">
                <h2>{c.text.h1}</h2>
                <img src={Close} alt="" onClick={this.handleClose} />
              </div>

              <h4>{c.text.nome}</h4>
              <input
                type="text"
                name="nome"
                defaultValue={this.state.nome}
                onChange={this.handleChange}
                style={inputStyles}
              />

              <h4>{c.text.telefone}</h4>
              <input
                type="text"
                name="telefone"
                defaultValue={this.state.telefone}
                style={inputStyles}
                onChange={this.handleChange}
              />

              <h4>{c.text.email}</h4>
              <input
                type="email"
                name="email"
                defaultValue={this.state.email}
                onChange={this.handleChange}
                style={inputStyles}
              />

              <h4>{c.text.modal}</h4>
              <select
                name="modal"
                onChange={this.handleChange}
                defaultValue={this.state.modal}
                style={{ marginLeft: "8.4%", width: "250px" }}
              >
                {this.state.modals.map((c, i) => (
                  <option key={i} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

              <div className="btns">
                <img
                  src={Trash}
                  alt="Deletar"
                  onClick={this.handleDelete}
                  style={{ left: "20px" }}
                />
                <button
                  onClick={this.handleEditSubmit}
                  style={{ position: "relative", left: "45px" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
