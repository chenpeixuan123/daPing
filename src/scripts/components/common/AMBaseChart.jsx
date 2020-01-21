
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import 'amcharts3';
import 'amcharts3/amcharts/pie';

class AMBaseChart extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.chart = window.AmCharts.makeChart(this.chartdiv, R.clone(this.props.option));
    this.chart.dataProvider = this.props.dataProvider;
     this.delayDataRender();

    if (this.props.getChart) {
      this.props.getChart(this.chart);
    }
  }

    componentWillUnmount() {
      this.chart.clear();
      this.chart = null;
      clearTimeout(this.flag);
    };

    componentDidUpdate(prevProps, prevState) {    
      if (this.chart) {
        if (!R.equals(prevProps.option, this.props.option)) {
          this.chart.clear();
          this.chart = window.AmCharts.makeChart(this.chartdiv, R.clone(this.props.option));
          if (this.props.getChart) {
            this.props.getChart(this.chart);
          }
          this.chart.dataProvider = this.props.dataProvider;
            clearTimeout(this.flag);this.flag = setTimeout(this.delayDataRender,300);

        } else if (!R.equals(prevProps.dataProvider, this.props.dataProvider)) {  
          this.chart.dataProvider = this.props.dataProvider;
           clearTimeout(this.flag);this.flag = setTimeout(this.delayDataRender,300);
        }
      }  
    }
    delayDataRender = ()=>{
      this.chart.validateData();
    }

  render() {
    return (
      <div ref={(node) => this.chartdiv = node} style={this.props.style} className={this.props.className}>

      </div>
    )
  }
}
AMBaseChart.propTypes = {
  option: PropTypes.object.isRequired,
  dataProvider: PropTypes.array.isRequired
}

export default AMBaseChart;