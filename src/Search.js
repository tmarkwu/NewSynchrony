import React, { Component } from 'react';
import logo from './images/logo_navbar.png'
import './Search.css'
import ReactDOM from 'react-dom';
import Searchlist from './Searchlist'


class Search extends Component {

  constructor(props) {
  super(props);
  this.state = {
    input: "",
    items: []
  };
  }

  handleChange = (e) => {
    this.setState({input: e.target.value});
  }

  search = () => {
    var key = 'R24LKU7C5EHKA27A';
    var keyword = this.state.input;
    var url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + keyword + "&apikey=" + key;

  fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
          if(result.bestMatches.length < 1){
            alert("No Results Found")
          }
          else{
          var filtered = result.bestMatches.filter((item) => {
            return (item['3. type'] == "Equity" && item['4. region'] == "United States");
          });

          console.log(filtered);
          ReactDOM.render(
            <React.StrictMode>
              <Searchlist items={filtered}/>
            </React.StrictMode>,
            document.getElementById('root')
          )
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  render(){
    return(
        <div className="input-group">
          <input className="form-control" type="text" onChange={this.handleChange} placeholder="Symbol or Keyword" aria-label="Search"></input>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={this.search}>Search</button>
          </div>
        </div>
    );
  }
}

export default Search;
