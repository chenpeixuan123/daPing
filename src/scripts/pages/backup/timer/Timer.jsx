import React, { Component } from 'react';
import moment from 'moment';
import R from 'ramda';

class Timer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }

  render() {
    let data=moment(this.props.curTime*1000).format("YYYY MM/DD");
    let time=moment(this.props.curTime*1000).format("HH:mm:ss");
    // console.log(this.props.curTime);//用moment()时将 秒 转ms
    return (
      <div className={this.props.className} style={this.props.style}>
        <p style={{ fontFamily: 'Arial Regular', fontSize: 24 }}>{data}<span style={{ fontSize: 30, marginLeft: 15 }}>{time}</span></p>
      </div>
    );
  }
}

export default Timer;