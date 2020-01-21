
import Tools from 'utils/Tools';
import R from 'ramda';
import moment from 'moment';
import LonLat from 'utils/LonLat';

function mapDataToLineData(arrData) {
  let res = [];
  let toCood = LonLat["兰州"];
  for (let i = 0; i < arrData.length; i++) {
    let fromCood = LonLat[arrData[i].name];
    if (fromCood) {
      let fromCoodClone = R.clone(fromCood);
      if (fromCoodClone[0] < -18) {
        fromCoodClone[0] += 360;
      }
      res.push({
        fromName: arrData[i].name,
        toName: "兰州",
        coords: [fromCoodClone, toCood]
      });
    }
  }
  return res;
}

function mapDataToScatterData(arrData) {
  let res = [];
  for (let i = 0; i < arrData.length; i++) {
    let cood = LonLat[arrData[i].name];
    if (cood) {
      let coodClone = R.clone(cood);
      if (coodClone[0] < -18) {
        coodClone[0] += 360;
      }
      res.push({
        name: arrData[i].name,
        value: coodClone.concat(arrData[i].value)
      });
    }
  }
  return res;
}

const DataCreater = {
  createRealtimeLineOption: (arrData) => {
    return {
      tooltip:{
        trigger: 'axis',
        formatter:'{b}时：{c}'
      },
      grid: {
        left: '0%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          // position:'bottom',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#183b6f'
            }
          },
          axisTick: { show: false },
          axisLabel: {
            textStyle: {
              color: '#ffffff',
            }
          },

          data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#183b6f'
            }
          },
          axisTick: { show: false },
          axisLabel: { textStyle: { color: '#fff' } },
          splitLine: { lineStyle: { color: '#1f2b39' } }
        }
      ],
      series: [
        {
          type: 'line',
          symbol: 'none',
          smooth:true,
          lineStyle: {
            normal: {
              color: '#9bc344'
            }
          },
          itemStyle: {
            normal: {
              color: '#9bc344',
            }
          },
          data: arrData
        }
      ]
    };
  },
  createCountriesTop10Option: (arrData) => {
    return {
      grid: {
        left: '0%',
        right: '4%',
        bottom: '3%',
        top:'6%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          axisLine: {            
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {            
            interval:0,
            textStyle: {
              color: '#fff',
              fontSize: 20
            }
          },
          axisTick: { show: false },
          data: arrData.map(item => item.name)
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
          axisLabel: {
            textStyle: {
              color: '#fff',
            }
          },
          splitLine: { show: false },
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '35',
          itemStyle: {
            normal: {
              color: '#576d86'
            }
          },
          data: arrData.map(item => item.value)
        }
      ]
    };
  },
  createMapOption: (arrData) => {
    return {
      graphic: [
        {
          type: 'image',
          id: 'logo',
          z: 100,
          bounding: 'raw',
          left: ((LonLat["兰州"][0] + 18) / (180 + 18) * 0.55 - 16 / 1920) * 100 + "%",
          top: ((90 - LonLat["兰州"][1]) / 150 - 16 / 900) * 100 + "%",
          style: {
            image: window.dominContext.staticPath + '/assets/images/mscard/logo.png',
            width: 32,
            height: 32
          }
        }
      ],
      geo: [
        {
          map: 'world',
          left: 0, top: 0, right: "45%", bottom: 0,
          boundingCoords: [
            // 定位左上角经纬度
            [-18, 90],
            // 定位右下角经纬度
            [180, -60]
          ],
          roam:false,
          silent: true,
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
          map: 'world',
          left: "55%", top: 0, right: 0, bottom: 0,
          boundingCoords: [
            // 定位左上角经纬度
            [-180, 90],
            // 定位右下角经纬度
            [-18, -90]
          ],
          roam:false,
          silent: true,
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
          map: 'world',
          left: 0, top: 0, right: "45%", bottom: 0,
          boundingCoords: [
            // 定位左上角经纬度
            [-18, 90],
            // 定位右下角经纬度
            [180, -60]
          ],
          roam:false,
          silent: true,
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
          map: 'world',
          left: "55%", top: 0, right: 0, bottom: 0,
          boundingCoords: [
            // 定位左上角经纬度
            [-180, 90],
            // 定位右下角经纬度
            [-18, -90]
          ],
          roam:false,
          silent: true,
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
          map: 'world',
          left: 0, top: 0, right: "45%", bottom: 0,
          boundingCoords: [
            // 定位左上角经纬度
            [-18, 90],
            // 定位右下角经纬度
            [180, -60]
          ],
          silent: true,
          itemStyle: {
            normal: {
              areaColor: '#cfcfcf',
              borderWidth:1,
              borderColor: '#3d526d',
            }
          },
          regions: [
            {
              name: 'China',
              itemStyle: {
                normal: {
                  areaColor: '#ff0000',//'#fec740',//'#6f6f6f','#ff0000',//
                  borderWidth:1,
                  borderColor: '#3d526d',
                }
              }
            }
          ]
        },
        {
          map: 'world',
          left: "55%", top: 0, right: 0, bottom: 0,
          boundingCoords: [
            // 定位左上角经纬度
            [-180, 90],
            // 定位右下角经纬度
            [-18, -90]
          ],
          silent: true,
          itemStyle: {
            normal: {
              areaColor: '#cfcfcf',
              borderWidth:1,
              borderColor: '#3d526d',
            }
          }
        }
      ],
      series: [
        //线与动画
        {
          name: "交易",
          type: 'lines',          
          coordinateSystem: 'geo',
          geoIndex: 4,
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            symbol: "pin",
            trailLength: 0.05,
            color: '#07f541',
            symbolSize: 10
          },
          lineStyle: {
            normal: {
              color: '#38689b',
              width: 3,
              curveness: 0.2,
              type: 'dotted'
            }
          },
          data: mapDataToLineData(arrData)
        },
        //散点
        {
          name: "交易",
          type: 'scatter',
          coordinateSystem: 'geo',
          geoIndex: 4,
          // symbol:'pin',
          symbol: 'image://' + window.dominContext.staticPath + '/assets/images/mscard/pin.png',
          symbolSize: 15,
          symbolOffset: [0, "20%"],
          label: {
            normal: {
              show: false,
              position: 'right',
              formatter: '{b}'
            }
          },
          itemStyle: {
            normal: {
              color: "#ff7200"
            }
          },
          data: mapDataToScatterData(arrData)
        }
      ]
    };
  },
  createAddAccountOption: (tArr,vArr) => {
    return {
      tooltip:{
        trigger: 'axis',
        formatter:'{b}月：{c}'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            show: true,
            // formatter:(v)=>{
            //   let s = v<10?"0"+v:v;
            //   return moment().format("YYYY")+"/"+s;
            // }
          },
          data: tArr
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
          splitLine: { lineStyle: { color: '#1f2b39' } }
        }
      ],
      series: [
        {
          type: 'line',
          symbol: 'none',
          smooth:true,
          lineStyle: {
            normal: {
              color: '#81b6fe'
            }
          },
          itemStyle: {
            normal: {
              color: '#81b6fe',
            }
          },
          data: vArr
        }
      ]
    };
  },
  createCardConsumePlaceOption: () => {
    return {
      "type": "pie",
      "colors": ['#6c9c8c', '#39524a', '#597f73', '#9ab8af'],
      "radius": 100,
      "pullOutRadius": "5%",
      "pulledField": 'pulled',
      "valueField": "value",
      "titleField": "title",
      "color": '#ffffff',
      "labelRadius":3,
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
    };
  },
  createCardConsumePlaceStructureOption: () => {
    return {
      "type": "pie",
      "colors": ['#6c9c8c', '#39524a', '#597f73', '#9ab8af'],
      "radius": 100,
      "pullOutRadius": "5%",
      "pulledField": 'pulled',
      "valueField": "value",
      "titleField": "title",
      "color": '#ffffff',
      "labelRadius":3,
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
    };
  }

};

export default DataCreater;