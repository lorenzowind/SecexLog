import React, { Component } from "react";

import CrudCidade from "./Visualização/Cidade/index";
import CrudUsuario from "./Visualização/Usuario/index";
import CrudFeriado from "./Visualização/Feriado/index";
import CrudPrestador from "./Visualização/Prestador/index";
import CrudModal from "./Visualização/Modal/index";
import CrudTrajeto from "./Visualização/Trajeto/index";

import Menu from "../../components/Menu/MenuLateral/index";

import api from "../../services/api";
import Loading from "../../components/Loading";

export default class CRUD extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return { loading: false, citieRow: [], holidayRow: [] };
  }

  componentDidMount() {
    this.getCities();
  }

  getCities = async () => {
    this.setState({ loading: false });

    await setTimeout(() => {
      api
        .get("/cities")
        .then(res => {
          console.log(res.data);
          this.setState({ loading: true, citieRow: res.data });
        })
        .catch(err => {
          alert(err);
          window.location.reload();
        });
    }, 1200);
  };

  render() {
    const state = this.state;

    return this.state.loading ? (
      <div>
        <Menu ativo={false} />
        <CrudUsuario />
        <CrudCidade cities={state.citieRow} />
        <CrudFeriado />
        <CrudModal />
        <CrudTrajeto />
        <CrudPrestador />
      </div>
    ) : (
      <Loading />
    );
  }
}
