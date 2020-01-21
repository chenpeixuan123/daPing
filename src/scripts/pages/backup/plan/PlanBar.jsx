import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'components/common/ProgressBar';

class PlanBar extends Component {

  render() {
    let barW = 840;
    let barH = 45;

    let curPos = barW * this.props.curR;
    // let planPos = barW * this.props.planR;

    let curStyle, planStyle;
    if (curPos < 100) {
      curStyle = { display: "block", position: "absolute", width: 80, left: curPos + 55, top: 20, transform: 'translateX(-50%)' };
    } else if (curPos > barW - 70) {
      curStyle = { display: "block", position: "absolute", width: 80, left: curPos - 40, top: 20, transform: 'translateX(-50%)' };
    } else {
      curStyle = { display: "block", position: "absolute", width: 80, left: curPos, top: 0, transform: 'translateX(-50%)' };
    }
    // if (planPos < 110) {
    //   planStyle = { display: "block", position: "absolute", width: 80, left: planPos + 55, bottom: 15, transform: 'translateX(-50%)' };
    // } else if (planPos > barW - 120) {
    //   planStyle = { display: "block", position: "absolute", width: 80, left: planPos - 40, bottom: 15, transform: 'translateX(-50%)' };
    // } else {
    //   planStyle = { display: "block", position: "absolute", width: 80, left: planPos, bottom: 0, transform: 'translateX(-50%)' };
    // }

    // let progressColor = '#ff7900';
    let progressColor = '#349e14';
    // if(this.props.over){
    //   progressColor = '#ff7900';
    // }

    return (
      <div style={{ position: 'relative', height: 120 }}>
        <ProgressBar style={{ position: 'absolute', left: 0, top: 41 }}
          barStyle={{
            width: barW, height: barH, borderRadius: 27,
            boxShadow: '0px -1px 1px 0px rgba(255,255,255,0.6) inset,0px 0px 10px 1px rgba(0,0,0,0.5) inset',
          }}
          progressStyle={{
            backgroundColor: progressColor,
            borderTopLeftRadius: 27,
            borderBottomLeftRadius: 27,
            boxShadow: '1px 5px 5px 0px rgba(0,0,0,0.2) inset,1px -5px 5px 0px rgba(0,0,0,0.2) inset',
          }}
          r1={0} r2={this.props.curR} />
        <img style={{ position: "absolute", left: curPos, top: 30, transform: 'translateX(-50%)' }}
          src={window.dominContext.staticPath + '/assets/images/dataMigration/curBar.png'}
          alt="当前进度"
        />
        {/* <img style={{ position: "absolute", left: planPos, bottom: 25, transform: 'translateX(-50%)' }}
          src={window.dominContext.staticPath + '/assets/images/dataMigration/planBar.png'}
          alt="计划进度" /> */}
        <span style={curStyle} >当前进度</span>
        {/* <span style={planStyle} >计划进度</span> */}

      </div>
    );
  }
};

PlanBar.protoTypes = {
  curR: PropTypes.number,
  // planR: PropTypes.number
}
PlanBar.defaultProps = {
  curR: 0,
  // planR: 0
};

export default PlanBar;
