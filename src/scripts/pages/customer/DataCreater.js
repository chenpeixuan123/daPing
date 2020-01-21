const DataCreater = {
    //pie
    kehujiegou: (arrData) => {
        return {
            color: ['#134e8a', '#87CEEB', '#5f9cac', '#1e7bdc', '#00FFFF'],
            legend: {
                orient: 'vertical',
                right: 30,
                top: 70,
                itemGap: 20,
                data: arrData.map(item => item.name),
                textStyle: {
                    color: '#fff',
                    fontFamily: 'Microsoft YaHei',
                    fontSize: 18,
                },
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [{
                name: '客户结构',
                type: 'pie',
                center: ["30%", "50%"],
                radius: ['45%', '70%'],
                clockwise: false,
                minAngle: 5,
                startAngle: 180,
                avoidLabelOverlap: true,
                label: {
                    normal: {
                        color: "#fff",
                        formatter: [
                            '{t|{d}}',
                            '{p|%}'
                        ].join(''),
                        rich: {
                            p: { fontSize: 12, color: "#fff" }
                        },
                        fontSize: 20,
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
                        length: 10,
                        length2: 10,
                        smooth: true,
                        color: "#fff",
                    },
                    emphasis: {
                        show: true,
                        length: 10,
                        length2: 10,
                        smooth: true,
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: "#000",
                        borderWidth: .5,
                        shadowColor: 'rgba(0, 0, 0, 0.8)',
                        shadowBlur: 5,
                        shadowOffsetX: -5,
                        shadowOffsetY: -5,
                    },
                },
                data: arrData
            }]
        }
    },
    cunkuanjiegou: (arrData) => {
        return {
            // color: ['#d0d8e7', '#aebcd4', '#7e97bb', '#5377a2', '#47688f', '#385476'],
            color: ['#d0e7dd', '#aed4c2', '#7ebb9c', '#53a276', '#4768f67', '#387654'],
            title: {
                text: '存款结构',
                x: 'center',
                y: "bottom",
                textStyle: {
                    color: '#ffffff',
                    fontFamily: 'Microsoft YaHei',
                    fontSize: 24,
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                top: 'middle',
                itemGap: 30,
                textStyle: {
                    color: "#ffffff",
                    fontSize: 18
                },
                data: arrData.map(obj => obj.subname)
            },
            series: [{
                name: '存款结构',
                type: 'pie',
                radius: '55%',
                center: ['65%', '50%'],
                label: {
                    normal: {
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
                                borderWidth: 0.5,
                                height: 0,
                            },
                            val: {
                                fontSize: 12,
                                textAlign: 'center',
                                color: '#eee'
                            },
                            per: { fontSize: 10, textAlign: 'center', color: '#aaa' },
                        },
                        lineHeight: 10,
                        fontSize: 13,
                        fontFamily: 'Microsoft YaHei',
                    },
                    emphasis: {
                        show: true,
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 30,
                        // shadowOffsetX: 0,
                        shadowColor: 'rgba(255, 255, 255, 0.6)'
                    },
                    emphasis: {
                        shadowBlur: 30,
                        // shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.8)'
                    }
                },
                data: arrData.map((o) => { return { name: o.subname, value: o.value } }),
            }]
        }
    },
    //line
    uPtrend: (arr) => {
        return {
            color: ['#4375b6', '#82a633'],
            tooltip: { trigger: 'axis' },
            toolbox: { show: false },
            legend: {
                show: true,
                right: 30,
                top: 0,
                itemGap: 40,
                itemWidth: 30,
                itemHeight: 15,
                textStyle: {
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: 'normal',
                    fontFamily: '微软雅黑'
                },
                data: [{
                        name: '客户数',
                        icon: 'diamond',
                    },
                    {
                        name: '账户数',
                        icon: 'diamond',
                    }
                ]
            },
            grid: {
                left: 0,
                right: 60,
                bottom: 0,
                top: 50,
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: arr.map((o) => o.time),
                axisLine: {
                    symbol: ['none', 'arrow'],
                    lineStyle: {
                        color: '#394C5D'
                    }
                },
                axisLabel: {
                    interval: 0,
                    color: "#fff",
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
                axisLine: {
                    symbol: ['none', 'arrow'],
                    lineStyle: {
                        color: '#394C5D'
                    }
                },
                axisLabel: {
                    color: "#fff",
                    fontSize: 12,
                    // formatter: fig => Math.round(fig / 1e4) + '万',
                    formatter: function(val) {
                        if (val == 0) {
                            return val;
                        } else {
                            return Math.round(val / 1e4) + '万';
                        }
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#394C5D'
                    }
                }
            },
            series: [{
                    type: 'line',
                    name: '客户数',
                    smooth: true,
                    data: arr.map((o) => o.kehu)
                },
                {
                    type: 'line',
                    name: '账户数',
                    smooth: true,
                    data: arr.map((o) => o.zhanghu)
                }
            ]
        }
    },
    //bar 副本样式
    top10: (arrData) => {
        let barData = [];
        let barDataTwo = [];
        let coordData2 = [];
        let coordData = [];
        arrData.map((item) => barData.push(item.value));
        for (let i = 0; i < barData.length; i++) {
            barDataTwo.push(Math.max.apply(Math, barData) + 5000);
            coordData.push({
                "coord": [Number(barData[i]) - 1, i]
            });
            coordData2.push({
                "coord": [Math.max.apply(Math, barData) + 5000, i]
            })
        }
        return {
            legend: null,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none', // type: 'shadow'
                },
                formatter: function(params) {
                    return params[0].name + ":<br/>" + (params[0].value / 1e4).toFixed(2) + "万";
                }
            },
            grid: {
                // left:40,
                top: 0,
                bottom: 0,
                right: 0,
                containLabel: true
            },
            yAxis: [{
                    data: arrData.map(item => item.name),
                    // inverse: true,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: 12,
                            color: '#42a5c2',
                        },
                        formatter: function(label) {
                            return '{kk|' + label + '}';
                        },
                        rich: {
                            // label: {
                            //     lineHeight: 30,
                            // },
                            kk: {
                                height: 30,
                                // padding: [0, 10, 0, 10],
                                align: 'center',
                                backgroundColor: {
                                    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAAAjCAYAAADsZeb8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIxNzQ2ODFCQkVFNjExRTc4OEU3QzFEMjE5RjExOEZBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIxNzQ2ODFDQkVFNjExRTc4OEU3QzFEMjE5RjExOEZBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjE3NDY4MTlCRUU2MTFFNzg4RTdDMUQyMTlGMTE4RkEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjE3NDY4MUFCRUU2MTFFNzg4RTdDMUQyMTlGMTE4RkEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7fNMa8AAABg0lEQVR42uzaMUvDQBgG4O+7pJS0ghVBOkknK06dAh38E126uji4iogtzlFBcNTi4urin3CoOHWytpM41aJYxTa2Te4sWgpWA2lufV8I4ULuOB747m44VkrRdIydXoa8bpGZC8Qxm5Sk74fG76D2+Bv/+UdF6BNuDA47N1K/+wTMI7itiAPnPoVobL87JMwSfzxWRadeE+2bJn8+9wj5Pywq5gRv10uR7FdJDpJm/aws3hovEAqXCSLJYZV7rddYzTkBy2wRP2ug65DfT44AL0ASAdHYowwZ8ZLZOD8FR9Ry9twiu0+jTeQea2DkcmZREJ27Gih0EI24LVrXTVBobizstnEO1EVEgAhEICJABCIQgYgAEYhABCICRCACEYhIWERlLSVAoYPo929len0FFDqISl7J1FoOFDqIpnWp5pbzMrW6CI6IiP4hPYxK+sDLbm6BQ2Nj8Y+tMhnx7jBX3gCJzhFHxPIqkV4Y2Ef7cj6L0p4huJ+oLSgqjJuy+jdlvwQYAN1TdkgsoTftAAAAAElFTkSuQmCC'
                                }
                            }
                        }
                    }
                },
                {
                    data: arrData.map(item => item.name),
                    // inverse: true,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                },
            ],
            xAxis: [{
                    type: "value",
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                },
                {
                    type: "value",
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                }
            ],
            series: [{
                    z: 10,
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    type: 'pictorialBar',
                    data: arrData.map(obj => obj.value),
                    // barCategoryGap: '80%',
                    label: {
                        normal: {
                            show: true,
                            position: 'right', //inside
                            textStyle: {
                                color: '#fff',
                                fontFamily: '微软雅黑',
                                fontSize: 12
                            },
                            // formatter: `{val|{c}}{sub|万}`,
                            formatter: function(params) {
                                return (params.value / 1e4).toFixed(2) + '{sub|万}';
                            },
                            rich: {
                                sub: { fontSize: 10, color: "gray", fontFamily: "黑体" },
                            },
                        }
                    },
                    symbolRepeat: false,
                    symbolSize: ['100%', 30],
                    symbolOffset: [-15, 0],
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
                                        color: '#083e6d',
                                    },
                                    {
                                        offset: 0.5,
                                        color: '#0272f2',
                                        opacity: 0.7
                                    },
                                    {
                                        offset: 1,
                                        color: '#083e6d',
                                        opacity: 0.5
                                    }
                                ],
                                globalCoord: false
                            },
                            barBorderRadius: [0, 5, 5, 0],
                            shadowOffsetX: 3,
                            shadowColor: 'rgba(255, 255, 255, 0.6)',
                            shadowBlur: 3
                        }
                    },
                    symbolClip: true,
                    symbolPosition: 'end',
                    symbol: 'rect'
                },
                {
                    z: 6,
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    animation: false,
                    name: '',
                    type: 'pictorialBar',
                    data: barDataTwo,
                    // barCategoryGap: '80%',
                    label: {
                        normal: {
                            show: false,
                            position: 'inside',
                            textStyle: {
                                fontSize: 12,
                                color: '#00ffff'
                            }
                        }
                    },
                    symbolRepeat: false,
                    symbolSize: ['100%', 33],
                    symbolOffset: [-16.5, 0],
                    itemStyle: {
                        normal: {
                            color: '#00abc5',
                            opacity: 0.085
                        }
                    },
                    symbolClip: true,
                    symbol: 'rect',
                    markPoint: {
                        data: coordData2,
                        symbolSize: [33, 33],
                        symbolOffset: [-0.5, 0],
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#00abc5',
                                opacity: 0.085
                            }
                        },
                        symbolClip: true,
                        symbol: 'path://M 300 100 L 100 100 L 100 300 z',
                        // animationDelay:100
                        // animationDuration:1200
                        // animation:false
                        // animationDurationUpdate :1000
                    }
                },
            ],
            animationEasing: 'backIn', //elasticOut backIn
            animationDuration: function(idx) {
                // 越往后的数据延迟越大
                return idx * 500;
            },
            animationDelayUpdate: function(idx) {
                return idx * 100;
            }
        };
    },
    //渠道
    qudaoBar: (arrData) => {
        return {
            legend: null,
            grid: {
                left: 0,
                top: 40,
                bottom: 0,
                right: 50,
                containLabel: true
            },
            yAxis: {
                data: arrData.map(o=> o.name),
                inverse: true,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        color: '#42a5c2',
                    },
                }
            },
            xAxis: {
                type: "value",
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            },
            series: [{
                type: 'bar',
                barMinHeight:10,
                data: arrData.map(o => o.value ),
                label: {
                    normal: {
                        show: true,
                        position: 'right', //inside
                        textStyle: {
                            color: '#fff',
                            fontFamily: '微软雅黑',
                            fontSize: 12
                        },
                        formatter: function(params) {
                            return (params.value / 1e4) + '{sub|万}';
                        },
                        rich: {
                            sub: { fontSize: 10, color: "gray", fontFamily: "黑体" },
                        },
                    }
                },
                // symbolRepeat: false,
                // symbolSize: ['100%', 30],
                // symbolOffset: [-15, 0],
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
                                    color: '#083e6d',
                                },
                                {
                                    offset: 0.5,
                                    color: '#0272f2',
                                    opacity: 0.7
                                },
                                {
                                    offset: 1,
                                    color: '#083e6d',
                                    opacity: 0.5
                                }
                            ],
                            globalCoord: false
                        },
                        barBorderRadius: [0, 5, 5, 0],
                        shadowOffsetX: 3,
                        shadowColor: 'rgba(255, 255, 255, 0.6)',
                        shadowBlur: 3
                    }
                },
                // symbolClip: true,
                // symbolPosition: 'end',
                // symbol: 'rect'
            }],
            animationEasing: 'backIn', //elasticOut backIn
            animationDuration: function(idx) {
                // 越往后的数据延迟越大
                return idx * 500;
            },
            animationDelayUpdate: function(idx) {
                return idx * 100;
            }
        };
    },
    qudaoPie: (arrData) => {
        return {
            color: ['#d0d8e7','#134e8a','#5377a2', '#1e7bdc', '#5f9cac', '#14c6e0','#47688f'],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                top: 'middle',
                itemGap: 15,
                textStyle: {
                    color: "#ffffff",
                    fontSize: 18
                },
                data: arrData.map(obj => obj.name)
            },
            series: [{
                name: '获客渠道',
                type: 'pie',
                radius: '45%',
                minAngle:10,
                center: ['60%', '55%'],
                label: {
                    normal: {
                        formatter: [
                            '{b}\n',
                            '{hr|}\n',
                            '{num|{c}}',
                            '{val|占比：{d}}',
                            '{per|%}'
                        ].join(''),
                        rich: {
                            hr: {
                                borderColor: '#eeeeee',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0,
                            },
                            num:{
                                // color:"#ff0000"
                            },
                            val: {
                                fontSize: 12,
                                textAlign: 'center',
                                color: '#eee'
                            },
                            per: { fontSize: 10, textAlign: 'center', color: '#aaa' },
                        },
                        lineHeight: 10,
                        fontSize: 13,
                        fontFamily: 'Microsoft YaHei',
                    },
                    emphasis: {
                        show: true,
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 30,
                        // shadowOffsetX: 0,
                        shadowColor: 'rgba(255, 255, 255, 0.6)'
                    },
                    emphasis: {
                        shadowBlur: 30,
                        // shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.8)'
                    }
                },
                data: arrData
            }]
        }
    },
}
export default DataCreater;