import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'components/common/ProgressBar';

class AllBar extends Component {

  render() {
    let barW = 415;
    let barH = 30;

    let r = this.props.cur / this.props.all;
    let curPos = barW * r;

    return (
      <div style={this.props.style}>
        <ProgressBar style={{ position: 'absolute', left: 0, top: 13 }}
          barStyle={{
            width: barW, height: barH, borderRadius: 15,
            boxShadow: '0px -1px 1px 0px rgba(255,255,255,0.6) inset,0px 0px 10px 1px rgba(0,0,0,0.5) inset',
          }}
          progressStyle={{
            backgroundColor: '#305875',
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
          }}
          r1={0} r2={r} />
        <img style={{ position: "absolute", left: curPos, top: 0, transform: 'translateX(-50%)' }}
          src={window.dominContext.staticPath + '/assets/images/dataMigration/allBar.png'}
          alt="当前进度"
        />
      </div>
    );
  }
};

AllBar.protoTypes = {
  curR: PropTypes.number
}
AllBar.defaultProps = {
  curR: 0
};

export default AllBar;
