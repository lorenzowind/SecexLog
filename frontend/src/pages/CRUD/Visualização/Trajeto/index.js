import React, { Component } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/HeaderTrajeto/index";

import api from "../../../../services/api";

import Lupa from "../../../../assets/Cadastro de usuário/pesquisar.png";
import Mais from "../../../../assets/6_Cadastro_de_Cidade_Trejetos/mais.png";
import Ir from "../../../../assets/6_Cadastro_de_Cidade_Trejetos/ir.png";
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
      origem: "",
      destino: "",
      modal: "",
      prestador: "",

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

    let h1 = "Editar Trajeto";
    let cidades = "Cidades";
    let modal = "Modal";
    let prestador = "Nome do Prestador";
    let diaHora = "Dia e Hora de embarque";
    let duracao = "Duração do trecho";
    let km = "Quilometragem (Km)";
    let valor = "Valor do trecho";
    let tpModal = "O modal é:";

    let text = {
      h1,
      cidades,
      modal,
      prestador,
      diaHora,
      duracao,
      km,
      valor,
      tpModal
    };
    //let value = { name, relatedCities, holidays, initFlood, endFlood };

    popUp.push({ text });

    this.setState({ popUp: popUp, popUpStats: true });
  };

  handleClose = ev => {
    ev.preventDefault();
    this.setState({ popUp: [] });
  };

  handleChange = () => {};

  render() {
    const cidadesStyles = { width: "35%", marginRight: "3%", marginLeft: "3%" };
    const imgStyles = {
      height: "38px",
      position: "relative",
      top: "6px"
    };
    const diaStyle = { width: "36%", marginRight: "3%" };
    const horaStyle = { width: "22.4%", marginRight: "3%", marginLeft: "3%" };
    const popUpStyles = {
      maxHeight: "420px",
      overflow: "hidden",
      overflowY: "scroll"
    };

    return (
      <div className="body">
        <div className="cadastroCidade">
          <Header />

          <h1>Pesquisar Trajeto</h1>
          <div className="searchCity">
            <input type="text" name="searchCidade" />
            <img src={Lupa} alt="" />
          </div>

          <div className="addCity">
            <div className="add">
              <h1>Adicionar Trajeto</h1>
              <Link to="/cadastro/trajeto/create">
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
          </div>

          {this.state.popUp.map((c, i) => (
            <div className="popUp" key={i} style={popUpStyles}>
              <div className="title" style={{ marginLeft: "8.4%" }}>
                <h2>{c.text.h1}</h2>
                <img src={Close} alt="" onClick={this.handleClose} />
              </div>

              <h4>{c.text.cidades}</h4>
              <div style={{ display: "flex", marginLeft: "6%" }}>
                <input
                  type="text"
                  name="origem"
                  placeholder="Origem"
                  //value={c.value.name}
                  onChange={this.handleChange}
                  style={cidadesStyles}
                />
                <img src={Ir} alt="" style={imgStyles} />
                <input
                  type="text"
                  name="destino"
                  placeholder="Destino"
                  //value={c.value.name}
                  style={cidadesStyles}
                  onChange={this.handleChange}
                />
              </div>

              <h4>{c.text.modal}</h4>
              <select
                //value={c.value.relatedCities}
                onChange={this.handleChange}
              >
                <option value="teste">Teste</option>
              </select>

              <h4>{c.text.prestador}</h4>
              <select
                //value={c.value.relatedCities}
                onChange={this.handleChange}
              >
                <option value="teste">Teste</option>
              </select>

              <h4>{c.text.diaHora}</h4>
              <div className="diaHora add" style={{ display: "flex" }}>
                <input
                  type="text"
                  //value={new Date(c.value.initFlood)}
                  onChange={this.handleChange}
                  style={diaStyle}
                />
                <input
                  type="text"
                  //value={new Date(c.value.endFlood)}
                  style={horaStyle}
                  onChange={this.handleChange}
                />
                <img
                  src={Mais}
                  alt=""
                  style={{
                    position: "relative",
                    bottom: "40px",
                    top: "0"
                  }}
                />
              </div>

              <div className="tempoKm" style={{ display: "flex" }}>
                <div className="tempo">
                  <h4>
                    Duração do
                    <br /> trecho
                  </h4>
                  <input onChange={this.handleChange} />
                </div>
                <div className="km">
                  <h4>Quilometragem (Km)</h4>
                  <input onChange={this.handleChange} />
                </div>
              </div>

              <div className="valorTipo" style={{ display: "flex" }}>
                <div className="valor">
                  <h4>Valor do trecho</h4>
                  <input type="text" />
                </div>
                <div className="tipo">
                  <h4>O modal é:</h4>
                  <div>
                    <div style={{ display: "flex" }}>
                      <input
                        type="radio"
                        id="option"
                        name="opCidadeBase"
                        value="cidadeBase"
                        onChange={this.handleChange}
                      />
                      Linha
                    </div>
                    <br />
                    <div style={{ display: "flex" }}>
                      <input
                        type="radio"
                        id="option"
                        name="opCidadeAuditada"
                        value="cidadeAuditada"
                        onChange={this.handleChange}
                      />
                      Contratado
                    </div>
                  </div>
                </div>
              </div>

              <div className="btns">
                <img
                  src={Trash}
                  alt="Deletar"
                  onClick={this.handleDelete}
                  style={{ left: "20px" }}
                />
                <button onClick={this.handleEditSubmit} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
