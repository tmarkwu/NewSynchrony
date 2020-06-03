import React, { Component } from 'react';
import Newsitem from './Newsitem.js';

class Newslist extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      this.props.items.map((item) => (
        <Newsitem title={item.headline} author={item.datetime} picture={item.image} description={item.summary} link={item.url}/>
      ))
    );
  }
}

export default Newslist;
