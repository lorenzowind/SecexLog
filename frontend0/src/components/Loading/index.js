import React, { Component } from "react";

import LoadingGIF from "../../assets/secex.gif";

import "./styles.css";

export default class Loading extends Component {
  render() {
    return <img src={LoadingGIF} alt="Loading..." className="loading" />;
  }
}
