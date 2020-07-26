import React, { Component } from "react";
import { FormControlLabel, Switch } from "@material-ui/core";

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
      national: false,

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

  handleToggle = ev => {
    const state = Object.assign({}, this.state);
    const name = ev.target.name;
    const checked = ev.target.checked;

    state[name] = checked;

    this.setState(state);
  }

  onSubmit = async ev => {
    ev.preventDefault();

    this.setState({ days: day });

    const state = {
      cidade: this.state.nomeCidade === "" ? "Nacional" : this.state.nomeCidade,
      national: this.state.national,
      nome: this.state.nome,
      init: this.state.initFeriado.toLocaleDateString().substr(0, 5),
      end: this.state.endFeriado
        ? this.state.endFeriado.toLocaleDateString().substr(0, 5)
        : this.state.initFeriado.toLocaleDateString().substr(0, 5)
    };

    await api
      .post("/holidays", state)
      .then(window.location.reload())
      .catch(err => {
        alert(
          "Verifique se todos os dados estão inseridos corretamente ou se o nome do feriado já foi cadastrado"
        );
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
            {this.state.cidades.map((c, i) => {
              if(c.nome !== "Nacional") {
                return <option key={i} value={c.nome}>
                  {c.nome}
                </option>
              }
              else {
                return 0;
              }
            })}
          </select>

          <h2>Nome do Feriado</h2>
          <input
            type="text"
            name="nome"
            id="nomeFeriado"
            style={inputStyles}
            onChange={this.handleChange}
          />

          <FormControlLabel
            control={
              <Switch
                checked={this.state.national} 
                onChange={this.handleToggle} 
                name="national"
                color="primary"
              />
            }
            label="Nacional"
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