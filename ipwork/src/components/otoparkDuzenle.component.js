import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

export default class otoparkDuzenle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            saat: new Cookies().get("saat"),
            yakit: new Cookies().get("yakit"),
            plaka:new Cookies().get("plaka"),
            bolge: new Cookies().get("bolge"),
            isim: sessionStorage.getItem("isim"),
            plakaList:[]
        }

    }

    Kesinlestir() {
        let money="0";
        const body = {
            bolge: this.state.bolge,
            dolu: this.state.dolu,
            yakit: this.state.yakit,
            saat: this.state.saat,
        };  
        axios.put('http://localhost:8080/api/otopark/duzenle/' + this.state.plaka, body)
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
                alert(money + "TL ödeme ücreti")
                this.props.history.push("gorevliOtopark")
            })
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/MusteriKayit/')
            .then(response => {
                this.setState({ plakaList: response.data })
            })
    }

    changeSaat = (e) => {
        this.setState({saat: e.target.value})
    }

    changeYakit = (e) => {
        this.setState({yakit: e.target.value})
    }

    changePlaka = (e) => {
        this.setState({plaka: e.target.value})
    }

    render() {

        const {
            bolge,
            isim,
            plaka,
            saat,
            yakit,
            plakaList
        } = this.state;


        return (
            <div className="auth-inner">
                <div className="form-group">
                    <label>Hoşgeldiniz {isim}</label>
                </div>
                <div className="form-group">
                    <label>Seçilen bolge: {bolge}</label>
                </div>
                <div className="form-group">
                    <label>Plaka seçiniz</label>
                    <select className="plaka" onChange={this.changePlaka} value={plaka} style={{ marginLeft: 10 }}>
                        {plakaList.map(e =>
                            <option value={e.musteriPlaka}>{e.musteriPlaka}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <label>saat seçiniz</label>
                    <select className="saat" onChange={this.changeSaat} value={saat} style={{ marginLeft: 10 }}>
                        <option value="0-1">0-1</option>
                        <option value="1-3">1-3</option>
                        <option value="3-6">3-6</option>
                        <option value="6-12">6-12</option>
                        <option value="12+">12+</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>yakıt türü : {yakit}</label>
                </div>
                <button type="submit" className="buttons" onClick={() => this.Kesinlestir()}>KESİNLEŞTİR</button>
            </div>
        );
    }
}