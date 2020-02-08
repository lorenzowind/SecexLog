import React, { Component } from "react";
import { saveAs } from "file-saver";

import Menu from "../../../components/Menu/MainMenu/index";

import voltaIcone from "../../../assets/3_Resultado_da_Consulta/ir-1.png";
import Bar from "../../../assets/4_Detalhes_do_Trecho/Componente 50 – 1.png";
import Calendar from "../../../assets/4_Detalhes_do_Trecho/cal.png";
import Endings from "../../../assets/4_Detalhes_do_Trecho/Elipse 152.png";
import Impressora from "../../../assets/4_Detalhes_do_Trecho/impressora.png";
import Email from "../../../assets/4_Detalhes_do_Trecho/email2.png";
import Map from "../../../assets/2_Tela_de_Consulta_Manual/MAPA.png";

import api from "../../../services/api";

import "./styles.css";
import ReactToPrint from "react-to-print";
import Loading from "../../../components/Loading/index";

export default class TelaDetalhes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitudeDeparture: "",
      longitudeDeparture: "",
      latitudeArrival: "",
      longitudeArrival: "",
      load: false
    };
  }

  componentDidMount() {
    this.loadLatLng();
  }

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
    if (hrA.length != 5 || hrB.length != 5) return "00:00";

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
    novo_m = temp.toString().length == 2 ? temp : "0" + temp;

    temp = hora1 - hora2 - nova_h;
    while (temp < 0) {
      temp = temp + 24;
    }
    nova_h = temp.toString().length == 2 ? temp : "0" + temp;

    return nova_h + ":" + novo_m;
  };

  back = () => {
    window.history.back();
  };

  printPDF = async () => {
    const { trajetos, id } = this.props.location.state;

    await api.post("/create-pdf", trajetos[id]).then(() => {
      api.get("/fetch-pdf", { responseType: "blob" }).then(res => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "detalhesTrecho.pdf");
      });
    });
  };

  render() {
    const { id, pathId, trajetos } = this.props.location.state;
    const paths = trajetos[id].paths[pathId];

    const lngDep = Math.abs(parseFloat(this.state.longitudeDeparture)) * 10;
    const latDep = Math.abs(parseFloat(this.state.latitudeDeparture)) * 10;
    const lngArr = Math.abs(parseFloat(this.state.longitudeArrival)) * 10;
    const latArr = Math.abs(parseFloat(this.state.latitudeArrival)) * 10;

    const departureMarkerStyle = {
      marginLeft: 410 - lngDep + "px",
      marginTop: latDep * 4.25 + 120 + "px",
      width: "10px",
      height: "10px",
      position: "absolute"
    };

    const arrivalMarkerStyle = {
      marginLeft: 410 - lngArr + "px",
      marginTop: latArr * 4.25 + 120 + "px",
      width: "10px",
      height: "10px",
      position: "absolute"
    };

    console.log(departureMarkerStyle);
    console.log(arrivalMarkerStyle);

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
                  <img src={Email} alt="" />
                  <img src={Impressora} alt="" onClick={this.printPDF} />
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
      </div>
    );
  }
}
