import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
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

        axios.post('http://localhost:8080/api/gorevli/login/', body)
            .then(response => {
                if(response.data.gorevliId > 0) {
                    alert("giris basarili")
                    sessionStorage.setItem("IsLoggedIn", "true")
                    sessionStorage.setItem("gorevli_Id", response.data.gorevliId);
                    sessionStorage.setItem("isim", response.data.adSoyad);
                    sessionStorage.setItem("type", "gorevli")
                    sessionStorage.removeItem("plaka")
                    sessionStorage.removeItem("yoneticiId")
                    sessionStorage.removeItem("musteriId")
                    
                    this.props.history.push("/musteri")
                    window.location.reload()
                } else {
                    alert("Hatalı giriş. Lütfen tekrar deneyiniz !!")
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

                <h3>GÖREVLİ GİRİŞ</h3>

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
