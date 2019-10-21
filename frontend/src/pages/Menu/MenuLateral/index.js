import React from 'react';

import secex_logo from "../../../assets/Menu/secex_logo.png";
import icone_cadastro from "../../../assets/Menu/icone_cadastro.png";
import icone_configuracao from "../../../assets/Menu/icone_configuracao.png";
import icone_calendario from "../../../assets/Menu/icone_calendario.png";
import icone_historico from "../../../assets/Menu/icone_historico.png";
import icone_backup from "../../../assets/Menu/icone_backup.png";
import icone_relatorio from "../../../assets/Menu/icone_relatorio.png";
import icone_opiniao from "../../../assets/Menu/icone_opiniao.png";
import icone_ajuda from "../../../assets/Menu/icone_ajuda.png";
import icone_abrir from "../../../assets/Menu/icone_abrir.png";

import "./styles.css";

export default class MenuLateral extends React.Component {

    evento_abrirMenu() {
        var el_1 = document.getElementsByClassName('menu-aberto');
        var el_2 = document.getElementsByClassName('menu-fechado');
        el_1[0].style.display = 'block';
        el_2[0].style.display = 'none';
    }

    evento_fecharMenu() {
        var el_1 = document.getElementsByClassName('menu-aberto');
        var el_2 = document.getElementsByClassName('menu-fechado');
        el_1[0].style.display = 'none';
        el_2[0].style.display = 'block';
    }

    render() {
        return(
            <div className="menu-lateral">

                <div className="menu-aberto">
                    
                    <div className="secex_logo">
                        <img src={secex_logo} alt="" onClick={this.evento_fecharMenu}/>
                    </div>

                    <div className="icone_cadastro">
                        <img src={icone_cadastro} alt=""/>
                    </div>

                    <h1 id="cadastro">Cadastro</h1>

                    <div className="icone_configuracao">
                        <img src={icone_configuracao} alt=""/>
                    </div>
                    
                    <h1 id="configuracao">Configurações</h1>

                    <h1 id="fonte">Aumentar fonte</h1>
                    <h1 id="logistica">Preferência de Logística</h1>
 
                    <div className="icone_calendario">
                        <img src={icone_calendario} alt=""/>
                    </div>

                    <h1 id="calendario">Calendário</h1>

                    <div className="icone_historico">
                        <img src={icone_historico} alt=""/>
                    </div>

                    <h1 id="historico">Histórico de alterações</h1>

                    <div className="icone_backup">
                        <img src={icone_backup} alt=""/>
                    </div>

                    <h1 id="backup">Backup e Restauração</h1>

                    <div className="icone_relatorio">
                        <img src={icone_relatorio} alt=""/>
                    </div>

                    <h1 id="relatorio">Relatório</h1>
            
                    <div className="icone_opiniao">
                        <img src={icone_opiniao} alt=""/>
                    </div>

                    <h1 id="opiniao_menu">Dê sua opinião</h1>
        
                    <div className="icone_ajuda">
                        <img src={icone_ajuda} alt=""/>
                    </div>

                    <h1 id="ajuda">Ajuda</h1>

                </div>
                
                <div className="menu-fechado">

                    <div className="icone_abrir">
                        <img src={icone_abrir} alt="" onClick={this.evento_abrirMenu}/>
                    </div>

                </div>
            
            </div> 
        );
    }
}