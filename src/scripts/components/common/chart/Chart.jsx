import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import echarts from 'echarts/lib/echarts';
class Chart extends Component {
  constructor(props) {
    super(props);
    this.handleClick=this.handleClick.bind(this);
  };

  componentDidMount() {
    this.chart = echarts.init(this.chartDiv);
    if(this.props.getChart){
      this.props.getChart(this.chart);
    }

    this.chart.setOption(this.props.option);
    this.chart.on('click',function (params) {
      // this.props.setParentSate();
      alert(params.name);
    });
  }
  componentWillUnmount() {
    this.chart.clear();
    this.chart.dispose();
    this.chartDiv = null;
    }

  componentWillReceiveProps(nextProps) {
    if (this.chart) {
      this.chart.resize();
      if (!R.equals(nextProps, this.props)) {
        this.chart.setOption(nextProps.option);
      }else{
        if(this.props.autoAnimate){
          let tempOp = this.chart.getOption();
          this.chart.clear();
          this.chart.setOption(tempOp);
        }
      }
    }
  }
  render() {
    return (
      <div ref={(chartDiv)=>{this.chartDiv=chartDiv;}}
           style={this.props.style} className = {this.props.className}
      >
      </div>
    );
  }
};

Chart.propTypes = {
  option: PropTypes.object.isRequired
}

export default Chart;
