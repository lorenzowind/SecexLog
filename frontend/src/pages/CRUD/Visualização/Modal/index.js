import React, { Component } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/HeaderModal/index";

import Lupa from "../../../../assets/Cadastro de usuário/pesquisar.png";
import Mais from "../../../../assets/6_Cadastro_de_Cidade_Trejetos/mais.png";
import Edit from "../../../../assets/Cadastro de usuário/editar.png";
import Close from "../../../../assets/Cadastro de usuário/sair_secex.png";
import Trash from "../../../../assets/Cadastro de usuário/lixeira.png";

import Carro from "../../../../assets/Cadastro_Modal/1.png";
import Bus from "../../../../assets/Cadastro_Modal/2.png";
import Aviao from "../../../../assets/Cadastro_Modal/3.png";
import Barco from "../../../../assets/Cadastro_Modal/4.png";

import TaxiAereo from "../../../../assets/Cadastro_Modal/5.png";
import Lancha from "../../../../assets/Cadastro_Modal/6.png";
import Rabeta from "../../../../assets/Cadastro_Modal/7.png";
import Voadeira from "../../../../assets/Cadastro_Modal/8.png";

import Interrogacao from "../../../../assets/Cadastro_Modal/aa.png";

import api from "../../../../services/api";

import "./styles.css";

export default class Feriado extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
    this.fileInput = React.createRef();
    this.myRef = React.createRef();
  }

  getInitialState() {
    return {
      id: null,
      name: "",
      url: null,
      safety: null,
      cost: null,
      fast: null,

      btIcon: [{ stats: true }],

      modal1: [],
      modal2: [],
      modal3: [],

      popUp: [],

      selectedIcon: Interrogacao,
      colorIcon: [{ name: "", url: "" }]
    };
  }

  componentDidMount() {
    this.myRef.current.scrollTo(0, 0);
    this.loadData();
  }

  loadData = async () => {
    const res = await api.get("/modals").catch(err => {
      alert(err);
      window.location.reload();
    });
    const data = res.data;
    const modal1 = [];
    const modal2 = [];
    const modal3 = [];
    console.log(data.length);
    let cont = 0;
    for (var i = 0; i < data.length; i++) {
      let aux = data[i];
      if (cont >= 0 && cont <= 3) {
        console.log(cont);
        modal1.push({ aux });
        cont++;
      } else if (cont >= 4 && cont <= 7) {
        modal2.push({ aux });
        cont++;
      } else if (cont >= 8 && cont <= 11) {
        modal3.push({ aux });
        cont++;
        if (cont > 11) cont = 0;
      }
    }
    this.setState({ modal1, modal2, modal3 });
  };

  editPopUp = c => {
    let { popUp } = this.state;

    const h1 = "Editar Modal";

    const text = { h1 };

    popUp.push({
      text
    });

    const url = c.aux.imgUrl;

    console.log(url);

    this.setState({
      popUp,
      popUpStats: true,
      id: c.aux.id,
      url: url,
      name: c.aux.name,
      safety: c.aux.safety,
      cost: c.aux.cost,
      fast: c.aux.fast
    });
  };

  handleChange = ev => {
    const state = Object.assign({}, this.state);
    const campo = ev.target.name;
    const value = ev.target.value;

    state[campo] = value;

    this.setState(state);
  };

  handleEditIcon = () => {
    var { btIcon } = this.state;

    btIcon[0].stats = false;

    this.setState({ btIcon: btIcon });
  };

  handleClick = ev => {
    ev.preventDefault();

    const { colorIcon } = this.state;
    const color = require(`../../../../assets/coloredModal/${ev.target.alt}.png`);
    const src = color;

    if (
      this.state.colorIcon.url &&
      ev.target.alt === this.state.colorIcon.name
    ) {
      colorIcon.url = "";
      colorIcon.name = "";
      this.setState({ icon: "", colorIcon });
    } else {
      console.log(ev.target);

      colorIcon.name = ev.target.alt;
      colorIcon.url = color;

      console.log(colorIcon.url);

      console.log(src);
      this.setState({ icon: src, colorIcon, selectedIcon: Interrogacao });
    }
  };

  handleNewIcon = ev => {
    console.log(this.fileInput.current.files[0].type);

    const type = this.fileInput.current.files[0].type;

    if (type.indexOf("image") < 0) {
      alert("Por favor, insira somente imagens!");
      return;
    }

    const selectedIcon = new Blob([this.fileInput.current.files[0]], {
      type: type
    });

    console.log(selectedIcon);

    const { colorIcon } = this.state;

    colorIcon.name = "";
    colorIcon.url = "";

    var a = new FileReader();
    a.readAsDataURL(selectedIcon);
    a.onload = e => {
      var url = e.target.result;
      this.setState({
        selectedIcon: url,
        icon: url,
        colorIcon
      });
    };

    return;
  };

  handleEditSubmit = async ev => {
    ev.preventDefault();

    const state = {
      name: this.state.name,
      imgUrl:
        this.state.selectedIcon !== Interrogacao
          ? this.state.selectedIcon
          : this.state.icon,
      safety: this.state.safety,
      cost: this.state.cost,
      fast: this.state.fast
    };

    console.log(JSON.stringify(state));

    await api
      .put(`/modals/${this.state.id}`, state)
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
      .delete(`/modals/${this.state.id}`)
      .then(window.location.reload())
      .catch(err => {
        alert(err);
      });
  };

  handleClose = ev => {
    ev.preventDefault();
    this.setState({ popUp: [] });
  };

  render() {
    const buttonStyles = {
      maxHeight: "40px",
      maxWidth: "40px",
      minHeight: "40px",
      minWidth: "40px"
    };

    const divStyles = {
      marginLeft: "8.4%"
    };

    return (
      <div className="body" ref={this.myRef}>
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
                      {this.state.modal1.map((c, i) => (
                        <tr key={i}>
                          <td>{c.aux.name}</td>
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
                      {this.state.modal2.map((c, i) => (
                        <tr key={i}>
                          <td>{c.aux.name}</td>
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
                      {this.state.modal3.map((c, i) => (
                        <tr key={i}>
                          <td>{c.aux.name}</td>
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
            <div className="popUp_Modals" key={i} style={{ top: "1700px" }}>
              <div className="title">
                <h2 style={{ marginLeft: "8.4%", right: "0" }}>{c.text.h1}</h2>
                <img src={Close} alt="" onClick={this.handleClose} />
              </div>

              <h4>Nome</h4>
              <input
                type="text"
                name="name"
                defaultValue={this.state.name}
                onChange={this.handleChange}
              />

              {this.state.btIcon.map((c, i) => {
                if (!c.stats) {
                  return (
                    <div key={i}>
                      <h4>Ícone</h4>
                      <div className="icons" style={divStyles}>
                        <div className="row">
                          <button
                            name="icon"
                            onClick={this.handleClick}
                            style={buttonStyles}
                          >
                            <img
                              src={
                                this.state.colorIcon.url &&
                                this.state.colorIcon.name === "Carro"
                                  ? this.state.colorIcon.url
                                  : Carro
                              }
                              alt="Carro"
                              style={buttonStyles}
                            />
                          </button>
                          <button
                            name="icon"
                            onClick={this.handleClick}
                            style={buttonStyles}
                          >
                            <img
                              src={
                                this.state.colorIcon.url &&
                                this.state.colorIcon.name === "Onibus"
                                  ? this.state.colorIcon.url
                                  : Bus
                              }
                              alt="Onibus"
                              style={buttonStyles}
                            />
                          </button>
                          <button
                            name="icon"
                            onClick={this.handleClick}
                            style={buttonStyles}
                          >
                            <img
                              src={
                                this.state.colorIcon.url &&
                                this.state.colorIcon.name === "Aviao"
                                  ? this.state.colorIcon.url
                                  : Aviao
                              }
                              alt="Aviao"
                              style={buttonStyles}
                            />
                          </button>
                          <button
                            name="icon"
                            onClick={this.handleClick}
                            style={buttonStyles}
                          >
                            <img
                              src={
                                this.state.colorIcon.url &&
                                this.state.colorIcon.name === "Barco"
                                  ? this.state.colorIcon.url
                                  : Barco
                              }
                              alt="Barco"
                              style={buttonStyles}
                            />
                          </button>
                        </div>
                        <div className="row">
                          <button
                            name="icon"
                            onClick={this.handleClick}
                            style={buttonStyles}
                          >
                            <img
                              src={
                                this.state.colorIcon.url &&
                                this.state.colorIcon.name === "TaxiAereo"
                                  ? this.state.colorIcon.url
                                  : TaxiAereo
                              }
                              alt="TaxiAereo"
                              style={buttonStyles}
                            />
                          </button>
                          <button
                            name="icon"
                            onClick={this.handleClick}
                            style={buttonStyles}
                          >
                            <img
                              src={
                                this.state.colorIcon.url &&
                                this.state.colorIcon.name === "Lancha"
                                  ? this.state.colorIcon.url
                                  : Lancha
                              }
                              alt="Lancha"
                              style={buttonStyles}
                            />
                          </button>
                          <button
                            name="icon"
                            onClick={this.handleClick}
                            style={buttonStyles}
                          >
                            <img
                              src={
                                this.state.colorIcon.url &&
                                this.state.colorIcon.name === "Rabeta"
                                  ? this.state.colorIcon.url
                                  : Rabeta
                              }
                              alt="Rabeta"
                              style={buttonStyles}
                            />
                          </button>
                          <button
                            name="icon"
                            onClick={this.handleClick}
                            style={buttonStyles}
                          >
                            <img
                              src={
                                this.state.colorIcon.url &&
                                this.state.colorIcon.name === "Voadeira"
                                  ? this.state.colorIcon.url
                                  : Voadeira
                              }
                              alt="Voadeira"
                              style={buttonStyles}
                            />
                          </button>
                        </div>
                        <div className="row">
                          <label
                            name="icon"
                            htmlFor="interrogacao"
                            style={buttonStyles}
                          >
                            <img
                              src={this.state.selectedIcon}
                              alt="Escolher ícone"
                              style={buttonStyles}
                            />
                          </label>
                          <input
                            id="interrogacao"
                            type="file"
                            name="icon"
                            ref={this.fileInput}
                            onChange={this.handleNewIcon}
                          />
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={i}>
                      <div style={{ display: "flex" }}>
                        <h4>Ícone</h4>
                        <img
                          src={Edit}
                          alt=""
                          style={{
                            height: "18px",
                            width: "18px",
                            marginLeft: "20px",
                            position: "relative",
                            top: "15px",
                            cursor: "pointer"
                          }}
                          onClick={this.handleEditIcon}
                        />
                      </div>
                      <img
                        src={this.state.url}
                        alt=""
                        style={{ height: "40px", marginLeft: "8.4%" }}
                      />
                    </div>
                  );
                }
              })}

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
