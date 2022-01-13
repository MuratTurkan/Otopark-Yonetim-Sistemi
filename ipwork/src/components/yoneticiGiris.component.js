import React, { Component } from "react";
import axios from "axios";

export default class YoneticiGiris extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email:"",
            password:""
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
            email: this.state.email,
            password: this.state.password,
        };

        axios.post('http://localhost:8080/api/yonetici/login/', body)
            .then(response => {
                if(response.data.yoneticiId > 0) {
                    alert("GİRİŞ BAŞARILI..")
                    sessionStorage.setItem("IsLoggedIn", "true")
                    sessionStorage.setItem("yoneticiId", response.data.yoneticiId);
                    sessionStorage.setItem("type", "yonetici")
                    sessionStorage.setItem("isim", response.data.adSoyad);
                    sessionStorage.removeItem("plaka")
                    sessionStorage.removeItem("gorevli_Id")
                    sessionStorage.removeItem("musteriId")
                    this.props.history.push("/gorevli")
                    window.location.reload()
                } else {
                    alert("HATALI GİRİŞ LÜTFEN TEKRAR DENEYİNİZ ")
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

                <h3>YÖNETİCİ GİRİŞ</h3>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" onChange={this.mailchanger} value={email} placeholder="*******@gmail.com" />
                </div>

                <div className="form-group">
                    <label>Şifre:</label>
                    <input type="password" className="form-control" onChange={this.passwordchanger} value={password} placeholder="*********" />
                </div>

                <button type="submit" className="buttons" onClick={()=>this.login()}>Giriş</button>
                
            </div>
        );
    }
}
