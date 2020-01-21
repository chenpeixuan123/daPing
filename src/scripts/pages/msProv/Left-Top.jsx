import React, { Component } from 'react';
import style from './style.css';
import TitleValue from '../../components/common/TitleValue.jsx';
import echarts from 'echarts';
import Tools from 'utils/Tools';
export default class LeftTop extends Component {
  constructor(props) {
    super(props);
  }
  drawLine() {
    let option = {
      title: {
        x: -5,
        text: '资产负债变化情况',
        textStyle: {
          color: '#fff',
          fontSize: 25,
          fontWeight: 'normal',
          fontFamily: '黑体'
        }
      },
      color: ['#7db4ff', '#ffbe5f'],
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          // let s = params[0].value[0].slice(0, 10) + "<br/>"
          //   // +"<div style='display:inline-block;width: 10px;height: 10px;background-color: "+params[0].color+";border-radius: 10px;'/>    "+params[0].seriesName + "：" + (params[0].value).toFixed(2) + "M" + "<br/>"
          //   // +"<div style='display:inline-block;width: 10px;height: 10px;background-color: "+params[1].color+";border-radius: 10px;'/>    "+params[1].seriesName + "：" + (params[1].value).toFixed(2) + "M" + "<br/>"
          //   // +"<div style='display:inline-block;width: 10px;height: 10px;background-color: "+params[2].color+";border-radius: 10px;'/>    "+params[2].seriesName + "：" + (params[2].value).toFixed(2) + "M" + "";
          //   + params[0].seriesName + "：" + (params[0].value[1] / 1e8).toFixed(2) + "亿" + "<br/>"
          //   + params[1].seriesName + "：" + (params[1].value[1] / 1e8).toFixed(2) + "亿" + "";
          // return s;

          let s = params[0].axisValue + "<br/>"
          +params[0].seriesName + "：" + (params[0].value / 1e8).toFixed(2) + "亿" + "<br/>"
          +params[1].seriesName + "：" + (params[1].value / 1e8).toFixed(2) + "亿";
          return s;
        }
      },
      legend: {
        show: true,
        right: 0,
        textStyle: {
          color: '#fff',
          fontSize: 18,
          fontWeight: 'normal',
          fontFamily: '黑体'
        },
        data: [{
          name: '资产总额'
        }, {
          name: '负债总额'
        }]
      },
      grid: {
        show: true,
        left: '0%',
        right: '4%',
        bottom: '3%',
        top: '15%',
        containLabel: true,
      },
      toolbox: {
        show: false
      },
      xAxis: {
        // type: 'time',
        // minInterval: 1 * 3600 * 24 * 1000,
        // maxInterval: 2 * 3600 * 24 * 1000,
        // interval:2 * 3600 * 24 * 1000,
        boundaryGap: false,
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        splitLine: {
          show: false
        },
        data: []
       
      },
      yAxis: {
        type: 'value',
        // min: 240000000000,
        min: 200000000000,
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisLabel: {
          formatter: fig => Math.round(fig / 1e8) + '亿',
        },
        splitLine: {
          lineStyle: {
            color: '#323a45'
          }
        }

      },
      series: [
        {
          name: '资产总额',
          type: 'line',
          symbol: 'none',
          smooth: true,
          itemStyle: {
            emphasis: {
              color: '#7fb3fe'
            }
          }
        },
        {
          name: '负债总额',
          name: '负债总额',
          type: 'line',
          symbol: 'none',
          smooth: true,
          itemStyle: {
            emphasis: {
              color: '#ffbe5f'
            }
          }
        }]
    };
    let pieChart = echarts.init(this.refs.lineChart);
    this.pieChart = pieChart;
    pieChart.setOption(option)
    refresh(this.props.data.line);
    function refresh(data) {     
      pieChart.setOption({
        xAxis:{
          data:data.time
        },
        series: [{
          name: '资产总额',         
          data: data.total,
        },
        {
          name: '负债总额',         
          data:data.debt,
        }]
      });
    }
    return refresh;
  }
  componentDidMount() {
    this.refresh = this.drawLine()
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.refresh(nextProps.data.line);
    }
  }
  render() {
    let props = this.props.data;
    return (
      <div className={style.LeftTop} >
        <TitleValue
          style={{ left: '0px' }}
          className={style.ltTitle}
          title={"资产总额"}
          titleClassName={style.ltTitleH}
          valueClassName={style.ltValue}
          unitClassName={style.ltUnit}
          unit='亿元'
          value={props.total} />
        <TitleValue
          style={{ left: '290px' }}
          className={style.ltTitle}
          title={"负债总额"}
          titleClassName={style.ltTitleH}
          valueClassName={style.ltValue}
          unitClassName={style.ltUnit}
          unit='亿元'
          value={props.debt} />
        <TitleValue
          style={{ left: '580px' }}
          className={style.ltTitle}
          title={"净资产余额"}
          titleClassName={style.ltTitleH}
          valueClassName={style.ltValue}
          unitClassName={style.ltUnit}
          unit='亿元'
          value={props.assets} />
        <div ref='lineChart' className={style.ltChart}>
        </div>
      </div>);
  }
}
