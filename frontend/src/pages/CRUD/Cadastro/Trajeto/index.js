import React, { Component } from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import HeaderTrajeto from "../components/HeaderTrajeto/index";
import Menu from "../../../../components/Menu/MenuLateral/index";

import api from "../../../../services/api";

import seta from "../../../../assets/1_Tela_de_Consulta_Automática/ir.png";
import poligono from "../../../../assets/6_Cadastro_de_Cidade_Trejetos/poligono.png";
import mais from "../../../../assets/6_Cadastro_de_Cidade_Trejetos/mais.png";

import "./styles.css";

const animatedComponents = makeAnimated();

export default class Trajeto extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
    this.childDiv = React.createRef();
  }

  getInitialState() {
    return {
      ida: "",
      volta: "",
      modal: "",

      prestador_modal: "",

      dia: [],
      hora: [],

      modais: [],
      prestador: []
    };
  }

  componentWillMount() {
    this.loadModais();
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

  handleModais = modais => {
    var modal = document.getElementsByClassName("modal-selecionado");
    modal[0].style.display = "block";

    var prestador = document.getElementsByClassName("selecione-prestador");
    prestador[0].style.display = "none";

    this.setState({ modal: modais.value });

    this.loadPrestador();
  };

  handlePrestador = prestador => {
    this.setState({ prestador_modal: prestador.value });
  };

  loadModais = async () => {
    const res = await api.get("/modals").catch(err => {
      alert(err.message);
      window.location.reload(false);
    });

    const modais = [];

    for (var i = 0; i < res.data.length; i++) {
      let value = res.data[i].name;
      let label = res.data[i].name;

      modais.push({ value, label });
    }

    this.setState({ modais: modais });
  };

  loadPrestador = async () => {
    //esperando rota de providers

    /*const res = await api.get("/providers").catch(err => {
      alert(err.message);
      window.location.reload(false);
    });*/

    const prestador = [];

    for (var i = 0; i < 1; i++) {
      //let value = res.data[i].nome;
      //let label = res.data[i].nome;
      let value = "teste";
      let label = "teste";

      prestador.push({ value, label });
    }

    this.setState({ prestador: prestador });
  };

  onSubmit = async ev => {
    ev.preventDefault();

    const json = {
      initCidade: this.state.ida,
      endCidade: this.state.volta,
      modal: this.state.modal,
      prestNome: this.state.prestador_modal,
      dia: this.state.dia,
      hora: this.state.hora
    };

    let error = null;

    await api.post("/paths", json).catch(err => {
      alert(
        "Verifque se todos os dados estão inseridos corretamente ou se o trajeto já foi cadastrado"
      );
      error = err;
    });

    if (!error) window.location.reload();
  };

  poligonoClicked = async () => {
    var element = document.getElementsByClassName("selecione-prestador");

    if (element[0].style.display === "none") element[0].style.display = "block";
    else element[0].style.display = "none";
  };

  maisClicked = async () => {
    var dia = document.getElementsByClassName("dia");
    var hora = document.getElementsByClassName("hora");

    this.state.dia.push(dia[0].firstElementChild.value);
    this.state.hora.push(hora[0].firstElementChild.value);
  };

  onChange = ev => {
    const state = Object.assign({}, this.state);
    const campo = ev.target.name;
    const value = ev.target.value;

    state[campo] = value;

    this.setState(state);
  };

  render() {
    const { dia } = this.state;

    return (
      <div className="body" ref={this.childDiv}>
        <Menu ativo={false} />
        <div className="cadastro">
          <HeaderTrajeto op={"Trajeto"} />
          <form>
            <div className="cadastro-trajeto">
              <div className="adicionar-cidades">
                <h1>Adicionar cidades do trajeto</h1>

                <div className="linha">
                  <div className="ida">
                    <input
                      type="text"
                      name="ida"
                      id="cidadeIda"
                      onChange={this.onChange}
                    />
                  </div>

                  <img src={seta} alt="" />

                  <div className="volta">
                    <input
                      type="text"
                      name="volta"
                      id="cidadeVolta"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>

              <div className="escolha-modal">
                <h1>Escolha o Modal para este trajeto</h1>

                <Select
                  className="select"
                  closeMenuOnSelect={false}
                  placeholder=""
                  components={animatedComponents}
                  options={this.state.modais}
                  name="modais"
                  onChange={this.handleModais}
                />
              </div>

              <div className="modal-selecionado">
                <div className="linha">
                  <img src={poligono} alt="" onClick={this.poligonoClicked} />
                  <h1>{this.state.modal}</h1>
                </div>

                <div className="selecione-prestador">
                  <h1>Selecione Prestador deste modal</h1>
                  <Select
                    className="select"
                    closeMenuOnSelect={false}
                    placeholder=""
                    components={animatedComponents}
                    options={this.state.prestador}
                    name="modais"
                    onChange={this.handlePrestador}
                  />

                  <div className="dia-hora-embarque">
                    <h1>Dia e hora de embarque</h1>
                    <div className="linha_">
                      <div className="dia">
                        <input type="text" name="dia" id="embarqueDia" />
                      </div>
                      <div className="hora">
                        <input type="text" name="hora" id="embarqueHora" />
                      </div>
                      <img src={mais} alt="" onClick={this.maisClicked} />
                    </div>

                    {dia.map((i, index) => (
                      <div className="linha_dia_hora" key={i}>
                        <h1>
                          {i}, {this.state.hora[index]}
                        </h1>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="footer">
                <button onClick={this.onSubmit}></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
