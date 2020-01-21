import React, { Component } from 'react';
import AMBaseChart from './AMBaseChart.jsx';

class TitleAMChart extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
         <h3 className={this.props.titleClassName} style={this.props.titleStyle}>{this.props.title}</h3>
         <AMBaseChart className={this.props.chartClassName} style={this.props.chartStyle} option={this.props.option} dataProvider={this.props.dataProvider}/>
      </div>
    );
  }
};
export default TitleAMChart;
