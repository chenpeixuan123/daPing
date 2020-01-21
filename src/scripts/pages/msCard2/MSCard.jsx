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


    this.state = {
      jiaoyiliang: 0,//1267891,
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
      cardConsumePlaceStructureDataProvider: [{ title: "境外取现", value: 10, pulled: true }, { title: "境外消费", value: 20, pulled: true }, { title: "衣食", value: 30, pulled: true }, { title: "其他", value: 30, pulled: true }]
    };
  }


  componentDidMount() {
    //历史 //现在
    this.getTDHisData();

    this.getODSData();
    //新增卡曲线图
    this.getODS12Month();
    this.flagTD = setInterval(this.getTDCurData, window.locationConfig.TGTest.mscard.loopTime);
  }

  componentWillUnmount() {
    this.flagTD&&clearInterval(this.flagTD);
    this.flagTD=null;
    this.odsData = null;
    this.ods12Data = null;
    this.tdHisData = null;
    this.tdCurData = null;
  }

  getODSData = () => {
    if (window.locationConfig.debug) {
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
  //历史
  getTDHisData = () => {
    if (window.locationConfig.debug) {
      let data = [{ "TD_hexinjiaoyiliang": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "59" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT07:50:18") + "Z", "value": "39" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT08:29:09") + "Z", "value": "49" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT09:50:18") + "Z", "value": "60" }], "TD_xinzengkehu": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:18") + "Z", "value": "3" }], "TD_xinzengzhanghu": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:18") + "Z", "value": "1" }], "TD_hulianwangjiaoyis": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "72,40,72" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "180,104,180" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT07:29:09") + "Z", "value": "172,40,72" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT08:30:00") + "Z", "value": "190,104,180" }], "TD_WYmingxi": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }], "TD_jiejika": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "1" }], "TD_jingwaitongji": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "20" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "2" }], "TD_jingwai": [{ "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:29:09") + "Z", "value": "8330" }, { "time": moment().subtract(1, 'days').format("YYYY-MM-DDT06:30:00") + "Z", "value": "8330" }] }];
      this.updateTDHisData(data);
    } else {
      let startTStr = moment().subtract(1, 'days').format("YYYY-MM-DD");
      let endTStr = moment().format("YYYY-MM-DD");
      Tools.fetchGet(window.locationConfig.TGTest.mscard.address4 + `{"startTime":"${startTStr}","endTime":"${endTStr}"}`,
        {
          'Content-Type': 'application/json',
        },
        this.updateTDHisData);
    }
  }
  //历史
  updateTDHisData=(hisData)=>{
    let name=hisData.datas[0].name;
    let data2=hisData.datas[0].data;
    this.tdHisData[name]=data2;
    // console.log('昨日：');
    // console.log( this.tdHisData['TD_jiejika']);
    // console.log(moment(1526431860000).format("YYYY-MM-DD HH:mm:ss"));//每一分钟
     //昨日取到数之后 存储 拿今日数据
     this.getTDCurData();
  }
  //今日
  getTDCurData = () => {
    if (window.locationConfig.debug) {
      let data = [{ "TD_hexinjiaoyiliang": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "49" }, { "time": moment().format("YYYY-MM-DDT07:50:18") + "Z", "value": "69" }], "TD_xinzengkehu": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().format("YYYY-MM-DDT06:30:18") + "Z", "value": "3" }], "TD_xinzengzhanghu": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().format("YYYY-MM-DDT06:30:18") + "Z", "value": "1" }], "TD_hulianwangjiaoyis": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "72,40,72" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "180,104,180" }, { "time": moment().format("YYYY-MM-DDT07:29:09") + "Z", "value": "62,40,72" }], "TD_WYmingxi": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "45.32.141" }, { "time": moment().format("YYYY-MM-DDT07:30:00") + "Z", "value": "45.32.141" }], "TD_jiejika": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "2" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "1" }, { "time": moment().format("YYYY-MM-DDT07:29:09") + "Z", "value": "2" }, { "time": moment().format("YYYY-MM-DDT07:30:00") + "Z", "value": "1" }, { "time": moment().format("YYYY-MM-DDT08:29:09") + "Z", "value": "2" }, { "time": moment().format("YYYY-MM-DDT08:30:00") + "Z", "value": "1" }, { "time": moment().format("YYYY-MM-DDT09:29:09") + "Z", "value": "2" }, { "time": moment().format("YYYY-MM-DDT09:30:00") + "Z", "value": "1" }], "TD_jingwaitongji": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "20" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "2" }], "TD_jingwai": [{ "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "0702" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "0702" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "0764" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "0704" }, { "time": moment().format("YYYY-MM-DDT06:29:09") + "Z", "value": "0276" }, { "time": moment().format("YYYY-MM-DDT06:30:00") + "Z", "value": "0887" }] }];
      this.updateTDCurData(data);
    } else {
      let time = moment().format("YYYY-MM-DD");
      //境外借记卡
      Tools.fetchGet(
        window.locationConfig.TGTest.mscard.address5 + `{"time":"${time}"}`,
        {
          'Content-Type': 'application/json',
        },
        this.updateJW
      );
      //交易构成
      Tools.fetchGet(
        window.locationConfig.TGTest.mscard.address1 + `{"time":"${time}"}`,
        {
          'Content-Type': 'application/json',
        },
        this.updateGC
      );
      // 渠道商户
      Tools.fetchGet(
        window.locationConfig.TGTest.mscard.address2 + `{"time":"${time}"}`,
        {
          'Content-Type': 'application/json',
        },
        this.updateSH
      );
       //借记卡(今日)
       Tools.fetchGet(
        window.locationConfig.TGTest.mscard.address3 + `{"time":"${time}"}`,
        {
          'Content-Type': 'application/json',
        },
        this.updateTDCurData
      );
    }
  }
  //境外借记卡交易量
  updateJW=(JWData)=>{
    //  console.log("境外借记卡");
     let getJingwaiArr=JWData.datas[0].data;//{time:value}//地区
     let getJingwaiArrLen=getJingwaiArr.length;//境外发生交易量
       //code 转4位str
      for(let i=0;i<getJingwaiArrLen;i++){
        let codeStr=String(getJingwaiArr[i].value);//1.00,11.00,111.00
        let leng=codeStr.length;
        getJingwaiArr[i].value = leng==3?"0"+codeStr:(leng==2?"00"+codeStr:(leng==1?"000"+codeStr:''))
      }
      // console.log(getJingwaiArr);
      let getJingwaiArrToCountry=[];
      getJingwaiArr.map(
        (obj,index)=>{
          if(obj.value){
            getJingwaiArrToCountry.push(
              {
                time: obj.time,
                code: obj.value,
                name: Tools.codeToRegion(obj.value)
              }
            )
          }
        }
      );
     //去掉CodeRegion 中 0001 0039
     let getJingwaiArrToCountry2=[];
     getJingwaiArrToCountry.forEach(
       (obj) => {
         isNaN(obj.name)?getJingwaiArrToCountry2.push(obj):'';
       }
     );
    let overseasTradingVolume=getJingwaiArrToCountry2.length;
    let countryArr =  Tools.todayJingWaiData(getJingwaiArrToCountry2);////从大到小
    let overseasCountriesCount=countryArr.length;
    let mapOption = DataCreater.createMapOption(countryArr);
    let countriesTop10Option=DataCreater.createCountriesTop10Option(countryArr.slice(0, 10));
    //  console.log(countryArr);

    //境内外占比
    let barR = 0;
    let allCard = this.state.jiaoyiliang + overseasTradingVolume;
    if (allCard != 0) {
      barR = this.state.jiaoyiliang / allCard;//境内外占比
    };
    //去掉CodeRegion 中 0001 0039
    // let new_TodayJingWaiSortArr=[];
    // countryArr.forEach(
    //   (obj) => {
    //     isNaN(obj.name)?new_TodayJingWaiSortArr.push(obj):'';
    //   }
    // );

    this.setState(
      {
        overseasTradingVolume,
        overseasCountriesCount,
        barR,
        countriesTop10Option,
        mapOption
      }
    )
  }
  updateGC=(GCData)=>{
    // console.log("构成");
    let arr=GCData.datas;
    let cardConsumePlaceStructureDataProvider=[];
    arr.map(
      (obj,index)=>{
        if(obj.name!=="-"){
          cardConsumePlaceStructureDataProvider.push(
            {
              title:`境外${obj.name}`,
              value:obj.data[0].sum,
              pulled:true,
            }
          )
        }
      }
    );
    this.setState({cardConsumePlaceStructureDataProvider});
  }
  updateSH=(XFQDData)=>{ 
    // console.log("消费渠道");
    let arr=XFQDData.datas;
    // console.log(arr);
    let r=[];
    for (let i = 0; i < arr.length; i++) {
        if (isNaN(Number(arr[i].name))){
          console.warn(`无${arr[i].name} 对应商户`);
          arr.splice(i,1);
        }
    }
    arr.map(
      (obj,index)=>{
        r.push(
          { title: obj.name, value: obj.data[0].sum, pulled: true }
        )
      }
    )
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
  }
  updateTDCurData=(curData)=>{
    // console.log(curData);
    let name=curData.datas[0].name;
    let data2=curData.datas[0].data;
    //借记卡
    this.tdCurData[name]=data2;
    // console.log('今日：')
    // console.log(this.tdCurData);
    let jiaoyiliang=0;
    //计算总量
    this.tdCurData[name].map(
      (obj,index)=>{
        let sum=obj.sum;
        if(!isNaN(sum)){
          jiaoyiliang+=sum;
        }
      }
    )
    //计算同比
    let len = this.tdCurData["TD_jiejika"].length;
    let curObj = this.tdCurData["TD_jiejika"][len - 1];
    let curT = moment().format("YYYY-MM-DD HH:mm:ss")
    if (curObj) {
      curT = curObj.time;
    }
    // console.log(this.tdHisData['TD_jiejika']);
    let yesterdayCurTAll = Tools.handleTongBi(this.tdHisData['TD_jiejika'], curT);
    let radio = 0;
    if (yesterdayCurTAll != 0) {
      radio = (jiaoyiliang - yesterdayCurTAll) / yesterdayCurTAll * 100;
      if (radio % 1 != 0) {
        radio = Number(radio.toFixed(2));
      }
    }else{
      radio=100;
    }
    // let nowTime=moment(nowObj.time).format("YYYY-MM-DD HH:mm:ss");
    //计算曲线
    // console.log(this.tdCurData["TD_jiejika"]);
    let trendLine=Tools.dataForHours2(this.tdCurData["TD_jiejika"]);
    let realtimeLineOption= DataCreater.createRealtimeLineOption(trendLine.slice(0,trendLine.length-1));
    this.setState(
      {
        jiaoyiliang,
        cardYesterdayRadio: radio,
        realtimeLineOption
      }
    )
  }
  // 2017-12-31~~~~今日
  updateODSData = (data) => {
    let odsD = data[0].ODSData;
    // console.log('当前总卡数');
    // console.log(odsD);
    //上一年末总卡数
    let lastYearCards=0;
    if (moment().format("YYYY") == "2018") {
      lastYearCards = 4481425;    
    }else{
      lastYearCards=odsD[0].value;
    }
    // 当前总卡数
    let odsDLength=odsD.length;
    let nowAllCards=odsD[odsDLength-1].value*1;
    let yesterDayTime=moment().subtract(1, 'days').format("YYYY/MM/DD");
    let yesAddCardArr=[];
    for(let i=0;i<odsDLength;i++){
      moment(odsD[i].time).format("YYYY/MM/DD")===yesterDayTime?yesAddCardArr.push(odsD[i]):'';
    }
    let len=yesAddCardArr.length;
    let yesAddCard=len>0?nowAllCards-yesAddCardArr[0].value:0;
    this.setState({
      cardAccountNumber: nowAllCards,
      cardYesterdayAdd:yesAddCard,
      cardYearAdd: nowAllCards - lastYearCards
    });
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
        <TitleValue className={style.cardTradingVolume} title={"神舟兴陇卡交易量"} autoAnimate={true} numberFormat={true} value={this.state.jiaoyiliang} />
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
        <TitleAMChart className={style.cardConsumePlaceStructure} titleClassName={style.cardConsumePlaceStructure_title} chartClassName={style.cardConsumePlaceStructure_chart} title={"神舟兴陇卡境外交易构成"} option={this.state.cardConsumePlaceStructureOption} dataProvider={this.state.cardConsumePlaceStructureDataProvider} />
      </div>);
  }
}

export default MSCard;