import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

export default class Otopark extends Component {
    constructor(props) {
        super(props);

        this.state = {
            otopark: [],
            saat:new Cookies().get("saat"),
            yakit:new Cookies().get("yakit")
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/otopark/')
            .then(response => {
                this.setState({ otopark: response.data })
            })
    }

    changeSaat = (e) => {
        this.setState({saat:e.target.value})
    }

    changeYakit = (e) => {
        this.setState({yakit:e.target.value})
    }

    chooseBolge(e) {
        let cookie = new Cookies();
        cookie.set("saat", this.state.saat)
        cookie.set("yakit", this.state.yakit)
        cookie.set("bolge", e.bolge)
        if(sessionStorage.getItem("type")==="abone") {
            this.props.history.push("kesinlestir")
        }
        else {
            this.props.history.push("yetkiliKesinlestir")
        }
    }

    render() {

        const {
            otopark,
            saat,
            yakit
        } = this.state;

        return (
            <div className="otoparkAuth">
                {otopark.map(e =>
                    <button type="submit" className="buttons1" style={e.dolu == sessionStorage.getItem("plaka") ? ({backgroundColor:"yellow"}) : (e.dolu==0 && e.yakit == this.state.yakit ? ({backgroundColor:"green"}):({backgroundColor: "red"}))} 
                    onClick={ e.dolu==0 && e.yakit == this.state.yakit ? (() => this.chooseBolge(e)):(() => alert("Seçilemez")) }>{e.bolge}</button>
                )}
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
                    <label>Yakıt türü seçiniz</label>
                    <select className="yakıt" onChange={this.changeYakit} value={yakit} style={{ marginLeft: 10 }}>
                        <option value="benzin">benzin</option>
                        <option value="dizel">dizel</option>
                        <option value="lpg">LPG</option>
                    </select>
                </div>
            </div>
            
        );
    }
}