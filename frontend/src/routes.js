import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import TelaInicial from "./pages/ConsultaManual/TelaInicial/index";
import MenuLateral from "./pages/Menu/MenuLateral/index";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/secex" component={TelaInicial}/>
      <Route path="/menu" component={MenuLateral}/>
    </Switch>
  </BrowserRouter>
);

export default Routes;
