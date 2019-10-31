import React from "react";

import icone_sair from "../../../assets/ConsultaManual/icone_sair_menor.png";

import './styles.css';

import api from "../../../services/api";

export default class TelaEsqueceuSenha extends React.Component {
    
    evento_sair() {
        var el_1 = document.getElementsByClassName("tela-esqueceu-senha");
        el_1[0].style.display = "none";
    }

    evento_enviarEmail = async ev => {
        ev.preventDefault();

        var el_1 = document.getElementsByClassName("email");

        var email = el_1[0].firstChild.value;

        await api.post("/forgot_password", email).catch(err => {
            alert(err);
        });

        this.evento_sair();
    }
    
    render() {
        return (
            <div className="tela-esqueceu-senha">
                        
                <div className="icone_sair_senha">
                    <img src={icone_sair} alt="" onClick={this.evento_sair} />
                </div>

                <div className="insira_email">
                    <h1 id="insira_email">Insira o endereço de email!</h1>
                </div>

                <div className="insira_conta">
                    <h1 id="insira_conta">Insira o endereço de email que está vinculado a sua conta</h1>
                </div>

                <div className="email">
                    <input type="email" name="email"/>
                </div>

                <div className="botao_enviar_email">
                    <input type="button" name="enviar_email" onClick={this.evento_enviarEmail}/>
                </div>

            </div>
        );
    }
}