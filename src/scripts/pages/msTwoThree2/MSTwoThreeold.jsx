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

class MSTwoThreeold extends Component {
  constructor(props) {
    super(props);
    window.share.resetPageSize(1920, 1080);
    this.bandwidthData = {};
    this.tdCurData = {};
    this.caledTDData = {};
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
      ringOption: DataCreater.createRingOption([{ name: "生产中心", value: 0 }, { name: "同城灾备", value: 0 }]),
      systemNotice: [{ name: "名字1", value: 0 }, { name: "名字2", value: 0 }],
      gardenAData: { rv1: 0, rv2: 0, rv3: 0 },
      gardenBData: { rv1: 0, rv2: 0, rv3: 0 },
      num1:0,
      num2:0
    };
  }

  componentDidMount() {
    this.getBandwidthData();
    // this.getTDCurData();
    this.getZTData();
    this.getTDThreeData();
    this.flagBW = setInterval(this.getBandwidthData, window.locationConfig.TGInterface.interface.bandwidth.loopTime);
    // 生产灾备
    this.updateTDCurData();
    // this.flagTD = setInterval(this.getTDCurData,window.locationConfig.TGTest.ms23.loopTime);
    this.flagTD = setInterval(this.updateTDCurData,window.locationConfig.TGTest.ms23.loopTime);
    // this.flagTD = setInterval(this.updateTDCurData,1500);
    this.flagZT = setInterval(this.getZTData, window.locationConfig.ZTInterface.interface.linkLogin.loopTime);
    this.flagTDThree = setInterval(this.getTDThreeData, window.locationConfig.TGInterface.interface.td23.loopTime);
    this.flagLoop = setInterval(this.nextIndex, window.locationConfig.indexArrLoopTime);
    // this.flagLoop = setInterval(this.nextIndex, 1500);
  }
  componentWillUnmount() {
    clearInterval(this.flagBW);this.flagBW=null;
    clearInterval(this.flagTD);this.flagTD=null;
    clearInterval(this.flagZT);this.flagZT=null; 
    clearInterval(this.flagTDThree);this.flagTDThree=null;
    clearInterval(this.flagLoop);this.flagLoop=null;
    this.bandwidthData = null;
    this.tdCurData =null;
    this.zhuIndex=null;
    this.beiIndex=null;
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
  // 生产灾备
  getTDCurData = () => {
    if (window.locationConfig.debug) {
    } else {
      let nowTime = moment().format("YYYY-MM-DD");
      //http://10.7.161.22:8880/cloud-monitor/data/load?dcId=2000&filter={"time":"2018-05-18"}
      Tools.fetchGet(window.locationConfig.TGTest.ms23.address+`{"time":"${nowTime}"}`,
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
  // 生产灾备
  // updateTDCurData=()=>{

  // }
  updateTDCurData = (data) => {
    let self=this;
    // let allData=data.datas;
    // for(let i=0;i<allData.length;i++){
    //   let name=allData[i].name;
    //   let arr=allData[i].data;
    //   self.tdCurData[name]=arr;
    // }
    // // console.log(self.tdCurData);
    // for (let i = 0; i < self.zhuIndex.length; i++) {
    //   if (self.tdCurData[self.zhuIndex[i]] == null) {
    //     self.tdCurData[self.zhuIndex[i]] = [];
    //   }
    // }
    // for (let i = 0; i < self.beiIndex.length; i++) {
    //   if (self.tdCurData[self.beiIndex[i]] == null) {
    //     self.tdCurData[self.beiIndex[i]] = [];
    //   }
    // }
    // self._calTDData(self.tdCurData, self.caledTDData);

    let o = self.calDataByIndexIndex(self.state.index);
    self.setState({
      // busV1: self.caledTDData["TD_hexin"].jiaoyiliang,
      // busV2: self.caledTDData["TD_hexin_ZB"].jiaoyiliang,
      busV1:parseInt(1210515+Math.random()*(1000-0+1)+1000),
      busV2:parseInt(485236+Math.random()*(1000-0+1)+500),
      ...o
    });
  }
  //处理格式
  _calTDData(obj, caledObj) {
    // console.log(obj) {TD_:[]}
    for (let key in obj) {
      let arr = obj[key];
      // console.log(arr.length)
      if(arr.length>0){
        let o=arr[0];
        caledObj[key] = {
          jiaoyiliang: o.sum_jiaoyi,
          xiangyinglv: ((o.sum_jiaoyi != 0 ? o.sum_jiaoyitwo/ o.sum_jiaoyi : 0) * 100).toFixed(2),
          chenggognlv: ((o.sum_jiaoyitwo != 0 ? o.sum_jiaoyithree / o.sum_jiaoyitwo : 0) * 100).toFixed(2),
          xiangyingshijian: Math.floor((o.sum_jiaoyitwo != 0 ? o.sum_value / o.sum_jiaoyitwo : 0) * 100) / 100,
        }
      }else{//处理[]
        caledObj[key] = {
          jiaoyiliang: 0,
          xiangyinglv: 0,
          chenggognlv:0,
          xiangyingshijian:0
        }
      }
    }
    // console.log(this.caledTDData);
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
     tbsl,tbys,sjl
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
    // let sckpi = this.indexArr[index].shengchanKPI;
    // let zbkpi = this.indexArr[index].zaibeiKPI;

    let ringOption = DataCreater.createRingOption([{ name: "生产中心", value: Math.random()*(51-50+1)+50}, { name: "同城灾备", value: 100-Math.random()*(51-50+1)-50 }]);
    let systemNotice = [{ name: "生产中心", value:parseInt(Math.random()*(685624-500000+1))+500000 }, { name: "同城灾备", value:parseInt(Math.random()*(585624-400000+1))+400000 }]
    let gardenAData = { rv1: (Math.random()*(97-96+1)+96).toFixed(2), rv2: (Math.random()*(99-98+1)+98).toFixed(2), rv3: Math.random().toFixed(2)};
    let gardenBData = { rv1: (Math.random()*(97-96+1)+96).toFixed(2), rv2:(Math.random()*(99-98+1)+98).toFixed(2), rv3: Math.random().toFixed(2) };

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
          to={'/ms23'} 
          style ={{position:'absolute',top:0,left:0,width:20,height:20,background:'#fff',opacity:.1}}
        >
        </Link> 
      </div>);
  }
}

export default MSTwoThreeold;