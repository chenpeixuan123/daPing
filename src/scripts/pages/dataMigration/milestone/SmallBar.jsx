import React, { Component } from 'react';
import ProgressBar from 'components/common/ProgressBar';
import R from 'ramda';

class SmallBar extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }
  render() {
    let barW = 168;
    let barH = 6;

    let r = this.props.cur/this.props.all;
    let curPos = barW * r;

    return (
      <div style={this.props.style}>
        <ProgressBar style={{ left: 0, top: 0, width: barW, height: barH, transformOrigin: 'left top', transform: 'rotate(-90deg) translateX(-100%)' }}
          barStyle={{
            backgroundColor: '#000',
            width: barW, height: barH, borderRadius: 3,
            boxShadow: 'none',
            borderTop: 'none'
          }}
          progressStyle={{
            backgroundColor: '#2b9916',
            //borderTopLeftRadius: progRadius,
            //borderBottomLeftRadius: progRadius,
            boxShadow: 'none',
          }}
          progressOffH={0}
          r1={0} r2={r} />

        <img style={{
          position: "absolute", bottom: curPos - 7, left: 0, width: 13, height: 11, maxWidth: 'none'
        }}
          src={window.dominContext.staticPath + '/assets/images/dataMigration/smallBar.png'}
          alt="当前进度"
        />

        <span style={{
          display: "block",
          position: "absolute",
          width: 40,
          left: 30,
          bottom: curPos - 9,
          fontSize: 18,
          textAlign: 'left',
        }}>
          {r < 1 ? (Math.floor(r * 100) + "%") : "完成"}
        </span>

      </div>
    );
  }
}


export default SmallBar;