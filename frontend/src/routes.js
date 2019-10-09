import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import CrudCidade from "./pages/CRUD/Cidade/index";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/cidade" component={CrudCidade} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
