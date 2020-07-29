import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Menu from "../../components/Menu/MenuLateral/index";
import Loading from "../../components/Loading/index";

import PlaneImg from "../../assets/5_Dashboard/aviao.png";
import FTaxiImg from "../../assets/5_Dashboard/taxi_aereo.png";
import BoatImg from "../../assets/5_Dashboard/barco.png";
import MBoatImg from "../../assets/5_Dashboard/ajato.png";
import FBoatImg from "../../assets/5_Dashboard/voadeira.png";
import SBoatImg from "../../assets/5_Dashboard/rabeta.png";

import "./styles.css";
import api from "../../services/api";

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const PurpleBorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 7,
    marginBottom: 10,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#292eec",
  },
}))(LinearProgressWithLabel);

const PinkBorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 7,
    marginBottom: 10,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#8800ff",
  },
}))(LinearProgressWithLabel);

const GreenBorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 7,
    marginBottom: 10,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#6ae8e5",
  },
}))(LinearProgressWithLabel);

const BlackBorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 7,
    marginBottom: 10,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#00003a",
  },
}))(LinearProgressWithLabel);

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalCount: 0,
      modals: {
        airplanes: 0,
        boats: 0,
        motorboats: 0,
        rabetas: 0,
        taxis: 0,
        voadeiras: 0,
      },
      feedback: {
        cities: [],
        system: [],
      },

      load: true,
    };
  }

  componentDidMount() {
    this.setState({ load: false });

    setTimeout(() => {
      api.get("/dashboard").then(({ data }) => {
        const { modals } = data;
        const { feedbacks } = data;
        this.setState({
          modalCount: modals.count,
          modals: modals.types,

          feedback: feedbacks,

          load: true,
        });
      });
    }, 1200);
  }

  wait = () => {
    setTimeout(() => this.setState({ load: true }), 3000);
    return <Loading />;
  };
  render() {
    const { modalCount, modals, feedback } = this.state;

    const plane = modals.airplanes / modalCount;
    const boat = modals.boats / modalCount;
    const voadeira = modals.voadeiras / modalCount;
    const rabeta = modals.rabetas / modalCount;

    return this.state.load ? (
      <div className="dashboard">
        <div>
          <Menu ativo={true} />
        </div>

        <div className="center">
          <div>
            <div className="row">
              <div className="modal plane">
                <img src={PlaneImg} alt="" height="50px" />
                <p className="counter">{modals.airplanes}</p>
                <p>Avião</p>
              </div>
              <div className="modal flying-taxi">
                <img src={FTaxiImg} alt="" height="50px" />
                <p className="counter">{modals.taxis}</p>

                <p>Taxi Aéreo</p>
              </div>
              <div className="modal boat">
                <img src={BoatImg} alt="" />
                <p className="counter">{modals.boats}</p>

                <p>Barco</p>
              </div>
              <div className="modal motorboat">
                <img src={MBoatImg} alt="" />
                <p className="counter">{modals.motorboats}</p>

                <p>Lancha a jato</p>
              </div>
              <div className="modal flying-boat">
                <img src={FBoatImg} alt="" />
                <p className="counter">{modals.voadeiras}</p>

                <p>Voadeira</p>
              </div>
              <div className="modal speed-boat">
                <img src={SBoatImg} alt="" />
                <p className="counter">{modals.rabetas}</p>

                <p>Rabeta</p>
              </div>
            </div>

            <div className="row">
              <div className="column">
                <div className="feedback city" style={{ marginTop: "20px" }}>
                  <div className="title">
                    <h3>Feedback</h3>
                  </div>

                  <h3 style={{ color: "#8800ff" }}>Cidades</h3>

                  <div className="content">
                    {feedback.cities.length > 0 ? (
                      feedback.cities.map((content, index) => {
                        if (index < 3) {
                          return (
                            <p key={index}>
                              <strong>{content.nome}</strong> -{" "}
                              {content.obsCidade !== ""
                                ? content.obsCidade
                                : content.obsInterdicao}
                            </p>
                          );
                        } else return <p key={index} />;
                      })
                    ) : (
                      <p>Nenhum feedback</p>
                    )}
                  </div>
                </div>

                <div className="feedback system">
                  <div className="title">
                    <h3>Feedback</h3>
                  </div>

                  <h3 style={{ color: "#6ae8e5" }}>Sistema</h3>

                  <div className="content">
                    {feedback.system.length > 0 ? (
                      <p> "{feedback.system[0]}"</p>
                    ) : (
                      <p>Nenhum feedback</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="percentage">
                  <div className="content">
                    <div className="progressP">
                      <PurpleBorderLinearProgress value={plane} />
                      Avião
                    </div>
                    <div className="progressP">
                      <PinkBorderLinearProgress value={rabeta} />
                      Rabeta
                    </div>
                    <div className="progressP">
                      <GreenBorderLinearProgress value={voadeira} />
                      Voadeira
                    </div>
                    <div className="progressP">
                      <BlackBorderLinearProgress value={boat} />
                      Barco
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Loading />
    );
  }
}
