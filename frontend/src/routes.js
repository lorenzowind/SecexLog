import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import CrudCidade from "./pages/CRUD/Cidade/index";
import CrudUser from "./pages/CRUD/Usuario/index";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/cadastro/cidade" component={CrudCidade} />
      <Route path="/cadastro/user" component={CrudUser} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
