import React, { Component } from 'react';
import Tools from 'utils/Tools';
import R from 'ramda';
import moment from 'moment';

class Info extends Component {
  constructor(props) {
    super(props);
  }

  filterThreeTaskHas = (data) => {
    if (this.props.data) {
      return data.percent == 1;
    } else {
      return false;
    }
  }

  filterThreeTaskDoing = (data) => {
    if (this.props.data) {
      return data.percent != 1 && (data.startTime != null || data.startTime != 0);
    } else {
      return false;
    }
  }

  render() {
    let name = "名称", hasTime = 0, status = "正常", statusColor = '#ffffff';
    let allCount = this.props.dataList.length;
    let o = this.props.data;
    if (o) {
      if (o.useTime == 0) {
        hasTime = 0;
      } else if (o.percent == 1) {
        hasTime = o.useTime;
      } else {
        hasTime = this.props.curTime - o.startTime;
      }
      allCount = this.props.dataList.length;
      name = o.name;
      status = o.status;
    }


    let hasCount = R.filter(this.filterThreeTaskHas, this.props.dataList).length;
    let doingCount = R.filter(this.filterThreeTaskDoing, this.props.dataList).length;
    let waitCount = allCount - hasCount - doingCount;


    return (
      <div className={this.props.className} style={this.props.style}>
        <p style={{ fontSize: 18,paddingTop:40, marginBottom: 30 }}><span style={{ display: 'inline-block', fontWeight: 'bold', fontSize: 30, width: 480, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: "ellipsis", verticalAlign: 'bottom' }}>{name}</span></p>
        <p style={{ fontFamily: '黑体', fontSize: 24, lineHeight: 1.5 }}>子任务数：<span style={{ fontFamily: 'Arial Black', fontSize: 30 }}>{allCount}</span></p>

        <p style={{ fontFamily: '黑体', fontSize: 24, lineHeight: 1.5 }}>当前状态：<span style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: 24, color: statusColor }}>{status}</span></p>

        <p style={{ fontFamily: '黑体', fontSize: 24, lineHeight: 1.5 }}>
          已用时：
          <span style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: 24, marginRight: 30 }}>{Tools.timeFormat(hasTime*1000, "h:mm:ss")}</span>
        </p>

        <p style={{ left: 70, top: 70, color: '#106407',lineHeight: 2 }}>已完成：<span>{hasCount}</span></p>
        <p style={{ left: 260, top: 70, color: '#39ad15',lineHeight: 2 }}>执行中：<span>{doingCount}</span></p>
        <p style={{ left: 450, top: 70,lineHeight: 2 }}>待执行：<span>{waitCount}</span></p>
        
      </div>
    );
  }
}

export default Info;