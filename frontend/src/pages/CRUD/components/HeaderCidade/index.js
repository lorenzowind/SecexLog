import React from "react";
import "./styles.css";

import Img from "../../../../assets/6_Cadastro_de_Cidade_Trejetos/cadastro.png";

const Header = () => (
  <div className="header">
    <img src={Img} alt="" />
    <header id="main-header">Cadastro</header>
  </div>
);

export default Header;
