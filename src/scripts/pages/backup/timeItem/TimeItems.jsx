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
    if(this.props.over){
      useTime = this.props.useTime;
    }else{
      useTime = this.props.curTime-this.props.startTime;
    }
    // console.log(this.props);//用moment()时将s转ms
    return (
      <div  className={this.props.className}>
        <TimeItem className={this.props.itemClassName} title={"开始时间"} time={moment(this.props.startTime*1000).format("YYYY-MM-DD H:mm:ss`")} off={0} showOff={false} />
        <TimeItem className={this.props.itemClassName} title={"已用时"} time={Tools.timeFormat(useTime*1000, "h:mm:ss`")} off={0} showOff={false} />
      </div>
    );
  }

}
export default TimeItems;