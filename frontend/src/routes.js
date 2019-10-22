import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import CrudCidade from "./pages/CRUD/Cidade/index";
import CrudUser from "./pages/CRUD/Usuario/index";
import TelaInicial from "./pages/ConsultaManual/TelaInicial/index";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={TelaInicial} />
      <Route exact path="/cadastro/cidade" component={CrudCidade} />
      <Route exact path="/cadastro/user" component={CrudUser} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
