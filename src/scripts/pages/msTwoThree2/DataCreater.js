import R from 'ramda';
import moment from 'moment';
import Tools from 'utils/Tools';
import LonLat from 'utils/LonLat';

function mapDataToLineData(arrData) {
  let res = [];
  let toCood = LonLat["兰州"];
  for (let i = 0; i < arrData.length; i++) {
    let fromCood = LonLat[arrData[i].name];
    if (fromCood) {
      res.push({
        fromName: arrData[i].name,
        toName: "兰州",
        coords: [fromCood, toCood]
      });
    }
  }
  return res;
}

function mapDataToScatterData(arrData) {
  let res = [];
  for (let i = 0; i < arrData.length; i++) {
    let cood = LonLat[arrData[i].name];
    res.push({
      name: arrData[i].name,
      value: cood.concat(arrData[i].value),
      label:{
        normal:{
          position:arrData[i].name=="酒泉分行"?'top':'bottom'
        }
      }
    });
  }
  return res;
}

const DataCreater = {
  createMapOption: (arrData) => {
    return {
      geo: [
        {
          map: 'gansu',
          roam: false,
          silent: true,
          zoom: 0.8,
          center: [101.189226, 37.511994],
          itemStyle: {
            normal: {
              shadowColor: 'rgba(200,200,200,0.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 50,
              opacity:0
            }
          }
        },
        {
          map: 'gansu',
          roam: false,
          silent: true,
          zoom: 0.8,
          center: [101.189226, 37.511994],
          itemStyle: {
            normal: {
              shadowColor: '#0e2641',
              shadowOffsetX: 8,
              shadowOffsetY: 8,
              shadowBlur: 0,
              opacity:0
            }
          }
        },
        {
          map: 'gansu',
          roam: false,
          silent: true,
          zoom: 0.8,
          center: [101.189226, 37.511994],
          itemStyle: {
            normal: {
              // areaColor: '#022347',
              areaColor: 'rgba(0,0,0,0)',       
              borderWidth: 2,
              borderColor: '#3d526d',
            }
          }
        }
      ],
      series: [
        {
          name: "分行",
          type: 'scatter',
          coordinateSystem: 'geo',
          geoIndex: 2,
          symbol: 'pin',
          symbolSize: function (val) {
            return val[2];
          },
          itemStyle: {
            normal: {
              color: '#308000',
            }
          },
          label: {
            normal: {
              show: true,
              formatter: (v)=>{let s = v.name.replace("支行","");s = s.replace("分行","");return s},
              color: '#ffffff',
              position: 'bottom',
              fontSize: 14,
            }
          },
          data: mapDataToScatterData(arrData)
        },
        {
          name: "交易",
          type: 'lines',
          zlevel: 1,
          coordinateSystem: 'geo',
          geoIndex: 2,
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
              color: '#1ba600',
              width: 3,
              curveness: 0.2,
              type: 'dotted'
            }
          },
          data: mapDataToLineData(arrData)
        }
      ]
    };
  },
  createBandwidthOption: (arrData) => {
      //1次更改+》x轴间隔2分钟 minutes
      // console.log(arrData);
      // let arrTime=[];
      // let sTime=moment(arrData[0].time);
      // let eTime=moment(arrData[arrData.length-1].time);
      // //多少段arrData.length-1
      // let eveTime=Math.round((eTime-sTime)/(arrData.length-1)/60000);//间隔分钟
      // // console.log(eveTime);
      // arrTime.unshift(eTime.format("HH:mm"));
      // for(let i=0;i<arrData.length-1;i++){
      //   arrTime.unshift(eTime.subtract(eveTime,'minutes').format("HH:mm"));
      // }
      // 
      //2次更改
      // console.log(arrData);
      //i=1
      for(let i=1;i<arrData.length;i++){
        if(arrData[i].dianxinIn==0||arrData[i].dianxinOut==0){
          arrData[i].dianxinIn=arrData[i-1].dianxinIn;
          arrData[i].dianxinOut=arrData[i-1].dianxinOut;
        }
        if(arrData[i].liantongIn==0||arrData[i].liantongOut==0){
          arrData[i].liantongIn=arrData[i-1].liantongIn;
          arrData[i].liantongOut=arrData[i-1].liantongOut;
        }
        if(arrData[i].yidongIn==0||arrData[i].yidongOut==0){
          arrData[i].yidongIn=arrData[i-1].yidongIn;
          arrData[i].yidongOut=arrData[i-1].yidongOut;
        }
      }
      // console.log(arrData);
    return {
      color: ["#3c91d3", "#42b61f", "#64d6c7"],
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          let s = params[0].name + "<br/>"
            // +"<div style='display:inline-block;width: 10px;height: 10px;background-color: "+params[0].color+";border-radius: 10px;'/>    "+params[0].seriesName + "：" + (params[0].value).toFixed(2) + "M" + "<br/>"
            // +"<div style='display:inline-block;width: 10px;height: 10px;background-color: "+params[1].color+";border-radius: 10px;'/>    "+params[1].seriesName + "：" + (params[1].value).toFixed(2) + "M" + "<br/>"
            // +"<div style='display:inline-block;width: 10px;height: 10px;background-color: "+params[2].color+";border-radius: 10px;'/>    "+params[2].seriesName + "：" + (params[2].value).toFixed(2) + "M" + "";
            + params[0].seriesName + "：" + (params[0].value).toFixed(2) + "M" + "<br/>"
            + params[1].seriesName + "：" + (params[1].value).toFixed(2) + "M" + "<br/>"
            + params[2].seriesName + "：" + (params[2].value).toFixed(2) + "M" + "";
          return s;
        }
      },
      legend: {
        right: 0,
        orient: 'vertical',
        icon: 'rect',
        textStyle: {
          color: '#fff',
        },
        data: ["移动", "电信", "联通"]
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: { alignWithLabel: true, lineStyle: { color: '#fff' },interval:0 },
        axisLabel: { textStyle: { color: '#fff' },fontSize:10},
        // axisLabel: { textStyle: { color: '#fff' },fontSize:10},
        data: arrData.map(item => item.time),
        // data: arrTime,
        // data:["10:10",
        // "10:12",
        // "10:14",
        // "10:16",
        // "10:18",
        // "10:20",
        // "10:22",
        // "10:24",
        // "10:26",
        // "10:28",
        // "10:30",
        // "10:32",
        // "10:34",
        // "10:36",
        // "10:38",
        // "10:40",
        // "10:42",
        // "10:44",
        // "10:46",
        // "10:48",
        // "10:50",
        // "10:52",
        // "10:54",
        // "10:56",
        // "10:58",
        // "11:00",
        // "11:02"]
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
          formatter: v => v + 'M',
        },
        splitLine: { lineStyle: { color: '#2d5379' } },
      },

      series: [
        {
          type: 'line',
          symbol: 'none',
          smooth: true,
          name: '移动',
          barWidth: 15,
          data: arrData.map(item => item.yidongIn + item.yidongOut)
        },
        {
          type: 'line',
          symbol: 'none',
          smooth: true,
          name: '电信',
          barWidth: 15,
          data: arrData.map(item => item.dianxinIn + item.dianxinOut)
        },
        {
          type: 'line',
          symbol: 'none',
          smooth: true,
          name: '联通',
          barWidth: 15,
          data: arrData.map(item => item.liantongIn + item.liantongOut)
        }
      ]
    };
  },
  createRingOption: (arrData) => {
              return {
                color: ['#169b00', '#0672b0'],
                series: [{
                  name: '园区',
                  type: 'pie',
                  startAngle: 45,
                  radius: ['40%', '60%'],
                  labelLine: {
                    normal: {
                      lineStyle: {
                        color: '#fff'
                      }
                    }
                  },
                  label: {
                    normal: {
                      formatter: ' {per|{d}%}\n{hr|}\n{b|{b}}',
                      rich: {
                        b: {
                          align: 'center',
                          color: '#fff',
                          lineHeight: 25,
                          fontSize: 20,
                        },
                        hr: {
                          borderColor: '#fff',
                          width: '100%',
                          borderWidth: 0.5,
                          height: 0
                        },
                        per: {
                          align: 'center',
                          color: '#fff',
                          lineHeight: 25,
                          fontSize: 20,
                        }
                      }
          }
        },
        data: arrData
      }]
    };
  },
  //仪表盘左
  createLeftCircleOption:(val)=>{
    let unit = "K";
    let v = 0;
    if(val>1000){
      v = val/1024;
      unit = "M";
    }else{
      v = val;
    }
    v = Math.ceil(v*100)/100;

    return {
        title:{
          left:'center',
          bottom:'bottom',
          text:"同步速率",
          textStyle:{
                fontSize: 16,
                fontStyle: 'italic',
                color: '#fff',
          },
          shadowColor : '#fff', //默认透明
          shadowBlur: 5
        },
        tooltip : {
            // formatter: "{a} <br/>{b} : {c}M"
            formatter: "{a} :<br/> {c}"+unit+"/s"
        },
        toolbox: {
            show : false,
        },
        series: [
          {
              name: "同步速率",
              type: 'gauge',
              min:0,
              max:unit=="K"?1000:5,
              radius: '80%',
              axisLine: {            // 坐标轴线
                lineStyle: {
                    // color:[ [0.8, '#1e90ff'], [1, '#c20000']],
                    color:[ [1, '#1e90ff']],
                    width: 3,
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 4,
                    opacity:0.5
                }
              },
              axisTick: {            // 坐标轴小标记
                length :8,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 1
                },
                splitNumbr:5,
              },
              splitLine: {           // 分隔线
                length :12,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    width:2,
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 0
                }
              },
              pointer:{
                length:"75%",
                width:9,
              },
              detail: {
                formatter:'{value}'+unit+'/s',
                borderRadius: 3,
                backgroundColor: 'rgba(30,144,255,0.2)',
                borderColor: '#fff',
                shadowColor : '#fff', //默认透明
                shadowBlur: 5,
                shadowOffsetX: 1,
                shadowOffsetY: 0,
                borderWidth: 1,
                textBorderColor: '#000',
                textBorderWidth: 2,
                textShadowBlur: 2,
                textShadowColor: '#fff',
                textShadowOffsetX: 0,
                textShadowOffsetY: 0,
                fontFamily: 'Arial',
                fontSize:18,
                width: 100,
                color: '#eee',
                offsetCenter: [0, '76%'], 
              },
              data: [{value: v, name: ''}]
          }
        ]
    }

  },
  //仪表盘右侧
  createRightCircleOption:(val)=>{
    return {
        title:{
          left:'center',
          bottom:'bottom',
          text:"同步延时",
          textStyle:{
                fontSize: 16,
                fontStyle: 'italic',
                color: '#fff',
          },
          shadowColor : '#fff', //默认透明
          shadowBlur: 5
        },
        tooltip : {
          // formatter: "{a} <br/>{b} : {c}s"
          formatter: "{a} :<br/> {c}min"
        },
        toolbox: {
            show : false,
        },
        series: [
          {
              name: "同步延时",
              type: 'gauge',
              min:0,
              max:60,
              radius: '80%',
              axisLine: {            // 坐标轴线
                lineStyle: {
                    // color:[ [0.8, '#1e90ff'], [1, '#c20000']],//颜色段
                    color:[ [1, '#1e90ff']],
                    width: 3,
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 4,
                    opacity:0.5
                }
              },
              axisTick: {            // 坐标轴小标记
                length :8,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 1
                },
                splitNumbr:10,
              },
              splitLine: {           // 分隔线
                length :12,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    width:2,
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 0
                }
              },
              pointer:{
                length:"75%",
                width:6,
              },
              detail: {
                formatter:'{value}min',
                borderRadius: 3,
                backgroundColor: 'rgba(30,144,255,0.2)',
                borderColor: '#fff',
                shadowColor : '#fff', //默认透明
                shadowBlur: 5,
                shadowOffsetX: 1,
                shadowOffsetY: 0,
                borderWidth: 1,
                textBorderColor: '#000',
                textBorderWidth: 2,
                textShadowBlur: 2,
                textShadowColor: '#fff',
                textShadowOffsetX: 0,
                textShadowOffsetY: 0,
                fontFamily: 'Arial',
                fontSize:18,
                width: 100,
                color: '#eee',
                offsetCenter: [0, '76%'], 
              },
              data: [{value: val, name: ''}]
          }
        ]
    }

  }
};

export default DataCreater;