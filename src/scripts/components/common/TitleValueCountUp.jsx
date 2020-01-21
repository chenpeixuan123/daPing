import React, { Component } from 'react';
import CountUp from 'react-countup';
class TitleValue extends Component {
  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
          <div className={this.props.titleClassName} style={this.props.titleStyle}>{this.props.title}</div>           
          <CountUp
            className={this.props.valueClassName}
            duration={this.props.duration}
            start={this.props.start}
            end={this.props.value}
            useEasing={this.props.useEasing}
            separator={this.props.separator}
            decimals={this.props.decimals}
            decimal={this.props.decimal}
            prefix={this.props.prefix}
            suffix={this.props.suffix}
          />
      </div>
    );
  }
};
TitleValue.defaultProps = {
  duration:2,
  start: 0,
  end: 0,
  decimals:1,
  decimal:".",
  useEasing:true,
  separator:",",
  prefix:"",
  suffix:""
};
export default TitleValue;
