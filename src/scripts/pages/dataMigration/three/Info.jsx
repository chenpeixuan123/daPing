import React, { Component } from 'react';
import Tools from 'utils/Tools';
import R from 'ramda';
import moment from 'moment';

class Info extends Component {
  constructor(props){
    super(props);
  }
  
  filterThreeTaskUnsend=(data)=>{
    if( this.props.data){
      return R.propEq('MILESTONE',  this.props.data.milestone, data) && R.propEq("CATALOG",  this.props.data.catalog, data) && R.propEq('TASK_SEND_STATUS', "0", data);
    }else{
      return false;
    }
  }
   filterThreeTaskWait=(data)=>{
    if( this.props.data){
      return R.propEq('MILESTONE',  this.props.data.milestone, data) && R.propEq("CATALOG",  this.props.data.catalog, data) && R.propEq('TASK_SEND_STATUS', "1", data);
    }else{
      return false;
    }
  }
  filterThreeTaskHas=(data)=>{
    if( this.props.data){
      return R.propEq('MILESTONE',  this.props.data.milestone, data) && R.propEq("CATALOG",  this.props.data.catalog, data) && R.propEq('TASK_SEND_STATUS', "3", data);
    }else{
      return false;
    }
  }

  render() {
    let catelogName="名称",milestoneName="里程碑名称",planTime=0,hasTime=0,leftTime=0,allCount=0,status = "正常",statusColor = '#ffffff';
    let o = this.props.data;
    if(o){
      planTime = moment(o.planEndTime) - moment(o.planStartTime);
       if(o.actFinishTime != "" && o.actFinishTime != null && o.CFinishCount==o.CCount){//已完成
         hasTime = moment(o.actFinishTime) - moment(o.actSendTime);
         leftTime = 0;
       }else{
        hasTime = this.props.curTime  - moment(o.actSendTime);
        if(hasTime<0)hasTime=0;
        leftTime = planTime - hasTime;
        if (leftTime < 0) {
          leftTime = 0;
          status = "超时";
          statusColor = '#ff7800';
        }
       }     
      allCount = o.CCount;
      catelogName = o.catalog;
      milestoneName = o.milestone;
    }     

    let unsendCount = R.filter(this.filterThreeTaskUnsend, this.props.taskList).length;    
    let waitCount =  R.filter(this.filterThreeTaskWait, this.props.taskList).length; 
    let hasCount = R.filter(this.filterThreeTaskHas, this.props.taskList).length;    
    let doingCount =  o?allCount-unsendCount-waitCount-hasCount:0;
   

    return (
      <div className={this.props.className} style={this.props.style}>
        <p style={{fontSize: 18,marginBottom:10}}><span style={{display:'inline-block', fontWeight: 'bold', fontSize: 30, width: 480, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: "ellipsis",verticalAlign:'bottom' }}>{catelogName}</span></p>
        <p style={{ fontFamily: '黑体', fontSize: 24, lineHeight: 1.5}}>子任务数：<span style={{ fontFamily: 'Arial Black', fontSize: 30 }}>{allCount}</span></p>
        <p style={{ fontFamily: '黑体', fontSize: 24, lineHeight: 1.5}}>所属里程碑：<span style={{display:'inline-block', fontWeight: 'bold',  fontFamily: 'Arial', fontSize: 24, width: 480-145, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: "ellipsis",verticalAlign:'bottom' }}>{milestoneName}</span></p>
        
        <p style={{  fontFamily: '黑体', fontSize: 24, lineHeight: 1.5 }}>当前状态：<span style={{  fontFamily: 'Arial', fontWeight: 'bold', fontSize: 24,color:statusColor }}>{status}</span></p>
        <p style={{ fontFamily: '黑体', fontSize: 24, lineHeight: 1.5 }}>
          计划用时：
          <span style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: 24, marginRight: 30 }}>{Tools.timeFormat(planTime, "h:mm:ss")}</span>


        </p>
        <p style={{ fontFamily: '黑体', fontSize: 24, lineHeight: 1.5 }}>
          已用时：
          <span style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: 24, marginRight: 30 }}>{Tools.timeFormat(hasTime, "h:mm:ss")}</span>
        </p>
        <p style={{ fontFamily: '黑体', fontSize: 24, lineHeight: 1.5,marginBottom:10 }}>
          剩余：
          <span style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: 24 }}>{Tools.timeFormat(leftTime, "h:mm:ss")}</span>
        </p>
        <div style={{ lineHeight: 2 }}>
          <p style={{ left: 70, top: 70, color: '#106407', display: 'inline-block', width: 200 }}>已完成：<span>{hasCount}</span></p>
          <p style={{ left: 260, top: 70, color: '#39ad15', display: 'inline-block' }}>执行中：<span>{doingCount}</span></p>
        </div>
        <div style={{ lineHeight: 2 }}>
          <p style={{ left: 450, top: 70, display: 'inline-block', width: 200 }}>待执行：<span>{waitCount}</span></p>
          <p style={{ left: 610, top: 70, display: 'inline-block' }}>未发送：<span>{unsendCount}</span></p>

        </div>

      </div>
    );
  }
}

export default Info;