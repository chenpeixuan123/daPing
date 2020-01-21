import React, { Component } from 'react';
import style from '../../dataMigration/timeItem/style.css';
import Tools from 'utils/Tools';
import TimeItem from '../../dataMigration/timeItem//TimeItem';
import moment from 'moment';
import R from 'ramda';

class TimeItems extends Component {
  
  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }

  render() {   
    let useTime = 0;
    // console.log(this.props);
    let startTime=moment(this.props.startTime).format('YYYY-MM-DD HH:mm:ss');
    if(this.props.over){
      useTime = moment(this.props.useTime).format('YYYY-MM-DD HH:mm:ss');
    }else{
      let m=moment(this.props.curTime-this.props.startTime);
      useTime = `${m.hours()}:${m.minutes()}:${m.seconds()}`;
    }
    // console.log(moment().format('x'));
     console.log(moment().format('X'));
    // console.log(new Date().getTime());
    return (
      <div  className={this.props.className}>
        <TimeItem className={this.props.itemClassName} title={"开始时间"} time={startTime} off={0} showOff={false} />
        <TimeItem className={this.props.itemClassName} title={"已用时"} time={useTime} off={0} showOff={false} />
      </div>
      // <div  className={this.props.className}>
      //   <TimeItem className={this.props.itemClassName} title={"开始时间"} time={moment(this.props.startTime*1000).format("YYYY-DD-MM H:mm:ss`")} off={0} showOff={false} />
      //   <TimeItem className={this.props.itemClassName} title={"已用时"} time={Tools.timeFormat((this.props.curTime-this.props.startTime), "h:mm:ss`")} off={0} showOff={false} />
      // </div>
    );
  }

}
export default TimeItems;