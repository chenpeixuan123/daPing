import React, { Component } from 'react';
import PlanBar from './PlanBar';
import style from './style.css';
import moment from 'moment';

class Plan extends Component {

  render() {
    return (
      <div className={this.props.className}>
        <span className={style.start}>START</span>
        <span className={style.end}>END</span>
        <PlanBar curR={this.props.curR} planR={this.props.planR} over={this.props.over} />
        <div className={style.startTime}>
          <span>启动时间</span>
          <p className={style.date}>{moment(this.props.startTime).format('M/DD')}<span className={style.time}>{moment(this.props.startTime).format('HH:mm:ss')}</span></p>
        </div>

        <div className={style.endTime}>
          <span>预计完成时间</span>
          <p className={style.date}>{moment(this.props.endTime).format('M/DD')}<span className={style.time}>{moment(this.props.endTime).format('HH:mm:ss')}</span></p>
        </div>
      </div>
    );
  }
};

export default Plan;
