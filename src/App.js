import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Searchlist from './Searchlist.js'
import Main from './Main.js'
import ReactDOM from 'react-dom';
import logo from './images/logo_main.png'
import Navigation from './Navigation'
import Search from './Search'
import { withAuthenticator } from '@aws-amplify/ui-react'

class App extends Component {

  constructor(props) {
  super(props);
  this.state = {
    isLoaded: true,
    items: []
  };

  }

  search = (content) => {
    console.log(content);
    var key = 'R24LKU7C5EHKA27A';
    var keyword = content;
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
      <div id="wrap">
          <div id="main_nav">
          <Navigation search={this.search}/>
          </div>
          <div id="logo_main" className="container">
          <img src={logo} className="img-fluid" alt="logo"></img>
          </div>
          <div id="search_responsive" className="container">
          <Search search={this.search}/>
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
