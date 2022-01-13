import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

export default class YoneticiDuzenle extends Component {
    constructor(props) {
        super(props);


        this.state = {
            adSoyad: "",
            tckn: "",
            email: "",
            password: ""
        }
    }

    addRequest() {
        let cookie = new Cookies();

        const body = {
            tckn: this.state.tckn,
            adSoyad: this.state.adSoyad,
            email: this.state.email,
            password: this.state.password,
        };  
        axios.put('http://localhost:8080/api/yonetici/' + cookie.get("yoneticiIdForEdit"), body)
            .then(response => {
                    alert("Güncelleme Başarılı")
                    this.props.history.push("/yonetici");
            })

    }

    refreshList() {
        let cookie = new Cookies();
        axios.get('http://localhost:8080/api/yonetici/' + cookie.get("yoneticiIdForEdit"))
            .then(response => {
                this.setState({ tckn: response.data.tckn });
                this.setState({ adSoyad: response.data.adSoyad });
                this.setState({ email: response.data.email });
                this.setState({ password: response.data.password });
            })
    }

    componentDidMount() {
        this.refreshList();
    }

    changepassword = (e) => {
        this.setState({ password: e.target.value });
    }

    
    changetckn = (e) => {
        this.setState({ tckn: e.target.value });
    }
    changeadSoyad = (e) => {
        this.setState({ adSoyad: e.target.value });
    }

    changeemail = (e) => {
        this.setState({ email: e.target.value });
    }

    render() {
        const {
            password,
            adSoyad,
            tckn,
            email
        } = this.state;
        return (
            <div className="auth-inner">
                <div className="form-group">
                    <label>Ad - Soyad</label>
                    <input type="text" className="form-control" placeholder="Ad - Soyad giriniz" onChange={this.changeadSoyad} value={adSoyad} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" placeholder="*****@gmail.com" onChange={this.changeemail} value={email} />
                </div>
                <div className="form-group">
                    <label>şifre</label>
                    <input type="text" className="form-control" placeholder="*******" onChange={this.changepassword} value={password} />
                </div>
                <div className="form-group">
                    <label>TC numarası</label>
                    <input type="text" className="form-control" placeholder="TC no giriniz" onChange={this.changetckn} value={tckn} />
                </div>
                <button type="submit" className="buttons" onClick={() => this.addRequest()}>Güncelle</button>
            </div>
        )

    }
}
