import React, { Component } from 'react';
import style from './style.css';
import { Link } from 'react-router-dom';
import ScrollList from 'components/common/ScrollList';
import Chart from 'components/common/Chart';
import TitleChart from 'components/common/TitleChart';
import TitleValue from 'components/common/TitleValue';
import Item from './Item';
import ListItem from './ListItem';
import ThreeCenter from './ThreeCenter';
// import SystemNotice from './systemNotice/SystemNotice';

import DataCreater from './DataCreater';
import BaseMap from 'components/common/BaseMap';
import OneVideo from 'components/common/OneVideo';
import 'echarts/lib/chart/lines';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/tooltip';
import moment from 'moment';
import Tools from 'utils/Tools';
import $ from "jquery";

class MSTwoThree extends Component {
  constructor(props) {
    super(props);
    window.share.resetPageSize(1920, 1080);

    this.zhuIndex = [
      "TD_atmp",
      "TD_esb",
      "TD_hexin",
      "TD_tongyishenfenrenzheng",
      // "TD_yinlianzhifu",
      "TD_chaowangqianzhi",
      "TD_gonggongjiaoyi",
      "TD_jichuanquanpingtai",
      "TD_tongyizhifu",
      "TD_erdaiqianzhi",
      "TD_guimianqianzhi",
      "TD_kehuanquanpingtai",
      // "TD_yinlianshuju",
      // "TD_posp",
      // "TD_hexinwaigua"
    ];
    this.beiIndex = [
      "TD_atmp_ZB",
      "TD_esb_ZB",
      "TD_hexin_ZB",
      "TD_tongyishenfenrenzheng_ZB",
      // "TD_yinlianzhifu_ZB",
      "TD_chaowangqianzhi_ZB",
      "TD_gonggongjiaoyi_ZB",
      "TD_jichuanquanpingtai_ZB",
      "TD_tongyizhifu_ZB",
      "TD_erdaiqianzhi_ZB",
      "TD_guimianqianzhi_ZB",
      "TD_kehuanquanpingtai_ZB",
      // "TD_yinlianshuju_ZB",
      // "TD_posp_ZB",
      // "TD_hexinwaigua_ZB"
    ];

    this.bandwidthData = {};
    this.tdCurData = {};
    this.caledTDData = {};

    this.indexArr = [
      { name: "ATMP系统", shengchanKPI: "TD_atmp", zaibeiKPI: "TD_atmp_ZB" },
      { name: "ESB系统", shengchanKPI: "TD_esb", zaibeiKPI: "TD_esb_ZB" },
      { name: "核心系统", shengchanKPI: "TD_hexin", zaibeiKPI: "TD_hexin_ZB" },
      { name: "统一身份认证", shengchanKPI: "TD_tongyishenfenrenzheng", zaibeiKPI: "TD_tongyishenfenrenzheng_ZB" },
      // { name: "银联支付系统", shengchanKPI: "TD_yinlianzhifu", zaibeiKPI: "TD_yinlianzhifu_ZB" },
      { name: "超级网银系统", shengchanKPI: "TD_chaowangqianzhi", zaibeiKPI: "TD_chaowangqianzhi_ZB" },
      { name: "公共交易系统", shengchanKPI: "TD_gonggongjiaoyi", zaibeiKPI: "TD_gonggongjiaoyi_ZB" },
      { name: "安保平台系统", shengchanKPI: "TD_jichuanquanpingtai", zaibeiKPI: "TD_jichuanquanpingtai_ZB" },
      { name: "统一支付系统", shengchanKPI: "TD_tongyizhifu", zaibeiKPI: "TD_tongyizhifu_ZB" },
      { name: "二代支付系统", shengchanKPI: "TD_erdaiqianzhi", zaibeiKPI: "TD_erdaiqianzhi_ZB" },
      { name: "柜面前置系统", shengchanKPI: "TD_guimianqianzhi", zaibeiKPI: "TD_guimianqianzhi_ZB" },
      { name: "客户安全平台", shengchanKPI: "TD_kehuanquanpingtai", zaibeiKPI: "TD_kehuanquanpingtai_ZB" },
      // { name: "银联数据系统", shengchanKPI: "TD_yinlianshuju", zaibeiKPI: "TD_yinlianshuju_ZB" },
      // { name: "POSP系统", shengchanKPI: "TD_posp", zaibeiKPI: "TD_posp_ZB" },
      // { name: "核心外挂系统", shengchanKPI: "TD_hexinwaigua", zaibeiKPI: "TD_hexinwaigua_ZB" }
    ];
    this.state = {
      mapOption: DataCreater.createMapOption([
        { name: '白银分行', value: 10 },
        { name: '庆阳分行', value: 10 },
        { name: '甘南分行', value: 10 },
        { name: '天水分行', value: 10 },
        { name: '临夏分行', value: 10 },
        { name: '金昌支行', value: 10 },
        { name: '酒泉分行', value: 10 },
        { name: '陇南分行', value: 10 },
        { name: '平凉分行', value: 10 },
        { name: '武威分行', value: 10 },
        { name: '张掖分行', value: 10 },
        { name: '定西分行', value: 10 },
        { name: '嘉峪关分行', value: 10 },
      ]),
      list: [
        { name: '总行营业部', v1: 6, v2: 23, v3: 37 },
        { name: '安宁支行', v1: 5, v2: 21, v3: 31 },
        { name: '城关支行', v1: 6, v2: 18, v3: 22 },
        { name: '东岗支行', v1: 3, v2: 6, v3: 9 },
        { name: '高新支行', v1: 4, v2: 10, v3: 15 },
        { name: '七里河支行', v1: 13, v2: 30, v3: 44 },
        { name: '西固支行', v1: 3, v2: 8, v3: 11 },
        { name: '新区支行', v1: 5, v2: 10, v3: 21 },
        { name: '兴陇支行', v1: 1, v2: 2, v3: 4 },
        { name: '中央广场支行', v1: 5, v2: 13, v3: 17 },

        { name: '白银分行', v1: 22, v2: 49, v3: 62 },
        { name: '庆阳分行', v1: 16, v2: 42, v3: 73 },
        { name: '甘南分行', v1: 5, v2: 9, v3: 13 },//当周街
        { name: '天水分行', v1: 12, v2: 32, v3: 61 },
        { name: '临夏分行', v1: 11, v2: 31, v3: 61 },//红园路
        { name: '金昌支行', v1: 5, v2: 11, v3: 19 },//天津路
        { name: '酒泉分行', v1: 17, v2: 39, v3: 60 },
        { name: '陇南分行', v1: 12, v2: 30, v3: 67 },
        { name: '平凉分行', v1: 27, v2: 68, v3: 92 },
        { name: '武威分行', v1: 11, v2: 23, v3: 41 },//凉州区
        { name: '张掖分行', v1: 11, v2: 26, v3: 52 },
        { name: '定西分行', v1: 13, v2: 26, v3: 55 },
        { name: '嘉峪关分行', v1: 5, v2: 12, v3: 18 },//迎宾东路
      ],
      bandwidthOption: DataCreater.createBandwidthOption([{time:0, yidongOut: 0, yidongIn: 0, dianxinOut: 0, dianxinIn: 0, liantongOut: 0, liantongIn: 0 }]),//{ time: "2017/07", yidong: 10, dianxin: 20, liantong: 30 }, { time: "2017/08", yidong: 30, dianxin: 20, liantong: 10 }, { time: "2017/09", yidong: 50, dianxin: 40, liantong: 30 }
      // contRate: 100,
      busV1: 0,
      busV2: 0,
      //同步速率 延时，数据量
      tbsl: 0,
      yssl:0,
      sjl:0,
      index: 0,
      ringOption: DataCreater.createRingOption([{ name: "生产中心", value: 1 }, { name: "同城灾备", value: 4 }]),
      systemNotice: [{ name: "名字1", value: 0 }, { name: "名字2", value: 0 }],
      gardenAData: { rv1: 0, rv2: 0, rv3: 0 },
      gardenBData: { rv1: 0, rv2: 0, rv3: 0 },
      num1:0,
      num2:0
    };
  }

  componentDidMount() {
    // console.log(moment('2017-12-04T02:32:52Z').format('"HH:mm"'));//10:32
  //   console.log(moment('2017-12-04T02:38:00Z').format('"HH:mm"'));//11:02
  //   let yidong=[
  //     {
  //         "SW_Outbps_N":[
  //             {"time":"2017-12-04T02:10:47Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":0.4569491744041443},
  //             {"time":"2017-12-04T02:16:41Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":0.5254904627799988},
  //             {"time":"2017-12-04T02:20:36Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":0.4707746207714081},
  //             {"time":"2017-12-04T02:26:32Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":0.5070934295654297},
  //             {"time":"2017-12-04T02:32:52Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":0.5029452443122864},
  //             {"time":"2017-12-04T02:34:43Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":0.48632049560546875},
  //             {"time":"2017-12-04T02:40:37Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":0.5585578083992004},
  //             {"time":"2017-12-04T02:46:32Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":0.5162543654441833},
  //             {"time":"2017-12-04T02:50:47Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":0.49471211433410645},
  //             {"time":"2017-12-04T02:56:32Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":0.46864697337150574},
  //             {"time":"2017-12-04T03:02:31Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":0.6004382371902466}
  //         ],
  //         "SW_Inbps_N":[
  //             {"time":"2017-12-04T02:10:47Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":3.195939540863037},
  //             {"time":"2017-12-04T02:14:50Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":3.866117238998413},
  //             {"time":"2017-12-04T02:16:41Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":3.866117238998413},
  //             {"time":"2017-12-04T02:20:36Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":4.299570560455322},
  //             {"time":"2017-12-04T02:26:32Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":4.124663829803467},
  //             {"time":"2017-12-04T02:32:52Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":3.728520631790161},
  //             {"time":"2017-12-04T02:34:43Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":2.56335711479187},
  //             {"time":"2017-12-04T02:40:37Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":2.4568138122558594},
  //             {"time":"2017-12-04T02:46:32Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":3.1101582050323486},
  //             {"time":"2017-12-04T02:50:47Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":3.843369245529175},
  //             {"time":"2017-12-04T02:56:32Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":3.0453295707702637},
  //             {"time":"2017-12-04T03:02:31Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB","value":3.3497323989868164}
  //         ]
  //     }
  //   ]
  //   let liantong=[
  //     {
  //         "SW_Outbps_N":[
  //           {"time":"2017-12-04T02:10:47Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":0.5218493938446045},
  //           {"time":"2017-12-04T02:16:41Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":0.19586434960365295},
  //           {"time":"2017-12-04T02:20:36Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":0.56810063123703},
  //           {"time":"2017-12-04T02:26:31Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":0.3016160726547241},
  //           {"time":"2017-12-04T02:32:52Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":0.24999170005321503},
  //           {"time":"2017-12-04T02:34:42Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":0.2926682233810425},
  //           {"time":"2017-12-04T02:40:37Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":0.18278026580810547},
  //           {"time":"2017-12-04T02:46:32Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":0.39906495809555054},
  //           {"time":"2017-12-04T02:50:47Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":0.26842793822288513},
  //           {"time":"2017-12-04T02:56:31Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":0.3988998234272003},
  //           {"time":"2017-12-04T03:02:31Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":0.32669827342033386}
  //         ],
  //         "SW_Inbps_N":[
  //           {"time":"2017-12-04T02:10:47Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":1.186409831047058},
  //           {"time":"2017-12-04T02:14:50Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":1.0066416263580322},
  //           {"time":"2017-12-04T02:16:41Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":1.0066416263580322},
  //           {"time":"2017-12-04T02:20:36Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":1.8818986415863037},
  //           {"time":"2017-12-04T02:26:31Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":1.303617238998413},
  //           {"time":"2017-12-04T02:32:52Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":1.167630672454834},
  //           {"time":"2017-12-04T02:34:42Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":1.123943567276001},
  //           {"time":"2017-12-04T02:40:37Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":0.8716036677360535},
  //           {"time":"2017-12-04T02:46:32Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":1.351177453994751},
  //           {"time":"2017-12-04T02:50:47Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":1.9587883949279785},
  //           {"time":"2017-12-04T02:56:31Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":1.8567864894866943},
  //           {"time":"2017-12-04T03:02:31Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC","value":1.8424882888793945}
  //         ]
  //     }
  //   ];
  //   let  dianxin=[
  //     {
  //       "SW_Outbps_N":[
  //         {"time":"2017-12-04T02:10:47Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":1.8391987085342407},
  //         {"time":"2017-12-04T02:16:41Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":1.723544955253601},
  //         {"time":"2017-12-04T02:20:36Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":1.9606916904449463},
  //         {"time":"2017-12-04T02:26:32Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":1.7426321506500244},
  //         {"time":"2017-12-04T02:32:52Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":1.6802585124969482},
  //         {"time":"2017-12-04T02:34:43Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":1.6305365562438965},
  //         {"time":"2017-12-04T02:40:37Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":1.670060634613037},

  //         {"time":"2017-12-04T02:38:00Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":1.670060634613037},

  //         {"time":"2017-12-04T02:46:32Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":2.008420467376709},
  //         {"time":"2017-12-04T02:50:47Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":1.8832533359527588},
  //         {"time":"2017-12-04T02:56:32Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":1.9529168605804443},
  //         {"time":"2017-12-04T03:02:31Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":1.745276927947998}
  //       ],
  //       "SW_Inbps_N":[
  //         {"time":"2017-12-04T02:10:47Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":13.215615272521973},
  //         {"time":"2017-12-04T02:14:50Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":13.546144485473633},
  //         {"time":"2017-12-04T02:16:41Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":13.546144485473633},
  //         {"time":"2017-12-04T02:20:36Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":16.36746597290039},
  //         {"time":"2017-12-04T02:26:32Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":13.925434112548828},
  //         {"time":"2017-12-04T02:32:52Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":13.463165283203125},
  //         {"time":"2017-12-04T02:34:43Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":13.182923316955566},
  //         {"time":"2017-12-04T02:40:37Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":13.071293830871582},

  //         {"time":"2017-12-04T02:38:00Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":1.670060634613037},

  //         {"time":"2017-12-04T02:46:32Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":14.508805274963379},
  //         {"time":"2017-12-04T02:50:47Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":12.901018142700195},
  //         {"time":"2017-12-04T02:56:32Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":14.256488800048828},
  //         {"time":"2017-12-04T03:02:31Z","name":"DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT","value":12.841925621032715}
  //       ]
  //     }
  //   ]
  // this.updateYiDongData(yidong);
  // this.updateDianXinData(dianxin);
  // this.updateLianTongData(liantong);
    
    this.getBandwidthData();
    this.getTDCurData();
    this.getZTData();
    this.getTDThreeData();
    this.flagBW = setInterval(this.getBandwidthData, window.locationConfig.TGInterface.interface.bandwidth.loopTime);
    this.flagTD = setInterval(this.getTDCurData, window.locationConfig.TGInterface.interface.td23.loopTime);
    this.flagZT = setInterval(this.getZTData, window.locationConfig.ZTInterface.interface.linkLogin.loopTime);
    this.flagTDThree = setInterval(this.getTDThreeData, window.locationConfig.TGInterface.interface.td23.loopTime);
    this.flagLoop = setInterval(this.nextIndex, window.locationConfig.indexArrLoopTime);
  }
  componentWillUnmount() {
    clearInterval(this.flagBW);this.flagBW=null;
    clearInterval(this.flagTD);this.flagTD=null;
    clearInterval(this.flagZT);this.flagZT=null; 
    clearInterval(this.flagTDThree);this.flagTDThree=null;
    clearInterval(this.flagLoop);this.flagLoop=null;
    this.zhuIndex=null;
    this.beiIndex=null;
    this.bandwidthData = null;
    this.tdCurData =null;
    this.caledTDData = null;
    this.indexArr=null;
  }
  getBandwidthData = () => {
    if (window.locationConfig.debug) {

    } else {
      let startTStr = moment().subtract(60, 'minutes').format("YYYY-MM-DD HH:mm:ss");
      //推迟2分钟
      let endTStr = moment().subtract(2, 'minutes').format("YYYY-MM-DD HH:mm:ss");

      let yidong = "DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CMB";
      let dianxin = "DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_CT";
      let liantong = "DCA-INT-GTM-F4000-01.gsbankchina.com - /Common/vlan_UNC";

      this.bandwidthData = {};
      Tools.fetchGet(
        window.locationConfig.TGInterface.interface.bandwidth.address + "?kpiName=SW_Inbps_N,SW_Outbps_N&name=" + yidong + "&startTime=" + startTStr + "&endTime=" + endTStr,
        { 'Content-Type': 'application/json' },
        this.updateYiDongData);

      Tools.fetchGet(
        window.locationConfig.TGInterface.interface.bandwidth.address + "?kpiName=SW_Inbps_N,SW_Outbps_N&name=" + dianxin + "&startTime=" + startTStr + "&endTime=" + endTStr,
        { 'Content-Type': 'application/json' },
        this.updateDianXinData);

      Tools.fetchGet(
        window.locationConfig.TGInterface.interface.bandwidth.address + "?kpiName=SW_Inbps_N,SW_Outbps_N&name=" + liantong + "&startTime=" + startTStr + "&endTime=" + endTStr,
        { 'Content-Type': 'application/json' },
        this.updateLianTongData);
    }
  }
  getTDCurData = () => {
    if (window.locationConfig.debug) {

    } else {
      let m = moment();
      let startTStr = m.format("YYYY-MM-DD 00:00:00");
      let endTStr = m.format("YYYY-MM-DD HH:mm:ss");
      let s = this.zhuIndex.join(",") + "," + this.beiIndex.join(",");
      Tools.fetchGet(window.locationConfig.TGInterface.interface.td.address + "?kpiName=" + s + "&startTime=" + startTStr + "&endTime=" + endTStr,
        { 'Content-Type': 'application/json' },
        this.updateTDCurData);
    }
  }
  getZTData = () => {
    if (window.locationConfig.debug) {

    } else {
      Tools.fetchGet(window.locationConfig.ZTInterface.interface.linkLogin.address + '?interval=1&time=0',
        { 'Content-Type': 'application/json' },
        this.updateZTData);
    }
  }
  getTDThreeData= () => {
    if (window.locationConfig.debug) {

    } else {
      Tools.fetchGet(window.locationConfig.TGInterface.interface.td.address + '?kpiName=GS_checks',
        { 'Content-Type': 'application/json' },
        this.updateTDThreeData);
    }
  }
  updateYiDongData = (data) => {   
    let bd = data[0];
    let r = this._doBandWidthData(bd, this.bandwidthData);
    this.setState({ bandwidthOption: DataCreater.createBandwidthOption(r) });
  }
  updateDianXinData = (data) => {
    let bd = data[0];
    let r = this._doBandWidthData(bd, this.bandwidthData);
    this.setState({ bandwidthOption: DataCreater.createBandwidthOption(r) });
  }
  updateLianTongData = (data) => {
    let bd = data[0];
    let r = this._doBandWidthData(bd, this.bandwidthData);
    this.setState({ bandwidthOption: DataCreater.createBandwidthOption(r) });
  }

  updateTDCurData = (data) => {
    let tdD = data[0];
    // console.log(tdD);
    this._doTDData(tdD, this.tdCurData);
    this._calTDData(this.tdCurData, this.caledTDData);

    let o = this.calDataByIndexIndex(this.state.index);

    this.setState({
      busV1: this.caledTDData["TD_hexin"].jiaoyiliang,//this.caledTDData.shengchan,
      busV2: this.caledTDData["TD_hexin_ZB"].jiaoyiliang,//this.caledTDData.zaibei,
      ...o
    });
  }
  updateZTData = (data) => {
    let lianjie = Number(data.content.echartsData.line1[0]);
    let denglu = Number(data.content.echartsData.line2[0]);
    let jigou = data.content.echartsData.brno_num;

    this.setState({
      num1:denglu,
      num2:jigou
    });
  }
  updateTDThreeData = (data) => {
  
    let tbsl = Number(data[0].GS_checks[0].check_recv)/1024;   
    let tbys = Number(data[0].GS_checks[0].check_time)/60;
    let sjl = Number(data[0].GS_checks[0].check_size)/5;

    tbsl = Math.floor(tbsl*100)/100;
    tbys = Math.floor(tbys*100)/100;
    sjl = Math.floor(sjl*100)/100;

    this.setState({
     tbsl,tbys,sjl,
    });
  }
  _doBandWidthData(data, obj) {
    let outArr = data["SW_Outbps_N"];
    let inArr = data["SW_Inbps_N"];
    let name = "yidong";
    let len = outArr.length > inArr.length ? outArr.length : inArr.length;
    if (outArr.length > 0) {
      let arr = outArr[0].name.split("_");
      let n = arr[arr.length - 1];
      if (n == "CT") {
        name = "dianxin";
      } else if (n == "UNC") {
        name = 'liantong';
      }
    }
    for (let i = 0; i < len; i++) {
      let t = "";
      let outV = 0;
      let inV = 0;
      if (outArr[i]) {
        t = moment(outArr[i].time).format("HH:mm");
        outV = outArr[i].value;
        if (!obj[t]) {
          obj[t] = { time: t, yidongOut: 0, yidongIn: 0, dianxinOut: 0, dianxinIn: 0, liantongOut: 0, liantongIn: 0 };
        }
        obj[t][name + "Out"] = outV;
      }
      if (inArr[i]) {
        t = moment(inArr[i].time).format("HH:mm");
        inV = inArr[i].value;
        if (!obj[t]) {
          obj[t] = { time: t, yidongOut: 0, yidongIn: 0, dianxinOut: 0, dianxinIn: 0, liantongOut: 0, liantongIn: 0 };
        }
        obj[t][name + "In"] = inV;
      }
    }
    let r = [];
    for (let key in obj) {
      r.push(obj[key]);
    }
    r.sort((a, b) => { return a.time > b.time ? 1 : -1; });
    // r.sort((a, b) => { return moment(a.time).format("HH:mm")> moment(b.time).format("HH:mm") ? 1 : -1; });
    //找出第一个非0的
    let firstOutNoZero = 0, firstInNoZero = 0, firstOutNoZeroIdx = 0, firstInNoZeroIdx = 0;
    for (let i = 0; i < r.length; i++) {
      if (r[i][name + "Out"] != 0 && firstOutNoZero == 0) {
        firstOutNoZero = r[i][name + "Out"];
        firstOutNoZeroIdx = i;
      }
      if (r[i][name + "In"] != 0 && firstInNoZero == 0) {
        firstInNoZero = r[i][name + "In"];
        firstInNoZeroIdx = i;
      }
      if (firstOutNoZero != 0 && firstInNoZero != 0) {
        break;
      }
    }
    //将前面为0的补为不为0的
    for (let i = 0; i < firstOutNoZeroIdx; i++) {
      r[i][name + "Out"] = firstOutNoZero;
    }
    for (let i = 0; i < firstInNoZeroIdx; i++) {
      r[i][name + "In"] = firstInNoZero;
    }
    //将后面为0的补为不为0的并求和
    for (let i = 0; i < r.length; i++) {
      if (r[i][name + "Out"] == 0 && i > 0) {
        r[i][name + "Out"] = r[i - 1][name + "Out"];
      }
      if (r[i][name + "In"] == 0 && i > 0) {
        r[i][name + "In"] = r[i - 1][name + "In"];
      }
    }

    return r;
  }

  _doTDData(data, obj) {
    for (let key in data) {
      obj[key] = data[key];
    }
    for (let i = 0; i < this.zhuIndex.length; i++) {
      if (obj[this.zhuIndex[i]] == null) {
        obj[this.zhuIndex[i]] = [];
      }
    }
    for (let i = 0; i < this.beiIndex.length; i++) {
      if (obj[this.beiIndex[i]] == null) {
        obj[this.beiIndex[i]] = [];
      }
    }
  }
  _calTDData(obj, caledObj) {
    let shengchan = 0, zaibei = 0;
    for (let key in obj) {
      let arr = obj[key];
      let all1 = 0, all2 = 0, all3 = 0, all4 = 0;
      let last1=0,last2=0,last3=0,last4=0;
      for (let i = 0; i < arr.length; i++) {
        all1 += Number(arr[i].jiaoyi),
          all2 += Number(arr[i].jiaoyitwo),
          all3 += Number(arr[i].jiaoyithree),
          all4 += Number(arr[i].value)
          if(i==arr.length-1){
            last1=Number(arr[i].jiaoyi)
            last2 = Number(arr[i].jiaoyitwo),
            last3 = Number(arr[i].jiaoyithree),
            last4 = Number(arr[i].value)
          }
      }
      caledObj[key] = {
        jiaoyiliang: all1,
        xiangyinglv: ((last1 != 0 ? last2 / last1 : 0) * 100).toFixed(2),
        chenggognlv: ((last2 != 0 ? last3 / last2 : 0) * 100).toFixed(2),
        xiangyingshijian: Math.floor((last2 != 0 ? last4 / last2 : 0) * 100) / 100,
      }
      if (this.zhuIndex.indexOf(key) != -1) {
        shengchan += all1;
      } else {
        zaibei += all1;
      }
    }
    caledObj["shengchan"] = shengchan;
    caledObj["zaibei"] = zaibei;
  }

  nextIndex = () => {
    this.setState((prevState) => {
      let i;
      if (prevState.index >= (this.indexArr.length - 1)) {
        i = 0;
      } else {
        i = prevState.index + 1;
      }
      this.setState({
        index: i,
        ...this.calDataByIndexIndex(i)
      });
    })
  }
  calDataByIndexIndex = (index) => {
    let sckpi = this.indexArr[index].shengchanKPI;
    let zbkpi = this.indexArr[index].zaibeiKPI;

    let ringOption = DataCreater.createRingOption([{ name: "生产中心", value: this.caledTDData[sckpi].jiaoyiliang }, { name: "同城灾备", value: this.caledTDData[zbkpi].jiaoyiliang }]);
    let systemNotice = [{ name: "生产中心", value: this.caledTDData[sckpi].jiaoyiliang }, { name: "同城灾备", value: this.caledTDData[zbkpi].jiaoyiliang }];
    let gardenAData = { rv1: this.caledTDData[sckpi].chenggognlv, rv2: this.caledTDData[sckpi].xiangyinglv, rv3: this.caledTDData[sckpi].xiangyingshijian };
    let gardenBData = { rv1: this.caledTDData[zbkpi].chenggognlv, rv2: this.caledTDData[zbkpi].xiangyinglv, rv3: this.caledTDData[zbkpi].xiangyingshijian };

    return { ringOption, systemNotice, gardenAData, gardenBData };
  }


  render() {
    return (
      <div className={style.root} >
        <OneVideo className={style.bgvideo} videoUrl={window.dominContext.staticPath + '/assets/videos/common/bgVideo.mp4'} />
        <img className={style.titleWeb} src={window.dominContext.staticPath + '/assets/images/ms23/titleWeb.png'} />
        <img className={style.title23} src={window.dominContext.staticPath + '/assets/images/ms23/title23.png'} />
        <BaseMap className={style.map} option={this.state.mapOption} mapName={"gansu"} />
        <p style={{ position: 'absolute', left: 220, top: 442, fontSize: 18, fontFamily: '微软雅黑' }}>
          <span style={{ display: 'inline-block', width: 100, textAlign: 'center' }}>网点数</span>
          <span style={{ display: 'inline-block', width: 100, textAlign: 'center' }}>自助设备数</span>
        </p>
        <img className={style.itemBg1} src={window.dominContext.staticPath + '/assets/images/ms23/itemBg1.png'} />
        <ScrollList className={style.itemBg1} style={{ paddingTop: 10, width: 441, height: 250 }} itemClass={ListItem}
          arrData={this.state.list}
          pageCount={6}
          autoPlay={true}
          loop={true}
          delay={3000}
          actionDelay={1000}
          dir={-1}
          moveDis={1}
          itemH={40}
        />


        <TitleChart className={style.bandwidth} titleClassName={style.bandwidth_title} chartClassName={style.bandwidth_chart} title={"互联网线路带宽"} option={this.state.bandwidthOption} />
        
        {/* <TitleValue className={style.contRate} title={"当前网点连通率"} value={this.state.contRate + "%"} /> */}
        {/* 仪表盘 */}
        <ThreeCenter className={style.threeCenter} tbsl={this.state.tbsl} tbys={this.state.tbys}/>

        <TitleValue className={style.busV1} title={"当日核心交易量"} value={this.state.busV1} />

        <TitleValue className={style.busV2} title={"当日核心交易量"} value={this.state.busV2} />

        {/* <TitleValue className={style.busV3} title={"同步速率"} value={this.state.busV3} unitStyle={{ fontSize: 18 }} unit={"M"} /> */}
        <TitleValue className={style.busV3} title={"同步数据量"} value={this.state.sjl} unit={"M/min"} unitStyle={{ fontSize: 18 }} titleStyle={{float:"left",lineHeight:"65px",marginRight:"15px"}} valueStyle={{float:"left"}}/>
        
        <Chart className={style.ring} option={this.state.ringOption} />

        {/* <h3 style={{ position: 'absolute', left: 1034, top: 662, fontFamily: "微软雅黑", fontSize: 24 }}>{this.indexArr[this.state.index].name}</h3> */}
        <div className={style.hr} />
        {/* <SystemNotice className={style.systemNotice} data={this.state.systemNotice} /> */}
        <span className={style.systemNotice}>
          <span style={{ display: 'inline-block', fontFamily: "微软雅黑", fontSize: 24, width: 240 }}>{this.indexArr[this.state.index].name}</span>
          <span style={{ display: 'inline-block', marginRight: 20 }}>生产中心</span>
          <span style={{ display: 'inline-block', marginRight: 20 }}>当日交易量</span>
          <span style={{ display: 'inline-block', marginRight: 40 }}>{this.state.systemNotice[0].value}</span>
          <span style={{ display: 'inline-block', marginRight: 20 }}>灾备中心</span>
          <span style={{ display: 'inline-block', marginRight: 20 }}>当日交易量</span>
          <span style={{ display: 'inline-block' }}>{this.state.systemNotice[1].value}</span>
        </span>
        <p style={{ position: 'absolute', left: 1458, top: 806 }}>
          <span style={{ display: 'inline-block', width: 120, textAlign: 'center' }}>成功率</span>
          <span style={{ display: 'inline-block', width: 120, textAlign: 'center' }}>响应率</span>
          <span style={{ display: 'inline-block', width: 120, textAlign: 'center' }}>响应时间</span>
        </p>
        <img className={style.gardenA} src={window.dominContext.staticPath + '/assets/images/ms23/itemBg2.png'} />
        <img className={style.gardenB} src={window.dominContext.staticPath + '/assets/images/ms23/itemBg2.png'} />
        <Item className={style.gardenA} title="生产中心" data={this.state.gardenAData} />
        <Item className={style.gardenB} title="同城灾备" data={this.state.gardenBData} />
        {/* <TitleChart className={style.webBankTradingWaveRank} titleClassName={style.webBankTradingWaveRank_title} chartClassName={style.webBankTradingWaveRank_chart} title={"网络金融业务交易量波动排名"} option={this.state.webBankTradingWaveRank} /> */}
        <p style={{position:'absolute',left:670,top:30,fontFamily: "微软雅黑",fontSize: 18}}>签到机构数：<span style={{ fontFamily: "Arial Black",fontSize:30}}>{this.state.num2}</span></p>
        <p style={{position:'absolute',left:670,top:75,fontFamily: "微软雅黑",fontSize: 18}}>登录柜员数：<span style={{ fontFamily: "Arial Black",fontSize:30}}>{this.state.num1}</span></p>
        <Link 
          to={'/ms232'} 
          style ={{position:'absolute',top:0,left:0,width:20,height:20,boxShadow:'inset 0 0 10px 10px #fff',opacity:0}}
        >
        </Link> 
      </div>
    );
  }
}

export default MSTwoThree;