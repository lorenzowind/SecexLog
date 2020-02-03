import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ReactNumeric from 'react-numeric';
import InputMask from "react-input-mask";

import Header from "../../components/HeaderTrajeto/index";

import api from "../../../../services/api";

import Lupa from "../../../../assets/Cadastro de usuário/pesquisar.png";
import Mais from "../../../../assets/6_Cadastro_de_Cidade_Trejetos/mais.png";
import Ir from "../../../../assets/6_Cadastro_de_Cidade_Trejetos/ir.png";
import Edit from "../../../../assets/Cadastro de usuário/editar.png";
import Close from "../../../../assets/Cadastro de usuário/sair_secex.png";
import Trash from "../../../../assets/Cadastro de usuário/lixeira.png";

import "./styles.css";

const animatedComponents = makeAnimated();

const dias_semana = [
  { value: "domingo", label: "Domingo" },
  { value: "segunda-feira", label: "Segunda-feira" },
  { value: "terça-feira", label: "Terça-feira" },
  { value: "quarta-feira", label: "Quarta-feira" },
  { value: "quinta-feira", label: "Quinta-feira" },
  { value: "sexta-feira", label: "Sexta-feira" },
  { value: "sábado", label: "Sábado" }
];

export default class Trajeto extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      modal: "",
      prestador: "",
      tipo_modal: "",

      dia: "",
      hora: "",

      dias: [],
      horas: [],

      row: [],

      search: "",
      busca: false,

      popUp: [],

      edit_modal_status: false,
      edit_prest_status: false,

      modais: [],
      prestadores: []
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    api
      .get("/paths")
      .then(res => {
        this.setState({ row: res.data, load: true, busca: false });
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
      const res = await api.get(`/paths/${this.state.search}`).catch(err => {
        if (err.message === "Request failed with status code 401") {
          alert("Nível de acesso negado! Contate o administrador do sistema");
          window.location.replace("/menu");
        } else {
          alert(err);
          window.location.replace("/");
        }
      });

      this.setState({ row: res.data, busca: true });
    }
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

    const prestadores = [];

    for (var i = 0; i < 1; i++) {
      let value = res.data[i].nome;
      let label = res.data[i].nome;

      prestadores.push({ value, label });
    }

    this.setState({ prestadores: prestadores });
  };

  handleModais = modais => {
    this.setState({ modal: modais.value });
  };

  handlePrestador = prestador => {
    this.setState({ prestador: prestador.value });
  };

  handleDia = dia => {
    dia = dia.value;

    this.setState({ dia });
  };

  handleEditModal = () => {
    this.setState({ edit_modal_status: true });
  };

  handleEditPrest = () => {
    this.setState({ edit_prest_status: true });
  };

  handleDelete = async ev => {
    ev.preventDefault();

    await api
      .delete(`/paths/${this.state.popUp[0].value.id}`)
      .then(window.location.reload())
      .catch(err => {
        alert(err);
      });
  };

  maisClicked = () => {
    const { dia } = this.state;
    const { hora } = this.state;
    const { dias } = this.state;
    const { horas } = this.state;

    dias.push(dia);
    horas.push(hora);

    this.setState({ dia: "", hora: "", dias, horas });
  };

  editPopUp = c => {
    let { popUp } = this.state;

    let h1 = "Editar Trajeto";
    let cidades = "Cidades";
    let tp_modal = "Modal";
    let prestador = "Nome do Prestador";
    let diaHora = "Dia e Hora de embarque";

    let id = c.id;
    let initCidade = c.initCidade;
    let endCidade = c.endCidade;
    let modal = {
      label: c.modal,
      value: c.modal
    };
    let prestNome = {
      label: c.prestNome,
      value: c.prestNome
    };
    let dia = c.dia;
    let hora = c.hora;
    let mileage = c.mileage;
    let cost = c.cost;
    let departure = c.departure;
    let arrival = c.arrival;
    let linha = c.linha;
    let duration;

    if (c.duration.length === 4) {
      let tmp = "0" + c.duration;
      duration = tmp;
    }
    else {
      duration = c.duration;
    }

    this.setState({ dias: dia, horas: hora });

    if (linha) this.setState({ tipo_modal: "linha" });
    else this.setState({ tipo_modal: "contratado" });

    this.setState({ modal: modal, prestador: prestNome });

    let text = {
      h1,
      cidades,
      tp_modal,
      prestador,
      diaHora
    };

    let value = {
      id,
      initCidade,
      endCidade,
      modal,
      prestNome,
      dia,
      hora,
      mileage,
      cost,
      departure,
      arrival,
      duration
    };

    popUp.push({ text, value });

    this.loadModais();
    this.loadPrestador();

    this.setState({ popUp: popUp, popUpStats: true });
  };

  handleClose = ev => {
    ev.preventDefault();
    this.setState({ edit_modal_status: false });
    this.setState({ edit_prest_status: false });
    this.setState({ popUp: [] });
  };

  handleChangeText = ev => {
    const state = Object.assign({}, this.state);
    const name = ev.target.name;
    const value = ev.target.value;

    state[name] = value;

    this.setState(state);
  };
  handleChangeDuracao = ev => {
    const popUp = this.state.popUp;
    popUp[0].value.duration = ev.target.value;
    this.setState({ popUp: popUp });
  };
  handleChangeQuilometragem = ev => {
    const popUp = this.state.popUp;
    this.state.popUp[0].value.mileage = ev.target.value;
    this.setState({ popUp: popUp });
  };

  handleEditSubmit = async ev => {
    ev.preventDefault();

    var linha, contratado;
    if (this.state.tipo_modal === "linha") {
      linha = 1;
      contratado = 0;
    } else {
      linha = 0;
      contratado = 1;
    }

    var { dias } = this.state;
    var { horas } = this.state;


    if (this.state.dia !== "" && this.state.hora !== "") {
      dias.push(this.state.dia);
      horas.push(this.state.hora);
    }

    let duration = this.state.popUp[0].value.duration;
    let duration2;

    if (duration.charAt(0) == '0' && duration.charAt(1) == '0') {
      let tmp = duration.split('');
      tmp.splice(0, 1);
      duration2 = tmp.join('');
    }
    else {
      duration2 = duration.replace(/^0(?:0:0?)?/, '');
    }

    const state = {
      initCidade: this.state.popUp[0].value.initCidade,
      endCidade: this.state.popUp[0].value.endCidade,
      modal: this.state.modal.value,
      prestNome: this.state.prestador.value,
      dia: dias,
      hora: horas,
      mileage: parseFloat(this.state.popUp[0].value.mileage),
      cost: parseFloat(this.state.popUp[0].value.cost),
      departure: this.state.popUp[0].value.departure,
      arrival: this.state.popUp[0].value.arrival,
      linha: linha,
      contratado: contratado,
      duration: duration2
    };

    await api
      .put(`/paths/${this.state.popUp[0].value.id}`, state)
      .then(() => {
        this.setState({ popUp: [] });
        window.location.reload();
      })
      .catch(err => {
        alert(err);
      });
  };

  handleChange = ev => {
    const state = Object.assign({}, this.state);
    const name = ev.target.name;

    state[name] = ev.target.value;

    this.setState(state);
  };

  radioButtons(event) {
    this.setState({ tipo_modal: event.target.value });
  }

  render() {
    const cidadesStyles = { width: "35%", marginRight: "3%", marginLeft: "5%" };
    const imgStyles = {
      height: "38px",
      position: "relative",
      top: "3px"
    };

    const theme = theme => ({
      ...theme,
      borderRadius: "50px",
      colors: {
        ...theme.colors,
        primary25: "",
        primary: "#707070"
      }
    });

    const selectStyle = {
      control: styles => ({
        ...styles,
        height: "43px",
        borderColor: "#707070",
        overflow: "hidden"
      }),
      option: styles => ({ ...styles })
    };

    const { dias } = this.state;

    return (
      <div className="body">
        <div className="cadastroCidade">
          <Header />

          <h1>Pesquisar Trajeto</h1>
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
              <div className="listCity" style={{ overflowY: "auto" }}>
                <div className="table">
                  <table>
                    <thead>
                      <tr>
                        <th align="left">Cidade Origem</th>
                        <th align="left">Cidade Destino</th>
                        <th align="left">Modal</th>
                        <th align="left">Prestador</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.row.map((c, i) => (
                        <tr key={i}>
                          <td style={{ padding: "1%" }}>{c.initCidade}</td>
                          <td style={{ padding: "1%" }}>{c.endCidade}</td>
                          <td style={{ padding: "1%" }}>{c.modal}</td>
                          <td style={{ padding: "1%" }}>{c.prestNome}</td>
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
            <div className="popUp_trajeto" key={i}>
              <div className="popUp_trajeto_">
                <div className="title" style={{ marginLeft: "8.4%" }}>
                  <h2>{c.text.h1}</h2>
                  <img src={Close} alt="" onClick={this.handleClose} />
                </div>

                <h4>{c.text.cidades}</h4>
                <div style={{ display: "flex", marginLeft: "4.4%" }}>
                  <input
                    type="text"
                    name="origem"
                    placeholder="Origem"
                    value={c.value.initCidade}
                    style={cidadesStyles}
                    disabled={true}
                  />
                  <img src={Ir} alt="" style={imgStyles} />
                  <input
                    type="text"
                    name="destino"
                    placeholder="Destino"
                    value={c.value.endCidade}
                    style={cidadesStyles}
                    disabled={true}
                  />
                </div>
                <div className="texto_edit1">
                  <h4>{c.text.tp_modal}</h4>
                </div>
                <Select
                  className="select"
                  placeholder=""
                  components={animatedComponents}
                  options={this.state.modais}
                  name="modal"
                  defaultValue={c.value.modal}
                  onChange={this.handleModais}
                  theme={theme}
                  styles={selectStyle}
                />
                <div className="texto_edit2">
                  <h4>{c.text.prestador}</h4>
                </div>
                <Select
                  className="select"
                  placeholder=""
                  components={animatedComponents}
                  options={this.state.prestadores}
                  name="prestador"
                  defaultValue={c.value.prestNome}
                  onChange={this.handlePrestador}
                  theme={theme}
                  styles={selectStyle}
                />
                <h4>{c.text.diaHora}</h4>
                <div className="diaHora_add">
                  <Select
                    className="select"
                    placeholder="Dia"
                    options={dias_semana}
                    components={animatedComponents}
                    name="dia"
                    onChange={this.handleDia}
                    theme={theme}
                    styles={selectStyle}
                  />
                  <div className="horario">
                    <input
                      type="time"
                      placeholder="Horário"
                      name="hora"
                      id="embarqueHora"
                      style={{ width: "100px" }}
                      onChange={this.handleChange}
                    />
                  </div>
                  <img src={Mais} alt="" onClick={this.maisClicked} />
                </div>
                <div className="dia_horario">
                  {dias.map((i, index) => (
                    <div className="linha_dia_hora_" key={index}>
                      <h1>
                        {i}, {this.state.horas[index]}
                      </h1>
                    </div>
                  ))}
                </div>
                <div className="linha_traj">
                  <div className="duracao">
                    <h1>Duração do Trecho</h1>
                    <InputMask
                      mask="99:99"
                      defaultValue={c.value.duration}
                      onChange={this.handleChangeDuracao}
                    />
                  </div>
                  <div className="quilometragem_">
                    <h1>Quilometragem (Km)</h1>
                    <input
                      type="number"
                      defaultValue={c.value.mileage}
                      onChange={this.handleChangeQuilometragem}
                    />
                  </div>
                </div>
                <div className="linha_traj">
                  <div className="valor">
                    <h1>Valor do Trecho</h1>
                    <ReactNumeric
                      value={c.value.cost}
                      currencySymbol="R$"
                      minimumValue="0"
                      decimalCharacter=","
                      digitGroupSeparator="."
                      onChange={(e, value) => {
                        const popUp = this.state.popUp;
                        this.state.popUp[0].value.cost = value;
                        this.setState({ popUp: popUp });
                      }}
                    />
                  </div>
                  <div
                    className="tipo_modal_"
                    onChange={this.radioButtons.bind(this)}
                  >
                    <h1>O modal é:</h1>
                    <div className="linha_modal_">
                      <input
                        type="radio"
                        name="linha"
                        value="linha"
                        onChange={this.handleChange}
                        checked={this.state.tipo_modal === "linha"}
                      />
                    </div>
                    <h2>Linha</h2>
                    <div className="contratado_modal_">
                      <input
                        type="radio"
                        name="contratado"
                        value="contratado"
                        onChange={this.handleChange}
                        checked={this.state.tipo_modal === "contratado"}
                      />
                    </div>
                    <h3>Contratado</h3>
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
            </div>
          ))}
        </div>
      </div>
    );
  }
}
