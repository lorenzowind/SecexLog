import React, { Component } from "react";

import CrudCidade from "./Visualização/Cidade/index";
import CrudUsuario from "./Visualização/Usuario_antigo/index";
import CrudFeriado from "./Visualização/Feriado/index";
import CrudPrestador from "./Visualização/Prestador/index";
import CrudModal from "./Visualização/Modal/index";
import CrudTrajeto from "./Visualização/Trajeto/index";

import Menu from "../../components/Menu/MenuLateral/index";

// import { Container } from './styles';

export default class CRUD extends Component {
  state;

  render() {
    return (
      <div>
        <Menu />
        <CrudUsuario />
        <CrudCidade />
        <CrudFeriado />
        <CrudModal />
        <CrudTrajeto />
        <CrudPrestador />
      </div>
    );
  }
}
