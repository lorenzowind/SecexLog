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

      search: "",
      busca: false,

      dateInit: null,
      dateEnd: null,

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
    let options = [];

    let cont = 0;
    for (var i = 0; i < data.length; i++) {
      let aux = data[i];
      if (aux.nome !== "Nacional") {
        let value = data[i].nome;
        let label = data[i].nome;
        options.push({ value, label });

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
    }

    this.setState({ city1, city2, city3, busca: false, options: options });
  };

  handleSearch = async () => {
    if (this.state.busca) {
      this.loadData();
    } else {
      const res = await api.get(`/cities/${this.state.search}`);

      const data = res.data;

      const city1 = [];
      const city2 = [];
      const city3 = [];
      let cont = 0;
      for (var i = 0; i < data.length; i++) {
        let aux = data[i];
        if (aux.nome !== "Nacional") {
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
      }

      this.setState({ city1, city2, city3, busca: true });
    }
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
    let latitute = c.aux.latitute;
    let longitude = c.aux.longitude;

    let text = { h1, nome, cidadesRelacionadas, feriados, cheia };
    let value = {
      name,
      relatedCities,
      id,
      cBase,
      cAuditada,
      obsInterdicao,
      obsCidade,
      latitute,
      longitude
    };

    popUp.push({ text, value });

    this.setState({ 
      dateInit: initFlood === "" ? 
        undefined : initFlood.split(/\//).reverse().join('/'),
      dateEnd: endFlood === "" ? 
        undefined : endFlood.split(/\//).reverse().join('/'),
      popUp: popUp, 
      popUpStats: true 
    });

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
      if (this.state.popUp[0].value.id === res.data[i].city_id || res.data[i].national === true)
        holidays.push(res.data[i].init + " - " + res.data[i].nome);
    }

    if (holidays.length === 0) holidays.push("Nenhum feriado");

    this.setState({ holidays: holidays });
  };

  loadOpcoes = () => {
    let cidadesRelacionadas0 = [];

    if (this.state.popUp[0].value.relatedCities !== null) {
      let relations = this.state.popUp[0].value.relatedCities.split(",");

      if (relations.length === 1 && relations[0] === "") {
        cidadesRelacionadas0 = null;
      }

      else {
        for (var i = 0; i < relations.length; i++) {
          let city = {
            value: relations[i].trim(),
            label: relations[i].trim()
          };
          cidadesRelacionadas0.push(city);
        }
      }

    }
  
    this.setState({
      cidadesRelacionadas0: cidadesRelacionadas0
    });
  };

  handleClose = ev => {
    ev.preventDefault();
    this.setState({ edit_status: false });
    this.setState({ popUp: [], popUpStats: false });
  };

  handleEditSubmit = async ev => {
    ev.preventDefault();

    let cidadesRelacionadas = this.state.cidadesRelacionadas1;
    let cidades = "";
    let state = [];

    if (cidadesRelacionadas) {
      if (!this.state.edit_status) {
        for (var k = 0; k < this.state.cidadesRelacionadas1.length; k++) {
          if (k === this.state.cidadesRelacionadas1.length - 1) {
            if (cidadesRelacionadas[k].label !== this.state.popUp[0].value.name)
              cidades += cidadesRelacionadas[k].label;
          } else {
            if (cidadesRelacionadas[k].label !== this.state.popUp[0].value.name)
              cidades += cidadesRelacionadas[k].label + ", ";
          }
        }
      }

      if (cidades[cidades.length - 2] === ",") {
        cidades = cidades.substr(0, cidades.length - 3);
      }
      state = {
        id: this.state.popUp[0].value.id,
        nome: this.state.popUp[0].value.name,
        relations: cidades.trim(),
        initDataCheia: this.state.dateInit,
        endDataCheia: this.state.dateEnd,
        cBase: this.state.popUp[0].value.cBase,
        cAuditada: this.state.popUp[0].value.cAuditada,
        obsInterdicao: this.state.popUp[0].value.obsInterdicao,
        obsCidade: this.state.popUp[0].value.obsCidade,
        latitute: this.state.popUp[0].value.latitute,
        longitude: this.state.popUp[0].value.longitude
      };
    } else {
      state = {
        id: this.state.popUp[0].value.id,
        nome: this.state.popUp[0].value.name,
        initDataCheia: this.state.dateInit,
        endDataCheia: this.state.dateEnd,
        cBase: this.state.popUp[0].value.cBase,
        cAuditada: this.state.popUp[0].value.cAuditada,
        obsInterdicao: this.state.popUp[0].value.obsInterdicao,
        obsCidade: this.state.popUp[0].value.obsCidade,
        latitute: this.state.popUp[0].value.latitute,
        longitude: this.state.popUp[0].value.longitude
      };
    }

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
  };

  handleCidadesRelacionadas = cidadesRelacionadas1 => {
    this.setState({ cidadesRelacionadas1 });
  };

  handleChange = ev => {
    this.state.popUp[0].value.name = ev.target.value;
  };

  handleChange1 = ev => {
    const state = Object.assign({}, this.state);
    const campo = ev.target.name;
    const value = ev.target.value;

    state[campo] = value;

    this.setState(state);
  };

  render() {
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
        width: "100%",
        borderColor: "#707070",
        padding: "0",
        overflowY: "scroll",
        "::-webkit-scrollbar": {
          display: "none"
        }
      }),
      option: styles => ({ ...styles })
    };

    return (
      <div className="body">
        <div className="cadastroCidade">
          <Header />

          <h1>Pesquisar cidades</h1>
          <div className="searchCity">
            <input type="text" name="search" onChange={this.handleChange1} />
            <img
              src={this.state.busca ? Close : Lupa}
              alt=""
              onClick={this.handleSearch}
            />
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
                                  if (!this.state.popUpStats) {
                                    this.editPopUp(content);
                                  }
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
                <div
                  className="linha"
                  style={{ position: "relative", marginBlockEnd: "50px" }}
                >
                  <h4 style={{ position: "absolute" }}>
                    {c.text.cidadesRelacionadas}
                  </h4>
                </div>
                <Select
                  className="select"
                  closeMenuOnSelect={false}
                  placeholder=""
                  components={animatedComponents}
                  isMulti
                  defaultValue={this.state.cidadesRelacionadas0}
                  value={this.state.options_selected}
                  options={this.state.options}
                  name="cidadesRelacionadas"
                  onChange={this.handleCidadesRelacionadas}
                  theme={theme}
                  styles={selectStyle}
                />
                <div className="coordenadas">
                  <div className="latitude" style={{ marginLeft: "4.4%" }}>
                    <h4>Latitude</h4>
                    <input
                      type="text"
                      name="latitude"
                      onChange={this.handleChange}
                      style={{ width: "60%" }}
                      value={c.value.latitute}
                    />
                  </div>
                  <div className="longitude">
                    <h4>Longitude</h4>
                    <input
                      type="text"
                      name="longitude"
                      style={{ width: "60%" }}
                      onChange={this.handleChange}
                      value={c.value.longitude}
                    />
                  </div>
                </div>
                <h4 style={{ marginBottom: "4.2%", marginTop: "6%" }}>
                  {c.text.feriados}
                </h4>
                {this.state.holidays.map(i => (
                  <div className="feriados" key={i}>
                    <h4>{i}</h4>
                  </div>
                ))}
                <h4 style={{ marginTop: "9.3%" }}>{c.text.cheia}</h4>
                <div className="flood">
                  <div className="flood_">
                    <div className="init">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          value={this.state.dateInit}
                          format="dd/MM/yyyy"
                          disableToolbar
                          variant="inline"
                          InputProps={{
                            disableUnderline: true
                          }}
                          onChange={this.handleDateChangeInit}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                    <img src={Ir} alt="" />
                    <div className="end">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          value={this.state.dateEnd}
                          format="dd/MM/yyyy"
                          disableToolbar
                          variant="inline"
                          InputProps={{
                            disableUnderline: true
                          }}
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
