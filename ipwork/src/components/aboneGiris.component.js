import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

export default class AboneGiris extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    mailchanger = (e) => {
        this.setState({ email: e.target.value });
    }
    passwordchanger = (e) => {
        this.setState({ password: e.target.value });
    }

    login() {
        const body = {
            musteriMail: this.state.email,
            password: this.state.password,
        };

        axios.post('http://localhost:8080/api/MusteriKayit/login/', body)
            .then(response => {
                if (response.data.musteriId > 0) {
                    alert("GİRİŞ BAŞARILI..")
                    sessionStorage.setItem("IsLoggedIn", "true")
                    sessionStorage.setItem("musteriId", response.data.musteriId);
                    sessionStorage.setItem("plaka", response.data.musteriPlaka);
                    sessionStorage.setItem("isim", response.data.musteriAd);
                    sessionStorage.setItem("type", "abone")
                    sessionStorage.removeItem("gorevli_Id")
                    sessionStorage.removeItem("yoneticiId")
                    this.props.history.push("/otopark")
                    window.location.reload()
                } else {
                    alert("yanlış giriş")
                }

            })

    }

    render() {
        const {
            email,
            password
        } = this.state;

        return (

            <div className="auth-inner">

                <h3>ABONE GİRİŞ</h3>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" onChange={this.mailchanger} value={email} placeholder="*******@gmail.com" />
                </div>

                <div className="form-group">
                    <label>Şifre:</label>
                    <input type="password" className="form-control" onChange={this.passwordchanger} value={password} placeholder="*********" />
                </div>

                <button type="submit" className="buttons" onClick={() => this.login()}>Giriş</button>

            </div>
        );
    }
}