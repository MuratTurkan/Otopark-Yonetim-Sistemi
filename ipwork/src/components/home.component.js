import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    
    AboneYonlendir() {
        this.props.history.push("aboneGiris")
    }

    GorevliYonlendir() {
        this.props.history.push("gorevliGiris")
    }
    YoneticiYonlendir() {
        this.props.history.push("yoneticiGiris")
    }

    render() {

        const {

        } = this.state;


        return (
            
        <div className="auth-inner">
                <button type="submit" className="buttons" onClick={()=>this.AboneYonlendir()}>Abone Giriş</button>
                <button type="submit" className="buttons" onClick={()=>this.GorevliYonlendir()}>Görevli Giriş</button>
                <button type="submit" className="buttons"onClick={()=>this.YoneticiYonlendir()}>Yönetici Giriş</button>
                <table className="table table-striped">
                    <thead>
                        <tr >
                            <th colsplan={2}>
                              
                               <div align="left"><p> -FİYAT LİSTESİ-</p> </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                            
                               <strong>Saat</strong>
                            </td>
                            <td>

                            <strong>Ücret</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            0-1
                            </td>
                            <td>
                            5 TL
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                            1-3
                            </td>
                            <td>
                            20 TL
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                            3-6
                            </td>
                            <td>
                            30 TL
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                            6-12
                            </td>
                            <td>
                            50 TL
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                            12 üzeri
                            </td>
                            <td>
                            60 TL
                            </td>
                        </tr>
                    </tbody>


                </table>
            </div>
        );
    }
}