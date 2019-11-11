import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoutes from "./privateRoutes";

import CrudCidade from "../pages/CRUD/index";
import CadCidade from "../pages/CRUD/Cadastro/Cidade/index";

import CrudUser from "../pages/CRUD/Visualização/Usuario/index";

import CadFeriado from "../pages/CRUD/Cadastro/Feriado/index";

import Menu from "../pages/Dashboard/index";
import TelaInicial from "../pages/ConsultaManual/TelaInicial/index";
import Error404 from "../pages/Error/404/index";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={TelaInicial} />

      <PrivateRoutes exact path="/menu" component={Menu} />

      <PrivateRoutes exact path="/cadastro/cidade" component={CrudCidade} />
      <PrivateRoutes exact path="/cadastro/user" component={CrudUser} />

      <PrivateRoutes
        exact
        path="/cadastro/cidade/create"
        component={CadCidade}
      />
      <PrivateRoutes
        exact
        path="/cadastro/feriado/create"
        component={CadFeriado}
      />

      <Route path="*" component={Error404} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
