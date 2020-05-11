import React, { Component } from 'react';
import './Searchitem.css'

class Searchitem extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
    <div className="col-sm-3 m-4 d-flex align-items-stretch">
      <div className="gradient-box">
        <div className="card-body" onClick={this.props.navigate.bind(this,this.props.name)}>
          <h5 className="card-title">{this.props.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{this.props.symbol}</h6>
          <p className="card-text">Type: {this.props.type}</p>
          <p className="card-text">Region: {this.props.region}</p>
        </div>
      </div>
    </div>
    );
  }
}

export default Searchitem;
