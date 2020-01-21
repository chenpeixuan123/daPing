import LonLat from "utils/LonLat";

const mapUtil = {
    createMapOption: (arrData) => {
        alert();
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
                            opacity: 0
                        }
                    }
                },
                // {
                //     map: 'gansu',
                //     roam: false,
                //     silent: true,
                //     zoom: 0.8,
                //     center: [101.189226, 37.511994],
                //     itemStyle: {
                //         normal: {
                //             shadowColor: '#0e2641',
                //             shadowOffsetX: 8,
                //             shadowOffsetY: 8,
                //             shadowBlur: 0,
                //             opacity: 0
                //         }
                //     }
                // },
                // {
                //     map: 'gansu',
                //     roam: false,
                //     silent: true,
                //     zoom: 0.8,
                //     center: [101.189226, 37.511994],
                //     itemStyle: {
                //         normal: {
                //             // areaColor: '#022347',
                //             areaColor: 'rgba(0,0,0,0)',
                //             borderWidth: 2,
                //             borderColor: '#3d526d',
                //         }
                //     }
                // }
            ],
            series: [
                {
                    name: "分行",
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    // geoIndex: 2,
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
                            formatter: (v) => {
                                let s = v.name.replace("支行", "");
                                s = s.replace("分行", "");
                                return s
                            },
                            color: '#ffffff',
                            position: 'bottom',
                            fontSize: 14,
                        }
                    },
                    data: mapDataToScatterData(arrData)
                }
            ]
        };
    },
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