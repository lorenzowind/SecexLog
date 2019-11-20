import React from "react";
import "./styles.css";

import Img from "../../../../../assets/6_Cadastro_de_Cidade_Trejetos/cadastro.png";

export default class HeaderOp extends React.Component {
  render() {
    return(
      <div className="header_op">
        <img src={Img} alt="" />
        <header id="main-header">Cadastro de {this.props.op}</header>
     </div>    
    )
  }
}