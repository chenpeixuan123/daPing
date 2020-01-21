import R from 'ramda';
import echarts from 'echarts';
import Tools from 'utils/Tools';

const DataCreater = {
  createPlanOption: (arrData) => {
    let d = [
      {
        value: arrData[0],
        itemStyle: {
          normal: {
            shadowBlur: 0,
            shadowColor: '#84a1a3',
            shadowOffsetX: 0,
            shadowOffsetY: 1,
            barBorderRadius: [0, 15, 15, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#306a6e' // 0% 处的颜色
              }, {
                offset: 0.5, color: '#387a7e' // 0% 处的颜色
              }, {
                offset: 1, color: '#2f676b' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          }
        }
      },
      {
        value: arrData[1],
        itemStyle: {
          normal: {
            shadowBlur: 0,
            shadowColor: '#84a1a3',
            shadowOffsetX: 0,
            shadowOffsetY: 1,
            barBorderRadius: [0, 15, 15, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#1a5d00' // 0% 处的颜色
              }, {
                offset: 0.5, color: '#268700' // 0% 处的颜色
              }, {
                offset: 1, color: '#207200' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          }
        }
      }
    ];


    return {
      grid: {
        containLabel: true,
        left: 5,
        top: 20,
        bottom: -20
      },
      colors: ['#ff00ff', '#ffff00'],
      xAxis: {
        type: "value",
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false },
      },
      yAxis: {
        type: 'category',
        inverse: true,
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            width: 1,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(255,255,255,0.1)' // 0% 处的颜色
              }, {
                offset: 0.5, color: 'rgba(255,255,255,1)' // 100% 处的颜色
              }, {
                offset: 1, color: 'rgba(255,255,255,0.1)' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          }
        },
        axisLabel: { textStyle: { color: '#fff', fontSize: 24 } },
        data: ['计划耗时', '实际耗时']
      },
      series: [
        {
          type: 'bar',
          barWidth: 34,
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: (params) => { return Tools.timeFormat(params.value, "h:mm:ss`"); },
              textStyle: {
                color: '#fff',
                fontSize: 24,
                fontWeight: 'bold'
              }
            }
          },
          itemStyle: {
            normal: {
              barBorderRadius: [0, 10, 10, 0],
              color: function (params) {
                var name = params.name;
                if (name === '计划耗时') {
                  return '#387a7e';
                } else if (name === "实际耗时") {
                  return '#268700';
                } else {
                  return '#387a7e';
                }
              }
            }
          },
          data: d
        }
      ]
    }

  },
  createMilestonesOption: (arrData) => {
    let arrName = arrData.map((item) => { return item.milestone });
    let arrCount = arrData.map((item) => { return item.MCount });
    return {
      grid: {
        containLabel: true,
        left: 5,
        top: 20,
      },
      xAxis: {
        type: 'category',
        data: arrName,
        boundaryGap: true,
        axisTick: {
          show: false,
          alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            width: 1,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [{
                offset: 0, color: 'rgba(255,255,255,0.1)' 
              },{
                offset: 0.05, color: 'rgba(255,255,255,1)' 
              },{
                offset: 0.95, color: 'rgba(255,255,255,1)'
              }, {
                offset: 1, color: 'rgba(255,255,255,0.1)'
              }],
              globalCoord: false // 缺省为 false
            }
          }
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          formatter:(value)=>{
            if(value.length<=8){
              return value;
            }else{
              return value.slice(0,8)+"\n"+value.slice(8,16);
            }
          },
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        }
      },
      yAxis: [
        {
          show: false,
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            formatter: '{value}%'
          }
        }

      ],
      series: [
        {
          type: 'bar',
          barWidth: 20,
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff',
                fontSize: 24,
                fontWeight: 'bold'
              }
            }
          },
          itemStyle: {
            normal: {
              color: '#268500'
            }
          },
          data: arrCount
        }
      ]
    };
  }

};

export default DataCreater;