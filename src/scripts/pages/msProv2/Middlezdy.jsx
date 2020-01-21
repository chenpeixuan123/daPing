import React, { Component } from 'react';
import style from './style.css';
import BaseMap from '../../components/common/BaseMap.jsx';
import DataCreater from '../msWeb/DataCreater';
import Chart from 'components/common/Chart';
import TitleValue from '../../components/common/TitleValue.jsx';
import ImgTitleValue from '../../components/common/ImgTitleValue.jsx';
import Tips from './com/Tips.jsx';
import Tools from 'utils/Tools';
import LonLat from 'utils/LonLat';

let mapOption = {
  geo: {
    map: 'gansu',

    center: [101.189226, 37.511994],
    // tooltip: {
    //   show: true,       //不显示提示标签
    // },
    label: {
      normal: {
        show: true ,//显示省份标签
        textStyle:{color:"#c71585"}//省份标签字体颜色
      },
      // emphasis: {//对应的鼠标悬浮效果
      //   show: true,
      //   textStyle:{color:"#800080"}
      // }
    },
    itemStyle: {
      // normal: {
      //   borderWidth: .5,//区域边框宽度
      //   borderColor: '#fff',//区域边框颜色
      //   areaColor:"#ff8379",//区域颜色
      //   label:{show:false}
      // },
      // emphasis: {
      //   show: true,
      //   borderWidth: .5,
      //   borderColor: '#4b0082',
      //   areaColor: "#ffdead",
      // }
    },
  },
  series: [
    {
      type: 'map',

      data: mapDataToScatterData(
          [{ name: "酒泉", value: 40 }]
      )
    }
  ]
};

function mapDataToScatterData(arrData) {
  let res = [];
  for (let i = 0; i < arrData.length; i++) {
    let cood = LonLat[arrData[i].name];
    res.push({
      name: arrData[i].name,
      value: cood.concat(arrData[i].value),
      label: {
        normal: {
          position: arrData[i].name == "酒泉" ? 'right' : 'bottom'
        }
      },
      itemStyle: {
        normal: {
          color: arrData[i].value > 50 ? '#fc6721' : '#308000',
          shadowColor: '#000',
          shadowBlur: 3,
          shadowOffsetX: 3,
          shadowOffsetY: 3,
        }
      }
    });
  }
  return res;
}
export default class Middle extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  render() {
    const { branch, employee, today, climax, tenAvg, dualRatio, line, renjuncunkuan, renjundaikuan, renjunlirun } = this.props.data
    return (
        <div className={style.Middle} >
          <BaseMap className={style.map} option={mapOption} mapName={"gansu"} />


        </div>);
  }
}
