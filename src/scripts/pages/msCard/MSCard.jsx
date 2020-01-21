import React, { Component } from 'react';
import style from './style.css';
import TitleValue from 'components/common/TitleValue';
import ImgTitleValue from 'components/common/ImgTitleValue';

import TwoVideo from 'components/common/TwoVideo';
import TitleChart from 'components/common/TitleChart';
import TitleAMChart from 'components/common/TitleAMChart';
import PBar from './PBar';
import DataCreater from './DataCreater';
import BaseMap from 'components/common/BaseMap';
import 'echarts/lib/chart/lines';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/graphic';
import moment from 'moment';
import Tools from 'utils/Tools';
import CodeToName from '../../utils/CodeToName';

class MSCard extends Component {
  constructor(props) {
    super(props);
    window.share.resetPageSize(3840, 1080);


    this.odsData = {};
    this.ods12Data = {};
    this.tdHisData = {};
    this.tdCurData = {};

    this.caledTDData = {
      "TD_jiejika": {
        hisMax: 0,
        tenAvg: 0,
        yesterdayData: [],
        todayHourValue: []
      }
    };


    this.state = {
      cardTradingVolume: 0,//1267891,
      cardYesterdayRadio: 0,
      realtimeLineOption: DataCreater.createRealtimeLineOption([]),
      overseasTradingVolume: 0,//567360,
      overseasCountriesCount: 0,
      barR: 0.5,
      countriesTop10Option: DataCreater.createCountriesTop10Option([]),
      mapOption: DataCreater.createMapOption([]),
      cardAccountNumber: 0,
      cardYesterdayAdd: 0,
      cardYearAdd: 0,
      addAccountOption: DataCreater.createAddAccountOption([]),
      cardConsumePlaceOption: DataCreater.createCardConsumePlaceOption(),
      cardConsumePlaceDataProvider: [{ title: "酒店", value: 10, pulled: true }, { title: "超市", value: 20, pulled: true }, { title: "餐厅", value: 30, pulled: true }, { title: "其他", value: 30, pulled: true }],
      cardConsumePlaceStructureOption: DataCreater.createCardConsumePlaceStructureOption(),
      cardConsumePlaceStructureDataProvider: [{ title: "餐饮", value: 10, pulled: true }, { title: "住宿", value: 20, pulled: true }, { title: "衣食", value: 30, pulled: true }, { title: "其他", value: 30, pulled: true }]
    };
  }


  componentDidMount() {
    this.getODSData();
    //新增卡曲线图
    this.getODS12Month();
    this.getTDHisData();
    this.getTDCurData();
    this.flagTD = setInterval(this.getTDCurData, window.locationConfig.TGInterface.interface.td.loopTime);
  }

  componentWillUnmount() {
    clearInterval(this.flagTD);

    this.odsData = null;
    this.ods12Data = null;
    this.tdHisData = null;
    this.tdCurData = null;
    this.caledTDData = null;
  }

  getODSData = () => {
    if (window.locationConfig.debug) {
      let data = [{ "ODSData": [{ "time": "2016-12-31T10:14:00Z", "subname": "发卡量", "name": "I0017", "value": "5544201" }, { "time": "2017-01-19T10:14:00Z", "subname": "发卡量", "name": "I0017", "value": "5555001" }, { "time": "2017-02-19T10:14:00Z", "subname": "发卡量", "name": "I0017", "value": "5565101" }, { "time": "2017-03-19T10:14:00Z", "subname": "发卡量", "name": "I0017", "value": "5571101" }, { "time": "2017-04-19T10:14:00Z", "subname": "发卡量", "name": "I0017", "value": "5582101" }, { "time": "2017-05-19T10:14:00Z", "subname": "发卡量", "name": "I0017", "value": "5593101" }, { "time": "2017-06-19T10:14:00Z", "subname": "发卡量", "name": "I0017", "value": "5605101" }, { "time": "2017-07-19T10:14:00Z", "subname": "发卡量", "name": "I0017", "value": "5615101" }, { "time": "2017-08-19T10:14:00Z", "subname": "发卡量", "name": "I0017", "value": "5623101" }, { "time": "2017-09-19T10:14:00Z", "subname": "发卡量", "name": "I0017", "value": "5635101" }, { "time": moment().subtract(2, 'days').format("YYYY-MM-DDT10:14:00") + "Z", "subname": "发卡量", "name": "I0017", "value": "5645101" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT10:14:00") + "Z", "subname": "发卡量", "name": "I0017", "value": "5645201" }] }];
      this.updateODSData(data);
    } else {
      let mOldDay = moment();//moment().subtract(1, 'days');
      let mOldYear = moment().subtract(1, 'years');

      let startTStr = mOldYear.format("YYYY-12-31 00:00:00");
      let endTStr = mOldDay.format("YYYY-MM-DD 23:59:59");
      Tools.fetchGet(window.locationConfig.TGInterface.interface.ods.address + "?subname=发卡量&startTime=" + startTStr + "&endTime=" + endTStr,
        {
          'Content-Type': 'application/json',
        },
        this.updateODSData);
      }
  }
  //新增卡曲线图
  getODS12Month=()=>{
    if (window.locationConfig.debug) {
    } else {
      let startTStr = moment().subtract(12, 'months').format("YYYY-MM-01 00:00:00");
      let endTStr = moment().format("YYYY-MM-01 23:59:59");
      Tools.fetchGet(window.locationConfig.TGInterface.interface.ods.address + "?subname=发卡量&startTime=" + startTStr + "&endTime=" + endTStr,
      {
        'Content-Type': 'application/json',
      },
      this.updateODS12Month);
    }
  }
  getTDHisData = () => {
    if (window.locationConfig.debug) {
      let data = [{ "TD_hexinjiaoyiliang": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "59" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT07:50:18") + "Z", "value": "39" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT08:29:09") + "Z", "value": "49" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT09:50:18") + "Z", "value": "60" }], "TD_xinzengkehu": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:18") + "Z", "value": "3" }], "TD_xinzengzhanghu": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:18") + "Z", "value": "1" }], "TD_hulianwangjiaoyis": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "72,40,72" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "180,104,180" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT07:29:09") + "Z", "value": "172,40,72" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT08:30:00") + "Z", "value": "190,104,180" }], "TD_WYmingxi": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }], "TD_jiejika": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "1" }], "TD_jingwaitongji": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "20" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "2" }], "TD_jingwai": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "8330" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "8330" }] }];
      this.updateTDHisData(data);
    } else {
      let m = moment().subtract(1, 'days');
      let startTStr = m.format("YYYY-MM-DD 00:00:00");
      let endTStr = m.format("YYYY-MM-DD 23:59:59");
      Tools.fetchGet(window.locationConfig.TGInterface.interface.td.address + "?kpiName=TD_jiejika&startTime=" + startTStr + "&endTime=" + endTStr,
        {
          'Content-Type': 'application/json',
        },
        this.updateTDHisData);
    }
  }
  getTDCurData = () => {
    if (window.locationConfig.debug) {
      let data = [{ "TD_hexinjiaoyiliang": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment().format("YYYY-MM-DDT07:50:18") + "Z", "value": "69" }], "TD_xinzengkehu": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().format("YYYY-MM-DDT06:30:18") + "Z", "value": "3" }], "TD_xinzengzhanghu": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().format("YYYY-MM-DDT06:30:18") + "Z", "value": "1" }], "TD_hulianwangjiaoyis": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "72,40,72" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "180,104,180" }, { "time": moment().format("YYYY-MM-DDT07:29:09") + "Z", "value": "62,40,72" }], "TD_WYmingxi": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT07:30:00") + "Z", "value": "45.32.141" }], "TD_jiejika": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "1" }, { "time": moment().format("YYYY-MM-DDT07:29:09") + "Z", "value": "2" }, { "time": moment().format("YYYY-MM-DDT07:30:00") + "Z", "value": "1" }, { "time": moment().format("YYYY-MM-DDT08:29:09") + "Z", "value": "2" }, { "time": moment().format("YYYY-MM-DDT08:30:00") + "Z", "value": "1" }, { "time": moment().format("YYYY-MM-DDT09:29:09") + "Z", "value": "2" }, { "time": moment().format("YYYY-MM-DDT09:30:00") + "Z", "value": "1" }], "TD_jingwaitongji": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "20" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "2" }], "TD_jingwai": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "0702" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "0702" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "0764" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "0704" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "0276" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "0887" }] }];
      this.updateTDCurData(data);
    } else {
      let m = moment();
      let startTStr = m.format("YYYY-MM-DD 00:00:00");
      let endTStr = m.format("YYYY-MM-DD HH:mm:ss");

      Tools.fetchGet(window.locationConfig.TGInterface.interface.td.address + "?kpiName=TD_jiejika,TD_jingwai,TD_quxianxiaofei,TD_shanghu&startTime=" + startTStr + "&endTime=" + endTStr,
        {
          'Content-Type': 'application/json',
        },
        this.updateTDCurData);
    }
  }



  updateODSData = (data) => {
    let odsD = data[0].ODSData;
    this._doODSData(odsD);
    let { yesterdayV, yesBefDayV, lastYearV} = Tools.doDataForODS(this.odsData["发卡量"]);
    if (moment().format("YYYY") == "2017") {
      lastYearV = 4481425;    
    }

    let cardYesterdayAdd = 0;
    if (yesBefDayV != 0) {
      cardYesterdayAdd = yesterdayV - yesBefDayV;
    }
    this.setState({
      cardAccountNumber: yesterdayV,
      cardYesterdayAdd:cardYesterdayAdd,
      cardYearAdd: yesterdayV - lastYearV,
    });
  }
  updateODS12Month=(data)=>{
    let odsD = data[0].ODSData;
    this._doODS12Data(odsD);
     //曲线图
     let obj12={};
     if (this.ods12Data["发卡量"] && this.ods12Data["发卡量"].length > 0) {
       for(let i=0;i<this.ods12Data["发卡量"].length;i++){
         let t = moment(this.ods12Data["发卡量"][i].time).subtract(1, 'days').format("YYYY/MM");
         if(!obj12[t]){obj12[t] = {time:t,"发卡量":0}}
         obj12[t]["发卡量"] = this.ods12Data["发卡量"][i].value*1;
       }
     }
     
     //====添加没有的数据
    //  obj12["2016/05"] = {time:"2016/05","发卡量":3781425};    
    //  obj12["2016/06"] = {time:"2016/06","发卡量":3881425};    
    //  obj12["2016/07"] = {time:"2016/07","发卡量":3981425};    
    //  obj12["2016/08"] = {time:"2016/08","发卡量":4081425};    
    //  obj12["2016/09"] = {time:"2016/09","发卡量":4181425};    
    //  obj12["2016/10"] = {time:"2016/10","发卡量":4281425};    
    //  obj12["2016/11"] = {time:"2016/11","发卡量":4381425};      

      obj12["2016/12"] = {time:"2016/12","发卡量":4481425};    
      obj12["2017/01"] = {time:"2017/01","发卡量":4547440};    
      obj12["2017/02"] = {time:"2017/02","发卡量":4613607};    
      obj12["2017/03"] = {time:"2017/03","发卡量":4817882};    
      obj12["2017/04"] = {time:"2017/04","发卡量":4905611};    
      obj12["2017/05"] = {time:"2017/05","发卡量":5203619};    
      obj12["2017/06"] = {time:"2017/06","发卡量":5270978};        
      obj12["2017/07"] = {time:"2017/07","发卡量":5428788};        
      obj12["2017/08"] = {time:"2017/08","发卡量":5517708};        
      obj12["2017/09"] = {time:"2017/09","发卡量":5616544};        
      obj12["2017/10"] = {time:"2017/10","发卡量":5677408};
      
     //==== end 添加没有的数据 
     let allMonth = [];
     let objToArr = [];
     for(let key in obj12){
      objToArr.push(obj12[key]);//[ {time:"2017/06","发卡量":5270978},{}]
     }
     objToArr.sort((a,b)=>{return a.time>b.time?1:-1});
     for (let i=1;i< objToArr.length;i++) {
        let time=objToArr[i].time;
        let v1 = objToArr[i]["发卡量"];
        let v2 = objToArr[i-1]["发卡量"];
        if (isNaN(v1)) v1 = 0;
        if (isNaN(v2)) v2 = 0;
        let val=v1-v2;
        allMonth.push({time:time,val:val});
     }
     let t=allMonth.slice(-12,allMonth.length);
 
     let tArr = t.map((o)=>o.time);
     let vArr = t.map((o)=>o.val);
     this.setState({
        addAccountOption:DataCreater.createAddAccountOption(tArr,vArr)
     });
  }
  updateTDHisData = (data) => {
    let tdD = data[0];
    this._doTDData(tdD, this.tdHisData);

    let { hisMax, tenAvg, yesterdayData } = Tools.doHisDataForTD(this.tdHisData["TD_jiejika"]);

    this.caledTDData["TD_jiejika"].hisMax = hisMax;
    this.caledTDData["TD_jiejika"].tenAvg = tenAvg;
    this.caledTDData["TD_jiejika"].yesterdayData = yesterdayData;

  }
  updateTDCurData = (data) => {
    let tdD = data[0];
    this._doTDData(tdD, this.tdCurData);

    //借记卡交易量
    let { curAll: cardTradingVolume } = Tools.doCurDataForTD(this.tdCurData["TD_jiejika"]);
    //昨日同比
    let len = this.tdCurData["TD_jiejika"].length;
    let curObj = this.tdCurData["TD_jiejika"][len - 1];
    let curT = moment().format("YYYY-MM-DD HH:mm:ss")
    if (curObj) {
      curT = curObj.time;
    }

    let yesterdayCurTAll = Tools.historyAllBeforeTimeForTD(this.caledTDData["TD_jiejika"].yesterdayData, curT);
    let radio = 0;
    if (yesterdayCurTAll != 0) {
      radio = (cardTradingVolume - yesterdayCurTAll) / yesterdayCurTAll * 100;
      if (radio % 1 != 0) {
        radio = Number(radio.toFixed(2));
      }
    }
    //线图
    this.caledTDData["TD_jiejika"].todayHourValue = Tools.dataForHours(this.tdCurData["TD_jiejika"]);
    this.caledTDData["TD_jiejika"].todayHourValue.splice(this.caledTDData["TD_jiejika"].todayHourValue.length - 1, 1);
    let realtimeLineOption = DataCreater.createRealtimeLineOption(this.caledTDData["TD_jiejika"].todayHourValue);

    //境外交易量
    let countryCodeAndRegion = Tools.codeAndRegion(this.tdCurData["TD_jingwai"]);
    //console.log(countryCodeAndRegion);
    
    //{time: Moment, code: "0276", name: "德国 or 0276"} //去掉CodeRegion 中 0001 0039
    // console.log(countryCodeAndRegion);
    // 去掉name为地区代码
    let new_countryCodeAndRegion=[];
    countryCodeAndRegion.forEach(
      (obj) => {
        isNaN(obj.name)?new_countryCodeAndRegion.push(obj):'';
      }
    );
    let overseasTradingVolume = new_countryCodeAndRegion.length;
    //境内外占比
    let barR = 0;
    let allCard = cardTradingVolume + overseasTradingVolume;
    if (allCard != 0) {
      barR = cardTradingVolume / allCard;
    }
    let todayJingWaiSortArr = Tools.todayJingWaiData(new_countryCodeAndRegion);//从大到小
    //发生交易的国家和地区数目
    let overseasCountriesCount = todayJingWaiSortArr.length;
    //top10
    let countriesTop10Option = DataCreater.createCountriesTop10Option(todayJingWaiSortArr.slice(0, 10));
    //地图
    //let mapOption = DataCreater.createMapOption(todayJingWaiSortArr);
    let mapOption = DataCreater.createMapOption(todayJingWaiSortArr);
    this.setState({
      cardTradingVolume,
      cardYesterdayRadio: radio,
      realtimeLineOption,
      overseasTradingVolume,
      overseasCountriesCount,
      barR,
      countriesTop10Option,
      mapOption
    });
    //商户类型
    let lenTemp = this.tdCurData["TD_shanghu"].length;
    let oTemp = {};
    for (let i = 0; i < lenTemp; i++) {
      let n = "";
      if (this.tdCurData["TD_shanghu"][i]) {
        n = this.tdCurData["TD_shanghu"][i].address;
        if (isNaN(Number(n[0]))) {
          continue;
        }
      } else {
        console.log("商户为空");
      }

      if (oTemp[n] != null) {
        oTemp[n] += Number(this.tdCurData["TD_shanghu"][i].value);
      } else {
        oTemp[n] = Number(this.tdCurData["TD_shanghu"][i].value);
      }
    }
    let r = [];
    for (let key in oTemp) {
      r.push({ title: key, value: oTemp[key], pulled: true });
    }
    r.sort((a, b) => b.value - a.value);
    r.splice(5);
    r = r.map((o) => {
      let n = CodeToName[o.title];
      if (n == null) {
        n = "其他";
        console.warn("无对应商铺类型:"+o.title);
      } else {
        n = n.split("").slice(0, 4).join("")
      };
      return { title: n, value: o.value }
    });
    this.setState({
      cardConsumePlaceDataProvider: r
    })

    //取现消费
    oTemp = { "取现": 0, "消费": 0 };
    lenTemp = this.tdCurData["TD_quxianxiaofei"].length;
    for (let i = 0; i < lenTemp; i++) {
      if (this.tdCurData["TD_quxianxiaofei"][i].address == "取现") {
        oTemp["取现"] += Number(this.tdCurData["TD_quxianxiaofei"][i].value);
      } else if (this.tdCurData["TD_quxianxiaofei"][i].address == "消费") {
        oTemp["消费"] += Number(this.tdCurData["TD_quxianxiaofei"][i].value);
      }
    }
    this.setState({
      cardConsumePlaceStructureDataProvider: [{ title: "取现", value: oTemp["取现"], pulled: true }, { title: "消费", value: oTemp["消费"], pulled: true }]
    });

  }

  _doODSData(arr) {
    for (let i = 0; i < arr.length; i++) {
      let o = arr[i];
      if (this.odsData[o.subname]) {
        this.odsData[o.subname].push(o);
      } else {
        this.odsData[o.subname] = [o];
      }
    }
  }
  _doODS12Data(arr) {
    for (let i = 0; i < arr.length; i++) {
      let o = arr[i];
      if (this.ods12Data[o.subname]) {
        this.ods12Data[o.subname].push(o);
      } else {
        this.ods12Data[o.subname] = [o];
      }
    }
  }
  _doTDData(data, obj) {
    for (let key in data) {
      obj[key] = data[key];
    }
  }



  render() {
    let cardYesterdayRadioStyle = { color: '#ff000' };
    let arrowSrc = window.dominContext.staticPath + '/assets/images/mscard/redArrow.png';
    if (this.state.cardYesterdayRadio < 0) {
      cardYesterdayRadioStyle = { color: '#00ff00' };
      arrowSrc = window.dominContext.staticPath + '/assets/images/mscard/greenArrow.png';
    }

    return (
      <div className={style.root} >
        <TwoVideo className={style.bgvideo} leftVideoUrl={window.dominContext.staticPath + '/assets/videos/common/left02.mp4'}
          rightVideoUrl={window.dominContext.staticPath + '/assets/videos/common/right02.mp4'} />
        <img className={style.logo} src={window.dominContext.staticPath + '/assets/images/common/logo.png'} />
        <TitleValue className={style.cardTradingVolume} title={"神舟兴陇卡交易量"} autoAnimate={true} numberFormat={true} value={this.state.cardTradingVolume} />
        <ImgTitleValue className={style.cardYesterdayRadio} imgClassName={style.arrow} valueStyle={cardYesterdayRadioStyle} title={"昨日同比"} value={Math.abs(this.state.cardYesterdayRadio) + "%"} imgSrc={arrowSrc} />
        <TitleChart className={style.realtimeLine} titleClassName={style.realtimeLine_title} chartClassName={style.realtimeLine_chart} title={"实时交易曲线"} option={this.state.realtimeLineOption} />
        <TitleValue className={style.overseasTradingVolume} title={"境外交易量"} value={this.state.overseasTradingVolume} />
        <TitleValue className={style.overseasCountriesCount} title={"发生交易的国家和地区"} value={this.state.overseasCountriesCount} />
        {/* <PBar className={style.pbar} curR={this.state.barR} /> */}
        <TitleChart className={style.countriesTop10} titleClassName={style.countriesTop10_title} chartClassName={style.countriesTop10_chart} title={"交易量最多的国家和地区TOP10"} option={this.state.countriesTop10Option} />
        <BaseMap className={style.map} option={this.state.mapOption} mapName={"world"} />
        <TitleValue className={style.cardAccountNumber} title={"神舟兴陇卡数"} autoAnimate={true} numberFormat={true} value={this.state.cardAccountNumber} />
        <TitleValue className={style.cardYesterdayAdd} title={"昨日新增"} value={this.state.cardYesterdayAdd} />
        <TitleValue className={style.cardYearAdd} title={"本年新增"} value={this.state.cardYearAdd} />
        <TitleChart className={style.addAccount} titleClassName={style.addAccount_title} chartClassName={style.addAccount_chart} title={"新增卡情况"} option={this.state.addAccountOption} />
        <TitleAMChart className={style.cardConsumePlace} titleClassName={style.cardConsumePlace_title} chartClassName={style.cardConsumePlace_chart} title={"神舟兴陇卡消费渠道"} option={this.state.cardConsumePlaceOption} dataProvider={this.state.cardConsumePlaceDataProvider} />
        <TitleAMChart className={style.cardConsumePlaceStructure} titleClassName={style.cardConsumePlaceStructure_title} chartClassName={style.cardConsumePlaceStructure_chart} title={"神舟兴陇卡交易构成"} option={this.state.cardConsumePlaceStructureOption} dataProvider={this.state.cardConsumePlaceStructureDataProvider} />
      </div>);
  }
}

export default MSCard;