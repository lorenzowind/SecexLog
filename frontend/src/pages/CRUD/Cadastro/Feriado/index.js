import React, { Component } from "react";

import Header from "../components/HeaderFeriado/index";
import Menu from "../../../../components/Menu/MenuLateral/index";
import Calendar from "../components/Calendar/Calendar";

import api from "../../../../services/api";

var day = null;

export default class Feriado extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
    this.childDiv = React.createRef();
  }

  getInitialState() {
    return {
      nomeCidade: "",
      nome: "",
      initFeriado: "",
      endFeriado: "",

      cidades: []
    };
  }

  componentWillMount() {
    this.loadCidades();
    this.handleScroll();
  }

  handleScroll = () => {
    const { index, selected } = this.props;
    if (index === selected) {
      setTimeout(() => {
        this.childDiv.current.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  loadCidades = async () => {
    const res = await api.get("/cities").catch(err => {
      alert(err);
      window.location.reload();
    });

    const cidades = res.data;
    this.setState({ cidades });
  };

  getRange = state => {
    this.setState({ initFeriado: state.from, endFeriado: state.to });
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

    this.setState({ days: day });

    const state = {
      cidade:
        this.state.nomeCidade === "Nacional"
          ? "Nacional"
          : this.state.nomeCidade,
      national: this.state.nomeCidade === "Nacional" ? true : false,
      nome: this.state.nome,
      init: this.state.initFeriado.toLocaleDateString(),
      end: this.state.endFeriado
        ? this.state.endFeriado.toLocaleDateString()
        : this.state.initFeriado.toLocaleDateString()
    };

    console.log(state);

    await api
      .post("/holidays", state)
      .then(window.location.reload())
      .catch(err => {
        alert(
          "Verifique se todos os dados estão inseridos corretamente ou se o nome do feriado já foi cadastrado"
        );
        console.log(err);
        return;
      });

    return;
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
      border: "solid 1px #707070",
      backgroundColor: "#ffffff"
    };

    const selectStyles = {
      border: "solid 1px #707070"
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

          <h2>Nome da Cidade</h2>
          <select
            name="nomeCidade"
            onChange={this.handleChange}
            defaultValue="selected"
            style={selectStyles}
            placeholder="Selecione uma cidade"
            required
          >
            <option defaultValue="selected">Selecione uma cidade</option>
            <option value="Nacional">Nacional</option>
            {this.state.cidades.map((c, i) => (
              <option key={i} value={c.nome}>
                {c.nome}
              </option>
            ))}
          </select>

          <h2>Nome do Feriado</h2>
          <input
            type="text"
            name="nome"
            id="nomeFeriado"
            style={inputStyles}
            onChange={this.handleChange}
          />

          <h2>Selecionar Dia</h2>
          <Calendar name={"feriado"} getRange={this.getRange.bind(this)} />

          <div className="footer" style={footerStyles}>
            <button onClick={this.onSubmit}></button>
          </div>
        </div>
      </div>
    );
  }
}
