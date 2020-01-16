import React, { Component } from "react";

import Menu from "../../../../components/Menu/MenuLateral/index";
import Header from "../components/HeaderModal/index";

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

export default class Modal extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
    this.fileInput = React.createRef();
    this.childDiv = React.createRef();
  }

  getInitialState() {
    return {
      nome: "",
      icon: "",
      selectedIcon: Interrogacao,
      blob: null,

      safe: "não",
      rental: "não",
      fast: "não",

      colorIcon: [{ name: "", url: "" }]
    };
  }

  componentDidMount = () => this.handleScroll();

  handleScroll = () => {
    const { index, selected } = this.props;
    if (index === selected) {
      setTimeout(() => {
        this.childDiv.current.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  handleChange = ev => {
    ev.preventDefault();
    const state = Object.assign({}, this.state);
    const campo = ev.target.name;
    const value = ev.target.value;

    state[campo] = value;

    this.setState(state);
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
      colorIcon.name = ev.target.alt;
      colorIcon.url = color;

      this.setState({ icon: src, colorIcon, selectedIcon: Interrogacao });
    }
  };

  handleNewIcon = ev => {
    const type = this.fileInput.current.files[0].type;

    if (type.indexOf("image") < 0) {
      alert("Por favor, insira somente imagens!");
      return;
    }

    const selectedIcon = new Blob([this.fileInput.current.files[0]], {
      type: type
    });

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

  onSubmit = async ev => {
    ev.preventDefault();

    const state = {
      name: this.state.nome,
      imgUrl: this.state.icon,
      safety: this.state.safe === "sim" ? true : false,
      cost: this.state.rental === "sim" ? true : false,
      fast: this.state.fast === "sim" ? true : false
    };

    var error = null;

    await api.post("/modals", state).catch(err => {
      alert(
        "Verifque se todos os dados estão inseridos corretamente ou se o nome da cidade já foi cadastrado"
      );
      error = err;
    });

    if (!error) window.location.reload();
  };

  radioButtons(event) {
    if (event.target.name === "safe") {
      this.setState({ safe: event.target.value });
    } else if (event.target.name === "rental") {
      this.setState({ rental: event.target.value });
    } else if (event.target.name === "fast") {
      this.setState({ fast: event.target.value });
    }
  }

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
      border: "solid 1px #707070",
      backgroundColor: "#ffffff"
    };

    const selectStyles = {
      width: "1.6em",
      height: "1.6em",
      marginRight: "10px",
      fontSize: "11px"
    };

    return (
      <div
        className="body"
        ref={this.childDiv}
        style={{ marginBottom: "100px" }}
      >
        <Menu ativo={false} />
        <div className="cadastro">
          <Header />
          <h2>Nome do Modal</h2>
          <input
            type="text"
            name="nome"
            style={inputStyles}
            onChange={this.handleChange}
          />
          <h2>Selecione ícone</h2>
          <div className="icons">
            <div className="row">
              <button name="icon" onClick={this.handleClick}>
                <img
                  src={
                    this.state.colorIcon.url &&
                    this.state.colorIcon.name === "Carro"
                      ? this.state.colorIcon.url
                      : Carro
                  }
                  alt="Carro"
                />
              </button>
              <button name="icon" onClick={this.handleClick}>
                <img
                  src={
                    this.state.colorIcon.url &&
                    this.state.colorIcon.name === "Onibus"
                      ? this.state.colorIcon.url
                      : Bus
                  }
                  alt="Onibus"
                />
              </button>
              <button name="icon" onClick={this.handleClick}>
                <img
                  src={
                    this.state.colorIcon.url &&
                    this.state.colorIcon.name === "Aviao"
                      ? this.state.colorIcon.url
                      : Aviao
                  }
                  alt="Aviao"
                />
              </button>
              <button name="icon" onClick={this.handleClick}>
                <img
                  src={
                    this.state.colorIcon.url &&
                    this.state.colorIcon.name === "Barco"
                      ? this.state.colorIcon.url
                      : Barco
                  }
                  alt="Barco"
                />
              </button>
            </div>
            <div className="row">
              <button name="icon" onClick={this.handleClick}>
                <img
                  src={
                    this.state.colorIcon.url &&
                    this.state.colorIcon.name === "TaxiAereo"
                      ? this.state.colorIcon.url
                      : TaxiAereo
                  }
                  alt="TaxiAereo"
                />
              </button>
              <button name="icon" onClick={this.handleClick}>
                <img
                  src={
                    this.state.colorIcon.url &&
                    this.state.colorIcon.name === "Lancha"
                      ? this.state.colorIcon.url
                      : Lancha
                  }
                  alt="Lancha"
                />
              </button>
              <button name="icon" onClick={this.handleClick}>
                <img
                  src={
                    this.state.colorIcon.url &&
                    this.state.colorIcon.name === "Rabeta"
                      ? this.state.colorIcon.url
                      : Rabeta
                  }
                  alt="Rabeta"
                />
              </button>
              <button name="icon" onClick={this.handleClick}>
                <img
                  src={
                    this.state.colorIcon.url &&
                    this.state.colorIcon.name === "Voadeira"
                      ? this.state.colorIcon.url
                      : Voadeira
                  }
                  alt="Voadeira"
                />
              </button>
            </div>
            <div className="row">
              <label name="icon" htmlFor="interrogacao">
                <img src={this.state.selectedIcon} alt="Escolher ícone" />
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
          <div className="radio" onChange={this.radioButtons.bind(this)}>
            <h2>Esse modal é seguro?</h2>
            <input
              type="radio"
              name="safe"
              value="sim"
              style={selectStyles}
              checked={this.state.safe === "sim"}
            />
            Sim
            <br />
            <input
              type="radio"
              name="safe"
              value="não"
              style={selectStyles}
              checked={this.state.safe === "não"}
            />
            Não
            <h2>Esse modal é de baixo custo?</h2>
            <input
              type="radio"
              name="rental"
              value="sim"
              style={selectStyles}
              checked={this.state.rental === "sim"}
            />
            Sim
            <br />
            <input
              type="radio"
              name="rental"
              value="não"
              style={selectStyles}
              onChange={this.handleChange}
              checked={this.state.rental === "não"}
            />
            Não
            <h2>Esse modal é rápido?</h2>
            <input
              type="radio"
              name="fast"
              value="sim"
              style={selectStyles}
              checked={this.state.fast === "sim"}
            />
            Sim
            <br />
            <input
              type="radio"
              name="fast"
              value="não"
              style={selectStyles}
              checked={this.state.fast === "não"}
            />
            Não
          </div>
          <div className="footer" style={footerStyles}>
            <button onClick={this.onSubmit}></button>
          </div>
        </div>
      </div>
    );
  }
}
