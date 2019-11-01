import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import CrudCidade from "./pages/CRUD/Cidade/index";
import CrudUser from "./pages/CRUD/Usuario/index";
import Menu from "./components/Menu/MenuLateral";
import TelaInicial from "./pages/ConsultaManual/TelaInicial/index";
import Error404 from "./pages/Error/404/index";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={TelaInicial} />
      <Route path="/menu" component={Menu} />
      <Route exact path="/cadastro/cidade" component={CrudCidade} />
      <Route exact path="/cadastro/user" component={CrudUser} />
      <Route path="*" component={Error404} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
