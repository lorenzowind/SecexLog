import React, { Component } from "react";
import { Link } from "react-router-dom";

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

      search: "",
      busca: false,

      popUp: [],

      dateInit: new Date(),
      dateEnd: new Date()
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const data = await this.props.cities;

    console.log(data);

    const city1 = [];
    const city2 = [];
    const city3 = [];

    console.log(data.length);
    let cont = 0;
    for (var i = 0; i < data.length; i++) {
      let aux = data[i];

      if (cont >= 0 && cont <= 3) {
        console.log(cont);
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

    console.log(city1);

    this.setState({ city1, city2, city3, busca: false });
  };

  handleSearch = async () => {
    if (this.state.busca) {
      this.loadData();
    } else {
      console.log(this.state.search);
      const res = await api.get(`/cities/${this.state.search}`);

      const data = res.data;

      console.log(data);

      const city1 = [];
      const city2 = [];
      const city3 = [];

      console.log(data.length);
      let cont = 0;
      for (var i = 0; i < data.length; i++) {
        let aux = data[i];

        if (cont >= 0 && cont <= 3) {
          console.log(cont);
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

      console.log(city1);

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
    let relatedCities = "Ainda Nenhuma";
    let holidays = "Ainda Nenhum";
    let initFlood = c.aux.initDataCheia;
    let endFlood = c.aux.endDataCheia;
    let id = c.aux.id;

    let text = { h1, nome, cidadesRelacionadas, feriados, cheia };
    let value = { name, relatedCities, holidays, id };

    this.setState({ dateInit: initFlood, dateEnd: endFlood });

    popUp.push({ text, value });

    this.setState({ popUp: popUp, popUpStats: true });
  };

  handleClose = ev => {
    ev.preventDefault();
    this.setState({ popUp: [] });
  };

  handleEditSubmit = async ev => {
    ev.preventDefault();

    const state = {
      id: this.state.popUp[0].value.id,
      nome: this.state.popUp[0].value.nome,
      initDataCheia: this.state.popUp[0].value.initFlood,
      endDataCheia: this.state.popUp[0].value.endFlood
    };

    await api
      .put(`/cities/${state.id}`, state)
      .then(() => {
        this.setState({ popUp: [] });
        window.location.reload();
      })
      .catch(err => {
        alert(err);
      });
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

  handleChange = ev => {
    const state = Object.assign({}, this.state);
    const name = ev.target.name;

    state[name] = ev.target.value;

    this.setState(state);
  };

  handleDateChangeInit = date => {
    this.setState({ dateInit: date });
  };

  handleDateChangeEnd = date => {
    this.setState({ dateEnd: date });
  };

  render() {
    return (
      <div className="body">
        <div className="cadastroCidade">
          <Header />

          <h1>Pesquisar cidades</h1>
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
                  value={c.value.name}
                  onChange={this.handleChange}
                />

                <h4>{c.text.cidadesRelacionadas}</h4>
                <input
                  type="text"
                  value={c.value.relatedCities}
                  onChange={this.handleChange}
                />

                <h4>{c.text.feriados}</h4>
                <input
                  type="text"
                  value={c.value.holidays}
                  onChange={this.handleChange}
                />

                <h4>{c.text.cheia}</h4>
                <div className="flood">
                  <div className="flood_">
                    <div className="ida">
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
                    <div className="volta">
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
