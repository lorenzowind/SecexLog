import React from "react";
import { Redirect } from "react-router";

import Menu from "../../../components/Menu/MenuLateral/index";
import Loading from "../../../components/Loading/index";

import idaIcone from "../../../assets/3_Resultado_da_Consulta/ir2.png";
import voltaIcone from "../../../assets/3_Resultado_da_Consulta/ir-1.png";
import rapidoIcone from "../../../assets/3_Resultado_da_Consulta/run1.png";
import custoIcone from "../../../assets/3_Resultado_da_Consulta/PREÇO.png";
import seguroIcone from "../../../assets/3_Resultado_da_Consulta/SEGURANÇA.png";
import filtroIcone from "../../../assets/3_Resultado_da_Consulta/filtro.png";
import barraIcone from "../../../assets/3_Resultado_da_Consulta/Componente 34 – 1.png";
import barraIcone2 from "../../../assets/3_Resultado_da_Consulta/Componente 48 – 1.png";
import botaoSelecionar from "../../../assets/3_Resultado_da_Consulta/Componente 40 – 1.png";

import api from "../../../services/api";

import "./styles.css";

export default class Tela_resultado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trajetos: this.props.location.state.matriz_trajetos.trajetos,
      load: false,
      paths: null,
      modalIcone: null,
      back: false
    };
  }

  wait = () => {
    setTimeout(() => this.setState({ load: true }), 3000);
    return <Loading />;
  };

  componentDidMount = () => {
    this.loadPathData();
  };

  loadPathData = async () => {
    const res = await api.get("/paths").catch(err => {
      alert(err.message);
      window.location.replace("/");
    });

    this.setState({ paths: res.data });

    this.validation();
    console.log(res);
  };

  validation = () => {
    const aux = this.state.trajetos;

    console.log(aux);

    for (var i = 0; i < this.state.trajetos.length; i++) {
      for (var j = 0; j < this.state.paths.length; j++) {
        if (
          aux[i].cidadeIda === this.state.paths[j].initCidade &&
          aux[i].cidadeVolta === this.state.paths[j].endCidade
        ) {
          console.log("teste");
          aux[i].exists = true;
          aux[i].path_id.push(this.state.paths[j]);
        }
      }
    }

    this.setState({ trajetos: aux });
  };

  back = () => {
    this.setState({ back: true });
  };

  render() {
    const { back } = this.state;

    if (back) return <Redirect to="/" />;

    return (
      <div className="tela-resultado">
        <div>{!this.state.load ? this.wait() : <Menu ativo={false} />}</div>
        <div className="tela-resultado_">
          <div className="linha-1">
            <div className="voltar">
              <img src={voltaIcone} alt="" onClick={this.back} />
            </div>
            <div className="resultado">
              <h1>Resultado - Consulta Manual</h1>
            </div>
            <div className="barra">
              <img src={barraIcone} alt="" />
            </div>
          </div>
          {this.state.trajetos.map((i, index) => (
            <div className="trajeto" key={index}>
              {i.exists ? (
                <div className="trajeto_">
                  <div className="linha-2">
                    <div className="filtros">
                      <div className="rapidoIcone">
                        <img src={rapidoIcone} alt="" />
                      </div>
                      <div className="custoIcone">
                        <img src={custoIcone} alt="" />
                      </div>
                      <div className="seguroIcone">
                        <img src={seguroIcone} alt="" />
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
                        <h1>{i.data}</h1>
                      </div>
                    </div>
                    <div className="filtro">
                      <img src={filtroIcone} alt="" />
                    </div>
                  </div>
                  {i.path_id.map((t, index) => (
                    <div className="linha-3" key={index}>
                      <div className="cartao_trajeto">
                        <div className="imagem_modal">
                          <h1>{t.prestNome}</h1>
                        </div>
                        <div className="linha-4">
                          <div className="horarioSaida">
                            <h1>
                              {t.hora[0]}, {t.dia[0]}
                            </h1>
                          </div>
                          <div className="cidadeSaida">
                            <h1>{t.initCidade}</h1>
                          </div>
                          <div className="modalSaida">
                            <h1>{t.modal}</h1>
                          </div>
                          <div className="duracao">
                            <h1>{t.duration} Km</h1>
                          </div>
                          <div className="barraIcone2">
                            <img src={barraIcone2} alt="" />
                          </div>
                          <div className="horarioDestino">
                            <h1>{t.dia[0]}</h1>
                          </div>
                          <div className="cidadeDestino">
                            <h1>{t.endCidade}</h1>
                          </div>
                          <div className="modalDestino">
                            <h1>{t.modal}</h1>
                          </div>
                          <div className="linha_vertical" />
                          <div className="preco">
                            <h1>R$ {t.cost}</h1>
                          </div>
                          <div className="tempoViagem">
                            <h1>{t.duration} horas</h1>
                          </div>
                          <div className="tipoModal">
                            <h1>{t.modal}</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
                    <div className="msg">
                      <h1>Nenhum trajeto encontrado</h1>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
