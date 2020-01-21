import React, { Component } from 'react';
import Carousel from './Carousel';
import R from 'ramda';

class SystemNotice extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }
  render() {
    let s = "";
    if (this.props.data) {
      this.props.data.map((item) => { s += item.CONTENT });
    }
    return (
      <div className={this.props.className} style={this.props.style}>
        <h2 style={{ fontFamily: '黑体', fontSize: 24, display: 'inline-block', verticalAlign: 'middle' }}>系统通告：</h2>
        <Carousel style={{ display: 'inline-block', fontFamily: '黑体', fontSize: 24, width: 1370, height:27,verticalAlign: 'middle' }} data={s} />
      </div>
    );
  }
}

export default SystemNotice;