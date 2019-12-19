import React, { Component } from "react";

import Menu from "../../../../components/Menu/MenuLateral/index";
import Header from "../components/HeaderPrestador/index";

import "./styles.css";
import api from "../../../../services/api";

export default class Prestador extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
    this.childDiv = React.createRef();
  }

  getInitialState() {
    return {
      nome: "",
      telefone: "",
      email: "",
      modal: "",
      tipoDado: "CPF",
      dadoPrestador: "",

      modals: []
    };
  }

  componentWillMount() {
    this.handleScroll();
    this.loadModals();
  }

  loadModals = async () => {
    const res = await api.get("/modals").catch(err => {
      alert(err);
      window.location.reload();
    });

    const modals = res.data;
    this.setState({ modals });
  };

  handleScroll = () => {
    const { index, selected } = this.props;
    if (index === selected) {
      setTimeout(() => {
        this.childDiv.current.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  handleChange = ev => {
    const state = Object.assign({}, this.state);
    const name = ev.target.name;
    const value = ev.target.value;

    state[name] = value;

    this.setState(state);
  };

  onSubmit = async ev => {
    ev.preventDefault();

    const state = {
      nome: this.state.nome,
      telefone: this.state.telefone,
      email: this.state.email,
      modal: this.state.modal,
      preference: this.state.tipoDado,
      preferenceTxt: this.state.dadoPrestador
    };

    var error = null;

    await api.post(`/providers`, state).catch(err => {
      alert(
        "Verifique se todos os dados estão inseridos corretamente ou se o nome do Prestador já foi cadastrado"
      );
      error = err;
    });
    if (!error) {
      window.location.reload();
    }
  };

  render() {
    const footerStyles = {
      marginTop: "40px"
    };

    const inputStyles = {
      height: "38px",
      width: "267px",
      borderRadius: "29px",
      marginRight: "88px",
      padding: "20px",
      fontSize: "12px",
      color: "#000",
      border: "solid 1px #707070",
      backgroundColor: "#ffffff"
    };

    const selectStyles = {
      border: "solid 1px #707070"
    };

    return (
      <div className="body" ref={this.childDiv}>
        <Menu ativo={false} />
        <div className="cadastro">
          <Header />

          <h2>Nome do Prestador de Serviço</h2>
          <input
            type="text"
            name="nome"
            style={inputStyles}
            onChange={this.handleChange}
          />

          <div className="dados">
            <div>
              <h2>Telefone</h2>
              <input
                type="text"
                name="telefone"
                style={inputStyles}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <h2>E-mail</h2>
              <input
                type="text"
                name="email"
                style={inputStyles}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="select">
            <h2>Modal</h2>
            <select
              name="modal"
              onChange={this.handleChange}
              defaultValue="selected"
              style={selectStyles}
              required
            >
              <option defaultValue="selected">Selecione um modal</option>
              {this.state.modals.map((c, i) => (
                <option key={i} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            <div>
              <h2>Você prefere</h2>
              <select
                name="tipoDado"
                onChange={this.handleChange}
                defaultValue="selected"
                style={selectStyles}
                required
              >
                <option defaultValue="cpf">CPF</option>
                <option value="cnpj">CNPJ</option>
              </select>

              <input
                type="text"
                name="dadoPrestador"
                style={inputStyles}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="footer" style={footerStyles}>
            <button onClick={this.onSubmit}></button>
          </div>
        </div>
      </div>
    );
  }
}
