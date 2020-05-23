import React, { Component } from 'react';
import './Searchitem.css'

class Searchitem extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="card-stock" onClick={this.props.navigate.bind(this,this.props.name,this.props.ticker)}>
        <div className="card">
            <div className="card-body">
              <h5 className="card-title">{this.props.ticker}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{this.props.name}</h6>
            </div>
        </div>
      </div>
    );
  }
}

export default Searchitem;
