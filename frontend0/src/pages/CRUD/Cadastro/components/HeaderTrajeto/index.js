import React from "react";

import Img from "../../../../../assets/6_Cadastro_de_Cidade_Trejetos/cadastro.png";

import "./styles.css";

const Header = () => (
  <div className="headerTrajeto">
    <img src={Img} alt="" />
    <header id="main-header">Cadastro de Trajeto</header>
  </div>
);

export default Header;
