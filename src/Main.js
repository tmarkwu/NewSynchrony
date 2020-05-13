import React, { Component } from 'react';
import './Main.css';
import Newslist from './Newslist.js'
import TradingViewWidget from 'react-tradingview-widget';
import Navigation from './Navigation.js'

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
    var url = 'https://newsapi.org/v2/everything?q=' + '"' + keyword + '"' + '&from=2020-04-12&sortBy=popularity&apiKey='+ key;
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

      this.renderWidgets('https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js', "stock_overview");
      this.renderWidgets('https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js', "stock_profile");
      this.renderFinancial('https://s3.tradingview.com/external-embedding/embed-widget-financials.js', "stock_financials");
      this.renderWidgets('https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js', "stock_analysis")
  }

  renderFinancial = (src, id) => {
    try{
      const script = document.createElement('script');
      script.src = src;
      script.async = true
      script.innerHTML = JSON.stringify({"symbol": "NASDAQ:" + this.props.ticker,
                  "colorTheme": "light",
                  "isTransparent": false,
                  "largeChartUrl": "",
                  "displayMode": "adaptive",
                  "width": "100%",
                  "height": "700",
                  "locale": "en"})
      document.getElementById(id).appendChild(script);
    }
    catch(err) {
      console.log("error");
    }
    }

  renderWidgets = (src, id) => {
    try{
      const script = document.createElement('script');
      script.src = src;
      script.async = true
      script.innerHTML = JSON.stringify({"symbol": "NASDAQ:" + this.props.ticker,
                    "width": "100%",
                    "height": "100%",
                    "locale": "en",
                    "colorTheme": "light",
                    "isTransparent": false})
      document.getElementById(id).appendChild(script);
    }
    catch(err) {
      console.log("error");
    }
    }


    myErrorHandler = (error: Error, componentStack: string) => {
      console.log(error);
    };


  render() {
      return (
        <div>
        <Navigation/>
        <div className="row">
            <div className="col-sm-6">
            <div id="stock_overview"></div>
            <nav className="nav nav-tabs nav-justified">
                <a className="nav-item nav-link active" data-toggle="tab" href="#overview">Overview</a>
                <a className="nav-item nav-link" data-toggle="tab" href="#profile">Profile</a>
                <a className="nav-item nav-link" data-toggle="tab" href="#financials">Financials</a>
                <a className="nav-item nav-link" data-toggle="tab" href="#analysis">Analyst Ratings</a>
              </nav>

              <div className="tab-content">
                      <div id="overview" className="tab-pane fade show active">
                          <TradingViewWidget colorTheme={"dark"} symbol={"NASDAQ:" + this.props.ticker} width={"100%"} length={"100%"}/>
                      </div>
                      <div id="profile" className="tab-pane fade">
                        <div id="stock_profile" style={{width: "100%", height: "80vh"}}>
                        </div>
                      </div>
                      <div id="financials" className="tab-pane fade">
                        <div id="stock_financials" style={{width: "100%", height: "75vh"}}>
                        </div>
                      </div>
                      <div id="analysis" className="tab-pane fade">
                        <div id="stock_analysis" style={{width: "100%", height: "85vh"}}>
                        </div>
                      </div>

              </div>
            </div>
            <div className="col-sm-6">
            <nav className="nav nav-tabs nav-justified">
                <a className="nav-item nav-link active" data-toggle="tab" href="#news">News</a>
                <a className="nav-item nav-link" data-toggle="tab" href="#twitter">Twitter</a>
                <a className="nav-item nav-link" data-toggle="tab" href="#reddit">Reddit</a>
              </nav>

              <div className="tab-content">
                      <div id="news" className="tab-pane fade show active">
                          <div className="row">
                            <Newslist items={this.state.items}/>
                          </div>
                      </div>
                      <div id="twitter" className="tab-pane fade">

                      </div>
                      <div id="reddit" className="tab-pane fade">

                      </div>
              </div>
            </div>
        </div>
        </div>
      );
  }
}

export default Main;
