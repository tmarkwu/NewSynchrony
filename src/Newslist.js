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
        <Newsitem title={item.title} author={item.author} picture={item.urlToImage} description={item.description} link={item.url}/>
      ))
    );
  }
}

export default Newslist;
