import React from "react";
import { Redirect } from 'react-router';

import icone_sair from "../../../assets/ConsultaManual/icone_sair_menor.png";
 
import "./styles.css";

import api from "../../../services/api";

export default class Tela_login extends React.Component {

  state = {
    login: false
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

    var usuario = document.getElementsByClassName("usuario");
    var senha = document.getElementsByClassName("senha");
    var el = document.getElementsByClassName("erro");
    var tela = document.getElementsByClassName("tela-login");

    const state = {
      login: usuario[0].firstChild.value,
      senha: senha[0].firstChild.value
    };

    const post = await api.post("/login", state).catch(err => {
      el[0].style.display = "block";
    });

    if(post){
      el[0].style.display = "none";
      tela[0].style.display = "none";
      localStorage.setItem('token', post.data.token);
      localStorage.setItem('login', 'in');
      alert('Login com sucesso');
      this.setState({ login: true });
    }
  }

  evento_esqueceu_senha() {
    var el_1 = document.getElementsByClassName("tela-esqueceu-senha");
    el_1[0].style.display = "block";
  }

  render() {

    const { login } = this.state

    if(login) {
      return <Redirect to="/menu" push={true}/>
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
          <input type="password" name="senha" />
        </div>

        <div className="esqueceu_senha">
          <h1 id="esqueceu_senha" onClick={this.evento_esqueceu_senha}>Esqueceu sua senha?</h1>
        </div>

        <div className="botao_login">
          <input type="button" name="login" onClick={this.evento_validarLogin}/>
        </div>

      </div>
    );
  }
}