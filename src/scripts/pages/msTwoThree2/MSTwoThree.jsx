import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import style from './style.css';
import { Link } from 'react-router-dom';
import ScrollList from 'components/common/ScrollList';
import Chart from 'components/common/Chart1';
import TitleChart from 'components/common/TitleChartCksdh';
import TitleValue from 'components/common/TitleValue';
import Item from './Item';
import ListItem from './ListItem';
import ThreeCenter from './ThreeCenter';
// import SystemNotice from './systemNotice/SystemNotice';

import DataCreater from './DataCreater1';
import BaseMap from 'components/common/CdkBaseMap';
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
import R from "ramda";
import FetchHelper from "utils/FetchHelper";
import echarts from "echarts/lib/echarts";
import data from "pages/branch/data";
import style1 from "pages/branch/style1.css";
import catchErrors from "react-transform-catch-errors/src";

class MSTwoThree extends Component {
  constructor(props) {
    super(props);
    window.share.resetPageSize(1920, 1080);
    //this.areaCode=["00","01","21","22","23","24","25","26","27","28","29","30","31","32","33"];

    this.areaCode=[
        {name:'甘肃银行总行',value:'00'},
        {name:'兰州市',value:'01'},
        {name:'平凉市',value:'21'},
        {name:'白银市',value:'22'},
        {name:'庆阳市',value:'23'},
        {name:'天水市',value:'24'},
        {name:'酒泉市',value:'25'},
        {name:'定西市',value:'26'},
        {name:'嘉峪关市',value:'27'},
        {name:'金昌市',value:'28'},
        {name:'陇南市',value:'29'},
        {name:'临夏回族自治州',value:'30'},
        {name:'武威市',value:'31'},
        {name:'甘南藏族自治州',value:'32'},
        {name:'张掖市',value:'33'},
    ]

    this.bandwidthData = {};
    this.tdCurData = {};
    this.caledTDData = {};
    this.requestMap("gansu");
    this.state = {
      mapOption: DataCreater.createMapOption([
       ]),
        ckTop10: DataCreater.cksdh10([{name: "", value: ''}]),
        dkTop10: DataCreater.dksdh10([{name: "", value: ''}]),
        daikuanzjTop10: DataCreater.up10([{name: "", value: ''}]),
        daikuanjsTop10: DataCreater.dow10([{name: "", value: ''}]),
        cunkuanzjTop10: DataCreater.up10([{name: "", value: ''}]),
        cunkuanjsTop10: DataCreater.dow10([{name: "", value: ''}]),
        clickTitle:'甘肃银行总行',
        mapName:'gansu',
        list: [
        ],
        currdate:this.getNowFormatDate(),
        lxflage:false,
        index:0,
        pageCount:0,//滚动参数
        qpflage:false,
        ScrollFlage:false,
    }
  }
     getNowFormatDate= () => {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;

        return currentdate;
    }
    /*点击地图区域*/
    findByareaCode = (name, e) => {
        this.refs.biaoji1.dream();
        this.getcdksdhData("00");
        this.setState({
            ScrollFlage:!this.state.ScrollFlage,
            clickTitle:"甘肃银行总行",
            index:0,

        })
    }


    getChildrenMsg = (result, msg) => {
        // this.chart1.dispatchAction({
        //     type: 'showTip',
        //     seriesIndex: 0,
        //     dataIndex: params.dataIndex,
        // });
        var areaCode = "00";
        if(msg==="zh"){
        }else if (msg==="酒泉市"){
            areaCode="25";
        }else if(msg==="嘉峪关市"){
            areaCode="27";
        }else if(msg==="张掖市"){
            areaCode="33";
        }else if(msg==="金昌市"){
            areaCode="28";
        }else if(msg==="武威市"){
            areaCode="31";
        }else if(msg==="白银市"){
            areaCode="22";
        }else if(msg==="兰州市"){
            areaCode="01";
        }else if(msg==="临夏回族自治州"){
            areaCode="30";
        }else if(msg==="定西市"){
            areaCode="26";
        }else if(msg==="庆阳市"){
            areaCode="23";
        }else if(msg==="平凉市"){
            areaCode="21";
        }else if(msg==="甘南藏族自治州"){
            areaCode="32";
        }else if(msg==="天水市"){
            areaCode="24";
        }else if(msg==="陇南市"){
            areaCode="29";
        }
        this.getcdksdhData(areaCode);
        this.setState({
                clickTitle:msg,
                index:0,
        }
        )
    }
    componentWillUnmount() {
        this.timer1&&clearInterval(this.timer1);
        this.timer1=null;
        this.timer2&&clearInterval(this.timer2);
        this.timer2=null;
        this.timer3&&clearInterval(this.timer3);
        this.timer3=null;
        this.timer4&&clearInterval(this.timer4);
        this.timer4=null;
        this.timer5&&clearInterval(this.timer5);
        this.timer5=null;

    }
      componentDidMount() {
          this.getcdkData();        //获取全机构存贷款余额和新增数
          this.getcdksdhData("00");      //十大户相关数据
          this.timer1=setInterval(this.getNowFormatDate,window.setIntervalPar.cdksdh.riqi)//更新时间
          this.timer2= setInterval(this.getcdkData,window.setIntervalPar.cdksdh.qjgpmsj)//全机构更新存贷款排名
           this.timer3=setInterval(this.getcdksdhData,window.setIntervalPar.cdksdh.cdksdhsj);//十大户更新时间
          // this.timer4=setInterval(this.getcdksdhMapH,window.setIntervalPar.cdksdh.cdksdhsj);//十大户更新时间
           this.timer5=setInterval(this.pageNext,window.setIntervalPar.cdksdh.qpsj)
         // this.refs.biaoji.dream(0);  //轮播
      }



    pageNext=()=>{
        this.setState({
            qpflage:true,
        })
    }
    getNowFormatDate= () => {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        this.setState({
            currdate:currentdate,
            }
        )
        return currentdate;
    }

    getcdksdhMapH = ()=>{
        if (this.state.index>15){  //重新开始
            this.setState({
                index:0,
            })
        }

        // 同步地图
        this.refs.biaoji.dream(this.state.index);
    }

    //存贷款十大户，存款贷款新增十大户，存贷款减少十大户/jkdp/sdh/getSdh?areaCode=00
    getcdksdhData = (areaCode) => {
        if (areaCode==null||areaCode==""||areaCode=="undefined"){  //轮播
            if (this.state.index>15){  //重新开始
                this.setState({
                    index:0,
                })
            }
            this.setState({
                        index:this.state.index+1,
                    })

            areaCode=this.areaCode[this.state.index].value;
            this.setState({
                clickTitle:this.areaCode[this.state.index].name
            })
            // 同步地图
          //  this.refs.biaoji.dream(this.state.index);
        }
        this.fuUpdateState(areaCode);
    }
    fuUpdateState=(areaCode)=>{
        Tools.fetchGet(
                window.locationConfig.domainN + '/jkdp/sdh/getSdh?areaCode='+areaCode,
                {'Content-Type': 'application/json'},
                this.updateStateDate);

    }

    //获取全机构存贷款余额和新增数
    getcdkData = () => {
        if (window.locationConfig.debug) {
        } else {
            Tools.fetchGet(
                window.locationConfig.domainN + '/jkdp/getDayData/getAllOrgDate/',
                {'Content-Type': 'application/json'},
                this.updateCdkDate);
        }
    }
    updateCdkDate =(data)=>{
      var backlist = new Array();
        if (null != data && "" != data) {
                if (data.length > 0) {
                    var index = 0;
                    for (let i = 0; i < data.length; i++) {
                        var backName = "";
                        if (data[i].name == "甘肃银行股份有限公司") {
                            backName = "甘肃银行总行"
                        }else if (data[i].name == "甘肃银行股份有限公司营业部(一级分支行)") {
                            backName = "总行营业部(一级分支行)"
                        } else {
                            backName = data[i].name.replace("甘肃银行股份有限公司", "")
                        }
                        var map ={name:backName,v1:(data[i].value/1e8).toFixed(2)*1,v2:(data[i].raise/1e8).toFixed(2)*1,v3:data[i].order};
                        backlist.push(map);
                    }
                    this.setState({
                        pageCount:data.length-1,
                    })
                }
                console.log(backlist)
                this.setState({
                    list:backlist,
                })

        }
    }

    //更新不变数据
    updateStateDate = (data) => {
        if (null != data && "" != data){
            if(null != data.CKQSDH && "" != data.CKQSDH)  {
                var ckqsdh=[];
                if (data.CKQSDH.length>0){
                    for(var i=0; i<data.CKQSDH.length;i++){
                        var sdhmc =data.CKQSDH[i].name;
                        var sdhValue =data.CKQSDH[i].value;
                        if(sdhmc.indexOf("_")!=-1){
                            var sdhName = sdhmc.split("_")[0];
                            var orgName="";
                                if (sdhmc.split("_")[1].indexOf("市")!=-1){
                                    orgName=  sdhmc.split("_")[1].split("市")[1];
                                    orgName=orgName.replace("(一级分支行)","");
                                }else{
                                     orgName = sdhmc.split("_")[1].replace("甘肃银行","").replace("(一级分支行)","");
                                }
                                 sdhmc ="("+orgName+")"+sdhName;
                        }
                        var map ={
                            name: sdhmc,
                            value:sdhValue,
                        }
                        ckqsdh.push(map);
                    }
                }


                this.setState(
                    {
                        ckTop10: DataCreater.cksdh10(ckqsdh),
                    }
                )
            }
            if(null != data.DKQSDH && "" != data.DKQSDH)  {
                var dkqsdh=[];
                if (data.DKQSDH.length>0){
                    for(var i=0; i<data.DKQSDH.length;i++){
                        var sdhmc =data.DKQSDH[i].name;
                        var sdhValue =data.DKQSDH[i].value;
                        if(sdhmc.indexOf("_")!=-1){
                            var sdhName = sdhmc.split("_")[0];
                            var orgName="";
                            if (sdhmc.split("_")[1].indexOf("市")!=-1){
                                orgName=  sdhmc.split("_")[1].split("市")[1];
                                orgName=orgName.replace("(一级分支行)","");
                            }else{
                                orgName = sdhmc.split("_")[1].replace("甘肃银行","").replace("(一级分支行)","");
                            }
                            sdhmc ="("+orgName+")"+sdhName;
                        }
                        var map ={
                            name: sdhmc,
                            value:sdhValue,
                        }
                        dkqsdh.push(map);
                    }
                }
                this.setState(
                    {
                        dkTop10: DataCreater.dksdh10(dkqsdh),
                    }
                )
            }

            if(null != data.CKRZSDH && "" != data.CKRZSDH)  {
                var ckrz = data.CKRZSDH.map(function (item, index) {
                    return {
                        name: item.name.replace("(一级分支行)", "").replace("甘肃银行股份有限公司", ""),
                        value: ((item.value) * 1e4).toFixed(0)*1
                    }
                })
                this.setState(
                    {
                        cunkuanzjTop10: DataCreater.up10(ckrz),
                    }
                )
            }


            if(null != data.CKRJSDH && "" != data.CKRJSDH)  {
                var ckrj=[];
                if (data.CKRJSDH.length>0){
                  for(var i=data.CKRJSDH.length-1;i>=0;i--){
                      var map ={
                          name: data.CKRJSDH[i].name.replace("(一级分支行)", "").replace("甘肃银行股份有限公司", ""),
                          value:Math.abs(((data.CKRJSDH[i].value)*1e4).toFixed(0)*1)
                      }
                      ckrj.push(map);
                  }
                }
                this.setState(
                    {
                        cunkuanjsTop10: DataCreater.dow10(ckrj),
                    }
                )
            }
            if(null != data.DKRZSDH && "" != data.DKRZSDH)  {
                var dkrz = data.DKRZSDH.map(function (item, index) {
                    return {
                        name: item.name.replace("(一级分支行)", "").replace("甘肃银行股份有限公司", ""),
                        value: ((item.value) * 1e4).toFixed(0)*1
                    }
                })
                this.setState(
                    {
                        daikuanzjTop10: DataCreater.up10(dkrz),
                    }
                )
            }
            if(null != data.DKRJSDH && "" != data.DKRJSDH)  {
                var dkrj=[];
                if (data.DKRJSDH.length>0){
                    for(var i=data.DKRJSDH.length-1;i>=0;i--){
                        var map ={
                            name: data.DKRJSDH[i].name.replace("(一级分支行)", "").replace("甘肃银行股份有限公司", ""),
                            value:Math.abs(((data.DKRJSDH[i].value)*1e4).toFixed(0)*1)
                        }
                        dkrj.push(map);
                    }
                }
                this.setState(
                    {
                        daikuanjsTop10: DataCreater.dow10(dkrj),

                    }
                )
            }
        }
        // 同步地图
        //    获取下标
        // this.areaCode=[
        //     {name:'甘肃银行总行',value:'00'},
        //     {name:'兰州市',value:'01'},
        //     {name:'平凉市',value:'21'},
        //     {name:'白银市',value:'22'},
        //     {name:'庆阳市',value:'23'},
        //     {name:'天水市',value:'24'},
        //     {name:'酒泉市',value:'25'},
        //     {name:'定西市',value:'26'},
        //     {name:'嘉峪关市',value:'27'},
        //     {name:'金昌市',value:'28'},
        //     {name:'陇南市',value:'29'},
        //     {name:'临夏回族自治州',value:'30'},
        //     {name:'武威市',value:'31'},
        //     {name:'甘南藏族自治州',value:'32'},
        //     {name:'张掖市',value:'33'},
        // ]
        if (this.state.clickTitle=="甘肃银行总行"){
            this.refs.biaoji.dream(1);  //轮播
        }else{
            for (let i = 0; i < this.areaCode.length; i++) {
                if (this.state.clickTitle==this.areaCode[i].name){
                    this.refs.biaoji.dream(i);  //轮播
                }
            }
        }


           // this.refs.biaoji.dream(this.state.index);  //轮播


    }
  componentWillUnmount() {

  }
    requestMap(mapName) {
        fetch(window.dominContext.staticPath + '/assets/charts/map/' + mapName + '.json')
            .then(FetchHelper.checkStatus)
            .then(FetchHelper.parseJSON)
            .then((geoJson) => {
                echarts.registerMap(mapName, geoJson);
                this.setState({ loadedMap: true });
            })
            .catch(FetchHelper.fetchDataFailed);
    }

    closeWindows() {
        if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") != -1) {
            window.location.href = 'about:blank';
            window.close();
        } else {
            window.opener = null;
            window.open("", "_self");
            window.close();
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


  render() {
      if(this.state.qpflage){
          return <Redirect to='/branch_dp' />
         // return this.props.history.push("/branch_dp");
      }
      let top = window.dominContext.staticPath + '/assets/images/msTwoThree/top.png';
      let left = window.dominContext.staticPath + '/assets/images/msTwoThree/left.png';
      let right = window.dominContext.staticPath + '/assets/images/msTwoThree/right.png';
      let mid = window.dominContext.staticPath + '/assets/images/msTwoThree/mid.png';
      let bot = window.dominContext.staticPath + '/assets/images/msTwoThree/bot.png';
      let botx = window.dominContext.staticPath + '/assets/images/msTwoThree/botx.png';
      let menul1 = window.dominContext.staticPath + '/assets/images/msTwoThree/menu.png';
      let but = window.dominContext.staticPath + '/assets/images/msTwoThree/but.png';
      let branch_dp = window.dominContext.staticPath + '/dist/#/branch_dp';





    return (
      <div className={style.root} >
          <img src='/assets/images/msTwoThree/up.png' className={style.ckzjsdhRadioClassName}/>
          <img src='/assets/images/msTwoThree/up.png' className={style.dkzjsdhdkyeRadioClassName}/>
          <img src='/assets/images/msTwoThree/down.png' className={style.ckjssdhdkyeRadioClassName}/>
          <img src='/assets/images/msTwoThree/down.png' className={style.dkjssdhdkyeRadioClassName}/>
          {/*<div className={style.pageTitle} style={{background: 'url(' + top + ')'}}></div>*/}
          <div className={style.bgvideo}>
                  <video style={{width: '100%', height: '100%'}} loop muted autoPlay
                         src={window.dominContext.staticPath + '/assets/videos/common/c.mp4'}>
                  </video>
          </div>
        <div className={style.pageTitle} ></div>
        <div className={style.left} style={{background: 'url(' + left + ')'}} >
            <h3 style={{
                fontSize: 19,
                color: "#00AEFF",
                position: "absolute",
                fontFamily: '微软雅黑',
                fontWeight: 'bold',
                top: 55,
                left: 194
            }}>存款十大户 </h3>
            <TitleChart
                style={{width: '430px', height: '296px',position: "absolute",left:66,top:58}}
                titleStyle={{
                    position: 'absolute',
                    top: 0,
                    left: 70,
                    fontSize: 24,
                    width: '100%',
                    textAlign: "center"
                }}
                chartStyle={{width: 430, height: 311,position: 'absolute',
                    left:-43,top:-27}}
                option={this.state.ckTop10}
            />
            <h3 style={{
                fontSize: 19,
                color: "#00AEFF",
                position: "absolute",
                fontFamily: '微软雅黑',
                fontWeight: 'bold',
                top: 338,
                left: 194
            }}>贷款十大户
            </h3>
            <TitleChart
                style={{width: '430px', height: '296px'}}
                titleStyle={{
                    position: 'absolute',
                    bottom: 24,
                    left: 66,
                    fontSize: 24,
                    width: '100%',
                    textAlign: "center"
                }}
                chartStyle={{width: 430, height: 311,position: 'absolute',
                    bottom: 24,
                    left:16,}}
                option={this.state.dkTop10}
            />

        </div>
        <div className={style.mid} style={{ background: 'url(' + mid + ')'}}>
          </div>
          <div className={style.riqi}>日期：{this.state.currdate}</div>
          <div className={style.backName}>{this.state.clickTitle}</div>

          <div className={style.but} style={{ background: 'url(' + but + ')'}} onClick={this.findByareaCode.bind( this,'zh')}></div>
          {/*<div ref={(chartDiv)=>{this.chartDiv=chartDiv;}}*/}
          {/*     style={this.props.style} className = {this.props.className}*/}
          {/*>*/}
          {/*</div>*/}
          <Chart option={this.state.mapOption} className={style.map} parent={this} ref="biaoji"/>

          {/*<div className={style.cityName}>兰州市{this.state.number}</div>*/}
        <div className={style.right} style={{ background: 'url(' + right + ')'}}>
            <ScrollList className={style.scrollList} style={{ width: 596, height: 500 }} itemClass={ListItem}
                        arrData={this.state.list}
                        pageCount={this.state.pageCount}
                        autoPlay={true}
                        loop={true}
                        delay={5000}
                        actionDelay={2000}
                        dir={-1}
                        moveDis={1}
                        itemH={44}
                        ref="biaoji1"
                        ScrollFlage={this.state.ScrollFlage}
            />
        </div>
        <div className={style.bottom} style={{ background: 'url(' + bot + ')'}}>
            <TitleChart
                style={{width: '400px', height: '296px'}}
                titleStyle={{
                    position: 'absolute',
                    bottom: 24,
                    left: 58,
                    fontSize: 24,
                    width: '100%',
                    textAlign: "center"
                }}
                chartStyle={{width: 400, height: 311,position: 'absolute',
                    bottom: 11,
                    left: 72,}}
                option={this.state.cunkuanzjTop10}
            />
            <TitleChart
                style={{width: '400px', height: '296px'}}
                titleStyle={{
                    position: 'absolute',
                    bottom: 24,
                    left: 24,
                    fontSize: 24,
                    width: '100%',
                    textAlign: "center"
                }}
                chartStyle={{width: 400, height: 311,position: 'absolute',
                    bottom: 11,
                    left: 520,
                }}
                option={this.state.cunkuanjsTop10}
            />
            <TitleChart
                style={{width: '400px', height: '296px'}}
                titleStyle={{
                    position: 'absolute',
                    bottom: 24,
                    left: 24,
                    fontSize: 24,
                    width: '100%',
                    textAlign: "center"
                }}
                chartStyle={{width: 400, height: 311,position: 'absolute',
                    bottom: 57,
                    left: 995}}
                option={this.state.daikuanzjTop10}
            />
            <TitleChart
                style={{width: '400px', height: '296px'}}
                titleStyle={{
                    position: 'absolute',
                    bottom: 24,
                    left: 24,
                    fontSize: 24,
                    width: '100%',
                    textAlign: "center"
                }}
                chartStyle={{width: 400, height: 311,position: 'absolute',
                    bottom: 57,
                    left: 1453}}
                option={this.state.daikuanjsTop10}
            />
        </div>
          <div className={style1.pageShow} id='pageShow' style={{display: "none"}}>
              {/*<button className={style1.prev} onClick={this.funPrev.bind(this,MSProv2)}>上一屏</button>*/}
              {/*<a className={style.next} href={branch_dp}>上一屏</a>*/}
              <a className={style.next}  onClick={()=>this.props.history.push("/branch_dp")}>上一屏</a>
              <button className={style.close} onClick={this.closeWindows}>关 闭</button>
          </div>
          <div className={style.menuright}>
              <img src={menul1} onClick={this.pageup}></img>
          </div>
      </div>);
  }
}

export default MSTwoThree;