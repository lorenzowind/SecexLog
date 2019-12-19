import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoutes from "./privateRoutes";

import Menu from "../pages/Dashboard/index";
import TelaInicial from "../pages/ConsultaManual/TelaInicial/index";
import TelaResultado from "../pages/ConsultaManual/TelaResultado/index";
import Error404 from "../pages/Error/404/index";
import View from "../pages/CRUD/index";

import CrudCidade from "../pages/CRUD/Cadastro/Cidade/index";
import CrudFeriado from "../pages/CRUD/Cadastro/Feriado/index";
import CrudModal from "../pages/CRUD/Cadastro/Modal/index";
import CrudPrestador from "../pages/CRUD/Cadastro/Prestador/index";
import CrudTrajeto from "../pages/CRUD/Cadastro/Trajeto/index";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoutes exact path="/" component={Menu} />

      <PrivateRoutes exact path="/cadastro" component={View} />
      <PrivateRoutes
        exact
        path="/cadastro/cidade/create"
        component={CrudCidade}
      />
      <PrivateRoutes
        exact
        path="/cadastro/feriado/create"
        component={CrudFeriado}
      />
      <PrivateRoutes
        exact
        path="/cadastro/modal/create"
        component={CrudModal}
      />
      <PrivateRoutes
        exact
        path="/cadastro/prestador/create"
        component={CrudPrestador}
      />
      <PrivateRoutes
        exact
        path="/cadastro/trajeto/create"
        component={CrudTrajeto}
      />

      <Route exact path="/menu" component={TelaInicial} />
      <Route exact path="/consulta-manual" component={TelaResultado} />
      <Route path="*" component={Error404} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
