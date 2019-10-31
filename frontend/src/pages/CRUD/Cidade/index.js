import React, { Component } from "react";
import HeaderCidade from "../components/HeaderCidade/index";
import HeaderTrajeto from "../components/HeaderTrajeto/index";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Expand from "react-expand-animated";
import Menu from "../../../components/Menu/MenuLateral/index";
import MenuBar from "../../../components/Menu/MenuBar/index";
import Calendar from "../components/Calendar/Calendar";
import api from "../../../services/api";

import "./styles.css";

import Ir from "../../../assets/6_Cadastro_de_Cidade_Trejetos/ir.png";
import Mais from "../../../assets/6_Cadastro_de_Cidade_Trejetos/mais.png";
import Notif from "../../../assets/6_Cadastro_de_Cidade_Trejetos/sino2.png";
import Triangulo from "../../../assets/6_Cadastro_de_Cidade_Trejetos/triangulo.png";

const animatedComponents = makeAnimated();

let options = null;

export default class CrudCidade extends Component {
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
      nomeFeriado: "",
      initDataFeriado: "",
      endDataFeriado: "",
      obsInterdicao: "",
      obsCidade: "",
      cidadeTrajetoInit: "",
      cidadeTrajetoEnd: "",
      opAviao: false,
      opTaxiAereo: false,
      opBarco: false,
      opVoadeira: false,
      opRabeta: false,
      opMotoTaxi: false,
      opTaxi: false,
      opOnibus: false,
      opLancha: false,
      opModal: null,
      nomePrestador: "",
      diasEmbarque: [],
      horasEmbarque: [],
      duracaoTrecho: "",
      kmTrecho: "",
      valorTrecho: "",
      localEmbarque: "",
      localDesembarque: "",
      telefone: "",
      email: "",

      dia: "",
      hora: "",
      itemArray: [],

      interdicaoTrecho: false,

      openaviao: false,
      opentaxiaereo: false,
      openbarco: false,
      openvoadeira: false,
      openrabeta: false,
      openmototaxi: false,
      opentaxi: false,
      openonibus: false,
      openlancha: false
    };
  }

  componentDidMount() {
    this.loadModais();
  }

  componentWillMount() {
    this.loadOpcoes();
  }

  //Métodos CRUD

  //POST (Create)
  onSubmit = async ev => {
    ev.preventDefault();
    var dias = null;
    var horas = null;

    if (this.state.diasEmbarque.length === 0) {
      dias = this.state.dia;
    } else {
      const dia = this.state.dia;
      dias = this.state.diasEmbarque;
      if (dia) {
        dias.push({ dia });
      }
    }

    if (this.state.horasEmbarque.length === 0) {
      horas = this.state.hora;
    } else {
      const hora = this.state.hora;
      horas = this.state.horasEmbarque;
      if (hora) {
        horas.push({ hora });
      }
    }

    let cidadesRelacionadas = this.state.cidadesRelacionadas;
    let cidades = [];

    if (cidadesRelacionadas) {
      const length = cidadesRelacionadas.length;

      for (var k = 0; k < length; k++) {
        cidades[k] = cidadesRelacionadas[k].label;
      }
    }

    const stateTrajeto = {
      cidadesRelacionadas: cidades,
      initCidade: this.state.cidadeTrajetoInit.value,
      endCidade: this.state.cidadeTrajetoEnd.value,
      opAviao: this.state.opAviao,
      opTaxiAereo: this.state.opTaxiAereo,
      opBarco: this.state.opBarco,
      opVoadeira: this.state.opVoadeira,
      opRabeta: this.state.opRabeta,
      opMotoTaxi: this.state.opMotoTaxi,
      opTaxi: this.state.opTaxi,
      opOnibus: this.state.opOnibus,
      opLancha: this.state.opLancha,
      diasEmbarque: dias,
      horasEmbarque: horas,
      duration: this.state.duracaoTrecho,
      quilometragem: this.state.kmTrecho,
      valor: this.state.valorTrecho,
      embarque: this.state.localEmbarque,
      desembarque: this.state.localDesembarque,
      modal: this.state.opModal
    };

    const statePrestador = {
      prestNome: this.state.nomePrestador,
      telefone: this.state.telefone,
      email: this.state.email
    };

    const stateCidade = {
      nome: this.state.nomeCidade,
      cBase: this.state.opCidadeBase,
      cAuditada: this.state.opCidadeAuditada,
      initDataCheia: this.state.initDataCheia.toString(),
      endDataCheia: this.state.endDataCheia.toString(),
      initDataFeriado: this.state.initDataFeriado.toString(),
      endDataFeriado: this.state.endDataFeriado.toString(),
      nomeFeriado: this.state.nomeFeriado,
      obsInterdicao: this.state.obsInterdicao,
      obsCidade: this.state.obsCidade
    };

    /*const resCidade = await api.post("/cities", stateCidade).catch(err => {
      alert("Verifque se todos os dados estão inseridos corretamente");
    });*/

    //if (resCidade) {
    /*const resTrajeto = await api.post("/path", stateTrajeto).catch(err => {
      alert("Verifque se todos os dados estão inseridos corretamente");
    });*/

    //if (resTrajeto) {
    const resPrestador = await api
      .post("/providers", statePrestador)
      .catch(err => {
        alert("Verifque se todos os dados estão inseridos corretamente");
      });

    //if(resPrestador){
    //window.location.reload(false);
    //}
    //}
    //}

    console.log(statePrestador);
  };

  //GET (Read)
  loadOpcoes = async () => {
    /*const res = await api.get("/cities").catch(err => {
      alert(err.message);
      window.location.reload(false);
    });*/

    //console.log(res.data);

    options = [
      { value: "tefe", label: "Tefé" },
      { value: "itacoatiara", label: "Itacoatiara" },
      { value: "presidente figueiredo", label: "Presidente Figueiredo" }
    ];
  };

  loadModais = async () => {
    /*const res = await api.get("").catch(err => {
      alert(err);
      window.location.reload(false);
    }); */
  };

  loadPrestador = async nome => {
    console.log(nome);
    const res = await api.get(`/providers`);

    console.log("Resposta = " + res);
  };

  //Fim Métodos CRUD

  onChange = ev => {
    const state = Object.assign({}, this.state);
    const campo = ev.target.name;
    const value = ev.target.value;

    if (campo === "nomePrestador") {
      this.loadPrestador(value);
    }

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

  addMoreOptions = ev => {
    ev.preventDefault();
    const item = this.state.itemArray;
    const dia = this.state.dia;
    const hora = this.state.hora;
    const dias = this.state.diasEmbarque;
    const horas = this.state.horasEmbarque;
    const text = dia + ", " + hora;

    console.log(dias);
    console.log(horas);

    item.push({ text });
    dias.push({ dia });
    horas.push({ hora });

    console.log(this.state.diasEmbarque);

    this.state.diasEmbarque === []
      ? console.log("objeto")
      : console.log("string");

    this.setState({
      dia: "",
      hora: "",
      itemArray: item
    });
    console.log(this.state.diasEmbarque);
  };

  toggle = ev => {
    ev.preventDefault();
    const name = ev.target.name;

    if (name === "aviao")
      this.setState(prevState => ({ openaviao: !prevState.openaviao }));
    else if (name === "taxiaereo")
      this.setState(prevState => ({ opentaxiaereo: !prevState.opentaxiaereo }));
    else if (name === "barco")
      this.setState(prevState => ({ openbarco: !prevState.openbarco }));
    else if (name === "voadeira")
      this.setState(prevState => ({ openvoadeira: !prevState.openvoadeira }));
    else if (name === "rabeta")
      this.setState(prevState => ({ openrabeta: !prevState.openrabeta }));
    else if (name === "mototaxi")
      this.setState(prevState => ({ openmototaxi: !prevState.openmototaxi }));
    else if (name === "taxi")
      this.setState(prevState => ({ opentaxi: !prevState.opentaxi }));
    else if (name === "onibus")
      this.setState(prevState => ({ openonibus: !prevState.openonibus }));
    else if (name === "lancha")
      this.setState(prevState => ({ openlancha: !prevState.openlancha }));
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

  getRange = (state, name) => {
    if (name === "feriado") {
      var nome = "";

      while (nome === "") {
        nome = prompt("Informe o nome do feriado:");
      }

      this.setState({
        initDataFeriado: state.from,
        endDataFeriado: state.to,
        nomeFeriado: nome
      });
    } else if (name === "enchente") {
      this.setState({ initDataCheia: state.from, endDataCheia: state.to });
    }
  };

  switchInterdicao = ev => {
    this.setState(prevState => ({
      interdicaoTrecho: !prevState.interdicaoTrecho
    }));
  };

  render() {
    const expandedDivStyle = {
      width: "100%",
      height: "200px",
      overflowY: "scroll"
    };

    return (
      <div className="body">
        <div className="Menu">
          <Menu />
          <MenuBar />
        </div>

        <div className="cadastro">
          <HeaderCidade />
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
                  options={options}
                  name="cidadesRelacionadas"
                  onChange={this.handleCidadesRelacionadas}
                />
              </div>

              <div className="holiday">
                <h2>
                  Adicionar data de feriado ou datas comemorativas da cidade
                </h2>
                <div className="RangeExample">
                  <Calendar
                    name={"feriado"}
                    getRange={this.getRange.bind(this)}
                  />
                </div>
              </div>

              <div className="flood">
                <h2>Adicionar período de cheias de rios</h2>
                <div className="RangeExample">
                  <Calendar
                    name={"enchente"}
                    getRange={this.getRange.bind(this)}
                  />
                </div>
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
            </div>

            <div className="cadastro-trajeto">
              <HeaderTrajeto />

              <h2 id="h2-cidade">Adicionar cidades do trajeto</h2>
              <div className="cidade-trajeto">
                <Select
                  options={options}
                  isSearchable={true}
                  className="selectCidade"
                  placeholder=""
                  onChange={this.handleCidadeTrajetoInit}
                />
                <img src={Ir} alt="" />
                <Select
                  options={options}
                  isSearchable={true}
                  className="selectCidade"
                  placeholder=""
                  onChange={this.handleCidadeTrajetoEnd}
                />
              </div>

              <h2>Escolha os tipos de Modais para este trajeto</h2>
              <div className="opcoes modais">
                <input
                  type="radio"
                  id="option"
                  name="opAviao"
                  value="aviao"
                  onChange={this.onChangeRadio}
                  onClick={this.onChangeRadio}
                  checked={this.state.opAviao}
                ></input>
                Aviao
                <br />
                <input
                  type="radio"
                  id="option"
                  name="opTaxiAereo"
                  value="taxi-aereo"
                  onChange={this.onChangeRadio}
                  onClick={this.onChangeRadio}
                  checked={this.state.opTaxiAereo}
                ></input>
                Taxi-Aereo
                <br />
                <input
                  type="radio"
                  id="option"
                  name="opBarco"
                  value="barco"
                  onChange={this.onChangeRadio}
                  onClick={this.onChangeRadio}
                  checked={this.state.opBarco}
                ></input>
                Barco
                <br />
                <input
                  type="radio"
                  id="option"
                  name="opVoadeira"
                  value="voadeira"
                  onChange={this.onChangeRadio}
                  onClick={this.onChangeRadio}
                  checked={this.state.opVoadeira}
                ></input>
                Voadeira
                <br />
                <input
                  type="radio"
                  id="option"
                  name="opRabeta"
                  value="rabeta"
                  onChange={this.onChangeRadio}
                  onClick={this.onChangeRadio}
                  checked={this.state.opRabeta}
                ></input>
                Rabeta
                <br />
                <input
                  type="radio"
                  id="option"
                  name="opMotoTaxi"
                  value="moto-taxi"
                  onChange={this.onChangeRadio}
                  onClick={this.onChangeRadio}
                  checked={this.state.opMotoTaxi}
                ></input>
                Moto-Taxi
                <br />
                <input
                  type="radio"
                  id="option"
                  name="opTaxi"
                  value="taxi"
                  onChange={this.onChangeRadio}
                  onClick={this.onChangeRadio}
                  checked={this.state.opTaxi}
                ></input>
                Taxi (Carro)
                <br />
                <input
                  type="radio"
                  id="option"
                  name="opOnibus"
                  value="onibus"
                  onChange={this.onChangeRadio}
                  onClick={this.onChangeRadio}
                  checked={this.state.opOnibus}
                ></input>
                Onibus
                <br />
                <input
                  type="radio"
                  id="option"
                  name="opLancha"
                  value="lancha"
                  onChange={this.onChangeRadio}
                  onClick={this.onChangeRadio}
                  checked={this.state.opLancha}
                ></input>
                Lancha a jato
              </div>

              <div className="expandedDiv">
                <div className="taxi-aereo">
                  <img
                    name="taxiaereo"
                    src={Triangulo}
                    alt=""
                    onClick={this.toggle}
                  />
                  <button name="taxiaereo" onClick={this.toggle}>
                    Taxi-Aéreo
                  </button>
                  <Expand open={this.state.opentaxiaereo}>
                    <div style={expandedDivStyle}>Hello</div>
                  </Expand>
                </div>

                <div className="barco">
                  <img
                    name="barco"
                    src={Triangulo}
                    alt=""
                    onClick={this.toggle}
                  />
                  <button name="barco" onClick={this.toggle}>
                    Barco
                  </button>
                  <Expand open={this.state.openbarco}>
                    <div style={expandedDivStyle}>Hello</div>
                  </Expand>
                </div>

                <div className="taxi">
                  <img
                    name="taxi"
                    src={Triangulo}
                    alt=""
                    onClick={this.toggle}
                  />
                  <button name="taxi" onClick={this.toggle}>
                    Taxi (Carro)
                  </button>
                  <Expand open={this.state.opentaxi}>
                    <div style={expandedDivStyle}>Hello</div>
                  </Expand>
                </div>

                <div className="onibus">
                  <img
                    name="onibus"
                    src={Triangulo}
                    alt=""
                    onClick={this.toggle}
                  />
                  <button name="onibus" onClick={this.toggle}>
                    Ônibus
                  </button>
                  <Expand open={this.state.openonibus}>
                    <div style={expandedDivStyle}>Hello</div>
                  </Expand>
                </div>

                <div className="lancha">
                  <img
                    name="lancha"
                    src={Triangulo}
                    alt=""
                    onClick={this.toggle}
                  />
                  <button name="lancha" onClick={this.toggle}>
                    Lancha a jato
                  </button>
                  <Expand open={this.state.openlancha}>
                    <div style={expandedDivStyle}>Hello</div>
                  </Expand>
                </div>

                <div className="aviao">
                  <img
                    name="aviao"
                    src={Triangulo}
                    alt=""
                    onClick={this.toggle}
                  />
                  <button name="aviao" onClick={this.toggle}>
                    Avião
                  </button>
                  <Expand open={this.state.openaviao}>
                    <div style={expandedDivStyle}>Hello</div>
                  </Expand>
                </div>

                <div className="rabeta">
                  <img
                    name="rabeta"
                    src={Triangulo}
                    alt=""
                    onClick={this.toggle}
                  />
                  <button name="rabeta" onClick={this.toggle}>
                    Rabeta
                  </button>
                  <Expand open={this.state.openrabeta}>
                    <div style={expandedDivStyle}>Hello</div>
                  </Expand>
                </div>

                <div className="moto-taxi">
                  <img
                    name="mototaxi"
                    src={Triangulo}
                    alt=""
                    onClick={this.toggle}
                  />
                  <button name="mototaxi" onClick={this.toggle}>
                    Moto-Taxi
                  </button>
                  <Expand open={this.state.openmototaxi}>
                    <div style={expandedDivStyle}>Hello</div>
                  </Expand>
                </div>

                <div className="voadeira">
                  <img
                    name="voadeira"
                    src={Triangulo}
                    alt=""
                    onClick={this.toggle}
                  />
                  <button name="voadeira" onClick={this.toggle}>
                    Voadeira
                  </button>
                  <Expand open={this.state.openvoadeira}>
                    <div style={expandedDivStyle}>Hello</div>
                  </Expand>
                </div>
              </div>

              <h2>Nome do Prestador de Serviço</h2>
              <input
                type="text"
                id="text"
                name="nomePrestador"
                onChange={this.onChange}
              />

              <h2 id="h2-dia-hora">Dia e hora de embarque</h2>
              <div className="dia-hora">
                <input
                  type="text"
                  id="dia"
                  name="dia"
                  value={this.state.dia}
                  onChange={this.onChange}
                />
                <input
                  type="text"
                  id="hora"
                  name="hora"
                  value={this.state.hora}
                  onChange={this.onChange}
                />
                <button onClick={this.addMoreOptions}>
                  <img src={Mais} alt="+" />
                </button>
              </div>

              <div>
                {this.state.itemArray.map((item, index) => {
                  return (
                    <div className="box" key={index}>
                      <div>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="dados-trecho">
                <div>
                  <h2>Duração do trecho</h2>
                  <input
                    type="text"
                    name="duracaoTrecho"
                    onChange={this.onChange}
                  />
                </div>

                <div>
                  <h2>Quilometragem (Km)</h2>
                  <input
                    type="number"
                    name="kmTrecho"
                    onChange={this.onChange}
                  />
                </div>

                <div>
                  <h2>Valor do trecho</h2>
                  <input
                    type="number"
                    name="valorTrecho"
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <h2>Local de embarque</h2>
              <input
                type="text"
                id="text"
                name="localEmbarque"
                onChange={this.onChange}
              />

              <h2>Local de desembarque</h2>
              <input
                type="text"
                id="text"
                name="localDesembarque"
                onChange={this.onChange}
              />

              <div className="dados-prestador">
                <div>
                  <h2>Telefone</h2>
                  <input
                    type="text"
                    id="cell"
                    name="telefone"
                    onChange={this.onChange}
                  />
                </div>

                <div>
                  <h2>E-mail</h2>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <h2>O modal é:</h2>
              <div className="opcao-modal">
                <input
                  type="radio"
                  id="option"
                  name="opModal"
                  value="linha"
                  onChange={this.onChange}
                />
                Linha
                <br />
                <input
                  type="radio"
                  id="option1"
                  name="opModal"
                  value="contratado"
                  onChange={this.onChange}
                />
                Contratado
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
