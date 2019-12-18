import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

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
  {value: "Domingo", label: "Domingo"},
  {value: "Segunda-feira", label: "Segunda-feira"},
  {value: "Terça-feira", label: "Terça-feira"},
  {value: "Quarta-feira", label: "Quarta-feira"},
  {value: "Quinta-feira", label: "Quinta-feira"},
  {value: "Sexta-feira", label: "Sexta-feira"},
  {value: "Sábado", label: "Sábado"}
]

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
      dia: [],
      hora: [],

      dia_: null,

      row: [],

      popUp: [],

      edit_modal_status: false,
      edit_prest_status: false,

      modais: [],
      prestadores: []
    };
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = async () => {
    await setTimeout(() => {
      api
      .get("/paths")
      .then(res => {
        console.log(res)
        const row = this.state.row;
        for (var i = 0; i < res.data.length; i++) {
          row.push(res.data[i]);
        }
        console.log(row)
        return row;
      })
      .then(row => {
        this.setState({ row: row, load: true });
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
    }, 1200);
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

  handleDia = dia_ => {
    this.setState({ dia_ });
  };

  handleEditModal = () => {
    this.setState({ edit_modal_status: true });
  }

  handleEditPrest = () => {
    this.setState({ edit_prest_status: true });
  }

  handleDelete = async ev => {
    ev.preventDefault();

    await api
      .delete(`/paths/${this.state.popUp[0].value.id}`)
      .then(window.location.reload())
      .catch(err => {
        alert(err);
      });
  };

  maisClicked = async () => {
    var hora = document.getElementsByClassName("horario");
    const dia = this.state.dia;
    const hora_ = this.state.hora;
    dia.push(this.state.dia_.value);
    hora_.push(hora[0].firstElementChild.value);
    this.setState({dia: dia, hora: hora_});
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
    let modal = c.modal;
    let prestNome = c.prestNome;
    let dia = c.dia;
    let hora = c.hora;
    let mileage = c.mileage;
    let cost = c.cost;
    let departure = c.departure;
    let arrival= c.arrival;
    let linha = c.linha;
    let duration = c.duration;

    this.setState({dia: dia, hora: hora});

    if(linha)this.setState({tipo_modal: "linha"})
    else this.setState({tipo_modal: "contratado"})

    this.setState({modal: modal, prestador: prestNome});

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

  handleChangeRadio = ev => {
    ev.preventDefault();
    const value = ev.target.value;
    this.setState({tipo_modal: value});
  };

  handleChangeText = ev => {
    const state = Object.assign({}, this.state);
    const name = ev.target.name;
    const value = ev.target.value;

    state[name] = value;

    this.setState(state);
  };
  handleChangeDuracao = ev => {
    this.state.popUp[0].value.duration = ev.target.value;
  };
  handleChangeQuilometragem = ev => {
    this.state.popUp[0].value.mileage = ev.target.value;
  };
  handleChangeValor = ev => {
    this.state.popUp[0].value.cost = ev.target.value;
  };

  handleEditSubmit = async ev => {
    ev.preventDefault();

    var linha, contratado;
    if(this.state.tipo_modal === "linha"){
      linha = 1;
      contratado = 0;
    }
    else {
      linha = 0;
      contratado = 1;
    }

    const state = {
      initCidade: this.state.popUp[0].value.initCidade,
      endCidade: this.state.popUp[0].value.endCidade,
      modal: this.state.modal,
      prestNome: this.state.prestador,
      dia: this.state.dia,
      hora: this.state.hora,
      mileage: parseFloat(this.state.popUp[0].value.mileage),
      cost: parseFloat(this.state.popUp[0].value.cost),
      departure: this.state.popUp[0].value.departure,
      arrival: this.state.popUp[0].value.arrival,
      linha: this.state.linha,
      contratado: this.state.contratado, 
      duration: this.state.popUp[0].value.duration
    };

    console.log(state);

    let error = null;

    await api
      .put(`/paths/${this.state.popUp[0].value.id}`, state)
      .then(() => {
        this.setState({ popUp: [] });
        window.location.reload();
      })
      .catch(err => {
        alert(err);
        error = err;
      });

    if (!error) window.location.reload();
  
  };

  render() {
    const cidadesStyles = { width: "35%", marginRight: "3%", marginLeft: "5%" };
    const imgStyles = {
      height: "38px",
      position: "relative",
      top: "3px"
    };
    const diaStyle = { width: "30%", marginRight: "3%", marginTop: '2%'};
    const horaStyle = { width: "30%", marginRight: "3%", marginTop: '2%', marginLeft: "1%" };

    const { dia } = this.state;

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
                        <th align="left">Cidade Origem</th>
                        <th align="left">Cidade Destino</th>
                        <th align="left">Modal</th>
                        <th align="left">Prestador</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.row.map((c, i) => (
                        <tr key={i}>
                          <td>{c.initCidade}</td>
                          <td>{c.endCidade}</td>
                          <td>{c.modal}</td>
                          <td>{c.prestNome}</td>
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
            <div className="popUp_trajeto" key={i}>
              <div className="popUp_trajeto_">
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
                  value={c.value.initCidade}
                  style={cidadesStyles}
                />
                <img src={Ir} alt="" style={imgStyles} />
                <input
                  type="text"
                  name="destino"
                  placeholder="Destino"
                  value={c.value.endCidade}
                  style={cidadesStyles}
                />
              </div>
              <div className="texto_edit1">
                <h4>{c.text.tp_modal}</h4>
                <img
                  src={Edit}
                  alt=""
                  onClick={this.handleEditModal}
                />
              </div>
              {this.state.edit_modal_status ? (
                <Select
                    className="select"
                    placeholder=""
                    components={animatedComponents}
                    options={this.state.modais}
                    name="cidadesRelacionadas"
                    onChange={this.handleModais}
                />
              ) : (
                <div className="modal_trajeto">
                  <h1>{c.value.modal}</h1>
                </div>
              )}
              <div className="texto_edit2">
                <h4>{c.text.prestador}</h4>
                <img
                  src={Edit}
                  alt=""
                  onClick={this.handleEditPrest}
                />
              </div>
              {this.state.edit_prest_status ? (
                <Select
                  className="select"
                  placeholder=""
                  components={animatedComponents}
                  options={this.state.prestadores}
                  name="cidadesRelacionadas"
                  onChange={this.handlePrestador}
                />
              ) : (
                <div className="prest_trajeto">
                  <h1>{c.value.prestNome}</h1>
                </div>
              )}
              <h4>{c.text.diaHora}</h4>
              <div className="diaHora_add">
                <Select 
                  className="select"
                  placeholder="Dia" 
                  options={dias_semana} 
                  components={animatedComponents} 
                  name="modais" 
                  onChange={this.handleDia}
                />
                <div className="horario"><input type="text" placeholder="Horário" name="hora" id="embarqueHora" style={{width: "100px"}}/></div>
                <img src={Mais} alt="" onClick={this.maisClicked}/>
              </div>
              <div className="dia_horario">
                {dia.map((i, index) => (
                  <div className="linha_dia_hora_" key={i}>
                    <h1>
                      {i}, {this.state.hora[index]}
                    </h1>
                  </div>
                ))}
                </div>
              <div className="linha">
                <div className="duracao">
                  <h1>Duração do Trecho</h1>
                  <input type="text" defaultValue={c.value.duration} onChange={this.handleChangeDuracao}/>
                </div>
                <div className="quilometragem_">
                  <h1>Quilometragem (Km)</h1>
                  <input type="text" defaultValue={c.value.mileage} onChange={this.handleChangeQuilometragem}/>
                </div>
              </div>
              <div className="linha">
                <div className="valor">
                  <h1>Valor do Trecho</h1>
                  <input type="text" defaultValue={c.value.cost} onChange={this.handleChangeValor}/>
                </div>
                <div className="tipo_modal_">
                  <h1>O modal é:</h1>
                  <div className="linha_modal_">
                  <input
                    type="radio"
                    name="linha"
                    value="linha"
                    onChange={this.handleChangeRadio}
                    checked={this.state.tipo_modal === "linha"}
                  />
                  </div>
                  <h2>Linha</h2>
                  <div className="contratado_modal_">
                  <input
                    type="radio"
                    name="contratado"
                    value="contratado"
                    onChange={this.handleChangeRadio}
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
