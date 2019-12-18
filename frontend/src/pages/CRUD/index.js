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
    return { loading: false, userRow: [], citieRow: [], holidayRow: [] };
  }

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    this.getUsers();
    this.getCities();
  };

  getUsers = async () => {
    this.setState({ loading: false });
    await setTimeout(() => {
      api
        .get("/users")
        .then(res => {
          const row = this.state.userRow;

          for (var i = 0; i < res.data.length; i++) {
            row.push(res.data[i]);
          }

          this.setState({ loading: true, userRow: row });
        })
        .catch(err => {
          if (err.message === "Request failed with status code 401") {
            alert("Nível de acesso negado! Contate o administrador do sistema");
            window.location.replace("/menu");
          } else {
            alert(err);
            window.location.replace("/");
          }
        });
    }, 1200);
  };

  getCities = async () => {
    this.setState({ loading: false });

    await setTimeout(() => {
      api
        .get("/cities")
        .then(res => {
          this.setState({ loading: true, citieRow: res.data });
        })
        .catch(err => {
          alert(err);
          window.location.reload();
        });
    }, 1200);
  };

  getModals = async () => {};

  getProviders = async () => {};

  getPaths = async () => {};

  render() {
    const state = this.state;

    return this.state.loading ? (
      <div>
        <Menu ativo={false} />
        <CrudUsuario users={state.userRow} />
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
