import React,{Component} from 'react';
import style from './style.css';

class Tips extends Component{
  render(){
    let bumen = "****";
    let jiandu = "****";
    let zhixing = "****";
    let infoState = "";
    let info = "";
    let title = "名称";

    if(this.props.data){
      let obj = this.props.data;
      title = obj.TASK_NAME;
      bumen = "甘肃银行";//obj.bumen;
      jiandu = obj.TASK_RESP_MAN_NAME;
      zhixing = obj.TASK_MAN_NAME;
      switch(obj.TASK_SEND_STATUS){
          case "0":
          infoState = "待发送";
          break;
          case "1":
          infoState = "待执行";
          break;
          case "2":
          infoState = "执行中";
          break;
          case "3":
          infoState = "已完成";
          break;
        }
      if(obj.FINISH_DELAY == "1"){
        infoState += "（延误）";        
      }else if(obj.TODO_DELAYED == "1"){
        infoState += "（推迟）";
      }else if(obj.FINISH_OVERTIME == "1"){
        infoState += "（完成超时）";
      }else if(obj.TODO_OVERTIME == "1"){
        infoState += "（待执行超时）";
      }else{
        infoState += "（正常）";
      }
      info = infoState;      
    }

    return (
      <div className={` ${this.props.className} ${style.root}`}>
        <h2 className={style.title}>{title}</h2>
        <p>{`执行部门：${bumen}  监督人：${jiandu}  执行人：${zhixing}`}</p>
        <p>当前状态：<span className={style.state}>{infoState}</span></p>
        <p>任务的反馈信息：<span className={style.info}>{info}</span></p>
      </div>
    );
  }

}

export default Tips;