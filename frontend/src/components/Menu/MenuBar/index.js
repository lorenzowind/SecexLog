import React from "react";

import tce_logo from "../../../assets/ConsultaManual/tce_logo.png";
import TelaOpiniao from "../TelaOpiniao/index";

import "./styles.css";

export default class Header extends React.Component {
  evento_login() {
    console.log("login");
    var el = document.getElementsByClassName("tela-login");
    el[0].style.display = "block";
  }

  evento_opiniao() {
    var el = document.getElementsByClassName("tela-opiniao");
    el[0].style.display = "block";
  }

  render() {
    return (
      <div className="headerTCE">
        <div className="de-sua-opiniao">
          <h1 id="de_sua_opiniao" onClick={this.evento_opiniao}>
            Dê sua Opinião
          </h1>
        </div>

        <div className="login">
          <h1 id="login" onClick={this.evento_login}>
            Login
          </h1>
        </div>

        <div className="logo_tce">
          <img src={tce_logo} alt="" />
        </div>

        <TelaOpiniao />
      </div>
    );
  }
}
