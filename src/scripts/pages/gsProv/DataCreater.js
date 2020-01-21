import LonLat from 'utils/LonLat';

function mapDataToScatterData(arrData) {
    let res = [];
    for (let i = 0; i < arrData.length; i++) {
        let cood = LonLat[arrData[i].name];
        res.push({
            name: arrData[i].name,
            value: cood.concat(arrData[i].value),
            label: {
                normal: {
                    show: arrData[i].value < 40 ? false : true,
                    position: arrData[i].name == "酒泉" ? 'right' : 'bottom',
                    formatter: '{b}',
                    color: '#fff',
                    fontSize: 12,
                    textBorderColor: "#000",
                    textBorderWidth: 5,
                    textshadowColor: "#ffffff",
                    textshadowBlur: 10,
                }
            },
            itemStyle: {
                normal: {
                    color: arrData[i].value < 40 ? '#14c6e0' : '#1F5FB3',
                    shadowColor: '#000',
                    shadowBlur: 5,
                }
            }
        });
    }
    return res;
}
const DataCreater = {
    trendLine: (totalArr, MasterArr, SlaveArr) => {
        return {
            backgroundColor: "rgba(5, 41, 107, 0.17)",
            color: ['#9966FF', '#FFFF33', '#00868B'],
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: 30,
                right: 30,
                bottom: 40,
                containLabel: true
            },
            legend: {
                show: true,
                data: [
                    { name: '总交易量', icon: 'roundRect' },
                    { name: '生产交易量', icon: 'pin' },
                    { name: '灾备交易量', icon: 'pin' },
                ],
                top: 10,
                right: 30,
                itemWidth: 30,
                itemGap: 20,
                textStyle: {
                    color: '#fff',
                    fontSize: 14,
                    fontFamily: '微软雅黑'
                }
            },
            xAxis: {
                type: 'category',
                inverse: true,
                axisLine: {
                    show: true,
                    symbol: ['none', 'arrow'],
                    symbolSize: [8, 14],
                    lineStyle: {
                        color: '#ffffff'
                    }
                },
                axisLabel: {
                    color: "#0096ff",
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: '#16386c',
                    }
                },
                boundaryGap: false,
                data: totalArr.map(o => o.time)
            },
            yAxis: {
                type: 'value',
                // name:'',
                nameTextStyle: {
                    color: "#0096ff"
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(17,51,99,0.3)', 'rgba(17,51,99,0)']
                    }
                },
                axisLine: {
                    show: true,
                    symbol: ['none', 'arrow'],
                    symbolSize: [8, 14],
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisLabel: {
                    color: "#0096ff",
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: ['#16386c']
                    }
                },
            },
            series: [{
                    name: '总交易量',
                    type: 'line',
                    data: totalArr,
                    // symbol: 'circle',
                    symbolSize: 0,
                    smooth: true,
                    markPoint: {
                        label: {
                            normal: {
                                color: '#0096ff',
                                fontSize: 12
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#fff'
                            }
                        },
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    areaStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                        offset: 0,
                                        color: 'rgb(4,103,128)' // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgb(12,45,88)' // 100% 处的颜色
                                    }
                                ],
                                globalCoord: false // 缺省为 false
                            },
                            opacity: .4
                        }
                    }
                },
                {
                    name: '生产交易量',
                    type: 'line',
                    smooth: true,
                    symbolSize: 0,
                    data: MasterArr,
                },
                {
                    name: '灾备交易量',
                    type: 'line',
                    smooth: true,
                    symbolSize: 0,
                    data: SlaveArr,
                }
            ]
        }
    },
    //pie
    createPie: (arrData) => {
        return {
            color: ['#134e8a', '#1e7bdc', '#5f9cac', '#14c6e0'],
            legend: {
                show: false,
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b}: <br/>{c} ({d}%)"
            },
            series: [{
                // name:'占比',
                type: 'pie',
                center: ["50%", "50%"],
                radius: ['45%', '65%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        color: "#eee",
                        formatter: [
                            '{b}\n',
                            '{hr|}\n',
                            '{val|{d}}',
                            '{per|%}'
                        ].join(''),
                        rich: {
                            hr: {
                                borderColor: '#eeeeee',
                                width: '100%',
                                borderWidth: .5,
                                height: 0,
                            },
                            val: {
                                fontSize: 14,
                                color: "#bbbbbb"
                            },
                            per: { fontSize: 12, color: "#bbbbbb" },
                        },
                        lineHeight: 10,
                        fontSize: 14,
                        fontFamily: 'Microsoft YaHei',
                    },
                    emphasis: {
                        color: "#fff",
                        formatter: "{b}",
                        fontSize: 16,
                    }
                },
                labelLine: {
                    normal: {
                        show: true,
                        length: 15,
                        length2: 5
                    },
                    emphasis: {
                        show: true,
                        length: 15,
                        length2: 5
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: "rgba(0,0,0,.5)",
                        borderWidth: 1,
                        shadowColor: 'rgba(255, 255, 255, .5)',
                        shadowBlur: 20
                    },
                },
                data: arrData
            }]
        }
    },
    //bar
    netTop10Bar: (arrData) => {
        let xMax;
        let dataShadow = [];
        let newArrData = [];
        xMax = arrData[0];
        arrData.forEach(
            (obj, index) => {
                if (index <= 2) {
                    newArrData.push({
                        value: obj.value,
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    X2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: '#03446d' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: '#3980ac' // 100% 处的颜色
                                    }],
                                    globalCoord: false
                                },
                            }
                        }
                    }, )
                } else {
                    newArrData.push({ value: obj.value })
                }
            }
        )
        for (let i = 0; i < arrData.length; i++) {
            dataShadow.push(xMax);
        }
        return {
            tooltip: {
                show:false
            },
            grid: {
                left: 0,
                bottom: 0,
                top: 25,
                right: 50,
                containLabel: true
            },
            yAxis: {
                type: 'category',
                inverse: true,
                position: 'left',
                axisLine: {
                    lineStyle: {
                        width: 2,
                        color: 'rgb(255, 255, 255)',
                        shadowColor: 'rgba(255, 255, 255, 0.8)',
                        shadowBlur: 3,
                        shadowOffsetX: -3,
                    }
                },
                axisTick: { show: false },
                axisLabel: { textStyle: { color: '#fff', fontSize: 14 } },
                data: arrData.map(obj => obj.name),
            },
            xAxis: {
                show: false,
                type: "value",
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
                splitLine: { show: false },
            },
            series: [
                {
                    type: 'bar',
                    zLevel:10,
                    barWidth:newArrData.length>4?30:50,
                    barMinHeight:10,
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                X2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: '#fff' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#fff' // 100% 处的颜色
                                }],
                                globalCoord: false
                            },
                            borderColor: "#fff",
                            borderWidth: 1,
                            barBorderRadius: [0, 10, 10, 0],
                            shadowColor: 'rgba(255, 255, 255, 0.5)',
                            shadowBlur: 30
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            color: '#fff',
                            fontWeight: "bold",
                            fontFamily: 'Arial',
                            fontSize: 15,
                            // formatter: `{t|{c}/1e4}{sub|万}`,
                            formatter: function(params) {
                                return (params.value / 1e4).toFixed(1) + '{sub|万}';
                            },
                            rich: {
                                sub: { fontSize: 10, color: "#eee", fontFamily: "黑体" },
                            },
                        }
                    },
                    data: newArrData
                },
                // For shadow border
                {
                    type: 'bar',
                    barGap: '-100%',
                    zLevel:5,
                    barWidth:dataShadow.length>4?30:50,
                    itemStyle: {
                        normal: {
                            color: 'transparent',
                            borderType: 'dotted', //dotted,dashed
                            borderWidth: 1,
                            borderColor: "#2585CF",
                            barBorderRadius: [0, 10, 10, 0]
                        }
                    },
                    data: dataShadow,
                    animation: false
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
        };
    },
    //map
    mapOption: (arrData) => {
        return {
            tooltip: {
                trigger: 'item',
                backgroundColor: 'transparent',
                // formatter: function (params, ticket, callback) {
                //     $.get('detail?name=' + params.name, function (content) {
                //         callback(ticket, toHTML(content));
                //     });
                //     return 'Loading';
                // }
                alwaysShowContent: false, //
                // enterable :true,
                formatter: function(params, ticket, callback) {
                    // console.log(params);
                    return `
                        <div style="text-align:center; width: 678px; height: 223px; padding:40px 35px 55px 35px;background:${'url('+window.dominContext.staticPath + '/assets/images/gsprov/bgTooltip.png'+') no-repeat center'};">
                            <p  style="font-size:20px;">网点详情</p>
                            <div>${params.name}</div>
                            <div>值:${params.value[2]}</div>
                            <div>经度:${params.value[0]}</div>
                            <div>维度:${params.value[1]}</div>
                        </div>
                    `
                },
                // position:['50%','50%'],
                position: function(point, params, dom, rect, size) {
                    return [point[0] - 678 + 190, point[1] - 223 + 28];
                    // console.log(point);
                }
            },
            geo: [{
                    map: 'gansu',
                    silent: true,
                    aspectScale: 1,
                    zoom: .9,
                    zLevel: 1,
                    center: [100.5, 37.7],
                    itemStyle: {
                        normal: {
                            shadowColor: '#ffffff',
                            borderWidth: 2,
                            borderColor: '#ffffff',
                            shadowBlur: 100,
                            opacity: .6,
                        }
                    }
                },
                {
                    map: 'gansu',
                    silent: true,
                    aspectScale: 1,
                    zoom: .9,
                    zLevel: 2,
                    center: [100.5, 37.7],
                    itemStyle: {
                        normal: {
                            shadowColor: 'rgba(5,18,40,.5)',
                            areaColor: '#020819',
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 10,
                            borderColor: 'gray',
                            opacity: .8,
                            borderWidth: 1,
                        }
                    }
                }
            ],
            series: [{
                name: "交易",
                type: 'effectScatter',
                coordinateSystem: 'geo',
                symbol: 'circle', //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                symbolSize: function(val) {
                    return val[2];
                },
                data: mapDataToScatterData(arrData)
            }]
        }
    }
}
export default DataCreater;