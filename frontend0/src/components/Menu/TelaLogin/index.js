import React from "react";
import { Redirect } from "react-router";
import ReactLoading from "react-loading";

import icone_sair from "../../../assets/ConsultaManual/icone_sair_menor.png";

import "./styles.css";

import api from "../../../services/api";

export default class Tela_login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      done: true
    };
  }

  evento_sair() {
    var el_1 = document.getElementsByClassName("tela-login");
    var el_2 = document.getElementsByClassName("erro");
    var el_3 = document.getElementsByClassName("tela-esqueceu-senha");
    el_1[0].style.display = "none";
    el_2[0].style.display = "none";
    el_3[0].style.display = "none";
  }

  evento_validarLogin = async ev => {
    ev.preventDefault();

    this.setState({ done: false });

    var usuario = document.getElementsByClassName("usuario");
    var senha = document.getElementsByClassName("senha");
    var el = document.getElementsByClassName("erro");
    var tela = document.getElementsByClassName("tela-login");

    const state = {
      login: usuario[0].firstChild.value,
      senha: senha[0].firstChild.value
    };
    await setTimeout(() => {
      api
        .post("/login", state)
        .then(post => {
          if (post) {
            el[0].style.display = "none";
            tela[0].style.display = "none";
            let token_exp = new Date();
            token_exp.setSeconds(new Date().getUTCSeconds() + 86400);
            localStorage.setItem("token", post.data.token);
            localStorage.setItem("token_exp", token_exp);
            this.setState({ login: true, done: true });
          }
        })
        .catch(err => {
          el[0].style.display = "block";
          this.setState({ done: true });
        });
    }, 1200);
  };

  evento_esqueceu_senha() {
    var el_1 = document.getElementsByClassName("tela-esqueceu-senha");
    el_1[0].style.display = "block";
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.evento_validarLogin(event);
    }
  }

  render() {
    const { login } = this.state;

    if (login) {
      return <Redirect to="/" push={true} />;
    }

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
          <input 
            type="password" 
            name="senha" 
            id="password" 
            onKeyDown={this.handleKeyDown}
          />
        </div>

        <div style={{ display: "flex" }}>
          <div className="esqueceu_senha">
            <h1 id="esqueceu_senha" onClick={this.evento_esqueceu_senha}>
              Esqueceu sua senha?
            </h1>
          </div>

          <div className="botao_login">
            <input
              type="button"
              name="login"
              id="login"
              onClick={this.evento_validarLogin}
            />
          </div>
          {!this.state.done ? (
            <div className="loadingSpin">
              <ReactLoading
                type={"spin"}
                color={"#292eec"}
                height={15}
                width={15}
              />
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}