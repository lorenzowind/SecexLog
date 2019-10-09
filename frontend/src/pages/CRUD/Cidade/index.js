import React, { Component } from "react";
import Header from "../Header/index";
import Calendar from "./Calendar/Calendar";

import "./styles.css";

export default class CrudCidade extends Component {
  render() {
    return (
      <div className="cadastro">
        <Header />
        <div className="body">
          <form>
            <h2>Escolha a Cidade</h2>
            <div className="escolha-cidade">
              <input type="text" id="text" name="cidade"></input>
              <div>
                <input type="radio" id="option" name="tipoCidade"></input>
                Cidade Base
                <br />
                <input type="radio" id="option" name="tipoCidade"></input>
                Cidade Auditada
              </div>
            </div>

            <div className="cidade-relacionada">
              <h2>Adicionar cidades relacionadas entre si e cidades base</h2>
              <input id="text"></input>
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
              </div>
              <legend>Observação</legend>
              <textarea name="obs-interdicao"></textarea>
            </div>

            <div className="obs-cidade">
              <h2>Observação sobre a cidade</h2>
              <legend>Selecione o tipo de observação</legend>
              <textarea></textarea>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
