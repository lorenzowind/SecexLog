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
      origem: "",
      destino: "",
      modal: "",
      prestador: "",
      dia: [],
      hora: [],

      dia_: null,

      row: [],

      popUp: [],

      modais: [],
      prestadores: []
    };
  }

  componentDidMount() {
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
    //esperando rota de providers

    /*const res = await api.get("/providers").catch(err => {
      alert(err.message);
      window.location.reload(false);
    });*/

    const prestadores = [];

    for (var i = 0; i < 1; i++) {
      //let value = res.data[i].nome;
      //let label = res.data[i].nome;
      let value = "teste";
      let label = "teste";

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

  editPopUp = c => {
    let { popUp } = this.state;

    let h1 = "Editar Trajeto";
    let cidades = "Cidades";
    let tp_modal = "Modal";
    let prestador = "Nome do Prestador";
    let diaHora = "Dia e Hora de embarque";

    let initCidade = c.initCidade;
    let endCidade = c.endCidade;
    let modal = c.modal;
    let prestNome = c.prestNome;
    let dia = c.dia;
    let hora = c.hora;

    let text = {
      h1,
      cidades,
      tp_modal,
      prestador,
      diaHora
    };

    let value = { 
      initCidade,
      endCidade,
      modal,
      prestNome,
      dia,
      hora
    };

    popUp.push({ text, value });

    this.loadModais();
    this.loadPrestador();

    this.setState({ popUp: popUp, popUpStats: true });
  };

  handleClose = ev => {
    ev.preventDefault();
    this.setState({ popUp: [] });
  };

  handleChange = () => {};

  render() {
    const cidadesStyles = { width: "35%", marginRight: "3%", marginLeft: "5%" };
    const imgStyles = {
      height: "38px",
      position: "relative",
      top: "3px"
    };
    const diaStyle = { width: "30%", marginRight: "3%", marginTop: '2%'};
    const horaStyle = { width: "30%", marginRight: "3%", marginTop: '2%', marginLeft: "1%" };

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
                  onChange={this.handleChange}
                  style={cidadesStyles}
                />
                <img src={Ir} alt="" style={imgStyles} />
                <input
                  type="text"
                  name="destino"
                  placeholder="Destino"
                  value={c.value.endCidade}
                  style={cidadesStyles}
                  onChange={this.handleChange}
                />
              </div>
              <h4>{c.text.tp_modal}</h4>
              <Select
                  className="select"
                  placeholder=""
                  components={animatedComponents}
                  options={this.state.modais}
                  name="cidadesRelacionadas"
                  onChange={this.handleModais}
              />
              <h4>{c.text.prestador}</h4>
              <Select
                  className="select"
                  placeholder=""
                  components={animatedComponents}
                  options={this.state.prestadores}
                  name="cidadesRelacionadas"
                  onChange={this.handlePrestador}
              />

              <h4>{c.text.diaHora}</h4>
              <div className="diaHora_add" style={{ display: "flex" }}>
                <Select 
                  className="select"
                  placeholder="Dia" 
                  options={dias_semana} 
                  components={animatedComponents} 
                  name="modais" 
                  onChange={this.handleDia}
                />
                <input type="text" placeholder="Horário" name="hora" id="embarqueHora" />
                <img
                  src={Mais}
                  alt=""
                  style={{
                    position: "relative",
                    bottom: "50px",
                    top: "0"
                  }}
                />
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
