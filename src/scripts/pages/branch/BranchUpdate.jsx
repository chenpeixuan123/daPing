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
export default class Branch extends Component {
    constructor(props) {
        super(props);
        window.share.resetPageSize(1916, 1076);
        this.qh = this.qh.bind(this);
        // 右侧4个结构
        this.flagege = "a";
        this.titleIndex = 0;
        this.zcID = ["I0030094", "I0030044", "I0030093", "I0030045", "I0037001", "I0030095"];
        this.zcColor = ["#abfbfa", "#77e6e5", "#4cccca", "#31b0ad", "#15908d", "#017c6f"];
        this.fzID = ["I0030051", "I0030092", "I0030075", "I0030054", "I0037002", "I0030053"];
        this.fzColor = ["#f5dfa6", "#fed97f", "#e5c372", "#dcb149", "#d19810", "#bb8402"];
        this.ckID = ["I0030098", "I10300021", "I00300861", "I00300841", "I0030082", "I1030002"];
        this.ckColor = ["#89c1fa", "#a09bec", "#8984e8", "#716cde", "#635cd6", "#4e48be"];
        this.dkID = ["I0030037", "I0030035", "I0030038"];
        this.dkColor = ['#2d77c4', '#4f99e8', '#89c1fa'];
        this.zcArr = new Array();
        this.fzArr = new Array();
        this.ckArr = new Array();
        this.dkArr = new Array();
        this.odsData1 = {};
        this.tdCurData = {};
        //资产总额--负债总额---贷款余额、贷款任务完成率---存款余额、存款任务完成率---净利润、净利润完成率(计算当天)
        this.braID = ["I0030001", "I0030002", "I0030006", "I0030005", "I0030099","SXFJYJSR"];//  I0030099净利润净利润完成率ODS推数异常
        this.formatBranch = new Object();
        this.zengzhang = new Object();
        // 资产-负债-贷款-存款- 营业利润-营业收入(计算15天各个分行曲线) 分别计算资产增长率 营业利润增长率
        this.bra15DataID = ["I0030001", "I0030002", "I0030006", "I0030005", "I00300251", "I0030025"];
        this.zengZhang2Day = ["I0030006", "I0030005","SXFJYJSR"];
        this.sortFhName=new Array();
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
        this.zengzhangdx = {
            "甘肃银行股份有限公司": {
                "贷款余额增长": 0,
                "存款余额增长": 0,
                "手续费及佣金收入增长": 0
            }
        };
        this.caledTDData = {
            "TD_hexinjiaoyiliang": {
                hisMax: 0,
                tenAvg: 0,
                yesterdayData: [],
                todayHourValue: []
            },
            "TD_hexin": {
                todayHourValue: []
            },
            "TD_hexin_ZB": {
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
        // 查找 formatBranch format15Branch 中的key 展示
        this.oneByOne = [
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
            zfywze: 0,
            ztFlage: false,
            dkze: 0,
            dkzeRadio: 0,
            kcze: 0,
            kczeRadio: 0,
            zjywsrze: 0,
            zjywsrzeRadio: 0,
            zichanzonge: 0,
            zichanzongeRadio: 0,
            fuzhaizonge: 0,
            fuzhaizongeRadio: 0,
            jingzichanyue: 0,
            jingzichanyueRadio: 0,
            duigongzhanghuzz: 0,
            startjyl: 0,
            endjyl: 0,
            startjyjj: 0,
            endjyjj: 0,
            jylbl: '',
            index: 0,
            cardAccountNumber: 0,
            cardYesterdayAdd: 0,
            cardYearAdd: 0,
            cunkuanTop10: DataCreater.top10([{name: "", value: ''}]),
            daikuanTop10: DataCreater.top10([{name: "", value: ''}]),
            // ringOption: DataCreater.createRingOption([{name: "智能柜台", value: 56.8}, {
            //     name: "智能柜面",
            //     value: 14.8
            // }, {name: "自主渠道", value: 12.7}, {name: "电子渠道", value: 12.7}]),
            ringOption: DataCreater.createRingOption([{subname: "", value: ''}]),
            details: {
                "时间": 1,//用于判断1
                "名称": "甘肃银行股份有限公司",
                "资产总额": [0],
                "负债总额": 0,
                "贷款余额": 0,
                "存款余额": 0,
                "净利润": 0,
                "手续费及佣金收入": 0,

                // "资产增长率":0,
                "利润完成率": 0,
                "贷款任务完成率": 0,
                "存款任务完成率": 0,
                "营业利润": 0,
                "营业收入": 0,
                "贷款余额增长": 0,
                "存款余额增长": 0,
                "手续费及佣金收入增长": 0,

            },
            detailsLine: {
                zcLev: 0,
                ysLev: 0,
                zcfzLine: {
                    zc: [],
                    fz: [],
                    time: [],
                },
                ckdkLine: {
                    ck: [],
                    dk: [],
                    time: []
                },
                //净利润趋势分析
                ylTrend: {
                    yl: [],

                    time: [],
                },
                // 营收趋势分析
                ysTrend: {
                    ys: [],
                    time: []
                }
            },
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
                    time: [],
                    custom: [],
                    account: []
                }
            },
            //msprov 资产结构{time: "2018-06-13T01:51:00Z", subname: "对公存款", name: "I0006", value: "1"}
            zcJieGou: DataCreater.jieGouPie([]),
            fzJieGou: DataCreater.jieGouPie([]),
            dkJieGou: DataCreater.jieGouPie2([]),
            ckJieGou: DataCreater.jieGouPie2([])
        }
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
        this.timer = null;
        this.zcID = null;
        this.zcColor = null;
        this.fzID = null;
        this.fzColor = null;
        this.ckID = null;
        this.ckColor = null;
        this.dkID = null;
        this.dkColor = null;
        this.zcArr = null;
        this.fzArr = null;
        this.ckArr = null;
        this.dkArr = null;
        this.braID = null;
        this.formatBranch = null;
        this.oneByOne = null;
        this.bra15DataID = null;
        this.format15Branch = null;
        this.odsData1 = null;
        this.tdCurData = null;
    }

    componentDidMount() {
        let self = this;
        //// 获取15天所有数据
        self.bra15DataID.forEach(
            (v) => {
                Tools.fetchGet(
                    window.locationConfig.TGTest.branch.address17 + `{"name":"${v}"}`,
                    {'Content-Type': 'application/json'},
                    self.up15Data
                )
            }
        )
        // 各各个分行数据
        self.braID.forEach(
            (v) => {
                Tools.fetchGet(
                    window.locationConfig.TGTest.customer.address12 + `{"name":"${v}"}`,
                    {'Content-Type': 'application/json'},
                    self.upDateBrach
                )
                /*                Tools.fetchGet(
                                    window.locationConfig.TGTest.branch.address18 + `{"name":"${v}"}`,
                                    {'Content-Type': 'application/json'},
                                    self.updateZjyw
                                )*/
            }
        )
        //// 右侧结构
        self.zcID.forEach(
            (v) => {
                Tools.fetchGet(
                    window.locationConfig.TGTest.customer.address12 + `{"name":"${v}"}`,
                    {'Content-Type': 'application/json'},
                    self.upDatezcArr
                )
            }
        )
        self.zengZhang2Day.forEach(
            (v) => {
                Tools.fetchGet(
                    window.locationConfig.TGTest.branch.address18 + `{"name":"${v}"}`,
                    {'Content-Type': 'application/json'},
                    self.upZengzhang2Day
                )
            }
        )
        self.fzID.forEach(
            (v) => {
                Tools.fetchGet(
                    window.locationConfig.TGTest.customer.address12 + `{"name":"${v}"}`,
                    {'Content-Type': 'application/json'},
                    self.upDatefzArr
                )
            }
        )
        self.ckID.forEach(
            (v) => {
                Tools.fetchGet(
                    window.locationConfig.TGTest.customer.address12 + `{"name":"${v}"}`,
                    {'Content-Type': 'application/json'},
                    self.upDateckArr
                )
            }
        )
        self.dkID.forEach(
            (v) => {
                Tools.fetchGet(
                    window.locationConfig.TGTest.customer.address12 + `{"name":"${v}"}`,
                    {'Content-Type': 'application/json'},
                    self.upDatedkArr
                )
            }
        )
        //// 两天资产总额,负债总额,净资产余额对比
        self.sd;
        self.getODSData2Day();
        self.timer = setInterval(self.start, 30000);
        self.getZTData();
        self.getODSData1Day();
        self.getTDCurData();
        self.getaqdzbData();
        //self.getZjyw();
        //self.timer=setInterval(self.runNum,5000);
        self.flagZT = setInterval(self.getZTData, window.locationConfig.ZTInterface.interface.linkLogin.loopTime);
        setInterval(self.getaqdzbData, 86400000);//一天一次，一秒1000毫秒
    }

    sd = () => {

    }
    start = () => {

        let self = this;
        // let arrzc = new Array();
        // var temp = "";
        // var ss=[];
        // for (var i =  this.fhName.length-1; i >=0 ; i--) {
        //     var a=  this.fhName[i];
        //     if(a=="甘肃银行总行"){
        //         ss.splice(0, 0, "甘肃银行股份有限公司");
        //         break;
        //     }else if(a=="总行营业部"){
        //         ss.splice(1, 0, "甘肃银行股份有限公司营业部(一级分支行)");
        //         break;
        //     }
        //     for (var j = this.oneByOne.length-1; j >=0 ; j--) {
        //         var b= this.oneByOne[j];
        //         if(typeof (b)=="undefined"){
        //         }else{
        //             var regExp = new RegExp(a);
        //             var match = b.match(regExp);
        //             // if(b=="甘肃银行股份有限公司"){
        //             //     ss.splice(0, 0, b);
        //             //     continue;
        //             // }else if(b=="甘肃银行股份有限公司营业部(一级分支行)"){
        //             //     ss.splice(1, 0, b);
        //             //     continue;
        //             // }else
        //              if(match){
        //
        //                 ss.splice(j, 0, b);
        //             }
        //         }
        //     }
        //
        // }

        self.oneByOne = ss;
        ss.length=0;
        let index = self.state.index;
        if (this.flage === "b") {
            index = self.titleIndex;
            this.flage = "a";
        }
        let zengzhang  = this.zengzhangdx;
        if (index < self.oneByOne.length) {
            let details = self.formatBranch[self.oneByOne[index]];
            // details["贷款余额增长"] = zengzhang[self.oneByOne[index]]['贷款余额增长'][0];
            // details["存款余额增长"] = zengzhang[self.oneByOne[index]]['存款余额增长'][0];
            // details["手续费及佣金收入增长"] = zengzhang[self.oneByOne[index]]['手续费及佣金收入增长'][0];
            let detailsLine = {
                zcLev: self.format15Branch[self.oneByOne[index]]['资产增长率'],
                ysLev: self.format15Branch[self.oneByOne[index]]['营业利润增长率'],
                zcfzLine: {
                    zc: self.format15Branch[self.oneByOne[index]]['资产总额'],
                    fz: self.format15Branch[self.oneByOne[index]]['负债总额'],
                    time: self.format15Branch[self.oneByOne[index]]['资产总额时间'],
                },
                ckdkLine: {
                    ck: self.format15Branch[self.oneByOne[index]]['存款余额'],
                    dk: self.format15Branch[self.oneByOne[index]]['贷款余额'],
                    time: self.format15Branch[self.oneByOne[index]]['存款余额时间'],
                },
                //净利润趋势分析
                ylTrend: {
                    yl: self.format15Branch[self.oneByOne[index]]['营业利润'],
                    time: self.format15Branch[self.oneByOne[index]]['营业利润时间']
                },
                // 营收趋势分析
                ysTrend: {
                    ys: self.format15Branch[self.oneByOne[index]]['营业收入'],
                    time: self.format15Branch[self.oneByOne[index]]['营业收入时间']
                }
            };
            self.setState({index: index + 1, details, detailsLine});
        } else {
            let details = self.formatBranch[self.oneByOne[0]];
            let detailsLine = {
                zcLev: self.format15Branch[self.oneByOne[0]]['资产增长率'],
                ysLev: self.format15Branch[self.oneByOne[0]]['营业利润增长率'],
                zcfzLine: {
                    zc: self.format15Branch[self.oneByOne[0]]['资产总额'],
                    fz: self.format15Branch[self.oneByOne[0]]['负债总额'],
                    time: self.format15Branch[self.oneByOne[0]]['资产总额时间'],
                },
                ckdkLine: {
                    ck: self.format15Branch[self.oneByOne[0]]['存款余额'],
                    dk: self.format15Branch[self.oneByOne[0]]['贷款余额'],
                    time: self.format15Branch[self.oneByOne[0]]['存款余额时间'],
                },
                //净利润趋势分析
                ylTrend: {
                    yl: self.format15Branch[self.oneByOne[0]]['营业利润'],
                    time: self.format15Branch[self.oneByOne[0]]['营业利润时间']
                },
                // 营收趋势分析
                ysTrend: {
                    ys: self.format15Branch[self.oneByOne[0]]['营业收入'],
                    time: self.format15Branch[self.oneByOne[0]]['营业收入时间']
                }
            };
            self.setState({index: 1, details, detailsLine});
        }
    }
//中间业务'http://192.168.43.151/cloud-monitor/data/load?dcId=2018&filter={"name":"SXFJYJSR"}',
    getODSData1Day = () => {
        if (window.locationConfig.debug) {

        } else {
            let startTStr = moment().subtract(1, 'days').format("YYYY-MM-DD 00:00:00");
            let endTStr = moment().format("YYYY-MM-DD HH:mm:ss");
            Tools.fetchGet(window.locationConfig.TGInterface.interface.ods.address + "?subname=资产总额,负债总额,净利润,净资产余额,贷款总额,对公存款,个人存款,非银存款,同业存款,营业网点数,全行员工数,对公客户数,对私客户数,同业客户数,对公账户数,对私账户数&startTime=" + startTStr + "&endTime=" + endTStr,
                {'Content-Type': 'application/json'},
                this.updateODSData1Day);
        }
    }
    getTDCurData = () => {
        this.tdCurData = {};
        if (window.locationConfig.debug) {
        } else {
            let m = moment();
            let startTStr = m.format("YYYY-MM-DD 00:00:00");
            let endTStr = m.format("YYYY-MM-DD HH:mm:ss");
            Tools.fetchGet(window.locationConfig.TGInterface.interface.td.address + "?kpiName=TD_xinzengkehu,TD_xinzengzhanghu&startTime=" + startTStr + "&endTime=" + endTStr,
                {'Content-Type': 'application/json'},
                this.updateTDCurData);
        }
    }
    getZTData = () => {
        let startTime = moment().subtract(20, 'minutes').format("YYYY-MM-DD HH:mm:ss");
        let endTime = moment().format("YYYY-MM-DD HH:mm:ss");
        Tools.fetchGet(
            window.locationConfig.ZTInterface.interface.gsprovCore.address+`?appId=100001003C0C7F496BAD9AF03F0CB47F3478CB390`,
            { 'Content-Type': 'application/json' },
            this.handleCoreData
        );
    }



    // for (let key in ODSYesCurAmount) {
    //     let oneArr = ODSYesCurAmount[key];
    //     let len = oneArr.length;
    //     if (key === "资产总额") {
    //         if (len === 1) {
    //             this.setState({zichanzonge: oneArr[0] / 1e8, zichanzongeRadio: 10})
    //         } else {
    //             let curNum = oneArr[len - 1] / 1e8;
    //             let yesNum = oneArr[len - 2] / 1e8;
    //             this.setState(
    //                 {
    //                     zichanzonge: curNum,
    //                     zichanzongeRadio: curNum - yesNum,
    //                 }
    //             )
    //         }
    //     } else if (key === "负债总额") {
    //         if (len === 1) {
    //             this.setState({fuzhaizonge: oneArr[0] / 1e8, fuzhaizongeRadio: 0})
    //         } else {
    //             let curNum = oneArr[len - 1] / 1e8;
    //             let yesNum = oneArr[len - 2] / 1e8;
    //             this.setState(
    //                 {
    //                     fuzhaizonge: curNum,
    //                     fuzhaizongeRadio: curNum - yesNum
    //                 }
    //             )
    //         }
    //     } else {
    //         if (len === 1) {
    //             this.setState({jingzichanyue: oneArr[0] / 1e8, jingzichanyueRadio: 0})
    //         } else {
    //             let curNum = oneArr[len - 1] / 1e8;
    //             let yesNum = oneArr[len - 2] / 1e8;
    //             this.setState(
    //                 {
    //                     jingzichanyue: curNum,
    //                     jingzichanyueRadio: curNum - yesNum
    //                 }
    //             )
    //         }
    //     }
    // }

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
        let zichanzonge = +this.odsData1['资产总额'][this.odsData1['资产总额'].length - 1].value;
        let fuzhaizonge = +this.odsData1['负债总额'][this.odsData1['负债总额'].length - 1].value;

        let lirun = +this.odsData1['净利润'][this.odsData1['净利润'].length - 1].value;

        let yue = +this.odsData1['净资产余额'][this.odsData1['净资产余额'].length - 1].value;
        let daikuan = +this.odsData1['贷款总额'][this.odsData1['贷款总额'].length - 1].value;

        let duigong = +this.odsData1['对公存款'][this.odsData1['对公存款'].length - 1].value;
        let geren = +this.odsData1['个人存款'][this.odsData1['个人存款'].length - 1].value;
        let feiyin = +this.odsData1['非银存款'][this.odsData1['非银存款'].length - 1].value;
        let tongye = +this.odsData1['同业存款'][this.odsData1['同业存款'].length - 1].value;

        let wangdian = +this.odsData1['营业网点数'][this.odsData1['营业网点数'].length - 1].value;
        let yuangong = +this.odsData1['全行员工数'][this.odsData1['全行员工数'].length - 1].value;

        this.caledTDData.ODSNow["对公客户数"] = +this.odsData1['对公客户数'][this.odsData1['对公客户数'].length - 1].value;
        this.caledTDData.ODSNow["对私客户数"] = +this.odsData1['对私客户数'][this.odsData1['对私客户数'].length - 1].value;
        this.caledTDData.ODSNow["同业客户数"] = +this.odsData1['同业客户数'][this.odsData1['同业客户数'].length - 1].value;
        this.caledTDData.ODSNow["对公账户数"] = +this.odsData1['对公账户数'][this.odsData1['对公账户数'].length - 1].value;
        this.caledTDData.ODSNow["对私账户数"] = +this.odsData1['对私账户数'][this.odsData1['对私账户数'].length - 1].value;

        let avgLi = yuangong ? lirun / yuangong : lirun;
        avgLi = Math.round(avgLi / 1e2) / 100;

        let renshu = this.odsData1['全行员工数'][this.odsData1['全行员工数'].length - 1].value;
        let renjuncunkuan = (duigong + geren + feiyin) / renshu;
        let renjundaikuan = daikuan / renshu;
        let renjunlirun = lirun / renshu;

        this.setState(function (preState) {
            return R.mergeDeepRight(preState, {
                property: {
                    total: Tools.addTwoFixed(Math.round(zichanzonge / 1e6) / 100),
                    debt: Tools.addTwoFixed(Math.round(fuzhaizonge / 1e6) / 100),
                    assets: Tools.addTwoFixed(Math.round(yue / 1e6) / 100),//billionify(yue),//Math.round(lirun/1e6)/100,//
                },
                deposit: {
                    // mouth: Math.round((duigong + geren + feiyin + tongye) / 1e6)/100, // billionify(duigong + geren + feiyin + tongye),
                    // total: Math.round(daikuan / 1e6)/100, //billionify(daikuan),
                    // ratio: Math.round((duigong + geren + feiyin) / 1e6)/100, //billionify(duigong + geren + feiyin),
                    mouth: Tools.addTwoFixed(Math.round((duigong + geren + feiyin) / 1e6) / 100), // billionify(duigong + geren + feiyin + tongye),
                    total: Tools.addTwoFixed(Math.round(daikuan / 1e6) / 100), //billionify(daikuan),
                    ratio: Tools.addTwoFixed(Math.round(lirun / 1e6) / 100),//avgLi, //billionify(duigong + geren + feiyin),
                    pie: [
                        {title: "对公存款", value: duigong, pulled: true},
                        {title: "个人存款", value: geren, pulled: true},
                        {title: "非银存款", value: feiyin, pulled: true},
                        {title: "同业存款", value: tongye, pulled: true},
                    ]
                },
                map: {
                    branch: wangdian,
                    employee: yuangong,
                    renjuncunkuan: Tools.addTwoFixed(Math.round(renjuncunkuan / 1e2) / 100),
                    renjundaikuan: Tools.addTwoFixed(Math.round(renjundaikuan / 1e2) / 100),
                    renjunlirun: Tools.addTwoFixed(Math.round(renjunlirun / 1e2) / 100),
                }
            })
        })
        this.updateTDCurData([{}]);
    }
    handleCoreData = (d) => {
        let ztdata = d.content.result;
        let jyllength = ztdata.total_trade_count.length;
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
                endjyl: Number(ztdata.total_trade_count),
                endjyjj: Number(ztdata.total_trade_amount),
                jylbl: jylbl1
            }
        )
    }

    _doTDData(data, obj) {
        for (let key in data) {
            obj[key] = data[key];
        }
    }

    _doODSData(arr) {
        for (let i = 0; i < arr.length; i++) {
            let o = arr[i];
            if (this.odsData1[o.subname]) {
                this.odsData1[o.subname].push(o);
            } else {
                this.odsData1[o.subname] = [o];
            }
        }
    }

    updateTDCurData = (data) => {
        let tdD = data[0];
        this._doTDData(tdD, this.tdCurData);

        //客户，账户
        let {curAll: xinzengkehu} = Tools.doCurDataForTD(this.tdCurData["TD_xinzengkehu"]);
        let {curAll: xinzengzhanghu} = Tools.doCurDataForTD(this.tdCurData["TD_xinzengzhanghu"]);

        let allkehu = this.caledTDData.ODSNow["对公客户数"] + this.caledTDData.ODSNow["对私客户数"] + this.caledTDData.ODSNow["同业客户数"] + xinzengkehu;
        let allzhanghu = this.caledTDData.ODSNow["对公账户数"] + xinzengzhanghu;

        let yearAddkehu = allkehu - 19117968;//(this.caledTDData.ODSLastYear["对公客户数"] + this.caledTDData.ODSLastYear["对私客户数"] + this.caledTDData.ODSLastYear["同业客户数"]);
        let yearAddzhanghu = allzhanghu - 107968;//(this.caledTDData.ODSLastYear["对公账户数"] + this.caledTDData.ODSLastYear["对私账户数"]);
        this.setState(function (preState) {
            return R.mergeDeepRight(preState, {
                customer: {
                    customer: {
                        today: xinzengkehu,
                        total: allkehu,
                        annual: yearAddkehu,

                    },
                    account: {
                        today: xinzengzhanghu,
                        total: allzhanghu,
                        annual: yearAddzhanghu,

                    }
                }
            })
        })
    }
    // 曲线
    up15Data = (d) => {
        let self = this;
        let ODSData = d.datas[0];
        let everyArr = ODSData['data'] || [];
        everyArr.forEach(
            (obj) => {
                let id = obj.subname.match(/\d+/g)[0];//各个分行
                let sub = obj.subname.slice(id.length, obj.subname.length);//分行指标
                let idname = CodeToBank[id];//id=>分行名称
                if (self.format15Branch[idname] === undefined) {
                    self.format15Branch[idname] = new Object();
                }
                if (self.format15Branch[idname][sub] === undefined) {
                    self.format15Branch[idname][sub] = new Array();
                }
                self.format15Branch[idname][sub + "时间"] = self.format15Branch[idname][sub + "时间"]
                if (self.format15Branch[idname][sub + "时间"] === undefined) {
                    self.format15Branch[idname][sub + "时间"] = new Array();
                }
                self.format15Branch[idname]['名称'] = idname;
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
                self.format15Branch[idname][sub + "时间"].push(moment(obj.time).format("MM/DD"));
                self.format15Branch[idname][sub].push(obj.value);
            }
        )

        // 计算资产增长率 和 营业利润增长率
        for (let key in self.format15Branch) {
            let zcArr = self.format15Branch[key]['资产总额'] || [];
            let cur = zcArr[zcArr.length - 1] || 0;
            let yes = zcArr[zcArr.length - 2] || 0;
            self.format15Branch[key]['资产增长率'] = yes === 0 ? 1 : (cur - yes) / yes;
            let ylArr = self.format15Branch[key]['营业利润'] || [];
            let cur2 = ylArr[ylArr.length - 1] || 0;
            let yes2 = ylArr[ylArr.length - 2] || 0;
            self.format15Branch[key]['营业利润增长率'] = yes2 === 0 ? 1 : (cur2 - yes2) / yes2;
        }
        // console.log(self.format15Branch);
    }
    getaqdzbData = () => {
        this.tdCurData = {};
        if (window.locationConfig.debug) {
        } else {
            let m = moment();
            let startTStr = m.format("YYYY-MM-DD 00:00:00");
            let endTStr = m.format("YYYY-MM-DD HH:mm:ss");
            // 'http://192.168.43.151/cloud-monitor/data/load?dcId=2012&filter={"name":"Q1000001"}',
            /*window.locationConfig.NInterface.interface.qdzb.address + '?=dcId=2012&filter={"name":"Q1000001"}'*/
            Tools.fetchGet(
                window.locationConfig.NInterface.interface.qdzb.address+'?dcId=2012&filter={"name":"Q1000001"}',
                {'Content-Type': 'application/json'},
                this.qdzb);
        }
    }
    //按各渠道占比
    qdzb = (d)=>{
        let self = this;
        let qdzbData = d.datas;
        var everyArr = qdzbData.length > 0 ? qdzbData[0]["data"] : null;
        for(var i = 0; i < everyArr.length;i++){
            everyArr[i].name = everyArr[i].subname;
        }
        self.setState(
            {
                ringOption:DataCreater.createRingOption(everyArr)//展示按渠道占比统计
            }
        )
    }
    // 各个分行
    upDateBrach2Day = (d) =>{

    }
    upDateBrach = (d) => {
        let self = this;
        let ODSData = d.datas;

        let everyArr = ODSData.length > 0 ? ODSData[0]["data"] : null;
        let startTStr = moment().subtract(2, 'days').format("YYYY-MM-DD 00:00:00");
        let endTStr = moment().format("YYYY-MM-DD HH:mm:ss");
        everyArr && everyArr.forEach(
            (obj) => {
                let id = obj.subname.match(/\d+/g)[0];
                let sub = obj.subname.slice(id.length, obj.subname.length);
                // 格式化各分行的数据存储到对象中
                let idname = CodeToBank[id];
                self.oneByOne.push(idname);
                if (self.formatBranch[idname] === undefined) {
                    self.formatBranch[idname] = new Object();
                }
                if (self.formatBranch[idname][sub] === undefined) {
                    self.formatBranch[idname][sub] = new Array()
                }
                self.formatBranch[idname]['名称'] = idname;
                self.formatBranch[idname]["时间"] = moment(obj.time).format("YYYY-MM-DD HH:mm:ss");
                self.formatBranch[idname][sub].push(obj.value);

                // if(sub=='贷款余额' || sub=='存款余额' || sub=='手续费及佣金收入'){
                //     Tools.fetchGet(window.locationConfig.TGInterface.interface.ods.address + "?subname="+sub+"&startTime=" + startTStr + "&endTime=" + endTStr,
                //         {'Content-Type': 'application/json'},
                //         this.updateZjyw);
                // }

            }
        )


        self.oneByOne = [...new Set(self.oneByOne)];
        // console.log(self.oneByOne);
        // console.log(self.formatBranch);
        let detailsLine = {
            zcLev: self.format15Branch[self.oneByOne[0]]['资产增长率'],
            ysLev: self.format15Branch[self.oneByOne[0]]['营业利润增长率'],
            zcfzLine: {
                zc: self.format15Branch[self.oneByOne[0]]['资产总额'],
                fz: self.format15Branch[self.oneByOne[0]]['负债总额'],
                time: self.format15Branch[self.oneByOne[0]]['资产总额时间'],
            },
            ckdkLine: {
                ck: self.format15Branch[self.oneByOne[0]]['存款余额'],
                dk: self.format15Branch[self.oneByOne[0]]['贷款余额'],
                time: self.format15Branch[self.oneByOne[0]]['存款余额时间'],
            },
            //营业利润趋势分析
            ylTrend: {
                yl: self.format15Branch[self.oneByOne[0]]['营业利润'],
                time: self.format15Branch[self.oneByOne[0]]['营业利润时间']
            },
            // 营业收入趋势分析
            ysTrend: {
                ys: self.format15Branch[self.oneByOne[0]]['营业收入'],
                time: self.format15Branch[self.oneByOne[0]]['营业收入时间']
            }
        };
        self.setState(
            {
                daikuanTop10: DataCreater.top10(self.sortByValue("贷款余额", self.formatBranch)),
                cunkuanTop10: DataCreater.top10(self.sortByValue("存款余额", self.formatBranch)),
                details: self.formatBranch[self.oneByOne[0]],
                detailsLine
            }
        )
    }
    sortByValue = (condition, oriObject) => {
        let newArr = [];
        for (let key in oriObject) {
            // 处理刚开始没有condition
            let v = oriObject[key][condition] ? oriObject[key][condition][0] : 0;
            let val = (v / 1e8).toFixed(1);//亿元
            let str = key.slice(10, -7);
            if (str === "营业部") {
                newArr.push({name: "总行营业部", value: val});
            } else if (str.indexOf('兰州市') === 0) {
                newArr.push({name: str.slice(3, str.length), value: val});
            } else if (str) {
                newArr.push({name: str, value: val});
            }
        }
        newArr.sort(
            (a, b) => {
                return b["value"] - a["value"];
            }
        );
        return newArr.slice(0, 10);
    }
    //四个结构
    formatSort = (oArr, formatArr) => {
        let sumValue = 0;
        let subname = oArr[0].subname;
        let nowName = subname.slice(subname.match(/\d+/g)[0].length, subname.length);
        for (let i = 0; i < oArr.length; i++) {
            sumValue += oArr[i].value * 1;
        }
        formatArr.push({subname: nowName, value: sumValue});
        return formatArr;
    }
    upDatezcArr = (d) => {
        let ODSData = d.datas[0];
        let originArr = ODSData['data'] || [];
        this.setState({zcJieGou: DataCreater.jieGouPie(this.formatSort(originArr, this.zcArr), this.zcColor)});
    }
    upDatefzArr = (d) => {
        let ODSData = d.datas[0];
        let originArr = ODSData['data'] || [];
        this.setState({fzJieGou: DataCreater.jieGouPie(this.formatSort(originArr, this.fzArr), this.fzColor)});
    }
    upZengzhang2Day = (d) => {
        let ODSData = d.datas[0];
        let originArr = ODSData['data'] || [];
        let zz = this.zengzhangdx;
        originArr.forEach(
            (o) => {
                let id = o.subname.match(/\d+/g)[0];
                let sub = o.subname.slice(id.length, o.subname.length);
                // 格式化各分行的数据存储到对象中
                let idname = CodeToBank[id];
                if(!zz[idname]){
                    zz[idname] = {}
                }

               // let zzval = arr[arr.length-1].value-arr[arr.length-2].value
                if(!zz[idname][sub+"增长"] ){
                    zz[idname][sub+"增长"] = [];
                }

                zz[idname][sub+"增长"].push(o.value)//=arr[arr.length-1].value-arr[arr.length-2].value;
            })
        this.zengzhangdx = zz;
/*        if(originArr.length>=2){
            let o = originArr[0];
            let id = o.subname.match(/\d+/g)[0];
            let sub = o.subname.slice(id.length, arr[0].subname.length);
            // 格式化各分行的数据存储到对象中
            let idname = CodeToBank[id];
            this.zengzhang2Day[idname][sub+"增长"]=arr[arr.length-1].value-arr[arr.length-2].value;
        }*/
    }
    upDateckArr = (d) => {
        let ODSData = d.datas[0];
        let originArr = ODSData['data'] || [];
        this.setState({ckJieGou: DataCreater.jieGouPie2(this.formatSort(originArr, this.ckArr), this.ckColor)});
    }
    upDatedkArr = (d) => {
        let ODSData = d.datas[0];
        let originArr = ODSData['data'] || [];
        this.setState({dkJieGou: DataCreater.jieGouPie2(this.formatSort(originArr, this.dkArr), this.dkColor)});
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
        let mOldDay = moment();//moment().subtract(1, 'days');
        let mOldYear = moment().subtract(1, 'years');

        let startTStr1 = mOldYear.format("YYYY-12-31 00:00:00");
        let endTStr1 = mOldDay.format("YYYY-MM-DD 23:59:59");
        Tools.fetchGet(window.locationConfig.TGInterface.interface.ods.address + "?subname=发卡量&startTime=" + startTStr1 + "&endTime=" + endTStr1,
            {
                'Content-Type': 'application/json',
            },
            this.updateODSData);


        let startTStr3 = mOldDay.format("YYYY-MM-DD 00:00:00");
        let endTStr3 = mOldDay.format("YYYY-MM-DD HH:mm:ss");
        Tools.fetchGet(window.locationConfig.TGInterface.interface.td.address + "?kpiName=TD_xinzengkehu,TD_xinzengzhanghu&startTime=" + startTStr3 + "&endTime=" + endTStr3,
            {'Content-Type': 'application/json'},
            this.updateTDCurData);
    }
    updateODSData = (data) => {
        let odsD = data[0].ODSData;
        // console.log('当前总卡数');
        //上一年末总卡数
        let lastYearCards = 0;
        if (moment().format("YYYY") == "2018") {
            lastYearCards = 4481425;
        } else {
            lastYearCards = odsD[0].value;
        }
        // 当前总卡数
        let odsDLength = odsD.length;
        let nowAllCards = odsD[odsDLength - 1].value * 1;
        let yesterDayTime = moment().subtract(1, 'days').format("YYYY/MM/DD");
        let yesAddCardArr = [];
        for (let i = 0; i < odsDLength; i++) {
            moment(odsD[i].time).format("YYYY/MM/DD") === yesterDayTime ? yesAddCardArr.push(odsD[i]) : '';
        }
        let len = yesAddCardArr.length;
        let yesAddCard = len > 0 ? nowAllCards - yesAddCardArr[0].value : 0;
        this.setState({
            cardAccountNumber: nowAllCards,
            cardYesterdayAdd: yesAddCard,
            cardYearAdd: nowAllCards - lastYearCards
        });
    }

    updateODSData2Day = (data) => {
        let arr = data[0].ODSData;
        let ODSYesCurAmount = {"资产总额": [], "负债总额": [], "净资产余额": [],"对公账户": []};
        for (let i = 0; i < arr.length; i++) {
            let o = arr[i];
            if (o.subname == "资产总额" || o.subname == "负债总额" || o.subname == "净资产余额" || o.subname == "对公账户") {
                ODSYesCurAmount[o.subname].push(Number(o.value));
            }
        }
        for (let key in ODSYesCurAmount) {
            let oneArr = ODSYesCurAmount[key];
            let len = oneArr.length;
            if (key === "资产总额") {
                if (len === 1) {
                    this.setState({zichanzonge: oneArr[0] / 1e8, zichanzongeRadio: 10})
                } else {
                    let curNum = oneArr[len - 1] / 1e8;
                    let yesNum = oneArr[len - 2] / 1e8;
                    this.setState(
                        {
                            zichanzonge: curNum,
                            zichanzongeRadio: curNum - yesNum,
                        }
                    )
                }
            } else if (key === "负债总额") {
                if (len === 1) {
                    this.setState({fuzhaizonge: oneArr[0] / 1e8, fuzhaizongeRadio: 0})
                } else {
                    let curNum = oneArr[len - 1] / 1e8;
                    let yesNum = oneArr[len - 2] / 1e8;
                    this.setState(
                        {
                            fuzhaizonge: curNum,
                            fuzhaizongeRadio: curNum - yesNum
                        }
                    )
                }
            } else if (key === "净资产余额")  {
                if (len === 1) {
                    this.setState({jingzichanyue: oneArr[0] / 1e8, jingzichanyueRadio: 0})
                } else {
                    let curNum = oneArr[len - 1] / 1e8;
                    let yesNum = oneArr[len - 2] / 1e8;
                    this.setState(
                        {
                            jingzichanyue: curNum,
                            jingzichanyueRadio: curNum - yesNum
                        }
                    )
                }
            }else{

                if (len === 1) {
                    this.setState({duigongzhanghuzz: 0})
                } else {
                    let curNum = oneArr[len - 1];
                    let yesNum = oneArr[len - 2];
                    this.setState(
                        {
                            duigongzhanghuzz: curNum - yesNum
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


    funPrev(name, e) {
        window.open(name, '_self');
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


        const arrnew = [];
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
                        className={style1.title}>{det['名称']&&det['名称'].replace("(一级分支行)","") == "甘肃银行股份有限公司" ? det['名称'].replace("(一级分支行)",""):det['名称'].replace("(一级分支行)","").replace("甘肃银行股份有限公司","") }</div>
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
                            <p className={style1.zcfzzeValue}>{(det['贷款余额'] / 1e8).toFixed(2)}
                                <span style={{position: 'absolute', top: '60px', left: '172px'}}>
                            <img src={det['贷款余额增长'] >= 0 ? upA : downA}
                                 className={det['贷款余额增长']>= 0 ? style.upArrow : style.downArrow}/>
                            <div className={style.ztsub}>{Math.abs(det['贷款余额增长'] / 1e8).toFixed(2)}</div>
                        </span>
                            </p>
                        </div>

                        <div className={style1.zcfzze}>
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
                        <p className={style1.chartsName}>按渠道占比统计</p>
                        <Chart className={style1.ring} style={{position: 'absolute', top: 30, left: 28}}
                               option={this.state.ringOption}/>
                    </div>
                    {/*营业利润变化情况*/}
                    {/* <div style={{position:'absolute',top:'407px',left:'363px',height:'20px',width:'300px'}}>
                  <p className={style1.chartsName1}>营业利润变化情况</p>
              </div>*/}
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
                                     start={this.state.startjyjj}
                                     end={this.state.endjyjj}
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
                                     end={this.state.endjyl}
                                     separator=","
                                     prefix={this.state.jylbl}
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
                }}>{det['名称']&&det['名称'].replace("(一级分支行)","") == "甘肃银行股份有限公司" ? det['名称'].replace("(一级分支行)",""):det['名称'].replace("(一级分支行)","").replace("甘肃银行股份有限公司","") }</div>
                <ItemGauge
                    style={{position: "absolute", left: 1006, top: 649, width: 170, height: 170}}
                    data={{
                        title: "资产增长率",
                        r: 75,
                        min: 0,
                        max: 1,
                        value: this.state.detailsLine.zcLev || 0,
                        radian: 170
                    }}
                />
                {/* <ItemGauge
          style={{position:"absolute",left:2539,top:817,width:230,height:220}}
          data={{title:"净利润完成率",r:110,min:0,max:1,value:det['利润完成率']||0,radian:240}}
        /> */}
                <ItemGauge
                    style={{position: "absolute", left: 1204, top: 649, width: 170, height: 170}}
                    data={{
                        title: "营业利润增长率",
                        r: 75,
                        min: 0,
                        max: 1,
                        value: this.state.detailsLine.ysLev || 0,
                        radian: 170
                    }}
                />
                <ItemGauge
                    style={{position: "absolute", left: 1409, top: 649, width: 170, height: 170}}
                    data={{title: "贷款任务完成率", r: 75, min: 0, max: 1, value: det['贷款任务完成率'], radian: 170}}
                />
                <ItemGauge
                    style={{position: "absolute", left: 1606, top: 649, width: 170, height: 170}}
                    data={{title: "存款任务完成率", r: 75, min: 0, max: 1, value: det['存款任务完成率'], radian: 170}}
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
                                 end={this.state.customer.customer.total}
                                 separator=","
                        />
                        <div style={{width: 100, position: 'absolute', left: 282}}>当日新增</div>
                        <CountUp style={{width: 100, position: 'absolute', color: '#77C5FA', left: 389}} start={0}
                                 end={this.state.customer.customer.today}
                                 separator=","
                        />
                        <div style={{width: 100, position: 'absolute', left: 543}}>本年新增</div>
                        <CountUp style={{width: 100, position: 'absolute', color: '#77C5FA', left: 658}} start={0}
                                 end={this.state.customer.customer.annual}
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
                                 end={this.state.cardAccountNumber}
                                 separator=","
                        />
                        <div style={{width: 100, position: 'absolute', left: 282}}>当日新增</div>
                        <CountUp style={{width: 100, position: 'absolute', color: '#77C5FA', left: 389}} start={0}
                                 end={this.state.cardYesterdayAdd}
                                 separator=","
                        />
                        <div style={{width: 100, position: 'absolute', left: 543}}>本年新增</div>
                        <CountUp style={{width: 100, position: 'absolute', color: '#77C5FA', left: 658}} start={0}
                                 end={this.state.cardYearAdd}
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
                                 end={this.state.customer.account.total}
                                 separator=","
                        />
                        <div style={{width: 100, position: 'absolute', left: 282}}>当日新增</div>
                        <CountUp style={{width: 100, position: 'absolute', color: '#77C5FA', left: 389}} start={0}
                                 end={this.state.duigongzhanghuzz}
                                 separator=","
                        />
                        <div style={{width: 100, position: 'absolute', left: 543}}>本年新增</div>
                        <CountUp style={{width: 100, position: 'absolute', color: '#77C5FA', left: 658}} start={0}
                                 end={this.state.customer.account.annual}
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

                    {/*<div style={{  background: 'url(' + butColse + ')',}} className={style1.butclose} onClick={this.closeWindows}>*/}
                    {/*    关 闭*/}
                    {/*</div>*/}


                </div>
                <div className={style1.menuright}>
                    <img src={menul1} onClick={this.pageup}></img>
                </div>
                <img src={ycbk} className={style1.ycbk}/>
            </div>
        )
    }
}
