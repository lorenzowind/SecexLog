import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import Header from "../../components/HeaderCidade/index";

import api from "../../../../services/api";

import Lupa from "../../../../assets/Cadastro de usuário/pesquisar.png";
import Mais from "../../../../assets/6_Cadastro_de_Cidade_Trejetos/mais.png";
import Ir from "../../../../assets/6_Cadastro_de_Cidade_Trejetos/ir.png";
import Edit from "../../../../assets/Cadastro de usuário/editar.png";
import Close from "../../../../assets/Cadastro de usuário/sair_secex.png";
import Trash from "../../../../assets/Cadastro de usuário/lixeira.png";

import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import "./styles.css";

const animatedComponents = makeAnimated();

export default class Cidade extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      city1: [],
      city2: [],
      city3: [],

      popUp: [],

      dateInit: new Date(),
      dateEnd: new Date(),

      options: [],

      cidadesRelacionadas0: [],
      cidadesRelacionadas1: null,

      edit_status: false,

      holidays: []
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const data = await this.props.cities;

    const city1 = [];
    const city2 = [];
    const city3 = [];

    let cont = 0;
    for (var i = 0; i < data.length; i++) {
      let aux = data[i];

      if (cont >= 0 && cont <= 3) {
        city1.push({ aux });
        cont++;
      } else if (cont >= 4 && cont <= 7) {
        city2.push({ aux });
        cont++;
      } else if (cont >= 8 && cont <= 11) {
        city3.push({ aux });
        cont++;
        if (cont > 11) cont = 0;
      }
      }

    this.setState({ city1, city2, city3 });
  };

  editPopUp = c => {
    
    let { popUp } = this.state;

    let h1 = "Editar Cidade";
    let nome = "Nome";
    let cidadesRelacionadas = "Cidades Relacionadas";
    let feriados = "Feriados";
    let cheia = "Período de Cheia";

    let name = c.aux.nome;
    let relatedCities = c.aux.relations;
    let initFlood = c.aux.initDataCheia;
    let endFlood = c.aux.endDataCheia;
    let id = c.aux.id;
    let cBase = c.aux.cBase;
    let cAuditada = c.aux.cAuditada;
    let obsInterdicao = c.aux.obsInterdicao;
    let obsCidade = c.aux.obsCidade;

    let text = { h1, nome, cidadesRelacionadas, feriados, cheia };
    let value = { name, relatedCities, id, cBase, cAuditada, obsInterdicao, obsCidade };

    this.setState({ dateInit: initFlood, dateEnd: endFlood });

    popUp.push({ text, value });

    this.setState({ popUp: popUp, popUpStats: true });
    
    this.loadOpcoes();

    this.loadHolidays();

  };

  loadHolidays = async () => {
    
    const res = await api.get("/holidays").catch(err => {
      alert(err.message);
      window.location.reload(false);
    });

    const holidays = [];

    for (var i = 0; i < res.data.length; i++) {
      if(this.state.popUp[0].value.id === res.data[i].city_id)holidays.push(res.data[i].nome);
    }
    
    if(holidays.length === 0)holidays.push("Nenhum feríado");

    this.setState({ holidays: holidays});

  }

  loadOpcoes = async () => {

    var relations = this.state.popUp[0].value.relatedCities.split(',');

    const res = await api.get("/cities").catch(err => {
      alert(err.message);
      window.location.reload(false);
    });

    const options = [], cidadesRelacionadas0 = [];

    if(relations.length === 1 && relations[0] === '')cidadesRelacionadas0.push("Nenhuma cidade relacionada");
    else{
      for (var i=0;i<relations.length;i++){
        cidadesRelacionadas0.push(relations[i].trim())
      }
    }

    for (var i = 0; i < res.data.length; i++) {
      let value = res.data[i].nome;
      let label = res.data[i].nome;

      if(this.state.popUp[0].value.name !== value)options.push({ value, label });
    }

    this.setState({ options: options, cidadesRelacionadas0: cidadesRelacionadas0 });
  };

  handleClose = ev => {
    ev.preventDefault();
    this.setState({ edit_status: false });
    this.setState({ popUp: [] });
  };

  handleEditSubmit = async ev => {
    ev.preventDefault();

    let cidadesRelacionadas = this.state.cidadesRelacionadas1;
    let cidades = "";

    if (cidadesRelacionadas) {
      const length = cidadesRelacionadas.length;
      for (var k = 0; k < length; k++) {
        if (k === length - 1) {
          cidades += cidadesRelacionadas[k].label;
        } else {
          cidades += cidadesRelacionadas[k].label + ", ";
        }
      }
    }
    else{
      for (var k = 0; k < this.state.cidadesRelacionadas0.length; k++) {
        if (k === this.state.cidadesRelacionadas0.length - 1) {
          cidades += this.state.cidadesRelacionadas0[k];
        } else {
          cidades += this.state.cidadesRelacionadas0[k] + ", ";
        }
      }
    }

    const state = {
      id: this.state.popUp[0].value.id,
      nome: this.state.popUp[0].value.name,
      relations: cidades,
      initDataCheia: this.state.dateInit,
      endDataCheia: this.state.dateEnd,
      cBase: this.state.popUp[0].value.cBase,
      cAuditada: this.state.popUp[0].value.cAuditada,
      obsInterdicao: this.state.popUp[0].value.obsInterdicao,
      obsCidade: this.state.popUp[0].value.obsCidade,
    };

    console.log(state);

    let error = null;

    await api
      .put(`/cities/${this.state.popUp[0].value.id}`, state)
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

  handleDelete = async ev => {
    ev.preventDefault();

    await api
      .delete(`/cities/${this.state.popUp[0].value.id}`)
      .then(window.location.reload())
      .catch(err => {
        alert(err);
      });
  };

  handleDateChangeInit = date => {
    this.setState({ dateInit: date });
  };

  handleDateChangeEnd = date => {
    this.setState({ dateEnd: date });
  };

  handleEditIcon = () => {
    this.setState({ edit_status: true });
  }

  handleCidadesRelacionadas = cidadesRelacionadas1 => {
    this.setState({ cidadesRelacionadas1 });
  };

  handleChange = ev => {
    this.state.popUp[0].value.name = ev.target.value;
  }

  render() {
    return (
      <div className="body">
        <div className="cadastroCidade">
          <Header />

          <h1>Pesquisar cidades</h1>
          <div className="searchCity">
            <input type="text" name="searchCidade" />
            <img src={Lupa} alt="" />
          </div>

          <div className="addCity">
            <div className="add">
              <h1>Adicionar Cidade</h1>
              <Link to="/cadastro/cidade/create">
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
                <div className="listCity_">
                  <div className="table">
                    <table name="table1">
                      <thead>
                        <tr>
                          <th align="left">Nome</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.city1.map((c, i) => (
                          <tr key={i}>
                            <td>{c.aux.nome}</td>
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
                        height: "100%",
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
                        {this.state.city2.map((c, i) => (
                          <tr key={i}>
                            <td>{c.aux.nome}</td>
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
                        height: "100%",
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
                        {this.state.city3.map((c, i) => (
                          <tr key={i}>
                            <td>{c.aux.nome}</td>
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
          </div>

          {this.state.popUp.map((c, i) => (
            <div className="popUp_city" key={i}>
              <div className="popUp_city_">
                <div className="title">
                  <h2>{c.text.h1}</h2>
                  <img src={Close} alt="" onClick={this.handleClose} />
                </div>
                <h4>{c.text.nome}</h4>
                <input
                  type="text"
                  defaultValue={c.value.name}
                  onChange={this.handleChange}
                />
                <div className="linha" style={{position: 'relative', marginBlockEnd: '50px'}}>
                <h4 style={{position: "absolute"}}>{c.text.cidadesRelacionadas}</h4>
                <img
                  src={Edit}
                  alt=""
                  style={{
                    height: "18px",
                    width: "18px",
                    marginLeft: "210px",
                    marginTop: '15px',
                    position: "absolute",
                    cursor: "pointer"
                  }}
                  onClick={this.handleEditIcon}
                />
                </div>
                {this.state.edit_status ? (
                <Select
                  className="select"
                  closeMenuOnSelect={false}
                  placeholder=""
                  components={animatedComponents}
                  isMulti
                  value={this.state.options_selected  }
                  options={this.state.options}
                  name="cidadesRelacionadas"
                  onChange={this.handleCidadesRelacionadas}
                />
                )
                : (
                  this.state.cidadesRelacionadas0.map((i) => (
                    <div className="cidades-relacionadas">
                      <h1>{i}</h1>
                    </div>
                  ))
                )}
                <h4>{c.text.feriados}</h4>
                {this.state.holidays.map((i) => (
                    <div className="feriados">
                      <h1>{i}</h1>
                    </div>
                ))}
                <h4>{c.text.cheia}</h4>
                <div className="flood">
                  <div className="flood_">
                    <div className="init">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          format="dd/MM/yyyy"
                          disableToolbar
                          variant="inline"
                          value={this.state.dateInit}
                          onChange={this.handleDateChangeInit}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                    <img src={Ir} alt="" />
                    <div className="end">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          format="dd/MM/yyyy"
                          disableToolbar
                          variant="inline"
                          value={this.state.dateEnd}
                          onChange={this.handleDateChangeEnd}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  </div>
                </div>
                <div className="btns">
                  <img
                    src={Trash}
                    alt="Deletar"
                    onClick={this.handleDelete}
                    style={{ left: "40px" }}
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
