import React, { Component } from "react";

import Icone_1 from "../../../../../assets/Icones_modal/1.png";
import Icone_2 from "../../../../../assets/Icones_modal/2.png";
import Icone_3 from "../../../../../assets/Icones_modal/3.png";
import Icone_4 from "../../../../../assets/Icones_modal/4.png";
import Icone_5 from "../../../../../assets/Icones_modal/5.png";
import Icone_6 from "../../../../../assets/Icones_modal/6.png";
import Icone_7 from "../../../../../assets/Icones_modal/7.png";
import Icone_8 from "../../../../../assets/Icones_modal/8.png";
import Icone_a from "../../../../../assets/Icones_modal/a.png";

import "./styles.css";

export default class Feriado extends Component {
    render(){
        return(
        <div className="modais">
            <div className="line1">
                <div className="modal1"><img src={Icone_1} alt="" /></div>
                <div className="modal2"><img src={Icone_2} alt="" /></div>
                <div className="modal3"><img src={Icone_3} alt="" /></div>
                <div className="modal4"><img src={Icone_4} alt="" /></div>
            </div>
            <div className="line2">
                <div className="modal5"><img src={Icone_5} alt="" /></div>
                <div className="modal6"><img src={Icone_6} alt="" /></div>
                <div className="modal7"><img src={Icone_7} alt="" /></div>
                <div className="modal8"><img src={Icone_8} alt="" /></div>
            </div>
            <div className="modal_a"><img src={Icone_a} alt="" /></div>
        </div>
        )
    }
}