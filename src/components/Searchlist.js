import React, { Component } from 'react';
import Searchitem from './Searchitem.js';
import Navigation from './Navigation';
import ReactDOM from 'react-dom';
import Resultlist from './Resultlist'
import Search from './Search'
import './css/Searchlist.css'
import logo from './images/logo_navbar.png';


class Searchlist extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div id="search-list">
        <div id="n">
        <Navigation/>
        </div>
        <div id="result-list">
          <div className="container">
          <div id="search-text">Showing {this.props.items.length} results:</div>
          </div>
          <Resultlist items={this.props.items}/>
        </div>
      </div>
    );
  }
}

export default Searchlist;
