window.locationConfig = {
    ip: '127.0.0.1',
    port: '8080',
    interface:{
        plan: {
            name:'',
            // address:'http://' + window.locationConfig.ip + ":" + window.locationConfig.port + '/GSCMD-API/Api/getCURProcInstPlanEXECTime',
            loopTime:60000
        },
        // taskComplate: {
        //     name:'',
        //     address:'http://' + ip + ":" + port + '/GSCMD-API/Api/getCURProcInstTaskStatusCount',
        //     loopTime:60000
        // },
        // taskList: {
        //     name:'',
        //     address:'http://' + ip + ":" + port + '/GSCMD-API/Api/getCURProcInstTaskAll',
        //     loopTime:120000
        // },
        // milestones: {
        //     name:'',
        //     address:'http://' + ip + ":" + port + '/GSCMD-API/Api/getCURPITMilestonePercent',
        //     loopTime:120000
        // },
        // secondInfo:{
        //     name:'',
        //     address:'http://' + ip + ":" + port + '/GSCMD-API/Api/getCURPITCatalogPercent',
        //     loopTime:120000
        // }
    }
}