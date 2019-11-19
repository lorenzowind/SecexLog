import React, { Component } from "react";
import HeaderCidade from "../components/HeaderOp/index";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Calendar from "../components/Calendar/Calendar";
import Menu from "../../../../components/Menu/MenuLateral/index";
import api from "../../../../services/api";

import "moment/locale/pt-br";
import "react-day-picker/lib/style.css";
import "./styles.css";

import Notif from "../../../../assets/6_Cadastro_de_Cidade_Trejetos/sino2.png";

const animatedComponents = makeAnimated();

let options = null;

export default class Cidade extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      nomeCidade: "",
      opCidadeBase: false,
      opCidadeAuditada: false,
      cidadesRelacionadas: null,
      initDataCheia: "",
      endDataCheia: "",
      obsInterdicao: "",
      obsCidade: "",

      itemArray: [],

      interdicaoTrecho: false,

      options: []
    };
  }

  componentWillMount() {
    this.loadOpcoes();
  }

  //Métodos CRUD

  //POST (Create)
  onSubmit = async ev => {
    ev.preventDefault();

    let cidadesRelacionadas = this.state.cidadesRelacionadas;
    let cidades = [];

    if (cidadesRelacionadas) {
      const length = cidadesRelacionadas.length;

      for (var k = 0; k < length; k++) {
        cidades[k] = cidadesRelacionadas[k].label;
      }
    }

    const stateCidade = {
      nome: this.state.nomeCidade,
      cBase: this.state.opCidadeBase,
      cAuditada: this.state.opCidadeAuditada,
      //cidadesRelacionadas: cidades,
      initDataCheia: this.state.initDataCheia.toString(),
      endDataCheia: this.state.endDataCheia.toString(),
      obsInterdicao: this.state.obsInterdicao,
      obsCidade: this.state.obsCidade
    };

    let error = null;

    await api.post("/cities", stateCidade).catch(err => {
      alert(
        "Verifque se todos os dados estão inseridos corretamente ou se o nome da cidade já foi cadastrado"
      );
      error = err;
    });

    if (!error) window.location.reload();
  };

  //GET (Read)
  loadOpcoes = async () => {
    const res = await api.get("/cities").catch(err => {
      alert(err.message);
      window.location.reload(false);
    });

    const options = [];

    for (var i = 0; i < res.data.length; i++) {
      let value = res.data[i].nome;
      let label = res.data[i].nome;

      options.push({ value, label });
    }

    this.setState({ options: options });
  };

  //Fim Métodos CRUD

  onChange = ev => {
    const state = Object.assign({}, this.state);
    const campo = ev.target.name;
    const value = ev.target.value;

    state[campo] = value;

    this.setState(state);
  };

  onChangeRadio = ({ target }) => {
    const state = Object.assign({}, this.state);

    const campo = target.name;

    state[campo] = !state[campo];

    this.setState(state);
  };

  handleCidadesRelacionadas = cidadesRelacionadas => {
    this.setState({ cidadesRelacionadas });
  };

  handleCidadeTrajetoInit = cidadeTrajetoInit => {
    this.setState({ cidadeTrajetoInit });
  };

  handleCidadeTrajetoEnd = cidadeTrajetoEnd => {
    this.setState({ cidadeTrajetoEnd });
  };

  validations = state => {
    let cidadeError = "";
    let prestadorError = "";
    let diasEmbarqueError = "";
    let horasEmbarqueError = "";
    let telefoneError = "";
    let emailError = "";

    if (
      !state.nomeCidade ||
      !state.nomePrestador ||
      !state.diasEmbarque ||
      !state.horasEmbarque ||
      !state.telefone ||
      !state.email
    ) {
      cidadeError = "Por favor, preencha todos os campos";
      alert(cidadeError);
      return false;
    }

    if (
      state.nomeCidade.includes("_") ||
      state.nomeCidade.includes("@") ||
      state.nomeCidade.includes("-")
    ) {
      cidadeError = "Cidade não pode conter caracteres especiais";
    }

    if (
      state.nomePrestador.includes("_") ||
      state.nomePrestador.includes("@") ||
      state.nomePrestador.includes("-")
    ) {
      prestadorError = "Prestador não pode conter caracteres especiais";
    }

    if (state.diasEmbarque.includes("@")) {
      diasEmbarqueError =
        "Informe o dia da semana no formato correspondente (Ex. quarta-feira)";
    }

    if (!state.horasEmbarque.includes(":")) {
      horasEmbarqueError = "Informe as horas no formato correspondente (00:00)";
    }

    if (
      state.telefone.includes("_") ||
      state.telefone.includes("@") ||
      state.telefone.includes("-")
    ) {
      telefoneError =
        "Informe o telefone no formato correspondente ((ddd) 9xxxx-xxxx)";
    }

    if (!state.email.includes("@")) {
      emailError = "Informe um email válido";
    }

    if (cidadeError) {
      alert(cidadeError);
      return false;
    }

    if (prestadorError) {
      alert(prestadorError);
      return false;
    }

    if (diasEmbarqueError) {
      alert(diasEmbarqueError);
      return false;
    }

    if (horasEmbarqueError) {
      alert(horasEmbarqueError);
      return false;
    }

    if (telefoneError) {
      alert(telefoneError);
      return false;
    }

    if (emailError) {
      alert(emailError);
      return false;
    }

    return true;
  };

  getRange = state => {
    this.setState({ initDataCheia: state.from, endDataCheia: state.to });
  };

  switchInterdicao = () => {
    this.setState(prevState => ({
      interdicaoTrecho: !prevState.interdicaoTrecho
    }));
  };

  render() {
    return (
      <div className="body">
        <Menu />
        <div className="cadastro">
          <HeaderCidade op={"Cidade"}/>
          <form>
            <div className="cadastro-cidade">
              <h2>Escolha a Cidade</h2>
              <div className="escolha-cidade">
                <input
                  type="text"
                  id="text"
                  name="nomeCidade"
                  onChange={this.onChange}
                ></input>
                <div>
                  <input
                    type="radio"
                    id="option"
                    name="opCidadeBase"
                    value="cidadeBase"
                    onChange={this.onChangeRadio}
                    onClick={this.onChangeRadio}
                    checked={this.state.opCidadeBase}
                  />
                  Cidade Base
                  <br />
                  <input
                    type="radio"
                    id="option"
                    name="opCidadeAuditada"
                    value="cidadeAuditada"
                    onChange={this.onChangeRadio}
                    onClick={this.onChangeRadio}
                    checked={this.state.opCidadeAuditada}
                  />
                  Cidade Auditada
                </div>
              </div>

              <div className="cidade-relacionada">
                <h2>Adicionar cidades relacionadas entre si e cidades base</h2>
                <Select
                  className="select"
                  closeMenuOnSelect={false}
                  placeholder=""
                  components={animatedComponents}
                  isMulti
                  options={this.state.options}
                  name="cidadesRelacionadas"
                  onChange={this.handleCidadesRelacionadas}
                />
              </div>

              <h2>Adicionar data de feriado ou datas comemorativas da cidade</h2>
              <div className="RangeExample">
                <Calendar
                  name={"feriado"}
                  getRange={this.getRange.bind(this)}
                />
              </div>

              <h2>Adicionar período de cheias de rios</h2>
              <div className="RangeExample">
                  <Calendar
                    name={"enchente"}
                    getRange={this.getRange.bind(this)}
                  />
              </div>

              <div className="interdicao">
                <div className="interdicao-switch">
                  <h2>Interdição de trecho</h2>
                  <label className="switch">
                    <input type="checkbox" onChange={this.switchInterdicao} />
                    <span className="slider round"></span>
                  </label>
                  <img src={Notif} alt="" />
                </div>
                <legend>Observação</legend>
                <textarea
                  name="obsInterdicao"
                  onChange={this.onChange}
                  disabled={!this.state.interdicaoTrecho}
                ></textarea>
              </div>

              <div className="obs-cidade">
                <h2>Observação sobre a cidade</h2>
                <legend>Selecione o tipo de observação</legend>
                <textarea name="obsCidade" onChange={this.onChange}></textarea>
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
