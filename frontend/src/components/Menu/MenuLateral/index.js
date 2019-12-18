import React from "react";
import DayPicker from "react-day-picker";

import MenuBar from "../MenuBar/index";
import { Link } from "react-router-dom";

import secex_logo from "../../../assets/Menu/secex_logo.png";
import icone_cadastro from "../../../assets/Menu/icone_cadastro.png";
import icone_configuracao from "../../../assets/Menu/icone_configuracao.png";
import icone_calendario from "../../../assets/Menu/icone_calendario.png";
import icone_opiniao from "../../../assets/Menu/icone_opiniao.png";
import icone_ajuda from "../../../assets/Menu/icone_ajuda.png";
import icone_abrir from "../../../assets/Menu/icone_abrir.png";

import "react-day-picker/lib/style.css";

import "./styles.css";

const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];
const WEEKDAYS_LONG = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado"
];
const WEEKDAYS_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

export default class MenuLateral extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return { menu_aberto: [{ bool: false }], menu_fechado: [], open: false };
  }

  componentDidMount() {
    if (this.props.ativo) {
      this.evento_abrirMenu();
    } else {
      this.evento_fecharMenu();
    }
  }

  evento_abrirMenu = () => {
    console.log(this.props);
    console.log(this.state);
    let menu_aberto = this.state.menu_aberto;

    const menu = {
      cadastro: "Cadastro",
      config: "Configurações",
      caledario: "Calendário",
      hist: "Histórico de alterações",
      back: "Backup e Restauração",
      relatorio: "Relatório",
      opiniao: "Dê sua opinião",
      ajuda: "Ajuda"
    };

    menu_aberto.push(menu);

    this.setState({ menu_aberto: menu_aberto, menu_fechado: [] });
  };

  evento_fecharMenu = () => {
    let menu_fechado = this.state.menu_fechado;
    const boll = true;
    menu_fechado.push(boll);
    this.setState({ menu_aberto: [], menu_fechado: menu_fechado });
  };

  evento_abrirOpiniao = () => {
    var el = document.getElementsByClassName("tela-opiniao");
    el[0].style.display = "block";
  };

  render() {
    return (
      <div className="menu-lateral">
        <MenuBar />
        {this.state.menu_aberto.map((c, i) => (
          <div className="menu-aberto" key={i}>
            <div className="secex_logo">
              <img src={secex_logo} alt="" onClick={this.evento_fecharMenu} />
            </div>

            <div className="icone_cadastro">
              <img src={icone_cadastro} alt="" />
              <Link to="/cadastro" style={{ textDecoration: "none" }}>
                <div className="cadastro_opcao">
                  <h1 id="cadastro">{c.cadastro}</h1>
                </div>
              </Link>
            </div>

            <div className="icone_configuracao">
              <img src={icone_configuracao} alt="" />
              <h1 id="configuracao">{c.config}</h1>
            </div>

            <div className="icone_calendario">
              <img src={icone_calendario} alt="" />
              <h1 id="calendario">{c.caledario}</h1>
            </div>

            <div className="calendario">
              <DayPicker
                months={MONTHS}
                weekdaysLong={WEEKDAYS_LONG}
                weekdaysShort={WEEKDAYS_SHORT}
              />
            </div>

            <div className="icone_opiniao">
              <img src={icone_opiniao} alt="" />
              <h1 id="opiniao_menu" onClick={this.evento_abrirOpiniao}>
                {c.opiniao}
              </h1>
            </div>
          </div>
        ))}

        {this.state.menu_fechado.map((c, i) => (
          <div className="menu-fechado" key={i}>
            <div className="icone_abrir">
              <img src={icone_abrir} alt="" onClick={this.evento_abrirMenu} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
