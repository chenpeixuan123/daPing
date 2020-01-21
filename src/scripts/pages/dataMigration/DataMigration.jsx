import React, { Component } from 'react';
import style from './style.css';

//工具
import R from 'ramda';
import moment from 'moment';
import Tools from 'utils/Tools';
import FetchHelper from 'utils/FetchHelper';
//方法数据类
import DataCreater from './DataCreater';
import AnalogData from './AnalogData';

//组件
import Timer from './timer/Timer';
import SystemNotice from './systemNotice/SystemNotice';

import TimeItems from './timeItem/TimeItems';
import PlanW from './plan/PlanW';
import TaskComplate from './taskComplate/TaskComplate';

import SecondThird from './SecondThird';
import Milestones from './milestone/Milestones';

import Info from './info/Info';
import Over from './over/Over';

import Popup from 'components/common/popover/Popover';

class DataMigration extends Component {
  constructor(props) {
    super(props);
    window.share.resetPageSize(3840, 1080);
    this.timeOff = 0;
    this.state = {
      curTime: new Date().getTime() + this.timeOff,
      systemNotice: AnalogData.systemNotice.data,
      plan: DataCreater.createPlan(AnalogData.plan),
      taskComplate: {},
      taskList: [],
      milestones: [],
      secondInfo: []
    }
  }

  componentDidMount() {
    this.getDataSystemNotice();
    this.getDataPlan();
    this.getDataTaskComplate();
    this.getDataTaskList();
    this.getDataMilestones();
    this.getDataSecondInfo();

    this.flagSystemNotice = setInterval(this.getDataSystemNotice, window.locationConfig.controlPage.interface.systemNotice.loopTime);
    this.flagPlan = setInterval(this.getDataPlan, window.locationConfig.controlPage.interface.plan.loopTime);
    this.flagTaskComplate = setInterval(this.getDataTaskComplate, window.locationConfig.controlPage.interface.taskComplate.loopTime);
    this.flagTaskList = setInterval(this.getDataTaskList, window.locationConfig.controlPage.interface.taskList.loopTime);
    this.flagMilestones = setInterval(this.getDataMilestones, window.locationConfig.controlPage.interface.milestones.loopTime);
    this.flagSecondInfo = setInterval(this.getDataSecondInfo, window.locationConfig.controlPage.interface.secondInfo.loopTime);
    this.flagTime = setInterval(this.resetTime, 1000);
  }
  resetTime = () => {
    this.setState({ curTime: new Date().getTime() + this.timeOff });
  }

  componentWillUnmount() {
    clearInterval(this.flagSystemNotice);
    clearInterval(this.flagPlan);
    clearInterval(this.flagTaskComplate);
    clearInterval(this.flagTaskList);
    clearInterval(this.flagMilestones);
    clearInterval(this.flagSecondInfo);
    clearInterval(this.flagTime);
  }

  getDataSystemNotice = () => {
    if (window.locationConfig.debug) {
      this.updateDataSystemNotice(AnalogData.systemNotice);
    } else {
      // Tools.fetchData(window.locationConfig.interface.systemNotice.address,this.updateDataSystemNotice);
      fetch(window.locationConfig.controlPage.interface.systemNotice.address)
        .then(FetchHelper.checkStatus)
        .then(FetchHelper.parseJSON)
        .then(this.updateDataSystemNotice)
        .catch(FetchHelper.fetchDataFailed);
    }
  }

  getDataPlan = () => {
    if (window.locationConfig.debug) {
      this.updateDataPlan(AnalogData.plan);
    } else {
      Tools.fetchData(window.locationConfig.controlPage.interface.plan.address, this.updateDataPlan);
    }
  }

  getDataTaskComplate = () => {
    if (window.locationConfig.debug) {
      this.updateDataTaskComplate(AnalogData.taskComplate);
    } else {
      Tools.fetchData(window.locationConfig.controlPage.interface.taskComplate.address, this.updateDataTaskComplate);
    }
  }

  getDataTaskList = () => {
    if (window.locationConfig.debug) {
      this.updateDataTaskList(AnalogData.taskList);
    } else {
      Tools.fetchData(window.locationConfig.controlPage.interface.taskList.address, this.updateDataTaskList);
    }
  }

  getDataMilestones = () => {
    if (window.locationConfig.debug) {
      this.updateDataMilestones(AnalogData.milestones);
    } else {
      Tools.fetchData(window.locationConfig.controlPage.interface.milestones.address, this.updateDataMilestones);
    }
  }
  getDataSecondInfo = () => {
    if (window.locationConfig.debug) {
      this.updateDataSecondInfo(AnalogData.secondInfo);
    } else {
      Tools.fetchData(window.locationConfig.controlPage.interface.secondInfo.address, this.updateDataSecondInfo);
    }
  }

  updateDataSystemNotice = (data) => {
    this.timeOff = moment(data.QueryTime) - moment();
    this.setState({ systemNotice: data.data });
  }
  updateDataPlan = (data) => {
    this.setState({ plan: DataCreater.createPlan(data[0]) });
  }
  updateDataTaskComplate = (data) => {
    this.setState({ taskComplate: data[0] });
  }
  updateDataTaskList = (data) => {
    this.setState({ taskList: data });
  }
  updateDataMilestones = (data) => {
    this.setState({ milestones: data });
  }
  updateDataSecondInfo = (data) => {
    let arr = R.filter((item) => { return item.actSendTime != "" && item.actSendTime != null && item.percent != 100 }, data);
    // let arr = data;
    this.setState({ secondInfo: arr });
  }

  closeHandler(){

  }

  render() {
    let blPop = true;
    let arr = this.state.milestones;
    if(arr.length==0){
      blPop=false;
    }else{
      for(let i=0;i<arr.length;i++){
        if(arr[i].MFinishCount != arr[i].MCount){
          blPop = false;
          break;
        }
      }
    }

    let startInfo="";
    if(this.state.plan.actSendTime==null){
      if(this.state.curTime>=this.state.plan.planStartTime){
        let t = this.state.curTime-this.state.plan.planStartTime;
        startInfo = "超时"+Tools.timeFormat(t, "h:mm:ss");
      }else{
        let t = this.state.plan.planStartTime - this.state.curTime;
        startInfo = "剩余"+Tools.timeFormat(t, "h:mm:ss");
      }
    }
    
    
    return (
      <div className={style.root}>
        <img className={style.bg} src={window.dominContext.staticPath + '/assets/images/common/bg3.png'} />
        <img className={style.light} src={window.dominContext.staticPath + '/assets/images/common/light.png'} />
        <img className={style.logo} src={window.dominContext.staticPath + '/assets/images/common/logo.png'} />
        <h3 className={style.title}>{window.locationConfig.controlPage.title}<span style={{marginLeft:20,fontSize:24,color:'red'}}>{startInfo}</span></h3>
        <Timer className={style.timer} curTime={this.state.curTime} />
        <SystemNotice className={style.systemNotice} data={this.state.systemNotice} />


        <TimeItems className={style.timeItemCon} itemClassName={style.timeItem} plan={this.state.plan} curTime={this.state.curTime} />
        <PlanW className={style.plan} plan={this.state.plan} taskList={this.state.taskList} curTime={this.state.curTime}  />
        <TaskComplate className={style.taskComplate} data={this.state.taskComplate} />

        <SecondThird className={style.secondThird} secondInfo={this.state.secondInfo} taskList={this.state.taskList} curTime={this.state.curTime} />
        <Milestones className={style.milestone} data={this.state.milestones} />
        <Info className={style.info} data={this.state.taskList} />
        { blPop ? <Popup style={{width:3840,height:1080}}>
         <Over style={{textAlign:'center', verticalAlign:'middle', width:'100%', height: '100%'}} title={window.locationConfig.controlPage.title2}/>
        </Popup> : null }
      </div>
    );
  }
}

export default DataMigration;