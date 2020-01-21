import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskComplate from '../dataMigration/taskComplate/TaskComplatebeta';
import TitleChart from 'components/common/TitleChart';
import DC from '../backup/DataCreater';
import DataCreater from './DataCreater';
import $ from 'jquery';
import './firework2';
import style from './style.css';
import TextAnimate from './TextAnimate/TextAnimate';
import AnalogData from '../dataMigration/AnalogData';
import Tools from 'utils/Tools';

class FinishPage extends Component {
  constructor(props, context) {
    super(props, context);
    window.share.resetPageSize(3840, 1080);

    this.state = {
      planOption: DataCreater.createPlanOption([0, 0]),
      taskComplate: {},
      milestonesOption: DataCreater.createMilestonesOption([]),
    };
  }

  componentDidMount() {
    this.getDataPlan();
    this.getDataTaskComplate();
    this.getDataMilestones();
    this.setFireworks();
  }
  componentWillUnmount(){
    $("#fireworks_div").fireworks("destroy");
  }
  setFireworks() {
    let w = 2244;
    let h = 1080;
    $("#fireworks_div").fireworks();
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
  getDataMilestones = () => {
    if (window.locationConfig.debug) {
      this.updateDataMilestones(AnalogData.milestones);
    } else {
      Tools.fetchData(window.locationConfig.controlPage.interface.milestones.address, this.updateDataMilestones);
    }
  }
  updateDataPlan = (data) => {
    let d = DC.createPlan(data[0]);
    let plan = d.planEndTime - d.planStartTime;
    let real = d.actFinishTime == null ? (new Date().getTime() - d.actSendTime) : (d.actFinishTime - d.actSendTime);
    this.setState({ planOption: DataCreater.createPlanOption([plan, real]) });
  }
  updateDataTaskComplate = (data) => {
    this.setState({ taskComplate: data[0] });
  }
  updateDataMilestones = (data) => {
    this.setState({ milestonesOption: DataCreater.createMilestonesOption(data) });
  }


  render() {
    return (
      <div className={this.props.className} style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.9)' }}>
        <img ref={(node) => { this.img = node; }} src={window.dominContext.staticPath + '/assets/images/dataMigration/bg_over.jpg'} alt="" />
        <div id = 'fireworks_div' style={{position:'absolute',top:0,left:420,width:3000,height:1080}}></div> 
        <img className={style.logo} src={window.dominContext.staticPath + '/assets/images/common/logo.png'} />
        <div className={style.titleDes}>{window.locationConfig.controlPage.title}</div>
        <TextAnimate name='切换完成!' />
        <TitleChart className={style.taskTime} chartClassName={style.taskTime_chart} option={this.state.planOption} />

        <TaskComplate className={style.taskComplate} title="总任务数" data={this.state.taskComplate} />
        <TitleChart className={style.mileStone}
          titleClassName={style.mileStone_title}
          chartClassName={style.mileStone_chart}
          title={"里程碑"}
          option={this.state.milestonesOption}
        />

      </div>
    );
  }
}

FinishPage.propTypes = {

};

export default FinishPage;