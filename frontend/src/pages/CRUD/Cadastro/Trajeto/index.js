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

const dias_semana = [
  { value: "Domingo", label: "Domingo" },
  { value: "Segunda-feira", label: "Segunda-feira" },
  { value: "Terça-feira", label: "Terça-feira" },
  { value: "Quarta-feira", label: "Quarta-feira" },
  { value: "Quinta-feira", label: "Quinta-feira" },
  { value: "Sexta-feira", label: "Sexta-feira" },
  { value: "Sábado", label: "Sábado" }
];

export default class Trajeto extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      ida: null,
      volta: null,
      modal: "",

      prestador_modal: "",

      dia_: null,

      dia: [],
      hora: [],

      duracao: "",
      quilometragem: "",
      valor: "",

      local_embarque: "",
      local_desembarque: "",

      tipo_modal: "",

      modais: [],
      prestador: [],
      cidades: [],
      dias: []
    };
  }

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
    const res = await api.get("/providers").catch(err => {
      alert(err.message);
      window.location.reload(false);
    });

    const prestador = [];

    for (var i = 0; i < 1; i++) {
      let value = res.data[i].nome;
      let label = res.data[i].nome;

      prestador.push({ value, label });
    }
    this.setState({ prestador: prestador });
  };

  componentDidMount() {
    this.loadCidades();
    this.loadModais();
  }

  onSubmit = async ev => {
    ev.preventDefault();

    var linha, contratado;
    if (this.state.tipo_modal === "linha") {
      linha = 1;
      contratado = 0;
    } else {
      linha = 0;
      contratado = 1;
    }

    const json = {
      initCidade: this.state.ida.value,
      endCidade: this.state.volta.value,
      modal: this.state.modal,
      prestNome: this.state.prestador_modal,
      dia: this.state.dia,
      hora: this.state.hora,
      cost: parseFloat(this.state.valor),
      mileage: parseFloat(this.state.quilometragem),
      arrival: this.state.local_embarque,
      departure: this.state.local_desembarque,
      linha: linha,
      contratado: contratado,
      duration: this.state.duracao
    };

    console.log(json);

    let error = null;

    await api.post("/paths", json).catch(err => {
      alert(
        "Verifque se todos os dados estão inseridos corretamente ou se o trajeto já foi cadastrado"
      );
      error = err;
    });

    if (!error) window.location.reload();
  };

  handleChange = ev => {
    ev.preventDefault();
    const value = ev.target.value;
    this.setState({ tipo_modal: value });
  };

  handleChangeText = ev => {
    const state = Object.assign({}, this.state);
    const name = ev.target.name;
    const value = ev.target.value;

    state[name] = value;

    this.setState(state);
  };

  poligonoClicked = async () => {
    var element = document.getElementsByClassName("selecione-prestador");

    if (element[0].style.display === "none") element[0].style.display = "block";
    else element[0].style.display = "none";
  };

  maisClicked = async () => {
    var hora = document.getElementsByClassName("hora");
    const dia = this.state.dia;
    const hora_ = this.state.hora;
    dia.push(this.state.dia_.value);
    hora_.push(hora[0].firstElementChild.value);
    this.setState({ dia: dia, hora: hora_ });
    this.setState({ dia_: null });
  };

  onChange = ev => {
    const state = Object.assign({}, this.state);
    const campo = ev.target.name;
    const value = ev.target.value;

    state[campo] = value;

    this.setState(state);
  };

  loadCidades = async () => {
    const res = await api.get("/cities").catch(err => {
      alert(err.message);
      window.location.reload(false);
    });

    const cidades = [];

    for (var i = 0; i < res.data.length; i++) {
      let value = res.data[i].nome;
      let label = res.data[i].nome;

      cidades.push({ value, label });
    }

    this.setState({ cidades: cidades });
  };

  handleCidadeIda = ida => {
    this.setState({ ida });
  };

  handleCidadeVolta = volta => {
    this.setState({ volta });
  };

  handleDia = dia_ => {
    this.setState({ dia_ });
  };

  render() {
    const { dia } = this.state;

    return (
      <div className="body">
        <Menu ativo={false} />
        <div className="cadastro">
          <HeaderTrajeto op={"Trajeto"} />
          <form>
            <div className="cadastro-trajeto">
              <div className="adicionar-cidades">
                <h1>Adicionar cidades do trajeto</h1>
                <div className="linha">
                  <Select
                    className="select"
                    closeMenuOnSelect={false}
                    placeholder=""
                    components={animatedComponents}
                    options={this.state.cidades}
                    name="cidadeIda"
                    onChange={this.handleCidadeIda}
                  />
                  <img src={seta} alt="" />
                  <div className="volta">
                    <Select
                      className="select"
                      closeMenuOnSelect={false}
                      placeholder=""
                      components={animatedComponents}
                      options={this.state.cidades}
                      name="cidadeVolta"
                      onChange={this.handleCidadeVolta}
                    />
                  </div>
                </div>
              </div>

              <div className="escolha-modal">
                <h1>Escolha o Modal para este trajeto</h1>

                <Select
                  className="select"
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
                    placeholder=""
                    components={animatedComponents}
                    options={this.state.prestador}
                    name="modais"
                    onChange={this.handlePrestador}
                  />

                  <div className="dia-hora-embarque">
                    <h1>Dia e hora de embarque</h1>
                    <div className="linha_">
                      <Select
                        className="select"
                        placeholder="Dia"
                        options={dias_semana}
                        components={animatedComponents}
                        name="modais"
                        onChange={this.handleDia}
                      />
                      <div className="hora">
                        <input
                          type="text"
                          placeholder="Horário"
                          name="hora"
                          id="embarqueHora"
                        />
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
                  <div className="dados_trajeto">
                    <div className="linha_">
                      <div className="duracao_trecho">
                        <h1>Duração do trecho</h1>
                        <input
                          type="text"
                          placeholder=""
                          name="duracao"
                          id="duracao"
                          onChange={this.handleChangeText}
                        />
                      </div>
                      <div className="quilometragem">
                        <h1>Quilometragem (Km)</h1>
                        <input
                          type="text"
                          placeholder=""
                          name="quilometragem"
                          id="quilometragem"
                          onChange={this.handleChangeText}
                        />
                      </div>
                      <div className="valor_trecho">
                        <h1>Valor do Trecho</h1>
                        <input
                          type="text"
                          placeholder=""
                          name="valor"
                          id="valor"
                          onChange={this.handleChangeText}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="local_embarque">
                    <h1>Local de Embarque</h1>
                    <input
                      type="text"
                      placeholder=""
                      name="local_embarque"
                      id="local_embarque"
                      onChange={this.handleChangeText}
                    />
                  </div>
                  <div className="local_desembarque">
                    <h1>Local de Desembarque</h1>
                    <input
                      type="text"
                      placeholder=""
                      name="local_desembarque"
                      id="local_desembarque"
                      onChange={this.handleChangeText}
                    />
                  </div>
                  <div className="tipo_modal">
                    <h1>O modal é:</h1>
                    <div className="linha_">
                      <div className="linha_modal">
                        <input
                          type="radio"
                          name="safe"
                          value="linha"
                          onChange={this.handleChange}
                          checked={this.state.tipo_modal === "linha"}
                        />
                        <h2>Linha</h2>
                      </div>
                      <div className="contratado_modal">
                        <input
                          type="radio"
                          name="safe"
                          value="contratado"
                          onChange={this.handleChange}
                          checked={this.state.tipo_modal === "contratado"}
                        />
                        <h2>Contratado</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="footer">
                <button
                  onClick={this.onSubmit}
                  style={{ marginTop: "20px" }}
                ></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
