import React from "react";

import icone_sair from "../../../assets/ConsultaManual/icone_sair_menor.png";

import "./styles.css";

export default class Tela_login extends React.Component {
  evento_sair() {
    var el_1 = document.getElementsByClassName("tela-login");
    var el_2 = document.getElementsByClassName("erro");
    el_1[0].style.display = "none";
    el_2[0].style.display = "none";
  }

  evento_validarLogin() {
    var usuario = document.getElementsByClassName("usuario");
    var senha = document.getElementsByClassName("senha");
    var el = document.getElementsByClassName("erro");

    //usuario admin teste
    //- usuario: admin
    //- senha: 123

    if (
      usuario[0].firstChild.value !== "admin" ||
      senha[0].firstChild.value !== "123"
    ) {
      el[0].style.display = "block";
    } else {
      el[0].style.display = "none";
      alert("Login com sucesso");
    }
  }

  render() {
    return (
      <div className="tela-login">
        <div className="erro">
          <h1 id="erro">Login ou senha incorreta!</h1>
        </div>

        <div className="icone_sair_login">
          <img src={icone_sair} alt="" onClick={this.evento_sair} />
        </div>

        <div className="usuario">
          <input type="text" name="usuario" />
        </div>

        <div className="senha">
          <input type="password" name="senha" />
        </div>

        <div className="esqueceu-senha">
          <h1 id="esqueceu-senha">Esqueceu sua senha?</h1>
        </div>

        <div className="botao_login">
          <input
            type="button"
            name="login"
            onClick={this.evento_validarLogin}
          />
        </div>
      </div>
    );
  }
}
