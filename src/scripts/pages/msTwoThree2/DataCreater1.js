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
var data =[ // selected:true 默认选中
  {name:'兰州市',value:121121},
  {name:'平凉市',value:13123},
  {name:'白银市',value:12324},
  {name:'庆阳市',value:12134},
  {name:'天水市',value:11235},
  {name:'酒泉市',value:11236},
  {name:'定西市',value:1127},
  {name:'嘉峪关市',value:18},
  {name:'金昌市',value:12},
  {name:'陇南市',value:12},
  {name:'临夏回族自治州',value:12},
  {name:'武威市',value:12},
  {name:'甘南藏族自治州',value:12},
  {name:'张掖市',value:12},
];
var data1 =[ // selected:true 默认选中
  {name:'兰州市',selected: false},
  {name:'平凉市',selected: false},
  {name:'白银市',selected: false},
  {name:'庆阳市',selected: false},
  {name:'天水市',selected: false},
  {name:'酒泉市',selected: false},
  {name:'定西市',selected: false},
  {name:'嘉峪关市',selected: false},
  {name:'金昌市',selected: false},
  {name:'陇南市',selected: false},
  {name:'临夏回族自治州',selected: false},
  {name:'武威市',selected: false},
  {name:'甘南藏族自治州',selected: false},
  {name:'张掖市',selected: false},
];
var geoCoordMap = {};
var convertData = function(data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value),
      });
    }
  }
  console.log(res)
  return res;
};

const DataCreater1 = {
  createMapOption: (arrData) => {
    return {
      // geo: {
      //   center: [99.1819226, 38.511994],
      //   show: true,
      //   map: "gansu",
      //   label: {
      //     normal: {
      //       show: false
      //     },
      //     emphasis: {
      //       show: false,
      //     }
      //   },
      //   roam: false,
      //   itemStyle: {
      //     normal: {
      //       areaColor: '#023677',
      //       borderColor: '#1180c7',
      //     },
      //     emphasis: {
      //       areaColor: '#4499d0',
      //     }
      //   }
      // },
      tooltip: {
        trigger: 'item',
        formatter: '{b}'
      },
      series: [
        {
          map: 'gansu',
          grid:{left:'10%'},
          name: '甘肃',
          type: 'map',
          mapType: 'gansu',
          zoom: 0.8,
          center: [99.1819226, 38.511994],
          //selectedMode: 'multiple',  // 选中效果固话
          label: {
            normal: {
              show: true,//显示省份标签
              textStyle:{color:"#c71585"},//省份标签字体颜色
              fontSize:9,
            },
            // emphasis: {
            //   show:true
            // }
          },
          itemStyle: {
            normal: {  //未选中
              borderWidth:2,//边框大小
              borderColor:'#89a3fc',//lightgreen
              areaColor: '#2b58fa',//背景颜色
              label: {
                show: false
              }
            },
            emphasis: {  //选中
              borderWidth:2,
              borderColor:'#89a3fc',
              areaColor: '#efe75f',
              label: {
                show: true,

              }
            }
          },

          data: data1
        },
        // {
        //
        //   name: 'Top 5',
        //   type: 'effectScatter',
        //   coordinateSystem: 'geo',
        //   data:convertData(data.sort(function(a, b) {
        //     return b.value - a.value;
        //   }).slice(0, 10)),
        //   symbolSize: function(val) {
        //     return val[2] / 10;
        //   },
        //   showEffectOn: 'render',
        //   rippleEffect: {
        //     brushType: 'stroke'
        //   },
        //   hoverAnimation: true,
        //   label: {
        //     normal: {
        //       formatter: '{b}',
        //       position: 'left',
        //       show: false
        //     }
        //   },
        //   itemStyle: {
        //     normal: {
        //       color: 'yellow',
        //       shadowBlur: 10,
        //       shadowColor: 'yellow'
        //     }
        //   },
        //   zlevel: 1
        // },
      ]
    }
  }
  ,
  up10: (arrData) => {
    let maxNumber = arrData[0].value;
    let maxArr = []
    for (let i = 0; i < 10; i++) {
      maxArr.push(maxNumber)
    }
    return {
      tooltip: {},
      grid: {
        left: 10,
        // right: 20,
        bottom: 0,
        containLabel: true
      },
      yAxis: [
        {
          offset: 5,
          show: true,
          type: 'category',
          inverse: true,
          axisLine: {
            show: false,
          },

          axisTick: { show: false },
          axisLabel: {textStyle: { color: '#fff', fontSize: 14, fontfamily: '微软雅黑' } ,
            formatter: function (params){ //标签输出形式 ---请开始你的表演
              var my_length = 13;
              if( params.length > my_length) return params.substring(0,my_length)+"...";
              else return params;
            }},
          data: arrData.map(o => o.name)
        },
        {
          offset: 20,
          // axisTick: 'none',
           inverse: true,
           axisLine: 'none',
          axisLabel: {
             align:'center',
           // align:'left',
            textStyle: {
              color: '#2FCCDF',
              fontSize: 14,
              fontfamily: '微软雅黑',
            }
          },
          data: arrData.map(o => o.value)
        }
      ],
      xAxis: {
        show: false,
        // type:'value'
      },
      series: [
        {
          type: 'bar',
           barWidth: 14,
          // barCategoryGap:20,
           barGap: '-100%',
          silent: true, //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
          label: {
            normal: {
              show: false,
            }
          },
          itemStyle: {
            normal: {
              color: '#256DB9',/*'#256DB9',*/  //底色
              borderWidth: 1,
               borderColor: '#256DB9'/*'#256DB9'*/ //轮廓
            }
          },
          data: maxArr,
        },
        {
          type: 'bar',
          barWidth: 14,
          // barMaxHeight: 50,
          z: 3,
          label: {
            normal: {
              show: false,
              fontSize: 16,
              distance: 1,
              // position: 'right',
              formatter: (params) => {
                return Number(params.value)
              },
              // color: '#b94853'  //256DB9
            }
          },
          itemStyle: {
            normal: {
              color: '#2FCCDF' //#2FCCDF
            }

          },
          data: arrData
        }

      ],
      animationEasing: 'elasticOut',
      animationDuration: function(idx) {
        // 越往后的数据延迟越大
        return idx * 500;
      },
      animationDelayUpdate: function(idx) {
        return idx * 100;
      }
    }
  },
  dow10: (arrData) => {
    let maxNumber = arrData[0].value;
    let maxArr = []
    for (let i = 0; i < 10; i++) {
      maxArr.push(maxNumber)
    }
    return {
      tooltip: {},
      grid: {
        left: 10,
        // right: 20,
        bottom: 0,
        containLabel: true
      },
      yAxis: [
        {
          offset: 5,
          show: true,
          type: 'category',
          inverse: true,
          axisLine: {
            show: false,
          },

          axisTick: { show: false },
          axisLabel: {textStyle: { color: '#fff', fontSize: 14, fontfamily: '微软雅黑' } ,
            formatter: function (params){ //标签输出形式 ---请开始你的表演
              var my_length = 13;
              if( params.length > my_length) return params.substring(0,my_length)+"...";
              else return params;
            }},
          data: arrData.map(o => o.name)
        },
        {
          offset: 20,
          // axisTick: 'none',
           inverse: true,
           axisLine: 'none',
          axisLabel: {
            align:'center',
            textStyle: {
              color: '#FCC190',
              fontSize: 14,
              fontfamily: '微软雅黑',
            }
          },
          // data: arrData.map(o => "-"+o.value)
          data: arrData.map(o => {
            if (o.value==null||o.value===""){
              return ""
            }else{
             return "-"+o.value
            }

          })
        }
      ],
      xAxis: {
        show: false,
        // type:'value'
      },
      series: [
        {
          type: 'bar',
          barWidth: 14,
          // barCategoryGap:20,
          barGap: '-100%',
          silent: true, //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
          label: {
            normal: {
              show: false,
            }
          },
          itemStyle: {
            normal: {
              color: '#FCC190',/*'#256DB9',*/  //底色
              borderWidth: 1,
              borderColor: '#b99c44'/*'#256DB9'*/ //轮廓
            }
          },
          data: maxArr,
        },
        {
          type: 'bar',
          barWidth: 14,
          // barMaxHeight: 50,
          z: 3,
          label: {
            normal: {
              show: false,
              fontSize: 16,
              distance: 1,
              // position: 'right',
              formatter: (params) => {
                return Number(params.value)
              },
              color: '#b96657'
            }
          },
          itemStyle: {
            normal: {
              color: '#CB854C' //#2FCCDF
            }

          },
          data: arrData
        }

      ],
    }
  },
  cksdh10: (arrData) => {
    var arrName=[];
    var arrValue=[];
    if (arrData.length>0){
      for(var i=arrData.length-1;i>=0;i--){
        arrName.push(arrData[i].name);
        arrValue.push(arrData[i].value);
      }
    }

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        // boundaryGap: [0, 0.01],
        axisLabel: {
          color: "#2FCCDF" //2FCCDF
        },
        splitLine: {
          lineStyle:{type:'dashed'}
          },
        axisLine: {
          lineStyle: {
            color: '#8ABAFF',
            width: 1,//这里是为了突出显示加上的
          }
        }
      },
      yAxis:
        {
          offset:5,
          axisLine: {
            lineStyle: {
              color: '#8ABAFF',
              width: 1,//这里是为了突出显示加上的
            }
          },
          type: 'category',
          axisLabel: {textStyle: { color: '#fff', fontSize: 14, fontfamily: '微软雅黑' } ,
            formatter: function (params){ //标签输出形式 ---请开始你的表演


              //甘肃省公路航空旅游投资集团有限公司_甘肃银行嘉峪关分行（一级分支行）
              // if (params.length>15){
              //   if(params.indexOf("_")!=-1){
              //     var sdhName = params.split["_"][0];
              //     var orgName = params.split["_"][1].replace("(一级分支行)", "").replace("甘肃银行","");//去掉甘肃银行和一级分支行的机构名称
              //     params= sdhName+"...("+orgName+")";
              //     return params;
              //     }
              //   // }else{
              //   //   var my_length = 15;
              //   //   if( params.length > my_length) return params.substring(0,my_length)+"...";
              //   //   else return params;
              //   // }
              // } else return params;

              var my_length = 15;
              if( params.length > my_length) return params.substring(0,my_length)+"...";
              else return params;

              // if (params!=""){
              //
              //   if (params.indexOf("_")!=-1){  //总行
              //     var sdhName = params.split["_"][0];
              //     var orgName = params.split["_"][1].replace("(一级分支行)", "").replace("甘肃银行","");//去掉甘肃银行和一级分支行的机构名称
              //     params= sdhName+"...("+orgName+")";
              //     console.log(params);
              //     return params;
              //   }else{
              //     return params;
              //   }
              // }else {
              //   return params;
              // }


            }},
          // data: ArrName
          data:arrName
        },

      series: {
        type: 'bar',
        barWidth: 14,
        // barCategoryGap:20,
        barGap: '-100%',
        itemStyle: {
          normal: {
            color: '#2FCCDF',/*'#031329',*/
            borderWidth: 1,
            // borderColor: '#256DB9'/*'#28446d'*/
          }
        },
        // data: ArrValue
        data:arrValue,
        label: {
          normal: {
            show: true,
            position: 'right',
          }
        },
      },
    }
  },
  dksdh10: (arrData) => {
    var arrName=[];
    var arrValue=[];
    if (arrData.length>0){
      for(var i=arrData.length-1;i>=0;i--){
        arrName.push(arrData[i].name);
        arrValue.push(arrData[i].value);
      }
    }

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        // boundaryGap: [0, 0.01],
        axisLabel: {
          color: "#84E5B4"
        },
        splitLine: {
          lineStyle:{
            type:'dashed'
          }
          },
        axisLine:{
          lineStyle:{
            color:'#8ABAFF',
            width:1,//这里是为了突出显示加上的
          }
        },

      },
      yAxis:
          {
            offset:5,
            axisLine: {
              lineStyle: {
                color: '#8ABAFF',
                width: 1,//这里是为了突出显示加上的
              }
            },
            type: 'category',
            axisLabel: {
              textStyle: {
                color: '#fff', fontSize: 14, fontfamily: '微软雅黑'
              } ,
              formatter: function (params){ //标签输出形式 ---请开始你的表演
                var my_length = 15;
                if( params.length > my_length) return params.substring(0,my_length)+"...";
                else return params;
              }},
            lineStyle:{
              color:'#8ABAFF',
              width:1,//这里是为了突出显示加上的
            },
            // data: ArrName
            data:arrName
          },

      series: {
        type: 'bar',
        barWidth: 14,
        // barCategoryGap:20,
        barGap: '-100%',
        itemStyle: {
          normal: {
            color: '#84E5B4',/*'#031329',*/
            borderWidth: 1,
            // borderColor: '#256DB9'/*'#28446d'*/
          }
        },
        // data: ArrValue
        data:arrValue,
        label: {
          normal: {
            show: true,
            position: 'right',
          }
        },
      },
    }
  },

};

export default DataCreater1;