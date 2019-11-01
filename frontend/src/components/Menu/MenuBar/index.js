import React from "react";
import { Redirect } from "react-router";

import tce_logo from "../../../assets/ConsultaManual/tce_logo.png";
import TelaOpiniao from "../TelaOpiniao/index";
import TelaLogin from "../TelaLogin/index";
import TelaEsqueceuSenha from "../TelaEsqueceuSenha/index";

import "./styles.css";

export default class Header extends React.Component {
  state = {
    logout: false,
    text: "Login"
  };

  evento_login = () => {
    if (localStorage.getItem("login") !== "in") {
      localStorage.setItem("login", "out");
      console.log(localStorage.getItem("login"));
      var el = document.getElementsByClassName("tela-login");
      el[0].style.display = "block";
    } else {
      this.setState({ logout: true });
    }
  };

  evento_opiniao() {
    var el = document.getElementsByClassName("tela-opiniao");
    el[0].style.display = "block";
  }

  render() {
    if (localStorage.getItem("login") === "in") this.state.text = "Logout";

    if (this.state.logout) {
      alert("Logout com sucesso");
      return <Redirect to="/" push={true} />;
    }

    return (
      <div className="header_menu">
        <div className="de-sua-opiniao">
          <h1 id="de_sua_opiniao" onClick={this.evento_opiniao}>
            Dê sua Opinião
          </h1>
        </div>

        <div className="login">
          <h1 id="login" onClick={this.evento_login}>
            {this.state.text}
          </h1>
        </div>

        <div className="logo_tce">
          <img src={tce_logo} alt="" />
        </div>

        <TelaOpiniao />
        <TelaLogin />
        <TelaEsqueceuSenha />
      </div>
    );
  }
}
