import React, { Component } from "react";

import CrudCidade from "./Visualização/Cidade/index";
import CrudUser from "./Visualização/Usuario/index";
import CrudFeriado from "./Visualização/Feriado/index";
import CrudPrestador from "./Visualização/Prestador/index";
import CrudModal from "./Visualização/Modal/index";

import Menu from "../../components/Menu/MenuLateral/index";

// import { Container } from './styles';

export default class CRUD extends Component {
  state;

  render() {
    return (
      <div>
        <Menu />
        <CrudUser />
        <CrudCidade />
        <CrudFeriado />
        <CrudPrestador />
        <CrudModal />
      </div>
    );
  }
}
