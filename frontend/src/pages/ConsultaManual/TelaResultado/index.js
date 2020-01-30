import React from "react";
import { Redirect } from "react-router";

import Menu from "../../../components/Menu/MenuLateral/index";
import Loading from "../../../components/Loading/index";

import idaIcone from "../../../assets/3_Resultado_da_Consulta/ir2.png";
import voltaIcone from "../../../assets/3_Resultado_da_Consulta/ir-1.png";

import rapidoIcone from "../../../assets/3_Resultado_da_Consulta/run1.png";
import rapidoIconeHover from "../../../assets/3_Resultado_da_Consulta/run_2.png";

import custoIcone from "../../../assets/3_Resultado_da_Consulta/PREÇO.png";
import custoIconeHover from "../../../assets/3_Resultado_da_Consulta/PREÇO1.png";

import seguroIcone from "../../../assets/3_Resultado_da_Consulta/SEGURANÇA.png";
import seguroIconeHover from "../../../assets/3_Resultado_da_Consulta/SEGURANÇA_color.png";

import filtroIcone from "../../../assets/3_Resultado_da_Consulta/filtro.png";
import barraIcone from "../../../assets/3_Resultado_da_Consulta/Componente 34 – 1.png";
import barraIcone2 from "../../../assets/3_Resultado_da_Consulta/Componente 48 – 1.png";
import botaoSelecionar from "../../../assets/3_Resultado_da_Consulta/Componente 40 – 1.png";
import botaoSelecionarHover from "../../../assets/3_Resultado_da_Consulta/Componente 39 – 1.png";

import api from "../../../services/api";

import "./styles.css";

var key = 0;

export default class Tela_resultado extends React.Component {
  constructor(props) {
    super(props);
    if (!this.props.location.state) {
      window.location.replace("/");
    }
    this.state = {
      matriz: this.props.location.state.matriz_trajetos,
      load: false,
      trajetos: [],
      modalIcone: null,
      back: false,

      index: 0
    };
  }

  componentDidMount = () => {
    this.loadPathData();
    this.testState();
  };

  testState = () => {
    const { trajetos, matriz } = this.state;

    console.log(JSON.stringify(matriz.trajetos));
    console.log(trajetos);
  };

  loadPathData = async () => {
    this.setState({ load: false });
    setTimeout(async () => {
      await api
        .post("/search", this.state.matriz.trajetos)
        .then(res => {
          console.log(res.data);
          this.setState({ trajetos: res.data, load: true });
          // this.validation();
        })
        .catch(err => {
          console.log(err);
        });
    }, 1200);
  };

  usefullDays = (init, end) => {
    let curYear = new Date().getFullYear();
    init = new Date(
      init.substr(3, 2) + "/" + init.substr(0, 2) + "/" + curYear
    );
    end = new Date(end.substr(3, 2) + "/" + end.substr(0, 2) + "/" + curYear);

    let sum = 0;

    while (init.getDate() !== end.getDate()) {
      if (init.getDay() === 6 || init.getDay() === 0) {
        sum = sum;
      } else {
        sum++;
      }
      init.setDate(init.getDate() + 1);
    }

    return sum - 1;
  };

  back = () => {
    this.setState({ back: true });
  };

  handleNext = () => {
    let { index, trajetos } = this.state;

    console.log(trajetos.length < 2 || index >= 4);

    this.setState({ index: ++index });
  };

  handlePrev = () => {
    let { index } = this.state;

    this.setState({ index: --index });
  };

  render() {
    const { back, trajetos, index } = this.state;

    console.log(trajetos);

    if (back) return <Redirect to="/" />;

    if (this.state.load === true) {
      return (
        <div className="tela-resultado">
          <div className="linha-1">
            <div className="voltar" onClick={this.back}>
              <img src={voltaIcone} alt="" />
            </div>
            <div style={{ margin: "0 auto" }}>
              <div className="resultado">
                <h1>Escolha o modal para o trecho</h1>
              </div>
              <div className="barra">
                <img src={barraIcone} alt="" />
              </div>
            </div>
          </div>
          <div className="tela-resultado_">
            <div className="trajeto">
              <div className="trajeto_">
                <div className="linha-2">
                  <div className="filtros">
                    <div className="rapidoIcone">
                      <img
                        src={rapidoIcone}
                        alt=""
                        onClick={e =>
                          e.currentTarget.src === rapidoIconeHover
                            ? (e.currentTarget.src = rapidoIcone)
                            : (e.currentTarget.src = rapidoIconeHover)
                        }
                      />
                    </div>
                    <div className="custoIcone">
                      <img
                        src={custoIcone}
                        alt=""
                        onClick={e =>
                          e.currentTarget.src === custoIconeHover
                            ? (e.currentTarget.src = custoIcone)
                            : (e.currentTarget.src = custoIconeHover)
                        }
                      />
                    </div>
                    <div className="seguroIcone">
                      <img
                        src={seguroIcone}
                        alt=""
                        onClick={e =>
                          e.currentTarget.src ===
                          "http://localhost:3000/static/media/SEGURAN%C3%87A_color.fee7eb48.png"
                            ? (e.currentTarget.src = seguroIcone)
                            : (e.currentTarget.src = seguroIconeHover)
                        }
                      />
                    </div>
                  </div>
                  <div className="cidades">
                    <button
                      type="button"
                      disabled={index <= 0 ? true : false}
                      onClick={this.handlePrev}
                    >
                      <img src={voltaIcone} alt="" />
                    </button>
                    <div className="cidadeIda">
                      <h1>{trajetos[index].cityDeparture}</h1>
                    </div>
                    <div className="cidadeVolta">
                      <h1>{trajetos[index].cityRegress}</h1>
                    </div>
                    <button
                      type="button"
                      disabled={trajetos.length < 2 || index >= 4}
                      onClick={this.handleNext}
                    >
                      <img src={voltaIcone} alt="" id="flipped" />
                    </button>
                  </div>
                  <div className="periodo">
                    <div className="data">
                      <h1>
                        {trajetos[index].dateDeparture} -{" "}
                        {trajetos[index].dateRegress}
                      </h1>
                    </div>
                  </div>
                  <div className="filtro">
                    <img src={filtroIcone} alt="" />
                  </div>
                </div>
                {trajetos[index].paths.length > 0 ? (
                  trajetos[index].paths.map((c, index) => (
                    <div key={index}>
                      <div className="cartao_trajeto">
                        <div className="travelData" style={{ margin: "auto" }}>
                          {/* {c.paths.map((t, i) => ( */}
                          <div className="resultIda">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >
                              <div className="resultSaida">
                                <div className="horario">
                                  <h1 style={{ width: "200px" }}>
                                    {c.going.departure.time},{" "}
                                    {c.going.departure.day.substr(0, 3)}
                                  </h1>
                                </div>
                                <div className="cidade purple">
                                  <h1>{c.going.departure.city}</h1>
                                </div>
                                <div className="modal purple">
                                  <h1>{c.going.departure.modal}</h1>
                                </div>
                              </div>
                              <div className="resultCenter">
                                <div className="duracao">
                                  <h1>{c.going.mileage} Km</h1>
                                </div>
                                <div className="barraIcone2">
                                  <img src={barraIcone2} alt="" />
                                </div>
                              </div>
                              <div className="resultDestino">
                                <div className="horario">
                                  <h1 style={{ width: "200px" }}>
                                    {c.going.arrival.time},{" "}
                                    {c.going.arrival.day.substr(0, 3)}
                                  </h1>
                                </div>
                                <div className="cidade">
                                  <h1 id="purple">{c.going.arrival.city}</h1>
                                </div>
                                <div className="modal">
                                  <h1 id="purple">{c.going.arrival.modal}</h1>
                                </div>
                              </div>
                              <div className="idaVoltaIcon">
                                <img src={idaIcone} alt="" />
                              </div>
                            </div>
                          </div>
                          {/* ))} */}

                          {/* {c.paths.map((c, i) => ( */}
                          <div className="resultVolta">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >
                              <div className="resultSaida">
                                <div className="horario">
                                  <h1 style={{ width: "200px" }}>
                                    {c.back.departure.time},{" "}
                                    {c.back.departure.day.substr(0, 3)}
                                  </h1>
                                </div>
                                <div className="cidade">
                                  <h1>{c.back.departure.city}</h1>
                                </div>
                                <div className="modal">
                                  <h1>{c.back.departure.modal}</h1>
                                </div>
                              </div>
                              <div className="resultCenter">
                                <div className="duracao">
                                  <h1>{c.back.mileage} Km</h1>
                                </div>
                                <div className="barraIcone2">
                                  <img src={barraIcone2} alt="" />
                                </div>
                              </div>
                              <div className="resultDestino">
                                <div className="horario">
                                  <h1 style={{ width: "200px" }}>
                                    {c.back.arrival.time},{" "}
                                    {c.back.arrival.day.substr(0, 3)}
                                  </h1>
                                </div>
                                <div className="cidade purple">
                                  <h1>{c.back.arrival.city}</h1>
                                </div>
                                <div className="modal purple">
                                  <h1>{c.back.arrival.modal}</h1>
                                </div>
                              </div>
                              <div className="idaVoltaIcon">
                                <img src={voltaIcone} alt="" />
                              </div>
                            </div>
                          </div>
                          {/* ))} */}

                          <div className="travelDuration">
                            <h1>
                              Saída: {c.going.date} - Retorno: {c.back.date}{" "}
                            </h1>
                          </div>
                          <div className="warrings">
                            {trajetos[index].warnings.map((t, i) => (
                              <h1 key={i}>{t}</h1>
                            ))}
                          </div>
                        </div>
                        <hr className="vertical" />

                        <div style={{ margin: "0 auto", textAlign: "center" }}>
                          <div className="preco">
                            <h1>R$ {c.totalCost}</h1>
                          </div>
                          <div className="tempoViagem">
                            <h1>
                              {this.usefullDays(c.going.date, c.back.date)} dias
                              úteis
                            </h1>
                          </div>
                          <div className="selecionar">
                            <img
                              id="button"
                              src={botaoSelecionar}
                              alt="selecionar"
                              onMouseOver={e =>
                                (e.currentTarget.src = botaoSelecionarHover)
                              }
                              onMouseOut={e =>
                                (e.currentTarget.src = botaoSelecionar)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="msg">
                    <h1>Nenhum trajeto encontrado</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}