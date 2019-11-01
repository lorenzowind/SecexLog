import React from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import CrudCidade from "../../../pages/CRUD/Cidade/index";
import CrudUser from "../../../pages/CRUD/Usuario/index";
import MenuBar from "../MenuBar/index"

import secex_logo from "../../../assets/Menu/secex_logo.png";
import icone_cadastro from "../../../assets/Menu/icone_cadastro.png";
import icone_configuracao from "../../../assets/Menu/icone_configuracao.png";
import icone_calendario from "../../../assets/Menu/icone_calendario.png";
import icone_opiniao from "../../../assets/Menu/icone_opiniao.png";
import icone_ajuda from "../../../assets/Menu/icone_ajuda.png";
import icone_abrir from "../../../assets/Menu/icone_abrir.png";

import "./styles.css";

export default class MenuLateral extends React.Component {

    evento_abrirMenu() {
        var el_1 = document.getElementsByClassName('menu-aberto');
        var el_2 = document.getElementsByClassName('menu-fechado');
        var el_3 = document.getElementsByClassName('rotas-cadastro');
        el_1[0].style.display = 'block';
        el_2[0].style.display = 'none';
        el_3[0].style.display = 'block';
    }

    evento_fecharMenu() {
        var el_3 = document.getElementsByClassName('rotas-cadastro');
        var el_1 = document.getElementsByClassName('menu-aberto');
        var el_2 = document.getElementsByClassName('menu-fechado');
        el_1[0].style.display = 'none';
        el_2[0].style.display = 'block';
        el_3[0].style.display = 'none';
    }

    render() {

        console.log('Token: ' + localStorage.getItem('token'))

        return(

            <div className="menu-lateral">

                <MenuBar/>

                <div className="menu-aberto">
                    
                    <div className="secex_logo">
                        <img src={secex_logo} alt=""/>
                    </div>

                    <div className="icone_cadastro">
                        <img src={icone_cadastro} alt=""/>
                    </div>

                    <h1 id="cadastro">Cadastro</h1>

                    <div className="icone_configuracao">
                        <img src={icone_configuracao} alt=""/>
                    </div>
                    
                    <h1 id="configuracao">Configurações</h1>

                    <div className="icone_calendario">
                        <img src={icone_calendario} alt=""/>
                    </div>

                    <h1 id="calendario">Calendário</h1>

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
                
                <div className="rotas-cadastro">
                    <BrowserRouter>
                        <Link to="/cadastro/cidade"><h1 id="cidade_trajeto">Cidade/Trajeto</h1></Link>
                        <Link to="/cadastro/user"><h1 id="usuario">Usuário</h1></Link>
                        <Switch>
                            <Route path="/cadastro/cidade" component={CrudCidade}/>
                            <Route path="/cadastro/user" component={CrudUser}/>
                        </Switch>
                    </BrowserRouter>
                </div>
            
            </div> 
        );
    }
}