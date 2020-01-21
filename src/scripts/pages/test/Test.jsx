import React, { Component } from 'react';
import CodeToBank from 'utils/CodeToBank';
import Tools from 'utils/Tools';
import moment from 'moment';

class Test extends Component {
  constructor(props) {
    super(props);
    window.share.resetPageSize(1920, 1080);
    this.state = { 
      time:0,
      details:{
        "时间":1,//用于判断1
        "名称":"甘肃银行股份有限公司",
        "资产总额":0,
        "负债总额":0,
        "贷款余额":0,
        "存款余额":0,
        "净利润":0,
        "资产增长率":0,
        "利润完成率":0,
        "贷款任务完成率":0,
        "存款任务完成率":0,
        "营业利润":0,
        "营业收入":0
      }
    };
    this.bra15DataID=["I0030001","I0030002","I0030006","I0030005","I00300251","I0030025"],//计算15天各个分行曲线
    // this.bra15DataID=["I0030005","I0030001"],//计算15天各个分行曲线
    this.format15Branch={};
    this.oneByOne=[]
    
  }
  componentWillUnmount() {this.format15Branch=null;this.oneByOne=null;}
  componentDidMount() {
    // 获取所有数据
    // this.bra15DataID.forEach(
    //   (v)=>{
    //     Tools.fetchGet(
    //       window.locationConfig.TGTest.branch.address17+`{"name":"${v}"}`,
    //       { 'Content-Type': 'application/json' },
    //       this.upAllData
    //     )
    //   } 
    // )
  }
  upAllData=(d)=>{
    let self=this;
    let ODSData=d.datas[0];
    let everyArr=ODSData['data']||[];
    everyArr.forEach(
      (obj)=>{
        let id=obj.subname.match(/\d+/g)[0];//各个分行
        let sub=obj.subname.slice(id.length,obj.subname.length);//分行指标
        let idname=CodeToBank[id];//id=>分行名称
        if( self.format15Branch[idname]===undefined){
          self.format15Branch[idname]=new Object();
        }
        if( self.format15Branch[idname][sub]===undefined){
          self.format15Branch[idname][sub]=new Array();
        }
        self.format15Branch[idname][sub+"时间"]= self.format15Branch[idname][sub+"时间"]
        if( self.format15Branch[idname][sub+"时间"]===undefined){
          self.format15Branch[idname][sub+"时间"]=new Array();
        }
        self.format15Branch[idname]['名称']=idname;
        self.format15Branch[idname][sub].push(obj.value);
        self.format15Branch[idname][sub+"时间"].push(moment(obj.time).format("MM/DD"));
       
      }
    )
     // self.oneByOne=[...new Set(self.oneByOne)];
    console.log(self.format15Branch);
  }

  handleChange=(e)=>{
    let val=e.target.value;
    console.log(Number(val));
    let time=moment(Number(val)).format("YYYY-MM-DD HH:mm:ss");
    this.setState({time});
  }
  render() {
    return (
      <div>
          <h2>输入时间s以获取格式化的时间 YYYY-MM-DD HH:mm:ss</h2>
          <input type="text" style={{border:'none',outline:'none',height:30,minWidth:300,lineHeight:"30px",textAlign:'center'}} placeholder="输入转化时间(s)" onChange={(e)=>this.handleChange(e)}/>
          <span>{this.state.time}</span>
          <br/>
          <hr/>
      </div>
    )
  }
}

export default Test;