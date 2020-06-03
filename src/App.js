import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Searchlist from './components/Searchlist.js'
import Main from './components/Main.js'
import ReactDOM from 'react-dom';
import logo from './components/images/logo_main.png'
import Navigation from './components/Navigation'
import Search from './components/Search'
import { withAuthenticator } from '@aws-amplify/ui-react'

class App extends Component {

  constructor(props) {
  super(props);
  this.state = {
    isLoaded: true,
    items: []
  };

  }

  render() {
      return (
    <div>
      <div id="wrap">
          <div id="main_nav">
          <Navigation/>
          </div>
          <div id="logo_main" className="container">
          <img src={logo} className="img-fluid" alt="logo"></img>
          </div>
          <div id="search_responsive" className="container">
            <Search search={this.search}/>
          </div>
        </div>

        <div id="change-log">
            <p id="v-title" className="h1 text-center">Versioning</p>
            <div className="card bg-light text-dark version-card">
                <div className="card-body">
                  <h5 className="card-title">1.3.1</h5>
                  <h6 className="card-subtitle mb-2 text-muted">6-2-2020</h6>
                  <p className="card-text">
                  <ul>
                    <dd>{"- Updated News Search endpoint to finnhub.io due to header configuration issues"}</dd>
                    <dd>{"- Filtered search results to only US-based Equities"}</dd>
                    <dd>{"- Sort functionality is temporarily removed, search increments altered"}</dd>
                  </ul>
                  </p>
                </div>
              </div>
            <div className="card bg-light text-dark version-card">
                <div className="card-body">
                  <h5 className="card-title">1.3.0</h5>
                  <h6 className="card-subtitle mb-2 text-muted">5-29-2020</h6>
                  <p className="card-text">
                  <ul>
                    <dd>{"- The Reddit search feature has arrived! Additional sorting options availible soon."}</dd>
                    <dd>{"- Scrolling enabled to view media sources"}</dd>
                    <dd>{"- Top 25 reddit posts relavant to company now displayed in the reddit tab"}</dd>
                  </ul>
                  </p>
                </div>
              </div>
            <div className="card bg-light text-dark version-card">
                <div className="card-body">
                  <h5 className="card-title">1.2.1</h5>
                  <h6 className="card-subtitle mb-2 text-muted">5-22-2020</h6>
                  <p className="card-text">
                  <ul>
                    <dd>{"- Added support for New York Stock Exchange Symbols (NYSE) and Toronto Stock Exchange. More exchange platforms will be added soon."}</dd>
                    <dd>{"- News can now be filtered by date and sorted by date/popularity"}</dd>
                    <dd>{"- Added a separate search result page from the main screen"}</dd>
                    <dd>{"- Added simple error handling for empty search results"}</dd>
                    <dd>{"- Change log transferred/hyperlinked"}</dd>
                  </ul>
                  </p>
                </div>
              </div>

              <div className="card bg-light text-dark version-card">
                  <div className="card-body">
                    <h5 className="card-title">1.2.0</h5>
                    <h6 className="card-subtitle mb-2 text-muted">5-14-2020</h6>
                    <p className="card-text">
                    <ul>
                      <dd>{"- Search bar responsive layout altered on mobile"}</dd>
                      <dd>{"- News Description edited to include character length"}</dd>
                      <dd>{"- Home page rework completed with navbar"}</dd>
                    </ul>
                    </p>
                  </div>
                </div>
              <div className="card bg-light text-dark version-card">
                <div className="card-body">
                  <h5 className="card-title">1.0.0</h5>
                  <h6 className="card-subtitle mb-2 text-muted">5-9-2020</h6>
                  <p className="card-text">Initial release of NewSynchrony</p>
                </div>
                </div>
        </div>
      </div>
      );
  }
}
export default App;
