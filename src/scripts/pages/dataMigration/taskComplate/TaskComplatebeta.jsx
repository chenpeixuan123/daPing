import React, { Component } from 'react';
import AMBaseChart from 'components/common/AMBaseChart';
import R from 'ramda';

class TaskComplate extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }
  render() {
    let amchartOption = {
      "type": "pie",
      // "colors":['#375785','#426b9e','#4d7c83','#5588c2','#93aed1'],
      "colors": ['#6c9c8c', '#39524a', '#597f73', '#9ab8af'],
      "radius": 100,
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
    let all = data.waitsend + data.waitexecute + data.executing + data.finish;
    let pieData = [
      { title: "超时", value: data.overtime, pulled: true },
      { title: "延误", value: data.delay, pulled: true },
      { title: "推迟", value: data.delayed1, pulled: true }
    ];



    return (
      <div className={this.props.className}>
        <span style={{ position: 'absolute', fontFamily: '微软雅黑', fontSize: '24px', color: '#fff' }}> {this.props.title} </span>
        <span style={{ position: 'absolute', fontFamily: '微软雅黑', fontSize: '60px', color: '#fff', paddingTop: 40 }}> {all} </span>
        <AMBaseChart style={{ width: 540, height: 465, marginTop: 40 }} option={amchartOption} dataProvider={pieData} />
      </div>
    );
  }

}

export default TaskComplate;