import React from "react";

import icone_sair from "../../../assets/ConsultaManual/icone_sair.png";

import "./styles.css";

import api from "../../../services/api";

export default class Tela_opiniao extends React.Component {
  evento_enviar = async ev => {
    ev.preventDefault();

    var el_1 = document.getElementById("assunto");
    var el_2 = document.getElementsByClassName("texto_opiniao");

    const state = {
      titulo: el_1.innerHTML,
      desc: el_2[0].firstChild.value
    };

    await api.post("/opinions", state).catch(err => {
      alert(err);
    });

    this.evento_sair();
  };

  evento_sair() {
    var el_1 = document.getElementsByClassName("tela-opiniao");
    var el_2 = document.getElementsByClassName("selecione_assunto");
    var el_3 = document.getElementsByClassName("texto_opiniao");
    var el_4 = document.getElementById("assunto");
    el_1[0].style.display = "none";
    el_2[0].style.display = "block";
    el_3[0].style.display = "none";
    el_4.innerHTML = "Selecione um assunto";
    el_3[0].firstChild.value = "";
  }

  evento_opiniao_assunto(assunto) {
    var el_1 = document.getElementById("assunto");
    var el_2 = document.getElementsByClassName("selecione_assunto");
    var el_3 = document.getElementsByClassName("texto_opiniao");
    el_1.innerHTML = assunto;
    el_2[0].style.display = "none";
    el_3[0].style.display = "block";
  }

  evento_selecionar() {
    var el_1 = document.getElementById("assunto");
    var el_2 = document.getElementsByClassName("selecione_assunto");
    var el_3 = document.getElementsByClassName("texto_opiniao");
    el_1.innerHTML = "Selecione um assunto";
    el_2[0].style.display = "block";
    el_3[0].style.display = "none";
    el_3[0].firstChild.value = "";
  }

  render() {
    return (
      <div className="tela-opiniao">
        <div className="icone_sair_opiniao">
          <img src={icone_sair} alt="" onClick={this.evento_sair} />
        </div>

        <div className="opiniao">
          <h1 id="opiniao">Dê sua Opinião!</h1>
        </div>

        <div className="assunto">
          <h1 id="assunto" onClick={this.evento_selecionar}>
            Selecione um assunto
          </h1>
        </div>

        <div className="selecione_assunto">
          <h1
            id="selecione_assunto"
            onClick={this.evento_opiniao_assunto.bind(this, "Trajetos")}
          >
            Trajetos
          </h1>
          <h1
            id="selecione_assunto"
            onClick={this.evento_opiniao_assunto.bind(
              this,
              "Prestador de serviços"
            )}
          >
            Prestador de serviços
          </h1>
          <h1
            id="selecione_assunto"
            onClick={this.evento_opiniao_assunto.bind(this, "Cidades")}
          >
            Cidades
          </h1>
          <h1
            id="selecione_assunto"
            onClick={this.evento_opiniao_assunto.bind(this, "Sistema")}
          >
            Sistema
          </h1>
        </div>

        <div className="texto_opiniao">
          <textarea id="opiniao" placeholder="Escreva sua opinião..." />
        </div>

        <div className="enviar">
          <input type="button" name="enviar" onClick={this.evento_enviar} />
        </div>
      </div>
    );
  }
}