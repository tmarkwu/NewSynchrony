import React, { Component } from 'react';
import Searchitem from './Searchitem';
import Main from './Main';
import ReactDOM from 'react-dom';

class Resultlist extends Component {

  constructor(props){
    super(props);
  }

  main = (stock,t) => {
    ReactDOM.render(
      <React.StrictMode>
        <Main keyword={stock} ticker={t}/>
      </React.StrictMode>,
      document.getElementById('root')
    )
  }

  render() {
    return (
        this.props.items.map((item) => (
          <Searchitem navigate={this.main} name={item["2. name"]} ticker={item["1. symbol"]}/>
        ))
    );
  }
}


export default Resultlist
