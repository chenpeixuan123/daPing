import React, { Component } from 'react';
import style from './style.css';
import TitleValue from 'components/common/TitleValue';
import ImgTitleValue from 'components/common/ImgTitleValue';

import TwoVideo from 'components/common/TwoVideo';
import Chart from 'components/common/Chart';
import TitleChart from 'components/common/TitleChart';
import TitleAMChart from 'components/common/TitleAMChart';
import RealtimeMonitor from './RealtimeMonitor';

import DataCreater from './DataCreater';
import BaseMap from 'components/common/BaseMap';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/tooltip';
import moment from 'moment';
import Tools from 'utils/Tools';

class MSWeb extends Component {
  constructor(props) {
    super(props);
    window.share.resetPageSize(3840, 1080);

    this.odsData = {};
    this.tdHisData = {};
    this.tdCurData = {};

    this.caledTDData = {
      "TD_hulianwangjiaoyis": {
        hisMax: 0,
        tenAvg: 0,
        yesterdayData: [],
        yesterdayHourValue: [],
        todayHourValue: []
      },
      "TD_WYtongjis": {
        yesterdayData: [],//{"浙江":{name:"浙江",hisValue:100,curValue:100}}
        todayWYSortArr: []
      }
    };

    this.state = {
      webTradingVolume: 0,//1267891,
      webYesterdayRadio: 0,//3.21,
      maxTradingVolume: 0,//1723349,
      samePeriodTradingVolume: 0,//1049792,
      realtimeMonitorValue: 0,//478,
      realtimeMonitorRadio: 0,//99.8,
      realtimeLineOption: DataCreater.createRealtimeLineOption(
        [],//[210, 230, 270, 300, 325, 325, 335, 325, 325, 300, 270, 230, 210, 230, 250, 270, 300, 290, 300, 230, 250, 270, 300, 290],
        [],//[200, 220, 250, 280, 300, 310, 330, 310, 300, 280, 250, 220, 200],
        250
      ),
      mapOption: DataCreater.createMapOption([{ name: "甘肃", value: 10 }]),
      webBankTradingVolumeRank: DataCreater.createWebBankTradingVolumeRankOption([]),//{ name: "浙江", value: 100 }, { name: "江苏", value: 80 }, { name: "广东", value: 80 }, { name: "山东", value: 60 }, { name: "上海", value: 50 }, { name: "北京", value: 40 }
      webBankTradingWaveRank: DataCreater.createWebBankTradingWaveRankOption([]),//{ name: "浙江", cur: 100, his: 80 }, { name: "江苏", cur: 0, his: 90 }, { name: "广东", cur: 0, his: 0 }, { name: "山东", cur: -60, his: -50 }, { name: "上海", cur: -50, his: -60 }, { name: "北京", cur: -40, his: -30 }

      webBankTradingVolumeRadioOption: DataCreater.createWebBankTradingVolumeRadioOption(),
      webBankTradingVolumeRadioProvider: [{ title: "支付宝", value: 0, pulled: true }, { title: "财付通", value: 0, pulled: true }],
      webBankTradingAmountRadioOption: DataCreater.createWebBankTradingAmountRadioOption(),
      webBankTradingAmountRadioProvider: [ { title: "支付宝", value: 0, pulled: true }, { title: "财付通", value: 0, pulled: true }],
      thirdPartyPayOption: DataCreater.createThirdPartyPayOption(
        [
         
           { time: "2017/07", zfb: 0, cft: 0 }, 
           { time: "2017/08", zfb: 0, cft: 0 }, 
           { time: "2017/09", zfb: 0, cft: 0 },
        ]
      ),
      shortcutPayOption: DataCreater.createShortcutPayOption(
        [
            { time: "2017/07", zfb: 0, cft: 0 }, 
            { time: "2017/08", zfb: 0, cft: 0 }, 
            { time: "2017/09", zfb: 0, cft: 0 }
        ]
      )
    };
  }

  componentDidMount() {
    this.getTDHisDayData();
    // this.getTDHisYearData();
    this.getTDHisTenYearData();
    this.getTDCurData();
    this.flagTD = setInterval(this.getTDCurData, window.locationConfig.TGInterface.interface.td.loopTime);
  }
  componentWillUnmount() {
    clearInterval(this.flagTD);

    this.odsData = null;
    this.tdHisData = null;
    this.tdCurData = null;
    this.caledTDData = null;
  }
  getODSData = () => {
    if (window.locationConfig.debug) {
      let data = [{ "ODSData": [{ "time": "2017-10-19T10:14:00Z", "subname": "资产总额", "name": "I0001", "value": "20230101022101.00" }, { "time": "2017-10-19T10:14:00Z", "subname": "负债总额", "name": "I0002", "value": "165001022101.00" }, { "time": "2017-10-19T10:14:00Z", "subname": "净资产余额", "name": "I0003", "value": "37300000000.00" }, { "time": "2017-10-19T10:14:00Z", "subname": "贷款总额", "name": "I0004", "value": "188701011121.00" }, { "time": "2017-10-19T10:14:00Z", "subname": "存贷比", "name": "I0005", "value": "59.2" }, { "time": "2017-10-19T10:14:00Z", "subname": "对公存款", "name": "I0006", "value": "89900000000" }, { "time": "2017-10-19T10:14:00Z", "subname": "个人存款", "name": "I0007", "value": "76400000000" }, { "time": "2017-10-19T10:14:00Z", "subname": "非银存款", "name": "I0008", "value": "24200000000" }, { "time": "2017-10-19T10:14:00Z", "subname": "同业存款", "name": "I0009", "value": "33200000000" }, { "time": "2017-10-19T10:14:00Z", "subname": "营业网点数", "name": "I0010", "value": "258" }, { "time": "2017-10-19T10:14:00Z", "subname": "全行员工数", "name": "I0011", "value": "50000" }, { "time": "2017-10-19T10:14:00Z", "subname": "对公客户数", "name": "I0012", "value": "20000" }, { "time": "2017-10-19T10:14:00Z", "subname": "对私客户数", "name": "I0013", "value": "460000" }, { "time": "2017-10-19T10:14:00Z", "subname": "同业客户数", "name": "I0014", "value": "32" }, { "time": "2017-10-19T10:14:00Z", "subname": "对公账户数", "name": "I0015", "value": "44560" }, { "time": "2017-10-19T10:14:00Z", "subname": "对私账户数", "name": "I0016", "value": "5054300" }, { "time": "2017-10-19T10:14:00Z", "subname": "借记卡数", "name": "I0017", "value": "5645101" }] }];
      this.updateODSData(data);
    } else {
      Tools.fetchGet(window.locationConfig.TGInterface.interface.ods.address + "?subname=dddd&startTime=dddd&endTime=dddd",
        {
          'Content-Type': 'application/json',
        },
        this.updateODSData);
    }
  }
  getTDHisDayData = () => {
    if (window.locationConfig.debug) {
      let data = [{ "TD_hexinjiaoyiliang": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "59" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT07:50:18") + "Z", "value": "39" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT08:29:09") + "Z", "value": "49" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT09:50:18") + "Z", "value": "60" }], "TD_xinzengkehu": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:18") + "Z", "value": "3" }], "TD_xinzengzhanghu": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:18") + "Z", "value": "1" }], "TD_hulianwangjiaoyis": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "72,40,72" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "180,104,180" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT07:29:09") + "Z", "value": "172,40,72" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT08:30:00") + "Z", "value": "190,104,180" }], "TD_WYmingxi": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }], "TD_jiejika": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "1" }], "TD_jingwaitongji": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "20" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "2" }], "TD_jingwai": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "8330" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "8330" }] }];
      this.updateTDHisDayData(data);
    } else {
      let m = moment().subtract(1, 'days');
      let startTStr = m.format("YYYY-MM-DD 00:00:00");
      let endTStr = m.format("YYYY-MM-DD 23:59:59");
      Tools.fetchGet(window.locationConfig.TGInterface.interface.td.address + "?kpiName=TD_WYtongjis&startTime=" + startTStr + "&endTime=" + endTStr,
        {
          'Content-Type': 'application/json',
        },
        this.updateTDHisDayData);
    }
  }
  // getTDHisYearData = () => {
  //   if (window.locationConfig.debug) {
  //     let data = [{ "TD_ZFBtps": [{ "time": moment("2016-10-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "159" }, { "time": moment("2016-11-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "139" }, { "time": moment("2016-12-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment("2017-01-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "260" }, { "time": moment("2017-02-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "59" }, { "time": moment("2017-03-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "139" }, { "time": moment("2017-04-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment("2017-05-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "160" }, { "time": moment("2017-06-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "59" }, { "time": moment("2017-07-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "239" }, { "time": moment("2017-08-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment("2017-08-16").format("YYYY-MM-DDT06:29:09") + "Z", "value": "129" }, { "time": moment("2017-09-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "60" }], "TD_CFTtps": [{ "time": moment("2016-10-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "59" }, { "time": moment("2016-11-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "39" }, { "time": moment("2016-12-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment("2017-01-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "60" }, { "time": moment("2017-02-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "59" }, { "time": moment("2017-03-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "39" }, { "time": moment("2017-04-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment("2017-05-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "60" }, { "time": moment("2017-06-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "59" }, { "time": moment("2017-07-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "39" }, { "time": moment("2017-08-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment("2017-08-16").format("YYYY-MM-DDT06:29:09") + "Z", "value": "29" }, { "time": moment("2017-09-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "60" }], "TD_ZFBamt": [{ "time": moment("2016-10-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "159" }, { "time": moment("2016-11-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "139" }, { "time": moment("2016-12-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment("2017-01-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "260" }, { "time": moment("2017-02-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "59" }, { "time": moment("2017-03-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "139" }, { "time": moment("2017-04-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment("2017-05-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "160" }, { "time": moment("2017-06-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "59" }, { "time": moment("2017-07-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "239" }, { "time": moment("2017-08-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment("2017-08-16").format("YYYY-MM-DDT06:29:09") + "Z", "value": "129" }, { "time": moment("2017-09-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "60" }], "TD_CFTamt": [{ "time": moment("2016-10-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "59" }, { "time": moment("2016-11-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "39" }, { "time": moment("2016-12-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment("2017-01-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "60" }, { "time": moment("2017-02-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "59" }, { "time": moment("2017-03-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "39" }, { "time": moment("2017-04-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment("2017-05-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "60" }, { "time": moment("2017-06-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "59" }, { "time": moment("2017-07-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "39" }, { "time": moment("2017-08-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment("2017-08-16").format("YYYY-MM-DDT06:29:09") + "Z", "value": "29" }, { "time": moment("2017-09-15").format("YYYY-MM-DDT06:29:09") + "Z", "value": "60" }] }];
  //     this.updateTDHisYearData(data);
  //   } else {
  //     let startTStr = moment().subtract(12, 'months').format("YYYY-MM-01 00:00:00")
  //     let endTStr = moment(moment().format("YYYY-MM-01 00:00:00")).subtract(1, 'seconds').format("YYYY-MM-DD HH:mm:ss");
  //     Tools.fetchGet(window.locationConfig.TGInterface.interface.td.address + "?kpiName=TD_CFTamt,TD_ZFBamt,TD_CFTtps,TD_ZFBtps&startTime=" + startTStr + "&endTime=" + endTStr,
  //       {
  //         'Content-Type': 'application/json',
  //       },
  //       this.updateTDHisYearData);
  //   }
  // }
  getTDHisTenYearData = ()=>{
    if (window.locationConfig.debug) {
     
    } else {
      let startTStr = moment().subtract(5, 'days').format("YYYY-MM-DD 00:00:00")
      let endTStr = moment(moment().format("YYYY-MM-DD 00:00:00")).subtract(1, 'seconds').format("YYYY-MM-DD HH:mm:ss");
      Tools.fetchGet(window.locationConfig.TGInterface.interface.td.address + "?kpiName=TD_hulianwangjiaoyis&startTime=" + startTStr + "&endTime=" + endTStr,
        {
          'Content-Type': 'application/json',
        },
        this.updateTDHisTenYearData);
    }
  }
  getTDCurData = () => {
    if (window.locationConfig.debug) {
      let data = [{ "TD_hexinjiaoyiliang": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment().format("YYYY-MM-DDT07:50:18") + "Z", "value": "69" }], "TD_WYtps": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment().format("YYYY-MM-DDT07:50:18") + "Z", "value": "69" }], "TD_ZFBtps": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment().format("YYYY-MM-DDT07:50:18") + "Z", "value": "69" }], "TD_CFTtps": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment().format("YYYY-MM-DDT07:50:18") + "Z", "value": "69" }], "TD_WYamt": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment().format("YYYY-MM-DDT07:50:18") + "Z", "value": "69" }], "TD_ZFBamt": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment().format("YYYY-MM-DDT07:50:18") + "Z", "value": "69" }], "TD_CFTamt": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment().format("YYYY-MM-DDT07:50:18") + "Z", "value": "69" }], "TD_xinzengkehu": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().format("YYYY-MM-DDT06:30:18") + "Z", "value": "3" }], "TD_xinzengzhanghu": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().format("YYYY-MM-DDT06:30:18") + "Z", "value": "1" }], "TD_hulianwangjiaoyis": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "72,40,72" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "180,104,180" }, { "time": moment().format("YYYY-MM-DDT07:29:09") + "Z", "value": "62,40,72" }], "TD_WYmingxi": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT07:30:00") + "Z", "value": "45.32.141" }], "TD_jiejika": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "1" }], "TD_jingwaitongji": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "20" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "2" }], "TD_jingwai": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "8330" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "8330" }] }];
      this.updateTDCurData(data);
    } else {
      let m = moment();
      let startTStr = m.format("YYYY-MM-DD 00:00:00");
      let endTStr = m.format("YYYY-MM-DD HH:mm:ss");

      // Tools.fetchGet(window.locationConfig.TGInterface.interface.td.address + "?kpiName=TD_hulianwangjiaoyis,TD_WYmingxi,TD_CFTamt,TD_WYamt,TD_ZFBamt,TD_CFTtps,TD_WYtps,TD_ZFBtps&startTime=" + startTStr + "&endTime=" + endTStr,
      Tools.fetchGet(window.locationConfig.TGInterface.interface.td.address + "?kpiName=TD_hulianwangjiaoyis,TD_WYtongjis,TD_CFTamt,TD_ZFBamt,TD_CFTtps,TD_ZFBtps&startTime=" + startTStr + "&endTime=" + endTStr,      
        {
          'Content-Type': 'application/json',
        },
        this.updateTDCurData);
    }
  }
  updateODSData = (data) => {
    let odsD = data[0].ODSData;
    this._doODSData(odsD);
  }
  updateTDHisDayData = (data) => {
    let tdD = data[0];
    this._doTDData(tdD, this.tdHisData);
    if(this.tdHisData["TD_WYtongjis"]==null){
      this.tdHisData["TD_WYtongjis"]=[];
    }

    //=============================网银明细（地区）
    this.caledTDData["TD_WYtongjis"].yesterdayData = Tools.ipAndRegion(this.tdHisData["TD_WYtongjis"]);
  }
  // updateTDHisYearData = (data) => {
  //   let tdD = data[0];
  //   this._doTDData(tdD, this.tdHisData);
  //   if(this.tdHisData["TD_WYtongjis"]==null){
  //     this.tdHisData["TD_WYtongjis"]=[];
  //   }

  //   let tpsHisYear = Tools.doTPSOrAMTHisForTD(this.tdHisData["TD_ZFBtps"], this.tdHisData["TD_CFTtps"], (r)=>{
  //     if (moment().format("YYYY") == "2017") {
  //       r["2017/01"] = { time: "2017/01", cft: 753573, zfb: 704523 };
  //       r["2017/02"] = { time: "2017/02", cft: 611130, zfb: 696876 };
  //       r["2017/03"] = { time: "2017/03", cft: 890037, zfb: 1005627 };
  //       r["2017/04"] = { time: "2017/04", cft: 968907, zfb: 1017437 };
  //       r["2017/05"] = { time: "2017/05", cft: 1208982, zfb: 1127134 };
  //       r["2017/06"] = { time: "2017/06", cft: 1306917, zfb: 1123446 };
  //       r["2017/07"] = { time: "2017/07", cft: 1407588, zfb: 967772 };
  //       r["2017/08"] = { time: "2017/08", cft: 1622916, zfb: 978823 };
  //       r["2017/09"] = { time: "2017/09", cft: 2029293, zfb: 1263520 };
  //       r["2017/10"] = { time: "2017/10", cft: 1754306, zfb: 1038756 };
  //     }
  //   });
  //   let amtHisYear = Tools.doTPSOrAMTHisForTD(this.tdHisData["TD_ZFBamt"], this.tdHisData["TD_CFTamt"], (r)=>{
  //     if (moment().format("YYYY") == "2017") {
  //       r["2017/01"] = { time: "2017/01", cft:507888233.67,zfb:569944273.91};
  //       r["2017/02"] = { time: "2017/02", cft:620054475.07,zfb:540129000.67};
  //       r["2017/03"] = { time: "2017/03", cft:684060206.41,zfb:594884801.97};
  //       r["2017/04"] = { time: "2017/04", cft:760668490.9,zfb:584744249.07};
  //       r["2017/05"] = { time: "2017/05", cft:592833778.07,zfb:708084086.91};
  //       r["2017/06"] = { time: "2017/06", cft:571605313.78,zfb:713686681.44};
  //       r["2017/07"] = { time: "2017/07", cft:635862967.9,zfb:747790047.61};
  //       r["2017/08"] = { time: "2017/08", cft:878399178.96,zfb:870978554.14};
  //       r["2017/09"] = { time: "2017/09", cft:1239893890.97,zfb:907128273.88};
  //       r["2017/10"] = { time: "2017/10", cft:732865475.01,zfb:717618464.52};        
  //     }
  //   });

  //   let thirdPartyPayOption = DataCreater.createThirdPartyPayOption(tpsHisYear);
  //   let shortcutPayOption = DataCreater.createShortcutPayOption(amtHisYear);

  //   this.setState({
  //     thirdPartyPayOption,
  //     shortcutPayOption
  //   });
  // }
  updateTDHisTenYearData = (data)=>{
    let tdD = data[0];
    this._doTDData(tdD, this.tdHisData);
    if(this.tdHisData["TD_WYtongjis"]==null){
      this.tdHisData["TD_WYtongjis"]=[];
    }

    //==========================互联网数据
    //互联网交易量
    let { hisMax, tenAvg, yesterdayData } = Tools.doHisDataForTD(this.tdHisData["TD_hulianwangjiaoyis"]);

    this.caledTDData["TD_hulianwangjiaoyis"].hisMax = hisMax;
    this.caledTDData["TD_hulianwangjiaoyis"].tenAvg = tenAvg;
    this.caledTDData["TD_hulianwangjiaoyis"].yesterdayData = yesterdayData;
    this.caledTDData["TD_hulianwangjiaoyis"].yesterdayHourValue = Tools.dataForHours(yesterdayData);


    //线图
    let realtimeLineOption = DataCreater.createRealtimeLineOption(
      this.caledTDData["TD_hulianwangjiaoyis"].yesterdayHourValue,
      this.caledTDData["TD_hulianwangjiaoyis"].todayHourValue,
      250
    );

    this.setState({
      maxTradingVolume:this.caledTDData["TD_hulianwangjiaoyis"].hisMax,// 1583862,//this.caledTDData["TD_hulianwangjiaoyis"].hisMax,
      samePeriodTradingVolume: this.caledTDData["TD_hulianwangjiaoyis"].tenAvg,
      realtimeLineOption
    });

  }
  updateTDCurData = (data) => {
    let tdD = data[0];
    this._doTDData(tdD, this.tdCurData);
    if(this.tdCurData["TD_WYtongjis"]==null){
      this.tdCurData["TD_WYtongjis"]=[];
    }
    let { curAll } = Tools.doCurDataForTD(this.tdCurData["TD_hulianwangjiaoyis"]);

    //昨日同比
    let len = this.tdCurData["TD_hulianwangjiaoyis"].length;
    let curObj = this.tdCurData["TD_hulianwangjiaoyis"][len - 1];
    let curT = curObj.time;
    let yesterdayCurTAll = Tools.historyAllBeforeTimeForTD(this.caledTDData["TD_hulianwangjiaoyis"].yesterdayData, curT);
    let radio = 0;
    if (yesterdayCurTAll != 0) {
      radio = (curAll - yesterdayCurTAll) / yesterdayCurTAll * 100;
      if (radio % 1 != 0) {
        radio = Number(radio.toFixed(2));
      }
    }
    //实时监控
    let curObjArr = curObj.value.split(",");
    let realtimeMonitorValue = Number(curObjArr[0]);    
    let realtimeMonitorV = Number(curObjArr[2]);
    let realtimeMonitorRadio = 100;
    if (realtimeMonitorV != 0) {
      realtimeMonitorRadio = (Number(curObjArr[1]) / realtimeMonitorV) * 100;
      if (realtimeMonitorRadio % 1 != 0) {
        realtimeMonitorRadio = Number(realtimeMonitorRadio.toFixed(2));
      }
    }
    //线图
    this.caledTDData["TD_hulianwangjiaoyis"].todayHourValue = Tools.dataForHours(this.tdCurData["TD_hulianwangjiaoyis"]);    
    // let h = moment().hours();
    this.caledTDData["TD_hulianwangjiaoyis"].todayHourValue.splice(this.caledTDData["TD_hulianwangjiaoyis"].todayHourValue.length-1,1);

    let realtimeLineOption = DataCreater.createRealtimeLineOption(
      this.caledTDData["TD_hulianwangjiaoyis"].yesterdayHourValue,
      this.caledTDData["TD_hulianwangjiaoyis"].todayHourValue,
      250
    );

    this.setState({
      webTradingVolume: curAll,
      webYesterdayRadio: radio,
      realtimeMonitorValue,
      realtimeMonitorRadio,
      realtimeLineOption
    });

    //====================网银明细
    let todayWYAll = Tools.ipAndRegion(this.tdCurData["TD_WYtongjis"]);
    let todayWYSortArr = Tools.todayWYData(todayWYAll);
    this.caledTDData["TD_WYtongjis"].todayWYSortArr = todayWYSortArr;

    let mapOption = DataCreater.createMapOption(this.caledTDData["TD_WYtongjis"].todayWYSortArr);
    let webBankTradingVolumeRank = DataCreater.createWebBankTradingVolumeRankOption(this.caledTDData["TD_WYtongjis"].todayWYSortArr.slice(0, 6));

    let t = this.tdCurData["TD_WYtongjis"][this.tdCurData["TD_WYtongjis"].length - 1];
    if (t) {
      t = t.time;
    } else {
      t = moment();
    }
    let todayYesterdayWYData = Tools.todYesWYData(this.caledTDData["TD_WYtongjis"].yesterdayData,
      this.caledTDData["TD_WYtongjis"].todayWYSortArr,
      t
    );
    let webBankTradingWaveRank = DataCreater.createWebBankTradingWaveRankOption(todayYesterdayWYData);

    this.setState({
      mapOption,
      webBankTradingVolumeRank,
      webBankTradingWaveRank
    });

    //====================各占比

    // let { curAll: curWYtpsAll } = Tools.doCurDataForTD(this.tdCurData["TD_WYtps"]);
    let { curAll: curZFBtpsAll } = Tools.doCurDataForTD(this.tdCurData["TD_ZFBtps"]);
    let { curAll: curCFTtpsAll } = Tools.doCurDataForTD(this.tdCurData["TD_CFTtps"]);

    // let { curAll: curWYamtAll } = Tools.doCurDataForTD(this.tdCurData["TD_WYamt"]);
    let { curAll: curZFBamtAll } = Tools.doCurDataForTD(this.tdCurData["TD_ZFBamt"]);
    let { curAll: curCFTamtAll } = Tools.doCurDataForTD(this.tdCurData["TD_CFTamt"]);

    let webBankTradingVolumeRadioProvider = [
      // { title: "网银", value: curWYtpsAll, pulled: true },
      { title: "支付宝", value: curZFBtpsAll, pulled: true },
      { title: "财付通", value: curCFTtpsAll, pulled: true }];

    let webBankTradingAmountRadioProvider = [
      // { title: "网银", value: curWYamtAll, pulled: true },
      { title: "支付宝", value: curZFBamtAll, pulled: true },
      { title: "财付通", value: curCFTamtAll, pulled: true }];

    this.setState({
      webBankTradingVolumeRadioProvider,
      webBankTradingAmountRadioProvider,
    });
  }

  _doODSData(arr) {
    for (let i = 0; i < arr.length; i++) {
      let o = arr[i];
      o.subname = o.subname.replace("`", "");
      if (this.odsData[o.subname]) {
        this.odsData[o.subname].push(o);
      } else {
        this.odsData[o.subname] = [o];
      }
    }
  }
  _doTDData(data, obj) {
    for (let key in data) {
      obj[key] = data[key];
    }
  }



  render() {

    let webYesterdayRadioStyle = { color: '#ff000' };
    let arrowSrc = window.dominContext.staticPath + '/assets/images/mscard/redArrow.png';
    if (this.state.webYesterdayRadio < 0) {
      webYesterdayRadioStyle = { color: '#00ff00' };
      arrowSrc = window.dominContext.staticPath + '/assets/images/mscard/greenArrow.png';
    }
    return (
      <div className={style.root} >
      <TwoVideo className={style.bgvideo} leftVideoUrl={window.dominContext.staticPath + '/assets/videos/common/left02.mp4'}
          rightVideoUrl={window.dominContext.staticPath + '/assets/videos/common/right02.mp4'} />
        <img className={style.logo} src={window.dominContext.staticPath + '/assets/images/common/logo.png'} />
        {/* <img className={style.webBankTradingVolumeRankBg} src={window.dominContext.staticPath + '/assets/images/common/itemBg.png'} />
        <img className={style.webBankTradingWaveRankBg} src={window.dominContext.staticPath + '/assets/images/common/itemBg.png'} /> */}
        <TitleValue className={style.webTradingVolume} title={"当日互联网渠道交易量"} value={this.state.webTradingVolume} />
        <ImgTitleValue className={style.webYesterdayRadio} valueStyle={webYesterdayRadioStyle} title={"昨日同比"} value={Math.abs(this.state.webYesterdayRadio) + "%"} imgSrc={arrowSrc} />
        <TitleValue className={style.maxTradingVolume} title={"历史峰值日交易量"} value={this.state.maxTradingVolume} />
        <TitleValue className={style.samePeriodTradingVolume} title={"10日业务量（均值）"} value={this.state.samePeriodTradingVolume} />
        <RealtimeMonitor className={style.realtimeMonitor} value={this.state.realtimeMonitorValue} radio={this.state.realtimeMonitorRadio} />
        <Chart className={style.realtimeLine} option={this.state.realtimeLineOption} />
        <BaseMap className={style.map} option={this.state.mapOption} mapName={"china"} />
        <TitleChart className={style.webBankTradingVolumeRank} titleClassName={style.webBankTradingVolumeRank_title} chartClassName={style.webBankTradingVolumeRank_chart} title={"网络金融业务访问量排名"} option={this.state.webBankTradingVolumeRank} />
        {/* <TitleChart className={style.webBankTradingWaveRank} titleClassName={style.webBankTradingWaveRank_title} chartClassName={style.webBankTradingWaveRank_chart} title={"网络金融业务访问量波动排名"} option={this.state.webBankTradingWaveRank} /> */}
        <TitleAMChart className={style.webBankTradingVolumeRadio} titleClassName={style.webBankTradingVolumeRadio_title} chartClassName={style.webBankTradingVolumeRadio_chart} title={"当日交易量占比"} option={this.state.webBankTradingVolumeRadioOption} dataProvider={this.state.webBankTradingVolumeRadioProvider} />
        <TitleAMChart className={style.webBankTradingAmountRadio} titleClassName={style.webBankTradingAmountRadio_title} chartClassName={style.webBankTradingAmountRadio_chart} title={"当日交易金额占比"} option={this.state.webBankTradingAmountRadioOption} dataProvider={this.state.webBankTradingAmountRadioProvider} />
        <TitleChart className={style.thirdPartyPay} titleClassName={style.thirdPartyPay_title} chartClassName={style.thirdPartyPay_chart} title={"近12个月交易量对比"} option={this.state.thirdPartyPayOption} />
        <TitleChart className={style.shortcutPay} titleClassName={style.shortcutPay_title} chartClassName={style.shortcutPay_chart} title={"近12个月交易金额对比"} option={this.state.shortcutPayOption} />
      </div>);
  }
}

export default MSWeb;