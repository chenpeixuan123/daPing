import React, { Component } from 'react'
import style from './style.css';
import DataCreater from './DataCreater';
// import TwoVideo from 'components/common/TwoVideo';
import ScrollList from 'components/common/ScrollList';
import ListItem from './ListItem';
import TitleValueCountUp from 'components/common/TitleValueCountUp';
import ImgTitleValue from 'components/common/ImgTitleValue';
import TitleChart from 'components/common/TitleChart';
import BaseMap from 'components/common/BaseMap';
import ItemGauge from './components/ItemGauge';
import Chart from 'components/common/Chart';
import moment from 'moment';
import Tools from 'utils/Tools';

export default class GSProv extends Component {
  constructor(props) {
    super(props);
    window.share.resetPageSize(3840, 1080);
    //全省各个支行大额交易播报
    this.ZD_type=[821,822,823,824,825,826,827,828,829,831,833,834,836,838];
    this.ZD_branch=new Array();
    this.state = {
      qdjg:0,
      dlgy:0,
      //网点员工
      netNumer:0,
      employeeNumber:0,
      //赞同 接口
      total_trade_count:788990,
      total_trade_count_before_top:0,
      total_trade_count_cmp:0,//%
      total_trade_amount:0,
      //仪表盘
      aveg_time:0,
      succ_rate:0,
      tps:0,
      //msweb 接口
      trendLine:DataCreater.trendLine([]),
      //3个占比 { name: "占比一", value: 49.65 }
      timePie: DataCreater.createPie([]),
      wayPie: DataCreater.createPie([]),
      eBankPie: DataCreater.createPie([]),
      //top10 {name:'天水分行',value:123}
      top10Time:'2018年7月30日18:20:24',
      netTop10:DataCreater.netTop10Bar([]),//  {name:'天水分行',value:123},
      mapOption:DataCreater.mapOption(
        [
          //各区网点
           { "name": "甘肃银行生产中心", "value": 15 }, 
           { "name": "甘肃银行灾备机房", "value": 15 },
           { "name": "安宁支行营业室", "value": 15 }, 
           { "name": "安宁西路支行", "value": 15 }, 
           { "name": "滨河支行", "value": 15 }, 
           { "name": "银滩支行", "value": 15 }, 
           { "name": "科教城支行", "value": 15 }, 
           { "name": "七里河支行营业室", "value": 15 }, 
           { "name": "敦煌路支行", "value": 15 }, 
           { "name": "西津西路支行", "value": 15 }, 
           { "name": "小西湖支行", "value": 15 }, 
           { "name": "彭家坪支行", "value": 15 }, 
           { "name": "武都路支行", "value": 15 }, 
           { "name": "马滩支行", "value": 15 }, 
           { "name": "榆中支行", "value": 15 }, 
           { "name": "和平支行", "value": 15 }, 
           { "name": "皋兰支行", "value": 15 }, 
           { "name": "红谷支行", "value": 15 }, 
           { "name": "永登支行", "value": 15 }, 
           { "name": "兴陇支行营业室", "value": 15 }, 
           { "name": "西固支行营业室", "value": 15 }, 
           { "name": "福利东路支行", "value": 15 }, 
           { "name": "甘南路支行", "value": 15 }, 
           { "name": "甘肃银行城关支行营业室", "value": 15 }, 
           { "name": "甘肃银行兰州市嘉峪关路支行", "value": 15 }, 
           { "name": "甘肃银行兰州市天水北路支行", "value": 15 }, 
           { "name": "甘肃银行兰州市北龙口支行", "value": 15 }, 
           { "name": "甘肃银行兰州市盐场路支行", "value": 15 }, 
           { "name": "东岗支行营业室", "value": 15 }, 
           { "name": "五里铺支行", "value": 15 }, 
           { "name": "嘉峪关南路支行", "value": 15 }, 
           { "name": "兰州市高新支行", "value": 15 },
            { "name": "兰州市东岗东路支行", "value": 15 }, 
            { "name": "兰州市雁西路支行", "value": 15 }, 
            { "name": "兰州市雁北路支行", "value": 15 }, 
            { "name": "甘肃银行股份有限公司营业部", "value": 15 }, 
            { "name": "甘肃银行股份有限公司文化支行", "value": 15 }, 
            { "name": "甘肃银行股份有限公司兰州市南山东路支行", "value": 15 }, 
            { "name": "甘肃银行股份有限公司兰州市临夏路支行", "value": 15 }, 
            { "name": "甘肃银行股份有限公司兰州市定西南路支行", "value": 15 }, 
            { "name": "甘肃银行股份有限公司兰州市庆阳路支行", "value": 15 }, 
            { "name": "兰州新区支行营业室", "value": 15 }, 
            { "name": "兰州新区科技支行", "value": 15 }, 
            { "name": "兰州市南滨河中路支行", "value": 15 }, 
            { "name": "兰州新区保税区支行", "value": 15 }, 
            { "name": "中央广场支行", "value": 15 }, 
            { "name": "火车站西路支行", "value": 15 }, 
            { "name": "皋兰路支行", "value": 15 }, 
            { "name": "五泉支行", "value": 15 }, 
            { "name": "白银路支行", "value": 15 }, 
            { "name": "白银区支行", "value": 15 }, 
            { "name": "城建支行", "value": 15 }, 
            { "name": "银龙支行", "value": 15 }, 
            { "name": "银兴支行", "value": 15 }, 
            { "name": "科技支行", "value": 15 }, 
            { "name": "城联支行", "value": 15 }, { "name": "北京路支行", "value": 15 }, { "name": "银光支行", "value": 15 }, { "name": "工农路支行", "value": 15 }, { "name": "平川支行", "value": 15 }, { "name": "平川长征路支行", "value": 15 }, { "name": "靖远县支行", "value": 15 }, { "name": "靖远南大街支行", "value": 15 }, { "name": "景泰县支行", "value": 15 }, { "name": "景泰县长城路支行", "value": 15 }, { "name": "会宁县支行", "value": 15 }, { "name": "会宁县会师南路支行", "value": 15 }, { "name": "王岘东路支行", "value": 15 }, { "name": "人民路支行", "value": 15 }, { "name": "中学巷支行", "value": 15 }, { "name": "西郊支行", "value": 15 }, { "name": "华池支行", "value": 15 }, { "name": "北大街支行", "value": 15 }, { "name": "安定路支行", "value": 15 }, { "name": "合水支行", "value": 15 }, { "name": "小什字支行", "value": 15 }, { "name": "南大街支行", "value": 15 }, { "name": "西峰区支行", "value": 15 }, { "name": "宁县支行", "value": 15 }, { "name": "庆城支行", "value": 15 }, { "name": "镇原支行", "value": 15 }, { "name": "正宁支行", "value": 15 }, { "name": "环县支行", "value": 15 }, { "name": "东郊支行", "value": 15 }, { "name": "临潭支行", "value": 15 }, { "name": "卓尼支行", "value": 15 }, { "name": "夏河支行", "value": 15 }, { "name": "秦州区支行", "value": 15 }, { "name": "广场支行", "value": 15 }, { "name": "麦积支行", "value": 15 }, { "name": "桥南支行", "value": 15 }, { "name": "万达市场支行", "value": 15 }, { "name": "甘谷支行", "value": 15 }, { "name": "武山支行", "value": 15 }, { "name": "秦安支行", "value": 15 }, { "name": "清水支行", "value": 15 }, { "name": "张家川支行", "value": 15 }, { "name": "广河支行", "value": 15 }, { "name": "东乡支行", "value": 15 }, { "name": "和政支行", "value": 15 }, { "name": "永靖支行", "value": 15 }, { "name": "红园路支行", "value": 15 }, { "name": "临夏县支行", "value": 15 }, { "name": "东城区支行", "value": 15 }, { "name": "积石山支行", "value": 15 }, { "name": "康乐支行", "value": 15 }, { "name": "永昌支行", "value": 15 }, { "name": "金昌河西堡支行", "value": 15 }, { "name": "金昌上海路支行", "value": 15 }, { "name": "酒泉肃州区支行", "value": 15 }, { "name": "酒泉新城支行", "value": 15 }, { "name": "酒泉南大街支行", "value": 15 }, { "name": "酒泉西大街支行", "value": 15 }, { "name": "酒泉东大街支行", "value": 15 }, { "name": "酒泉解放北路支行", "value": 15 }, { "name": "敦煌支行", "value": 15 }, { "name": "瓜州支行", "value": 15 }, { "name": "玉门支行", "value": 15 }, { "name": "玉门建国路支行", "value": 15 }, { "name": "金塔支行", "value": 15 }, { "name": "阿克塞支行", "value": 15 }, { "name": "肃北支行", "value": 15 }, { "name": "敦煌七里镇支行", "value": 15 }, { "name": "甘肃银行股份有限公司徽县支行", "value": 15 }, { "name": "甘肃银行股份有限公司徽县金源广场小微支行", "value": 15 }, { "name": "甘肃银行股份有限公司成县支行", "value": 15 }, { "name": "甘肃银行股份有限公司康县支行", "value": 15 }, { "name": "甘肃银行股份有限公司两当支行", "value": 15 }, { "name": "甘肃银行股份有限公司西和支行", "value": 15 }, { "name": "甘肃银行股份有限公司礼县支行", "value": 15 }, { "name": "甘肃银行股份有限公司文县支行", "value": 15 }, { "name": "甘肃银行股份有限公司宕昌支行", "value": 15 }, { "name": "甘肃银行股份有限公司武都支行", "value": 15 }, { "name": "西关支行", "value": 15 }, { "name": "西城路支行", "value": 15 }, { "name": "红旗街支行", "value": 15 }, { "name": "中山街支行", "value": 15 }, { "name": "解放北路支行", "value": 15 }, { "name": "解放路支行", "value": 15 }, { "name": "柳湖路支行", "value": 15 }, { "name": "东关支行", "value": 15 }, { "name": "汽车西站支行", "value": 15 }, { "name": "崆峒中路支行", "value": 15 }, { "name": "工业园区支行", "value": 15 }, { "name": "崆峒古镇支行", "value": 15 }, { "name": "四十里铺支行", "value": 15 }, { "name": "华亭支行", "value": 15 }, { "name": "华亭新区支行", "value": 15 }, { "name": "崇信支行", "value": 15 }, { "name": "庄浪支行", "value": 15 }, { "name": "庄浪西关支行", "value": 15 }, { "name": "灵台支行", "value": 15 }, { "name": "静宁支行", "value": 15 }, { "name": "静宁西街支行", "value": 15 }, { "name": "泾川支行", "value": 15 }, { "name": "泾川广场支行", "value": 15 }, { "name": "民勤支行", "value": 15 }, { "name": "古浪支行", "value": 15 }, { "name": "天祝支行", "value": 15 }, { "name": "武威北关支行", "value": 15 }, { "name": "武威新区支行", "value": 15 }, { "name": "武威南关东路支行", "value": 15 }, { "name": "武威天马路支行", "value": 15 }, { "name": "甘肃银行股份有限公司县府街支行", "value": 15 }, { "name": "甘肃银行股份有限公司民乐支行", "value": 15 }, { "name": "甘肃银行股份有限公司高台支行", "value": 15 }, { "name": "甘肃银行股份有限公司山丹支行", "value": 15 }, { "name": "甘肃银行股份有限公司临泽支行", "value": 15 }, { "name": "甘肃银行股份有限公司张掖西关支行", "value": 15 }, { "name": "甘肃银行股份有限公司张掖中心广场支行", "value": 15 }, { "name": "甘肃银行股份有限公司张掖东街支行", "value": 15 }, { "name": "渭源支行", "value": 15 }, { "name": "陇西支行", "value": 15 }, { "name": "陇西文峰支行", "value": 15 }, { "name": "临洮支行", "value": 15 }, { "name": "临洮洮阳支行", "value": 15 }, { "name": "通渭支行", "value": 15 }, { "name": "岷县支行", "value": 15 }, { "name": "漳县支行", "value": 15 }, { "name": "定西火车站支行", "value": 15 }, { "name": "定西西岩路支行", "value": 15 }, { "name": "定西新城支行", "value": 15 }, { "name": "酒钢支行", "value": 15 }, { "name": "和诚支行", "value": 15 }, 
            // msprov value 40
            { "name": "白银分行营业部", "value": 15 }, 
            { "name": "庆阳分行营业部", "value": 15 },
            { "name": "甘南藏族自治州营业室", "value": 15 },
            { "name": "天水分行营业部", "value": 15 }, 
            { "name": "临夏团结北路支行", "value": 15 },
            { "name": "金昌支行营业室", "value": 15 }, 
            { "name": "酒泉分行", "value": 15 }, 
            { "name": "甘肃银行股份有限公司陇南分行营业部", "value": 15 }, 
            { "name": "平凉分行营业部", "value": 15 }, 
            { "name": "武威分行营业室", "value": 15 }, 
            { "name": "甘肃银行股份有限公司张掖分行营业部", "value": 15 }, 
            { "name": "定西分行营业部", "value": 15 }, 
            { "name": "嘉峪关迎宾东路支行", "value": 15 },
            //各区
            { name: '兰州', value: 40},
            { name: '嘉峪关', value: 40},
            { name: '金昌', value: 40},
            { name: '白银', value: 40},
            { name: '天水', value: 40},
            { name: '武威', value: 40},
            { name: '张掖', value: 40},
            { name: '平凉', value: 40},
            { name: '酒泉', value: 40},
            { name: '庆阳', value: 40},
            { name: '定西', value: 40},
            { name: '陇南', value: 40},
            { name: '临夏', value: 40},
            { name: '甘南', value: 40}
        ]
      ),
      scrollListData:[
        //v1 网点 v3 自助设备数
        { 
          branch_id: '***',
          record_stamp:0,
          trade_amount:0
          // debit_flag
        }
      ]
    }
  }
  componentWillUnmount(){
    clearInterval(this.flagZT);
    this.flagZT=null; 
    clearInterval(this.flagZTBoBao);
    this.flagZTBoBao=null;
    this.ZD_type=null;
    this.ZD_branch=null;
  }
  componentDidMount() {
    let self=this;
    //核心数据机构数 柜员数
    self.getZTData();
    //网点、员工数
    self.getODSData1Day();
    //时间段 渠道 电子银行 占比
    self.getZTPie();
    //各个支行当前一分钟内大额交易播报
    self.getAllBoBaoType();
    self.flagZT = setInterval(self.getZTData, window.locationConfig.ZTInterface.interface.linkLogin.loopTime);
    self.flagZTBoBao = setInterval(self.getAllBoBaoType, window.locationConfig.ZTInterface.interface.gsprovBoBao.loopTime);
  }
  getZTData=()=>{
    let startTime=moment().subtract(20,'minutes').format("YYYY-MM-DD HH:mm:ss");
    let endTime=moment().format("YYYY-MM-DD HH:mm:ss");
    Tools.fetchGet(
        window.locationConfig.ZTInterface.interface.gsprovCore.address+`?appId=100001003C0C7F496BAD9AF03F0CB47F3478CB390`,
{ 'Content-Type': 'application/json' },
this.handleCoreData
);
// 实时交易曲线
Tools.fetchGet(
    window.locationConfig.ZTInterface.interface.gsprovCore.addressTimeLine+`?startTime=${startTime}&endTime=${endTime}&appId=100001003C0C7F496BAD9AF03F0CB47F3478CB390&tableName=1&interval=1`,
    { 'Content-Type': 'application/json' },
    this.handleCoreLine
);
//机构数 柜员数
Tools.fetchGet(window.locationConfig.ZTInterface.interface.linkLogin.address + '?interval=1&time=0',
    { 'Content-Type': 'application/json' },
    this.updateZTData
);
}
  handleCoreData=(d)=>{
      // console.log(d.content.result);
      let {
        aveg_time,
        // rp_rate,
        succ_rate,
        total_trade_amount,
        total_trade_count,
        total_trade_count_before_top,
        total_trade_count_cmp,
        // total_trade_count_cmp5,
        tps,
        // trade_count
      }=d.content.result
      this.setState(
        {
            total_trade_count,
            total_trade_count_before_top,
            total_trade_count_cmp,
            total_trade_amount,
            lsjyje:1,
            zrtb2:1,
            //仪表盘
            aveg_time,
            succ_rate,
            tps
        }
      )
  }
  handleCoreLine=(d)=>{
    let threeArr=d.content.lines;
    let totalArr=new Array();
    // 生产
    let MasterArr=new Array();
    //灾备
    let SlaveArr=new Array();
    threeArr.forEach(
      (o)=>{
          if(o['zone']==="Master"){
            MasterArr.push({time:o["record_time"].slice(0,5),value:o["trade_count"]});
          }else if(o['zone']==="Slave"){
            SlaveArr.push({time:o["record_time"].slice(0,5),value:o["trade_count"]});
          }else{
            totalArr.push({time:o["record_time"].slice(0,5),value:o["trade_count"]});
          }
      }
    )
    this.setState(
      {
        trendLine:DataCreater.trendLine(totalArr,MasterArr,SlaveArr)
      }
    )
    // console.log(threeArr);
  }
  //获取所有type 
  getAllBoBaoType=()=>{
    // 定时取数 清空
    this.ZD_branch.length=0;
    this.ZD_type.forEach(
      (type)=>{
        Tools.fetchGet(
          window.locationConfig.ZTInterface.interface.gsprovBoBao.address+`?type=${type}`,
          { 'Content-Type': 'application/json' },
          this.handleBoBao
        )
      }
    )
  }
  handleBoBao=(d)=>{
    let self=this;
    let data=d.content.reuslt;
    //过滤掉清算中心，一级分行
    data.map(
      (obj)=>{
        if(obj['trade_amount']){
          self.ZD_branch.push(obj);
        }
      }
    )
    //排除交易额为0小于50000的
    let scrollListData=new Array();
    let len=self.ZD_branch.length;
    for(let i=0;i<len;i++){
      self.ZD_branch[i].trade_amount>=50000?scrollListData.push(self.ZD_branch[i]):'';
      // console.log(`${self.ZD_branch[i].branch_id}:${self.ZD_branch[i].trade_amount}`);
    }
    scrollListData.sort(self.compare("trade_amount"));
    // console.log(scrollListData);
    let top10=new Array();
    scrollListData.forEach(
      (o)=>{
        let n=o.branch_id.slice(10,o.branch_id.length);
        if(n==="营业部"){n="总行营业部"};
        top10.push({name:n,value:o.trade_amount,time:o.record_stamp})
      }
    );
    top10.sort(self.compare("value"));
    let top10Time=top10.length>0?top10[0]['time']:moment().format("YYYY-MM-DD HH:mm:ss");
    self.setState(
      {
        scrollListData,
        top10Time,
        netTop10:DataCreater.netTop10Bar(top10.slice(0,10)),
      }
    );
  }
  // 自定义处理方法
  compare=(prop)=>{
    return function(a,b){
        return parseFloat(b[prop])-parseFloat(a[prop]);
    }
  }
  handleZTData=(oriData,myArr)=>{
    for(let key in oriData){
      myArr.push(
        {
          name:key,
          value:oriData[key][0].trade_count
        }
      )
    }
    return myArr
  }
  getZTPie=()=>{
    if (window.locationConfig.debug) {
    } else {
      Tools.fetchGet(window.locationConfig.ZTInterface.interface.gsprovPie.address,
        { 'Content-Type': 'application/json' },
        this.updateZTPie);
      Tools.fetchGet(window.locationConfig.ZTInterface.interface.gsprovPie.addressTimePie+"?appId=100001003C0C7F496BAD9AF03F0CB47F3478CB390",
        { 'Content-Type': 'application/json' },
        this.updateZTtimePie);
    }
  }
  updateZTPie=(d)=>{
    let wayData=d.content.result.channel;
    let eBankData=d.content.result.eBank;
    this.setState(
      {
        wayPie:DataCreater.createPie(this.handleZTData(wayData,[])),
        eBankPie:DataCreater.createPie(this.handleZTData(eBankData,[]))
      }
    );
  }
  updateZTtimePie=(d)=>{
    let timeObj=d.content.result;
    let timeArr=new Array();
    let time,timeFormat;
    for(let key in timeObj){
      time=key.slice(0,2);
      timeFormat=time==="08"?"0-8时":time==="16"?"8-16时":time==="24"?"16-24时":time;
      timeArr.push({name:timeFormat,value:timeObj[key]})
    }
    // console.log(timeArr);
    this.setState(
      {
        timePie:DataCreater.createPie(timeArr)
      }
    );
    
  }
  updateZTData = (data) => {
    // let lianjie = Number(data.content.echartsData.line1[0]);
    let dlgy = Number(data.content.echartsData.line2[0]);
    let qdjg = Number(data.content.echartsData.brno_num);
    this.setState({dlgy,qdjg});
  }
  //网点、员工数
  getODSData1Day = () => {
    if (window.locationConfig.debug) {
    } else {
      let startTStr = moment().subtract(1, 'days').format("YYYY-MM-DD 00:00:00");
      let endTStr = moment().format("YYYY-MM-DD HH:mm:ss");
      Tools.fetchGet(window.locationConfig.TGInterface.interface.ods.address + "?subname=营业网点数,全行员工数&startTime=" + startTStr + "&endTime=" + endTStr,
        { 'Content-Type': 'application/json' },
        this.updateODSData1Day);
    }
  }
  updateODSData1Day=(data)=>{
    let odsD = data[0].ODSData;
    let netNumer,employeeNumber;
    odsD.forEach(
      (obj,index)=>{
          // netNumer=obj.subname="营业网点数"?obj.value:0;
          // employeeNumber=obj.subname="全行员工数"?obj.value:0;
          if(obj.subname==="营业网点数"){
            netNumer=(obj.value*1).toLocaleString();
          }
          if(obj.subname==="全行员工数"){
            employeeNumber=(obj.value*1).toLocaleString();
          }
      }
    )
    // console.log(netNumer+'\n'+Number(employeeNumber).toLocaleString());
    this.setState({netNumer,employeeNumber})
  }
  render() {
    // console.log( this.state.netTop10);
    //同比img
    let arrowUp = window.dominContext.staticPath + '/assets/images/gsprov/redArrow.png';
    let arrowDown = window.dominContext.staticPath + '/assets/images/gsprov/greenArrow.png';
    return (
      <div className={style.gsprov}>
          <div className={style.bgvideo}>
            <video loop muted autoPlay src={window.dominContext.staticPath + '/assets/videos/common/left02.mp4'}> Your browser does not support the video tag</video>
            <video loop muted autoPlay src={window.dominContext.staticPath + '/assets/videos/common/right02.mp4'}> Your browser does not support the video tag</video>
          </div>
          <div className={style.logo}></div>
          <div className={style.bgline}></div>
          <BaseMap 
            className={style.map}
            option={this.state.mapOption}
            mapName={"gansu"} 
          />
          <div style={{position:"absolute",right:480,top:60}}>
            <sub style={{fontSize:24}}>签到机构数：</sub><span style={{fontSize:48,fontFamily:'Arial Black',fontWeight:'bold'}}>{this.state.qdjg.toLocaleString()}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <sub style={{fontSize:24}}>登录柜员数：</sub><span style={{fontSize:48,fontFamily:'Arial Black',fontWeight:'bold'}}>{this.state.dlgy.toLocaleString()}</span>
          </div>
          <div style={{position:"absolute",right:860,top:600}}>
            <sub style={{fontSize:24}}>营业网点数<span style={{fontSize:48,fontFamily:'Arial Black',fontWeight:'bold'}}>
            {this.state.netNumer}
            </span>家</sub>
            <br/>
            <sub style={{fontSize:24}}>全行共有员工<span style={{fontSize:48,fontFamily:'Arial Black',fontWeight:'bold'}}>
            {this.state.employeeNumber}
            </span>人</sub>
          </div>
          <ImgTitleValue 
            title={"昨日同比"}
            className={style.zrtb1}
            imgClassName={this.state.total_trade_count_cmp>=0?style.arrowUp:style.arrowDown}
            valueClassName={this.state.total_trade_count_cmp>=0?style.red:style.green}
            imgSrc={this.state.total_trade_count_cmp>=0?arrowUp:arrowDown}
            value={Math.abs(this.state.total_trade_count_cmp).toFixed(3)+'%'}
          />
          <TitleValueCountUp
            style={{position:'absolute',top:280,right:3373}}
            titleStyle={{fontSize: 24,float:"left",paddingTop:14,paddingRight:20,color:'#6fc4f5'}}
            valueClassName={style.value2}
            valueStyle={{disply:'block',float:"right"}}
            title={`历史峰值日`}
            value={this.state.total_trade_count_before_top}
            decimals={0}
          />
          <TitleValueCountUp
            style={{position:'absolute',top:187,left:496}}
            titleStyle={{fontSize: 24,marginBottom:20,textAlign:"center"}}
            valueClassName={style.value1}
            title={`当日核心交易笔数`}
            value={this.state.total_trade_count}
            decimals={0}
            duration={3}
            // suffix={`<b style=font-size:50px>笔</b>`}
          />
          <TitleValueCountUp
            style={{position:'absolute',top:187,left:1000}}
            titleStyle={{fontSize: 24,marginBottom:20,textAlign:"center"}}
            valueClassName={style.value1}
            title={`当日交易金额`}
            value={this.state.total_trade_amount}
            decimals={0}
            duration={3}
            prefix={`<b style=font-size:65px;font-family:'monospace'>￥&nbsp;</b>`}
          />
          <p style={{position:'absolute',top:700,left:100,fontSize:24}}>交易量实时变化趋势</p>
          <Chart
              style={{position:'absolute',top:740,left:40,width:950,height:300,borderRadius:35,borderBottom:'1px solid gray',boxShadow: "inset 0px 0px 144px 0px rgba(0, 0, 0, 0.63)"}}
              option={this.state.trendLine}
          />
          <ItemGauge 
            title={`交易耗时`}
            sub={`ms`}
            subStyle={{fontSize:15}}
            style={{position:"absolute",left:450,top:400,width:250,height:250}}
            data={{r:110,min:0,max:100,value:(this.state.aveg_time*1).toFixed(1),radian:240}}
          />
          <ItemGauge 
            title={`成功率`}
            sub={`%`}
            subStyle={{fontSize:15}}
            style={{position:"absolute",left:820,top:400,width:250,height:250}}
            data={{r:110,min:0,max:100,value:(this.state.succ_rate*1).toFixed(1),radian:240}}
          />
          <ItemGauge 
            title={`TPS`}
            sub={`(笔/秒)`}
            subStyle={{fontSize:15}}
            style={{position:"absolute",left:1200,top:400,width:250,height:250}}
            data={{r:110,min:0,max:100,value:Math.ceil(this.state.tps),radian:240}}
          />
          <TitleChart 
            style={{position:"absolute",left:1010,top:740,width:350,height:300}}
            titleStyle={{position:'absolute',top:0,left:0,width:'100%',textAlign:'center',fontSize:24}}
            chartStyle={{position:'absolute',left:0,bottom:0,width:350,height:250}}
            title={`交易时间段占比`}
            option={this.state.timePie}     
          />
          <TitleChart 
            style={{position:"absolute",left:1380,top:740,width:360,height:300}}
            titleStyle={{position:'absolute',top:0,left:0,width:'100%',textAlign:'center',fontSize:24}}
            chartStyle={{position:'absolute',left:0,bottom:0,width:360,height:250}}
            title={`交易渠道占比`}
            option={this.state.wayPie}     
          />
          <TitleChart 
            style={{position:"absolute",left:1740,top:740,width:400,height:300}}
            titleStyle={{position:'absolute',top:0,left:0,width:'100%',textAlign:'center',fontSize:24}}
            chartStyle={{position:'absolute',left:0,bottom:0,width:400,height:250}}
            title={`电子银行占比`}
            option={this.state.eBankPie}     
          />
          {
            this.state.netTop10.series[0].data.length>0?
            <TitleChart
              className={style.netTop10}
              titleStyle={{width:'100%',fontSize:24}}
              chartStyle={{width:"100%",height:400}}
              title={`营业网点交易TOP10`}
              titleStylesm={{fontSize:14,fontStyle:"italic",color:"#cccccc"}}
              title_sm={`(${this.state.top10Time})`}
              option={this.state.netTop10}
           />:null
          }
          <div style={{position:"absolute",right:90,top:170,width:520}} >
              <div style={{fontSize:24,marginBottom:30,fontSize:36,fontWeight:'bold',textShadow:'3px 3px 15px #fff'}}>大额交易播报</div>
             {
               this.state.scrollListData.length>0?
              <ScrollList 
                className={style.bobao}
                style={{ width:520,height:210,marginTop:20}}
                itemClass={ListItem}
                arrData={this.state.scrollListData}
                pageCount={2}
                autoPlay={true}
                loop={true}
                delay={3000}
                actionDelay={1500}
                dir={-1}
                moveDis={1}
                itemH={105}//子组件改
              />:null
             }
          </div>
      </div>
    )
  }
}