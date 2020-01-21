import React, { Component } from 'react'
import style from './style.css';
import DataCreater from './DataCreater';
import TitleValueCountUp from 'components/common/TitleValueCountUp';
import Chart from 'components/common/Chart';
import TitleChart from 'components/common/TitleChart';
// import NumProgress from 'components/common/NumProgress';
import moment from 'moment';
import Tools from 'utils/Tools';
export default class Customer extends Component {
  constructor(props) {
    super(props);
    window.share.resetPageSize(1920, 1080);
    //趋势数据
    this.odsData6Month = {};
    //一天数据客户账户
    this.odsData = {};
    //客户账户
    this.tdCurData = {};
    this.caledTDData = {
      // "TD_hexinjiaoyiliang": {
      //   hisMax: 0,
      //   tenAvg: 0,
      //   yesterdayData: [],
      //   todayHourValue: []
      // },
      // "TD_hexin":{
      //   todayHourValue: []
      // },
      // "TD_hexin_ZB":{
      //   todayHourValue: []
      // },
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
    //客户结构pie
    this.keHuID=["I0060004","I0060005","I0060006","I0060007","I0060008"],
    this.keHuRankPie=new Array();
    this.state = {
      //客户账户
      allkehu:0,//867891
      allzhanghu:0,//145891
      xinzengkehu:0,//682,
      xinzengzhanghu:0,//840,
      yearAddkehu:0,//57456,
      yearAddzhanghu:0,//72417,
      //趋势  { name: "结构二", value: 310 },
      uPtrend:DataCreater.uPtrend([]),
      kehujiegou: DataCreater.kehujiegou([]),
      cunkuanjiegou:DataCreater.cunkuanjiegou([]),
      qudao:DataCreater.qudaoBar(
        [
          {"time":1533856680000,"name":"0","value":0},
        ]
      )
    }
  }
  componentWillUnmount() {
    this.flagTD&&clearInterval(this.flagTD);
    this.flagTD=null;
    this.odsData6Month = null;
    this.odsData = null;
    this.tdCurData=null;
    this.caledTDData = null;
    this.keHuID=null;
    this.keHuRankPie=null;
  }
  componentDidMount() {
    //6 趋势
    this.getODSData6Month();
    //所有客户账户
    this.getODSData1Day();
    //今日新增客户账户
    this.getTDCurData();
    //客户结构
    this.keHuID.forEach(
      (v)=>{
        Tools.fetchGet(
          window.locationConfig.TGTest.customer.address12+`{"name":"${v}"}`,
          { 'Content-Type': 'application/json' },
          this.upDateKeHu
        )
      }
    )
    //存款结构
    this.ckRing();
    // 获客渠道 I00114
    Tools.fetchGet(
      window.locationConfig.TGTest.customer.address12+`{"name":"I00114"}`,
      { 'Content-Type': 'application/json' },
      this.upDateHKQD
    )
  
    //对公top10
    this.flagTD = setInterval(this.getTDCurData, window.locationConfig.TGInterface.interface.td.loopTime);
  }
  //获客渠道
  upDateHKQD=(d)=>{
    let ODSData=d.datas[0];
    let originArr=ODSData['data']||[];
    // console.log(originArr);
    let foramteArr=[];
    originArr.forEach(
      (o)=>{
          foramteArr.push({name:o['subname'].slice(4,o['subname'].length),value:o['value']})
      }
    )
    foramteArr.sort(
      (a,b)=>{
        return b["value"]-a["value"];
      }
    );
    // console.log(foramteArr);
    this.setState(
      {
        qudao:DataCreater.qudaoBar(foramteArr)
      }
    )
  }
  //存款结构
  ckRing=()=>{
    if (window.locationConfig.debug) {
    } else {
      let startTStr = moment().format("YYYY-MM-DD 00:00:00");
      let endTStr = moment().format("YYYY-MM-DD HH:mm:ss");
      Tools.fetchGet(window.locationConfig.TGInterface.interface.ods.address + "?subname=对公存款,个人存款,非银存款,同业存款&startTime=" + startTStr + "&endTime=" + endTStr,
        { 'Content-Type': 'application/json' },
        this.updateCKRing);
    }
  }
  updateCKRing=(data)=>{
    let arr=data[0].ODSData;
    // console.log(arr);
    this.setState({  cunkuanjiegou:DataCreater.cunkuanjiegou(arr)})
  }
  //客户结构
  upDateKeHu=(d)=>{
    let nowRank=d.datas[0].data;
    let nowRankValue=0;
    let subname=d.datas[0].data[0].subname;
    // console.log(subname);
    //过滤 "00999": "甘肃银行股份有限公司",
    // let nowRankName=subname.slice(subname.match(/\d+/g)[0].length,subname.length);
    let nowRankName=subname.slice(5,subname.length);
    // console.log(nowRankName);
    let t=moment().format("YYYY-MM-DD");
    for(let i=0;i<nowRank.length;i++){
      moment(nowRank[i].time).format("YYYY-MM-DD")===t?nowRankValue+=nowRank[i].value:"";
      // console.log(moment(nowRank[i].time).format("YYYY-MM-DD 00:00:00"));
    }
    this.keHuRankPie.push({name:nowRankName,value:nowRankValue});
    this.keHuRankPie.sort(
      (a,b)=>{
        return b["value"]>a["value"];
      }
    );
    // console.log(this.keHuRankPie);
    this.setState({ kehujiegou: DataCreater.kehujiegou(this.keHuRankPie)})
  }
  //6个月趋势
  getODSData6Month = ()=>{
    if (window.locationConfig.debug) {
    } else {
      let startTStr = moment().subtract(5, 'months').format("YYYY-MM-01 00:00:00");
      let endTStr = moment().format("YYYY-MM-01 23:59:59");

      Tools.fetchGet(window.locationConfig.TGInterface.interface.ods.address + "?subname=对公客户数,对私客户数,同业客户数,对公账户数,对私账户数&startTime=" + startTStr + "&endTime=" + endTStr,
        { 'Content-Type': 'application/json' },
        this.updateODSData6Month);
    }
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
      obj["2017/10"] = {time:"2017/10",kehu:5304877,zhanghu:6855418};
      //fake
      obj["2017/11"] = {time:"2017/11",kehu:5354877,zhanghu:6900000};      
      obj["2017/12"] = {time:"2017/12",kehu:5484877,zhanghu:7088418};
      obj["2018/01"] = {time:"2018/01",kehu:5584877,zhanghu:7255418};
      
      //==== end 添加没有的数据
      
      let r = [];
      for(let key in obj){
        r.push(obj[key]);
      }
      r.sort((a,b)=>{return a.time>b.time?1:-1});
      r = r.slice(-6,r.length);
      //趋势
      this.setState(
        {
          uPtrend:DataCreater.uPtrend(r)
        }
      )
  }
  _doODSData6Month(arr){
    for (let i = 0; i < arr.length; i++) {
      let o = arr[i];
      if (this.odsData6Month[o.subname]) {
        this.odsData6Month[o.subname].push(o);
      } else {
        this.odsData6Month[o.subname] = [o];
      }
    }
  }
  //一天数据 所有客户账户
  getODSData1Day = () => {
    if (window.locationConfig.debug) {

    } else {
      let startTStr = moment().subtract(1, 'days').format("YYYY-MM-DD 00:00:00");
      let endTStr = moment().format("YYYY-MM-DD HH:mm:ss");
      Tools.fetchGet(window.locationConfig.TGInterface.interface.ods.address + "?subname=对公客户数,对私客户数,同业客户数,对公账户数,对私账户数&startTime=" + startTStr + "&endTime=" + endTStr,
        { 'Content-Type': 'application/json' },
        this.updateODSData1Day);
    }
  }
  updateODSData1Day = (data) => {
    let odsD = data[0].ODSData;
    this._doODSData(odsD);
    this.caledTDData.ODSNow["对公客户数"] = +this.odsData['对公客户数'][this.odsData['对公客户数'].length - 1].value;
    this.caledTDData.ODSNow["对私客户数"] = +this.odsData['对私客户数'][this.odsData['对私客户数'].length - 1].value;
    this.caledTDData.ODSNow["同业客户数"] = +this.odsData['同业客户数'][this.odsData['同业客户数'].length - 1].value;
    this.caledTDData.ODSNow["对公账户数"] = +this.odsData['对公账户数'][this.odsData['对公账户数'].length - 1].value;
    this.caledTDData.ODSNow["对私账户数"] = +this.odsData['对私账户数'][this.odsData['对私账户数'].length - 1].value;
    this.updateTDCurData([{}]);
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
  //今日新增客户账户
  getTDCurData = () => {
    this.tdCurData = {};
    if (window.locationConfig.debug) {
    } else {
      let m = moment();
      let startTStr = m.format("YYYY-MM-DD 00:00:00");
      let endTStr = m.format("YYYY-MM-DD HH:mm:ss");
      Tools.fetchGet(window.locationConfig.TGInterface.interface.td.address + "?kpiName=TD_xinzengkehu,TD_xinzengzhanghu&startTime=" + startTStr + "&endTime=" + endTStr,
        { 'Content-Type': 'application/json' },
        this.updateTDCurData);
    }
  }
  updateTDCurData = (data) => {
    let tdD = data[0];
    this._doTDData(tdD, this.tdCurData);    
    //客户，账户
    let { curAll: xinzengkehu } = Tools.doCurDataForTD(this.tdCurData["TD_xinzengkehu"]);
    let { curAll: xinzengzhanghu } = Tools.doCurDataForTD(this.tdCurData["TD_xinzengzhanghu"]);

    let allkehu = this.caledTDData.ODSNow["对公客户数"] + this.caledTDData.ODSNow["对私客户数"] + this.caledTDData.ODSNow["同业客户数"] + xinzengkehu;
    let allzhanghu = this.caledTDData.ODSNow["对公账户数"] + this.caledTDData.ODSNow["对私账户数"] + xinzengzhanghu;

    let yearAddkehu = allkehu - 5591773;//(this.caledTDData.ODSLastYear["对公客户数"] + this.caledTDData.ODSLastYear["对私客户数"] + this.caledTDData.ODSLastYear["同业客户数"]);
    let yearAddzhanghu = allzhanghu - 7727988;//(this.caledTDData.ODSLastYear["对公账户数"] + this.caledTDData.ODSLastYear["对私账户数"]);
    this.setState(
      {
        allkehu,
        allzhanghu,
        xinzengkehu,
        xinzengzhanghu,
        yearAddkehu,
        yearAddzhanghu
      }
    )
  }
  _doTDData(data, obj){
    for (let key in data) {
      obj[key] = data[key];
    }
  }
  render() {
    let kehuImg = window.dominContext.staticPath + '/assets/images/customer/kehu.png';
    return (
      <div className={style.customer}>
        <div className={style.bgvideo}>
            <video loop muted autoPlay src={window.dominContext.staticPath + '/assets/videos/common/right01.mp4'}> Your browser does not support the video tag</video>
        </div>
        <img src={kehuImg} className={style.kehuImg}/>
        <TitleValueCountUp
            style={{position:'absolute',top:130,left:40}}
            titleStyle={{fontSize: 24}}
            valueClassName={style.value1}
            title={`当前总客户数`}
            value={this.state.allkehu}
            decimals={0}
        />
        <TitleValueCountUp
            style={{position:'absolute',top:250,left:40}}
            titleStyle={{fontSize: 18,float:'left',paddingTop:17,paddingRight:10}}
            valueClassName={style.value2}
            title={`当日新增`}
            value={this.state.xinzengkehu}
            decimals={0}
        />
        <TitleValueCountUp
            style={{position:'absolute',top:320,left:40}}
            titleStyle={{fontSize: 18,float:'left',paddingTop:17,paddingRight:10}}
            valueClassName={style.value2}
            title={`本年度新增`}
            value={this.state.yearAddkehu}
            decimals={0}
        />
        {/* <div style={{width:350,position:'absolute',top:300,left:40}}>
              <div style={{paddingBottom:20,fontSize:24}}>年度指标完成度</div>
              <NumProgress
                real={0.5} 
                plan={0.6} 
                slide={slide}
              />
        </div> */}
        {/*  */}
        <TitleValueCountUp
            style={{position:'absolute',top:130,left:450}}
            titleStyle={{fontSize: 24}}
            valueClassName={style.value1}
            title={`当前总账户数`}
            value={this.state.allzhanghu}
            decimals={0}
        />
        <TitleValueCountUp
            style={{position:'absolute',top:250,left:450}}
            titleStyle={{fontSize: 18,float:'left',paddingTop:17,paddingRight:10}}
            valueClassName={style.value2}
            title={`当日新增`}
            value={this.state.xinzengzhanghu}
            decimals={0}
        />
        <TitleValueCountUp
            style={{position:'absolute',top:320,left:450}}
            titleStyle={{fontSize: 18,float:'left',paddingTop:17,paddingRight:10}}
            valueClassName={style.value2}
            title={`本年度新增`}
            value={this.state.yearAddzhanghu}
            decimals={0}
        />
        <TitleChart 
            style={{position:"absolute",left:100,top:400,width:650,height:300}}
            titleStyle={{position:'absolute',top:133,left:157}}
            chartStyle={{width:650,height:300}}
            title={`客户结构`}
            option={this.state.kehujiegou}     
        />
        <Chart 
            style={{position:"absolute",left:150,bottom:40,width:550,height:350}}
            option={this.state.cunkuanjiegou}
        />
         {/* right */}
        <TitleChart 
            style={{position:"absolute",left:900,top:90,width:1000,height:400}}
            chartStyle={{width:1000,height:350}}
            titleStyle={{fontFamily:'Microsoft YaHei',fontSize:24}}
            title={`近6个月增长趋势`}
            option={this.state.uPtrend}     
        />
         <TitleChart 
            className={style.boxShadow}
            style={{position:"absolute",left:900,top:540,width:1000,height:480,padding:"10px 20px"}}
            titleStyle={{fontFamily:'Microsoft YaHei',fontSize:24}}
            chartStyle={{width:1000,height:440}}
            title={`获客渠道分布`}
            option={this.state.qudao}     
        />
      </div>
    )
  }
}





