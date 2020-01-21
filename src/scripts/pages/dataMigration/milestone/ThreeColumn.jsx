import React, { Component } from 'react';
import MilestoneItem from './MilestoneItem';
import R from 'ramda';

class ThreeColumn extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }

  render() {
    return (
      <div style={{ width: 2490 }}>
        <MilestoneItem style={{ display: 'inline-block', width: 830 }} data={this.props.data[0]} />
        <MilestoneItem style={{ display: 'inline-block', width: 830 }} data={this.props.data[1]} />
        <MilestoneItem style={{ display: 'inline-block', width: 830 }} data={this.props.data[2]} />
      </div>
    );
  }
}


export default ThreeColumn;