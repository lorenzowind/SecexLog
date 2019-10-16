import React, { Component } from "react";
import HeaderCidade from "../components/HeaderCidade/index";
import HeaderTrajeto from "../components/HeaderTrajeto/index";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Calendar from "../components/Calendar/Calendar";
import "moment/locale/pt-br";

import "react-day-picker/lib/style.css";
import "./styles.css";

import "moment/locale/pt-br";

import "./styles.css";

import Ir from "../../../assets/6_Cadastro_de_Cidade_Trejetos/ir.png";
import Mais from "../../../assets/6_Cadastro_de_Cidade_Trejetos/mais.png";
//import Triangulo from "../../../assets/6_Cadastro_de_Cidade_Trejetos/poligono.png";

const animatedComponents = makeAnimated();

const options = [
  { value: "tefe", label: "Tefé" },
  { value: "itacoatiara", label: "Itacoatiara" },
  { value: "presidente figueiredo", label: "Presidente Figueiredo" }
];

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
      dataFeriado: {},
      initDataCheia: undefined,
      endDataCheia: undefined,
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
      from: undefined,
      to: undefined,

      dia: "",
      hora: "",
      itemArray: []
    };
  }

  onChange = ev => {
    const state = Object.assign({}, this.state);
    const campo = ev.target.name;

    state[campo] = ev.target.value;

    console.log(state[campo]);

    this.setState(state);
  };

  onChangeRadio = ({ target }) => {
    const state = Object.assign({}, this.state);

    const campo = target.name;

    state[campo] = !state[campo];
    console.log(campo);
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

    item.push({ text });
    dias.push({ dia });
    horas.push({ hora });

    this.setState({
      diasEmbarque: dias,
      horasEmbarque: horas,
      dia: "",
      hora: "",
      itemArray: item
    });
    console.log(this.state.diasEmbarque);
  };

  onSubmit = ev => {
    ev.preventDefault();
    console.log(JSON.parse(JSON.stringify(this.state)));
  };

  render() {
    return (
      <div className="body">
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
                  <Calendar />
                </div>
              </div>

              <div className="flood">
                <h2>Adicionar período de cheias de rios</h2>
                <div className="RangeExample">
                  <Calendar />
                </div>
              </div>

              <div className="interdicao">
                <div className="interdicao-switch">
                  <h2>Interdição de trecho</h2>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                  <img src={""} alt="" />
                </div>
                <legend>Observação</legend>
                <textarea
                  name="obsInterdicao"
                  onChange={this.onChange}
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
                  onChange={this.handleCidadeTrajetoInit}
                />
                <img src={Ir} alt="" />
                <Select
                  options={options}
                  isSearchable={true}
                  className="selectCidade"
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

              <div className="taxi-aereo"></div>
              <div className="barco"></div>
              <div className="taxi"></div>
              <div className="onibus"></div>
              <div className="lancha"></div>
              <div className="aviao"></div>
              <div className="rabeta"></div>
              <div className="moto-taxi"></div>
              <div className="voadeira"></div>

              <h2>Nome do Prestador de Servico</h2>
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

              <div className="showDiaHora"></div>

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
                  name="opcao-modal"
                  value="linha"
                  onChange={this.onChange}
                />
                Linha
                <br />
                <input
                  type="radio"
                  id="option"
                  name="opcao-modal"
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
