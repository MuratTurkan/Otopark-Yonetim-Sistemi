import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

export default class Cikis extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        if(sessionStorage.getItem("IsLoggedIn") == "true")
            window.location.reload();
        sessionStorage.setItem("IsLoggedIn", "false")
        this.props.history.push("/");
    }

    render() {

        const {

        } = this.state;

        

        return (
            <div className="auth-inner">
                
            </div>
        );
    }
}