import React, { Component } from 'react'
import style from './style.css';
import DataCreater from './DataCreater';
import BaseMap from 'components/common/BaseMap';
import TitleValueCountUp from 'components/common/TitleValueCountUp';
import ImgTitleValue from 'components/common/ImgTitleValue';
import TitleChart from 'components/common/TitleChart';
import AMBaseChart from 'components/common/AMBaseChart';
import moment from 'moment';
import Tools from 'utils/Tools';
export default class GSWeb extends Component {
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
    this.mapHis=[];
    this.mapNow=[];
    this.state = {
      mapIndex:0,
      webTradingVolume:0,//1267891,
      webYesterdayRadio:0,//3.21,
      realtimeMonitorValue:0,//478,
      realtimeMonitorRadio:0,//99.8,
      //
      maxTradingVolume:0,//1723349,
      samePeriodTradingVolume:0,//1049792,
      realtimeLineOption:DataCreater.trendLine(
        // [
        //   [310,321,333,350,376,395,400,420,450,470,500,480,460,490,503,495,478],
        //   [325,331,358,355,386,410,410,430,480,550,490,450,460,510,503,505,478,410,351,333,350,376,395,400]
        // ]
        [[],[]]
      ),
      //
      mapOption:DataCreater.mapOption(
        [
          // { name: "甘肃", value: 0 },
          // { name: "上海", value: 8888 },
    
    
        ]
      ),
      webBankTradingVolumeRank:DataCreater.oneBarOption(
        [
          // {name:'甘肃',value:68.74},
   
        ]
      ),
      webBankTradingWaveRank:DataCreater.doubleBarOption(
        [
          // {name:'甘肃',cur:123,his:120},
     
        ]
      ),
      // //交易量占比
      webBankTradingVolumeRadioProvider:[
          {
            pulled : true,
            title : "支付宝",
            value : 0
          },
          {
            pulled : true,
            title : "财付通",
            value : 0
          },
      ],
      //交易金额占比
      webBankTradingAmountRadioProvider:[
        {
          pulled : true,
          title : "支付宝",
          value : 0
        },
        {
          pulled : true,
          title : "财付通",
          value : 0
        }
      ],
      thirdPartyPayOption: DataCreater.jylBarOption(
       [],[],[]
      ),
      shortcutPayOption: DataCreater.jyjeBarOption(
        [],[],[]
      )
    }
  }
  componentDidMount() {
    //map 昨日 今日
    this.mapHisData();
    //zfb cft 今日
    this.curCFTZFB();
    //zfb cft 12月
    this.get12MonthData();
    //交易量5日   //今日互联网交易量
    this.getTDHisTenYearData();
  
    this.flagTDCFTZFB = setInterval(this.curCFTZFB, window.locationConfig.TGInterface.interface.td.loopTime);
    this.flagMap = setInterval(this.getMapDayData, window.locationConfig.TGInterface.interface.td.loopTime);
    this.flagTD = setInterval(this.getTDCurData, window.locationConfig.TGInterface.interface.td.loopTime);
    //顺序展示部分地图数据
    this.mapTimer=setInterval(this.startMap, 2000);
  }
  startMap=()=>{
      let maxLen=this.mapNow.length;
      let addIndex=this.state.mapIndex+1;
      if(addIndex<=maxLen){
        this.setState(
            {
               mapOption:DataCreater.mapOption(this.mapNow.slice(0,addIndex)),
               mapIndex:addIndex
            }
        )
      }else{
        this.setState(
          {
             mapIndex:0
          }
      )
      }
  }
  componentWillUnmount(){
    this.mapTimer&&clearInterval(this.mapTimer);
    this.mapTimer=null;
    this.flagTD&&clearInterval(this.flagTD);
    this.flagTD=null;
    this.flagTDCFTZFB&&clearInterval(this.flagTDCFTZFB);
    this.flagTDCFTZFB=null;
    this.flagMap&&clearInterval(this.flagMap);
    this.flagMap=null;
    this.tdHisData = null;
    this.tdCurData = null;
    this.caledTDData = null;
    this.mapHis=null;
    this.mapNow=null;
  }
  mapHisData=()=>{
    if (window.locationConfig.debug) {
    } else {
      let time = moment().subtract(1,'days').format("YYYY-MM-DD");
      Tools.fetchGet(window.locationConfig.TGTest.msweb.address9 +`{"time":"${time}"}`,//{"time":"2017-05-17"}
        {
          'Content-Type': 'application/json',
        },
        this.storeMapHis);
    }
  }
  storeMapHis=(data)=>{
    let arr=data.datas;
    let len=arr.length;
    let ipArr=[];
    for(let i =0;i<len;i++){
      ipArr.push(
        {
          name:arr[i].name,
          time:arr[i].data[0].time,
          value:arr[i].data[0].sum
        }
      )
    }
    this.mapHis=Tools.ipAndRegion2(ipArr);
    // console.log(ipArr);
    //map 今日
    this.getMapDayData();
  }
  curCFTZFB = () => {
    if (window.locationConfig.debug) {
    } else {
      let time = moment().format("YYYY-MM-DD");
      // Tools.fetchGet(window.locationConfig.TGInterface.interface.td.address + "?kpiName=TD_hulianwangjiaoyis,TD_WYmingxi,TD_CFTamt,TD_WYamt,TD_ZFBamt,TD_CFTtps,TD_WYtps,TD_ZFBtps&startTime=" + startTStr + "&endTime=" + endTStr,
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
      // { title: "网银", value: curWYamtAll, pulled: true },
      { title: "支付宝", value: obj4['TD_ZFBamt'], pulled: true },
      { title: "财付通", value: obj4['TD_CFTamt'], pulled: true }];

    this.setState({
      webBankTradingVolumeRadioProvider,
      webBankTradingAmountRadioProvider
    });
  }
  //map 当日0网银明细（地区）
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
    let mapNowData =Tools.ipAndRegion2(ipArr);
    let sortArr=mapNowData.sort((a,b)=>b.value-a.value);
    for(let i=0;i<sortArr.length;i++){
      for(let j=0;j<this.mapHis.length;j++){
          if(sortArr[i].name===this.mapHis[j].name){
            sortArr[i]['valueHis']=this.mapHis[j].value;
          }
      }
    }
    //===map冒泡
    this.mapTimer&&clearInterval(this.mapTimer);
    this.setState({mapIndex:0});
    this.mapNow=[...sortArr];
    // console.log(this.mapNow);
    this.mapTimer=setInterval(this.startMap, 2000);
    //===柱形图
    let arrSix=sortArr.slice(0,6);
    this.setState(
      {
        webBankTradingVolumeRank: DataCreater.oneBarOption(arrSix),
        // webBankTradingWaveRank:DataCreater.doubleBarOption(arrSix.slice(0,4))
      }
    );
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
    // console.log(TD_CFTamt);
    let yes_ZFBtps=[1123446,967772,978823,1263520,1038756,1538756,1738756,2048524,2248524,2604111].concat(TD_ZFBtps);
    let yes_CFTtps=[1306917,1407588,1622916,2029293,1754306,1854306,2000000,2458386,2658386,2897686].concat(TD_CFTtps);
    let yes_ZFBamt=[713686681.44,747790047.61,870978554.14,907128273.88,717618464.52,870978554,957790047,1880730430,1580730430.2013319,1580343262.9212387].concat(TD_ZFBamt);
    let yes_CFTamt=[571605313.78,635862967.9,878399178.96,1239893890.97,732865475.01,1032865475,935862967,1253463729,923463729.9402552,778358803.7403281].concat(TD_CFTamt);
    // let yes_ZFBtps=[1123446,967772,978823,1263520,1038756,1538756,1738756,2048524,2248524,2504111,2130078,2230078];
    // let yes_CFTtps=[1306917,1407508,1622916,2029293,1754306,1854306,2000000,2458386,2658386,2797686,2939542,3039542];
    // let yes_ZFBamt=[713686681.44,747790047.61,870978554.14,907128273.88,717618464.52,870978554,957790047,1880730430,1380730430.2013319,1580343262.9212387,1569478021.7108924,1669478021.2999999959];
    // let yes_CFTamt=[571605313.78,635862967.9,878399178.96,1239893890.97,732865475.01,1032865475,935862967,1253463729,923463729.9402552,778358803.7403281,990868795.9399769,1290868795.0499996];
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
        thirdPartyPayOption: DataCreater.jylBarOption(timeArr2,ZFBtps,CFTtps),
        shortcutPayOption: DataCreater.jyjeBarOption(timeArr2,ZFBamt,CFTamt)
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
    // console.log(data);
    let tdD = data[0];
    this._doTDData(tdD, this.tdHisData);
    //==========================互联网数据
    //互联网交易量
    let { hisMax, tenAvg, yesterdayData } = Tools.doHisDataForTD(this.tdHisData["TD_hulianwangjiaoyis"]);
    this.caledTDData["TD_hulianwangjiaoyis"].hisMax = hisMax;
    this.caledTDData["TD_hulianwangjiaoyis"].tenAvg = tenAvg;
    // for(let i=0;i<yesterdayData.length;i++){
    //   let t=moment(yesterdayData[i].time).format("YYYY-MM-DD HH:mm:ss");
    //   console.log(t)
    // }
    this.caledTDData["TD_hulianwangjiaoyis"].yesterdayData = yesterdayData;
    this.caledTDData["TD_hulianwangjiaoyis"].yesterdayHourValue = Tools.dataForHours(yesterdayData);
    // console.log(yesterdayData);
    // console.log(this.caledTDData["TD_hulianwangjiaoyis"].yesterdayHourValue);
    //线图
    let realtimeLineOption = DataCreater.trendLine(
      [
        this.caledTDData["TD_hulianwangjiaoyis"].todayHourValue,
        this.caledTDData["TD_hulianwangjiaoyis"].yesterdayHourValue
      ]
    );
    this.setState({
      maxTradingVolume:this.caledTDData["TD_hulianwangjiaoyis"].hisMax,// 1583862,//this.caledTDData["TD_hulianwangjiaoyis"].hisMax,
      samePeriodTradingVolume: this.caledTDData["TD_hulianwangjiaoyis"].tenAvg,
      realtimeLineOption
    });
    //今日互联网交易量
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
    let yesterdayCurTAll = Tools.historyAllBeforeTimeForTD(this.caledTDData["TD_hulianwangjiaoyis"].yesterdayData, curT);
    let radio = 0;
    if (yesterdayCurTAll != 0) {
      radio = (curAll - yesterdayCurTAll) / yesterdayCurTAll * 100;
      if (radio % 1 != 0) {
        radio = Number(radio.toFixed(2));
      }
    }else{
      radio=100;
    }
    //实时监控
    // console.log(curObj);
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
    //线图
    let realtimeLineOption = DataCreater.trendLine(
      [
        this.caledTDData["TD_hulianwangjiaoyis"].todayHourValue,
        this.caledTDData["TD_hulianwangjiaoyis"].yesterdayHourValue
      ]
    );
    this.setState({
      webTradingVolume: curAll,
      webYesterdayRadio: radio,
      realtimeMonitorValue,
      realtimeMonitorRadio,
      realtimeLineOption
    });
  }
  render() {
    let fontColor = { color: '#ff000' };
    let arrowSrc = window.dominContext.staticPath + '/assets/images/gsweb/redArrow.png';
    if (this.state.webYesterdayRadio < 0) {
      fontColor = { color: '#00ff00' };
      arrowSrc = window.dominContext.staticPath + '/assets/images/gsweb/greenArrow.png';
    }
    return (
      <div className={style.gsweb}>
            <div className={style.bgvideo}>
              <video loop muted autoPlay src={window.dominContext.staticPath + '/assets/videos/common/left02.mp4'}> Your browser does not support the video tag</video>
              <video loop muted autoPlay src={window.dominContext.staticPath + '/assets/videos/common/right02.mp4'}> Your browser does not support the video tag</video>
            </div>
            <div className={style.logo}></div>
            <TitleValueCountUp
              style={{position:'absolute',top:140,left:40}}
              titleStyle={{fontSize: 24}}
              valueClassName={style.value1}
              title={`当日互联网渠道交易量`}
              value={this.state.webTradingVolume}
              decimals={0}
            />
            <ImgTitleValue 
              title={"昨日同比"}
              className={style.todayPercent}
              imgClassName={this.state.webYesterdayRadio>=0?style.arrowUp:style.arrowDown}
              valueStyle={fontColor}
              imgSrc={arrowSrc} 
              value={Math.abs(this.state.webYesterdayRadio) + `%`}
            />
            <TitleValueCountUp
              style={{position:'absolute',top:290,left:40}}
              titleStyle={{fontSize: 24,fontFamily:'微软雅黑',color:"#6fc4f5"}}
              valueClassName={style.value2}
              title={`历史峰值日交易量`}
              value={this.state.maxTradingVolume}
              decimals={0}
            />
            <img style={{position:'absolute',top:280,left:390}} src={window.dominContext.staticPath + '/assets/images/gsweb/cutline.png'} />
            <TitleValueCountUp
              style={{position:'absolute',top:290,left:450}}
              titleStyle={{fontSize: 24,fontFamily:'微软雅黑',color:"#6fc4f5"}}
              valueClassName={style.value2}
              title={`10日同期业务量（均值）`}
              value={this.state.samePeriodTradingVolume}
              decimals={0}
            />
            <TitleValueCountUp
              style={{position:'absolute',top:420,left:40}}
              titleStyle={{fontSize: 24,float:"left",paddingTop:25}}
              valueClassName={style.value2}
              valueStyle={{disply:'block',float:"right"}}
              title={`当前交易量：`}
              value={this.state.realtimeMonitorValue}
              decimals={0}
              suffix={`<i style="font-size:18px;font-family:AdobeHeitiStd Regular">笔 / 分钟</i>`}
            />
            <TitleValueCountUp
              style={{position:'absolute',top:484,left:40}}
              titleStyle={{fontSize: 24,float:"left",paddingTop:25}}
              valueClassName={style.value2}
              valueStyle={{disply:'block',float:"right"}}
              title={`交易成功率：`}
              value={this.state.realtimeMonitorRadio}
              decimals={2}
              suffix={`<i>%</i>`}
            />
            <TitleChart 
              style={{position:"absolute",top:610,left:40,width:900,height:400}}
              titleStyle={{position:'absolute',top:0,left:0,fontSize:24}}
              chartStyle={{position:'absolute',left:0,bottom:0,width:900,height:350}}
              title={`交易量实时变化趋势`}
              option={this.state.realtimeLineOption}
            />
            <BaseMap 
              className={style.ChinaMap}
              option={this.state.mapOption}
              mapName={"china"}
            />
            <TitleChart
              className={style.onebar}
              titleStyle={{width:'100%',fontSize:30,fontFamily:'Adobe Regular'}}
              chartStyle={{width:"100%",height:550}}
              title={`网络金融业务访问量排名`}
              option={this.state.webBankTradingVolumeRank}
            />
            <p  style={{position:"absolute",left:2900,top:110,fontSize:24,fontFamily:"AdobeHeitiStd Regular"}}>当日交易量占比</p>
            <AMBaseChart
                style={{position:"absolute",left:2900,top:147,width:470,height:300}}
                option={DataCreater.pie3D()} 
                dataProvider={this.state.webBankTradingVolumeRadioProvider}
            />
            <p  style={{position:"absolute",left:3370,top:110,fontSize:24,fontFamily:"AdobeHeitiStd Regular"}}>当日交易金额占比</p>
            <AMBaseChart
                style={{position:"absolute",left:3370,top:147,width:470,height:300}}
                option={DataCreater.pie3D()} 
                dataProvider={this.state.webBankTradingAmountRadioProvider}
            />
            <TitleChart 
              style={{position:"absolute",left:2900,top:430,width:900,height:280}}
              titleStyle={{width:'100%',fontSize:24,fontFamily:'Adobe Regular'}}
              chartStyle={{width:"100%",height:280}}
              title={`近12个月交易量对比`}
              option={this.state.thirdPartyPayOption}
            />
            <TitleChart 
              style={{position:"absolute",left:2900,top:750,width:900,height:250}}
              titleStyle={{width:'100%',fontSize:24,fontFamily:'Adobe Regular'}}
              chartStyle={{width:"100%",height:250}}
              title={"近12个月交易金额对比"} 
              option={this.state.shortcutPayOption} 
            />
      </div>
    )
  }
}