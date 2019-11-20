import React, { Component } from "react";
import HeaderTrajeto from "../components/HeaderTrajeto/index";
import Menu from "../../../../components/Menu/MenuLateral/index";

import "./styles.css";

export default class Trajeto extends Component {
  render() {
    return (
      <div className="body">
        <Menu />
        <div className="cadastro">
          <HeaderTrajeto op={"Trajeto"} />
          <form>
            <div className="cadastro-trajeto"></div>
          </form>
        </div>
      </div>
    );
  }
}
