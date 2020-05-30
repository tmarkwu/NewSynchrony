import React, { Component } from 'react';
import './Main.css';
import Newslist from './Newslist.js'
import TradingViewWidget from 'react-tradingview-widget';
import Navigation from './Navigation.js'
import moment from 'moment'
import RedditList from './RedditList.js'

class Main extends Component {

  constructor(props) {
    super(props);
    this._ref = React.createRef();
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      reddit: [],
      value: ""
    };
  }

  fetchReddit = () => {
      var keyword = encodeURIComponent(this.props.keyword.trim());
      var url = "https://www.reddit.com/r/all/search.json?q=" + keyword;

      fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result.data.children);
            this.setState({
              isLoaded:true,
              reddit:result.data.children
            });
          },
          (error) => {
              console.log(error);
          }
        )
  }

  fetchNews = () => {
    var key = "12153b9a22f44a56b7ff95b02f12c9cd";
    var keyword = encodeURIComponent(this.props.keyword.trim());
    var sort = document.getElementById("select-sort").value;
    var date = document.getElementById("select-time").value;

    if(date == "day"){
      date = moment().subtract(1,'d').format('YYYY-MM-DD');
    }
    else if (date == "week"){
      date = moment().subtract(1,'w').format('YYYY-MM-DD');
    }
    else {
      date = moment().subtract(1,'m').format('YYYY-MM-DD');
    }
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var url = proxyurl + 'https://newsapi.org/v2/everything?q=' + '"' + keyword + '"' + '&from=' + date + '&sortBy=' + sort + '&apiKey='+ key;

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
            console.log(error);
        }
      )
  }

  fetchStock = () => {
    var key = "bquqnj7rh5rcjefatevg";
    var url = "https://finnhub.io/api/v1/stock/profile2?symbol=" + this.props.ticker + "&token=" + key;
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          var v = "NASDAQ:" + this.props.ticker;
          console.log(result.exchange);
          if(result.exchange == "NEW YORK STOCK EXCHANGE, INC."){
            v = "NYSE:" + this.props.ticker;
          }
          else if (result.exchange == "TORONTO STOCK EXCHANGE")
          {
            v = "TSX:" + this.props.ticker;
          }

          this.setState({
            value: v
          });

          this.renderWidgets('https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js', "stock_overview", v);
          this.renderWidgets('https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js', "stock_profile", v);
          this.renderFinancial('https://s3.tradingview.com/external-embedding/embed-widget-financials.js', "stock_financials", v);
          this.renderWidgets('https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js', "stock_analysis", v);
        },
        (error) => {
            console.log(error);
        }
      )

  }

  componentDidMount() {
    this.fetchNews();
    this.fetchStock();
    this.fetchReddit();
  }

  renderFinancial = (src, id, v) => {
    try{
      const script = document.createElement('script');
      script.src = src;
      script.async = true
      script.innerHTML = JSON.stringify({"symbol": v,
                  "colorTheme": "light",
                  "isTransparent": false,
                  "largeChartUrl": "",
                  "displayMode": "regular",
                  "width": "100%",
                  "height": "100%",
                  "locale": "en"})
      document.getElementById(id).appendChild(script);
    }
    catch(err) {
      console.log("error");
    }
  }

  renderWidgets = (src, id, v) => {
    try{
      const script = document.createElement('script');
      script.src = src;
      script.async = true
      script.innerHTML = JSON.stringify({"symbol": v,
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
        <div id="main" className="row">
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
                          <TradingViewWidget colorTheme={"dark"} symbol={this.state.value} width={"100%"} length={"100%"}/>
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
                          <div className="container mt-3">
                            <span className="container">
                                  <span>Show results from the past: </span>
                                  <select onChange={this.fetchNews} className="form-news" id="select-time">
                                    <option value="day">Day</option>
                                    <option value="week">Week</option>
                                    <option value="month">Month</option>
                                  </select>
                            </span>
                            <span className="container">
                                  <span>Sort By: </span>
                                  <select onChange={this.fetchNews} className="form-news" id="select-sort">
                                    <option value="publishedAt">Date</option>
                                    <option value="popularity">Popularity</option>
                                    <option value="relevancy">Relevancy</option>
                                  </select>
                            </span>
                          </div>
                          <div className="row">
                            <Newslist items={this.state.items}/>
                          </div>
                      </div>
                      <div id="twitter" className="tab-pane fade">
                        Coming soon!
                      </div>
                      <div id="reddit" className="tab-pane fade">
                          <RedditList reddit={this.state.reddit}/>
                      </div>
              </div>
            </div>
        </div>
        </div>
      );
  }
}

export default Main;
