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
      trajetos: this.props.location.state.testState,
      load: true,
      paths: null,
      modalIcone: null,
      back: false
    };
  }

  componentWillMount = () => {
    this.loadPathData();
    this.testState();
  };

  testState = () => {
    const { trajetos } = this.state;

    console.log(trajetos);
  };

  loadPathData = async () => {
    // this.setState({ load: false });
    // await setTimeout(() => {
    //   api
    //     .get("/paths")
    //     .then(res => {
    //       this.setState({ paths: res.data, load: true });
    //       this.validation();
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       alert(err.message);
    //       window.location.replace("/");
    //     });
    // }, 1200);
  };

  validation = () => {
    const aux = this.state.trajetos;

    console.log(aux);

    //ida
    for (var i = 0; i < this.state.trajetos.length; i++) {
      let dateDay = aux[i].dataIda.substr(0, 2),
        dateMonth = aux[i].dataIda.substr(3, 2),
        dateYear = aux[i].dataIda.substr(6, 4);

      const weekIda = dayWeek(
        new Date(dateYear + "/" + dateMonth + "/" + dateDay).getDay()
      );

      for (var j = 0; j < this.state.paths.length; j++) {
        if (
          aux[i].cidadeIda === this.state.paths[j].initCidade &&
          aux[i].cidadeVolta === this.state.paths[j].endCidade
        ) {
          for (var k = 0; k < this.state.paths[j].dia.length; k++) {
            if (weekIda === this.state.paths[j].dia[k]) {
              aux[i].exists = true;
              aux[i].price += this.state.paths[j].cost;
              aux[i].path_id.push(this.state.paths[j]);
            }
          }
        }
      }
    }

    //volta
    for (var i = 0; i < this.state.trajetos.length; i++) {
      let dateDay = aux[i].dataVolta.substr(0, 2),
        dateMonth = aux[i].dataVolta.substr(3, 2),
        dateYear = aux[i].dataVolta.substr(6, 4);

      const weekVolta = dayWeek(
        new Date(dateYear + "/" + dateMonth + "/" + dateDay).getDay()
      );

      for (var j = 0; j < this.state.paths.length; j++) {
        if (
          aux[i].cidadeIda === this.state.paths[j].endCidade &&
          aux[i].cidadeVolta === this.state.paths[j].initCidade
        ) {
          for (var k = 0; k < this.state.paths[j].dia.length; k++) {
            if (weekVolta === this.state.paths[j].dia[k]) {
              aux[i].exists = true;
              console.log(aux[i].price);
              aux[i].price += this.state.paths[j].cost;
              aux[i].path_id.push(this.state.paths[j]);
            }
          }
        }
      }
    }

    console.log(aux);

    this.setState({ trajetos: aux });
  };

  back = () => {
    this.setState({ back: true });
  };

  render() {
    const { back, trajetos } = this.state;

    if (back) return <Redirect to="/" />;

    if (this.state.load === true) {
      return (
        <div className="tela-resultado">
          <div>{!this.state.load ? this.wait() : <Menu ativo={false} />}</div>
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
                    <div className="cidadeIda">
                      {/* <h1>{i.cidadeIda}</h1> */}
                      <h1>{trajetos.cityIda}</h1>
                    </div>
                    <div className="cidadeVolta">
                      <h1>{trajetos.cityVolta}</h1>
                      {/* <h1>{i.cidadeVolta}</h1> */}
                    </div>
                  </div>
                  <div className="periodo">
                    <div className="data">
                      <h1>
                        {trajetos.dateIda} - {trajetos.dateVolta}
                      </h1>
                      {/* <h1>
                        {i.dataIda} - {i.dataVolta}
                      </h1> */}
                    </div>
                  </div>
                  <div className="filtro">
                    <img src={filtroIcone} alt="" />
                  </div>
                </div>
                {this.state.trajetos.paths.length > 0 ? (
                  trajetos.paths.map((c, index) => (
                    <div key={index}>
                      <div className="cartao_trajeto">
                        <div className="travelData" style={{ margin: "auto" }}>
                          {c.ida.map((t, i) => (
                            <div className="resultIda" key={i}>
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
                                      {t.arrival.time},{" "}
                                      {t.arrival.week.substr(0, 3)}
                                    </h1>
                                  </div>
                                  <div className="cidade purple">
                                    <h1>{t.arrival.city}</h1>
                                  </div>
                                  <div className="modal purple">
                                    <h1>{t.arrival.modal}</h1>
                                  </div>
                                </div>
                                <div className="resultCenter">
                                  <div className="duracao">
                                    <h1>{t.distance}</h1>
                                  </div>
                                  <div className="barraIcone2">
                                    <img src={barraIcone2} alt="" />
                                  </div>
                                </div>
                                <div className="resultDestino">
                                  <div className="horario">
                                    <h1 style={{ width: "200px" }}>
                                      {t.departure.time},{" "}
                                      {t.departure.week.substr(0, 3)}
                                    </h1>
                                  </div>
                                  <div className="cidade">
                                    <h1 id="purple">{t.departure.city}</h1>
                                  </div>
                                  <div className="modal">
                                    <h1 id="purple">{t.departure.modal}</h1>
                                  </div>
                                </div>
                                <div className="idaVoltaIcon">
                                  <img src={idaIcone} alt="" />
                                </div>
                              </div>
                            </div>
                          ))}

                          {c.volta.map((t, i) => (
                            <div className="resultVolta" key={i}>
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
                                      {t.arrival.time},{" "}
                                      {t.arrival.week.substr(0, 3)}
                                    </h1>
                                  </div>
                                  <div className="cidade">
                                    <h1>{t.arrival.city}</h1>
                                  </div>
                                  <div className="modal">
                                    <h1>{t.arrival.modal}</h1>
                                  </div>
                                </div>
                                <div className="resultCenter">
                                  <div className="duracao">
                                    <h1>{t.distance}</h1>
                                  </div>
                                  <div className="barraIcone2">
                                    <img src={barraIcone2} alt="" />
                                  </div>
                                </div>
                                <div className="resultDestino">
                                  <div className="horario">
                                    <h1 style={{ width: "200px" }}>
                                      {t.departure.time},{" "}
                                      {t.departure.week.substr(0, 3)}
                                    </h1>
                                  </div>
                                  <div className="cidade purple">
                                    <h1>{t.departure.city}</h1>
                                  </div>
                                  <div className="modal purple">
                                    <h1>{t.departure.modal}</h1>
                                  </div>
                                </div>
                                <div className="idaVoltaIcon">
                                  <img src={voltaIcone} alt="" />
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className="travelDuration">
                            <h1>
                              Saída: {c.ida[0].date} - Retorno:{" "}
                              {c.volta[c.volta.length - 1].date}{" "}
                            </h1>
                          </div>
                          <div className="warrings">
                            {c.warrings.map((t, i) => (
                              <h1 key={t}>{t}</h1>
                            ))}
                          </div>
                        </div>
                        <hr className="vertical" />

                        <div style={{ margin: "0 auto", textAlign: "center" }}>
                          <div className="preco">
                            <h1>R$ {c.price}</h1>
                          </div>
                          <div className="tempoViagem">
                            <h1>{c.duration} dias úteis</h1>
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
            {/* {this.state.trajetos.map((i, index) => (
              <div className="trajeto" key={index}>
                {i.exists ? (
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
                              e.currentTarget.src === seguroIconeHover
                                ? (e.currentTarget.src = seguroIcone)
                                : (e.currentTarget.src = seguroIconeHover)
                            }
                          />
                        </div>
                      </div>
                      <div className="cidades">
                        <div className="cidadeIda">
                          <h1>{i.cidadeIda}</h1>
                        </div>
                        <div className="cidadeVolta">
                          <h1>{i.cidadeVolta}</h1>
                        </div>
                      </div>
                      <div className="periodo">
                        <div className="data">
                          <h1>
                            {i.dataIda} - {i.dataVolta}
                          </h1>
                        </div>
                      </div>
                      <div className="filtro">
                        <img src={filtroIcone} alt="" />
                      </div>
                    </div>

                    <div className="cartao_trajeto">
                      <div className="travelData" style={{ margin: "auto" }}>
                        {i.path_id.map((t, index) => (
                          <div className={"resultIda" + index} key={index}>
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
                                    {t.hora[0]}, {t.dia[0].substr(0, 3)}
                                  </h1>
                                </div>
                                <div className="cidade purple">
                                  <h1>{t.initCidade}</h1>
                                </div>
                                <div className="modal purple">
                                  <h1>{t.modal}</h1>
                                </div>
                              </div>
                              <div className="resultCenter">
                                <div className="duracao">
                                  <h1>{t.duration} Km</h1>
                                </div>
                                <div className="barraIcone2">
                                  <img src={barraIcone2} alt="" />
                                </div>
                              </div>
                              <div className="resultDestino">
                                <div className="horario">
                                  <h1 style={{ width: "200px" }}>{t.dia[0]}</h1>
                                </div>
                                <div className="cidade">
                                  <h1 id="purple">{t.endCidade}</h1>
                                </div>
                                <div className="modal">
                                  <h1 id="purple">{t.modal}</h1>
                                </div>
                              </div>
                              <div className="idaVoltaIcon">
                                <img
                                  src={index == 0 ? idaIcone : voltaIcone}
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <hr className="vertical" />

                      <div style={{ margin: "0 auto", textAlign: "center" }}>
                        <div className="preco">
                          <h1>R$ {i.price}</h1>
                        </div>
                        <div className="tempoViagem">
                          <h1>{i.path_id[0].duration} dias úteis</h1>
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
                ) : (
                  <div className="nenhum_trajeto">
                    <div className="nenhum_trajeto_">
                      <div className="cidades">
                        <div className="cidadeIda">
                          <h1>{i.cidadeIda}</h1>
                        </div>
                        <div className="cidadeVolta">
                          <h1>{i.cidadeVolta}</h1>
                        </div>
                      </div>
                    </div>
                    <div className="msg">
                      <h1>Nenhum trajeto encontrado</h1>
                    </div>
                  </div>
                )}
              </div>
            ))} */}
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

function dayWeek(week) {
  if (week === 0) return "Domingo";
  else if (week === 1) return "Segunda-feira";
  else if (week === 2) return "Terça-feira";
  else if (week === 3) return "Quarta-feira";
  else if (week === 4) return "Quinta-feira";
  else if (week === 5) return "Sexta-feira";
  else if (week === 6) return "Sábado";
}
