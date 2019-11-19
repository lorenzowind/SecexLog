import React, { Component } from "react";

import Menu from "../../components/Menu/MenuLateral/index";
import Loading from "../../components/Loading/index";

export default class Dashboard extends Component {
  state = {
    load: false
  };

  wait = () => {
    setTimeout(() => this.setState({ load: true }), 3000);
    return <Loading />;
  };

  render() {
    return (
      <div>
        {!this.state.load ? this.wait() : <div></div>}
        <Menu />
      </div>
    );
  }
}
