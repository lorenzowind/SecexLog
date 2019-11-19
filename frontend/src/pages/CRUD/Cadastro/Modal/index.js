import React, { Component } from "react";
import HeaderModal from "../../Cadastro/components/HeaderOp/index";
import Menu from "../../../../components/Menu/MenuLateral/index";
import Radio from "../components/Radio/index";
import Icones from "../components/Icones/index";

import "./styles.css";

export default class Modal extends Component {
    render() {
        return (
            <div className="body">
               <Menu/>
                <div className="cadastro">
                    <HeaderModal op={"Modal"}/>
                    <form>
                        <div className="cadastro-modal">

                        <h2>Nome do Modal</h2>
                        <div className="nome_modal">
                            <input
                                type="text"
                                id="text"
                                name="nomeCidade"
                                onChange={this.onChange}
                            />  
                        </div>

                        <h2>Selecione ícone</h2>
                        <div className="icones"><Icones/></div>
                        
                        <h2>Esse modal é seguro?</h2>
                        <div className="modal_seguro"><Radio/></div>
                        <h2>Esse modal é de baixo custo?</h2>
                        <div className="modal_baixo_custo"><Radio/></div>
                        <h2>Esse modal é rápido?</h2>
                        <div className="modal_rapido"><Radio/></div>

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
