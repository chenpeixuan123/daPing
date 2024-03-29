import moment from 'moment';

const DataCreater = {
  createPlan:(o)=>{
    return {
        "actFinishTimeStr":  o.actFinishTime,
        "actSendTimeStr": o.actSendTime,
        "planStartTimeStr": o.planStartTime,
        "planEndTimeStr": o.planEndTime,

       "actFinishTime": (o.actFinishTime == "")?null: moment(o.actFinishTime),
        "actSendTime": moment(o.actSendTime),
        "planStartTime": moment(o.planStartTime),
        "planEndTime": moment(o.planEndTime),
        "procId": o.procId,
        "procName": o.procName
    }
  }
};

export default DataCreater;