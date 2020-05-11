import React, { Component } from 'react';
import './Main.css';
import Newslist from './Newslist.js'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

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

    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.paddingRight = 20;

    let data = [];
    let visits = 10;
    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";

    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    this.chart = chart;
  }

  componentWillUnmount() {
   if (this.chart) {
     this.chart.dispose();
   }
 }

  render() {
      return (
        <div className="row">
            <div className="col-sm-6">
              <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
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
