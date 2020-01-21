import React, { Component } from 'react';
import style from './style.css';
import Tools from 'utils/Tools';
import TimeItem from './TimeItem';
import R from 'ramda';

class TimeItems extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }
  render() {
    let tPlanStartTime = this.props.plan.planStartTime;
    let tPlanEndTime = this.props.plan.planEndTime;
    let tActSendTime = this.props.plan.actSendTime;
    let tActFinishTime = this.props.plan.actFinishTime;

    let plan = tPlanEndTime - tPlanStartTime;
    let has = 0, left = 0, off = 0;

    if (tActSendTime == null) {//尚未开始
      left = plan;
    } else if (tActFinishTime == null) {//正在进行
      let tNow = this.props.curTime;
      has = tNow - tActSendTime;
      if(has<0){has=0;}
      left = plan - has;
      if (left < 0) {
        left = 0;
      }
      off = tPlanStartTime - tActSendTime;
    } else {//已经完成
      has = tActFinishTime - tActSendTime;
      if(has<0){has=0;}
      left = 0;
      let hasDelay = tActFinishTime - tActSendTime;
      off = hasDelay - plan;
    }

    let offS;
    if (off > 0) {
      offS = Tools.timeFormat(off, "+h:mm:ss`");
    } else {
      offS = Tools.timeFormat(-off, "-h:mm:ss`");
    }


    return (
      <div className={this.props.className}>
        <TimeItem className={this.props.itemClassName} title={"预计总用时"} time={Tools.timeFormat(plan, "h:mm:ss`")} off={offS} showOff={false} />
        <TimeItem className={this.props.itemClassName} title={"已用时"} time={Tools.timeFormat(has, "h:mm:ss`")} off={0} showOff={false} />
        <TimeItem className={this.props.itemClassName} title={"剩余用时"} time={Tools.timeFormat(left, "h:mm:ss`")} off={0} showOff={false} />
      </div>
    );
  }

}

export default TimeItems;