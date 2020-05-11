import React, { Component } from 'react';
import './Main.css';
import Newslist from './Newslist.js'

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    var key = "12153b9a22f44a56b7ff95b02f12c9cd";
    var keyword = encodeURIComponent(this.props.keyword.trim());
    var url = 'http://newsapi.org/v2/everything?q=' + '"' + keyword + '"' + '&from=2020-04-11&sortBy=popularity&apiKey='+ key;
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded:true,
            items:result.articles
          });
        },
        (error) => {

        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="row">
            <div className="col-sm-6">

            </div>
            <div className="col-sm-6">
              <div className="row">
                <Newslist items={this.state.items}/>
              </div>
            </div>
        </div>
      );
    }
  }
}

export default Main;
