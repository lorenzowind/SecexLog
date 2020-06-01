import React, { Component } from "react";

import Menu from "../../components/Menu/MenuLateral/index";
import Loading from "../../components/Loading/index";

import PlaneImg from "../../assets/5_Dashboard/aviao.png";
import FTaxiImg from "../../assets/5_Dashboard/taxi_aereo.png";
import BoatImg from "../../assets/5_Dashboard/barco.png";
import MBoatImg from "../../assets/5_Dashboard/ajato.png";
import FBoatImg from "../../assets/5_Dashboard/voadeira.png";
import SBoatImg from "../../assets/5_Dashboard/rabeta.png";

import AlertImg from "../../assets/5_Dashboard/sino3.png";

import "./styles.css";

export default class Dashboard extends Component {
  state = {
    load: true,
  };

  wait = () => {
    setTimeout(() => this.setState({ load: true }), 3000);
    return <Loading />;
  };

  render() {
    return this.state.load ? (
      <div className="dashboard">
        <div>
          <Menu ativo={true} />
        </div>

        <div className="center">
          <div>
            <div className="row">
              <div className="modal plane">
                <img src={PlaneImg} alt="" />
                <p className="counter">00</p>
                <p>Avião</p>
              </div>
              <div className="modal flying-taxi">
                <img src={FTaxiImg} alt="" />
                <p className="counter">00</p>

                <p>Taxi Aéreo</p>
              </div>
              <div className="modal boat">
                <img src={BoatImg} alt="" />
                <p className="counter">00</p>

                <p>Barco</p>
              </div>
              <div className="modal motorboat">
                <img
                  src={MBoatImg}
                  alt=""
                  style={{ minHeight: "70px", marginTop: "50px" }}
                />
                <p className="counter">00</p>

                <p>Lancha a jato</p>
              </div>
              <div className="modal flying-boat">
                <img
                  src={FBoatImg}
                  alt=""
                  style={{ minHeight: "70px", marginTop: "50px" }}
                />
                <p className="counter">00</p>

                <p>Voadeira</p>
              </div>
              <div className="modal speed-boat">
                <img
                  src={SBoatImg}
                  alt=""
                  style={{ minHeight: "70px", marginTop: "50px" }}
                />
                <p className="counter">00</p>

                <p>Rabeta</p>
              </div>
            </div>

            <div className="row">
              <div className="column">
                <div className="feedback city"></div>

                <div className="feedback system"></div>
              </div>

              <div className="column">
                <div className="percentage"></div>

                <div className="alert">
                  <div className="center">
                    <div className="row">
                      <img src={AlertImg} alt="" />
                      <p>
                        Você precisa atualizar Registro de Prestadores de
                        Serviços
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      this.wait()
    );
  }
}
