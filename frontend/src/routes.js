import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import CrudCidade from "./pages/CRUD/Cidade/index";
import CrudUser from "./pages/CRUD/Usuario/index";
import TelaInicial from "./pages/ConsultaManual/TelaInicial/index";
import MenuLateral from "./components/Menu/MenuLateral/index";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={TelaInicial} />
      <Route path="/menu" component={MenuLateral} />
      <Route path="/cadastro/cidade" component={CrudCidade} />
      <Route path="/cadastro/user" component={CrudUser} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
