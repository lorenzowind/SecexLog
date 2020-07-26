import React, { Component } from "react";
import { saveAs } from "file-saver";
import ReactLoading from "react-loading";

import Menu from "../../../components/Menu/MainMenu/index";
import CitiesPositions from "../utils/CitiesPositions";

import X from "../../../assets/1_Tela_de_Consulta_Automática/sair_secex.png";
import voltaIcone from "../../../assets/3_Resultado_da_Consulta/ir-1.png";
import Bar from "../../../assets/4_Detalhes_do_Trecho/Componente 50 – 1.png";
import Calendar from "../../../assets/4_Detalhes_do_Trecho/cal.png";
import Endings from "../../../assets/4_Detalhes_do_Trecho/Elipse 152.png";
import Impressora from "../../../assets/4_Detalhes_do_Trecho/impressora.png";
import Email from "../../../assets/4_Detalhes_do_Trecho/email2.png";
import Map from "../../../assets/2_Tela_de_Consulta_Manual/MAPA.png";
import SendEmail from "../../../assets/4_Detalhes_do_Trecho/Componente 51 – 1.png";

import api from "../../../services/api";

import "./styles.css";

import Loading from "../../../components/Loading/index";

export default class TelaDetalhes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      latitudeDeparture: "",
      longitudeDeparture: "",
      latitudeArrival: "",
      longitudeArrival: "",
      load: false,
      done: true
    };
  }

  componentDidMount() {
    this.loadLatLng();
  }

  onChange = ev => {
    const state = Object.assign({}, this.state);
    const campo = ev.target.name;
    const value = ev.target.value;

    state[campo] = value;

    this.setState(state);
  };

  loadLatLng = async () => {
    const { id, pathId, trajetos } = this.props.location.state;
    const paths = trajetos[id].paths[pathId];

    const departureCity = paths.going.departure.city;
    const arrivalCity = paths.going.arrival.city;
    

    this.setState({ load: false });

    await setTimeout(() => {
      api
        .get("/cities")
        .then(res => {
          let latitudeDeparture;
          let longitudeDeparture;
          let latitudeArrival;
          let longitudeArrival;
          res.data.forEach((element, index) => {
            if (element.nome === departureCity) {
              latitudeDeparture = element.latitute;
              longitudeDeparture = element.longitude;
            }

            if (element.nome === arrivalCity) {
              latitudeArrival = element.latitute;
              longitudeArrival = element.longitude;
            }

            this.setState({
              latitudeArrival,
              longitudeArrival,
              latitudeDeparture,
              longitudeDeparture,
              load: true
            });
          });
        })
        .catch(err => {
          alert(err);
          window.location.reload();
        });
    }, 1200);
  };

  subtraiHora = (hrA, hrB) => {
    if (hrA.length !== 5 || hrB.length !== 5) return "00:00";

    let temp = 0;
    let nova_h = 0;
    let novo_m = 0;

    let hora1 = hrA.substr(0, 2) * 1;
    let hora2 = hrB.substr(0, 2) * 1;
    let minu1 = hrA.substr(3, 2) * 1;
    let minu2 = hrB.substr(3, 2) * 1;

    temp = minu1 - minu2;
    while (temp < 0) {
      nova_h++;
      temp = temp + 60;
    }
    novo_m = temp.toString().length === 2 ? temp : "0" + temp;

    temp = hora1 - hora2 - nova_h;
    while (temp < 0) {
      temp = temp + 24;
    }
    nova_h = temp.toString().length === 2 ? temp : "0" + temp;

    return nova_h + ":" + novo_m;
  };

  back = () => {
    window.history.back();
  };

  openPrintPopUp = () => {
    const popUp = document.getElementsByClassName("popUpImpressao");
    popUp[0].style.display = "block";
  };

  openEmailPopUp = () => {
    const popUp = document.getElementsByClassName("popUpEmail");
    popUp[0].style.display = "block";
  };

  printPDF = async () => {
    const { trajetos, id, pathId } = this.props.location.state;

    const state = {
      cityDeparture: trajetos[id].cityDeparture,
      dateDeparture: trajetos[id].dateDeparture,
      warnings: trajetos[id].warnings,
      cityRegress: trajetos[id].cityRegress,
      dateRegress: trajetos[id].dateRegress,
      going: trajetos[id].paths[pathId].going,
      back: trajetos[id].paths[pathId].back,
      duration: trajetos[id].duration
    };

    this.setState({ done: false });

    await setTimeout(() => {
      api
        .post("/create-pdf", state)
        .then(() => {
          api.get("/fetch-pdf", { responseType: "blob" }).then(res => {
            const pdfBlob = new Blob([res.data], { type: "application/pdf" });
            saveAs(pdfBlob, "detalhesTrecho.pdf");
            this.setState({ done: true });
            this.closePrintPopUp();
          });
        })
        .catch(err => {
          this.setState({ done: true });

          const ERROR = document.getElementsByClassName("popUpImpressaoErro");

          this.closePrintPopUp();

          ERROR[0].style.display = "block";
        });
    }, 1200);
  };

  sendEmail = async () => {
    const { trajetos, id, pathId } = this.props.location.state;

    const data = {
      cityDeparture: trajetos[id].cityDeparture,
      cityRegress: trajetos[id].cityRegress,
      totalCost: trajetos[id].paths[pathId].totalCost,
      totalMileage: trajetos[id].paths[pathId].totalMileage,
      warnings: trajetos[id].warnings,
      going: trajetos[id].paths[pathId].going,
      back: trajetos[id].paths[pathId].back,
    };

    this.setState({ done: false });

    await setTimeout(() => {
      api
        .post(`/create-pdf?email=${this.state.email}`, data)
        .then(() => {
          this.setState({ done: true });

          this.closeEmailPopUp();

          alert("O trajeto foi enviado para o seu e-mail. Verifique a caixa de entrada e a caixa de spam");
        })
        .catch(err => {
          this.setState({ done: true });

          const ERROR = document.getElementsByClassName("popUpEmailErro");

          this.closeEmailPopUp();

          ERROR[0].style.display = "block";
        });
    }, 1200);
  }

  closePrintPopUp = () => {
    const ERROR = document.getElementsByClassName("popUpImpressaoErro");
    const popUp = document.getElementsByClassName("popUpImpressao");
    popUp[0].style.display = "";
    ERROR[0].style.display = "";
  };

  closeEmailPopUp = () => {
    const ERROR = document.getElementsByClassName("popUpEmailErro");
    const popUp = document.getElementsByClassName("popUpEmail");
    popUp[0].style.display = "";
    ERROR[0].style.display = "";
  };

  confirmPrintPopUp = ev => {
    ev.preventDefault();

    this.printPDF();
  };

  handleKeyDown = ev => {
    if (ev.key === 'Enter') {
      this.sendEmail(ev);
    }
  }

  render() {
    const { id, pathId, trajetos } = this.props.location.state;
    const paths = trajetos[id].paths[pathId];

    const departureMarkerStyle = {
      marginLeft: CitiesPositions[paths.going.departure.city].left,
      marginTop: CitiesPositions[paths.going.departure.city].top,
      width: "10px",
      height: "10px",
      position: "absolute"
    };

    const arrivalMarkerStyle = {
      marginLeft: CitiesPositions[paths.going.arrival.city].left,
      marginTop: CitiesPositions[paths.going.arrival.city].top,
      width: "10px",
      height: "10px",
      position: "absolute"
    };

    if (!this.state.load) return <Loading />;

    return (
      <div className="detalhes">
        <Menu />
        <div className="container">
          <div className="lateralBar">
            <div className="header">
              <div className="voltar" onClick={this.back}>
                <img src={voltaIcone} alt="" />
              </div>
              <div className="content">
                <h1>Detalhes do Trecho</h1>
                <div className="img">
                  <img src={Bar} alt="" />
                </div>
              </div>
            </div>
            <div className="subHeader">
              <img src={Calendar} alt="" />
              <h3 id="text">Ida</h3>
              <h3 id="value">{trajetos[id].dateDeparture}</h3>
              <h3 id="text">Volta</h3>
              <h3 id="value">{trajetos[id].dateRegress}</h3>
            </div>
            <div className="card">
              <div className="title">
                <img src={Endings} alt="" />
                <img src={paths.going.modalImg} alt="" id="icons" />
                <h3>
                  {paths.going.departure.city} - {paths.going.arrival.city}
                </h3>
              </div>
              <div className="content">
                <div>
                  <h4>
                    <strong>{paths.going.departure.modal}</strong> -{" "}
                    {paths.going.provider}
                  </h4>
                  <div className="subContent">
                    <h2>{trajetos[id].dateDeparture}</h2>
                    <div>
                      <p>Saída {paths.going.departure.time}</p>
                      <p>Chegada {paths.going.arrival.time}</p>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", marginRight: "11%" }}>
                  <h2 id="timeComplement">
                    {this.subtraiHora(
                      paths.going.arrival.time,
                      paths.going.departure.time
                    )}
                  </h2>
                  <p id="timeComplement">h</p>
                </div>
              </div>
            </div>
            <div className="body">
              <div className="card">
                <div className="title">
                  <img src={Endings} alt="" />
                  <img src={paths.back.modalImg} alt="" id="icons" />
                  <h3>
                    {paths.back.departure.city} - {paths.back.arrival.city}
                  </h3>
                </div>
                <div className="content">
                  <div>
                    <h4>
                      <strong>{paths.back.departure.modal}</strong> -{" "}
                      {paths.back.provider}
                    </h4>
                    <div className="subContent">
                      <h2>{trajetos[id].dateRegress}</h2>
                      <div>
                        <p>Saída {paths.back.departure.time}</p>
                        <p>Chegada {paths.back.arrival.time}</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", marginRight: "11%" }}>
                    <h2 id="timeComplement">
                      {this.subtraiHora(
                        paths.back.arrival.time,
                        paths.back.departure.time
                      )}
                    </h2>
                    <p id="timeComplement">h</p>
                  </div>
                </div>
              </div>
            </div>
            <footer>
              <div className="content">
                <div className="warnings">
                  {trajetos[id].warnings.map((c, i) => (
                    <p key={i}>{c}</p>
                  ))}
                </div>
                <div className="buttons">
                  <img src={Email} alt="" onClick={this.openEmailPopUp} />
                  <img src={Impressora} alt="" onClick={this.openPrintPopUp} />
                </div>
              </div>
            </footer>
          </div>
          <div className="map">
            <img src={Map} alt="" id="mapaAmazonas" />
            <img
              src={Endings}
              alt=""
              title={paths.back.departure.city}
              style={departureMarkerStyle}
            />
            <img
              src={Endings}
              alt=""
              title={paths.back.arrival.city}
              style={arrivalMarkerStyle}
            />
          </div>
        </div>

        <div className="popUpImpressao">
          <header>
            <img src={X} alt="fechar" onClick={this.closePrintPopUp} />
          </header>
          <main>
            <h1>Deseja realizar a impressão do roteiro da viagem?</h1>
          </main>
          <footer>
            <button onClick={this.confirmPrintPopUp}>Sim</button>
            {!this.state.done ? (
              <div className="loadingSpin">
                <ReactLoading
                  type={"spin"}
                  color={"#292eec"}
                  height={15}
                  width={15}
                />
              </div>
            ) : (
              <div />
            )}
          </footer>
        </div>

        <div className="popUpImpressaoErro">
          <img src={X} alt="fechar" onClick={this.closePrintPopUp} />
          <h1>Erro ao imprimir</h1>
        </div>

        <div className="popUpEmail" id="popUpEmail">
          <header>
            <img 
              src={X} 
              alt="fechar" 
              onClick={this.closeEmailPopUp} 
              id="popUpEmailXButton"
            />
          </header>
          <main>
            <h1 id="popUpEmailText">
              Insira seu e-mail para receber o trajeto detalhado do trecho
            </h1>
            <div id="popUpEmailSend">
              <input 
                type="email"
                placeholder="nome@email.com.br"
                id="popUpEmailInput"
                name="email"
                onChange={this.onChange}
                onKeyDown={this.handleKeyDown}
                required
              />
              <img 
                src={SendEmail}
                alt="Enviar"
                title="Enviar e-mail"
                id="popUpEmailSendButton"
                onClick={this.sendEmail}
              />
              {!this.state.done ? (
                <div className="loadingSpin">
                  <ReactLoading
                    type={"spin"}
                    color={"#292eec"}
                    height={15}
                    width={15}
                  />
                </div>
              ) : (
                <div />
              )}
            </div>
          </main>
        </div>

        <div className="popUpEmailErro">
          <img src={X} alt="fechar" onClick={this.closeEmailPopUp} />
          <h1>Erro ao enviar o e-mail</h1>
        </div>
      </div>
    );
  }
}