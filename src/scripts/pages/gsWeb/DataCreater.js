import R from 'ramda';
import LonLat from 'utils/LonLat';
// function randomData() {
//     let t=parseInt(Math.random()*(6000-0+1)+0);
//     return t
// }
function mapDataToScatterData(arrData) {
    let res = [];
    for (let i = 0; i < arrData.length; i++) {
      let cood = LonLat[arrData[i].name];
      if (cood) {
        res.push({
          name: arrData[i].name,
          value: cood.concat(arrData[i].value),
        });
      }
    }
    return res;
}
const DataCreater = {
    mapOption:(arrData)=>{
        // console.log(arrData);//已经排序
        //处理visualMap
        let avgValue;
        if(arrData.length==0){
            avgValue=0;
        }else{
            avgValue=(arrData[0].value)/6;
        }
        let mapData=mapDataToScatterData(arrData);
        return {
            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    if(params.value[2]){
                        return params.name + ":" + params.value[2];
                    }else{
                        return params.name;
                    }
                    
                }
            },
            visualMap: {
                type:"piecewise",
                itemSymbol :'rect',
                left: '20%',
                top: '90%',
                min: 0,
                max:6*avgValue,
                splitNumber: 6,
                pieces :[
                    {min:0*avgValue, max: 1*avgValue},
                    {min:1*avgValue, max: 2*avgValue},
                    {min:2*avgValue, max: 3*avgValue},
                    {min:3*avgValue, max: 4*avgValue},
                    {min:4*avgValue, max: 5*avgValue},
                    {min:5*avgValue, max: 6*avgValue},
                ],
                inverse:false,
                itemGap:0,
                itemWidth: 50,
                // align:"right",
                text: [(6*avgValue).toLocaleString(),"0"], 
                orient:'horizontal',          // 文本，默认为数值文本
                // showLabel:true,
                calculable: true,
                inRange: {
                    color: ['#afc0d7','#88a9d5','#6189bf','#3f6496','#163d71']
                },
                textStyle:{
                    color:'#fff',
                }
            },
            geo: {
                    map: 'china',
                    // aspectScale:1,
                    silent: true,
                    regions: [
                        {
                            name: '南海诸岛',
                            itemStyle: {
                                normal: {
                                    areaColor:'rgba(73,95,127,0.8)',
                                    borderColor: '#fff',
                                    shadowColor:'#000',
                                    shadowBlur:10,
                                    opacity:0.6
                                }
                            }
                        }
                    ]
            },
            series: [
                {
                    name: '区域',
                    type: 'map',
                    map: 'china',
                    roam: false,
                    left:"center",
                    top:"middle",
                    label:{
                        emphasis: {
                            show: false,
                        }
                    },
                    itemStyle:{
                        normal:{
                            color:"#fff",
                            borderColor:"#040404",
                            shadowBlur:5,
                            shadowColor:"#040404"
                        },
                        emphasis: {
                            shadowBlur:10,
                        }
                    },
                    data:arrData,
                    // data:[
                    //     {name: '北京',value: randomData() },
                    //     {name: '天津',value: randomData() },
                    // ]
                },
                {
                    zlevel:2,
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbol: 'image://' + window.dominContext.staticPath + '/assets/images/gsweb/pin.png',
                    symbolOffset: [0,"-40%"],
                    // symbolSize: [76,91],//图片尺寸
                    symbolSize:function(value){
                        // console.log(String(value[2]));
                        let len=String(value[2]).length;
                        let x=76*len/5;
                        let y=91*len/5;
                        return [x,y]
                    },
                    label: {
                        normal: {
                            show: true,
                            formatter: function(obj){
                                return `${obj.value[2].toLocaleString("en-US")}`
                            },
                            position:['50%','26%'],
                            align:"center",
                            color:'#fff',
                            fontFamily:"Arial",
                            fontWeight:"bold",
                            fontSize:18,
                        },
                     
                    },
                    itemStyle:{
                        normal:{
                            opacity :.9,
                        }  
                    },
                    data:mapData
                },
                {
                    name: '地区：',
                    type: 'scatter',
                    zlevel:1,
                    coordinateSystem: 'geo',
                    symbolSize:15,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'bottom',
                            show: true,
                            color:"#fff",
                            fontSize:12,
                            textBorderColor :"#000",
                            textBorderWidth :3,
                            textshadowColor:"#000",
                            textshadowBlur :10,
                        }
                    },
                    itemStyle: {
                        normal: {
                            color:"#fff",
                            borderColor :'#fff',
                            shadowBlur: 10,
                            borderWidth:2,
                            shadowColor: '#fff'
                        }
                    },
                    data:mapData
                }
            ],
            animationEasing: 'backIn',
            animationDuration: 1000,
            // animationDelayUpdate: 100,
            // animationDuration: function (idx) {
            //     // 越往后的数据延迟越大
            //     return idx * 100;
            // },
            // animationDelayUpdate: function (idx) {
            //     return idx * 10;
            // }
        }
    },
    trendLine:(arrData)=>{
        let curNewData = R.clone(arrData[0]);
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
        return {
            color: ['#42b61f', '#4e6f90'],
            tooltip: {
                trigger: 'axis',//axis item
            },
            toolbox: {
                show: false
            },
            legend: {
                show: false,
            },
            grid: {
                show: false,
                left: 0,
                // right: 100,
                bottom: 0,
                top:70,
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 
                axisLine: {
                    show:true,
                    symbol :['none', 'arrow'],
                    lineStyle: {
                        color: '#cccccc'
                    }
                },
                // axisLabel:{
                //     interval:0,
                //     color:"#fff",
                // },
                axisTick:{
                    show:false,
                    alignWithLabel:true,
                    interval:0,
                },
                splitLine: {
                    show: false
                },
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    symbol:['none','arrow'],
                    lineStyle: {
                        color: '#cccccc'
                    }
                },
                axisLabel:{
                    color:"#fff",
                    fontSize:18,
                    fontFamily:'AdobeHeitiStd Regular'
                },
                axisTick: { show: false },
                splitLine: { show: false }
            },
            series: [
                {
                    name:'今日',
                    type: 'line',
                    smooth:true,
                    symbolSize:0,
                    zlevel:10,
                    lineStyle:{
                        normal:{
                            color: '#394C5D',
                            width:4,
                        }
                    },
                    data: curNewData
                },
                {
                    name:'昨日',
                    type: 'line',
                    smooth:true,
                    symbolSize:0,
                    zlevel:1,
                    lineStyle:{
                        normal:{
                            width:0,
                        }
                    },
                    markPoint: {
                        symbol:'pin',
                        symbolSize:function(value){
                            let len=String(value).length;
                            let x=20*len;
                            let y=15*len;
                            return [x,y]
                        },
                        symbolOffset :[0, 5],
                        silent:true,
                        label:{
                            normal:{
                                color:'#fff',
                                fontSize:18,
                                fontFamily:'Arial Bold'
                            }
                        },
                        itemStyle:{
                            normal:{
                                color:'rgba(4,103,128,.3)'
                            }
                        },
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        silent: true,
                        symbol:['arrow','arrow'],
                        label:{
                           normal:{
                                show:true,
                                position:'middle',
                                formatter: '{a}:\n{b}:{c}',
                                fontWeight:'bold',
                                fontSize:16
                           }
                        },
                        lineStyle:{
                            normal:{
                                color:'red',
                                width:2,
                                type:'dotted'
                            }
                        },
                        data: [
                            // {yAxis: 600,name:"标注值"},
                            {type: 'average', name: '均值'}
                        ]
                    },
                    areaStyle: {
                        normal:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                        {
                                            offset: 0, color: 'rgb(4,103,128)' // 0% 处的颜色
                                        }, 
                                        {
                                            offset: 1, color: 'rgb(12,45,88)' // 100% 处的颜色
                                        }
                                ],
                                globalCoord: false // 缺省为 false
                            },
                            opacity:.5
                        }
                    },
                    data: arrData[1]
                }      
            ]
        }
    },
    //oneBar
    oneBarOption:(arrData)=>{
        return {
            tooltip: {},
            grid: {
                left:0,
                bottom:0,
                top:25,
                right:80,
                containLabel: true
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
                inverse:true,
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { textStyle: { color: '#fff', fontSize:20 ,padding:[0,10,0,0]} },
                data: arrData.map( obj => obj.name )
            },
            series: [
                {
                    type: 'bar',
                    barWidth:35,
                    barMinHeight:5,
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter:({value})=>{
                                return (value/1e4).toFixed(2)+"万";
                                // return value.toFixed(2)+"万";
                            },
                            textStyle:{
                                color:'#fff',
                                fontFamily:'微软雅黑',
                                fontSize:18
                            },
                        }
                    },
                    itemStyle: {
                        normal:{
                            color:{
                                type:'linear',
                                x:0,
                                y:0,
                                X2:0,
                                y2:1,
                                colorStops: [{
                                    offset: 0, color: '#5c5c5c' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#cbcbcb' // 100% 处的颜色
                                }],
                                globalCoord: false,
                            },
                            borderColor:"#fff",
                            borderWidth:1,
                            barBorderRadius :[0,12,12,0],
                            shadowColor: 'rgba(255, 255, 255, 0.5)',
                            shadowBlur:4
                        },
                        emphasis:{
                            color:{
                                type:'linear',
                                x:0,
                                y:0,
                                X2:0,
                                y2:1,
                                colorStops: [{
                                    offset: 0, color: '#cbcbcb' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#5c5c5c' // 100% 处的颜色
                                }],
                                globalCoord: false,
                            }
                        }
                    },
                    data:arrData
                }
            ],
            animationEasing: 'elasticOut',
            animationDuration: function (idx) {
                return idx * 500;
            },
            animationDelayUpdate: function (idx) {
                return idx * 100;
            }
        }
    },
    doubleBarOption:(arrData)=>{
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },
            legend: {
                right: 0,
                itemGap:20,
                textStyle: {
                    color: '#fff',
                },
                data: ["当前", "昨日"]
            },
            grid: {
                left:0,
                bottom:10,
                top:30,
                right:0,
                containLabel: true
            },
            yAxis: {
                type: "value",
                axisLine: { 
                    symbol:['arrow', 'arrow'],
                    lineStyle:{
                        color:'#ffffff'
                    }
                },
                axisTick: { show: false },
                // axisLabel: { 
                //     formatter:({value})=>{
                //         return (value/1e4).toFixed(2)+"万";
                //     },
                //  },
                splitLine: { show: false },
            },
            xAxis: {
                type: 'category',
                position :'top',
                // inverse:true,
                axisLine: { 
                    symbol:['none', 'arrow'],
                    lineStyle:{
                        color:'#ffffff'
                    }
                },
                axisTick: { show: false },
                axisLabel: { 
                    textStyle: { 
                        color: '#fff',
                        fontSize:20
                    } 
                },
                data: arrData.map( obj => obj.name )
            },
            series: [
                {
                    type: 'bar',
                    // barWidth:16,
                    // barGap:"10%",
                    name:'当前',
                    legendHoverLink: true,
                    label: {
                        normal: {
                            show: false,
                            // position: 'top',
                            // formatter:({value})=>{
                            //     // return (value/1e4).toFixed(2)+"万";
                            //     return value.toFixed(1);
                            // },
                            // textStyle:{
                            //     color:'#fff',
                            //     fontFamily:'微软雅黑',
                            //     fontSize:10
                            // },
                        }
                    },
                    itemStyle: {
                        normal: {
                            color:{
                                type:'linear',
                                x:0,
                                y:0,
                                X2:0,
                                y2:1,
                                colorStops: [{
                                    offset: 0, color: '#a3ceff' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#000085' // 100% 处的颜色
                                }],
                                globalCoord: false,
                            },
                            barBorderRadius :2,
                            borderColor:'#ffffff',
                            borderWidth:1,
                            shadowColor: 'gray',
                            shadowBlur: 2,
                            shadowOffsetY:-2,
                            shadowOffsetX:-2,
                        }
                    },
                    data:arrData.map(obj=>obj.value)
                },
                {
                    type: 'bar',
                    // barWidth:16,
                    // barGap:"10%",
                    name:'昨日',
                    legendHoverLink: true,
                    label: {
                        normal: {
                            show: false,
                            // position: 'top',
                            // formatter:({value})=>{
                            //     // return (value/1e4).toFixed(2)+"万";
                            //     return value.toFixed(1);
                            // },
                            // textStyle:{
                            //     color:'#fff',
                            //     fontFamily:'微软雅黑',
                            //     fontSize:10
                            // },
                        }
                    },
                    itemStyle: {
                        normal: {
                            color:{
                                type:'linear',
                                x:0,
                                y:0,
                                X2:0,
                                y2:1,
                                colorStops: [{
                                    offset: 0, color: '#b9f3ff' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#00435c' // 100% 处的颜色
                                }],
                                globalCoord: false,
                            },
                            barBorderRadius :2,
                            borderColor:'#ffffff',
                            borderWidth:1,
                            shadowColor: 'gray',
                            shadowBlur: 2,
                            shadowOffsetY:2,
                            shadowOffsetX:2,
                        }
                    },
                    data:arrData.map(obj=>obj.valueHis)
                }
            ],
            animationEasing: 'elasticOut',
            animationDuration: function (idx) {
                // 越往后的数据延迟越大
                return idx * 800;
            },
            animationDelayUpdate: function (idx) {
                return idx * 200;
            }
        }
    },
    // 右
    pie3D:() => {
        return {
            type: "pie",
            alpha:0.5,
            borderAlpha:0,
            fontFamily:'微软雅黑',
            groupedAlpha:0,
            colors: ["#3e5477","#062c6a","#0054d5","#2874e5","#5497fb","#8bb7f9","#5a9ba3"],
            radius:90,
            labelRadius:8,
            pullOutRadius: "15%",
            pulledField: 'pulled',
            pullOutEffect:'elastic',
            valueField: "value",
            titleField: "title",
            color: '#ffffff',
            labelText: '[[title]]\n[[percents]]%',
            labelTickColor: '#ffffff',
            labelsEnabled:true,
            labelTickAlpha: 0.3,
            fontSize: 12,
            outlineColor:'#ffffff',
            outlineAlpha: 0.3,
            depth3D: 20,
            angle: 55,
            balloonText: "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
            // startDuration: 0,
            export: {
                enabled: false
            },
            legend: {
                color: '#ffffff',
                position: 'right',
                fontSize:14,
                valueText: "[[close]]",
                // valueWidth: 60,
                width: 80,
                verticalGap:15
              }
        }
    },
    //12
    jylBarOption: (timeArr,zfbArr,cftArr) => {
        return {
            legend: {
                right: 0,
                itemGap:40,
                textStyle: {
                color: '#fff',
                },
                data: ["支付宝", "财付通"]
            },
            tooltip:{
                trigger: 'axis',
                axisPointer:{
                    type:'shadow'
                }
            },
            grid: {
                left:0,
                bottom:20,
                top:30,
                right:0,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                axisLine: {
                    symbol:['none', 'arrow'],
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisTick: { alignWithLabel: true, lineStyle: { color: '#fff' } },
                axisLabel: { textStyle: { color: '#fff' },interval:0 },
                data: timeArr
            },
            yAxis: {
                type: "value",
                axisLine: {
                    symbol:['none', 'arrow'],
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
                    barWidth: 30,
                    itemStyle: {
                        normal: {
                            color:{
                                type:'linear',
                                x:0,
                                y:0,
                                X2:0,
                                y2:1,
                                colorStops: [{
                                    offset: 0, color: '#aaaaaa' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#cccccc' // 100% 处的颜色
                                }],
                                globalCoord: false,
                            },
                        }
                    },
                    data: zfbArr
                },
                {
                    type: 'bar',
                    name: '财付通',
                    stack: '占比',
                    barWidth: 30,
                    itemStyle: {
                        normal: {
                            color:{
                                type:'linear',
                                x:0,
                                y:0,
                                X2:0,
                                y2:1,
                                colorStops: [{
                                    offset: 0, color: '#eeeeee' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#dddddd' // 100% 处的颜色
                                }],
                                globalCoord: false,
                            },
                        }
                    },
                    data: cftArr
                },
            
            ],
            animationEasing: 'backIn',
            animationDuration: function (idx) {
                return idx * 500;
            },
            animationDelayUpdate: function (idx) {
                return idx * 100;
            }
        };
    },
    jyjeBarOption: (timeArr,zfbArr,cftArr) => {
        return {
            tooltip:{
                trigger: 'axis',
                axisPointer:{
                    type:'shadow'
                }
            },
            legend: {
                right: 0,
                itemGap:40,
                textStyle: {
                    color: '#fff',
                },
                data: ["支付宝", "财付通"]
            },
            grid: {
                left:0,
                bottom:20,
                top:30,
                right:0,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                axisLine: {
                    symbol:['none', 'arrow'],
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisTick: { alignWithLabel: true, lineStyle: { color: '#fff' } },
                axisLabel: { textStyle: { color: '#fff' },interval:0 },
                data: timeArr
            },
            yAxis: {
                type: "value",
                axisLine: {
                    symbol:['none', 'arrow'],
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisTick: { show: false },
                axisLabel: {
                    textStyle: { color: '#fff', fontSize: 12 },
                    // formatter: v => Math.round(v / 1e8) + '亿',
                    formatter: v => v / 1e8 + '亿'
                },
                splitLine: { lineStyle: { color: '#202933' } },
            },
            series: [
                {
                    type: 'bar',
                    name: '支付宝',
                    barWidth: 20,
                    // barGap:"15%",
                    itemStyle: {
                        normal: {
                            color:{
                                type:'linear',
                                x:0,
                                y:0,
                                X2:0,
                                y2:1,
                                colorStops: [{
                                    offset: 0, color: '#a3ceff' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#000085' // 100% 处的颜色
                                }],
                                globalCoord: false,
                            },
                            barBorderRadius :2,
                            borderColor:'#ffffff',
                            borderWidth:1,
                            shadowColor: 'gray',
                            shadowBlur: 3,
                            shadowOffsetY:-2,
                            shadowOffsetX:-2,
                        }
                    },
                    data:zfbArr
                },
                {
                    type: 'bar',
                    name: '财付通',
                    barWidth: 20,
                    // barGap:"15%",
                    itemStyle: {
                        normal: {
                            color:{
                                type:'linear',
                                x:0,
                                y:0,
                                X2:0,
                                y2:1,
                                colorStops: [{
                                    offset: 0, color: '#b9f3ff' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#00435c' // 100% 处的颜色
                                }],
                                globalCoord: false,
                            },
                            barBorderRadius :2,
                            borderColor:'#ffffff',
                            borderWidth:1,
                            shadowColor: 'gray',
                            shadowBlur: 3,
                            shadowOffsetY:2,
                            shadowOffsetX:2,
                        }
                    },
                    data: cftArr
                }
            ],
            animationEasing: 'backIn',
            animationDuration: function (idx) {
                return idx * 500;
            },
            animationDelayUpdate: function (idx) {
                return idx * 100;
            }
        }
    }
}
export default DataCreater;