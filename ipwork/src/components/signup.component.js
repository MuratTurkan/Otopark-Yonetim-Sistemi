import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            musteriAd: "",
            musteriSoyad: "",
            musteriTel: "",
            musteriPlaka: "",
            musteriMail: "",
            password:""
        }
    }

    componentDidMount() {

    }

    signUpRequest() {
        const body = {
            musteriTel: this.state.musteriTel,
            musteriAd: this.state.musteriAd,
            musteriSoyad: this.state.musteriSoyad,
            musteriPlaka: this.state.musteriPlaka,
            musteriMail: this.state.musteriMail,
            password: this.state.password
        };

        axios.post('http://localhost:8080/api/MusteriKayit/', body)
            .then(response => {
                if(response.data.musteriId > 0) {
                    alert("KAYIT BAŞARILI")
                    this.props.history.push("/otopark")
                }
              
            })

    }

    changeAd = (e) => {
        this.setState({ musteriAd: e.target.value });
    }

    changeMail = (e) => {
        this.setState({ musteriMail: e.target.value });
    }

    changePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    changeSoyad = (e) => {
        this.setState({ musteriSoyad: e.target.value });
    }

    changePlaka = (e) => {
        this.setState({ musteriPlaka: e.target.value });
        let cookie = new Cookies();
        cookie.set("plaka", e.target.value)
    }

    changeTel = (e) => {
        this.setState({ musteriTel: e.target.value });
    }

    changeSaat = (e) => {
        let cookie = new Cookies();
        cookie.set("saat", e.target.value)
    }

    changeYakit = (e) => {
        let cookie = new Cookies();
        cookie.set("yakit", e.target.value)
    }


    render() {

        const {
            musteriAd,
            musteriMail,
            musteriPlaka,
            musteriSoyad,
            musteriTel,
            password

        } = this.state;


        return (

        <div className="auth-inner kayit">

                <h3>Müşteri Kayıt</h3>

                <div className="form-group">
                    <label>Ad</label>
                    <input type="text" className="form-control" placeholder="Adınız" onChange={this.changeAd} value={musteriAd} />
                </div>

                <div className="form-group">
                    <label>Soyad</label>
                    <input type="text" className="form-control" placeholder="Soyadınız" onChange={this.changeSoyad} value={musteriSoyad} />
                </div>

                <div className="form-group">
                    <label>telefon</label>
                    <input type="text" className="form-control" placeholder="(555) 555 5555" onChange={this.changeTel} value={musteriTel} />
                </div>

                <div className="form-group">
                    <label>plaka</label>
                    <input type="text" className="form-control" placeholder="Plakanız" onChange={this.changePlaka} value={musteriPlaka} />
                </div>

                <div className="form-group">
                    <label>mail</label>
                    <input type="text" className="form-control" placeholder="*******@gmail.com" onChange={this.changeMail} value={musteriMail} />
                </div>

                <div className="form-group">
                    <label>şifre</label>
                    <input type="password" className="form-control" placeholder="Şifreniz" onChange={this.changePassword} value={password} />
                </div>

                <div className="form-group">
                    <label>saat seçiniz</label>
                    <select className="saat" onChange={this.changeSaat} style={{ marginLeft: 10 }}>
                        <option value="0-1">0-1</option>
                        <option value="1-3">1-3</option>
                        <option value="3-6">3-6</option>
                        <option value="6-12">6-12</option>
                        <option value="12+">12+</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Yakıt türü seçiniz</label>
                    <select className="yakıt" onChange={this.changeYakit} style={{ marginLeft: 10 }}>
                        <option value="benzin">benzin</option>
                        <option value="dizel">dizel</option>
                        <option value="lpg">LPG</option>
                        
                    </select>
                </div>

                <button type="submit" className="buttons" onClick={() => this.signUpRequest()}>Kayıt Et</button>
               

            </div>
        );
    }
}