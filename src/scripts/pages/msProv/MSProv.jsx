import React, { Component } from 'react';
import style from './style.css';
import LeftTop from './Left-Top';
import LeftDown from './Left-Down';
import Right from './Right';
import Middle from './Middle';
import Tools from 'utils/Tools';
import moment from 'moment';
import R from 'ramda';
import TwoVideo from 'components/common/TwoVideo';

let tdUrl = window.locationConfig.TGInterface.interface.td.address;
let odsUrl = window.locationConfig.TGInterface.interface.ods.address;
let loopTime = window.locationConfig.TGInterface.interface.td.loopTime;
class MSProv extends Component {
  constructor(props) {
    super(props);
    window.share.resetPageSize(3840, 1080);


    this.odsDataLastYear = {};
    this.odsData12Month = {};
    this.odsData6Month = {};
    this.odsData = {};
    this.tdHisData = {};
    this.tdCurData = {};


    this.caledTDData = {
      "TD_hexinjiaoyiliang": {
        hisMax: 0,
        tenAvg: 0,
        yesterdayData: [],
        todayHourValue: []
      },
      "TD_hexin":{
        todayHourValue: []
      },
      "TD_hexin_ZB":{
        todayHourValue: []
      },
      ODSLastYear: {
        "对公客户数": 0,
        "对私客户数": 0,
        "同业客户数": 0,
        "对公账户数": 0,
        "对私账户数": 0,
      },
      ODSNow: {
        "对公客户数": 0,
        "对私客户数": 0,
        "同业客户数": 0,
        "对公账户数": 0,
        "对私账户数": 0,
      }
    };

    this.state = {
      // 左上角
      property: {
        total: '-',
        debt: '-',
        assets: '-',
        line: {
          time:[],
          debt: [],
          total: []
        }
      },
      // 左下角
      deposit: {
        mouth: '-',
        total: '-',
        ratio: '-',
        pie: [
          { title: "栏目A", value: 10, pulled: true },
          { title: "栏目B", value: 20, pulled: true },
          { title: "栏目C", value: 30, pulled: true },
        ]
      },
      // 中间
      map: {
        branch: '-',
        employee: '-',
        today: '-',
        climax: '-',
        tenAvg: '-',
        dualRatio: '-',
        line: [[], []],
        renjuncunkuan: '-',
        renjundaikuan: '-',
        renjunlirun: '-'
      },
      // 右边
      customer: {
        customer: {
          total: '-',
          today: '-',
          annual: '-',
          completed: '-',
        },
        account: {
          total: '-',
          today: '-',
          annual: '-',
          completed: '-',
        },
        line: {
          time:[],
          custom: [],
          account: []
        }
      }
    };
  }

  componentDidMount() {

    this.getODSDataLastYear();
    //负债 资产总额
    this.getODSData12Month();    
    this.getODSData6Month();
    this.getODSData1Day();
    this.getTDDataLast10Day();
    this.getTDCurData();

    this.flagTD = setInterval(this.getTDCurData, window.locationConfig.TGInterface.interface.td.loopTime);

    this.flagSkip = setInterval(this.skip, 60000);




    //=======================================
    // // 右边
    // this.fetchRightHistory()
    // this.rightClearInter = this.todayData(tdUrl, this.customAccountUpdate);


    // // 左图取数据
    // Tools.fetchGet(odsUrl, { 'Content-Type': 'application/json', }, this.singleDataCompleted);
    // Tools.fetchGet(`${odsUrl}?subname=负债总额,资产总额&${getUrlPeriod()}`, { 'Content-Type': 'application/json', }, this.periodDataCompleted);
    // // 中间取数据
    // //  历史值
    // this.fetchMiddleHistory();
    // //  当日核心交易量
    // setTimeout(()=>{
    //   this.midClearInter = this.fetchMiddleToday(tdUrl, this.coreTranscationCompleted);
    // },2000)
  }
  skip = ()=>{
    
    let assets=0,mouth=0,total2=0,ratio=0;

    let debt = this.odsData['负债总额']?+this.odsData['负债总额'][this.odsData['负债总额'].length - 1].value:0;  
    let total = this.odsData['资产总额']?+this.odsData['资产总额'][this.odsData['资产总额'].length - 1].value:0;
    let lirun = this.odsData['净利润']?+this.odsData['净利润'][this.odsData['净利润'].length - 1].value:0;
    let yue = this.odsData['净资产余额']?+this.odsData['净资产余额'][this.odsData['净资产余额'].length - 1].value:0;
    let daikuan = this.odsData['贷款总额']?+this.odsData['贷款总额'][this.odsData['贷款总额'].length - 1].value:0;
    let duigong = this.odsData['对公存款']?+this.odsData['对公存款'][this.odsData['对公存款'].length - 1].value:0;
    let geren = this.odsData['个人存款']?+this.odsData['个人存款'][this.odsData['个人存款'].length - 1].value:0;
    let feiyin = this.odsData['非银存款']?+this.odsData['非银存款'][this.odsData['非银存款'].length - 1].value:0;
    let tongye = this.odsData['同业存款']?+this.odsData['同业存款'][this.odsData['同业存款'].length - 1].value:0;

    let yuangong = this.odsData['全行员工数']?+this.odsData['全行员工数'][this.odsData['全行员工数'].length - 1].value:1;

    total = Math.round(total / 1e6)/100 + Math.round((Math.random()*10-5))/100;
    debt =  Math.round(debt / 1e6)/100 + Math.round((Math.random()*10-5))/100;
    assets = total-debt;//Math.round(lirun / 1e6)/100 + Math.round((Math.random()*5))/100;
    mouth =  Math.round((duigong + geren + feiyin + tongye) / 1e6)/100  + Math.round((Math.random()*10-5))/100; // billionify(duigong + geren + feiyin + tongye),
    total2 = Math.round(daikuan / 1e6)/100 + Math.round((Math.random()*10-5))/100; //billionify(daikuan),
    ratio = Math.round((duigong + geren + feiyin) / 1e6)/100  + Math.round((Math.random()*10-5))/100; //billionify(duigong + geren + feiyin),        
    
    
    if(total<0)total = 0;
    if(debt<0)debt = 0;
    if(assets<0)assets = 0;
    if(mouth<0)mouth = 0;
    if(total2<0)total2 = 0;
    if(ratio<0)ratio = 0;
    if(lirun<0)lirun = 0;
    let avgLi = Math.round(lirun/yuangong/1e2)/100;

    let renjuncunkuan = (duigong + geren + feiyin)/yuangong;
    let renjundaikuan = daikuan/yuangong;
    let renjunlirun = lirun/yuangong;

    lirun = Math.round(lirun / 1e6)/100 + Math.round((Math.random()*6-3))/100;

    this.setState(function (preState) {
      return R.mergeDeepRight(preState, {
        property: {
          total:Tools.addTwoFixed(total),
          debt:Tools.addTwoFixed(debt),
          assets:Tools.addTwoFixed(assets)
        },
        deposit: {
          mouth:Tools.addTwoFixed(ratio),
          total:Tools.addTwoFixed(total2),
          ratio:Tools.addTwoFixed(lirun)
        },
        map: {
          renjuncunkuan:Tools.addTwoFixed(Math.round(renjuncunkuan / 1e2)/100), 
          renjundaikuan:Tools.addTwoFixed(Math.round(renjundaikuan / 1e2)/100), 
          renjunlirun:Tools.addTwoFixed(Math.round(renjunlirun / 1e2)/100), 
        }
      })
    })

  }
  getODSDataLastYear = () => {
    if (window.locationConfig.debug) {

    } else {
      let startTStr = moment().format("YYYY-01-01 00:00:00");
      let endTStr = moment().format("YYYY-01-01 23:59:59");

      Tools.fetchGet(window.locationConfig.TGInterface.interface.ods.address + "?subname=对公客户数,对私客户数,同业客户数,对公账户数,对私账户数&startTime=" + startTStr + "&endTime=" + endTStr,
        { 'Content-Type': 'application/json' },
        this.updateODSDataLastYear);
    }
  }
  getODSData12Month=()=>{
    if (window.locationConfig.debug) {
    } else {
      //左侧曲线图
      let startTStr = moment().subtract(11, 'months').format("YYYY-MM-01 00:00:00");
      let endTStr = moment().format("YYYY-MM-01 23:59:59");
      Tools.fetchGet(window.locationConfig.TGInterface.interface.ods.address + "?subname=负债总额,资产总额&startTime=" + startTStr + "&endTime=" + endTStr,
      { 'Content-Type': 'application/json' },
      this.updateODSData12Month);
    }
   
  }
  getODSData6Month = ()=>{
     //右侧条形图
    if (window.locationConfig.debug) {
    } else {
      let startTStr = moment().subtract(5, 'months').format("YYYY-MM-01 00:00:00");
      let endTStr = moment().format("YYYY-MM-01 23:59:59");

      Tools.fetchGet(window.locationConfig.TGInterface.interface.ods.address + "?subname=对公客户数,对私客户数,同业客户数,对公账户数,对私账户数&startTime=" + startTStr + "&endTime=" + endTStr,
        { 'Content-Type': 'application/json' },
        this.updateODSData6Month);
    }
  }
  
  getODSData1Day = () => {
    if (window.locationConfig.debug) {

    } else {
      let startTStr = moment().subtract(1, 'days').format("YYYY-MM-DD 00:00:00");
      let endTStr = moment().format("YYYY-MM-DD HH:mm:ss");
      Tools.fetchGet(window.locationConfig.TGInterface.interface.ods.address + "?subname=资产总额,负债总额,净利润,净资产余额,贷款总额,对公存款,个人存款,非银存款,同业存款,营业网点数,全行员工数,对公客户数,对私客户数,同业客户数,对公账户数,对私账户数&startTime=" + startTStr + "&endTime=" + endTStr,
        { 'Content-Type': 'application/json' },
        this.updateODSData1Day);
    }
  }
  getTDDataLast10Day = () => {
    if (window.locationConfig.debug) {
    } else {
      let startTStr = moment().subtract(10, 'days').format("YYYY-MM-DD 00:00:00");
      let endTStr = moment().subtract(1, 'days').format("YYYY-MM-DD 23:59:59");
      Tools.fetchGet(window.locationConfig.TGInterface.interface.td.address + "?kpiName=TD_hexinjiaoyiliang&startTime=" + startTStr + "&endTime=" + endTStr,
        { 'Content-Type': 'application/json' },
        this.updateTDDataLast10Day);
    }
  }
  getTDCurData = () => {
    this.tdCurData = {};
    if (window.locationConfig.debug) {
    } else {
      let m = moment();
      let startTStr = m.format("YYYY-MM-DD 00:00:00");
      let endTStr = m.format("YYYY-MM-DD HH:mm:ss");
      // Tools.fetchGet(window.locationConfig.TGInterface.interface.td.address + "?kpiName=TD_hexinjiaoyiliang,TD_xinzengkehu,TD_xinzengzhanghu&startTime=" + startTStr + "&endTime=" + endTStr,
      // Tools.fetchGet(window.locationConfig.TGInterface.interface.td.address + "?kpiName=TD_hexin_ZB,TD_hexin,TD_hexinjiaoyiliang,TD_xinzengkehu,TD_xinzengzhanghu&startTime=" + startTStr + "&endTime=" + endTStr,
      Tools.fetchGet(window.locationConfig.TGInterface.interface.td.address + "?kpiName=TD_hexin_ZB,TD_hexin,TD_xinzengkehu,TD_xinzengzhanghu&startTime=" + startTStr + "&endTime=" + endTStr,
        { 'Content-Type': 'application/json' },
        this.updateTDCurData);
    }
  }
  updateODSDataLastYear = (data) => {
    let odsD = data[0].ODSData;
    this._doODSDataLastYear(odsD);
    if (this.odsDataLastYear['对公客户数'] && this.odsDataLastYear['对公客户数'].length > 0) {
      this.caledTDData.ODSLastYear["对公客户数"] = +this.odsDataLastYear['对公客户数'][this.odsDataLastYear['对公客户数'].length - 1].value;
      this.caledTDData.ODSLastYear["对私客户数"] = +this.odsDataLastYear['对私客户数'][this.odsDataLastYear['对私客户数'].length - 1].value;
      this.caledTDData.ODSLastYear["同业客户数"] = +this.odsDataLastYear['同业客户数'][this.odsDataLastYear['同业客户数'].length - 1].value;
      this.caledTDData.ODSLastYear["对公账户数"] = +this.odsDataLastYear['对公账户数'][this.odsDataLastYear['对公账户数'].length - 1].value;
      this.caledTDData.ODSLastYear["对私账户数"] = +this.odsDataLastYear['对私账户数'][this.odsDataLastYear['对私账户数'].length - 1].value;
      this.updateTDCurData([{}]);
    }
  }
  updateODSData12Month=(data)=>{
    let ods12Data=data[0].ODSData;
    this._doODSData12Month(ods12Data);
    let obj12={};
    if (this.odsData12Month ['资产总额'] && this.odsData12Month['资产总额'].length > 0) {
      for(let i=0;i<this.odsData12Month["资产总额"].length;i++){
        let t = moment(this.odsData12Month["资产总额"][i].time).subtract(1, 'days').format("YYYY/MM");
        if(!obj12[t]){obj12[t] = {time:t,"资产总额":0,"负债总额":0};}
        obj12[t]["资产总额"] = this.odsData12Month["资产总额"][i].value*1;
      }
      for(let i=0;i<this.odsData12Month["负债总额"].length;i++){
        let t = moment(this.odsData12Month["负债总额"][i].time).subtract(1, 'days').format("YYYY/MM");
        if(!obj12[t]){obj12[t] = {time:t,"资产总额":0,"负债总额":0};}
        obj12[t]["负债总额"] = this.odsData12Month["负债总额"][i].value*1;
      }
    }
     //====添加没有的数据
    obj12["2017/01"] = {time:"2017/01","资产总额":266472387315.02,"负债总额":252675135546.64};    
    obj12["2017/02"] = {time:"2017/02","资产总额":253680611019.54,"负债总额":239287492533.09};    
    obj12["2017/03"] = {time:"2017/03","资产总额":256211879441.77,"负债总额":241765549566.91};    
    obj12["2017/04"] = {time:"2017/04","资产总额":258459262205.79,"负债总额":243659078272.29};    
    obj12["2017/05"] = {time:"2017/05","资产总额":254674473408.86,"负债总额":239946512423.09};    
    obj12["2017/06"] = {time:"2017/06","资产总额":269402501193.89,"负债总额":254007272288.56};        
    obj12["2017/07"] = {time:"2017/07","资产总额":259201793137.24,"负债总额":243308094562.37};        
    obj12["2017/08"] = {time:"2017/08","资产总额":264641741197.78,"负债总额":248446565874.41};        
    obj12["2017/09"] = {time:"2017/09","资产总额":268118946584.31,"负债总额":251888322259.51};        
    obj12["2017/10"] = {time:"2017/10","资产总额":268267793137.24,"负债总额":251366565874.41};
   //==== end 添加没有的数据
        
    let r = [];
    for(let key in obj12){
      r.push(obj12[key]);
    }
    r.sort((a,b)=>{return a.time>b.time?1:-1});
    r = r.slice(-12,r.length);

    let tArr = r.map((o)=>o.time);
    let zichanArr = r.map((o)=>o["资产总额"]);
    let fuzhaiArr = r.map((o)=>o["负债总额"]);
    this.setState(function (old) {
      return R.mergeDeepRight(old, {
        property: {
          line: {
            time:tArr,
            debt:fuzhaiArr,
            total:zichanArr,
          }
        }
      })
    });


  }
  updateODSData6Month = (data)=>{
    let odsD = data[0].ODSData;
    this._doODSData6Month(odsD);
    
    let obj = {};

    if (this.odsData6Month ['对公客户数'] && this.odsData6Month['对公客户数'].length > 0) {

      for(let i=0;i<this.odsData6Month["对公客户数"].length;i++){
        let t = moment(this.odsData6Month["对公客户数"][i].time).subtract(1, 'days').format("YYYY/MM");
        if(!obj[t]){obj[t] = {"对公客户数":0,"对私客户数":0,"同业客户数":0,"对公账户数":0,"对私账户数":0};}
        obj[t]["对公客户数"] = +this.odsData6Month["对公客户数"][i].value;
      }
      for(let i=0;i<this.odsData6Month["对私客户数"].length;i++){
        let t = moment(this.odsData6Month["对私客户数"][i].time).subtract(1, 'days').format("YYYY/MM");
        if(!obj[t]){obj[t] = {"对公客户数":0,"对私客户数":0,"同业客户数":0,"对公账户数":0,"对私账户数":0};}
        obj[t]["对私客户数"] = +this.odsData6Month["对私客户数"][i].value;
      }
      for(let i=0;i<this.odsData6Month["同业客户数"].length;i++){
        let t = moment(this.odsData6Month["同业客户数"][i].time).subtract(1, 'days').format("YYYY/MM");
        if(!obj[t]){obj[t] = {"对公客户数":0,"对私客户数":0,"同业客户数":0,"对公账户数":0,"对私账户数":0};}
        obj[t]["同业客户数"] = +this.odsData6Month["同业客户数"][i].value;
      }
      for(let i=0;i<this.odsData6Month["对公账户数"].length;i++){
        let t = moment(this.odsData6Month["对公账户数"][i].time).subtract(1, 'days').format("YYYY/MM");
        if(!obj[t]){obj[t] = {"对公客户数":0,"对私客户数":0,"同业客户数":0,"对公账户数":0,"对私账户数":0};}
        obj[t]["对公账户数"] = +this.odsData6Month["对公账户数"][i].value;
      }
      for(let i=0;i<this.odsData6Month["对私账户数"].length;i++){
        let t = moment(this.odsData6Month["对私账户数"][i].time).subtract(1, 'days').format("YYYY/MM");
        if(!obj[t]){obj[t] = {"对公客户数":0,"对私客户数":0,"同业客户数":0,"对公账户数":0,"对私账户数":0};}
        obj[t]["对私账户数"] = +this.odsData6Month["对私账户数"][i].value;
      }
      
      for(let key in obj){
        obj[key].time = key;
        obj[key].kehu = obj[key]["对公客户数"] + obj[key]["对私客户数"] + obj[key]["同业客户数"];
        obj[key].zhanghu = obj[key]["对公账户数"] + obj[key]["对私账户数"];
      }
    }


      //====添加没有的数据
      obj["2017/05"] = {time:"2017/05",kehu:4700322,zhanghu:6375509};      
      obj["2017/06"] = {time:"2017/06",kehu:4817550,zhanghu:6444367};      
      obj["2017/07"] = {time:"2017/07",kehu:4963892,zhanghu:6598642};
      obj["2017/08"] = {time:"2017/08",kehu:5080186,zhanghu:6688635};      
      obj["2017/09"] = {time:"2017/09",kehu:5201657,zhanghu:6793081};      
      obj["2017/10"] = {time:"2017/10",kehu:5284877,zhanghu:6855418};
      //==== end 添加没有的数据
      
      let r = [];
      for(let key in obj){
        r.push(obj[key]);
      }
      r.sort((a,b)=>{return a.time>b.time?1:-1});
      r = r.slice(-6,r.length);

      let tArr = r.map((o)=>o.time);
      let kehuArr = r.map((o)=>o.kehu);
      let zhanghuArr = r.map((o)=>o.zhanghu);
      this.setState(function (old) {
        return R.mergeDeepRight(old, {
          customer: {           
            line: {
              time:tArr,
              custom: kehuArr,
              account: zhanghuArr
            }
          }
        })
      });

  }

  updateODSData1Day = (data) => {
    let odsD = data[0].ODSData;
    this._doODSData(odsD);
    // 写死204 3952
    // if(this.odsData['营业网点数']){
    //   this.odsData['营业网点数'][this.odsData['营业网点数'].length - 1].value = 204;
    // }else{
    //   this.odsData['营业网点数'] = [
    //     {time: "2017-11-29T20:57:06Z", subname: "营业网点数", name: "I0010", value: "204"}
    //   ]
    // }
    
    // this.odsData['全行员工数'][this.odsData['全行员工数'].length - 1].value = 3952;
    let zichanzonge = +this.odsData['资产总额'][this.odsData['资产总额'].length - 1].value;
    let fuzhaizonge = +this.odsData['负债总额'][this.odsData['负债总额'].length - 1].value;

    let lirun = +this.odsData['净利润'][this.odsData['净利润'].length - 1].value;

    let yue = +this.odsData['净资产余额'][this.odsData['净资产余额'].length - 1].value;
    let daikuan = +this.odsData['贷款总额'][this.odsData['贷款总额'].length - 1].value;

    let duigong = +this.odsData['对公存款'][this.odsData['对公存款'].length - 1].value;
    let geren = +this.odsData['个人存款'][this.odsData['个人存款'].length - 1].value;
    let feiyin = +this.odsData['非银存款'][this.odsData['非银存款'].length - 1].value;
    let tongye = +this.odsData['同业存款'][this.odsData['同业存款'].length - 1].value;

    let wangdian = +this.odsData['营业网点数'][this.odsData['营业网点数'].length - 1].value;
    let yuangong = +this.odsData['全行员工数'][this.odsData['全行员工数'].length - 1].value;

    this.caledTDData.ODSNow["对公客户数"] = +this.odsData['对公客户数'][this.odsData['对公客户数'].length - 1].value;
    this.caledTDData.ODSNow["对私客户数"] = +this.odsData['对私客户数'][this.odsData['对私客户数'].length - 1].value;
    this.caledTDData.ODSNow["同业客户数"] = +this.odsData['同业客户数'][this.odsData['同业客户数'].length - 1].value;
    this.caledTDData.ODSNow["对公账户数"] = +this.odsData['对公账户数'][this.odsData['对公账户数'].length - 1].value;
    this.caledTDData.ODSNow["对私账户数"] = +this.odsData['对私账户数'][this.odsData['对私账户数'].length - 1].value;
    
    let avgLi = yuangong?lirun/yuangong:lirun;
    avgLi = Math.round(avgLi/1e2)/100;

    let renshu = this.odsData['全行员工数'][this.odsData['全行员工数'].length - 1].value;
    let renjuncunkuan = (duigong + geren + feiyin)/renshu;
    let renjundaikuan = daikuan/renshu;
    let renjunlirun = lirun/renshu;

    this.setState(function (preState) {
      return R.mergeDeepRight(preState, {
        property: {
          total:Tools.addTwoFixed(Math.round(zichanzonge / 1e6)/100),
          debt:Tools.addTwoFixed(Math.round(fuzhaizonge / 1e6)/100),
          assets:  Tools.addTwoFixed(Math.round(yue/1e6)/100),//billionify(yue),//Math.round(lirun/1e6)/100,//
        },
        deposit: {
          // mouth: Math.round((duigong + geren + feiyin + tongye) / 1e6)/100, // billionify(duigong + geren + feiyin + tongye),
          // total: Math.round(daikuan / 1e6)/100, //billionify(daikuan),
          // ratio: Math.round((duigong + geren + feiyin) / 1e6)/100, //billionify(duigong + geren + feiyin),
          mouth: Tools.addTwoFixed(Math.round((duigong + geren + feiyin) / 1e6)/100), // billionify(duigong + geren + feiyin + tongye),
          total: Tools.addTwoFixed(Math.round(daikuan / 1e6)/100), //billionify(daikuan),
          ratio: Tools.addTwoFixed(Math.round(lirun / 1e6)/100),//avgLi, //billionify(duigong + geren + feiyin),
          pie: [
            { title: "对公存款", value: duigong, pulled: true },
            { title: "个人存款", value: geren, pulled: true },
            { title: "非银存款", value: feiyin, pulled: true },
            { title: "同业存款", value: tongye, pulled: true },
          ]
        },
        map: {
          branch: wangdian,
          employee: yuangong,
          renjuncunkuan:Tools.addTwoFixed(Math.round(renjuncunkuan / 1e2)/100), 
          renjundaikuan:Tools.addTwoFixed(Math.round(renjundaikuan / 1e2)/100), 
          renjunlirun:Tools.addTwoFixed(Math.round(renjunlirun / 1e2)/100), 
        }
      })
    })
    this.updateTDCurData([{}]);
  }

  updateTDDataLast10Day = (data) => {
    let tdD = data[0];
    this._doTDData(tdD, this.tdHisData);

    let { hisMax, tenAvg, yesterdayData } = Tools.doHisDataForTD(this.tdHisData["TD_hexinjiaoyiliang"]);

    this.caledTDData["TD_hexinjiaoyiliang"].hisMax = hisMax;
    this.caledTDData["TD_hexinjiaoyiliang"].tenAvg = tenAvg;
    this.caledTDData["TD_hexinjiaoyiliang"].yesterdayData = yesterdayData;
    this.caledTDData["TD_hexinjiaoyiliang"].yesterdayHourValue = Tools.dataForHours(yesterdayData);

    this.setState((old) => {
      return R.mergeDeepRight(old, {
        map: {
          climax: 2914968,//this.caledTDData["TD_hexinjiaoyiliang"].hisMax,//        
          tenAvg: 2432633,//this.caledTDData["TD_hexinjiaoyiliang"].tenAvg //2432633
        }
      })
    })
  }

  updateTDCurData = (data) => {
    let tdD = data[0];
    this._doTDData(tdD, this.tdCurData);

    // //核心交易量
    // console.log("AAAA:" + this.tdCurData["TD_hexinjiaoyiliang"].length);
    // let { curAll: cardTradingVolume } = Tools.doCurDataForTD(this.tdCurData["TD_hexinjiaoyiliang"]);
    // //除2操作
    // cardTradingVolume = Math.round(cardTradingVolume/2);
    // //昨日同比
    // let len = this.tdCurData["TD_hexinjiaoyiliang"].length;
    // let curObj = this.tdCurData["TD_hexinjiaoyiliang"][len - 1];
    // let curT = moment().format("YYYY-MM-DD HH:mm:ss")
    // if (curObj) {
    //   curT = curObj.time;
    // }
    // let yesterdayCurTAll = Tools.historyAllBeforeTimeForTD(this.caledTDData["TD_hexinjiaoyiliang"].yesterdayData, curT);    
    // let radio = 0;
    // if (yesterdayCurTAll != 0) {
    //   radio = (cardTradingVolume - yesterdayCurTAll) / yesterdayCurTAll / 100;
    //   if (radio % 1 != 0) {
    //     radio = Number(radio.toFixed(2));
    //   }
    // }
    
    let cardTradingVolume = this._calTDData(this.tdCurData["TD_hexin"]) + this._calTDData(this.tdCurData["TD_hexin_ZB"]);
    let radio = 0;

    //线图
    // this.caledTDData["TD_hexinjiaoyiliang"].todayHourValue = Tools.dataForHours(this.tdCurData["TD_hexinjiaoyiliang"]);
    // this.caledTDData["TD_hexinjiaoyiliang"].todayHourValue.splice(this.caledTDData["TD_hexinjiaoyiliang"].todayHourValue.length - 1, 1);
 
    this.caledTDData["TD_hexin"].todayHourValue = Tools.dataForHoursForHeXin(this.tdCurData["TD_hexin"]);
    this.caledTDData["TD_hexin_ZB"].todayHourValue = Tools.dataForHoursForHeXin(this.tdCurData["TD_hexin_ZB"]);

    let scArr = this.caledTDData["TD_hexin"].todayHourValue;
    let zbArr = this.caledTDData["TD_hexin_ZB"].todayHourValue;

    let heArr = [];
    let len = scArr.length>zbArr.length?scArr.length:zbArr.length;
    for(let i=0;i<len;i++){
      let v1 = scArr[i]?scArr[i]:0;
      let v2 = zbArr[i]?zbArr[i]:0;
      heArr[i] = v1+v2;
    }
    heArr.splice(heArr.length - 1, 1);

    this.setState(function (old) {
      return R.mergeDeepRight(old, {
        map: {
          today: cardTradingVolume,
          dualRatio: radio,
          line: [
            // this.caledTDData["TD_hexinjiaoyiliang"].yesterdayHourValue,
            // this.caledTDData["TD_hexinjiaoyiliang"].todayHourValue,
            // 250
            [],
            heArr,
            250
          ]
        }
      })
    });

    //客户，账户
    let { curAll: xinzengkehu } = Tools.doCurDataForTD(this.tdCurData["TD_xinzengkehu"]);
    let { curAll: xinzengzhanghu } = Tools.doCurDataForTD(this.tdCurData["TD_xinzengzhanghu"]);

    let allkehu = this.caledTDData.ODSNow["对公客户数"] + this.caledTDData.ODSNow["对私客户数"] + this.caledTDData.ODSNow["同业客户数"] + xinzengkehu;
    let allzhanghu = this.caledTDData.ODSNow["对公账户数"] + this.caledTDData.ODSNow["对私账户数"] + xinzengzhanghu;

    let yearAddkehu = allkehu - 5591773;//(this.caledTDData.ODSLastYear["对公客户数"] + this.caledTDData.ODSLastYear["对私客户数"] + this.caledTDData.ODSLastYear["同业客户数"]);
    let yearAddzhanghu = allzhanghu - 7727988;//(this.caledTDData.ODSLastYear["对公账户数"] + this.caledTDData.ODSLastYear["对私账户数"]);
    this.setState(function (preState) {
      return R.mergeDeepRight(preState, {
        customer: {
          customer: {
            today: xinzengkehu,
            total: allkehu,
            annual: yearAddkehu,
            // completed: customHistyData
          },
          account: {
            today: xinzengzhanghu,
            total: allzhanghu,
            annual: yearAddzhanghu,
            // completed: accountHistyData
          }
        }
      })
    })
  }



  componentWillUnmount() {

    clearInterval(this.flagTD);
    clearInterval(this.flagSkip);

    this.odsDataLastYear = null;
    this.odsData6Month = null;
    this.odsData = null;
    this.tdHisData = null;
    this.tdCurData = null;
    this.caledTDData = null;
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

  _doODSDataLastYear(arr) {
    for (let i = 0; i < arr.length; i++) {
      let o = arr[i];
      if (this.odsDataLastYear[o.subname]) {
        this.odsDataLastYear[o.subname].push(o);
      } else {
        this.odsDataLastYear[o.subname] = [o];
      }
    }
  }
  _doODSData6Month(arr) {
    for (let i = 0; i < arr.length; i++) {
      let o = arr[i];
      if (this.odsData6Month[o.subname]) {
        this.odsData6Month[o.subname].push(o);
      } else {
        this.odsData6Month[o.subname] = [o];
      }
    }
  }
  _doODSData12Month(arr) {
    for (let i = 0; i < arr.length; i++) {
      let o = arr[i];
      if (this.odsData12Month[o.subname]) {
        this.odsData12Month[o.subname].push(o);
      } else {
        this.odsData12Month[o.subname] = [o];
      }
    }
  }
  _doTDData(data, obj) {
    for (let key in data) {
      obj[key] = data[key];
    }
  }

  _calTDData(arr) {    
    if(arr){
      let all1 = 0, all2 = 0, all3 = 0, all4 = 0;
      for (let i = 0; i < arr.length; i++) {
        all1 += Number(arr[i].jiaoyi);
          // all2 += Number(arr[i].jiaoyitwo),
          // all3 += Number(arr[i].jiaoyithree),
          // all4 += Number(arr[i].value)
      }
      return all1;
    }else{
      return 0;
    }
  }


  render() {

    return (
      <div className={style.root} >
        <TwoVideo className={style.bgvideo} leftVideoUrl={window.dominContext.staticPath + '/assets/videos/common/left02.mp4'}
          rightVideoUrl={window.dominContext.staticPath + '/assets/videos/common/right02.mp4'} />
        <div style={{ verticalAlign: 'top', paddingLeft: '60px', display: 'inline-block', width: '25%', height: '100%' }}>
          <LeftTop data={this.state.property} />
          <LeftDown data={this.state.deposit} />
        </div>
        <Middle data={this.state.map} />
        <Right data={this.state.customer} />
      </div>);
  }
}

export default MSProv;
function getUrlPeriod() {
  return `startTime=${moment().format('YYYY')}-01-01 00:00:00&endTime=${moment().format('YYYY-MM-DD HH:mm:ss')}`
}
function todayForNow() {
  return `startTime=${moment().format('YYYY-MM-DD 00:00:00')}&endTime=${moment().format('YYYY-MM-DD HH:mm:ss')}`
}
function untilYesterday() {
  return `startTime=${moment().format('YYYY')}-01-01 00:00:00&endTime=${moment().format('YYYY-MM-DD 23:59:59')}`
}
function billionify(fig) {
  return Math.round(fig / 1e8)
}
function slicePie(str) {
  // return str.slice(0, str.indexOf('`'));
  return str
}
function getSomedayData(arr, dayStr) {
  return arr.filter(ele => {
    return moment(ele.time).format("YYYY/MM/DD") === dayStr
  })
}
