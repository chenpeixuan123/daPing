import React, { Component } from 'react';
import SmallBar from './SmallBar';
import R from 'ramda';

class SmallItem extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }

  render() {
    let data = this.props.data;
    if (data == null) {
      return null;
    } else {
      return (
        <div className={this.props.className} style={this.props.style}>
          <span style={{
            display: 'block',
            fontSize: 16,
            lineHeight: 1,
            margin: '0 auto',
            textAlign: 'center'
          }}>{data.MCount}</span>
          <div style={{
            margin: '2px auto 0',
            paddingTop: 9,
            width: 42,
            height: 185,
            borderRadius: 5,
            boxShadow: '1px 1px 0px 0px rgba(0,0,0,0.3) inset,1px 0px 0px 0px rgba(255,255,255,0.3)',
            backgroundColor: '#051325'
          }}>
            <SmallBar style={{ position: 'relative', width: 6, height: 168, margin: "0 auto" }}
              cur={data.MFinishCount}
              all={data.MCount} />
          </div>

          <span style={{
            fontSize: 16,
            width: 100,
            height: 34,
            maxWidth:100,
            maxHeight:34,
            marginTop: 2,
            lineHeight: 1.1,
            textAlign: 'center',
            display: "-webkit-box",
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            //overflow: 'hidden',
            //textOverflow: "ellipsis", 
            //whiteSpace: "nowrap" 
          }}>
            {data.milestone}
          </span>
        </div>
      );
    }
  }
}


export default SmallItem;