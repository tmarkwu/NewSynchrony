import React, { Component } from 'react';
import logo from './images/logo_navbar.png'
import './Search.css'


class Search extends Component {

  constructor(props) {
  super(props);
  this.state = {
    input: ""
  };
  }

  handleChange = (e) => {
    this.setState({input: e.target.value});
  }

  render(){
    return(
        <div className="input-group">
          <input className="form-control" type="text" onChange={this.handleChange} placeholder="Symbol or Keyword" aria-label="Search"></input>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={this.props.search.bind(this,this.state.input)}>Search</button>
          </div>
        </div>
    );

  }
}

export default Search;
