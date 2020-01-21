import React, { Component } from 'react';
import AMBaseChart from 'components/common/AMBaseChart';
import R from 'ramda';

class TaskComplate extends Component {
  
  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }

 
  filterDoneTask = (data)=>{
    if(data){
      return data.status.indexOf("已完成") != -1;
    }else{
      return false;
    }
  }

  render() {
    let amchartOption = {
      "type": "pie",
      // "colors":['#375785','#426b9e','#4d7c83','#5588c2','#93aed1'],
      "colors": ['#6c9c8c', '#39524a', '#597f73', '#9ab8af'],
      "radius": 80,
      "labelRadius":10,
      "pullOutRadius": "10%",
      "pulledField": 'pulled',
      "valueField": "value",
      "titleField": "title",
      "color": '#ffffff',
      "labelText": '[[percents]]%',
      "labelTickColor": '#ffffff',
      "labelTickAlpha": 1,
      "fontSize": 12,
      "outlineAlpha": 0,
      "depth3D": 20,
      "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
      "angle": 40,
      "startDuration": 0,
      "export": {
        "enabled": true
      },
      "legend": {
        "color": '#ffffff',
        "position": 'right',
        "valueText": "[[close]]",
        "valueWidth": 60,
        "width": 75
      }
    }

    let data = this.props.data;
    let finish = R.filter(this.filterDoneTask, data).length;
    let executing = R.filter(R.propEq('status', "正在进行"), data).length;
    let waitexecute = R.filter(R.propEq('status', "未开始"), data).length;
    let pieData = [
      { title: "已完成", value: finish, pulled: true },
      { title: "执行中", value: executing, pulled: true },
      { title: "待执行", value: waitexecute, pulled: true },
    ];


    return (
      <div className={this.props.className}>
        <span style={{ position: 'absolute', fontFamily: '微软雅黑', fontSize: '24px', color: '#fff' }}>总体任务完成情况</span>
        <AMBaseChart style={{ width: 490, height: 265, marginTop: 40 }} option={amchartOption} dataProvider={pieData} />
      </div>
    );
  }

}

export default TaskComplate;