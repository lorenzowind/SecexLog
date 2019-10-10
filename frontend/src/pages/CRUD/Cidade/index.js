import React, { Component } from "react";
import HeaderCidade from "../components/HeaderCidade/index";
import HeaderTrajeto from "../components/HeaderTrajeto/index";
import Calendar from "../components/Calendar/Calendar";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import "./styles.css";

import Ir from "../../../assets/6_Cadastro_de_Cidade_Trejetos/ir.png";
import Mais from "../../../assets/6_Cadastro_de_Cidade_Trejetos/mais.png";
//import Triangulo from "../../../assets/6_Cadastro_de_Cidade_Trejetos/poligono.png";

const animatedComponents = makeAnimated();

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

export default class CrudCidade extends Component {
  render() {
    return (
      <div className="body">
        <div className="cadastro">
          <HeaderCidade />
          <form>
            <div className="cadastro-cidade">
              <h2>Escolha a Cidade</h2>
              <div className="escolha-cidade">
                <input type="text" id="text" name="cidade"></input>
                <div>
                  <input type="radio" id="option" name="op-base" value="base" />
                  Cidade Base
                  <br />
                  <input
                    type="radio"
                    id="option"
                    name="op-auditada"
                    value="auditada"
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
                />
              </div>

              <div className="holiday">
                <h2>
                  Adicionar data de feriado ou datas comemorativas da cidade
                </h2>
                <Calendar />
              </div>

              <div className="flood">
                <h2>Adicionar período de cheias de rios</h2>
                <Calendar />
              </div>

              <div className="interdicao">
                <div className="interdicao-switch">
                  <h2>Interdição de trecho</h2>
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                  <img src={""} alt="" />
                </div>
                <legend>Observação</legend>
                <textarea name="obs-interdicao"></textarea>
              </div>

              <div className="obs-cidade">
                <h2>Observação sobre a cidade</h2>
                <legend>Selecione o tipo de observação</legend>
                <textarea></textarea>
              </div>
            </div>

            <div className="cadastro-trajeto">
              <HeaderTrajeto />

              <h2 id="h2-cidade">Adicionar cidades do trajeto</h2>
              <div className="cidade-trajeto">
                <input type="text" name="cidadeSaida" id="cidade" />
                <img src={Ir} alt="" height="" />
                <input type="text" name="cidadeDestino" id="cidade" />
              </div>

              <h2>Escolha os tipos de Modais para este trajeto</h2>
              <div className="opcoes modais">
                <input
                  type="radio"
                  id="option"
                  name="aviao"
                  value="aviao"
                ></input>
                Aviao
                <br />
                <input
                  type="radio"
                  id="option"
                  name="taxi-aereo"
                  value="taxi-aereo"
                ></input>
                Taxi-Aereo
                <br />
                <input
                  type="radio"
                  id="option"
                  name="barco"
                  value="barco"
                ></input>
                Barco
                <br />
                <input
                  type="radio"
                  id="option"
                  name="voadeira"
                  value="voadeira"
                ></input>
                Voadeira
                <br />
                <input
                  type="radio"
                  id="option"
                  name="rabeta"
                  value="rabeta"
                ></input>
                Rabeta
                <br />
                <input
                  type="radio"
                  id="option"
                  name="moto-taxi"
                  value="moto-taxi"
                ></input>
                Moto-Taxi
                <br />
                <input
                  type="radio"
                  id="option"
                  name="taxi"
                  value="taxi"
                ></input>
                Taxi (Carro)
                <br />
                <input
                  type="radio"
                  id="option"
                  name="onibus"
                  value="onibus"
                ></input>
                Onibus
                <br />
                <input
                  type="radio"
                  id="option"
                  name="lancha"
                  value="lancha"
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
              <input type="text" id="text" />

              <h2 id="h2-dia-hora">Dia e hora de embarque</h2>
              <div className="dia-hora">
                <input type="text" id="dia" />
                <input type="text" id="hora" />
                <button onClick="">
                  <img src={Mais} alt="+" />
                </button>
              </div>

              <div className="showDiaHora"></div>

              <div className="dados-trecho">
                <div>
                  <h2>Duração do trecho</h2>
                  <input type="text" />
                </div>

                <div>
                  <h2>Quilometragem (Km)</h2>
                  <input type="number" />
                </div>

                <div>
                  <h2>Valor do trecho</h2>
                  <input type="number" />
                </div>
              </div>

              <h2>Local de embarque</h2>
              <input type="text" id="text" />

              <h2>Local de desembarque</h2>
              <input type="text" id="text" />

              <div className="dados-prestador">
                <div>
                  <h2>Telefone</h2>
                  <input type="text" id="cell" />
                </div>

                <div>
                  <h2>E-mail</h2>
                  <input type="email" id="email" />
                </div>
              </div>

              <h2>O modal é:</h2>
              <div className="opcao-modal">
                <input type="radio" id="option" name="opcao-modal" />
                Linha
                <br />
                <input type="radio" id="option" name="opcao-modal" />
                Contratado
              </div>

              <div className="footer">
                <button type="submit"></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
