import React, { Component } from 'react';
import './css/Newsitem.css'
import moment from 'moment'

class Newsitem extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="col-sm-6 mt-4 d-flex align-items-stretch" onClick={() => {
        window.open(this.props.link);
      }}>
        <div className="card">
          <img className="card-img-top" src={this.props.picture} alt="Card image cap"></img>
          <div className="card-body">
            <h5 className="card-title">{this.props.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{moment.unix(this.props.author).format('MM-DD-YYYY')}</h6>
            <p className="card-text">{this.props.description}</p>
            </div>
          </div>
        </div>
    );
  }
}

export default Newsitem;
