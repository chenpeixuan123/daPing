import React, {Component} from 'react'
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
let lastGmv = 0;
let currentGmv = 0;
/*var flage="a";
var titleIndex=0;*/
export default class Branch0927 extends Component {
    constructor(props) {
        super(props);
        window.share.resetPageSize(1916, 1076);
        this.qh = this.qh.bind(this);
        this.titleIndex = 0;
        this.fhName = [
            "甘肃银行总行",
            "总行营业部",
            "兰州市中央广场支行",
            "兰州市七里河支行",
            "兰州市安宁支行",
            "兰州市城关支行",
            "兰州市高薪支行",
            "兰州市西固支行",
            "兰州市兴陇支行",
            "兰州新区支行",
            "嘉峪关分行",
            "临夏分行",
            "白银分行",
            "定西分行",
            "甘南分行",
            "金昌支行",
            "酒泉分行",
            "陇南分行",
            "平凉分行",
            "庆阳分行",
            "天水分行",
            "武威分行",
            "张掖分行"
        ];
        this.format15Branch = {
            "甘肃银行股份有限公司": {
                "资产总额": [],
                "负债总额": [],
                "资产总额时间": [],
                "存款余额": [],
                "贷款余额": [],
                "存款余额时间": [],
                "营业利润": [],
                "营业利润时间": [],
                "营业收入": [],
                "营业收入时间": []
            }
        };
        this.state = {
            ringOption: DataCreater.createRingOption([{name: "智能柜台", value: 56.8}, {
                    name: "智能柜面",
                    value: 14.8
                }, {name: "自主渠道", value: 12.7}, {name: "电子渠道", value: 12.7}]),
            zfywze: 0,
            ztFlage: false,
            cunkuanTop10: ([{name: "1", value: '2001'},{name: "2", value: '2002'},{name: "3", value: '2003'},]),
            daikuanTop10:([{name: "4", value: '2004'},{name: "5", value: '2005'},{name: "6", value: '2006'},]),
            details: {
                "时间": 1,//用于判断1
                "名称": "甘肃银行股份有限公司",
                "资产总额": [0],
                "负债总额": 0,
                "贷款余额": 0,
                "存款余额": 0,
                "净利润": 0,
                "手续费及佣金收入": 0,
            },
            detailsLine: {
                zcLev: 0,
                ysLev: 0,
                zcfzLine: {
                    zc: [],
                    fz: [],
                    time: [],
                },
                //净利润趋势分析
                ylTrend: {
                    yl: [1,2,3,4],

                    time: ['2011','2012','2013','2014'],
                },
            }
        }
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
        this.timer = null;
        this.braID = null;
        this.formatBranch = null;
    }

    componentDidMount() {
        let self = this;
        // 各各个分行数据
        self.braID.forEach(
            (v) => {
                Tools.fetchGet(
                    window.locationConfig.TGTest.customer.address12 + `{"name":"${v}"}`,
                    {'Content-Type': 'application/json'},
                    self.upDateBrach
                )

            }
        )
        self.timer = setInterval(self.start, 30000);
        self.flagZT = setInterval(self.getZTData, window.locationConfig.ZTInterface.interface.linkLogin.loopTime);
        setInterval(self.getaqdzbData, 86400000);//一天一次，一秒1000毫秒
    }
    start = () => {

    }






    //两天资产总额,负债总额,净资产余额对比
    getODSData2Day = () => {
        if (window.locationConfig.debug) {
        } else {
            let startTStr = moment().subtract(2, 'days').format("YYYY-MM-DD 00:00:00");
            let endTStr = moment().format("YYYY-MM-DD HH:mm:ss");
            Tools.fetchGet(window.locationConfig.TGInterface.interface.ods.address + "?subname=资产总额,负债总额,净资产余额,对公账户数&startTime=" + startTStr + "&endTime=" + endTStr,
                {'Content-Type': 'application/json'},
                this.updateODSData2Day);
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

    closeWindows() {
        if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1) {
            window.location.href='about:blank';

            window.close();
        } else {
            window.opener = null;
            window.open("", "_self");
            window.close();
        }

    }
    qh(e) {
        var titleName = e.target.innerText;
        var i = this.fhName.findIndex(item => item === titleName);
        let self = this;
        this.flage = "b";
        this.titleIndex = i;
        this.start();
        var box = document.getElementById("menu");
        box.style.display = "none";
        var box = document.getElementById("imgright");
        box.style.display = "block"
        var box = document.getElementById("imgleft");
        box.style.display = "none"

    }

    render() {
        alert(4);
        let det = this.state.details;
        /* let leftBg = window.dominContext.staticPath + '/assets/images/branch/leftBg.png';*/
        let rotateCircle = window.dominContext.staticPath + '/assets/images/branch/rotateCircle.png';
        let bgSeat = window.dominContext.staticPath + '/assets/images/branch/bgSeat.png';
        let downArrow = window.dominContext.staticPath + '/assets/images/branch/downArrow.png';
        let upArrow = window.dominContext.staticPath + '/assets/images/branch/upArrow.png';
        let downA = window.dominContext.staticPath + '/assets/images/branch/downA.png';
        let upA = window.dominContext.staticPath + '/assets/images/branch/upA.png';
        let zcgm = window.dominContext.staticPath + '/assets/images/branch/zcgm.png';
        let imgright = window.dominContext.staticPath + '/assets/images/branch/imgright.png';
        let imgleft = window.dominContext.staticPath + '/assets/images/branch/imgleft.png';

        let menul1 = window.dominContext.staticPath + '/assets/images/branch/menu.png';
        let butColse = window.dominContext.staticPath + '/assets/images/branch/butColose.png';
        let MSProv2 = window.dominContext.staticPath + '/#/MSProv2';
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
        let arrnew=new Array();
        this.fhName.forEach(item => {
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
                    <video style={{width: '100%', height: '100%'}} loop muted autoPlay
                           src={window.dominContext.staticPath + '/assets/videos/common/a.mp4'}> Your browser does
                        not support the video tag
                    </video>
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
                        className={style1.title}>名称12</div>
                    <div style={{
                        position: 'absolute',
                        top: '86px',
                        left: '30px',
                        height: '301px',
                        background: 'url(' + cdkborder + ')',
                        width: '267px'
                    }}>
                        <div className={style1.zcfzze}>
                            <p className={style1.zcfzzeName}>贷款总额（亿元）</p>
                            <p className={style1.zcfzzeValue}>贷款总额77
                                <span style={{position: 'absolute', top: '60px', left: '172px'}}>
                            <img src={458>= 0 ? upA : downA}
                                 className={458>= 0 ? style.upArrow : style.downArrow}/>
                            <div className={style.ztsub}>{Math.abs(789954455441 / 1e8).toFixed(2)}</div>
                        </span>
                            </p>
                        </div>

                        {/*<div className={style1.zcfzze}>
                            <p className={style1.zcfzzeName}>存款总额（亿元）</p>
                            <p className={style1.zcfzzeValue}>{(det['存款余额'] / 1e8).toFixed(2)}
                                <span style={{position: 'absolute', left: '172px'}}>
                            <img src={det['存款余额增长'] >= 0 ? upA : downA}
                                 className={det['存款余额增长'] >= 0 ? style.upArrow : style.downArrow}/>
                            <div className={style.ztsub}>{Math.abs(det['存款余额增长'] / 1e8).toFixed(2)}</div>
                        </span>
                            </p>
                        </div>
                        <div className={style1.zcfzze}>
                            <p className={style1.zcfzzeName}>中间业务收入总额（万元）</p>
                            <p className={style1.zcfzzeValue}>{(det['手续费及佣金收入'] / 1e4).toFixed(2)}
                                <span style={{position: 'absolute', left: '172px'}}>
                            <img src={det['手续费及佣金收入'] >= 0 ? upA : downA}
                                 className={det['手续费及佣金收入'] >= 0 ? style.upArrow : style.downArrow}/>
                            <div className={style.ztsub}>{Math.abs(det['手续费及佣金收入'] / 1e4).toFixed(2)}</div>
                        </span>
                            </p>
                        </div>*/}
                    </div>
                    <div style={{
                        position: 'absolute',
                        top: 85,
                        left: 311,
                        height: '301px',
                        background: 'url(' + qdzbborder + ')',
                        width: '508px'
                    }}>
                        <p className={style1.chartsName}>按渠道占比统计</p>
                        <Chart className={style1.ring} style={{position: 'absolute', top: 30, left: 28}}
                               option={this.state.ringOption}/>
                    </div>
                    <TitleChart
                        style={{position: 'absolute', left: 0, top: 400, width: 800, height: 300}}
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
                                     start={2}
                                     end={8}
                                     separator=","
                            />
                        </h1>
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
                            <CountUp className={style1.runNums} start={this.state.startjyl}
                                     end={3}
                                     separator=","
                                     prefix={7}
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
                {/*<TitleValueCountUp
                    style={{position: 'absolute', top: 377, left: 1292}}
                    titleStyle={{fontSize: 14, textAlign: 'center'}}
                    valueClassName={style.value}
                    title={`资产总额`}
                    value={this.state.zichanzonge}
                    decimals={2}
                    duration={5}
                    // prefix={`<i style=font-size:20px;color:red>亿元</i>`}
                    suffix={`<i style=font-size:12px;font-family:fzxs;color:#aaa;>亿元</i>`}
                />
                <div style={{position: 'absolute', top: 403, left: 1410, overflow: 'hidden'}}>
                    <img src={this.state.zichanzongeRadio >= 0 ? upArrow : downArrow}
                         className={this.state.zichanzongeRadio >= 0 ? style.upArrow : style.downArrow}/>
                    <div className={style.sub}>{Math.abs(this.state.zichanzongeRadio).toFixed(2)}</div>
                </div>
                <TitleValueCountUp
                    style={{position: 'absolute', top: 440, left: 1292}}
                    titleStyle={{fontSize: 14, textAlign: 'center'}}
                    valueClassName={style.value}
                    title={`负债总额`}
                    value={this.state.fuzhaizonge}
                    decimals={2}
                    duration={5}
                    suffix={`<i style=font-size:12px;font-family:fzxs;color:#aaa;>亿元</i>`}
                />
                <div style={{position: 'absolute', top: 466, left: 1410}}>
                    <img src={this.state.fuzhaizongeRadio >= 0 ? upArrow : downArrow}
                         className={this.state.fuzhaizongeRadio >= 0 ? style.upArrow : style.downArrow}/>
                    <div className={style.sub}>{Math.abs(this.state.fuzhaizongeRadio).toFixed(2)}</div>
                </div>
                <TitleValueCountUp
                    style={{position: 'absolute', top: 500, left: 1308}}
                    titleStyle={{fontSize: 14, textAlign: 'center'}}
                    valueClassName={style.value}
                    title={`净资产余额`}
                    value={this.state.jingzichanyue}
                    decimals={2}
                    duration={5}
                    suffix={`<i style=font-size:12px;font-family:fzxs;color:#aaa;>亿元</i>`}
                />
                <div style={{position: 'absolute', top: 524, left: 1410}}>
                    <img src={this.state.jingzichanyueRadio >= 0 ? upArrow : downArrow}
                         className={this.state.jingzichanyueRadio >= 0 ? style.upArrow : style.downArrow}/>
                    <div className={style.sub}>{Math.abs(this.state.jingzichanyueRadio).toFixed(2)}</div>
                </div>*/}
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
                }}>名称1</div>
                <ItemGauge
                    style={{position: "absolute", left: 1006, top: 649, width: 170, height: 170}}
                    data={{
                        title: "资产增长率",
                        r: 75,
                        min: 0,
                        max: 1,
                        value: 111,
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
                        value: 888 || 0,
                        radian: 170
                    }}
                />
                <ItemGauge
                    style={{position: "absolute", left: 1409, top: 649, width: 170, height: 170}}
                    data={{title: "贷款任务完成率", r: 75, min: 0, max: 1, value:777, radian: 170}}
                />
                <ItemGauge
                    style={{position: "absolute", left: 1606, top: 649, width: 170, height: 170}}
                    data={{title: "存款任务完成率", r: 75, min: 0, max: 1, value: 666, radian: 170}}
                />
                <ul style={{position: 'absolute', top: 848, left: 994}}>
                    <li className={style1.ulli}>
                        <div style={{
                            width: 100,
                            position: 'absolute',
                            color: '#FEFDFD',
                            fontSize: 20,
                            font: 'bold'
                        }}>当前客户数
                        </div>
                        <CountUp style={{
                            width: 100,
                            position: 'absolute',
                            left: 117,
                            color: '#F49DF1',
                            fontSize: 18,
                            font: 'bold'
                        }} start={0}
                                 end={555}
                                 separator=","
                        />
                        <div style={{width: 100, position: 'absolute', left: 282}}>当日新增</div>
                        <CountUp style={{width: 100, position: 'absolute', color: '#77C5FA', left: 389}} start={0}
                                 end={444}
                                 separator=","
                        />
                        <div style={{width: 100, position: 'absolute', left: 543}}>本年新增</div>
                        <CountUp style={{width: 100, position: 'absolute', color: '#77C5FA', left: 658}} start={0}
                                 end={333}
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
                                 end={222}
                                 separator=","
                        />
                        <div style={{width: 100, position: 'absolute', left: 282}}>当日新增</div>
                        <CountUp style={{width: 100, position: 'absolute', color: '#77C5FA', left: 389}} start={0}
                                 end={111}
                                 separator=","
                        />
                        <div style={{width: 100, position: 'absolute', left: 543}}>本年新增</div>
                        <CountUp style={{width: 100, position: 'absolute', color: '#77C5FA', left: 658}} start={0}
                                 end={99}
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
                        }}>对公账户
                        </div>
                        <CountUp style={{
                            width: 100,
                            position: 'absolute',
                            left: 117,
                            color: '#F49DF1',
                            fontSize: 18,
                            font: 'bold'
                        }} start={0}
                                 end={88}
                                 separator=","
                        />
                        <div style={{width: 100, position: 'absolute', left: 282}}>当日新增</div>
                        <CountUp style={{width: 100, position: 'absolute', color: '#77C5FA', left: 389}} start={0}
                                 end={123}
                                 separator=","
                        />
                        <div style={{width: 100, position: 'absolute', left: 543}}>本年新增</div>
                        <CountUp style={{width: 100, position: 'absolute', color: '#77C5FA', left: 658}} start={0}
                                 end={321}
                                 separator=","
                        />
                    </li>
                    <li className={style1.ulli}>
                        <img src={line3} className={style1.line}/>
                    </li>
                </ul>
                <div className={style1.pageShow} id='pageShow' style={{display: "none"}}>
                    {/*<button className={style1.prev} onClick={this.funPrev.bind(this,MSProv2)}>上一屏</button>*/}
                    {/* <a className={style1.prev}  href={MSProv2}>上一屏</a>*/}
                    {/*<button className={style1.next}>下一屏</button>*/}
                    <button className={style1.close}  onClick={this.closeWindows}>关 闭</button>
                </div>
                <div className={style1.menuright}>
                    <img src={menul1} onClick={this.pageup}></img>
                </div>
                <img src={ycbk} className={style1.ycbk}/>
            </div>
        )
    }
}
