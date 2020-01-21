import React, { Component } from 'react';
import moment from 'moment';
import R from 'ramda';

class Timer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }

  render() {
    let data = "", time = "";
    let d = moment(this.props.curTime);
    data = d.format("YYYY MM/DD");
    time = d.format("HH:mm:ss");


    return (
      <div className={this.props.className} style={this.props.style}>
        <p style={{ fontFamily: 'Arial Regular', fontSize: 24 }}>{data}<span style={{ fontSize: 30, marginLeft: 15 }}>{time}</span></p>
      </div>
    );
  }
}

export default Timer;