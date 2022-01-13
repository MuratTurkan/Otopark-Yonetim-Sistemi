import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Home from './components/home.component';
import YoneticiGiris from './components/yoneticiGiris.component';
import MusteriList from './components/musteriList.component';
import AboneGiris from './components/aboneGiris.component';
import MusteriDuzenle from './components/musteriDuzenle.component';
import Otopark from './components/otopark.component';
import Kesinlestir from './components/kesinlestir.component';
import YetkiliKesinlestir from './components/kesinlestirGorevli.component';
import Yonetici from './components/yonetici.component';
import YoneticiEkle from './components/yoneticiEkle.component';
import YoneticiDuzenle from './components/yoneticiDuzenle.component';
import Gorevli from './components/gorevli.component';
import gorevliEkle from './components/gorevliEkle.component';
import gorevliOtopark from './components/gorevliOtopark.component';
import gorevliDuzenle from './components/gorevliDuzenle.component';
import otoparkDuzenle from './components/otoparkDuzenle.component';
import Cikis from './components/cikis.component';

function App() {
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          {
            sessionStorage.getItem("IsLoggedIn") != "true" ? (
              console.log()
            ) : (

              sessionStorage.getItem("type") == "yonetici" ? (
                <div>
                  <Link className="navbar-brand" to={"/gorevli"}>Gorevli</Link>
                  <Link className="navbar-brand" to={"/yonetici"}>Yonetici</Link>
                  <Link className="navbar-brand" to={"/musteri"}>Musteri</Link>
                  <Link className="navbar-brand" to={"/gorevliOtopark"}>Otopark</Link>
                </div>
              ) : (
                sessionStorage.getItem("type") == "gorevli" ? (
                  <div>
                    <Link className="navbar-brand" to={"/musteri"}>Musteri</Link>
                    <Link className="navbar-brand" to={"/gorevliOtopark"}>Otopark</Link>
                  </div>

                ) : (
                  <Link className="navbar-brand" to={"/otopark"}>Otopark</Link>

                )
              )
            )
          }
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            {
              sessionStorage.getItem("IsLoggedIn") != "true" ? (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/"}>Otopark Yönetim</Link>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/cikis"}>Çıkış Yap</Link>

                  </li>
                </ul>
              )
            }
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path="/gorevliGiris" component={Login} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/yoneticiGiris" component={YoneticiGiris} />
          <Route path="/aboneGiris" component={AboneGiris} />
          <Route path="/musteri" component={MusteriList} />
          <Route path="/musteriDuzenle" component={MusteriDuzenle} />
          <Route path="/otopark" component={Otopark} />
          <Route path="/kesinlestir" component={Kesinlestir} />
          <Route path="/yetkiliKesinlestir" component={YetkiliKesinlestir} />
          <Route path="/yonetici" component={Yonetici} />
          <Route path="/yoneticiEkle" component={YoneticiEkle} />
          <Route path="/yoneticiDuzenle" component={YoneticiDuzenle} />
          <Route path="/gorevli" component={Gorevli} />
          <Route path="/gorevliEkle" component={gorevliEkle} />
          <Route path="/gorevliDuzenle" component={gorevliDuzenle} />
          <Route path="/gorevliOtopark" component={gorevliOtopark} />
          <Route path="/otoparkDuzenle" component={otoparkDuzenle} />
          <Route path="/cikis" component={Cikis} />
        </Switch>
      </div>
    </div></Router>
  );
}

export default App;
