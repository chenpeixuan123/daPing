(function (win) {
  var ip = '10.6.96.4';//测试：10.6.96.4；生产：10.7.61.80
  var port = '8080'
  win.dominContext = {staticPath:""};
  win.locationConfig= {
    title:"新核心系统上线切换",
    zoom:true,
    debug:true,
    interface: {
      systemNotice:{
        name: '',
        address: 'http://' + ip + ":" + port + '/GSCMD-API/Api/getCURNotice',
        loopTime: 20000
      },
      plan: {
        name: '',
        address: 'http://' + ip + ":" + port + '/GSCMD-API/Api/getCURProcInstPlanEXECTime',
        loopTime: 60000
      },
      taskComplate: {
        name: '',
        address: 'http://' + ip + ":" + port + '/GSCMD-API/Api/getCURProcInstTaskStatusCount',
        loopTime: 60000 
      },
      taskList: {
        name: '',
        address: 'http://' + ip + ":" + port + '/GSCMD-API/Api/getCURProcInstTaskAll',
        loopTime: 120000
      },
      milestones: {
        name: '',
        address: 'http://' + ip + ":" + port + '/GSCMD-API/Api/getCURPITMilestonePercent',
        loopTime: 120000
      },
      secondInfo: {
        name: '',
        address: 'http://' + ip + ":" + port + '/GSCMD-API/Api/getCURPITCatalogPercent',
        loopTime: 120000
      }
    }
  }

})(window);