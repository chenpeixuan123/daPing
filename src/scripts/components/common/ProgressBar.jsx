import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

class ProgressBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let barStyle = R.merge({
      width: 610,
      height: 17,
      // backgroundColor: "#2D4160",
      borderRadius: 8,
      borderTop: '1px solid #000',
      boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.5) inset,-1px -1px 1px 0px rgba(255,255,255,0.3) inset',
      overflow: 'hidden'
    }, this.props.barStyle);

    let s = R.merge(this.props.style,{position: 'relative'});

    let barW = barStyle.width;
    let r1Pos = barW * this.props.r1;
    let r2Pos = barW * this.props.r2;

    let fromPos, toPos;
    if (r1Pos < r2Pos) {
      fromPos = r1Pos;
      toPos = r2Pos;
    } else {
      fromPos = r2Pos;
      toPos = r1Pos;
    }
    let progressStyle = R.mergeAll([{
      backgroundColor: '#ff7900',
      height: barStyle.height + this.props.progressOffH,
      boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.5) inset,-1px -1px 1px 0px rgba(255,255,255,0.3) inset',
    }, this.props.progressStyle, { marginLeft: fromPos, width: toPos - fromPos }]);

    return (
      <div style={s}>
        <div style={barStyle}>
          <div style={progressStyle}></div>
        </div>
      </div>
    );
  }
}

ProgressBar.protoTypes = {
  r1: PropTypes.number,
  r2: PropTypes.number,
  progressOffH: PropTypes.number,
}
ProgressBar.defaultProps = {
  r1: 0,
  r2: 0,
  progressOffH: -2
};

export default ProgressBar;
