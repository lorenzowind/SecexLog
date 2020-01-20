import React, { Component } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/HeaderFeriado/index";

import Lupa from "../../../../assets/Cadastro de usuário/pesquisar.png";
import Mais from "../../../../assets/6_Cadastro_de_Cidade_Trejetos/mais.png";
import Edit from "../../../../assets/Cadastro de usuário/editar.png";
import Close from "../../../../assets/Cadastro de usuário/sair_secex.png";
import Trash from "../../../../assets/Cadastro de usuário/lixeira.png";

import api from "../../../../services/api";

import "./styles.css";

export default class Feriado extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      nacionais: [],
      especificos: [],

      search: "",
      busca: false,

      id: "",
      nome: "",
      dias: [],
      diaInit: "",
      diaEnd: "",
      cidade: "",

      popUp: []
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const res = await api.get("/holidays").catch(err => {
      alert(err);
      window.location.reload();
    });

    const data = res.data;

    const especificos = [];
    const nacionais = [];

    for (var i = 0; i < data.length; i++) {
      let aux = data[i];

      if (aux.nacional) {
        nacionais.push({ aux });
      } else {
        especificos.push({ aux });
      }
    }

    this.setState({ nacionais, especificos, busca: false });
  };

  handleSearch = async () => {
    if (this.state.busca) {
      this.loadData();
    } else {
      const res = await api.get(`/holidays/${this.state.search}`);

      const data = res.data;

      // const holiday1 = [];
      // const holiday2 = [];
      // const holiday3 = [];

      const especificos = [];
      const nacionais = [];

      // let cont = 0;
      for (var i = 0; i < data.length; i++) {
        let aux = data[i];

        // aux.type === "especifico"
        //   ? especificos.push({ aux })
        //   : nacionais.push({ aux });

        especificos.push({ aux });

        // if (cont >= 0 && cont < 3) {
        //   holiday1.push({ aux });
        //   cont++;
        // } else if (cont >= 3 && cont < 7) {
        //   holiday2.push({ aux });
        //   cont++;
        // } else if (cont >= 7 && cont <= 11) {
        //   holiday3.push({ aux });
        //   cont++;

        //   if (cont >= 11) cont = 0;
        // }
      }

      // this.setState({ holiday1, holiday2, holiday3 });

      this.setState({ nacionais, especificos, busca: true });
    }
  };

  handleChange = ev => {
    const state = Object.assign({}, this.state);
    const name = ev.target.name;
    const value = ev.target.value;

    state[name] = value;

    this.setState(state);
  };

  editPopUp = c => {
    let { popUp } = this.state;

    const h1 = "Editar Feriado";
    const nome = "Nome";
    const dia = "Dia";

    const nomeFeriado = c.aux.nome;
    const diaInit = c.aux.init;
    const diaEnd = c.aux.end;
    var dias = null;

    if (diaInit === diaEnd) dias = diaInit;
    else dias = [{ diaInit, diaEnd }];

    const text = { h1, nome, dia };
    const value = { nomeFeriado, dias };

    popUp.push({
      text,
      value
    });

    this.setState({
      popUp,
      popUpStats: true,
      nome: nomeFeriado,
      diaInit,
      diaEnd,
      id: c.aux.id,
      cidade: c.aux.city_id
    });
  };

  handleClose = ev => {
    ev.preventDefault();
    this.setState({ popUp: [] });
  };

  handleEditSubmit = async ev => {
    ev.preventDefault();

    const id = await api.get(`/cities/${this.state.cidade}`);

    const state = {
      nome: this.state.nome,
      cidade: id.data.nome,
      init: this.state.dias.length > 1 ? this.state.dias : this.state.diaInit,
      end: this.state.dias.length > 1 ? this.state.dias : this.state.diaEnd
    };

    await api
      .put(`/holidays/${this.state.id}`, state)
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
      .delete(`/holidays/${this.state.id}`)
      .then(window.location.reload())
      .catch(err => {
        alert(err);
      });
  };

  render() {
    return (
      <div className="body">
        <div className="cadastroCidade">
          <Header />

          <h1>Pesquisar feriados</h1>
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
              <h1>Adicionar Feriado</h1>
              <Link to="/cadastro/feriado/create">
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
              <div className="listCity" style={{ overflowY: "hidden" }}>
                <div className="table">
                  <div style={{ overflowY: "auto", marginRight: "20px" }}>
                    <table name="table1">
                      <thead>
                        <tr>
                          <th align="left">Específicos</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.especificos.map((c, i) => (
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

                  <hr
                    style={{
                      width: "1px",
                      height: "100%",
                      display: "inline-block",
                      marginTop: "3%"
                    }}
                  />

                  <div style={{ overflowY: "auto" }}>
                    <table name="table2">
                      <thead>
                        <tr>
                          <th align="left">Nacionais</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.nacionais.map((c, i) => (
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
          </div>

          {this.state.popUp.map((c, i) => (
            <div className="popUp_feriado" key={i}>
              <div className="popUp_feriado_">
                <div className="title">
                  <h2 style={{ left: "1px" }}>{c.text.h1}</h2>
                  <img src={Close} alt="" onClick={this.handleClose} />
                </div>

                <h4>{c.text.nome}</h4>
                <input
                  type="text"
                  name="nome"
                  value={this.state.nome}
                  onChange={this.handleChange}
                />

                <h4>{c.text.dia}</h4>
                {this.state.popUp[0].value.dias.length === 1 ? (
                  this.state.popUp[0].value.dias.map((c, i) => (
                    <div key={i} style={{ display: "flex" }}>
                      <input
                        type="text"
                        name="diaInit"
                        value={this.state.diaInit}
                        style={{ width: "110px", marginRight: "0" }}
                        onChange={this.handleChange}
                        maxLength="10"
                      />
                      <p
                        style={{
                          marginLeft: "2%",
                          lineHeight: "38px",
                          position: "relative",
                          top: "5px"
                        }}
                      >
                        até
                      </p>
                      <input
                        type="text"
                        name="diaEnd"
                        value={this.state.diaEnd}
                        onChange={this.handleChange}
                        style={{ width: "110px", marginLeft: "2%" }}
                        maxLength="10"
                      />
                    </div>
                  ))
                ) : (
                  <input
                    type="text"
                    name="dias"
                    defaultValue={this.state.popUp[0].value.dias}
                    onChange={this.handleChange}
                    style={{ width: "110px", marginRight: "0" }}
                    maxLength="10"
                  />
                )}

                <div className="btns">
                  <img
                    src={Trash}
                    alt="Deletar"
                    onClick={this.handleDelete}
                    style={{ left: "40px" }}
                  />
                  <button onClick={this.handleEditSubmit} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
