import React, {Component} from 'react'

import {Redirect} from "react-router-dom";
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
import Chart from "components/common/Chart";
import CountUp from 'react-countup';
import R from "ramda";
// import OneVideo from 'components/common/OneVideo';
export default class Branchdp extends Component {
    constructor(props) {
        super(props);
        window.share.resetPageSize(1916, 1076);
        this.qh = this.qh.bind(this);
        this.state = {
            qpflage:false,
            qhFlage: false,
            menuName: [],
            fhName: [],
            index: 0,
            backName: "甘肃银行总行",

            dkye: 0,  //贷款余额
            ckye: 0,  //存款余额
            sxfjyjsr: 0, //手续费及佣金收入

            dgcdb: 0,//对公存贷比
            dscdb: 0, //对私存贷比
            zczezzl: 0,//资产增长率
            yylrzzl: 0,//营业利润增长率

            dkyeRadio: 0,  //较昨日增长
            ckyeRadio: 0,
            sxfjyjsrRadio: 0,


            dkyeRadioSrc: '',
            dkyeRadioClassName: '',
            ckyeRadioSrc: '',
            ckyeRadioClassName: '',
            sxfRadioSrc: '',
            sxfRadioClassName: '',

            ZcRadioSrc: '',
            ZcRadioClassName: '',
            FzRadioSrc: '',
            FzRadioClassName: '',
            JRadioSrc: '',
            JRadioClassName: '',



            fkl: 0,//发卡量
            dgzhs: 0,//对公账客户数
            dqkhs: 0,//当前客户数

            fklDayAdd: 0,
            dgzhsDayAdd: 0,
            dqkhsDayAdd: 0,

            fklYearAdd: 0,
            dgzhsYeayAdd: 0,
            dqkhsYeayAdd: 0,

            //资产规模
            zcze: 0,
            fzze: 0,
            jzcye: 0,
            zczeRadio: 0,
            fzzeRadio: 0,
            jzcyeRadio: 0,

            //赞同接口分装变量
            startjyl: 0,
            endjyl: 0,
            startjyjj: 0,
            endjyjj: 0,
            jylbl: '',

            cunkuanTop10: DataCreater.top10([{name: "", value: ''}]),
            daikuanTop10: DataCreater.top10([{name: "", value: ''}]),
             ringOption: DataCreater.createRingOption([{subname: "", value: ''}]),
            // ringOption: DataCreater.createRingOption([{
            //     name: "智能柜面",
            //     value: 475277
            // }, {name: "自助渠道", value: 99779}, {name: "智能柜台", value: 51847}, {name: "电子渠道", value: 2147948}]),
            detailsLine: {
                //净利润趋势分析
                ylTrend: {
                    yl: [],
                    time: [],
                },
            }
        }
    }

    componentWillUnmount() {
        this.timer&&clearInterval(this.timer);
        this.timer=null;
    }


    componentDidMount() {
        this.getOrgData();          //获取菜单和总行数据
        this.getaqdzbData();       //按渠道占比
        this.getStateData();      //获取不变数据
        this.getZzgmData();      //资产规模
        this.timer=setInterval(this.getOrgDataByCode, 30000)                 //30秒切换分行数据  分行数据
        setInterval(this.getStateData, 1800000);                //一小时，一秒1000毫秒   总行静态数据
        setInterval(this.getaqdzbData, 1800000);               //一天一次，一秒1000毫秒   按渠道占比
        setInterval(this.getZzgmData, 1800000);               //一天一次，一秒1000毫秒  资产规模
        this.getZTData();  //赞同接口
        this.flagZT = setInterval(this.getZTData, window.locationConfig.ZTInterface.interface.linkLogin.loopTime);
        this.timer=setInterval(this.pageNext,window.setIntervalPar.cdksdh.qpsj)
    }
    pageNext=()=>{
        this.setState({
            qpflage:true,
        })
    }
    //资产规模
    getZzgmData = () => {
        Tools.fetchGet(
            window.locationConfig.domainN + '/jkdp/getDayData/zcfz',
            {'Content-Type': 'application/json'},
            this.updateZcgm
        );
    }
    updateZcgm = (d) => {
        if(d.code==500){
            return;
        }
        var zczezz2 = (d.资产总额增长/1e8).toFixed(2);
        if (zczezz2 > 0) {
            this.setState({
                    ZcRadioSrc: '/assets/images/branch/upArrow.png',
                    ZcRadioClassName: style.upArrow,
                }
            )
        } else if (zczezz2 < 0) {
            this.setState({
                    ZcRadioSrc: '/assets/images/branch/downArrow.png',
                    ZcRadioClassName: style.downArrow,
                }
            )
        } else if (zczezz2 ==0) {
            this.setState({
                    ZcRadioSrc: '/assets/images/branch/blan.png',
                    ZcRadioClassName: style.blan,
                }
            )
        }
        var fzzezz2 =(d.负债总额增长/1e8).toFixed(2);
        if (fzzezz2 > 0) {
            this.setState({
                    FzRadioSrc: '/assets/images/branch/upArrow.png',
                    FzRadioClassName: style.upArrow,
                }
            )
        } else if (fzzezz2 < 0) {
            this.setState({
                    FzRadioSrc: '/assets/images/branch/downArrow.png',
                    FzRadioClassName: style.downArrow,
                }
            )
        } else if (fzzezz2 == 0) {
            this.setState({
                    FzRadioSrc: '/assets/images/branch/blan.png',
                    FzRadioClassName: style.blan,
                }
            )
        }
        var jzcyezz2 = (d.净资产余额增长/1e8).toFixed(2);
        if (jzcyezz2 > 0) {
            this.setState({
                    JRadioSrc: '/assets/images/branch/upArrow.png',
                    JRadioClassName: style.upArrow,
                }
            )
        } else if (jzcyezz2 < 0) {
            this.setState({
                    JRadioSrc: '/assets/images/branch/downArrow.png',
                    JRadioClassName: style.downArrow,
                }
            )
        } else if (jzcyezz2 == 0) {
            this.setState({
                JRadioSrc: '/assets/images/branch/blan.png',
                JRadioClassName: style.blan,
                }
            )
        }

        this.setState(
            {
                //资产规模
                zcze: d.资产总额,
                fzze: d.负债总额,
                jzcye: d.净资产余额,
                zczeRadio: (typeof (d.资产总额增长)=="undefined") ? 0.00:d.资产总额增长,
                fzzeRadio:  (typeof (d.负债总额增长)=="undefined")? 0.00:d.负债总额增长,
                jzcyeRadio:(typeof (d.净资产余额增长)=="undefined")? 0.00:d.净资产余额增长,
            }
        )
     console.log(this.state.zczeRadio)
    }
    //赞同接口
    getZTData = () => {
        let startTime = moment().subtract(20, 'minutes').format("YYYY-MM-DD HH:mm:ss");
        let endTime = moment().format("YYYY-MM-DD HH:mm:ss");
        Tools.fetchGet(
            window.locationConfig.ZTInterface.interface.gsprovCore.address + `?appId=100001003C0C7F496BAD9AF03F0CB47F3478CB390`,
            {'Content-Type': 'application/json'},
            this.handleCoreData
        );
    }
    handleCoreData = (d) => {
        let ztdata = d.content.result;  //
        let jyllength = ztdata.total_trade_count.length;  //1027856
        if (jyllength >= 7) {
            jyllength = jyllength + 2;
        } else if (jyllength >= 4 && jyllength < 8) {
            jyllength = jyllength + 1;
        }
        jyllength = 11 - jyllength;
        let jylbl1 = '';
        for (var i = 0; i < jyllength; i++) {
            if (i == 3 || i == 7) {
                jylbl1 += ',';
            } else {
                jylbl1 += '0';
            }

        }
        this.setState(
            {
                startjyl: this.state.endjyl,
                startjyjj: this.state.endjyjj,
                endjyl: Number(ztdata.total_trade_count),  //1027856
                endjyjj: Number(ztdata.total_trade_amount),//50083310
                jylbl: jylbl1
            }
        )
    }

    getaqdzbData = () => {
        if (window.locationConfig.debug) {
        } else {
            let m = moment();
            let startTStr = m.format("YYYY-MM-DD 00:00:00");
            let endTStr = m.format("YYYY-MM-DD HH:mm:ss");
            Tools.fetchGet(
                window.locationConfig.domainN + '/cloud-monitor/data/load?dcId=2012&filter={%22name%22:%22Q1000001%22}',
                {'Content-Type': 'application/json'},
                this.qdzb);
        }
    }
    //按各渠道占比
    qdzb = (d) => {
        let self = this;
        let qdzbData = d.datas;
        var everyArr = qdzbData.length > 0 ? qdzbData[0]["data"] : null;
        for (var i = 0; i < everyArr.length; i++) {
            everyArr[i].name = everyArr[i].subname;
        }
        this.setState(
            {
                ringOption: DataCreater.createRingOption(everyArr)//展示按渠道占比统计
            }
        )
    }

    qhGetOrgByCode = (code) => {
        this.setState({
            qhFlage: !this.state.qhFlage
        });
        this.getBackNameByCode(code);
        if (window.locationConfig.debug) {
        } else {
            Tools.fetchGet(
                window.locationConfig.domainN + '/jkdp/getDayData/' + code,
                {'Content-Type': 'application/json'},
                this.updateBackInfo);
        }
    }
    getBackNameByCode = (code) => {
        // 通过code获取到name
        var title = "";
        this.state.menuName.forEach(
            (v) => {
                if (v.code == code) {
                    if (v.name == "甘肃银行股份有限公司") {
                        title = "甘肃银行总行"
                    } else if (v.name == "甘肃银行股份有限公司营业部(一级分支行)") {
                        title = "总行营业部"
                    } else {
                        title = v.name.replace("(一级分支行)", "").replace("甘肃银行股份有限公司", "")
                    }
                }
            }
        )
        this.setState({
            backName: title
        })
    }

    //通过code查询数据
    getOrgDataByCode = () => {
        //this.getBackNameByCode(code)
        if (this.state.qhFlage) {     //切换重头开始轮训
            this.setState(
                {
                    index: 0,
                    qhFlage: !this.state.qhFlage
                }
            )
        } else {
            this.setState(
                {index: this.state.index + 1}
            )
        }

        if (this.state.index >= this.state.menuName.length && this.state.menuName.length != 0) {
            this.setState(
                {index: 0}
            )
        }
        var code = this.state.menuName[this.state.index].code;
        if (window.locationConfig.debug) {
        } else {
            Tools.fetchGet(
                window.locationConfig.domainN + '/jkdp/getDayData/' + code,
                {'Content-Type': 'application/json'},
                this.updateBackInfo);
        }
    }

    //获取各个行机构名称
    getOrgData = () => {
        if (window.locationConfig.debug) {
        } else {
            Tools.fetchGet(
                window.locationConfig.domainN + '/cloud-monitor/getOrgList',
                {'Content-Type': 'application/json'},
                this.menuData);
            Tools.fetchGet(    //获取总行数据
                window.locationConfig.domainN + '/jkdp/getDayData/00999',
                {'Content-Type': 'application/json'},
                this.updateBackInfo);
        }
    }
//获取top10数据
    getStateData = () => {
        if (window.locationConfig.debug) {
        } else {
            Tools.fetchGet(
                window.locationConfig.domainN + '/jkdp/getDayData/getCkTop10',
                {'Content-Type': 'application/json'},
                this.updateStateDate);
            // let m = moment();
            // let startTStr = m.format("YYYY-MM-DD 00:00:00");
            // let endTStr = m.format("YYYY-MM-DD HH:mm:ss");
            // Tools.fetchGet(
            //     window.locationConfig.NInterface.interface.qdzb.address+'?dcId=2012&filter={"name":"Q1000001"}',
            //     {'Content-Type': 'application/json'},
            //     this.qdzb);
        }
    }
    //更新不变数据
    updateStateDate = (data) => {
        if (null != data && "" != data){
            if(null != data.ck && "" != data.ck)  {
                var ck = data.ck.map(function (item, index) {
                    return {
                        name: item.name.replace("(一级分支行)", "").replace("甘肃银行股份有限公司", ""),
                        value: ((item.value) / 1e8).toFixed(2)
                    }
                })
                this.setState(
                    {
                        cunkuanTop10: DataCreater.top10(ck),
                    }
                )
            }
            if(null != data.dk && "" != data.dk)  {
                var dk = data.dk.map(function (item, index) {
                    return {
                        name: item.name.replace("(一级分支行)", "").replace("甘肃银行股份有限公司", ""),
                        value: ((item.value) / 1e8).toFixed(2)
                    }
                })
                this.setState(
                    {
                        daikuanTop10: DataCreater.top10(dk),
                    }
                )
            }
        }

    }
    updateBackInfo = (data) => {
        var data1 = data;
        var backNameTemp = "";
        if (data.name == "甘肃银行股份有限公司") {
            backNameTemp = "甘肃银行总行"
        } else if (data.name == "甘肃银行股份有限公司营业部(一级分支行)") {
            backNameTemp = "总行营业部"
        } else {
            backNameTemp = data.name.replace("(一级分支行)", "").replace("甘肃银行股份有限公司", "")
        }
        var dkyezz1 =(data.towDay.贷款余额增长/1e8).toFixed(2);
        if (dkyezz1 > 0) {
            this.setState({
                dkyeRadioSrc: '/assets/images/branch/upA.png',
                dkyeRadioClassName: style.upArrow
            })
        } else if (dkyezz1 < 0) {
            this.setState({
                dkyeRadioSrc: '/assets/images/branch/downA.png',
                dkyeRadioClassName: style.downArrow,
            })
        } else if (dkyezz1 == 0) {
            this.setState({
                dkyeRadioSrc: '/assets/images/branch/blan.png',
                dkyeRadioClassName: style.blan,
            })
        }
        var ckyezz1=(data.towDay.存款余额增长/1e8).toFixed(2);
        if (ckyezz1> 0) {
            this.setState({
                ckyeRadioSrc: '/assets/images/branch/upA.png',
                ckyeRadioClassName: style.upArrow
            })
        } else if (ckyezz1< 0) {
            this.setState({
                ckyeRadioSrc: '/assets/images/branch/downA.png',
                ckyeRadioClassName: style.downArrow,
            })
        } else if (ckyezz1 == 0) {
            this.setState({
                ckyeRadioSrc: '/assets/images/branch/blan.png',
                ckyeRadioClassName: style.blan,
            })
        }
        var sxfzz1=(data.towDay.手续费及佣金收入增长/1e4).toFixed(2);
        if (sxfzz1 > 0) {
            this.setState({
                sxfRadioSrc: '/assets/images/branch/upA.png',
                sxfRadioClassName: style.upArrow
            })
        } else if (sxfzz1< 0) {
            this.setState({
                sxfRadioSrc: '/assets/images/branch/downA.png',
                sxfRadioClassName: style.downArrow,
            })
        } else if (sxfzz1 == 0) {
            this.setState({
                sxfRadioSrc: '/assets/images/branch/blan.png',
                sxfRadioClassName: style.blan,
            })
        }

        this.setState({
            // dkye:data["贷款余额"]?data["贷款余额"]/1e8.toFixed(2):0,
            backName: backNameTemp,
            dkye: data.oneDay.贷款余额,
            ckye: data.oneDay.存款余额,
            sxfjyjsr: data.oneDay.手续费及佣金收入,

            dkyeRadio: data.towDay.贷款余额增长,
            ckyeRadio: data.towDay.存款余额增长,
            sxfjyjsrRadio: data.towDay.手续费及佣金收入增长,

            dgcdb: data.oneDay.对公存贷比,
            dscdb: data.oneDay.对私存贷比,
            zczezzl: data.oneDay.资产总额增长率,
            yylrzzl: data.oneDay.营业利润增长率,

            fkl: data.oneDay.发卡量,
            dgzhs: data.oneDay.对公客户数,

            dqkhs: data.oneDay.当前客户数,

            fklDayAdd: data.towDay.发卡量增长,
            dgzhsDayAdd: data.towDay.对公客户数增长,
            dqkhsDayAdd: data.towDay.当前客户数增长,

            fklYearAdd: data.oneDay.发卡量年新增,
            dgzhsYeayAdd: data.oneDay.对公客户数年新增,
            dqkhsYeayAdd: data.oneDay.当前客户数年新增,


            // fklYeayAdd: 0,
            // dgzhsYeayAdd: 0,
            // dqkhsYeayAdd: 0,

            detailsLine: {
                //净利润趋势分析
                ylTrend: {
                    yl: data["lr_value"],
                    time: data["lr_time"],

                }
            }

        })
    }
    menuData = (data) => {
        var arr1 = new Array();
        let com = data.map((item, index) => {
            arr1.push(item.name)
        })
        this.setState({
            menuName: data,
            backName: "甘肃银行总行"
        })
        var code1 = this.state.menuName[this.state.index].code;
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


    funPrev(name, e) {
        window.open(name, '_self');
    }

    closeWindows() {
        if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") != -1) {
            window.open("about:blank","_self").close()
        } else {
            window.opener = null;
            window.open("", "_self");
            window.close();
        }
    }

    qh(backCode) {
        var box = document.getElementById("menu");
        box.style.display = "none";
        var box = document.getElementById("imgright");
        box.style.display = "block"
        var box = document.getElementById("imgleft");
        box.style.display = "none"
        // var i = this.fhName.findIndex(item => item === titleName);
        let self = this;
        //通过code查询分行数据
        this.qhGetOrgByCode(backCode);

    }

    render() {

        if(this.state.qpflage){
             return <Redirect to='/cdksdh' />
           // return this.props.history.push("/cdksdh");
        }
        let det = this.state;
        /* let leftBg = window.dominContext.staticPath + '/assets/images/branch/leftBg.png';*/
        let rotateCircle = window.dominContext.staticPath + '/assets/images/branch/rotateCircle.png';
        let bgSeat = window.dominContext.staticPath + '/assets/images/branch/bgSeat.png';
        // let downArrow = window.dominContext.staticPath + '/assets/images/branch/downArrow.png';
        // let upArrow = window.dominContext.staticPath + '/assets/images/branch/upArrow.png';
        // let downA = window.dominContext.staticPath + '/assets/images/branch/downA.png';
        // let upA = window.dominContext.staticPath + '/assets/images/branch/upA.png';
        let zcgm = window.dominContext.staticPath + '/assets/images/branch/zcgm.png';
        //向右展开
        // let imgright = window.dominContext.staticPath + '/assets/images/branch/imgright.png';
        // let imgleft = window.dominContext.staticPath + '/assets/images/branch/imgleft.png';

        let imgright = window.dominContext.staticPath + '/assets/images/branch/xy1.png';
        let imgleft = window.dominContext.staticPath + '/assets/images/branch/xz1.png';

        let menul1 = window.dominContext.staticPath + '/assets/images/branch/menu.png';
        // let butColse = window.dominContext.staticPath + '/assets/images/branch/butColose.png';
        let leftbg = window.dominContext.staticPath + '/assets/images/branch/left_bg.png';
        let leftjt = window.dominContext.staticPath + '/assets/images/branch/leftjt.png';
        let cdkborder = window.dominContext.staticPath + '/assets/images/branch/cdkborder.png';
        let qdzbborder = window.dominContext.staticPath + '/assets/images/branch/qdzbborder.png';
        let reightborder = window.dominContext.staticPath + '/assets/images/branch/reightborder.png';
        let zcgmtb = window.dominContext.staticPath + '/assets/images/branch/zcgmtb.png';
        let line1 = window.dominContext.staticPath + '/assets/images/branch/line1.png';
        let line2 = window.dominContext.staticPath + '/assets/images/branch/line2.png';
        let line3 = window.dominContext.staticPath + '/assets/images/branch/line3.png';
        let ycbk = window.dominContext.staticPath + '/assets/images/branch/ycbk.png';
        let jyltjdk = window.dominContext.staticPath + '/assets/images/branch/jyltjdk.png';
        let qq = window.dominContext.staticPath + '/assets/images/branch/qq.png';
        let cdksdh = window.dominContext.staticPath + '/dist/#/cdksdh';
        const arrnew = [];
        var menuArr = this.state.menuName;
        if (menuArr.length > 0) {
            var index = 0;
            menuArr.forEach(item => {
                var backName = "";
                if (item.name == "甘肃银行股份有限公司") {
                    backName = "甘肃银行总行"
                } else if (item.name == "甘肃银行股份有限公司营业部(一级分支行)") {
                    backName = "总行营业部"
                } else {
                    backName = item.name.replace("(一级分支行)", "").replace("甘肃银行股份有限公司", "")
                }
                // arrnew.push(<div className={style1.btit} key={item.code}  onClick={this.qh}>{backName}</div>)
                arrnew.push(<div className={style1.btit} key={item.code}
                                 onClick={() => this.qh(item.code)}>{backName}</div>)
            })
        }

        {/*<img src={det.dkyeRadio >0 ? upA : downA}*/
        }
        {/*     className={det.dkyeRadio >= 0 ? style.upArrow : style.downArrow}/>*/
        }
        return (
            <div className={style.BranchIndex}>
                <div className={style1.menu} id='menu' style={{display: "none"}}>
                    {arrnew}
                </div>
                {/*向右图标*/}
                <div className={style1.imgright} id='imgright' onClick={this.turnRight.bind(this, 'imgleft')}>
                    <img src={imgright} style={{width: '100%', height: '100%'}} id="tb"></img>
                </div>
                <div className={style1.imgleft} id='imgleft' onClick={this.turnRight.bind(this, 'imgright')}
                     style={{display: 'none'}}>
                    <img src={imgleft} style={{width: '100%', height: '100%'}} id="tb"></img>
                </div>
                <div className={style.bgvideo}>
                    <video style={{width: '100%', height: '100%'}} loop muted autoPlay
                           src={window.dominContext.staticPath + '/assets/videos/common/d.mp4'}> Your browser does
                        not support the video tag
                    </video>
                    {/*<video loop muted autoPlay src={window.dominContext.staticPath + '/assets/videos/common/left01.mp4'}> Your browser does not support the video tag</video>*/}
                </div>

                {/*左侧内容*/}
                <div style={{
                    position: 'absolute',
                    top: '39px',
                    left: '35px',
                    height: '998px',
                    background: 'url(' + leftbg + ')',
                    width: '851px'
                }}>
                    <div
                        className={style1.title}>{det.backName}</div>
                    <div style={{
                        position: 'absolute',
                        top: '86px',
                        left: '30px',
                        height: '301px',
                        background: 'url(' + cdkborder + ')',
                        width: '267px'
                    }}>
                        <div className={style1.zcfzze}>
                            {/*{(det['贷款余额'] / 1e8).toFixed(2)}*/}
                            <p className={style1.zcfzzeName}>贷款总额（亿元）</p>
                            <p className={style1.zcfzzeValue}>{(det.dkye / 1e8).toFixed(2)}
                                <span style={{position: 'absolute', top: '60px', left: '165px'}}>
                            <img src={det.dkyeRadioSrc} className={det.dkyeRadioClassName}/>

                                    {/*<img src={det.dkyeRadio >0 ? upA : downA}*/}
                                    {/*     className={det.dkyeRadio >= 0 ? style.upArrow : style.downArrow}/>*/}
                                    <div className={style.ztsub}>{Math.abs(det.dkyeRadio / 1e8).toFixed(2)}</div>
                        </span>
                            </p>
                        </div>

                        <div className={style1.zcfzze}>
                            <p className={style1.zcfzzeName}>存款总额（亿元）</p>
                            <p className={style1.zcfzzeValue}>{(det.ckye / 1e8).toFixed(2)}
                                <span style={{position: 'absolute', left: '165px'}}>
                            {/*<img src={det.ckyeRadio >= 0 ? upA : downA} className={det.ckyeRadio >= 0 ? style.upArrow : style.downArrow}/>*/}
                                    <img src={det.ckyeRadioSrc} className={det.ckyeRadioClassName}/>
                            <div className={style.ztsub}>{Math.abs(det.ckyeRadio / 1e8).toFixed(2)}</div>
                        </span>
                            </p>
                        </div>
                        <div className={style1.zcfzze}>
                            <p className={style1.zcfzzeName}>中间业务收入总额（万元）</p>
                            <p className={style1.zcfzzeValue}>{(det.sxfjyjsr / 1e4).toFixed(2)}
                                <span style={{position: 'absolute', left: '165px'}}>
                            {/*<img src={det.sxfjyjsrRadio >= 0 ? upA : downA} className={det.sxfjyjsrRadio >= 0 ? style.upArrow : style.downArrow}/>*/}
                                    <img src={det.sxfRadioSrc} className={det.sxfRadioClassName}/>
                            <div className={style.ztsub}>{Math.abs(det.sxfjyjsrRadio / 1e4).toFixed(2)}</div>
                        </span>
                            </p>
                        </div>
                    </div>
                    <div style={{
                        position: 'absolute',
                        top: 85,
                        left: 311,
                        height: '301px',
                        background: 'url(' + qdzbborder + ')',
                        width: '508px'
                    }}>
                        {/*<p className={style1.chartsName}>按渠道占比统计</p>*/}
                        <Chart className={style1.ring} option={this.state.ringOption}/>
                    </div>
                    <TitleChart
                        style={{position: 'absolute', left: '4%', top: 400, width: 800, height: 300}}
                        titleStyle={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            color: "#00AEFF",
                            fontSize: 19,
                            width: '100%',
                            textAlign: "center"
                        }}
                        chartStyle={{width: 800, height: 300}}
                        title={`营业利润趋势分析`}
                        option={DataCreater.ylTrend(this.state.detailsLine.ylTrend)}
                    />
                    {/* 分行贷款TOP10*/}
                    <h3 style={{
                        fontSize: 19,
                        color: "#00AEFF",
                        position: "absolute",
                        fontFamily: '微软雅黑',
                        fontWeight: 'bold',
                        top: 700,
                        left: 134
                    }}>分行贷款TOP10<span style={{fontSize: '16px', fontFamily: '微软雅黑', fontWeight: 'bold'}}>(亿元)</span>
                    </h3>
                    <h3 style={{
                        fontSize: 19,
                        color: "#00AEFF",
                        position: "absolute",
                        fontFamily: '微软雅黑',
                        fontWeight: 'bold',
                        top: 700,
                        left: 479
                    }}>分行存款TOP10<span style={{fontSize: '16px', fontFamily: '微软雅黑', fontWeight: 'bold'}}>(亿元)</span>
                    </h3>

                    <TitleChart
                        style={{width: 359, height: 296, position: 'absolute', left: 64, bottom: 23, zIndex: 9}}
                        titleStyle={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            fontSize: 24,
                            width: '100%',
                            textAlign: "center"
                        }}
                        chartStyle={{width: 359, height: 311}}
                        option={this.state.daikuanTop10}
                    />

                    <TitleChart
                        style={{width: 359, height: 296, position: 'absolute', left: 460, bottom: 23, zIndex: 9}}
                        titleStyle={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            fontSize: 24,
                            width: '100%',
                            textAlign: "center"
                        }}
                        chartStyle={{width: 359, height: 311}}
                        option={this.state.cunkuanTop10}
                    />
                </div>
                {/*右边内容*/}
                <div style={{
                    position: 'absolute',
                    top: '74px',
                    left: '904px',
                    height: '964px',
                    background: 'url(' + reightborder + ')',
                    width: '980px'
                }}>
                    <div style={{position: 'absolute', height: '150px', width: '980px'}}>
                        <h1 style={{position: 'absolute', top: '35px', left: '192px', fontSize: 26}}><span
                            style={{color: "#FBFBFA"}}>核心系统当日交易总量&nbsp;&nbsp;当日发生额：</span>
                            <span style={{color: "#ECD998"}}>¥</span>
                            <CountUp style={{color: "#ECD998"}}
                                     start={det.startjyjj}
                                     end={det.endjyjj}
                                     separator=","
                            />
                        </h1>
                        {/*<CountUp className={style1.showa} start={0} end={45} duration={1} formattingFn={domFun}/>*/}


                        <p style={{
                            position: 'absolute',
                            width: '752px',
                            height: '60px',
                            top: '86px',
                            left: '100px',
                            background: 'url(' + jyltjdk + ')',
                            fontSize: 26
                        }}>
                            <p style={{height: '7px'}}></p>
                            <CountUp className={style1.runNums} start={det.startjyl}
                                     end={det.endjyl}
                                     separator=","
                                     prefix={det.jylbl}
                            />
                            <span className={style1.runNums1}>笔</span>
                        </p>
                    </div>
                </div>
                <h3 style={{
                    fontSize: 26,
                    color: "#00AEFF",
                    width: "605px",
                    height: "60px",
                    background: 'url(' + zcgmtb + ')',
                    position: "absolute",
                    fontFamily: '微软雅黑',
                    fontWeight: 'bold',
                    top: 240,
                    right: 231
                }}>
                    <span style={{position: 'absolute', left: "250px", top: "10px"}}>资产规模</span></h3>

                {/* 右侧 */}
                <img src={rotateCircle} className={style.rotateCirlce}/>
                <img src={bgSeat} className={style.bgSeat}/>
                <TitleValueCountUp
                    style={{position: 'absolute', top: 377, left: 1292}}
                    titleStyle={{fontSize: 14, textAlign: 'center'}}
                    valueClassName={style.value}
                    title={`资产总额`}
                    value={(det.zcze / 1e8)}
                    decimals={2}
                    duration={5}
                    // prefix={`<i style=font-size:20px;color:red>亿元</i>`}
                    suffix={`<i style=font-size:12px;font-family:fzxs;color:#aaa;>亿元</i>`}
                />
                <div style={{position: 'absolute', top: 403, left: 1410, overflow: 'hidden'}}>
                    {/*<img src={det.zczeRadio >= 0 ? upArrow : downArrow}*/}
                    {/*     className={det.zczeRadio >= 0 ? style.upArrow : style.downArrow}/>*/}

                    <img src={det.ZcRadioSrc} className={det.ZcRadioClassName}/>

                    <div className={style.sub}>{Math.abs(det.zczeRadio / 1e8).toFixed(2)}</div>
                </div>
                <TitleValueCountUp
                    style={{position: 'absolute', top: 440, left: 1292}}
                    titleStyle={{fontSize: 14, textAlign: 'center'}}
                    valueClassName={style.value}
                    title={`负债总额`}
                    value={det.fzze / 1e8}
                    decimals={2}
                    duration={5}
                    suffix={`<i style=font-size:12px;font-family:fzxs;color:#aaa;>亿元</i>`}
                />
                <div style={{position: 'absolute', top: 466, left: 1410}}>
                    {/*<img src={det.fzzeRadio >= 0 ? upArrow : downArrow} className={det.fzzeRadio >= 0 ? style.upArrow : style.downArrow}/>*/}
                    <img src={det.FzRadioSrc} className={det.FzRadioClassName}/>
                    <div className={style.sub}>{Math.abs(det.fzzeRadio / 1e8).toFixed(2)}</div>
                </div>
                <TitleValueCountUp
                    style={{position: 'absolute', top: 500, left: 1308}}
                    titleStyle={{fontSize: 14, textAlign: 'center'}}
                    valueClassName={style.value}
                    title={`净资产余额`}
                    value={det.jzcye / 1e8}
                    decimals={2}
                    duration={5}
                    suffix={`<i style=font-size:12px;font-family:fzxs;color:#aaa;>亿元</i>`}
                />
                <div style={{position: 'absolute', top: 524, left: 1410}}>
                    {/*<img src={det.jzcyeRadio >= 0 ? upArrow : downArrow} className={det.jzcyeRadio >= 0 ? style.upArrow : style.downArrow}/>*/}
                    <img src={det.JRadioSrc} className={det.JRadioClassName}/>
                    <div className={style.sub}>{Math.abs(det.jzcyeRadio / 1e8).toFixed(2)}</div>
                </div>
                <div style={{
                    position: 'absolute',
                    left: 984,
                    top: 619,
                    fontSize: 14,
                    width: 833,
                    textAlign: "center",
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    textShadow: "rgb(255, 255, 255) 0px 0px 30px"
                }}>{det.backName}</div>
                <ItemGauge
                    style={{position: "absolute", left: 1006, top: 649, width: 170, height: 170}}
                    data={{
                        title: "资产增长率",
                        r: 75,
                        min: 0,
                        max: 1,
                        value: det.zczezzl || 0,
                        radian: 170
                    }}
                />
                <ItemGauge
                    style={{position: "absolute", left: 1204, top: 649, width: 170, height: 170}}
                    data={{
                        title: "营业利润增长率",
                        r: 75,
                        min: 0,
                        max: 1,
                        value: det.yylrzzl || 0,
                        radian: 170
                    }}
                />
                <ItemGauge
                    style={{position: "absolute", left: 1409, top: 649, width: 170, height: 170}}
                    data={{title: "对公存贷比", r: 75, min: 0, max: 1, value: this.state.dgcdb, radian: 170}}
                />
                <ItemGauge
                    style={{position: "absolute", left: 1606, top: 649, width: 170, height: 170}}
                    data={{title: "对私存贷比", r: 75, min: 0, max: 1, value: this.state.dscdb, radian: 170}}
                />
                <ul style={{position: 'absolute', top: 848, left: 994}}>
                    <li className={style1.ulli}>
                        <div style={{
                            width: 100,
                            position: 'absolute',
                            color: '#FEFDFD',
                            fontSize: 20,
                            font: 'bold'
                        }}>当前客户
                        </div>
                        <CountUp style={{
                            width: 100,
                            position: 'absolute',
                            left: 117,
                            color: '#F49DF1',
                            fontSize: 18,
                            font: 'bold'
                        }} start={0}
                                 end={det.dqkhs}
                                 separator=","
                        />
                        <div style={{width: 100, position: 'absolute', left: 282}}>上日新增</div>
                        <CountUp style={{width: 100, position: 'absolute', color: '#77C5FA', left: 389}} start={0}
                                 end={det.dqkhsDayAdd}
                                 separator=","
                        />
                        <div style={{width: 100, position: 'absolute', left: 543}}>本年新增</div>
                        <CountUp style={{width: 100, position: 'absolute', color: '#77C5FA', left: 658}} start={0}
                                 end={det.dqkhsYeayAdd}
                                 separator=","
                        />
                    </li>
                    <li className={style1.ulli}>
                        <img src={line1} className={style1.line}/>
                    </li>
                    <li className={style1.ulli}>
                        <div
                            style={{width: 100, position: 'absolute', color: '#FEFDFD', fontSize: 20, font: 'bold'}}>发卡量
                        </div>
                        <CountUp style={{
                            width: 100,
                            position: 'absolute',
                            left: 117,
                            color: '#F49DF1',
                            fontSize: 18,
                            font: 'bold'
                        }} start={0}
                                 end={det.fkl}
                                 separator=","
                        />
                        <div style={{width: 100, position: 'absolute', left: 282}}>上日新增</div>
                        <CountUp style={{width: 100, position: 'absolute', color: '#77C5FA', left: 389}} start={0}
                                 end={det.fklDayAdd}
                                 separator=","
                        />
                        <div style={{width: 100, position: 'absolute', left: 543}}>本年新增</div>
                        <CountUp style={{width: 100, position: 'absolute', color: '#77C5FA', left: 658}} start={0}
                                 end={det.fklYearAdd}
                                 separator=","
                        />
                    </li>
                    <li className={style1.ulli}>
                        <img src={line2} className={style1.line}/>
                    </li>
                    <li className={style1.ulli}>
                        <div style={{
                            width: 100,
                            position: 'absolute',
                            color: '#FEFDFD',
                            fontSize: 20,
                            font: 'bold'
                        }}>对公客户
                        </div>
                        <CountUp style={{
                            width: 100,
                            position: 'absolute',
                            left: 117,
                            color: '#F49DF1',
                            fontSize: 18,
                            font: 'bold'
                        }} start={0}
                                 end={det.dgzhs}
                                 separator=","
                        />
                        <div style={{width: 100, position: 'absolute', left: 282}}>上日新增</div>
                        <CountUp style={{width: 100, position: 'absolute', color: '#77C5FA', left: 389}} start={0}
                                 end={det.dgzhsDayAdd}
                                 separator=","
                        />
                        <div style={{width: 100, position: 'absolute', left: 543}}>本年新增</div>
                        <CountUp style={{width: 100, position: 'absolute', color: '#77C5FA', left: 658}} start={0}
                                 end={det.dgzhsYeayAdd}
                                 separator=","
                        />
                    </li>
                    <li className={style1.ulli}>
                        <img src={line3} className={style1.line}/>
                    </li>
                </ul>
                <div className={style1.pageShow} id='pageShow' style={{display: "none"}}>
                    {/*<button className={style1.prev} onClick={this.funPrev.bind(this,MSProv2)}>上一屏</button>*/}
                    {/*<a className={style1.next}  href={cdksdh}>下一屏</a>*/}
                    <a className={style1.next}  onClick={()=>this.props.history.push("/cdksdh")}>下一屏</a>
                    {/*<a className={style1.next}>下一屏</a>*/}
                    <button className={style1.close} onClick={this.closeWindows}>关 闭</button>
                </div>
                <div className={style1.menuright}>
                    <img src={menul1} onClick={this.pageup}></img>
                </div>
                <img src={ycbk} className={style1.ycbk}/>
            </div>
        )
    }
}
