const DataCreater = {
    leftLine1: (obj) => {
        let val1=Math.min.apply(null,obj['zc']);
        let val2=Math.min.apply(null,obj['fz']);
        let minVal=val1>=val2?val2:val1;
        return {
            title: {
                // text:ChartTitle,
                textStyle: {
                    color: '#fff',
                    fontSize: 25,
                    fontWeight: 'normal',
                    fontFamily: '黑体'
                }
            },
            color: ['#ffff00', '#00ceff'],
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: false
            },
            legend: {
                show: true,
                data:[{name:"资产",icon:"diamond"},{name:"负债",icon:"diamond"}],
                top: 10,
                right: 20,
                itemWidth: 35,
                itemGap: 20,
                textStyle: {
                    color: '#fff',
                    fontSize: 18,
                    // fontWeight: 'normal',
                    fontFamily: '微软雅黑'
                },

            },
            grid: {
                show: false,
                left: 0,
                right: 20,
                bottom: 0,
                top: '20%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: obj['time'],
                interval :0,
                axisLine: {
                    show: true,
                    symbol: ['none', 'arrow'],
                    symbolSize: [8, 14],
                    lineStyle: {
                        color: '#394C5D',
                        width: 1
                    }
                },
                axisLabel: {
                    interval: 0,
                    color: "#fff"
                },
                axisTick: {
                    alignWithLabel: true,
                    interval: 0
                },
                splitLine: {
                    show: false
                },
            },
            yAxis: {
                type: 'value',
                name: "(亿元)",
                min:parseInt(minVal/1e8),
                nameTextStyle: {
                    color: "#fff"
                },
                axisLine: {
                    show: true,
                    symbol: ['none', 'arrow'],
                    symbolSize: [8, 14],
                    lineStyle: {
                        color: '#688094'
                    }
                },
                axisTick: {
                    show: false,

                },
                axisLabel: {
                    color: '#fff',
                    fontSize:14
                },
                splitLine: {
                    lineStyle: {
                        color: '#688094'
                    }
                }
            },
            series: [{
                    name: '资产',
                    type: 'line',
                    symbolSize:0,
                    smooth: true,

                    data: obj["zc"] && obj["zc"].map((v)=>{return (v/1e8).toFixed(1)})
                },
                {
                    name: '负债',
                    type: 'line',
                    symbolSize:0,
                    smooth: true,
                    data: obj["fz"] && obj["fz"].map((v)=>{return (v/1e8).toFixed(1)})
                },
            ]
        }
    },
    leftLine2: (obj) => {

        let v1=Math.min.apply(null,obj['ck']);
        let v2=Math.min.apply(null,obj['dk']);
        let minVal=v1>=v2?v2:v1;
        let val1=Math.max.apply(null,obj['ck']);
        let val2=Math.max.apply(null,obj['dk']);
        let maxVal=val1>=val2?val1:val2;
        return {
            title: {
                textStyle: {
                    color: '#fff',
                    fontSize: 25,
                    fontWeight: 'normal',
                    fontFamily: '黑体'
                }
            },
            color: ['#ffff00', '#00ceff'],
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: false
            },
            legend: {
                show: true,
                data:[{name:"存款",icon:"diamond"},{name:"贷款",icon:"diamond"}],
                top: 10,
                right: 20,
                itemWidth: 35,
                itemGap: 20,
                textStyle: {
                    color: '#fff',
                    fontSize: 18,
                    // fontWeight: 'normal',
                    fontFamily: '微软雅黑'
                },
            },
            grid: {
                show: false,
                left: 0,
                right: 20,
                bottom: 0,
                top: '20%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data:obj['time'],
                axisLine: {
                    show: true,
                    symbol: ['none', 'arrow'],
                    symbolSize: [8, 14],
                    lineStyle: {
                        color: '#394C5D',
                        width: 1
                    }
                },
                axisLabel: {
                    interval: 0,
                    color: "#fff"
                },
                axisTick: {
                    alignWithLabel: true,
                    interval: 0
                },
                splitLine: {
                    show: false
                },
            },
            yAxis: {
                type: 'value',
                name: "(亿元)",
                min:parseInt(minVal/1e8)-5,
                max:parseInt(maxVal/1e8)+5,
                nameTextStyle: {
                    color: "#fff"
                },
                axisLine: {
                    show: true,
                    symbol: ['none', 'arrow'],
                    symbolSize: [8, 14],
                    lineStyle: {
                        color: '#688094'
                    }
                },
                axisTick: {
                    show: false,

                },
                axisLabel: {
                    color: '#fff',
                    fontSize:14
                },
                splitLine: {
                    lineStyle: {
                        color: '#688094'
                    }
                }
            },
            series: [
                {
                    name: '存款',
                    type: 'line',
                    smooth: true,
                    data: obj["ck"] && obj["ck"].map((v)=>{return (v/1e8).toFixed(1)})
                },
                {
                    name: '贷款',
                    type: 'line',
                    smooth: true,
                    data: obj["dk"] && obj["dk"].map((v)=>{return (v/1e8).toFixed(1)})
                }
            ]
        }
    },
    createRingOption: (arrData) => {
        let arrName =[];
        if(arrData.length>1){
            for(var i = 0; i < arrData.length;i++){
                arrName.push(arrData[i].name)
            }
        }


        return {
            title:{
                text:'按渠道占比统计',
                textStyle: { //图例文字的样式
                    color: "#00AEFF",
                    fontSize: 19,
                },
                x:'center'
            },
            //color:['#3481ef','#57d7f7','#d2f7fa','#50d6fc'],
             color: ['#9cfc05', '#dc3b40','#f9da50','#c5dff4'],
            legend: {
                selectedMode:false,//取消点击
                type: 'scroll',
                orient: 'vertical',
                left: 'left',
                textStyle: { //图例文字的样式
                    color: '#fff',
                    fontSize: 16
                },
                data: arrName,
            },
            series: [{
                minAngle: 5,           　　 //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
                avoidLabelOverlap: true,   //是否启用防止标签重叠策略
                name: '园区',
                type: 'pie',
                hoverAnimation:false,
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
                        formatter: ' {per|{d}%}\n',
                        // formatter(v) {
                        //     let text = Math.round(v.percent)+'%' + '\n' + v.name
                        //     if(text.length <= 8)
                        //     {
                        //         return text;
                        //     }else if(text.length > 8 && text.length <= 16){
                        //         return text = `${text.slice(0,8)}\n${text.slice(8)}`
                        //     }else if(text.length > 16 && text.length <= 24){
                        //         return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16)}`
                        //     }else if(text.length > 24 && text.length <= 30){
                        //         return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16,24)}\n${text.slice(24)}`
                        //     }else if(text.length > 30){
                        //         return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16,24)}\n${text.slice(24,30)}\n${text.slice(30)}`
                        //     }
                        // },
                        // textStyle : {
                        //     fontSize :16
                        // },
                       // formatter: ' {per|{d}%}\n{hr|}\n{b|{b}}',
                        rich: {
                            b: {
                                align: 'center',
                                color: '#fff',
                                lineHeight: 25,
                                fontSize: 16,
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
                                fontSize: 16,
                            }
                        }
                    }
                },
                data: arrData
            }]
        };
    },
    ysTrend: (obj) => {
        let minVal=Math.min.apply(null,obj['ys']);
        return {
            color: ['#4375b6', '#82a633'],
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: false
            },
            grid: {
                left: 20,
                right: 40,
                bottom: 30,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                name: '(日)',
                nameTextStyle: {
                    color: "#fff"
                },
                data: obj['time'],
                axisLine: {
                    show: true,
                    symbol: ['none', 'arrow'],
                    symbolSize: [8, 14],
                    lineStyle: {
                        color: '#394C5D',
                        width: 1
                    }
                },
                axisLabel: {
                    interval: 0,
                    color: "#fff"
                },
                axisTick: {
                    alignWithLabel: true,
                    interval: 0
                },
                splitLine: {
                    show: false
                },
            },
            yAxis: {
                type: 'value',
                min:(minVal/1e8).toFixed(2)*1,
                name: "(亿元)",
                nameTextStyle: {
                    color: "#fff",
                },
                axisLine: {
                    show: true,
                    symbol: ['none', 'arrow'],
                    symbolSize: [8, 14],
                    lineStyle: {
                        color: '#394C5D',
                        width: 1
                    }
                },
                axisLabel: {
                    color: "#fff",
                    fontSize:14
                },
                splitLine: {
                    lineStyle: {
                        color: '#394C5D'
                    }
                }
            },
            series: [
                {
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        emphasis: {
                            color: '#4e6f90'
                        }
                    },
                    data: obj["ys"].map((v)=>{return (v/1e8).toFixed(2)})
                }
            ]
        }
    },
    ylqs: (obj) => {
        let minVal=Math.min.apply(null,obj['yl']);
        return {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: 20,
                right: 40,
                bottom: 30,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                name: "(日)",
                nameTextStyle: {
                    color: "#fff"
                },
                boundaryGap: true,
                data: obj['time'].length>15?obj['time'].slice(-15):obj['time'],
                axisLabel: {
                    color: '#fff',
                    interval: 0,
                },
                axisTick: {
                    color: '#4e5b68',
                    lineStyle: {
                        width: 1
                    }
                },
                axisLine: {
                    show: true,
                    symbol: ['none', 'arrow'],
                    symbolSize: [8, 14],
                    lineStyle: {
                        color: '#4e5b68',
                        width: 1
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: "(亿元)",
                // min:(minVal/1e8).toFixed(2)*1,
                nameTextStyle: {
                    color: "#4077BE",
                },
                // splitLine: {
                //     show: true,
                //     lineStyle: {
                //         color: '#4f5d6c'
                //     }
                // },
                // axisLine: {
                //     show: true,
                //     symbol: ['none', 'arrow'],
                //     symbolSize: [8, 14],
                //     lineStyle: {
                //         color: '#4e5b68',
                //         width: 1
                //     }
                // },
                splitLine:{
                    show:false
                },
                axisTick: {
                    lineStyle: {
                        width: 0
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontSize:14
                    }
                },
            },
            series: [{
                name: '净利润趋势分析',
                type: 'bar',
                barWidth : 32,
                barGap:30,
                itemStyle: {
                    normal: {
                        color: '#4077BE'
                    }
                },
                data: obj["yl"].length>15?obj["yl"].slice(-15).map((v)=>{return (v/1e8).toFixed(2)}):obj["yl"].map((v)=>{return (v/1e8).toFixed(2)})
            }]
        }
    },

    ylTrend: (obj) => {
        let minVal=Math.min.apply(null,obj['yl']);
        return {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: 20,
                right: 40,
                bottom: 30,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                name: "(日)",
                nameTextStyle: {
                    color: "#fff"
                },
                boundaryGap: true,
                data: obj['time'].length>15?obj['time'].slice(-15):obj['time'],
                //data:obj['time'],
                axisLabel: {
                    color: '#fff',
                    interval: 0,
                },
                axisTick: {
                    color: '#4e5b68',
                    lineStyle: {
                        width: 1
                    }
                },
                axisLine: {
                    show: true,
                    symbol: ['none', 'arrow'],
                    symbolSize: [8, 14],
                    lineStyle: {
                        color: '#4e5b68',
                        width: 1
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: "(亿元)",
               // min:(minVal/1e8).toFixed(2)*1,
                nameTextStyle: {
                    color: "#4077BE",
                },
                // splitLine: {
                //     show: true,
                //     lineStyle: {
                //         color: '#4f5d6c'
                //     }
                // },
                // axisLine: {
                //     show: true,
                //     symbol: ['none', 'arrow'],
                //     symbolSize: [8, 14],
                //     lineStyle: {
                //         color: '#4e5b68',
                //         width: 1
                //     }
                // },
                splitLine:{
                    show:false
                },
                axisTick: {
                    lineStyle: {
                        width: 0
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontSize:14
                    }
                },
            },
            series: [{
                name: '净利润趋势分析',
                type: 'bar',
                barWidth : 32,
                barGap:30,
                itemStyle: {
                    normal: {
                        color: '#4077BE'
                    }
                },
                // data: obj["yl"].length>15?obj["yl"].slice(-15).map((v)=>{return (v/1e8).toFixed(2)}):obj["yl"].map((v)=>{return (v/1e8).toFixed(2)})
                data: obj["yl"].length>15?obj["yl"].slice(-15).map((v)=>{return (v/1e8).toFixed(2)}):obj["yl"].map((v)=>{return (v/1e8).toFixed(2)})
            }]
        }
    },
    // legend 在右侧 pie
    jieGouPie: (arrData, colorArr) => {
        return {
            color: colorArr,
            tooltip: {
                trigger: 'item',
                formatter: "{b}:<br/> {c} ({d}%)"
            },
            legend: {
                show: true,
                orient: 'vertical',
                x: 'right',
                y: 20,
                itemGap: 15,
                textStyle: {
                    color: '#ffffff'
                },
                data: arrData.map(o => o.subname)
            },
            series: [{
                type: 'pie',
                radius: ['35%', '60%'],
                center: ["48%", "55%"],
                startAngle: 270,
                minAngle: 10,
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        formatter: "{b}{val|{d}}{per|%}",
                        rich: {
                            val: {
                                fontSize: 14,
                                textAlign: 'center',
                                color: '#eee'
                            },
                            per: { fontSize: 10, textAlign: 'center', color: '#aaa' },
                        },

                        fontSize: 13,
                        fontFamily: 'Microsoft YaHei',
                    },
                    emphasis: {
                        show: true,
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: "#000",
                        borderWidth: 1,
                        shadowColor: 'rgba(0, 0, 0, 0.7)',
                        shadowBlur: 20,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                    },
                },
                labelLine: {
                    normal: {
                        show: true,
                        length: 15,
                        length2: 10
                    }
                },
                data: arrData.map(o => { return { name: o.subname, value: o.value } })
            }]
        }
    },
    //legend 在左侧
    jieGouPie2: (arrData, colorArr) => {
        return {
            color: colorArr,
            tooltip: {
                trigger: 'item',
                formatter: "{b}:<br/> {c} ({d}%)"
            },
            legend: {
                show: true,
                orient: 'vertical',
                x: 'left',
                y: 20,
                itemGap: 15,
                textStyle: {
                    color: '#ffffff'
                },
                data: arrData.map(o => o.subname)
            },
            series: [{
                type: 'pie',
                radius: ['35%', '60%'],
                center: ["60%", "55%"],
                minAngle: 10,
                startAngle: 0,
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        formatter: [
                            '{b}',
                            '{val|{d}}',
                            '{per|%}'
                        ].join(''),
                        rich: {
                            val: {
                                fontSize: 14,
                                textAlign: 'center',
                                color: '#eee'
                            },
                            per: { fontSize: 10, textAlign: 'center', color: '#aaa' },
                        },
                        lineHeight: 8,
                        fontSize: 14,
                        fontFamily: 'Microsoft YaHei',
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: "#000",
                        borderWidth: 1,
                        shadowColor: 'rgba(0, 0, 0, 0.7)',
                        shadowBlur: 20,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                    },
                },
                labelLine: {
                    normal: {
                        show: true,
                        length: 30,
                        length2: 10,
                        smooth: true
                    }
                },
                data: arrData.map(o => { return { name: o.subname, value: o.value } })
            }]
        }
    },
    top10: (arrData) => {
        let maxNumber = arrData[0].value;
        let maxArr = []
        for (let i = 0; i < 10; i++) {
            maxArr.push(maxNumber)
        }
        return {
            tooltip: {},
            grid: {
                left: 0,
                // right: 20,
                bottom: 0,
                containLabel: true
            },
            yAxis: [
                {
                    show: true,
                    type: 'category',
                    inverse: true,
                    axisLine: {
                        show: false,
                    },
                    axisTick: { show: false },
                    axisLabel: {textStyle: { color: '#fff', fontSize: 14, fontfamily: '微软雅黑' } },
                    data: arrData.map(o => o.name)
                },
                {
                    offset: 12,
                    axisTick: 'none',
                    inverse: true,
                    axisLine: 'none',
                    axisLabel: {
                        align:'center',
                        textStyle: {
                            color: '#fff',
                            fontSize: 14,
                            fontfamily: '微软雅黑',
                        }
                    },
                    data: arrData.map(o => o.value)
                }
            ],
            xAxis: {
                show: false
            },
            series: [
                {
                    type: 'bar',
                    barWidth: 20,
                    barGap: '-100%',
                    silent: true, //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
                    label: {
                        normal: {
                            show: false,
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#1E61A7',/*'#031329',*/
                            borderWidth: 1,
                            borderColor: '#256db9'/*'#28446d'*/
                        }
                    },
                    data: maxArr,
                },
                {
                    type: 'bar',
                    barWidth: 20,
                    // barMaxHeight: 50,
                    z: 3,
                    label: {
                        normal: {
                            show: false,
                            fontSize: 16,
                            // distance: 15,
                            // position: 'right',
                            formatter: (params) => {
                                return Number(params.value)
                            },
                            color: '#fff'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#62B0E5'
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
    }
}
export default DataCreater;
