import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Searchlist from './Searchlist.js'
import Main from './Main.js'
import ReactDOM from 'react-dom';
import logo from './images/logo.png'
import Navigation from './Navigation'
import { withAuthenticator } from '@aws-amplify/ui-react'

class App extends Component {

  constructor(props) {
  super(props);
  this.state = {
    isLoaded: true,
    items: []
  };

  }

  search = () => {
    var key = 'R24LKU7C5EHKA27A';
    var keyword = this.textInput.value;
    var url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + keyword + "&apikey=" + key;

  fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result.bestMatches);
        console.log(result);
        if(result.bestMatches == null){
          this.setState({
            isLoaded:true,
            items:[]
          });
        }
        else {
          this.setState({
            items:result.bestMatches
          });
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  main = (stock,t) => {
    console.log(t);
    ReactDOM.render(
      <React.StrictMode>
        <Main keyword={stock} ticker={t}/>
      </React.StrictMode>,
      document.getElementById('root')
    )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Navigation/>
          <div id="logo_main">
            <img src={logo}  className="img-responsive" alt="logo"></img>
          </div>
          <div id="search" className="input-group">
            <input className="form-control" type="text" ref={(input) => this.textInput = input} placeholder="Search" aria-label="Search"></input>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={this.search}>Search</button>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <Searchlist items={this.state.items} navigate={this.main} />
            </div>
          </div>
        </div>
      );
    }
  }
}
export default App
