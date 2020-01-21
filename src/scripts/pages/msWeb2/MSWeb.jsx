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
    this.tdHisData = {};
    this.tdCurData = {};
    this.caledTDData = {
      "TD_hulianwangjiaoyis": {
        hisMax: 0,
        tenAvg: 0,
        yesterdayData: [],
        yesterdayHourValue: [],
        todayHourValue: []
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
        [],
        [],
        250
      ),
      mapOption: DataCreater.createMapOption([{ name: "甘肃", value: 10 }]),
      webBankTradingVolumeRank: DataCreater.createWebBankTradingVolumeRankOption([]),//{ name: "浙江", value: 100 }, { name: "江苏", value: 80 }, { name: "广东", value: 80 }, { name: "山东", value: 60 }, { name: "上海", value: 50 }, { name: "北京", value: 40 }
      webBankTradingWaveRank: DataCreater.createWebBankTradingWaveRankOption([]),//{ name: "浙江", cur: 100, his: 80 }, { name: "江苏", cur: 0, his: 90 }, { name: "广东", cur: 0, his: 0 }, { name: "山东", cur: -60, his: -50 }, { name: "上海", cur: -50, his: -60 }, { name: "北京", cur: -40, his: -30 }

      webBankTradingVolumeRadioOption: DataCreater.createWebBankTradingVolumeRadioOption(),
      webBankTradingVolumeRadioProvider: [{ title: "支付宝", value: 50, pulled: true }, { title: "财付通", value: 50, pulled: true }],
      webBankTradingAmountRadioOption: DataCreater.createWebBankTradingAmountRadioOption(),
      webBankTradingAmountRadioProvider: [ { title: "支付宝", value: 50, pulled: true }, { title: "财付通", value: 50, pulled: true }],
      thirdPartyPayOption: DataCreater.createThirdPartyPayOption(
        [],[],[]
      ),
      shortcutPayOption: DataCreater.createShortcutPayOption(
        [],[],[]
      )
    };
  }

  componentDidMount() {
    //map 今日00之后
    this.getMapDayData();
    //zfb cft 今日
    this.curCFTZFB();
    //zfb cft 12月
    this.get12MonthData();
  
    //交易量10日
    this.getTDHisTenYearData();
    // //今日互联网交易量
    // this.getTDCurData();
    this.flagTDCFTZFB = setInterval(this.curCFTZFB, window.locationConfig.TGInterface.interface.td.loopTime);
    this.flagMap = setInterval(this.getMapDayData, window.locationConfig.TGInterface.interface.td.loopTime);
    this.flagTD = setInterval(this.getTDCurData, window.locationConfig.TGInterface.interface.td.loopTime);
  }
  componentWillUnmount() {
    this.flagTD&&clearInterval(this.flagTD);
    this.flagTD=null;
    this.flagTDCFTZFB&&clearInterval(this.flagTDCFTZFB);
    this.flagTDCFTZFB=null;
    this.flagMap&&clearInterval(this.flagMap);
    this.flagMap=null;
    this.tdHisData = null;
    this.tdCurData = null;
    this.caledTDData = null;
  }
  //十日数据
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
  updateTDHisTenYearData = (data)=>{
    let tdD = data[0];
    this._doTDData(tdD, this.tdHisData);
    //==========================互联网数据
    //互联网交易量
    let { hisMax, tenAvg, yesterdayData } = Tools.doHisDataForTD(this.tdHisData["TD_hulianwangjiaoyis"]);

    this.caledTDData["TD_hulianwangjiaoyis"].hisMax = hisMax;
    this.caledTDData["TD_hulianwangjiaoyis"].tenAvg = tenAvg;
    // console.log(yesterdayData);
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
    //取今日互联网交易量
    this.getTDCurData();
  }
  //今日互联网交易
  getTDCurData = () => {
      if (window.locationConfig.debug) {
        let data = [{ "TD_hexinjiaoyiliang": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment().format("YYYY-MM-DDT07:50:18") + "Z", "value": "69" }], "TD_WYtps": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment().format("YYYY-MM-DDT07:50:18") + "Z", "value": "69" }], "TD_ZFBtps": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment().format("YYYY-MM-DDT07:50:18") + "Z", "value": "69" }], "TD_CFTtps": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment().format("YYYY-MM-DDT07:50:18") + "Z", "value": "69" }], "TD_WYamt": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment().format("YYYY-MM-DDT07:50:18") + "Z", "value": "69" }], "TD_ZFBamt": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment().format("YYYY-MM-DDT07:50:18") + "Z", "value": "69" }], "TD_CFTamt": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment().format("YYYY-MM-DDT07:50:18") + "Z", "value": "69" }], "TD_xinzengkehu": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().format("YYYY-MM-DDT06:30:18") + "Z", "value": "3" }], "TD_xinzengzhanghu": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().format("YYYY-MM-DDT06:30:18") + "Z", "value": "1" }], "TD_hulianwangjiaoyis": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "72,40,72" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "180,104,180" }, { "time": moment().format("YYYY-MM-DDT07:29:09") + "Z", "value": "62,40,72" }], "TD_WYmingxi": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT07:30:00") + "Z", "value": "45.32.141" }], "TD_jiejika": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "1" }], "TD_jingwaitongji": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "20" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "2" }], "TD_jingwai": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "8330" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "8330" }] }];
        this.updateTDCurData(data);
      } else {
        let m = moment();
        let startTStr = m.format("YYYY-MM-DD 00:00:00");
        let endTStr = m.format("YYYY-MM-DD HH:mm:ss");
        //TD_hulianwangjiaoyis,TD_WYmingxi,TD_CFTamt,TD_WYamt,TD_ZFBamt,TD_CFTtps,TD_WYtps,TD_ZFBtps&startTime=" + startTStr + "&endTime=" + endTStr,
        Tools.fetchGet(window.locationConfig.TGInterface.interface.td.address + "?kpiName=TD_hulianwangjiaoyis&startTime=" + startTStr + "&endTime=" + endTStr,
          {
            'Content-Type': 'application/json',
          },
          this.updateTDCurData);
      }
  }
  updateTDCurData = (data) => {
    let tdD = data[0];
    this._doTDData(tdD, this.tdCurData);
    let { curAll } = Tools.doCurDataForTD(this.tdCurData["TD_hulianwangjiaoyis"]);
    //昨日同比
    let len = this.tdCurData["TD_hulianwangjiaoyis"].length;
    let curObj = this.tdCurData["TD_hulianwangjiaoyis"][len - 1];
    let curT = curObj.time;
    // console.log(this.caledTDData["TD_hulianwangjiaoyis"].yesterdayData);
    let yesterdayCurTAll = Tools.historyAllBeforeTimeForTD(this.caledTDData["TD_hulianwangjiaoyis"].yesterdayData, curT);
    let radio = 0;
    // console.log(yesterdayCurTAll);
    // console.log(curAll);

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

  }
  //zfb cft 今日
  curCFTZFB = () => {
    if (window.locationConfig.debug) {
    } else {
      let m = moment();
      let time = m.format("YYYY-MM-DD");
      // Tools.fetchGet(window.locationConfig.TGInterface.interface.td.address + "?kpiName=TD_CFTamt,,TD_ZFBamt,TD_CFTtps,TD_ZFBtps&startTime=" + startTStr + "&endTime=" + endTStr,
      Tools.fetchGet(window.locationConfig.TGTest.msweb.address10 +`{"time":"${time}"}`,
        {
          'Content-Type': 'application/json',
        },
        this.upDataCurCFTZFB);
    }
  }
  upDataCurCFTZFB=(d)=>{
    // console.log("财付通支付宝日数据");
    let arr4=d.datas;
    // console.log(d.datas);
    let obj4={};
    arr4.forEach(
      (obj,index)=>{
        obj4[obj.name]=obj.data[0].sum;
      }
    )
    // console.log(obj4);
   
    let webBankTradingVolumeRadioProvider = [
      { title: "支付宝", value: obj4['TD_ZFBtps'], pulled: true },
      { title: "财付通", value: obj4['TD_CFTtps'], pulled: true }];

    let webBankTradingAmountRadioProvider = [
      { title: "支付宝", value: obj4['TD_ZFBamt'], pulled: true },
      { title: "财付通", value: obj4['TD_CFTamt'], pulled: true }];

    this.setState({
      webBankTradingVolumeRadioProvider,
      webBankTradingAmountRadioProvider,
    });
  }
  
  //map 当日网银明细（地区）
  getMapDayData = () => {
    if (window.locationConfig.debug) {
    } else {
      let time =moment().format("YYYY-MM-DD");
      Tools.fetchGet(window.locationConfig.TGTest.msweb.address9 +`{"time":"${time}"}`,//{"time":"2017-05-17"}
        {
          'Content-Type': 'application/json',
        },
        this.UpMapDayData);
    }
  }
  UpMapDayData=(data)=>{
    let arr=data.datas;
    let ipArr=[];
    for(let i =0;i<arr.length;i++){
        ipArr.push(
          {
            name:arr[i].name,
            time:arr[i].data[0].time,
            value:arr[i].data[0].sum
          }
        )
    }
    // console.log(ipArr);
    let mapYesterdayData =Tools.ipAndRegion2(ipArr);
    let sortArr=mapYesterdayData.sort((a,b)=>b.value-a.value);
    // console.log(sortArr);
    this.setState(
      {
        mapOption:DataCreater.createMapOption(sortArr),
        webBankTradingVolumeRank: DataCreater.createWebBankTradingVolumeRankOption(sortArr.slice(0,6)),
      }
    )
  }
   //zfb cft 12
  get12MonthData=()=>{
    if (window.locationConfig.debug) {
    } else {
      let m = moment();
      let endTStr = m.format("YYYY-MM-DD");
      let startTStr = m.subtract(12, 'months').format("YYYY-MM-DD");
      Tools.fetchGet(window.locationConfig.TGTest.msweb.address6 +`{"startTime":"${startTStr}","endTime":"${endTStr}"}`,//{"startTime":"2017-05-17","endTime":"2018-05-17"}
        {
          'Content-Type': 'application/json',
        },
        this.update12MonthData);
    }
  }
  update12MonthData=(data)=>{
    // console.log("支付宝财付通12个月数据");
    let MonthData=data.datas;
    let obj4=new Object();
    // console.log(MonthData);//[{name:'',data:[{}]},{name:'',data:[{}]}]
    MonthData.map(
      (o,index)=>{
        obj4[o.name]=o.data;
      }
    )
    // console.log(obj4);
    let timeArr=[];
    obj4['TD_CFTamt'].map(
      (o)=>{
        timeArr.push(moment(o.time).format("YYYY/MM"));
      }
    )
    let TD_CFTamt=this.returnArr(obj4['TD_CFTamt']);
    let TD_ZFBamt=this.returnArr(obj4['TD_ZFBamt']);
    let TD_CFTtps=this.returnArr(obj4['TD_CFTtps']);
    let TD_ZFBtps=this.returnArr(obj4['TD_ZFBtps']);
    let yes_ZFBtps=[1123446,967772,978823,1263520,1038756,1538756,1738756,2048524,2248524,2604111].concat(TD_ZFBtps);
    let yes_CFTtps=[1208982,1306917,1407588,1622916,2029293,1754306,1854306,2000000,2458386,2658386,2897686].concat(TD_CFTtps);
    let yes_ZFBamt=[713686681.44,747790047.61,870978554.14,907128273.88,717618464.52,870978554,957790047,1880730430,1580730430.2013319,1580343262.9212387].concat(TD_ZFBamt);
    let yes_CFTamt=[571605313.78,635862967.9,878399178.96,1239893890.97,732865475.01,1032865475,935862967,1253463729,923463729.9402552,778358803.7403281].concat(TD_CFTamt);
    let CFTtps=yes_CFTtps.splice(yes_CFTtps.length-12);
    let ZFBtps=yes_ZFBtps.splice(yes_ZFBtps.length-12);
    let CFTamt=yes_CFTamt.splice(yes_CFTamt.length-12);
    let ZFBamt=yes_ZFBamt.splice(yes_ZFBamt.length-12);
    let timeArr2=timeArr.splice(timeArr.length-12);
    timeArr2.forEach(
      (v,i)=>{
        if(v==="2018/06"){
          ZFBtps[i]=2130078,
          CFTtps[i]=2939542,
          CFTamt[i]=990868795.9399769,
          ZFBamt[i]=1569478021.7108924
        }
        if(v==="2018/07"){
          ZFBtps[i]=2230078,
          CFTtps[i]=3039542,
          CFTamt[i]=1290868795.0499996,
          ZFBamt[i]=1669478021.2999999959
        }
      }
    )
    this.setState(
      {
        thirdPartyPayOption: DataCreater.createThirdPartyPayOption(timeArr2,ZFBtps,CFTtps),
        shortcutPayOption: DataCreater.createShortcutPayOption(timeArr2,ZFBamt,CFTamt)
      }
    )
  }
  returnArr=(dataArr)=>{
    let nullArr=[];
    dataArr.map(
      (o)=>{
        if(!isNaN(o.sum)){
          nullArr.push(o.sum)
        }
      }
    )
    return nullArr;
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