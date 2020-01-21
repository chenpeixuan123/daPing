import React, { Component } from 'react';
import style from './style.css';
import TitleValue from '../../components/common/TitleValue.jsx';
import TitleAMChart from '../../components/common/TitleAMChart.jsx';

export default class LeftDown extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    let props = this.props.data;
    return (
      <div className={style.LeftDown} >
        <TitleValue
          style={{ left: '0px' }}
          className={style.ltTitle}
          title={"一般性存款"}
          titleClassName={style.ltTitleH}
          valueClassName={style.ltValue}
          unitClassName={style.ltUnit}
          unit='亿元'
          value={props.mouth} />
        <TitleValue
          style={{ left: '290px' }}
          className={style.ltTitle}
          title={"贷款总额"}
          titleClassName={style.ltTitleH}
          valueClassName={style.ltValue}
          unitClassName={style.ltUnit}
          unit='亿元'
          value={props.total} />
        <TitleValue
          style={{ left: '580px' }}
          className={style.ltTitle}
          title={"净利润"}
          titleClassName={style.ltTitleH}
          valueClassName={style.ltValue}
          unitClassName={style.ltUnit}
          unit='亿元'
          value={props.ratio} />
        <TitleAMChart className={style.leftDown_Pie} titleClassName={style.leftDown_Pie_Title} chartClassName={style.leftDown_Pie_chart} title={"存款构成"} option={PieOption()} dataProvider={props.pie} />
      </div>);
  }
}
function PieOption() {
  return {
    "type": "pie",
    "colors": ['#6c9c8c', '#39524a', '#597f73', '#9ab8af'],
    "radius": 110,
    "pullOutRadius": "8%",
    "pulledField": 'pulled',
    "valueField": "value",
    "titleField": "title",
    "color": '#ffffff',    
    "labelRadius":8,
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
      "valueText": "",
    }
  }
}