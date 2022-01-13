import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

export default class MusteriList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            plaka: "",
            musteriList: []
        }
    }

    searchRequest() {
        axios.get('http://localhost:8080/api/MusteriKayit/' + this.state.plaka)
            .then(response => {
                this.setState({ musteriList: response.data });
            })
    }

    changePlaka = (e) => {
        this.setState({ plaka: e.target.value });
    }

    deleteClick(e) {
        axios.delete('http://localhost:8080/api/MusteriKayit/'+ e.musteriId)
            .then(response => {
                this.searchRequest()
            })
    }

    editClick(e) {
        new Cookies().set("musteriId", e.musteriId)
        this.props.history.push("/musteriDuzenle");
    }


    render() {

        const {
            plaka,
            musteriList
        } = this.state;


        return (

            <div className="musteri-auth">
                <div className="form-group">
                    <label>plaka no giriniz:</label>
                    <input type="text" className="form-control" onChange={this.changePlaka} value={plaka} />
                </div>
                <button type="submit" className="buttons" onClick={() => this.searchRequest()}>ara</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                ad
                            </th>
                            <th>
                                soyad
                            </th>
                            <th>
                                telefon
                            </th>
                            <th>
                                plaka
                            </th>
                            <th>
                                mail
                            </th>
                            <th>
                            şifre
                            </th>
                            <th>
                                düzenle
                            </th>
                            <th>
                                sil
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {musteriList.map(e =>
                            <tr key={e.musteriId}>
                                <td>{e.musteriAd}</td>
                                <td>{e.musteriSoyad}</td>
                                <td>{e.musteriTel}</td>
                                <td>{e.musteriPlaka}</td>
                                <td>{e.musteriMail}</td>
                                <td>{e.password}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(e)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16">
                                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                                        </svg>
                                    </button>
                                </td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(e)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-x-fill" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button type="submit" className="buttons" onClick={() => this.props.history.push("sign-up")}>Müşteri Kayıt et </button>
            </div>
        );
    }
}