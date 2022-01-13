import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

export default class gorevliOtopark extends Component {
    constructor(props) {
        super(props);


        this.state = {
            otopark: []
        }
    }

    refreshList() {
        axios.get('http://localhost:8080/api/otopark/getfull')
            .then(response => {
                this.setState({ otopark: response.data });
            })
    }

    componentDidMount() {
        this.refreshList();
    }

    deleteClick(td) {
        axios.put('http://localhost:8080/api/otopark/update/' + td.bolge)
            .then(response => {
                this.refreshList()
            })
    }

    editClick(td) {
        var cookie = new Cookies();
        cookie.set("bolge", td.bolge);
        cookie.set("plaka", td.dolu);
        cookie.set("yakit", td.yakit);

        this.props.history.push("/otoparkDuzenle");
    }

    addRequest() {
        this.props.history.push("/otopark")
    }

    render() {

        const {
            otopark
        } = this.state;
        return (
            <div className="auth-inner">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Bölge
                            </th>
                            <th>
                                Plaka 
                            </th>
                            <th>
                                Yakıt
                            </th>
                            <th>
                                Süre
                            </th>
                            <th>
                                Güncelle
                            </th>
                            <th>
                                Sil
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {otopark.map(td =>
                            <tr key={td.bolge}>
                                <td>{td.bolge}</td>
                                <td>{td.dolu}</td>
                                <td>{td.yakit}</td>
                                <td>{td.saat}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(td)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                </td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(td)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                        <button type="submit" className="buttons" style={{ marginTop: 10 }} onClick={() => this.addRequest()}>Yer seç</button>
                    </tbody>
                </table>
            </div>

        )

    }
}
