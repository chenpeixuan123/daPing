//用户可修改管控平台各个标题及各接口请求频率的时间
(function(win) {
    var zoom = false;
    var debug = false;
    //管控
    var ipControl = '10.7.61.127'; //测试：10.6.96.4；生产：10.7.61.80
    var portControl = 8081; //端口
    var domainControl = 'http://' + ipControl + ":" + portControl;
    //灾备
    var ipBackup = "10.7.61.78" //测试：10.6.96.2；生产：10.7.61.78；
    var portLogin = 9000; //登录端口
    var portData = 9500; //数据端口
    var domainBackupLogin = 'http://' + ipBackup + ":" + portLogin;
    var domainBackupData = 'http://' + ipBackup + ":" + portData;
    var domainBackupAllPid = 'http://' + ipBackup;
    //天港
    // var ipTG = "10.7.161.22"; //天港ip
    // var portTG = 8080; //天港端口
    // var testPortTG = 8880; //天港处理数据 新端口
    var ipTG = "192.168.43.170"; //天港ip
    var portTG = 8080; //天港端口
    var testPortTG = 8080; //天港处理数据 新端口


    //新开发后台系统
     //var ipN = "10.7.61.200";
    var ipN = "127.0.0.1";
    // var portN = 8080;
    //var ipN = "127.0.0.1";
   // var ipN = "192.168.43.170";
    var  wg = "/jkdp";
    var portN = 8080;
    var domainN =  'http://' + ipN + ":" + portN+wg;
    //var domainN =  'http://' + ipN + ":" + portN;


    var domainTG = 'http://' + ipTG + ":" + portTG;
    var testDomainTG = 'http://' + ipTG + ":" + testPortTG;
    //赞同
    var ipZT = "127.0.0.1"; //"10.7.61.65   itcm.gsbankchina.com";
    var portZT = 8080; //赞同端口
    var domainZT = 'http://' + ipZT + ":" + portZT;
    win.setIntervalPar={
       cdksdh:{
           qpsj:300000,//五分钟切屏幕
           qjgpmsj:1800000,  //半小时切换一次全机构排名
           cdksdhsj:30000,    //30秒切换区域存贷款增加十大户
           riqi:60000,
           // qpsj:1000000,//五分钟切屏幕
           // qjgpmsj:30000,  //半小时切换一次全机构排名
           // cdksdhsj:50000,    //30秒切换区域存贷款增加十大户
           // riqi:10000,
       }
    };
    win.dominContext = { staticPath: "" };
    win.locationConfig = {
        domainN:domainN,
        zoom: zoom,
        debug: debug,
        indexArrLoopTime: 30000, //滚动变化频率，单位ms
        //管控界面（切换）
        controlPage: {
            ip: ipControl,
            port: portControl,
            title: "新一代核心银行系统投产上线", //主界面标题
            title2: "新一代核心银行系统投产已完成", //主界面完成弹出框标题
            //主界面完成后跳转到哪个完成界面，完成界面有3个：finish,finish2,finish3
            finishPage: "finish2", //finish,finish2,finish3
            //finish2页面的配置，提供两个标题的控制
            finish2Title1: "热烈庆祝新一代核心银行系统",
            finish2Title2: "成功上线",
            //finish3页面的配置，提供背景图和3个标题的配置
            finish3Bg: "assets/images/dataMigration/bg_over3.png", //背景图片
            firework: false, //是否播放烟花
            //finish3页面第一个标题的配置
            finish3Title1: {
                name: "标题1",
                //文字位置，例子："unset"（不设置）；"5px"(5像素)；"50%"(在父容器中的相对位置),
                left: "500px",
                top: "500px",
                right: "unset",
                bottom: "unset",
                //文字对齐方式,值为："left","center","right"
                textAlign: "center",
                letterSpacing: 0, //文字间距
                //字体
                fontFamily: "宋体", //字体
                fontSize: 84, //字体大小
                //文字颜色
                //单一颜色16进制表示法："#ff0000",
                //单一颜色rgb表示法："rgb(255,0,0)",
                //渐变颜色（上下渐变）："linear-gradient(to bottom, #f3f3e2, #fffc0c)",
                //渐变颜色（左右渐变）："linear-gradient(to right, #f3f3e2, #fffc0c)",
                color: "linear-gradient(to bottom, #f3f3e2, #fffc0c)", //颜色
                //文字阴影
                //无阴影："none"，
                //有阴影："0px 4px 5px #000000",
                //  意义解释：水平方向偏移，竖直方向偏移，模糊度，颜色，
                //  水平偏移0像素
                //  竖直向下偏移4像素
                //  模糊度5像素
                //  颜色黑色
                textShadow: "0px 4px 15px #ff0",
                //文字边框
                textStrokeWidth: 2, //边框厚度
                textStrokeColor: "#0000ff", //边框颜色
            },
            //finish3页面第二个标题的配置
            finish3Title2: {
                name: "标题2",
                //文字位置，例子："unset"（不设置）；"5px"(5像素)；"50%"(在父容器中的相对位置),
                left: "1000px",
                top: "100px",
                right: "unset",
                bottom: "unset",
                //文字对齐方式,值为："left","center","right"
                textAlign: "center",
                letterSpacing: 0, //文字间距
                //字体
                fontFamily: "宋体", //字体
                fontSize: 84, //字体大小
                //文字颜色
                //单一颜色16进制表示法："#ff0000",
                //单一颜色rgb表示法："rgb(255,0,0)",
                //渐变颜色（上下渐变）："linear-gradient(to bottom, #f3f3e2, #fffc0c)",
                //渐变颜色（左右渐变）："linear-gradient(to right, #f3f3e2, #fffc0c)",
                color: "linear-gradient(to bottom, #f3f3e2, #fffc0c)", //颜色
                //文字阴影
                //无阴影："none"，
                //有阴影："0px 4px 5px #000000",
                //  意义解释：水平方向偏移，竖直方向偏移，模糊度，颜色，
                //  水平偏移0像素
                //  竖直向下偏移4像素
                //  模糊度5像素
                //  颜色黑色
                textShadow: "0px 4px 5px #000",
                //文字边框
                textStrokeWidth: 0, //边框厚度
                textStrokeColor: "#ff0000", //边框颜色
            },
            //finish3页面第三个标题的配置
            finish3Title3: {
                name: "标题3",
                //文字位置，例子："unset"（不设置）；"5px"(5像素)；"50%"(在父容器中的相对位置),
                left: "unset",
                top: "300px",
                right: "1000px",
                bottom: "unset",
                //文字对齐方式,值为："left","center","right"
                textAlign: "center",
                letterSpacing: 0, //文字间距
                //字体
                fontFamily: "楷体", //字体
                fontSize: 84, //字体大小
                //文字颜色
                //单一颜色16进制表示法："#ff0000",
                //单一颜色rgb表示法："rgb(255,0,0)",
                //渐变颜色（上下渐变）："linear-gradient(to bottom, #f3f3e2, #fffc0c)",
                //渐变颜色（左右渐变）："linear-gradient(to right, #f3f3e2, #fffc0c)",
                color: "linear-gradient(to bottom, #f3f3e2, #fffc0c)", //颜色
                //文字阴影
                //无阴影："none"，
                //有阴影："0px 4px 5px #000000",
                //  意义解释：水平方向偏移，竖直方向偏移，模糊度，颜色，
                //  水平偏移0像素
                //  竖直向下偏移4像素
                //  模糊度5像素
                //  颜色黑色
                textShadow: "0px 4px 5px #000",
                //文字边框
                textStrokeWidth: 0, //边框厚度
                textStrokeColor: "#ff0000", //边框颜色
            },
            //管控界面（切换）接口配置
            interface: {
                //系统播报信息接口
                systemNotice: {
                        name: '系统播报信息接口',
                        address: domainControl + '/GSCMD-API/Api/getCURNotice',
                        loopTime: 20000 //接口请求频率，单位ms
                    },
                    //计划进度接口
                    plan: {
                        name: '计划进度接口',
                        address: domainControl + '/GSCMD-API/Api/getCURProcInstPlanEXECTime',
                        loopTime: 60000 //接口请求频率，单位ms
                    },
                    //任务完成接口
                    taskComplate: {
                        name: '任务完成接口',
                        address: domainControl + '/GSCMD-API/Api/getCURProcInstTaskStatusCount',
                        loopTime: 60000 //接口请求频率，单位ms
                    },
                    //任务列表接口
                    taskList: {
                        name: '任务列表接口',
                        address: domainControl + '/GSCMD-API/Api/getCURProcInstTaskAll',
                        loopTime: 120000 //接口请求频率，单位ms
                    },
                    //里程碑接口
                    milestones: {
                        name: '里程碑接口',
                        address: domainControl + '/GSCMD-API/Api/getCURPITMilestonePercent',
                        loopTime: 120000 //接口请求频率，单位ms
                    },
                    //二级任务接口
                    secondInfo: {
                        name: '二级任务接口',
                        address: domainControl + '/GSCMD-API/Api/getCURPITCatalogPercent',
                        loopTime: 120000 //接口请求频率，单位ms
                    }
            }
        },
        //灾备界面
        backupPage: {
            title: "新一代核心银行系统投产上线", //主界面标题
            //主界面副标题格式 程序会把name替换为场景名称，
            //例如，
            //    场景名为：计划内整体切换流程
            //    格式：（name）
            //    显示则为： （计划内整体切换流程）
            title2: "（name）",
            ip: ipBackup, //10.7.61.78
            portLogin: portLogin, //9000
            portData: portData, //9500
            code: "superadmin",
            ucode: "superadmin",
            password: "123456",
            interface: {
                //PID请求接口
                allPid: {
                        name: '所有pid',
                        address: domainBackupAllPid + '/dr/serviceorder/selectExt'
                    },
                    //登录接口
                    login: {
                        name: "登录",
                        address: domainBackupLogin + "/system/login"
                    },
                    //登出接口
                    logout: {
                        name: "登出",
                        address: domainBackupLogin + "/system/logout"
                    },
                    //任务列表接口
                    taskList: {
                        name: "任务链数据",
                        address: domainBackupData + "/dashboard/getProcessRuntimeMap/", //:pid
                        loopTime: 20000 //接口请求频率，单位ms
                    },
                    //二级任务接口
                    secondTaskList: {
                        name: "子流程数据",
                        address: domainBackupData + "/dashboard/getProcessHistoryDom/", //:pid
                    }
            }
        },
        //天港生产接口
        TGInterface: {
            ip: ipTG,
            port: portTG,
            annualPlan: {
                customer: 5335761 * 1.1, //年客户数完成进度，已废弃
                account: 5335761 * 1.5 //年账户数完成进度，已废弃
            },
            interface: {
                //ods接口
                ods: {
                    name: 'ods数据接口',
                    address: domainTG + '/cloud-monitor/perf/getAllOds',
                },
                //天旦接口
                td: {
                    name: '天旦数据接口',
                    address: domainTG + '/cloud-monitor/perf/getAllTD',
                    loopTime: 3 * 60000 //接口请求频率，单位ms
                },
                //天旦两地三中心请求频率
                td23: {
                    loopTime: 10 * 60000
                },
                //带宽接口
                bandwidth: {
                    name: '带宽数据接口',
                    address: domainTG + '/cloud-monitor/perf/getSwbps',
                    loopTime: 10 * 60000 //接口请求频率，单位ms
                },
            }
        },
        //天港新接口处理大数据量
        TGTest: {
            ip: ipTG,
            port: testPortTG,
            ms23: {
                name: '生产灾备',
                address: testDomainTG + '/cloud-monitor/data/load?dcId=2000&filter=', //{"time":"2018-05-18"}
                loopTime: 3 * 60000 //接口请求频率，单位ms
            },
            mscard: {
                name4: '借记卡（历史）',
                address4: testDomainTG + '/cloud-monitor/data/load?dcId=2004&filter=', //{"startTime":"2018-05-16","endTime":"2018-05-17"}
                name3: '借记卡（今日）',
                address3: testDomainTG + '/cloud-monitor/data/load?dcId=2003&filter=', //{"time":"2018-05-18"}
                name5: "借记卡(境外)",
                address5: testDomainTG + '/cloud-monitor/data/load?dcId=2005&filter=', //{"time":"2018-05-18"}
                name1: '消费构成',
                address1: testDomainTG + '/cloud-monitor/data/load?dcId=2001&filter=', //{"time":"2018-05-18"}
                name2: '渠道商户',
                address2: testDomainTG + '/cloud-monitor/data/load?dcId=2002&filter=', //{"time":"2018-05-18"}
                loopTime: 3 * 60000 //接口请求频率，单位ms
            },
            msweb: {
                name6: '支付宝财付通12个月',
                address6: testDomainTG + '/cloud-monitor/data/load?dcId=2006&filter=', //{"startTime":"2017-05-17","endTime":"2018-05-17"}
                name10: '支付宝财付通今日',
                address10: testDomainTG + '/cloud-monitor/data/load?dcId=2010&filter=', //{"time":"2018-05-18"}
                name9: '网银统计map',
                address9: testDomainTG + '/cloud-monitor/data/load?dcId=2009&filter=', //{"startTime":"2018-05-16","endTime":"2018-05-17"}
                loopTime: 3 * 60000 //接口请求频率，单位ms
            },
            customer: {
                name12: '获取最新一天数据',
                address12: testDomainTG + '/cloud-monitor/data/load?dcId=2012&filter=', //{"name":"I0030001"}
            },
            branch: {
                name18: '获取近2天数据 计算对比',
                address18: testDomainTG + '/cloud-monitor/data/load?dcId=2018&filter=', //{"name":"I0030001"}
                name17: '获取近15数据 计算曲线',
                address17: testDomainTG + '/cloud-monitor/data/load?dcId=2017&filter=', //{"name":"I0030001"}
            }
        },
        //赞同接口
        ZTInterface: {
            ip: ipZT,
            port: portZT,
            interface: {
                linkLogin: {
                    name: '连接数设备数接口',
                    address: domainZT + '/ABCOverviewAction_getEchart.do', //...do?interval=1&time=0',
                    loopTime: 5000 //接口请求频率，单位ms//核心交易数据 、连接数设备数接口
                },
                gsprovBoBao: {
                    name: "gsprov页面大额交易播报",
                    address: domainZT + '/ScreenMonitorAction_getBranchTradeCount.do', //...do?type=821
                    loopTime: 1 * 60000 //接口请求频率5 分钟，单位ms
                },
                gsprovPie: {
                    name: "gsprov页面3个占比",
                    address: domainZT + '/ScreenMonitorAction_getCoreTradeChanelRate.do',
                    addressTimePie: domainZT + '/ScreenMonitorAction_getCoreTradeTimeRate.do',
                },
                gsprovCore: {
                    name: "gsprov核心交易数据",
                    address: domainZT + '/ScreenMonitorAction_coreSysBaseInfo.do',
                    addressTimeLine: domainZT + '/SummaryAPMAction_getApmMinByTimeSplit.do'
                }
            }
        },
        //
        NInterface: {
            ip: ipN,
            port: portN,
            annualPlan: {
                customer: 5335761 * 1.1, //年客户数完成进度，已废弃
                account: 5335761 * 1.5 //年账户数完成进度，已废弃
            },
            interface: {
                //ods接口
                qdzb: {
                    name: 'ods数据接口',
                    // address: domainN +  + '/cloud-monitor/data/load?dcId=2018&filter={"name":"Q1000001"}', //{"name":"I0030001"}，
                    address: domainN +  + '/cloud-monitor/data/load',
                }
            }
        }
    }
})(window);
