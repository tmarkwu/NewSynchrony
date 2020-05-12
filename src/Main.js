import React, { Component } from 'react';
import './Main.css';
import Newslist from './Newslist.js'
import Chart from './Chart.js'
import TradingViewWidget from 'react-tradingview-widget';

class Main extends Component {

  constructor(props) {
    super(props);
    this._ref = React.createRef();
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    var key = "12153b9a22f44a56b7ff95b02f12c9cd";
    var keyword = encodeURIComponent(this.props.keyword.trim());
    var url = 'https://newsapi.org/v2/everything?q=' + '"' + keyword + '"' + '&from=2020-04-11&sortBy=popularity&apiKey='+ key;
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

      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js'
      script.async = true;
      script.innerHTML = JSON.stringify({"symbol": "NASDAQ:" + this.props.ticker,
                    "width": 1000,
                    "locale": "en",
                    "colorTheme": "light",
                    "isTransparent": false})
      document.getElementById("myContainer").appendChild(script);
  }

  render() {
      return (
        <div className="row">
            <div className="col-sm-6">

              <div id="myContainer">
                <div className="tradingview-widget-container">
                   <div className="tradingview-widget-container__widget">
                    </div>
                </div>
              </div>

              <TradingViewWidget symbol={"NASDAQ:" + this.props.ticker}/>

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

export default Main;
