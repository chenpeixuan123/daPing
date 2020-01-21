import React, { Component } from 'react';
import style from './style.css';
import TitleValue from '../../components/common/TitleValue.jsx';
import echarts from 'echarts';
import Bar from './com/bar.jsx';
let titleClass = style.all_title_con + ' ' + style.right_paddingLeft;

export default class Right extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refresh = this.drawLine()
  }


  drawLine() {
    let option = {
      title: {
        x: -5,
        text: '近6个月增长情况',
        textStyle: {
          color: '#fff',
          fontSize: 25,
          fontWeight: 'normal',
          fontFamily: '黑体'
        }
      },
      color: ['#7db4ff', '#ffbe5f'],
      tooltip: {
        trigger: 'axis'
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
          name: '客户数',
          icon: 'circle',
        }, {
          name: '账户数',
          icon: 'rect',
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
        type: 'category',
        // boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        min: 3500000,
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisLabel: {
          formatter: fig => Math.round(fig / 1e4) + '万',
        },
        splitLine: {
          lineStyle: {
            color: '#323a45'
          }
        }

      },
      series: [
        {
          name: '客户数',
          // type: 'line',
          type: 'bar',
          barWidth: 30,
          // itemStyle: {
          //   normal: {
          //     color: '#7fb3fe'
          //   }
          // },
        },
        {
          name: '账户数',
          // type: 'line',
          type: 'bar',
          barWidth: 30,
          // itemStyle: {
          //   normal: {
          //     color: '#7fb3fe'
          //   }
          // },
        }
      ]

    };
    let pieChart = echarts.init(this.chart);
    this.pieChart = pieChart;
    pieChart.setOption(option)
    refresh(this.props.data.line);
    function refresh(data) {
      // let arr1 = data.custom, arr2 = data.account;
      // let data1 = [], data2 = [];
      // for (let i in arr1) {
      //   data1.push({
      //     name: '客户数',
      //     symbol: 'rect',
      //     symbolSize: 6,
      //     value: [i, arr1[i]]
      //   });
      // }
      // for (let i in arr2) {
      //   data2.push({
      //     name: '账户数',
      //     symbol: 'circle',
      //     symbolSize: 6,
      //     value: [i, arr2[i]]
      //   });
      // }
      pieChart.setOption({
        xAxis: {
          data: data.time,//["2017/05","2017/06","2017/07","2017/08","2017/09","2017/10"]
        },
        series: [{
          name: '客户数',
          // data: data1
          // data: [
          //   { name: '客户数', symbol: 'rect', symbolSize: 6, value: ["2017-05-31 23:59:59", 4700322] },
          //   { name: '客户数', symbol: 'rect', symbolSize: 6, value: ["2017-06-30 23:59:59", 4817550] },
          //   { name: '客户数', symbol: 'rect', symbolSize: 6, value: ["2017-07-31 23:59:59", 4963892] },
          //   { name: '客户数', symbol: 'rect', symbolSize: 6, value: ["2017-08-31 23:59:59", 5080186] },
          //   { name: '客户数', symbol: 'rect', symbolSize: 6, value: ["2017-09-30 23:59:59", 5201657] },
          //   { name: '客户数', symbol: 'rect', symbolSize: 6, value: ["2017-10-30 23:59:59", 5284877] },
          // ]
          data: data.custom//[4700322,4817550,4963892,5080186,5201657,5284877]
        },
        {
          name: '账户数',
          // data: data2
          // data: [
          //   { name: '账户数', symbol: 'circle', symbolSize: 6, value: ["2017-05-31 23:59:59", 6375509] },
          //   { name: '账户数', symbol: 'circle', symbolSize: 6, value: ["2017-06-30 23:59:59", 6444367] },
          //   { name: '账户数', symbol: 'circle', symbolSize: 6, value: ["2017-07-31 23:59:59", 6598642] },
          //   { name: '账户数', symbol: 'circle', symbolSize: 6, value: ["2017-08-31 23:59:59", 6688635] },
          //   { name: '账户数', symbol: 'circle', symbolSize: 6, value: ["2017-09-30 23:59:59", 6793081] },
          //   { name: '账户数', symbol: 'circle', symbolSize: 6, value: ["2017-10-30 23:59:59", 6855418] },
          // ]
          data: data.account//[6375509,6444367,6598642,6688635,6793081,6855418]
        }]
      });
    }
    return refresh;
  }
  componentWillReceiveProps(nextProps) {
    this.refresh(nextProps.data.line);
  }
  render() {
    let props = this.props.data;
    
    let v1 = isNaN(Number(props.customer.completed)) ? 0 : props.customer.completed;
    let v2 = isNaN(Number(props.account.completed)) ? 0 : props.account.completed;
    let customRatio = v1 / (1 * window.locationConfig.TGInterface.annualPlan.customer);
    let accountRatio = v2 / (1 * window.locationConfig.TGInterface.annualPlan.account);
    let planRatio = completedPercent();
    
    return (
      <div className={style.Right} >
        <TitleValue
          className={titleClass}
          style={{ fontSize: '32px', top: 100 }}
          title={"当前客户数"}
          titleClassName={style.all_title}
          valueClassName={style.all_num}
          value={props.customer.total} />
        <TitleValue
          className={titleClass}
          style={{ top: '270px', fontSize: '23px' }}
          title={"当日新增"}
          titleClassName={style.all_title}
          valueClassName={style.all_num}
          value={props.customer.today} />
        <TitleValue
          className={titleClass}
          style={{ top: '400px', fontSize: '23px' }}
          title={"本年度新增"}
          titleClassName={style.all_title}
          valueClassName={style.all_num}
          value={props.customer.annual} />
        <TitleValue
          className={titleClass}
          style={{ left: '470px', fontSize: '32px', top: 100 }}
          title={"当前总账户数"}
          titleClassName={style.all_title}
          valueClassName={style.all_num}
          value={props.account.total} />
        <TitleValue
          className={titleClass}
          style={{ top: '270px', left: '470px', fontSize: '23px' }}
          title={"当日新增"}
          titleClassName={style.all_title}
          valueClassName={style.all_num}
          value={props.account.today} />
        <TitleValue
          className={titleClass}
          style={{ top: '400px', left: '470px', fontSize: '23px' }}
          title={"本年度新增"}
          titleClassName={style.all_title}
          valueClassName={style.all_num}
          value={props.account.annual} />
        {/* <Bar
          title={'年度指标完成度'}
          ratio={customRatio}
          plan={planRatio}
          className={style.right_paddingLeft}
          style={{ position: 'absolute', top: 500 }}
        />
        <Bar
          title={'年度指标完成度'}
          ratio={accountRatio}
          plan={planRatio}
          className={style.right_paddingLeft}
          style={{ position: 'absolute', left: 470, top: 500 }}
        /> */}
        <div className={style.r_chart} ref={d => this.chart = d} />
      </div>);
  }
}
function completedPercent() {
  let now = new Date(),
    lastYear = new Date(`${now.getFullYear()}-1-1`).getTime(),
    endYear = new Date(`${now.getFullYear()}-12-31`).getTime();
  return (now.getTime() - lastYear) / (endYear - lastYear);
}
