import React, { Component } from 'react';
import Prog from './Prog';
import R from 'ramda';
import moment from 'moment';
class Item extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }
  render() {
    let data = this.props.data;

    let name = data.name;
    let r = data.percent;

    let radioS = r==1?"完成":Math.floor(r * 100) + "%";
    let txtColor = '#39ad15';
   
    return (
      <div className={this.props.className} style={{ width: 855, height: 40, paddingTop: 5, paddingLeft: 50, border: '1px solid #6e8b99', borderRadius: 5 }}>
        {/* <span style={{
          display: 'inline-block',
          width: 50,
          fontFamily: "黑体",
          fontSize: 20,
          color: '#39ad15',
        }}>
          {data.LABEL_NO}
        </span> */}
        <span style={{
          display: 'inline-block',
          width: 324,
          fontFamily: "黑体",
          fontSize: 20,
          color: '#39ad15',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {name}
        </span>
        <Prog style={{ display: 'inline-block' }} r={r} timeOut={false} />
        <span style={{
          display: 'inline-block',
          width: 70,
          textAlign: 'right',
          fontFamily: "黑体",
          fontSize: 20,
          color: txtColor
        }} >
          {radioS}
        </span>
      </div>
    );
  }
}

export default Item;