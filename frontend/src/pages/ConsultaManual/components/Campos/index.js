import React from 'react';

import "./styles.css";

export default class Campos extends React.Component {
    render(){
        return (
            <div className="campos">
                <form>
                
                    <div className="trajeto">
                        <h1 id="trajeto">Trajeto {this.props.num}</h1>
                    </div>
                    
                    <div className="cidade-saida">
                        <input type="text" name="cidade-saida" placeholder="Origem"/>
                    </div>

                    <div className="cidade-destino">
                        <input type="text" name="cidade-destino" placeholder="Destino"/>
                    </div>
                    
                    <div className="ida">
                        <input type="date" name="ida" placeholder="Data de Ida"/>
                    </div>

                </form>
            </div>
        );
    }
} 