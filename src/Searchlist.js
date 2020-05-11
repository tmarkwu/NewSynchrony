import React, { Component } from 'react';
import Searchitem from './Searchitem.js';

class Searchlist extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      this.props.items.map((item) => (
        <Searchitem navigate={this.props.navigate} name={item["2. name"]} symbol={item["1. symbol"]} type={item["3. type"]} region={item["4. region"]}/>
      ))
    );
  }
}

export default Searchlist;
