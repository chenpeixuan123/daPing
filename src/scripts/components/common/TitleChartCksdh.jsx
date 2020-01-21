import React, { Component } from 'react';
import Chart from './Chart.jsx';

class TitleChartCksdh extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
         <h3 className={this.props.titleClassName} style={this.props.titleStyle}>{this.props.title}<span style={this.props.titleStylesm}>{this.props.title_sm}</span></h3>
         <Chart className={this.props.chartClassName} style={this.props.chartStyle} option={this.props.option} autoAnimate = {this.props.autoAnimation}/>
      </div>
    );
  }
};
TitleChartCksdh.defaultProps = {
  autoAnimation:false
}
export default TitleChartCksdh;
