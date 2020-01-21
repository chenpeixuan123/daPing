import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import echarts from 'echarts/lib/echarts';
// import 'echarts/lib/chart/pie';
// import 'echarts/lib/chart/bar';
// import 'echarts/lib/chart/line';
// import 'echarts/lib/chart/lines';
// import 'echarts/lib/chart/radar';
// import 'echarts/lib/chart/gauge';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/legend';
// import 'echarts/lib/component/markLine';
// import 'echarts/lib/component/graphic';
// import 'echarts/lib/component/axisPointer';

class Chart extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.chart = echarts.init(this.chartDiv);
    if(this.props.getChart){
      this.props.getChart(this.chart);
    }

    this.chart.setOption(this.props.option);
  }
  componentWillUnmount() {
    this.chart.clear();
    this.chart.dispose();
    this.chartDiv = null;
    // Chart.on('click'.this.handleClick);
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
