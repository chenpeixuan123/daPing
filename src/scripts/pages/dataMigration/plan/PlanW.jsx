import React, { Component } from 'react';
import Plan from './Plan';
import moment from 'moment';

class PlanW extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let tPlanStartTime = this.props.plan.planStartTime;
    let tPlanEndTime = this.props.plan.planEndTime;
    let tActSendTime = this.props.plan.actSendTime;
    let tActFinishTime = this.props.plan.actFinishTime;
    let over = false;

    let curR, planR,startTimeStr,endTimeStr;

    if(tActSendTime == null){//尚未开始
      curR = 0;
      planR = 0;
      startTimeStr = this.props.plan.planStartTimeStr;
      endTimeStr = this.props.plan.planEndTimeStr
    }else{      
      startTimeStr = this.props.plan.actSendTimeStr;
      endTimeStr = this.props.plan.planEndTimeStr

      let tNow = this.props.curTime;

      let allCount = this.props.taskList.length;
      let planC = 0,actC = 0;
      for(let i=0;i<allCount;i++){
        let taskObj = this.props.taskList[i];
        if(tNow>=moment(taskObj["PlAN_END_TIME"])){
          planC+=1;
        }
        if(taskObj["TASK_SEND_STATUS"]=="3"){
          actC += 1;
        }
      }
      if(allCount>0){
        curR = actC/allCount;
        planR = planC/allCount;
      }else{
        curR = 1;
        planR = 1;
      }
      
    
      // let plan = tPlanEndTime - tPlanStartTime;
      // if (tActFinishTime == null) {
      //   curR = (tNow - tActSendTime) / plan;
      //   if (curR > 1) {
      //     curR = 1;
      //     over = true;
      //   }
      // } else {
      //   curR = 1;
      // }

      // if(plan==0){
      //   planR = 1;
      // }else{
      //   planR = (tNow - tPlanStartTime) / plan;
      //   if (planR > 1) {
      //     planR = 1;
      //   }
      // }
    }

    

    return (
      <Plan className={this.props.className} curR={curR} planR={planR} startTime={startTimeStr} endTime={endTimeStr} over={over} />
    );
  }

}

export default PlanW;