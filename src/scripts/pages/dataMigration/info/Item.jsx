import React, { Component } from 'react';
import moment from 'moment';
import Tools from 'utils/Tools';
class Item extends Component {

  render() {
    let time, name, catelogName, delay;
    if (this.props.data != null) {
      let data = this.props.data;
      time = data.TASK_ACT_FINISH_TIME;
      name = data.TASK_NAME;
      catelogName = data.CATALOG;
      let gap = moment(data.TASK_ACT_FINISH_TIME) - moment(data.TASK_ACT_SEND_TIME);
      if (gap < 0) {
        gap = 0
      }
      delay = Tools.timeFormat(gap, "h:mm:ss");
    } else {
      time = "1970/00/00 00:00";
      name = "";
      catelogName = "";
      delay = "00:00";
    }

    return (
      <div className={this.props.className} style={{ paddingTop: 13 }}>
        <span style={{
          marginLeft: 60,
          fontSize: 18,
          color: '#6eadc5'
        }}>
          {time}
        </span>
        <span style={{
          display: 'inline-block',
          marginLeft: 15,
          fontSize: 18,
          width: 100,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }} title={name}>{name}</span>
        <span style={{
          display: 'inline-block',
          width: 200,
          fontSize: 24,
          fontWeight: 'bold',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }} title={catelogName}>{catelogName}</span>
        <span style={{
          marginLeft: 25,
          marginRight: 25,
          fontSize: 24,
          fontWeight: 'bold',
          color: '#106407',
        }}>完成</span>
        <span style={{ fontSize: 18 }}>{"用时：" + delay}</span>
      </div>
    );
  }
}

export default Item;