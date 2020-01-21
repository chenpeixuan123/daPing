import React, { Component } from 'react';

class RealtimeMonitor extends Component {
 
  render() {   
    return (      
      <div className={this.props.className} >
        <h3>交易量实时监控</h3>
        <p>
          当前交易量：
          <span style={{fontFamily:"Arial Black",fontSize:48}}>{this.props.value}</span>
          <span style={{display:"inline-block",marginRight:50,marginLeft:5,fontFamily:"黑体",fontSize:18}}>笔/分钟</span>
          交易成功率:
          <span style={{display:"inline-block",marginLeft:10,fontFamily:"Arial Black",fontSize:48}}>{this.props.radio}%</span>
        </p>
      </div>);
  }
}

export default RealtimeMonitor;