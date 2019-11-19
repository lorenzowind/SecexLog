import React, { Component } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import HeaderFeriado from "../../Cadastro/components/HeaderOp/index";
import Menu from "../../../../components/Menu/MenuLateral/index";
import Calendar from "../components/Calendar/Calendar";

import "./styles.css";

const animatedComponents = makeAnimated();

let options = null;

export default class Feriado extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            cidadesRelacionadas: null,
            nomeFeriado: "",
            initData: "",
            endData: "",
        };
    }

    componentWillMount() {
        this.loadOpcoes();
    }

    loadOpcoes = async () => {
        options = [
            { value: "tefe", label: "Tefé" },
            { value: "itacoatiara", label: "Itacoatiara" },
            { value: "presidente figueiredo", label: "Presidente Figueiredo" }
          ];
    }

    handleCidadesRelacionadas = cidadesRelacionadas => {
        this.setState({ cidadesRelacionadas });
    };

    getRange = (state, name) => {
        if (name === "feriado") {
          this.setState({
            initDataFeriado: state.from,
            endDataFeriado: state.to
          });
        }
      };

    render() {
        return (
            <div className="body">
               <Menu/>
                <div className="cadastro">
                    <HeaderFeriado op={"Feriado"}/>
                    <form>
                        <div className="cadastro-feriado">
                            
                            <h2>Nome da cidade</h2>
                            <div className="nome_cidade">
                            <Select
                                className="select"
                                closeMenuOnSelect={false}
                                placeholder=""
                                components={animatedComponents}
                                isMulti
                                options={options}
                                name="cidadesRelacionadas"
                                onChange={this.handleCidadesRelacionadas}
                            />
                            </div>

                            <h2>Nome do Feriado</h2>
                            <div className="nome_feriado">
                            <input
                                type="text"
                                id="text"
                                name="nomeCidade"
                                onChange={this.onChange}
                            />
                            </div>

                            <h2>Selecionar dia</h2>
                            <div className="RangeExample">
                                <Calendar
                                name={"feriado"}
                                getRange={this.getRange.bind(this)}
                                />
                            </div>

                            <div className="footer">
                                <button onClick={this.onSubmit}></button>
                            </div>

                        </div>
                    </form>
                </div> 
            </div>
        )
    }
}