import React from "react";

import Img from "../../../../../assets/6_Cadastro_de_Cidade_Trejetos/cadastro.png";

import "./styles.css";

const Header = () => (
  <div className="headerModal">
    <img src={Img} alt="" />
    <header id="main-header">Cadastro de Modal</header>
  </div>
);

export default Header;