import React, { Component } from "react";

import Menu from "../../components/Menu/MenuLateral/index";
import Loading from "../../components/Loading/index";

import dashboard_ from "../../assets/5_Dashboard/dashboard.PNG"

import './styles.css'

export default class Dashboard extends Component {
  state = {
    load: false
  };

  wait = () => {
    setTimeout(() => this.setState({ load: true }), 3000);
    return <Loading />;
  };

  render() {
    return( 
      <div className="dashboard">
        <div>{!this.state.load ? this.wait() : <Menu ativo={true} />}</div>
        <div className="center"><div className="image"><img src={dashboard_} alt=""/></div></div>
      </div>
    )
  }
}
