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
            tooltip: {
                trigger: 'axis',
                formatter: '{b}时：{c}'
            },
            grid: {
                left: '0%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: [{
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
            }],
            yAxis: [{
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#183b6f'
                    }
                },
                axisTick: { show: false },
                axisLabel: { textStyle: { color: '#fff' } },
                splitLine: { lineStyle: { color: '#1f2b39' } }
            }],
            series: [{
                type: 'line',
                symbol: 'none',
                smooth: true,
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
            }]
        };
    },
    createRingOption: (arrData) => {
        return {
            color: ['#c7700a', '#3490bf'],
            series: [{
                // name: '园区',
                type: 'pie',
                // startAngle: 90,
                radius: ['50%', '68%'],
                labelLine: {
                    normal: {
                        // show:false,
                        length: 12,
                        length2: 10,
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                label: {
                    normal: {
                        formatter: ' {per|{d}%}\n{hr|}\n{b|{b}}',
                        rich: {
                            per: {
                                align: 'center',
                                color: '#fff',
                                lineHeight: 25,
                                fontSize: 18,
                            },
                            hr: {
                                borderColor: '#fff',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                            b: {
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
        }
    },
    createTop10: (arrData) => {
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            toolbox: {
                show: false
            },
            legend: {
                show: false,
                right: 0,
                top: '10%',
                textStyle: {
                    color: '#fff',
                    fontSize: 16
                },
            },
            grid: {
                show: false,
                left: 0,
                right: 10,
                bottom: 0,
                top: 70,
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: arrData.map(obj => obj.name),
                boundaryGap: true,
                axisLine: {
                    symbol: ['none', 'arrow'],
                    lineStyle: {
                        color: '#394C5D'
                    }
                },
                axisLabel: {
                    show: true,
                    interval: 0,
                    color: "#fff",
                    align: 'center',
                    fontSize: 16,
                    fontFamily: "AdobeHeitiStd Regular",
                },
                axisTick: {
                    show: true,
                    alignWithLabel: true,
                    interval: 0
                }
            },
            yAxis: {
                type: 'value',
                // data:[2,4,8,10,12],
                axisLine: {
                    symbol: ['none', 'arrow'],
                    lineStyle: {
                        color: '#394C5D'
                    }
                },
                axisLabel: {
                    interval: 0,
                    color: "#fff",
                    // fontSize:12
                },
                splitLine: {
                    lineStyle: {
                        color: '#394C5D'
                    }
                }
            },
            series: [{
                type: 'bar',
                // name:'',
                barWidth: 20,
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
                                color: '#576f8e'
                            }, {
                                offset: 1,
                                color: '#03446d'
                            }],
                            globalCoord: false
                        },
                        barBorderRadius: 5,
                        borderColor: '#ffffff',
                        borderWidth: 1,
                        shadowColor: '#ffffff',
                        shadowBlur: 3,
                        shadowOffsetY: -3,
                        shadowOffsetX: -3,
                    },
                    emphasis: {
                        color: '#4dc8e2'
                    }
                },
                barWidth: 25,
                data: arrData
            }, ],
            animationEasing: 'backIn',
            animationDuration: function(idx) {
                return idx * 400;
            },
            animationDelayUpdate: function(idx) {
                return idx * 100;
            },
            // animationEasing: 'elasticOut',
            // animationDuration: function (idx) {
            //     // 越往后的数据延迟越大
            //     return idx * 1000;
            // },
            // animationDelayUpdate: function (idx) {
            //     return idx * 500;
            // }
        }
    },
    createMapOption: (arrData) => {
        return {
            tooltip: {
                trigger: 'item',
                formatter: '{b}',
            },
            graphic: {
                elements: [{
                    type: 'image',
                    id: 'logo',
                    z: 100,
                    zlevel: 10,
                    bounding: 'raw',
                    left: ((LonLat["兰州"][0] + 18) / (180 + 18) * 0.55 - 16 / 1920) * 100 + "%",
                    top: ((90 - LonLat["兰州"][1]) / 150 - 16 / 900) * 100 + "%",
                    style: {
                        image: window.dominContext.staticPath + '/assets/images/gscard/location.png',
                        width: 32,
                        height: 32
                    }
                }]
            },
            geo: [
                //外阴影
                {
                    map: 'world',
                    left: 0,
                    top: 0,
                    right: "45%",
                    bottom: 0,
                    boundingCoords: [
                        // 定位左上角经纬度
                        [-19, 90],
                        // 定位右下角经纬度
                        [179, -60]
                    ],
                    silent: true,
                    itemStyle: {
                        normal: {
                            shadowColor: '#ffffff',
                            borderWidth: 2,
                            borderColor: 'gray',
                            shadowBlur: 28,
                            opacity: .4
                        }
                    },
                    // regions: [
                    //     {
                    //         name: 'China',
                    //         itemStyle: {
                    //             normal: {
                    //                 shadowColor: 'transparent'
                    //             }
                    //         }
                    //     }
                    // ]
                },
                //外阴影
                {
                    map: 'world',
                    left: "55%",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    boundingCoords: [
                        // 定位左上角经纬度
                        [-180, 90],
                        // 定位右下角经纬度
                        [-18, -60]
                    ],
                    silent: true,
                    itemStyle: {
                        normal: {
                            shadowColor: '#ffffff',
                            borderWidth: 2,
                            borderColor: 'gray',
                            shadowBlur: 28,
                            opacity: .4
                        }
                    }
                },
                //左侧
                {
                    map: 'world',
                    left: 0,
                    top: 0,
                    right: "45%",
                    bottom: 0,
                    boundingCoords: [
                        [-18, 90],
                        [180, -60]
                    ],
                    silent: true,
                    itemStyle: {
                        normal: {
                            shadowColor: 'rgba(5,18,40,.7)',
                            areaColor: '#020819',
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 10,
                            borderColor: 'gray',
                            opacity: .8,
                            borderWidth: 1
                        },
                    },
                    regions: [
                        {
                            name: 'China',
                            itemStyle: {
                                normal: {
                                    shadowColor: 'rgba(255,255,255,.2)',
                                    borderColor: '#ffffff',
                                    areaColor: '#FF0000',
                                    borderWidth: 2,
                                    shadowBlur: 5,
                                    opacity:1
                                }
                            }
                        }
                    ]
                },
                //右侧
                {
                    map: 'world',
                    left: "55%",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    boundingCoords: [
                        // 定位左上角经纬度
                        [-179, 90],
                        // 定位右下角经纬度
                        [-17, -60]
                    ],
                    silent: true,
                    itemStyle: {
                        normal: {
                            shadowColor: 'rgba(5,18,40,.7)',
                            areaColor: '#020819',
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 10,
                            borderColor: 'gray',
                            opacity: .8,
                            borderWidth: 1,
                        },
                    }
                }
            ],
            series: [{
                    type: 'lines',
                    zlevel: 3,
                    coordinateSystem: 'geo',
                    effect: {
                        show: true,
                        period: 10,
                        symbol: 'image://' + window.dominContext.staticPath + '/assets/images/gscard/rock.png',
                        symbolSize: [18, 36],
                        trailLength: 0.3,
                        loop: true
                    },
                    lineStyle: {
                        normal: {
                            color: '#FFD700',
                            width: 1,
                            curveness: 0.3, //0-1值越大曲度越大。
                            type: 'dotted',
                            opacity: 0.4
                        }
                    },
                    data: mapDataToLineData(arrData)
                },
                {
                    zlevel: 5,
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbol: 'image://' + window.dominContext.staticPath + '/assets/images/gscard/pin.png',
                    symbolSize: 15,
                    symbolOffset: [0, 0],
                    label: {
                        normal: {
                            show: false,
                        },
                        emphasis: {
                            show: true,
                            formatter: '{b}',
                            position: 'right',
                            color: "#fff",
                            fontSize: 20,
                            textBorderColor: "#000",
                            textBorderWidth: 5,
                            textshadowColor: "#000",
                            textshadowBlur: 10,
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
        }
    },
    accountTrend: (tArr, vArr) => {
        // console.log(t)
        return {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                //data:['2017/01','2017/02','2017/03','2017/04','2017/05','2017/06','2017/07','2017/08','2017/09','2017/10','2017/11','2017/12'],
                data: tArr,
                //   name:"(年)",
                nameTextStyle: {
                    color: "#fff"
                },
                boundaryGap: false,
                axisLabel: {
                    color: '#fff'
                },
                axisTick: {
                    length: 3,
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
                //   name:"(亿元)",
                nameTextStyle: {
                    color: "#fff",
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#4f5d6c'
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
                },
                axisTick: {
                    lineStyle: {
                        width: 0
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                },
            },
            series: [{
                name: '新增账户',
                type: 'line',
                // symbol:'circle',
                symbolSize: 6,
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#fff',
                        lineStyle: {
                            color: '#88BDFF'
                        }
                    },
                    emphasis: {
                        color: '#88BDFF',
                    }
                },
                data: vArr
            }, ]
        }
    },
    pie3D: () => {
        return {
            type: "pie",
            alpha: 0.5,
            borderAlpha: 0,
            fontFamily: '微软雅黑',
            groupedAlpha: 0,
            colors: ["#062c6a", "#0054d5", "#2874e5", "#5497fb", "#8bb7f9", "#5a9ba3", "#3e5477"],
            radius: 90,
            labelRadius: 1,
            pullOutRadius: "15%",
            pulledField: 'pulled',
            pullOutEffect: 'elastic',
            valueField: "value",
            titleField: "title",
            color: '#ffffff',
            labelText: '[[title]]\n[[percents]]%',
            labelTickColor: '#ffffff',
            labelsEnabled: true,
            labelTickAlpha: 0.3,
            fontSize: 12,
            outlineColor: '#ffffff',
            outlineAlpha: 0.3,
            depth3D: 20,
            angle: 65,
            startAngle: 180,
            balloonText: "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
            export: {
                enabled: false
            },
            legend: {
                color: '#ffffff',
                position: 'right',
                fontSize: 14,
                valueText: "[[close]]",
                width: 180,
                verticalGap: 5
            }
        }
    },
}
export default DataCreater;