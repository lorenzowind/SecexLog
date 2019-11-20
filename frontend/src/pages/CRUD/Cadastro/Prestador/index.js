import React, { Component } from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";

import HeaderPrestador from "../../Cadastro/components/HeaderOp/index";
import Menu from "../../../../components/Menu/MenuLateral/index";

import "./styles.css";

const animatedComponents = makeAnimated();

let options = null;
let options_pref = null;

export default class Prestador extends Component {
    
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            modaisRelacionados: null,
            preferencia: "escolhe porra",
            nomePrestador: "",
            telefone_prestador: "",
            email_prestador: ""
        };
    }

    componentWillMount() {
        this.loadOpcoes();
    }

    loadOpcoes = async () => {
        options = [
            { value: "carro", label: "Carro" },
            { value: "barco", label: "Barco" }
        ];
        options_pref = [    
            { value: "cpf", label: "CPF" },
            { value: "cnpj", label: "CNPJ" }
        ];
    }

    handleModaisRelacionados = modaisRelacionados => {
        this.setState({ modaisRelacionados });
    };
    
    handlePreferencia = preferencia => {
        this.state.preferencia = preferencia.label;
        var el = document.getElementsByClassName("pref");
        el[0].childNodes[0].innerHTML = this.state.preferencia;
        el[0].style.display = "block";
    };
    
    render() {
        return (
            <div className="body">
               <Menu/>
                <div className="cadastro">
                    <HeaderPrestador op={"Prestador"}/>
                    <form>
                        <div className="cadastro-prestador">

                        <h2>Nome do Prestador de Serviço</h2>
                        <div className="nome_prestador">
                            <input
                                type="text"
                                id="text"
                                name="nome_prestador"
                                onChange={this.onChange}
                            />  
                        </div>

                        <div className="info">
                            <div className="telefone_prestador">
                                <h2>Telefone</h2>
                                <input
                                    type="text"
                                    id="telefone"
                                    name="telefone_prestador"
                                    onChange={this.onChange}
                                />  
                            </div>
                            <div className="email_prestador">
                                <h2>E-mail</h2>
                                <input
                                    type="text"
                                    id="email"
                                    name="email_prestador"
                                    onChange={this.onChange}
                                />  
                            </div>
                        </div>
                        
                        <h2>Modal</h2>
                        <div className="select_modal">
                            <Select
                                className="select"
                                closeMenuOnSelect={false}
                                placeholder=""
                                components={animatedComponents}
                                isMulti
                                options={options}
                                name="modaisRelacionadas"
                                onChange={this.handleModaisRelacionados}
                            />
                        </div>

                        <div className="prefere">
                            
                            <div className="preferencia">
                                <h2>Você prefere?</h2>
                                <Select
                                    className="select"
                                    closeMenuOnSelect={false}
                                    placeholder=""
                                    components={animatedComponents}
                                    isSingle
                                    options={options_pref}
                                    name="preferencia"
                                    onChange={this.handlePreferencia}
                                />
                            </div>
                            
                            <div className="pref">
                                <h2>{this.state.preferencia}</h2>
                                <input
                                    type="text"
                                    id="text"
                                    name="pref"
                                    onChange={this.onChange}
                                />  
                            </div>

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
