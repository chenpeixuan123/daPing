import React, { Component } from 'react';
import Chart from '../../../components/common/Chart';
import 'echarts/lib/chart/gauge';

class Gauge extends React.Component {
  constructor(props) {
    super(props);
  }
  createOption = () => {
    let {title,min,max,value,r,radian} = this.props.data;
    // let r = 200;//外圆半径
    // let radian = 240;//扇形的角度
    // let min = 0;
    // let max = 100;
    let sr1 = r * 0.8;//扇形外半径占比
    let sr2 = r * 0.256;//扇形内半径占比

    let startAngle = -270 + (360 - radian) / 2;//扇形开始角度
    let endAngle = 90 - (360 - radian) / 2;//扇形结束角度  
    //扇形中心高度  
    let halfRadian = (340 - radian) / 2 / 180 * Math.PI;
    let sH = sr1 * Math.cos(halfRadian) + sr1;
    // let sy = r - (sr1-sH/2);//扇形中心所在高度
    let sy = r;
    return {
      graphic: [
        //最外层圆圈
        {
          type: 'circle',
          left: 'center',
          top: 'middle',
          shape: {
            r: r
          },
          style: {
            fill: {
              type: 'radial',
              x: 0.5,
              y: 0.52,
              r: 0.5,
              colorStops: [
                { offset: 0, color: 'rgba(21,96,149,0)' },
                { offset: 0.96, color: 'rgba(21,96,149,0)' },
                { offset: 1, color: 'rgba(21,96,149,1)' }
              ],
            }
          }
        },
        //扇形
        {
          type: 'sector',
          left: 'center',
          shape: {
            cy: sy,
            r: sr1,
            r0: sr2,
            startAngle: startAngle / 180 * Math.PI,
            endAngle: endAngle / 180 * Math.PI,

          },
          style: {
            fill: {
              type: 'radial',
              x: 0.5,
              y: sr1 / sH,
              r: 0.5,
              colorStops: [
                { offset: 0, color: 'rgba(21,96,149,1)' },
                { offset: 0.2462, color: 'rgba(21,96,149,1)' },
                { offset: 1, color: 'rgba(21,96,149,0)' }
              ],
            }
          }
        },
        //圆心1
        {
          type: 'circle',
          zlevel: 1,
          left: 'center',
          top: 'middle',
          shape: {
            r: 6
          },
          style: {
            fill: '#63ccd3'
          }
        },
        //圆心2
        {
          type: 'circle',
          zlevel: 1,
          left: 'center',
          top: 'middle',
          shape: {
            r: 3
          },
          style: {
            fill: '#0e6cf1'
          }
        },
        //圆心环
        {
          type: 'ring',
          zlevel: 1,
          left: 'center',
          top: 'middle',
          shape: {
            r0: 12,
            r: 14
          },
          style: {
            fill: '#637f8a'
          }
        },
      ],
      series: [{
        type: 'gauge',
        axisLine: {
          lineStyle: {
            opacity: 0
          }
        },
        radius: '85%',
        startAngle: -startAngle,
        endAngle: -endAngle,
        axisLabel: {
          distance: -45,
          textStyle: {
            color: '#fff'
          },
          formatter: function (value) {
            if (Number(value) == min || Number(value) == max) {
              return value;
            }
            return "";
          }
        },
        axisTick: {
          length: '5%',
          splitNumber: 2
        },
        splitLine: {
          length: '15%'
        },
        min: min,
        max: max,
        title: {
          offsetCenter: [0, '73%'],
          textStyle: {
            color: '#fff',
            fontSize: 18
          },
          show: false
        },
        detail: {
          offsetCenter: [0, '100%'],
          formatter: '{value}%',
          textStyle: {
            color: '#fff',
            fontSize: 25,
            fontFamily: 'Arial Black'
          },
          show: false
        },
        pointer: {
          width: 5
        },
        data: [{ value: value, name: title }]
      }]
    };
  }
  render() {
    let option = this.createOption(this.props.data);
    return (
      <div className={this.props.className} style={this.props.style} >
        <Chart style={{ width: "100%", height: "100%" }} option={option} />
      </div>
    )
  }
}
export default Gauge;