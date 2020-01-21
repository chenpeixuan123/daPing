import React, { Component } from 'react'
import style from './style.css';
import style1 from './style1.css';
import TitleChart from 'components/common/TitleChart';
import ItemGauge from './components/ItemGauge';
import TitleValueCountUp from 'components/common/TitleValueCountUp';
import DataCreater from './DataCreater';
import moment from 'moment';
import Tools from 'utils/Tools';
import CodeToBank from 'utils/CodeToBank';
import Loading from 'components/loading/Loading';

// import OneVideo from 'components/common/OneVideo';
export default class Branchold extends Component {
  constructor(props) {
    super(props);
    window.share.resetPageSize(1916, 1076);
    // 右侧4个结构
    this.zcID=["I0030094","I0030044","I0030093","I0030045","I0037001","I0030095"];
    this.zcColor=["#abfbfa","#77e6e5","#4cccca","#31b0ad","#15908d","#017c6f"];
    this.fzID=["I0030051","I0030092","I0030075","I0030054","I0037002","I0030053"];
    this.fzColor=["#f5dfa6","#fed97f","#e5c372","#dcb149","#d19810","#bb8402"];
    this.ckID=["I0030098","I10300021","I00300861","I00300841","I0030082","I1030002"];
    this.ckColor=["#89c1fa","#a09bec","#8984e8","#716cde","#635cd6","#4e48be"];
    this.dkID=["I0030037","I0030035","I0030038"];
    this.dkColor=['#2d77c4', '#4f99e8', '#89c1fa'];
    this.zcArr=new Array();
    this.fzArr=new Array();
    this.ckArr=new Array();
    this.dkArr=new Array();
    //资产总额--负债总额---贷款余额、贷款任务完成率---存款余额、存款任务完成率---净利润、净利润完成率(计算当天)
    this.braID=["I0030001","I0030002","I0030006","I0030005","I0030099"];//  I0030099净利润净利润完成率ODS推数异常
    this.formatBranch=new Object();
    // 资产-负债-贷款-存款- 营业利润-营业收入(计算15天各个分行曲线) 分别计算资产增长率 营业利润增长率
    this.bra15DataID=["I0030001","I0030002","I0030006","I0030005","I00300251","I0030025"];
    this.format15Branch={
      "甘肃银行股份有限公司":{
        "资产总额":[],
        "负债总额":[],
        "资产总额时间":[],
        "存款余额":[],
        "贷款余额":[],
        "存款余额时间":[],
        "营业利润":[],
        "营业利润时间":[],
        "营业收入":[],
        "营业收入时间":[]
      }
    };
    // 查找 formatBranch format15Branch 中的key 展示
    this.oneByOne=[
      // "甘肃银行股份有限公司",
      // "甘肃银行股份有限公司张掖分行(一级分支行)",
      // "甘肃银行股份有限公司甘南分行(一级分支行)",
      // "甘肃银行股份有限公司武威分行(一级分支行)",
      // "甘肃银行股份有限公司临夏分行(一级分支行)",
      // "甘肃银行股份有限公司陇南分行(一级分支行)",
      // "甘肃银行股份有限公司金昌支行(一级分支行)",
      // "甘肃银行股份有限公司嘉峪关分行(一级分支行)",
      // "甘肃银行股份有限公司定西分行(一级分支行)",
      // "甘肃银行股份有限公司酒泉分行(一级分支行)",
      // "甘肃银行股份有限公司天水分行(一级分支行)",
      // "甘肃银行股份有限公司庆阳分行(一级分支行)",
      // "甘肃银行股份有限公司白银分行(一级分支行)",
      // "甘肃银行股份有限公司平凉分行(一级分支行)",
      // "甘肃银行股份有限公司兰州市兴陇支行(一级分支行)",
      // "甘肃银行股份有限公司兰州新区支行(一级分支行)",
      // "甘肃银行股份有限公司兰州市西固支行(一级分支行)",
      // "甘肃银行股份有限公司兰州市安宁支行(一级分支行)",
      // "甘肃银行股份有限公司兰州市高新支行(一级分支行)",
      // "甘肃银行股份有限公司兰州市城关支行(一级分支行)",
      // "甘肃银行股份有限公司兰州市七里河支行(一级分支行)",
      // "甘肃银行股份有限公司兰州市中央广场支行(一级分支行)",
      // "甘肃银行股份有限公司营业部(一级分支行)"
    ];
    this.state = {
      zichanzonge:0,
      zichanzongeRadio:0,
      fuzhaizonge:0,
      fuzhaizongeRadio:0,
      jingzichanyue:0,
      jingzichanyueRadio:0,
      index:0,
      cunkuanTop10:DataCreater.top10([{ name: "", value: '' }]),
      daikuanTop10:DataCreater.top10([{ name: "", value: '' }]),
      details:{
        "时间":1,//用于判断1
        "名称":"甘肃银行股份有限公司",
        "资产总额":[0],
        "负债总额":0,
        "贷款余额":0,
        "存款余额":0,
        "净利润":0,
        // "资产增长率":0,
        "利润完成率":0,
        "贷款任务完成率":0,
        "存款任务完成率":0,
        "营业利润":0,
        "营业收入":0,
      },
      detailsLine:{
        zcLev:0,
        ysLev:0,
        zcfzLine:{
          zc:[],
          fz:[],
          time:[],
        },
        ckdkLine:{
          ck:[],
          dk:[],
          time:[]
        },
        //净利润趋势分析
        ylTrend:{
          yl:[],
          time:[],
        },
        // 营收趋势分析
        ysTrend:{
          ys:[],
          time:[]
        }
      },
      //msprov 资产结构{time: "2018-06-13T01:51:00Z", subname: "对公存款", name: "I0006", value: "1"}
      zcJieGou:DataCreater.jieGouPie([]),
      fzJieGou:DataCreater.jieGouPie([]),
      dkJieGou:DataCreater.jieGouPie2([]),
      ckJieGou:DataCreater.jieGouPie2([])
    }
  }
  componentWillUnmount() {
    this.timer&&clearInterval(this.timer);
    this.timer=null;
    this.zcID=null;
    this.zcColor=null;
    this.fzID=null;
    this.fzColor=null;
    this.ckID=null;
    this.ckColor=null;
    this.dkID=null;
    this.dkColor=null;
    this.zcArr=null;
    this.fzArr=null;
    this.ckArr=null;
    this.dkArr=null;
    this.braID=null;
    this.formatBranch=null;
    this.oneByOne=null;
    this.bra15DataID=null;
    this.format15Branch=null;
  }
  componentDidMount() {
    let self=this;
    //// 获取15天所有数据
    self.bra15DataID.forEach(
      (v)=>{
        Tools.fetchGet(
          window.locationConfig.TGTest.branch.address17+`{"name":"${v}"}`,
          { 'Content-Type': 'application/json' },
          self.up15Data
        )
      }
    )
    // 各各个分行数据
    self.braID.forEach(
      (v)=>{
        Tools.fetchGet(
          window.locationConfig.TGTest.customer.address12+`{"name":"${v}"}`,
          { 'Content-Type': 'application/json' },
          self.upDateBrach
        )
      }
    )
    //// 右侧结构
    self.zcID.forEach(
      (v)=>{
        Tools.fetchGet(
          window.locationConfig.TGTest.customer.address12+`{"name":"${v}"}`,
          { 'Content-Type': 'application/json' },
          self.upDatezcArr
        )
      }
    )
    self.fzID.forEach(
      (v)=>{
        Tools.fetchGet(
          window.locationConfig.TGTest.customer.address12+`{"name":"${v}"}`,
          { 'Content-Type': 'application/json' },
          self.upDatefzArr
        )
      }
    )
    self.ckID.forEach(
      (v)=>{
        Tools.fetchGet(
          window.locationConfig.TGTest.customer.address12+`{"name":"${v}"}`,
          { 'Content-Type': 'application/json' },
          self.upDateckArr
        )
      }
    )
    self.dkID.forEach(
      (v)=>{
        Tools.fetchGet(
          window.locationConfig.TGTest.customer.address12+`{"name":"${v}"}`,
          { 'Content-Type': 'application/json' },
          self.upDatedkArr
        )
      }
    )
    //// 两天资产总额,负债总额,净资产余额对比
    self.sd;
    self.getODSData2Day();
    self.timer=setInterval(self.start,30000);
  }
  sd=()=>{
    console.log(self.state.index)
  }
  start=()=>{
    let self=this;
    let index=self.state.index;
    if(index<self.oneByOne.length){
      let details=self.formatBranch[self.oneByOne[index]];
      let detailsLine={
        zcLev:self.format15Branch[self.oneByOne[index]]['资产增长率'],
        ysLev:self.format15Branch[self.oneByOne[index]]['营业利润增长率'],
        zcfzLine:{
          zc:self.format15Branch[self.oneByOne[index]]['资产总额'],
          fz:self.format15Branch[self.oneByOne[index]]['负债总额'],
          time:self.format15Branch[self.oneByOne[index]]['资产总额时间'],
        },
        ckdkLine:{
          ck:self.format15Branch[self.oneByOne[index]]['存款余额'],
          dk:self.format15Branch[self.oneByOne[index]]['贷款余额'],
          time:self.format15Branch[self.oneByOne[index]]['存款余额时间'],
        },
        //净利润趋势分析
        ylTrend:{
          yl:self.format15Branch[self.oneByOne[index]]['营业利润'],
          time:self.format15Branch[self.oneByOne[index]]['营业利润时间']
        },
        // 营收趋势分析
        ysTrend:{
          ys:self.format15Branch[self.oneByOne[index]]['营业收入'],
          time:self.format15Branch[self.oneByOne[index]]['营业收入时间']
        }
      };
      self.setState({index:index+1,details,detailsLine});
    }else{
      let details=self.formatBranch[self.oneByOne[0]];
      let detailsLine={
        zcLev:self.format15Branch[self.oneByOne[0]]['资产增长率'],
        ysLev:self.format15Branch[self.oneByOne[0]]['营业利润增长率'],
        zcfzLine:{
          zc:self.format15Branch[self.oneByOne[0]]['资产总额'],
          fz:self.format15Branch[self.oneByOne[0]]['负债总额'],
          time:self.format15Branch[self.oneByOne[0]]['资产总额时间'],
        },
        ckdkLine:{
          ck:self.format15Branch[self.oneByOne[0]]['存款余额'],
          dk:self.format15Branch[self.oneByOne[0]]['贷款余额'],
          time:self.format15Branch[self.oneByOne[0]]['存款余额时间'],
        },
        //净利润趋势分析
        ylTrend:{
          yl:self.format15Branch[self.oneByOne[0]]['营业利润'],
          time:self.format15Branch[self.oneByOne[0]]['营业利润时间']
        },
        // 营收趋势分析
        ysTrend:{
          ys:self.format15Branch[self.oneByOne[0]]['营业收入'],
          time:self.format15Branch[self.oneByOne[0]]['营业收入时间']
        }
      };
      self.setState({index:1,details,detailsLine});
    }
  }
  // 曲线
  up15Data=(d)=>{
    let self=this;
    let ODSData=d.datas[0];
    let everyArr=ODSData['data']||[];
    everyArr.forEach(
      (obj)=>{
        let id=obj.subname.match(/\d+/g)[0];//各个分行
        let sub=obj.subname.slice(id.length,obj.subname.length);//分行指标
        let idname=CodeToBank[id];//id=>分行名称
        if( self.format15Branch[idname]===undefined){
          self.format15Branch[idname]=new Object();
        }
        if( self.format15Branch[idname][sub]===undefined){
          self.format15Branch[idname][sub]=new Array();
        }
        self.format15Branch[idname][sub+"时间"]= self.format15Branch[idname][sub+"时间"]
        if( self.format15Branch[idname][sub+"时间"]===undefined){
          self.format15Branch[idname][sub+"时间"]=new Array();
        }
        self.format15Branch[idname]['名称']=idname;
        /*let time1 = obj.time;
          time1 = time1 - 1209600000;
        let value = obj.value;
          for(let i = 0; i <14; i++){
              let sj = Math.ceil(Math.random()*2);
              let sjs = Math.ceil(Math.random()*value/1000);
              if(sj == 1){
                  value = value - sjs;
              }else{
                  value = value + sjs;
              }
              time1 = time1 + 86400000;
              self.format15Branch[idname][sub].push(value);
              self.format15Branch[idname][sub+"时间"].push(moment(time1).format("MM/DD"));
          }*/
          self.format15Branch[idname][sub+"时间"].push(moment(obj.time).format("MM/DD"));
          self.format15Branch[idname][sub].push(obj.value);
      }
    )

    // 计算资产增长率 和 营业利润增长率
    for(let key in self.format15Branch){
      let zcArr=self.format15Branch[key]['资产总额']||[];
      let cur=zcArr[zcArr.length-1]||0;
      let yes=zcArr[zcArr.length-2]||0;
      self.format15Branch[key]['资产增长率']=yes===0?1:(cur-yes)/yes;
      let ylArr=self.format15Branch[key]['营业利润']||[];
      let cur2=ylArr[ylArr.length-1]||0;
      let yes2=ylArr[ylArr.length-2]||0;
      self.format15Branch[key]['营业利润增长率']=yes2===0?1:(cur2-yes2)/yes2;
    }
    // console.log(self.format15Branch);
  }
  // 各个分行
  upDateBrach=(d)=>{
    let self=this;
    let ODSData=d.datas;
    let everyArr=ODSData.length>0?ODSData[0]["data"]:null;
    everyArr&&everyArr.forEach(
        (obj)=>{
          let id=obj.subname.match(/\d+/g)[0];
          let sub=obj.subname.slice(id.length,obj.subname.length);
          // 格式化各分行的数据存储到对象中
          let idname=CodeToBank[id];
          self.oneByOne.push(idname);
          if(self.formatBranch[idname]===undefined){
            self.formatBranch[idname]=new Object();
          }
          if(self.formatBranch[idname][sub]===undefined){self.formatBranch[idname][sub]=new Array()}
          self.formatBranch[idname]['名称']=idname;
          self.formatBranch[idname]["时间"]=moment(obj.time).format("YYYY-MM-DD HH:mm:ss");
          self.formatBranch[idname][sub].push(obj.value);
        }
    )
    self.oneByOne=[...new Set(self.oneByOne)];
    // console.log(self.oneByOne);
    // console.log(self.formatBranch);
    let detailsLine={
      zcLev:self.format15Branch[self.oneByOne[0]]['资产增长率'],
      ysLev:self.format15Branch[self.oneByOne[0]]['营业利润增长率'],
      zcfzLine:{
        zc:self.format15Branch[self.oneByOne[0]]['资产总额'],
        fz:self.format15Branch[self.oneByOne[0]]['负债总额'],
        time:self.format15Branch[self.oneByOne[0]]['资产总额时间'],
      },
      ckdkLine:{
        ck:self.format15Branch[self.oneByOne[0]]['存款余额'],
        dk:self.format15Branch[self.oneByOne[0]]['贷款余额'],
        time:self.format15Branch[self.oneByOne[0]]['存款余额时间'],
      },
      //营业利润趋势分析
      ylTrend:{
        yl:self.format15Branch[self.oneByOne[0]]['营业利润'],
        time:self.format15Branch[self.oneByOne[0]]['营业利润时间']
      },
      // 营业收入趋势分析
      ysTrend:{
        ys:self.format15Branch[self.oneByOne[0]]['营业收入'],
        time:self.format15Branch[self.oneByOne[0]]['营业收入时间']
      }
    };
    self.setState(
      {
        daikuanTop10:  DataCreater.top10(self.sortByValue("贷款余额",self.formatBranch)),
        cunkuanTop10:  DataCreater.top10(self.sortByValue("存款余额",self.formatBranch)),
        details:self.formatBranch[self.oneByOne[0]],
        detailsLine
      }
    )
  }
  sortByValue=(condition,oriObject)=>{
    let newArr=[];
    for(let key in oriObject){
      // 处理刚开始没有condition
      let v=oriObject[key][condition]?oriObject[key][condition][0]:0;
      let val=(v/1e8).toFixed(1);//亿元
      let str=key.slice(10,-7);
      if(str==="营业部"){
        newArr.push({name:"总行营业部",value:val});
      }else if(str.indexOf('兰州市')===0){
        newArr.push({name:str.slice(3,str.length),value:val});
      }else if(str){
        newArr.push({name:str,value:val});
      }
    }
    newArr.sort(
      (a,b)=>{
        return b["value"]-a["value"];
      }
    );
    return newArr.slice(0,10);
  }
  //四个结构
  formatSort=(oArr,formatArr)=>{
    let sumValue=0;
    let subname=oArr[0].subname;
    let nowName=subname.slice(subname.match(/\d+/g)[0].length,subname.length);
    for(let i=0;i<oArr.length;i++){
      sumValue+=oArr[i].value*1;
    }
    formatArr.push({subname:nowName,value:sumValue});
    return formatArr;
  }
  upDatezcArr=(d)=>{
    let ODSData=d.datas[0];
    let originArr=ODSData['data']||[];
    this.setState({ zcJieGou:DataCreater.jieGouPie(this.formatSort(originArr,this.zcArr),this.zcColor)});
  }
  upDatefzArr=(d)=>{
    let ODSData=d.datas[0];
    let originArr=ODSData['data']||[];
    this.setState({ fzJieGou:DataCreater.jieGouPie(this.formatSort(originArr,this.fzArr),this.fzColor)});
  }
  upDateckArr=(d)=>{
    let ODSData=d.datas[0];
    let originArr=ODSData['data']||[];
    this.setState({ ckJieGou:DataCreater.jieGouPie2(this.formatSort(originArr,this.ckArr),this.ckColor)});
  }
  upDatedkArr=(d)=>{
    let ODSData=d.datas[0];
    let originArr=ODSData['data']||[];
    this.setState({ dkJieGou:DataCreater.jieGouPie2(this.formatSort(originArr,this.dkArr),this.dkColor)});
  }
  //两天资产总额,负债总额,净资产余额对比
  getODSData2Day = () => {
    if (window.locationConfig.debug) {
    } else {
      let startTStr = moment().subtract(2, 'days').format("YYYY-MM-DD 00:00:00");
      let endTStr = moment().format("YYYY-MM-DD HH:mm:ss");
      Tools.fetchGet(window.locationConfig.TGInterface.interface.ods.address + "?subname=资产总额,负债总额,净资产余额&startTime=" + startTStr + "&endTime=" + endTStr,
        { 'Content-Type': 'application/json' },
        this.updateODSData2Day);
    }
  }
  updateODSData2Day=(data)=>{
    let arr=data[0].ODSData;
    let ODSYesCurAmount={"资产总额":[],"负债总额":[],"净资产余额":[]};
    for (let i = 0; i < arr.length; i++) {
      let o=arr[i];
      if(o.subname == "资产总额" || o.subname == "负债总额" || o.subname == "净资产余额"){
          ODSYesCurAmount[o.subname].push(Number(   o.value));
      }
    }
    for(let key in ODSYesCurAmount){
      let oneArr=ODSYesCurAmount[key];
      let len=oneArr.length;
      if(key==="资产总额"){
        if(len===1){
          this.setState({zichanzonge:oneArr[0]/1e8,zichanzongeRadio:10})
        }else{
          let curNum=oneArr[len-1]/1e8;
          let yesNum=oneArr[len-2]/1e8;
          this.setState(
            {
              zichanzonge:curNum,
              zichanzongeRadio:curNum-yesNum,
            }
          )
        }
      }else if(key==="负债总额"){
        if(len===1){
          this.setState({fuzhaizonge:oneArr[0]/1e8,fuzhaizongeRadio:0})
        }else{
          let curNum=oneArr[len-1]/1e8;
          let yesNum=oneArr[len-2]/1e8;
          this.setState(
            {
              fuzhaizonge:curNum,
              fuzhaizongeRadio:curNum-yesNum
            }
          )
        }
      }else{
        if(len===1){
          this.setState({jingzichanyue:oneArr[0]/1e8,jingzichanyueRadio:0})
        }else{
          let curNum=oneArr[len-1]/1e8;
          let yesNum=oneArr[len-2]/1e8;
          this.setState(
            {
              jingzichanyue:curNum,
              jingzichanyueRadio:curNum-yesNum
            }
          )
        }
      }
    }
  }
  /*显示和影藏右下角菜单*/
  pageup() {
    var box = document.getElementById("pageShow");
    if (box.style.display === "none") {
      box.style.display = "block";
    } else {
      box.style.display = "none";
    }
  }

  /*向右打开菜单导航和切换图标*/
  turnRight = (name, e) => {
    var box = document.getElementById("menu");
    if (name === "imgleft") {
      box.style.display = "block";  //打开菜单 ri左
      document.getElementById("imgleft").style.display = "block";//影藏左边按钮
      document.getElementById("imgright").style.display = "none";//显示右边按钮
    } else if (name === "imgright") {
      box.style.display = "none";  //关闭菜单
      document.getElementById("imgleft").style.display = "none";//显示左边按钮
      document.getElementById("imgright").style.display = "block";//影藏右边按钮
    }
  }


  funPrev(name, e){
    window.open(name,'_self');
  }
  closeWindows() {
    open(location, '_self').close();
    // window.open(window.location.href).close();

    /* debugger
     var browserName = navigator.appName;
     var browserVer = parseInt(navigator.appVersion);
     //alert(browserName + " : "+browserVer);

     //document.getElementById("flashContent").innerHTML = "<br>&nbsp;<font face='Arial' color='blue' size='2'><b> You have been logged out of the Game. Please Close Your Browser Window.</b></font>";

     if(browserName == "Microsoft Internet Explorer"){
         var ie7 = (document.all && !window.opera && window.XMLHttpRequest) ? true : false;
         if (ie7)
         {
             //This method is required to close a window without any prompt for IE7 & greater versions.
             window.open('','_parent','');
             window.close();
         }
         else
         {
             //This method is required to close a window without any prompt for IE6
             this.focus();
             self.opener = this;
             self.close();
         }
     }else{
         //For NON-IE Browsers except Firefox which doesnt support Auto Close
         try{
             this.focus();
             self.opener = this;
             self.close();
         }
         catch(e){

         }

         try{
             window.open('','_self','');
             window.close();
         }
         catch(e){

         }
     }*/
  }
  qh(e){
    console.log(e.target.innerText);
    var titleName = e.target.innerText;
    // this.state.details.名称.==titleName


  }

  render() {
    let det = this.state.details;
    let leftBg = window.dominContext.staticPath + '/assets/images/branch/leftBg.png';
    let rotateCircle = window.dominContext.staticPath + '/assets/images/branch/rotateCircle.png';
    let bgSeat = window.dominContext.staticPath + '/assets/images/branch/bgSeat.png';
    let downArrow = window.dominContext.staticPath + '/assets/images/branch/downArrow.png';
    let upArrow = window.dominContext.staticPath + '/assets/images/branch/upArrow.png';
    let zcgm = window.dominContext.staticPath + '/assets/images/branch/zcgm.png';

    let imgright = window.dominContext.staticPath + '/assets/images/branch/imgright.png';
    let imgleft = window.dominContext.staticPath + '/assets/images/branch/imgleft.png';
    let menul1 = window.dominContext.staticPath + '/assets/images/branch/menu.png';
    let MSProv2 = window.dominContext.staticPath + '/#/MSProv2';
    const arrtitle = [
      "甘肃银行股份有限公司",
      "甘肃银行股份有限公司营业部",
      "张掖分行",
      "甘南分行",
      "武威分行",
      "临夏分行",
      "陇南分行",
      "金昌支行",
      "嘉峪关分行",
      "定西分行",
      "酒泉分行",
      "天水分行",
      "庆阳分行",
      "白银分行",
      "平凉分行",
      "兰州市兴陇支行",
      "兰州新区支行",
      "兰州市西固支行",
      "兰州市安宁支行",
      "兰州市高新支行",
      "兰州市城关支行",
      "兰州市七里河支行",
      "兰州市中央广场支行"
    ];

    const arrnew = [];
    arrtitle.forEach(item => {
      arrnew.push(<div className={style1.btit} key={item} onClick={this.qh}>{item}</div>)
    })
    return (
      <div className={style.BranchIndex}>
        <div className={style1.menu} id='menu' style={{display: "none"}}>
          {arrnew}
        </div>
        {/*向右图标*/}
        <div className={style1.imgright} id='imgright' onClick={this.turnRight.bind(this, 'imgleft')}>
          <img src={imgright} id="tb"></img>
        </div>
        <div className={style1.imgleft} id='imgleft' onClick={this.turnRight.bind(this, 'imgright')}
             style={{display: 'none'}}>
          <img src={imgleft} id="tb"></img>
        </div>
        <div className={style.bgvideo}>
          <video style={{width:'100%',height:'100%'}} loop muted autoPlay src={window.dominContext.staticPath + '/assets/videos/common/right01.mp4'}> Your browser does not support the video tag</video>
          {/*<video loop muted autoPlay src={window.dominContext.staticPath + '/assets/videos/common/left01.mp4'}> Your browser does not support the video tag</video>*/}
        </div>
       {/* <TitleChart
            style={{position:'absolute',left:686,top:40,width: 594, height: 175}}
            titleStyle={{position:'absolute',top:0,left:0,fontSize:24,width:'100%',textAlign:"center"}}
            chartStyle={{ width: 594, height: 175}}
            title={`营业收入趋势分析`}
            option={DataCreater.ysTrend(this.state.detailsLine.ysTrend)}
        />*/}
        <TitleChart
            style={{position:'absolute',left:836,top:40,width: 1000, height: 190}}
            titleStyle={{position:'absolute',top:0,left:0,fontSize:24,width:'100%',textAlign:"center"}}
            chartStyle={{ width: 1000, height: 190}}
            title={`营业利润趋势分析`}
            option={DataCreater.ylTrend(this.state.detailsLine.ylTrend)}
        />

        <h3 style={{fontSize:22,position:"absolute",fontFamily: '微软雅黑',fontWeight: 'bold',top:746,left:134}}>分行贷款TOP10<span style={{fontSize:'16px',fontFamily: '微软雅黑',fontWeight: 'bold'}}>(亿元)</span></h3>
        <h3 style={{fontSize:22,position:"absolute",fontFamily: '微软雅黑',fontWeight: 'bold',top:746,left:479}}>分行存款TOP10<span style={{fontSize:'16px',fontFamily: '微软雅黑',fontWeight: 'bold'}}>(亿元)</span></h3>

        <TitleChart
            style={{ width: 359, height: 331,position:'absolute',left:64,bottom:23,zIndex:9}}
            titleStyle={{position:'absolute',top:0,left:0,fontSize:24,width:'100%',textAlign:"center"}}
            chartStyle={{ width: 359, height: 311}}
            option={this.state.daikuanTop10}
        />

        <TitleChart
            style={{ width: 359, height: 331,position:'absolute',left:460,bottom:23,zIndex:9}}
            titleStyle={{position:'absolute',top:0,left:0,fontSize:24,width:'100%',textAlign:"center"}}
            chartStyle={{ width: 359, height: 311}}
            option={this.state.cunkuanTop10}
        />
        {/* 左边滚动数据 */}


        {

          det && det["时间"]===1?  <Loading text={`loading...`} style={{left:'22%'}}/>:

          <div className={style.left}>
                <div style={{position:'absolute',top:0,left:0,height:'635px',background:'url('+leftBg+')',width:'678px'}}>
                    <p className={style.branchTit}>{det['名称'].replace("(一级分支行)","") == "甘肃银行股份有限公司" ? det['名称'].replace("(一级分支行)",""):det['名称'].replace("(一级分支行)","").replace("甘肃银行股份有限公司","") }</p>
                    <p style={{position:"absolute",top:'54px',right:"111px",fontSize:'12px'}}>(单位：亿元)</p>
                    <TitleValueCountUp
                        style={{position:'absolute',top:90,left:30,width:130}}
                        titleStyle={{fontSize: 18}}
                        valueClassName={style.branchVal}
                        title={`资产总额`}
                        value={det['资产总额']/1e8}
                        decimals={2}/>
                    <TitleValueCountUp
                        style={{position:'absolute',top:90,left:213,width:130}}
                        titleStyle={{fontSize: 18}}
                        valueClassName={style.branchVal}
                        title={`负债总额`}
                        value={det['负债总额']/1e8}
                        decimals={2}/>
                    <TitleValueCountUp
                        style={{position:'absolute',top:90,left:407,width:130}}
                        titleStyle={{fontSize: 18}}
                        valueClassName={style.branchVal}
                        title={`存款余额`}
                        value={det['存款余额']/1e8}
                        decimals={2}/>
                    <TitleValueCountUp
                        style={{position:'absolute',top:90,left:590,width:130}}
                        titleStyle={{fontSize: 18}}
                        valueClassName={style.branchVal}
                        title={`贷款余额`}
                        value={det['贷款余额']/1e8}
                        decimals={2}/>
                    {/* <TitleValueCountUp
                        style={{position:'absolute',top:111,left:748}}
                        titleStyle={{fontSize: 22}}
                        valueClassName={style.branchVal}
                        title={`净利润`}
                        value={det['净利润']/1e8}
                        decimals={2}/> */}
                    <TitleChart
                        className={style.braLine1}
                        titleClassName={style.braLineTit}
                        chartClassName={style.braLineChart}
                        title={`资产负债变化情况`}
                        // title_sm={'(亿元)'}
                        titleStylesm={{fontSize:'14px'}}
                        option={DataCreater.leftLine1(this.state.detailsLine.zcfzLine)}
                    />
                    <TitleChart
                        className={style.braLine2}
                        titleClassName={style.braLineTit}
                        chartClassName={style.braLineChart}
                        title={`存贷款变化情况`}
                        // title_sm={'(亿元)'}
                        titleStylesm={{fontSize:'14px'}}
                        option={DataCreater.leftLine2(this.state.detailsLine.ckdkLine)}
                    />
                </div>
            </div>
        }
        {/* 右侧 */}
        <img src={zcgm} onclick={self.sd} style={{position:'absolute',left:1263,top:263}}/>
        <img src={rotateCircle} className={style.rotateCirlce} />
        <img src={bgSeat} className={style.bgSeat} />
        <TitleValueCountUp
            style={{position:'absolute',top:434,left:1216}}
            titleStyle={{fontSize: 14,textAlign: 'center'}}
            valueClassName={style.value}
            title={`资产总额`}
            value={this.state.zichanzonge}
            decimals={2}
            duration={5}
            // prefix={`<i style=font-size:20px;color:red>亿元</i>`}
            suffix={`<i style=font-size:12px;font-family:fzxs;color:#aaa;>亿元</i>`}
        />
        <div style={{position:'absolute',top:471,left:1403,overflow:'hidden'}}>
          <img src={this.state.zichanzongeRadio>=0?upArrow:downArrow} className={this.state.zichanzongeRadio>=0?style.upArrow:style.downArrow}/>
          <div className={style.sub}>{Math.abs(this.state.zichanzongeRadio).toFixed(2)}</div>
        </div>
        <TitleValueCountUp
            style={{position:'absolute',top:521,left:1216}}
            titleStyle={{fontSize: 14,textAlign: 'center'}}
            valueClassName={style.value}
            title={`负债总额`}
            value={this.state.fuzhaizonge}
            decimals={2}
            duration={5}
            suffix={`<i style=font-size:12px;font-family:fzxs;color:#aaa;>亿元</i>`}
        />
        <div style={{position:'absolute',top:558,left:1403}}>
          <img src={this.state.fuzhaizongeRadio>=0?upArrow:downArrow} className={this.state.fuzhaizongeRadio>=0?style.upArrow:style.downArrow}/>
          <div className={style.sub}>{Math.abs(this.state.fuzhaizongeRadio).toFixed(2)}</div>
        </div>
        <TitleValueCountUp
            style={{position:'absolute',top:608,left:1243}}
            titleStyle={{fontSize: 14,textAlign: 'center'}}
            valueClassName={style.value}
            title={`净资产余额`}
            value={this.state.jingzichanyue}
            decimals={2}
            duration={5}
            suffix={`<i style=font-size:12px;font-family:fzxs;color:#aaa;>亿元</i>`}
        />
        <div style={{position:'absolute',top:644,left:1403}}>
          <img src={this.state.jingzichanyueRadio>=0?upArrow:downArrow} className={this.state.jingzichanyueRadio>=0?style.upArrow:style.downArrow}/>
          <div className={style.sub}>{Math.abs(this.state.jingzichanyueRadio).toFixed(2)}</div>
        </div>
        {/*<TitleChart
            style={{position:"absolute",left:686,top:263}}
            titleStyle={{position:'absolute',top:-5,width:348,textAlign:'center',fontSize:24}}
            chartStyle={{width:348,height:188}}
            title={`资产结构`}
            option={this.state.zcJieGou}
        />
        <TitleChart
            style={{position:"absolute",left:686,top:510}}
            titleStyle={{position:'absolute',top:-5,width:348,textAlign:'center',fontSize:24}}
            chartStyle={{width:348,height:188}}
            title={`负债结构`}
            option={this.state.fzJieGou}
        />
        <TitleChart
            style={{position:"absolute",left:1559,top:263}}
            titleStyle={{position:'absolute',top:-5,width:348,textAlign:'center',fontSize:24}}
            chartStyle={{width:348,height:188}}
            title={`存款结构`}
            option={this.state.ckJieGou}
        />
        <TitleChart
            style={{position:"absolute",left:1559,top:510}}
            titleStyle={{position:'absolute',top:-5,width:348,textAlign:'center',fontSize:24}}
            chartStyle={{width:348,height:188}}
            title={`贷款结构`}
            option={this.state.dkJieGou}
        />*/}
        <div style={{position:'absolute',left:923,top:793,fontSize:14,width:833,textAlign:"center",overflow: 'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap',textShadow:"rgb(255, 255, 255) 0px 0px 30px"}}>{det['名称'].replace("(一级分支行)","")}</div>
        <ItemGauge
          style={{position:"absolute",left:894,top:840,width:208,height:200}}
          data={{title:"资产增长率",r:90,min:0,max:1,value:this.state.detailsLine.zcLev||0,radian:220}}
        />
        {/* <ItemGauge
          style={{position:"absolute",left:2539,top:817,width:230,height:220}}
          data={{title:"净利润完成率",r:110,min:0,max:1,value:det['利润完成率']||0,radian:240}}
        /> */}
        <ItemGauge
          style={{position:"absolute",left:1103,top:840,width:208,height:200}}
          data={{title:"营业利润增长率",r:90,min:0,max:1,value:this.state.detailsLine.ysLev||0,radian:200}}
        />
         <ItemGauge
          style={{position:"absolute",left:1312,top:840,width:208,height:200}}
          data={{title:"贷款任务完成率",r:90,min:0,max:1,value:det['贷款任务完成率'],radian:200}}
        />
        <ItemGauge
          style={{position:"absolute",left:1531,top:840,width:208,height:200}}
          data={{title:"存款任务完成率",r:90,min:0,max:1,value:det['存款任务完成率'],radian:200}}
        />
        <div className={style1.pageShow} id='pageShow' style={{display: "none"}}>
          <button className={style1.prev} onClick={this.funPrev.bind(this,MSProv2)}>上一屏</button>

          {/* <a className={style1.prev}  href={MSProv2}>上一屏</a>*/}
          <button className={style1.next}>下一屏</button>
          <button className={style1.close} onClick={this.closeWindows}>关 闭1</button>
          {/*<a className={style1.close} href="javascript:window.opener=null;window.open('','_self');window.close();">关闭1</a>*/}
        </div>
        <div className={style1.menuright}>
          <img src={menul1} onClick={this.pageup}></img>
        </div>
      </div>
    )
  }
}
