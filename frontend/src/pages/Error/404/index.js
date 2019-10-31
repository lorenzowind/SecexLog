import React, { Component } from "react";

import SecexLogo from "../../../assets/404/fluxoSECEXv2.png";

import "./styles.css";

export default class Error404 extends Component {
  render() {
    return (
      <div className="body">
        <img src={SecexLogo} alt="" className="fluxoSECEXv2" />

        <h1 className="Erro-404">Erro 404!</h1>

        <h2 className="Pgina-no-encontrada">Página não encontrada.</h2>
      </div>
    );
  }
}
