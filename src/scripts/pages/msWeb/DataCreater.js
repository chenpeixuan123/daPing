import R from 'ramda';
import Tools from 'utils/Tools';
import LonLat from 'utils/LonLat';

function mapDataToScatterData(arrData) {
  let res = [];
  for (let i = 0; i < arrData.length; i++) {
    let cood = LonLat[arrData[i].name];
    if (cood) {
      res.push({
        name: arrData[i].name,
        value: cood.concat(arrData[i].value),
        itemStyle: {
          normal: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [{
                offset: 0, color: '#498ce6' // 0% 处的颜色
              }, {
                offset: 1, color: '#356cb4' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            },
            opacity: 1
          }
        }
      });
    }
  }
  return res;
}




const DataCreater = {
  createRealtimeLineOption: (hisData, curData, alert) => {
    let curNewData = R.clone(curData);
    // console.log(hisData,curData)
    // let max = curNewData.reduce((a,b)=>{return a>b?a:b;},0);
    // if (curNewData.length > 1 && max!= curNewData[curNewData.length - 1]) {
    if (curNewData.length > 1) {
      curNewData[curNewData.length - 1] = {
        value: curNewData[curNewData.length - 1],
        symbol: "circle",
        symbolSize: 20,
        label: {
          normal: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold'
            }
          }
        }
      };
    }
    // console.log(curNewData)


    return {
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      // legend: {
      //   right: 0,
      //   textStyle: {
      //     color: '#fff',
      //   },
      //   data: ["交易量", "历史均值"]
      // },
      xAxis: [
        {
          type: 'category',
          // position:'bottom',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: { show: false },
          data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: { show: false },
          splitLine: { show: false }
        }
      ],
      series: [
        // {
        //   name: "历史均值",
        //   type: 'line',
        //   symbol: 'none',
        //   smooth: true,
        //   lineStyle: {
        //     normal: {
        //       opacity: 1
        //     }
        //   },
        //   itemStyle: {
        //     normal: {
        //       color: '#1a293c',
        //     }
        //   },
        //   areaStyle: {
        //     normal: {
        //       color: '#242D3C'
        //     }
        //   },
        //   data: hisData
        // },
        {
          name: "交易量",
          type: 'line',
          symbol: 'none',
          smooth: true,
          lineStyle: {
            normal: {
              color: '#046780',
              width: 5
            }
          },
          itemStyle: {
            normal: {
              color: '#046780',
            }
          },
          // markPoint: {
          //   symbolSize: 75,
          //   label: {
          //     normal: {
          //       textStyle: {
          //         fontSize: 18,
          //         fontWeight: 'bold'
          //       }
          //     }
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: '#1e4553'
          //     }
          //   },
          //   data: [
          //     { type: 'max', name: '最大值' },
          //   ]
          // },
          // markLine: {
          //   silent: true,
          //   symbol: "none",
          //   label: {
          //     normal: {
          //       position: "middle",
          //       formatter: "警戒值{c}",
          //       textStyle: {
          //         color: '#ff0000',
          //         fontSize: 16,
          //         fontWeight: 'bold'
          //       }
          //     }
          //   },
          //   lineStyle: {
          //     normal: {
          //       type: 'solid',
          //       width: 2,
          //       color: {
          //         type: 'linear',
          //         x: 0,
          //         y: 0,
          //         x2: 1,
          //         y2: 0,
          //         colorStops: [{
          //           offset: 0, color: '#ff0000' // 0% 处的颜色
          //         }, {
          //           offset: 0.8, color: '#ff0000' // 100% 处的颜色
          //         }, {
          //           offset: 1, color: 'rgba(255,0,0,0)' // 100% 处的颜色
          //         }],
          //         globalCoord: false // 缺省为 false
          //       }
          //     }
          //   },
          //   data: [{
          //     yAxis: alert
          //   }]
          // },
          data: curNewData
        }
      ]
    };
  },
  createMapOption: (arrData) => {

    let max = 80;
    if(arrData.length>0){
      max = arrData[0].value;
    }

    return {
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          return params.name + ":" + params.value[2];
        }
      },
      geo: [
        {
          map: 'china',
          roam: false,
          silent: true,
          zoom: 1.2,
          itemStyle: {
            normal: {
              shadowColor: 'rgba(200,200,200,0.8)',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 80,
            }
          }
        },
        {
          map: 'china',
          roam: false,
          silent: true,
          zoom: 1.2,
          itemStyle: {
            normal: {
              shadowColor: '#153a62',
              shadowOffsetX: 10,
              shadowOffsetY: 10,
              shadowBlur: 0,
            }
          }
        },
        {
          map: 'china',
          roam: false,
          silent: true,
          zoom: 1.2,
          itemStyle: {
            normal: {
              areaColor: '#cfcfcf',
              borderWidth: 2,
              borderColor: '#3d526d',
            },
            emphasis: {
              areaColor: '#cfcfcf',
              borderWidth: 2,
              borderColor: '#3d526d',
            }
          },
          regions: [
            {
              name: '南海诸岛',
              itemStyle: {
                normal: {
                  areaColor: '#cfcfcf',
                  shadowBlur: 0,
                }
              }
            }
          ]
        }
      ],
      series: [
        {
          name: "网银",
          type: 'effectScatter',
          coordinateSystem: 'geo',
          geoIndex: 2,
          symbol: 'circle',
          symbolSize: function (val) {
            let r = val[2] / max;
            r = 1-(r-1)*(r-1)/1.2;
            r = r*80;
            
            return r;
          },
          data: mapDataToScatterData(arrData),
          showEffectOn: 'emphasis',//'emphasis',//'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          // hoverAnimation: true
        }
      ]
    };
  },
  createWebBankTradingVolumeRankOption: (arrData) => {
    return {
      grid: {
        containLabel: true,
        left: 5,
        right: 80,
        top: 20,
        bottom: -20
      },
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
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { textStyle: { color: '#fff', fontSize: 24 } },
        data: arrData.map(item => item.name)
      },
      series: [
        {
          type: 'bar',
          barWidth: 20,
          label: {
            normal: {
              show: true,
              position: 'right',
              color: '#fff',
              formatter:({value})=>{
                return (value/1e4).toFixed(2)+"万";
              },
              fontSize: 20
            },
          },
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [{
                  offset: 0, color: '#5c5c5c' // 0% 处的颜色
                }, {
                  offset: 1, color: '#cbcbcb' // 100% 处的颜色
                }],
              }
            }
          },
          data: arrData.map(item => item.value)
        }
      ]
    };
  },
  createWebBankTradingWaveRankOption: (arrData) => {
    return {
      grid: {
        left: '0%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        position: 'top',
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: { show: false },
        axisLabel: { textStyle: { color: '#fff', fontSize: 16 } },
        data: arrData.map(item => item.name)
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: { show: false },
        axisLabel: { textStyle: { color: '#fff' }, formatter: (v) => { if (v < 0) { return -Math.round(v / 1e4) + '万'; } else { return Math.round(v / 1e4) + '万'; } } },
        splitLine: { show: false },
      },

      series: [
        {
          type: 'bar',
          barWidth: 15,
          itemStyle: {
            normal: {
              color: '#757575'
            }
          },
          data: arrData.map(item => item.cur)
        },
        {
          type: 'bar',
          barWidth: 15,
          itemStyle: {
            normal: {
              color: '#B9B9B9'
            }
          },
          data: arrData.map(item => item.his)
        }
      ]
    };
  },

  createWebBankTradingVolumeRadioOption: () => {
    return {
      "type": "pie",
      "colors": ['#169b00', '#0672b0', '#597f73', '#9ab8af'],
      "radius": 90,
      "pullOutRadius": "5%",
      "pulledField": 'pulled',
      "valueField": "value",
      "titleField": "title",
      "color": '#ffffff',
      "labelRadius": 3,
      "labelText": '[[percents]]%',
      "labelTickColor": '#ffffff',
      "labelTickAlpha": 1,
      "fontSize": 12,
      "outlineAlpha": 0,
      "depth3D": 20,
      "balloonText": "[[title]]<br/><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
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
    };
  },
  createWebBankTradingAmountRadioOption: () => {
    return {
      "type": "pie",
      "colors": ['#169b00', '#0672b0', '#597f73', '#9ab8af'],
      "radius": 90,
      "pullOutRadius": "5%",
      "pulledField": 'pulled',
      "valueField": "value",
      "titleField": "title",
      "color": '#ffffff',
      "labelRadius": 3,
      "labelText": '[[percents]]%',
      "labelTickColor": '#ffffff',
      "labelTickAlpha": 1,
      "fontSize": 12,
      "outlineAlpha": 0,
      "depth3D": 20,
      "balloonText": "[[title]]<br/><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
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
    };
  },

  createThirdPartyPayOption: (arrData) => {
    let arr = arrData.map(item => { return item.zfb + item.cft });
    let max = R.reduce(R.max, 0, arr);
    arr = arr.map(v => max - v);

    return {
      legend: {
        right: 0,
        textStyle: {
          color: '#fff',
        },
        data: ["支付宝", "财付通"]
      },
      tooltip: {
        trigger: 'item',
      },
      xAxis: {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: { alignWithLabel: true, lineStyle: { color: '#fff' } },
        axisLabel: { textStyle: { color: '#fff' },interval:0 },
        data: arrData.map(item => item.time)
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: { show: false },
        axisLabel: {
          labelStyle: { color: '#fff' },
          formatter: v => Math.round(v / 1e4) + '万',
        },
        splitLine: { lineStyle: { color: '#202933' } },
      },

      series: [
        {
          type: 'bar',
          name: '支付宝',
          stack: '占比',
          itemStyle: {
            normal: {
              color: '#B9B9B9'
            }
          },
          data: arrData.map(item => item.zfb)
        },
        {
          type: 'bar',
          name: '财付通',
          stack: '占比',
          barWidth: '30%',
          itemStyle: {
            normal: {
              color: '#757575'
            }
          },
          data: arrData.map(item => item.cft)
        },
       
      ]
    };
  },
  createShortcutPayOption: (arrData) => {
    return {
      legend: {
        right: 0,
        textStyle: {
          color: '#fff',
        },
        data: ["支付宝", "财付通"]
      },
      xAxis: {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: { alignWithLabel: true, lineStyle: { color: '#fff' } },
        axisLabel: { textStyle: { color: '#fff' },interval:0 },
        data: arrData.map(item => item.time)
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: { show: false },
        axisLabel: {
          textStyle: { color: '#fff', fontSize: 12 },
          formatter: v => Math.round(v / 1e8) + '亿',
        },
        splitLine: { lineStyle: { color: '#202933' } },
      },

      series: [
        {
          type: 'bar',
          name: '支付宝',
          barWidth: 15,
          itemStyle: {
            normal: {
              color: '#B9B9B9'
            }
          },
          data: arrData.map(item => item.zfb)
        },
        {
          type: 'bar',
          name: '财付通',
          barWidth: 15,
          itemStyle: {
            normal: {
              color: '#757575'
            }
          },
          data: arrData.map(item => item.cft)
        }
      ]
    };
  }
};

export default DataCreater;