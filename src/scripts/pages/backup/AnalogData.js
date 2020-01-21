const AnalogData = {
  login: {
    "token": "R99HQuOUkggoyWA2c15ZgsaP9KxVOEZBCr4fSp6Ult9ZR2EPDu6xFg==",
    "admin": false,
    "userId": 1,
    "user": {
      "id": 1,
      "ucode": "superadmin",
      "uname": "superadmin",
      "creattime": 1478052800,
      "updatetime": 1478052800,
      "status": "ENABLED"
    }
  },
  systemNotice: {
    data: [
      {
        "CONTENT": "这是第一条测试数据。",
        "ID": "45031468385191F8",
        "IUI_USER_NAME": "admin",
        "OPER_TIME": "2017-08-10 15:17:30",
        "TITLE": "标题1"
      },
      {
        "CONTENT": "这是第二条测试数据。",
        "ID": "45031468385191F8",
        "IUI_USER_NAME": "admin",
        "OPER_TIME": "2017-08-10 15:17:30",
        "TITLE": "标题2"
      }
    ]
  },
  taskList: {
    "user": {
      "id": 1,
      "name": "超级用户",
      "phone": "123456",
      "ucode": "superadmin",
      "uname": "superadmin",
      "creattime": 1531358005,
      "updatetime": 1531358005,
      "status": "ENABLED"
    },
    "likeProcessvariable": "M",
    "startTime": 1531358005,
    "useTime": 265,
    "isShowEndPage": true,
    "status": "RUNNING",
    "oneStepProcessList": [
      {
        "id": "call-signin-flow",
        "name": "人员签到",
        "callId": "105688",
        "status": "已完成(执行成功)",
        "percent": 1,
        "useTime": 86,
        "startTime": 1531358005,
        "endTime": 1531358005
      },
      {
        "id": "sid-89EB081A-FC35-4662-AD27-B1E045BDFF35",
        "name": "确认开始切换",
        "status": "已完成(执行成功)",
        "percent": 1,
        "useTime": 10,
        "startTime": 1531358005,
        "endTime": 1531358005
      },
      {
        "id": "call-env-check",
        "name": "灾备环境检查",
        "callId": "105712",
        "status": "已完成(执行成功)",
        "percent": 1,
        "useTime": 43,
        "startTime": 1531358005,
        "endTime": 1531358005
      },
      {
        "id": "call-stop-web",
        "name": "Stop Web",
        "callId": "105727",
        "status": "已完成(执行成功)",
        "percent": 1,
        "useTime": 38,
        "startTime": 1531358005,
        "endTime": 1531358005
      },
      {
        "id": "call-stop-app",
        "name": "Stop App",
        "callId": "105742",
        "status": "已完成(执行成功)",
        "percent": 1,
        "useTime": 18,
        "startTime": 1531358005,
        "endTime": 1531358005
      },
      {
        "id": "call-oracle-adg-check",
        "name": "Oracle ADG Check",
        "callId": "105757",
        "status": "已完成(执行成功)",
        "percent": 1,
        "useTime": 18,
        "startTime": 1531358005,
        "endTime": 1531358005
      },
      {
        "id": "call-oracle-switch",
        "name": "执行Oracle ADG Switch",
        "callId": "105772",
        "status": "正在进行",
        "percent": 0.3125,
        "useTime": 52,
        "startTime": 1531358005
      },
      {
        "id": "call-reverse-check",
        "name": "反向检查",
        "status": "未开始",
        "percent": 0,
        "useTime": 0
      },
      {
        "id": "call-startapp-backup",
        "name": "Start App",
        "status": "未开始",
        "percent": 0,
        "useTime": 0
      },
      {
        "id": "call-startweb-backup",
        "name": "Start Web",
        "status": "未开始",
        "percent": 0,
        "useTime": 0
      },
      {
        "id": "sid-FCDDDD9C-5632-4692-AFA7-913A3AFE530A",
        "name": "应用发布",
        "status": "未开始",
        "percent": 0,
        "useTime": 0
      }
    ],
    "allNum": 11,
    "passNum": 6.3125
  },
  secondTaskList:[
    {
      "rundeckTasksResult": "http://10.20.32.70:4440/rundeck/project/zaibei/execution/show/3357",
      "id": "105779",
      "name": "Oracle Switch Step 1 ",
      "percent": 1,
      "useTime": 14,
      "startTime": 1531358005,
      "endTime": 1531358005
    },
    {
      "groups": [
        "SUPERSYSTEMADMIN_MANAGER"
      ],
      "id": "105782",
      "name": "Oracle Switch Step 1 校验结果",
      "percent": 1,
      "useTime": 4,
      "startTime": 1531358005,
      "endTime": 1531358005
    },
    {
      "rundeckTasksResult": "http://10.20.32.70:4440/rundeck/project/zaibei/execution/show/3362",
      "id": "105785",
      "name": "Oracle Switch Step 2",
      "percent": 1,
      "useTime": 13,
      "startTime": 1531358005,
      "endTime": 1531358005
    },
    {
      "groups": [
        "SUPERSYSTEMADMIN_MANAGER"
      ],
      "id": "105787",
      "name": "Oracle Switch Step 2 校验结果",
      "percent": 1,
      "useTime": 4,
      "startTime": 1483952679,
      "endTime": 1483952683
    },
    {
      "rundeckTasksResult": "http://10.20.32.70:4440/rundeck/project/zaibei/execution/show/3363",
      "id": "105790",
      "name": "Oracle Switch Step 3",
      "percent": 1,
      "useTime": 17,
      "startTime": 1483952684,
      "endTime": 1483952701
    },
    {
      "groups": [
        "SUPERSYSTEMADMIN_MANAGER"
      ],
      "id": "105792",
      "name": "Oracle Switch Step 3 校验结果",
      "percent": 1,
      "useTime": 80673,
      "startTime": 1483952701,
      "endTime": 1484033374
    },
    {
      "rundeckTasksResult": "http://10.20.32.70:4440/rundeck/project/zaibei/execution/show/3391",
      "id": "105852",
      "name": "Oracle Switch Step 4",
      "percent": 1,
      "useTime": 13,
      "startTime": 1484033375,
      "endTime": 1484033388
    },
    {
      "groups": [
        "SUPERSYSTEMADMIN_MANAGER"
      ],
      "id": "105854",
      "name": "Oracle Switch Step 4 校验结果",
      "percent": 1,
      "useTime": 10827,
      "startTime": 1484033388,
      "endTime": 1484044215
    },
    {
      "rundeckTasksResult": "http://10.20.32.70:4440/rundeck/project/zaibei/execution/show/3403",
      "id": "105872",
      "name": "Oracle Switch Step 5",
      "percent": 1,
      "useTime": 15,
      "startTime": 1484044215,
      "endTime": 1484044230
    }
  ]
};

export default AnalogData;