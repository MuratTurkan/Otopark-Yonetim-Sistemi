import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

export default class Kesinlestir extends Component {
    constructor(props) {
        super(props);

        this.state = {
            saat: new Cookies().get("saat"),
            yakit: new Cookies().get("yakit"),
            plaka: sessionStorage.getItem("plaka"),
            bolge: new Cookies().get("bolge"),
            isim: sessionStorage.getItem("isim")
        }

    }

    Kesinlestir() {
        let money="";
        axios.put('http://localhost:8080/api/otopark/' + this.state.bolge + "/" + this.state.plaka + "/" + this.state.saat)
            .then(response => {
                switch (this.state.saat) {
                    case "0-1":
                        money=5
                        break;
                    case "1-3":
                        money=20
                        break;
                    case "3-6":
                        money=30
                        break;
                    case "6-12":
                        money=50

                        break;
                    case "12+":
                        money=60
                        break;
                    default:
                        break;
                }
                alert(money + "TL ÖDEME ÜCRETİ - iyi günler..")
                this.props.history.push("otopark")
            })
    }

    render() {

        const {
            bolge,
            isim,
            plaka,
            saat,
            yakit
        } = this.state;


        return (
            <div className="auth-inner">
                <div className="form-group">
                    <label>Hoşgeldiniz Sayın -  {isim}</label>
                </div>
                <div className="form-group">
                    <label>Plakanız : {plaka}</label>
                </div>
                <div className="form-group">
                    <label>Yakit türü :  {yakit}</label>
                </div>
                <div className="form-group">
                    <label>Seçilen bölge :  {bolge}</label>
                </div>
                <div className="form-group">
                    <label>Seçilen saat :  {saat}</label>
                </div>

                <button type="submit" className="buttons" onClick={() => this.Kesinlestir()}>KESİNLEŞTİR</button>
            </div>
        );
    }
}