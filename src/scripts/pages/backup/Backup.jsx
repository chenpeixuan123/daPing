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
import SystemNotice from '../dataMigration/systemNotice/SystemNotice';


import PlanW from './plan/PlanW';
import TaskComplate from './taskComplate/TaskComplate';

import SecondThird from './SecondThird';
import All from '../dataMigration/all/All';
import Info from './info/Info';

import TimeItems from './timeItem/TimeItems';

class Backup extends Component {
  constructor(props) {
    super(props);
    window.share.resetPageSize(3840, 1080);

    this.pid = this.props.match.params.pid;
    this.timeOff = 0;
    this.token = "";
    this.userId = 0;
    this.title = window.locationConfig.backupPage.title;
    this.title2 = "";

    this.dataArr = [];

    this.state = {
      curTime: (new Date().getTime()/1000) + this.timeOff,
      taskList: AnalogData.taskList,


      // systemNotice: AnalogData.systemNotice.data,
      // plan: DataCreater.createPlan(AnalogData.plan),
      // taskComplate: {},      
      // milestones: [],
      // secondInfo: []
    }
  }

  componentDidMount() {
    this.login();
  }
  componentWillUnmount() {
    clearInterval(this.flagSystemNotice);
    clearInterval(this.flagPlan);
    clearInterval(this.flagTaskComplate);
    clearInterval(this.flagTaskList);
    clearInterval(this.flagMilestones);
    clearInterval(this.flagSecondInfo);
    clearInterval(this.flagTime);

    this.logout();
  }

  login() {
    if (window.locationConfig.debug) {
      this.logined(AnalogData.login);
    } else {
      Tools.fetchPostData(window.locationConfig.backupPage.interface.login.address,
        {
          'Content-Type': 'application/json'
        },
        {
          "code": window.locationConfig.backupPage.code,
          "ucode": window.locationConfig.backupPage.ucode,
          "password": window.locationConfig.backupPage.password,
        },
        this.logined);
    }
  }
  logout() {
    if (window.locationConfig.debug) {

    } else {
      Tools.fetchPostData(window.locationConfig.backupPage.interface.logout.address,
        {
          'Content-Type': 'application/json'
        },
        {

        },
        () => { });
    }
  }

  logined = (data) => {
    this.token = data.token;
    this.userId = data.userId;

    this.dataArr = [];
    this.getList1();

  }
  getList1=()=> {
    Tools.fetchPost(window.locationConfig.backupPage.interface.allPid.address, {
      'Content-Type': 'application/json',
      'token': 0,
      'userId': 0
    }, { "queryParamList": [{ "fieldName": "processstatus", "fieldValue": "enabled", "operator": "=" }, { "fieldName": "status", "fieldValue": "RUNNING", "operator": "=" }] }, this.getList1OK);

  }
  getList1OK=(data)=> {
    this.dataArr = this.dataArr.concat(data.datalist);
    this.getList2();
  }
  getList2=()=> {
    Tools.fetchPost(window.locationConfig.backupPage.interface.allPid.address, {
      'Content-Type': 'application/json',
      'token': 0,
      'userId': 0
    }, { "queryParamList": [{ "fieldName": "processstatus", "fieldValue": "enabled", "operator": "=" }, { "fieldName": "status", "fieldValue": "SUCCESSED", "operator": "=" }] }, this.getList2OK);

  }
  getList2OK=(data)=> {
    this.dataArr = this.dataArr.concat(data.datalist);

    for(let i=0;i<this.dataArr.length;i++){
      if(this.dataArr[i].processinstanceid == this.pid){
        this.title2 = window.locationConfig.backupPage.title2.replace("name",this.dataArr[i].servicecatalog.name);
        console.log(window.locationConfig.backupPage.title2);
        console.log(this.title2);
        break;
      }
    }

    this.getData();
  }

  getData() {
    this.getDataTaskList();
    this.flagTaskList = setInterval(this.getDataTaskList, window.locationConfig.backupPage.interface.taskList.loopTime);
    this.flagTime = setInterval(this.resetTime, 1000);
    // this.getDataSystemNotice();
    // this.getDataPlan();
    // this.getDataTaskComplate();    
    // this.getDataMilestones();
    // this.getDataSecondInfo();

    // this.flagSystemNotice = setInterval(this.getDataSystemNotice, window.locationConfig.interface.systemNotice.loopTime);
    // this.flagPlan = setInterval(this.getDataPlan, window.locationConfig.interface.plan.loopTime);
    // this.flagTaskComplate = setInterval(this.getDataTaskComplate, window.locationConfig.interface.taskComplate.loopTime);    
    // this.flagMilestones = setInterval(this.getDataMilestones, window.locationConfig.interface.milestones.loopTime);
    // this.flagSecondInfo = setInterval(this.getDataSecondInfo, window.locationConfig.interface.secondInfo.loopTime);

  }

  resetTime = () => {
    this.setState({ curTime: (new Date().getTime()/1000) + this.timeOff });
  }


  getDataTaskList = () => {
    if (window.locationConfig.debug) {
      this.updateDataTaskList(AnalogData.taskList);
    } else {
      Tools.fetchGetData(window.locationConfig.backupPage.interface.taskList.address + this.pid,
        {
          'Content-Type': 'application/json',
          'token': this.token,
          'userId': this.userId
        },
        this.updateDataTaskList);
    }
  }


  // getDataSystemNotice = () => {
  //   if (window.locationConfig.debug) {
  //     this.updateDataSystemNotice(AnalogData.systemNotice);
  //   } else {
  //     // Tools.fetchData(window.locationConfig.interface.systemNotice.address,this.updateDataSystemNotice);
  //     fetch(window.locationConfig.interface.systemNotice.address)
  //       .then(FetchHelper.checkStatus)
  //       .then(FetchHelper.parseJSON)
  //       .then(this.updateDataSystemNotice)
  //       .catch(FetchHelper.fetchDataFailed);
  //   }
  // }

  // getDataPlan = () => {
  //   if (window.locationConfig.debug) {
  //     this.updateDataPlan(AnalogData.plan);
  //   } else {
  //     Tools.fetchData(window.locationConfig.interface.plan.address, this.updateDataPlan);
  //   }
  // }

  // getDataTaskComplate = () => {
  //   if (window.locationConfig.debug) {
  //     this.updateDataTaskComplate(AnalogData.taskComplate);
  //   } else {
  //     Tools.fetchData(window.locationConfig.interface.taskComplate.address, this.updateDataTaskComplate);
  //   }
  // }


  // getDataMilestones = () => {
  //   if (window.locationConfig.debug) {
  //     this.updateDataMilestones(AnalogData.milestones);
  //   } else {
  //     Tools.fetchData(window.locationConfig.interface.milestones.address, this.updateDataMilestones);
  //   }
  // }
  // getDataSecondInfo = () => {
  //   if (window.locationConfig.debug) {
  //     this.updateDataSecondInfo(AnalogData.secondInfo);
  //   } else {
  //     Tools.fetchData(window.locationConfig.interface.secondInfo.address, this.updateDataSecondInfo);
  //   }
  // }

  updateDataTaskList = (data) => {
    if (data.oneStepProcessList == null) {
      data.oneStepProcessList = [];
    }
    this.setState({ taskList: data });
  }

  // updateDataSystemNotice = (data) => {
  //   this.timeOff = moment(data.QueryTime) - moment();
  //   this.setState({ systemNotice: data.data });
  // }
  // updateDataPlan = (data) => {
  //   this.setState({ plan: DataCreater.createPlan(data[0]) });
  // }
  // updateDataTaskComplate = (data) => {
  //   this.setState({ taskComplate: data[0] });
  // }

  // updateDataMilestones = (data) => {
  //   this.setState({ milestones: data });
  // }
  // updateDataSecondInfo = (data) => {
  //   let arr = R.filter((item) => { return item.actSendTime != "" && item.actSendTime != null && item.percent != 100 }, data);
  //   // let arr = data;
  //   this.setState({ secondInfo: arr });
  // }

  render() {
    return (
      <div className={style.root}>
        <img className={style.bg} src={window.dominContext.staticPath + '/assets/images/common/bg3.png'} />
        <img className={style.light} src={window.dominContext.staticPath + '/assets/images/common/light.png'} />
        <img className={style.logo} src={window.dominContext.staticPath + '/assets/images/common/logo.png'} />
        <h3 className={style.title}>{this.title}</h3>
        <h3 className={style.title2}>{this.title2}</h3>
        <Timer className={style.timer} curTime={this.state.curTime} />
        {/*<SystemNotice className={style.systemNotice} data={this.state.systemNotice} />*/}


        <TimeItems className={style.timeItemCon} itemClassName={style.timeItem} startTime={this.state.taskList.startTime} useTime={this.state.taskList.useTime} curTime={this.state.curTime} over={this.state.taskList.passNum == this.state.taskList.allNum} />
        <PlanW className={style.plan} cur={this.state.taskList.passNum} all={this.state.taskList.allNum} startTime={this.state.taskList.startTime} />
        <TaskComplate className={style.taskComplate} data={this.state.taskList.oneStepProcessList} />

        <SecondThird className={style.secondThird} processList={this.state.taskList.oneStepProcessList} curTime={this.state.curTime} />

        <All className={style.all} cur={this.state.taskList.passNum} all={this.state.taskList.allNum} />
        <Info className={style.info} data={this.state.taskList.oneStepProcessList} />
      </div>
    );
  }
}

export default Backup;