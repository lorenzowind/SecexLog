import React from "react";
import "./styles.css";

import Img from "../../../../../assets/6_Cadastro_de_Cidade_Trejetos/cadastro.png";

const Header = () => (
  <div className="header_feriado">
    <img src={Img} alt="" />
    <header id="main-header">Cadastro de Feriado</header>
  </div>
);

export default Header;
