import React, { Component } from 'react';
import Carousel from './Carousel';
import R from 'ramda';

class SystemNotice extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }
  render() {
    let s = [];
    if (this.props.data) {
      this.props.data.map((item, idx) => {
        s.push(<span key={item.name + idx} style={{ marginRight: 30 }}>
          <span style={{ marginRight: 15 }}>{item.name}</span>
          {"当日交易量"}
          <span style={{ marginLeft: 10, fontSize: 30, fontFamily: "黑体" }}>{item.value}</span>
        </span>);
      });
    }
    return (
      <div className={this.props.className} style={this.props.style}>
        <Carousel style={{ display: 'inline-block', fontFamily: '微软雅黑', fontSize: 18, width: 788, height: 40, verticalAlign: 'middle' }} data={s} />
      </div>
    );
  }
}

export default SystemNotice;