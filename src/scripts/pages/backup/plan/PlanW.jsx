import React, { Component } from 'react';
import Plan from './Plan';

class PlanW extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let curR = this.props.cur/this.props.all;

    return (
      <Plan className={this.props.className} curR={curR} startTime={this.props.startTime}/>
    );
  }

}

export default PlanW;