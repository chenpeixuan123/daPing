import React, { Component } from 'react';
import ProgressBar from 'components/common/ProgressBar';
import R from 'ramda';

class MilestoneBar extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }
  render() {
    let barW = this.props.barW;
    let barH = this.props.barH;
    let barTop = this.props.barTop;
    let progColor = this.props.progColor;
    let progRadius = this.props.progRadius;
    let imgTop = this.props.imgTop;
    let imgSrc = this.props.imgSrc;

    let r = this.props.cur / this.props.all;
    let curPos = barW * r;

    return (
      <div style={this.props.style}>
        <ProgressBar style={{ position: 'absolute', left: 0, top: barTop }}
          barStyle={{
            width: barW, height: barH, borderRadius: progRadius,
            boxShadow: '0px -1px 1px 0px rgba(255,255,255,0.6) inset,0px 0px 10px 1px rgba(0,0,0,0.5) inset',
          }}
          progressStyle={{
            backgroundColor: progColor,
            borderTopLeftRadius: progRadius,
            borderBottomLeftRadius: progRadius,
            boxShadow: '1px 5px 5px 0px rgba(0,0,0,0.2) inset,1px -5px 5px 0px rgba(0,0,0,0.2) inset',
          }}
          r1={0} r2={r} />

        {r < 1 ? <img style={{ position: "absolute", left: curPos, top: imgTop, transform: 'translateX(-50%)' }}
          src={imgSrc}
          alt="当前进度"
        /> : null}

        {r < 1 ? <span style={{
          display: "block",
          position: "absolute",
          width: 80,
          left: curPos,
          top: 0,
          fontFamily: "Arial Black",
          fontSize: 20,
          textAlign: 'center',
          transform: 'translateX(-50%)'
        }}>
          {this.props.cur}
        </span> : null}

      </div>
    );
  }
}


export default MilestoneBar;