import React, { Component } from 'react';
import style from './style.css';
import BaseMap from '../../components/common/BaseMap.jsx';
import DataCreater from '../msWeb/DataCreater';
import Chart from 'components/common/Chart';
import TitleValue from '../../components/common/TitleValue.jsx';
import ImgTitleValue from '../../components/common/ImgTitleValue.jsx';
import Tips from './com/Tips.jsx';
import Tools from 'utils/Tools';
import LonLat from 'utils/LonLat';

let mapOption = {
  geo: {
    map: 'gansu',
    roam: false,
    zoom: 1.2,
    tooltip: {
      show: false,       //不显示提示标签
    },
    label: {
      normal: {
        show: false,//显示省份标签
        textStyle:{color:"#c71585"}//省份标签字体颜色
      },
      emphasis: {//对应的鼠标悬浮效果
        show: false,
        textStyle:{color:"#800080"}
      }
    },
    itemStyle: {
      normal: {
        borderWidth: .5,//区域边框宽度
        borderColor: '#fff',//区域边框颜色
        areaColor:"#ffefd5",//区域颜色
        label:{show:false}
      },
      emphasis: {
        show: false,
        borderWidth: .5,
        borderColor: '#4b0082',
        areaColor: "#ffdead",
      }
    },
  },
  series: [
    {
      type: 'scatter',  //'line'（折线图） | 'bar'（柱状图） | 'scatter'（散点图） | 'k'（K线图）
      //'pie'（饼图） | 'radar'（雷达图） | 'chord'（和弦图） | 'force'（力导向布局图） | 'map'（地图）
      coordinateSystem: 'geo',
      symbolSize: 10,
      symbolRotate: 40,
      label: {
        normal: {
          formatter: '{b}',
          position: 'bottom',
          show: true
        },
        emphasis: {
          show: false
        }
      },
      tooltip: {
        show: false,       //不显示提示标签
        formatter: '{c}',      //提示标签格式
        backgroundColor: "#fff",//提示标签背景颜色
        borderColor: '#ccc',
        borderWidth: 5,
        textStyle:{color:"#000"} //提示标签字体颜色
      },
      itemStyle: {
        normal: {
          color: 'black'
        }
      }
    },
    {
      type: 'map',
      mapType: 'hainan',
      roam: false,
      zoom: 1.2,
      tooltip: {
        show: false,       //不显示提示标签
      },
      label: {
        normal: {
          show: false    //显示省份标签
        },
        emphasis: {
          show: false,
        }
      },
      itemStyle: {
        //正常样式
        normal: {
          borderWidth: .2,      //区域边框宽度
          borderColor: '#fff',  //区域边框颜色
          label:{show:false}
        },
        //鼠标事件区块样式
        emphasis: {
          show: false,
        }
      },
      data: mapDataToScatterData(
        [
          { name: "兰州", value: 40 },
          { name: "酒泉", value: 40 },
          // { name: "嘉峪关", value: 40 },
          // { name: "金昌", value: 40 },
          // { name: "白银", value: 40 },
          // { name: "天水", value: 40 },
          // { name: "武威", value: 40 },
          // { name: "张掖", value: 40 },
          // { name: "平凉", value: 40 },
          // { name: "庆阳", value: 40 },
          // { name: "定西", value: 40 },
          // { name: "陇南", value: 40 },
          // { name: "临夏", value: 40 },
          // { name: "甘南", value: 40 }
          // { "name": "甘肃银行生产中心", "value": 20 }, { "name": "甘肃银行灾备机房", "value": 20 }, { "name": "安宁支行营业室", "value": 20 }, { "name": "安宁西路支行", "value": 20 }, { "name": "滨河支行", "value": 20 }, { "name": "银滩支行", "value": 20 }, { "name": "科教城支行", "value": 20 }, { "name": "七里河支行营业室", "value": 20 }, { "name": "敦煌路支行", "value": 20 }, { "name": "西津西路支行", "value": 20 }, { "name": "小西湖支行", "value": 20 }, { "name": "彭家坪支行", "value": 20 }, { "name": "武都路支行", "value": 20 }, { "name": "马滩支行", "value": 20 }, { "name": "榆中支行", "value": 20 }, { "name": "和平支行", "value": 20 }, { "name": "皋兰支行", "value": 20 }, { "name": "红谷支行", "value": 20 }, { "name": "永登支行", "value": 20 }, { "name": "兴陇支行营业室", "value": 20 }, { "name": "西固支行营业室", "value": 20 }, { "name": "福利东路支行", "value": 20 }, { "name": "甘南路支行", "value": 20 }, { "name": "甘肃银行城关支行营业室", "value": 20 }, { "name": "甘肃银行兰州市嘉峪关路支行", "value": 20 }, { "name": "甘肃银行兰州市天水北路支行", "value": 20 }, { "name": "甘肃银行兰州市北龙口支行", "value": 20 }, { "name": "甘肃银行兰州市盐场路支行", "value": 20 }, { "name": "东岗支行营业室", "value": 20 }, { "name": "五里铺支行", "value": 20 }, { "name": "嘉峪关南路支行", "value": 20 }, { "name": "兰州市高新支行", "value": 20 }, { "name": "兰州市东岗东路支行", "value": 20 }, { "name": "兰州市雁西路支行", "value": 20 }, { "name": "兰州市雁北路支行", "value": 20 }, { "name": "甘肃银行股份有限公司营业部", "value": 20 }, { "name": "甘肃银行股份有限公司文化支行", "value": 20 }, { "name": "甘肃银行股份有限公司兰州市南山东路支行", "value": 20 }, { "name": "甘肃银行股份有限公司兰州市临夏路支行", "value": 20 }, { "name": "甘肃银行股份有限公司兰州市定西南路支行", "value": 20 }, { "name": "甘肃银行股份有限公司兰州市庆阳路支行", "value": 20 }, { "name": "兰州新区支行营业室", "value": 20 }, { "name": "兰州新区科技支行", "value": 20 }, { "name": "兰州市南滨河中路支行", "value": 20 }, { "name": "兰州新区保税区支行", "value": 20 }, { "name": "中央广场支行", "value": 20 }, { "name": "火车站西路支行", "value": 20 }, { "name": "皋兰路支行", "value": 20 }, { "name": "五泉支行", "value": 20 }, { "name": "白银路支行", "value": 20 }, { "name": "白银区支行", "value": 20 }, { "name": "城建支行", "value": 20 }, { "name": "银龙支行", "value": 20 }, { "name": "银兴支行", "value": 20 }, { "name": "科技支行", "value": 20 }, { "name": "城联支行", "value": 20 }, { "name": "北京路支行", "value": 20 }, { "name": "银光支行", "value": 20 }, { "name": "工农路支行", "value": 20 }, { "name": "平川支行", "value": 20 }, { "name": "平川长征路支行", "value": 20 }, { "name": "靖远县支行", "value": 20 }, { "name": "靖远南大街支行", "value": 20 }, { "name": "景泰县支行", "value": 20 }, { "name": "景泰县长城路支行", "value": 20 }, { "name": "会宁县支行", "value": 20 }, { "name": "会宁县会师南路支行", "value": 20 }, { "name": "王岘东路支行", "value": 20 }, { "name": "人民路支行", "value": 20 }, { "name": "中学巷支行", "value": 20 }, { "name": "西郊支行", "value": 20 }, { "name": "华池支行", "value": 20 }, { "name": "北大街支行", "value": 20 }, { "name": "安定路支行", "value": 20 }, { "name": "合水支行", "value": 20 }, { "name": "小什字支行", "value": 20 }, { "name": "南大街支行", "value": 20 }, { "name": "西峰区支行", "value": 20 }, { "name": "宁县支行", "value": 20 }, { "name": "庆城支行", "value": 20 }, { "name": "镇原支行", "value": 20 }, { "name": "正宁支行", "value": 20 }, { "name": "环县支行", "value": 20 }, { "name": "东郊支行", "value": 20 }, { "name": "临潭支行", "value": 20 }, { "name": "卓尼支行", "value": 20 }, { "name": "夏河支行", "value": 20 }, { "name": "秦州区支行", "value": 20 }, { "name": "广场支行", "value": 20 }, { "name": "麦积支行", "value": 20 }, { "name": "桥南支行", "value": 20 }, { "name": "万达市场支行", "value": 20 }, { "name": "甘谷支行", "value": 20 }, { "name": "武山支行", "value": 20 }, { "name": "秦安支行", "value": 20 }, { "name": "清水支行", "value": 20 }, { "name": "张家川支行", "value": 20 }, { "name": "广河支行", "value": 20 }, { "name": "东乡支行", "value": 20 }, { "name": "和政支行", "value": 20 }, { "name": "永靖支行", "value": 20 }, { "name": "红园路支行", "value": 20 }, { "name": "临夏县支行", "value": 20 }, { "name": "东城区支行", "value": 20 }, { "name": "积石山支行", "value": 20 }, { "name": "康乐支行", "value": 20 }, { "name": "永昌支行", "value": 20 }, { "name": "金昌河西堡支行", "value": 20 }, { "name": "金昌上海路支行", "value": 20 }, { "name": "酒泉肃州区支行", "value": 20 }, { "name": "酒泉新城支行", "value": 20 }, { "name": "酒泉南大街支行", "value": 20 }, { "name": "酒泉西大街支行", "value": 20 }, { "name": "酒泉东大街支行", "value": 20 }, { "name": "酒泉解放北路支行", "value": 20 }, { "name": "敦煌支行", "value": 20 }, { "name": "瓜州支行", "value": 20 }, { "name": "玉门支行", "value": 20 }, { "name": "玉门建国路支行", "value": 20 }, { "name": "金塔支行", "value": 20 }, { "name": "阿克塞支行", "value": 20 }, { "name": "肃北支行", "value": 20 }, { "name": "敦煌七里镇支行", "value": 20 }, { "name": "甘肃银行股份有限公司徽县支行", "value": 20 }, { "name": "甘肃银行股份有限公司徽县金源广场小微支行", "value": 20 }, { "name": "甘肃银行股份有限公司成县支行", "value": 20 }, { "name": "甘肃银行股份有限公司康县支行", "value": 20 }, { "name": "甘肃银行股份有限公司两当支行", "value": 20 }, { "name": "甘肃银行股份有限公司西和支行", "value": 20 }, { "name": "甘肃银行股份有限公司礼县支行", "value": 20 }, { "name": "甘肃银行股份有限公司文县支行", "value": 20 }, { "name": "甘肃银行股份有限公司宕昌支行", "value": 20 }, { "name": "甘肃银行股份有限公司武都支行", "value": 20 }, { "name": "西关支行", "value": 20 }, { "name": "西城路支行", "value": 20 }, { "name": "红旗街支行", "value": 20 }, { "name": "中山街支行", "value": 20 }, { "name": "解放北路支行", "value": 20 }, { "name": "解放路支行", "value": 20 }, { "name": "柳湖路支行", "value": 20 }, { "name": "东关支行", "value": 20 }, { "name": "汽车西站支行", "value": 20 }, { "name": "崆峒中路支行", "value": 20 }, { "name": "工业园区支行", "value": 20 }, { "name": "崆峒古镇支行", "value": 20 }, { "name": "四十里铺支行", "value": 20 }, { "name": "华亭支行", "value": 20 }, { "name": "华亭新区支行", "value": 20 }, { "name": "崇信支行", "value": 20 }, { "name": "庄浪支行", "value": 20 }, { "name": "庄浪西关支行", "value": 20 }, { "name": "灵台支行", "value": 20 }, { "name": "静宁支行", "value": 20 }, { "name": "静宁西街支行", "value": 20 }, { "name": "泾川支行", "value": 20 }, { "name": "泾川广场支行", "value": 20 }, { "name": "民勤支行", "value": 20 }, { "name": "古浪支行", "value": 20 }, { "name": "天祝支行", "value": 20 }, { "name": "武威北关支行", "value": 20 }, { "name": "武威新区支行", "value": 20 }, { "name": "武威南关东路支行", "value": 20 }, { "name": "武威天马路支行", "value": 20 }, { "name": "甘肃银行股份有限公司县府街支行", "value": 20 }, { "name": "甘肃银行股份有限公司民乐支行", "value": 20 }, { "name": "甘肃银行股份有限公司高台支行", "value": 20 }, { "name": "甘肃银行股份有限公司山丹支行", "value": 20 }, { "name": "甘肃银行股份有限公司临泽支行", "value": 20 }, { "name": "甘肃银行股份有限公司张掖西关支行", "value": 20 }, { "name": "甘肃银行股份有限公司张掖中心广场支行", "value": 20 }, { "name": "甘肃银行股份有限公司张掖东街支行", "value": 20 }, { "name": "渭源支行", "value": 20 }, { "name": "陇西支行", "value": 20 }, { "name": "陇西文峰支行", "value": 20 }, { "name": "临洮支行", "value": 20 }, { "name": "临洮洮阳支行", "value": 20 }, { "name": "通渭支行", "value": 20 }, { "name": "岷县支行", "value": 20 }, { "name": "漳县支行", "value": 20 }, { "name": "定西火车站支行", "value": 20 }, { "name": "定西西岩路支行", "value": 20 }, { "name": "定西新城支行", "value": 20 }, { "name": "酒钢支行", "value": 20 }, { "name": "和诚支行", "value": 20 }, { "name": "白银分行营业部", "value": 60 }, { "name": "庆阳分行营业部", "value": 60 }, { "name": "甘南藏族自治州营业室", "value": 60 }, { "name": "天水分行营业部", "value": 60 }, { "name": "临夏团结北路支行", "value": 60 }, { "name": "金昌支行营业室", "value": 60 }, { "name": "酒泉分行", "value": 60 }, { "name": "甘肃银行股份有限公司陇南分行营业部", "value": 60 }, { "name": "平凉分行营业部", "value": 60 }, { "name": "武威分行营业室", "value": 60 }, { "name": "甘肃银行股份有限公司张掖分行营业部", "value": 60 }, { "name": "定西分行营业部", "value": 60 }, { "name": "嘉峪关迎宾东路支行", "value": 60 }
        ]
      )
    }
  ]
};

function mapDataToScatterData(arrData) {
  let res = [];
  for (let i = 0; i < arrData.length; i++) {
    let cood = LonLat[arrData[i].name];
    res.push({
      name: arrData[i].name,
      value: cood.concat(arrData[i].value),
      label: {
        normal: {
          position: arrData[i].name == "酒泉" ? 'right' : 'bottom'
        }
      },
      itemStyle: {
        normal: {
          color: arrData[i].value > 50 ? '#fc6721' : '#308000',
          shadowColor: '#000',
          shadowBlur: 3,
          shadowOffsetX: 3,
          shadowOffsetY: 3,
        }
      }
    });
  }
  return res;
}
export default class Middle extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  render() {
    const { branch, employee, today, climax, tenAvg, dualRatio, line, renjuncunkuan, renjundaikuan, renjunlirun } = this.props.data
    // let webYesterdayRadioStyle = { color: '#ff000' };
    let webYesterdayRadioStyle = { color: '#ff0000' };
    let arrowSrc = window.dominContext.staticPath + '/assets/images/mscard/redArrow.png';
    // if (dualRatio >= 0) {
    //   webYesterdayRadioStyle = { color: '#00ff00' };
    //   arrowSrc = window.dominContext.staticPath + '/assets/images/mscard/greenArrow.png';
    // }
    let vv = 0.3//Math.round(Math.random()*10)/10;
    return (
      <div className={style.Middle} >
        <BaseMap className={style.map} option={mapOption} mapName={"gansu"} />
        {/* <div className={style.mid_rt}>
          <TitleValue
            className={style.all_title_con}
            style={{ top: '50px', left: '85px', fontSize: '23px' }}
            title={"当日核心交易量"}
            titleClassName={style.mid_title}
            valueClassName={style.mid_num}
            value={today} />
          <TitleValue
            className={style.all_title_con}
            style={{ top: '230px', left: '85px', fontSize: '23px' }}
            title={"历史峰值日交易量"}
            titleStyle={{ color: '#6fc4f5', }}
            titleClassName={style.mid_title}
            valueClassName={style.mid_num}
            value={climax} />
          <TitleValue
            className={style.all_title_con}
            style={{ top: '230px', left: '550px', fontSize: '23px' }}
            title={"10日业务量（均值）"}
            titleStyle={{ color: '#6fc4f5', }}
            titleClassName={style.mid_title}
            valueClassName={style.mid_num}
            value={tenAvg} />
          <ImgTitleValue className={style.webYesterdayRadio} imgClassName={style.arrow} valueStyle={webYesterdayRadioStyle} title={"昨日同比"} value={vv + "%"} imgSrc={arrowSrc} />
        </div> */}
        <div className={style.mid_rt}>
          <TitleValue
            className={style.all_title_con}
            style={{ top: '90px', left: '385px', fontSize: '23px' }}
            title={"人均存款"}
            titleClassName={style.mid_title}
            valueClassName={style.mid_num}
            value={renjuncunkuan}
            unitClassName={style.ltUnit}
            unit='万元' />
          <TitleValue
            className={style.all_title_con}
            style={{ top: '240px', left: '385px', fontSize: '23px' }}
            title={"人均贷款"}
            titleClassName={style.mid_title}
            valueClassName={style.mid_num}
            value={renjundaikuan}
            unitClassName={style.ltUnit}
            unit='万元' />
          <TitleValue
            className={style.all_title_con}
            style={{ top: '390px', left: '385px', fontSize: '23px' }}
            title={"人均利润"}
            titleClassName={style.mid_title}
            valueClassName={style.mid_num}
            value={renjunlirun}
            unitClassName={style.ltUnit}
            unit='万元' />
        </div>
        {/* <div className={style.mid_ld}>
          <span style={{ margin: 40, fontSize: 25 }}>交易量实时变化曲线</span>
          <Chart className={style.realtimeLine} option={DataCreater.createRealtimeLineOption(line[0], line[1], line[2])} />
        </div> */}
        <Tips
          title='营业网点'
          num={branch.toLocaleString()}
          // num={203}
          unit='家'
          className={style.mid_shop_num} />
        <Tips
          title='全行共有员工'
          num={employee.toLocaleString()}
          // num={3966}
          unit='人'
          className={style.mid_employee_num} />
      </div>);
  }
}
