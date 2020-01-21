import React, { Component } from 'react';
class ListItem extends Component {
  render() {
    let { branch_id, record_stamp, trade_amount }=this.props.data;
    let amount=(trade_amount/1e4).toFixed(1)+'万';
    return (
      <div className={this.props.className} style={{height:105,width:520,paddingLeft:10,paddingRight:10,paddingTop:10,fontSize:15,fontFamily:'微软雅黑',color:'#bbb'}}>    
        <div style={{overflow: 'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap',fontSize:25,width:'100%',font:'left',color:'#fff'}}>
          {branch_id}
        </div>  
        <div style={{float:'left',maxWidth:'50%',lineHeight:'60px',overflow: 'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap'}}>
          交易时间：<i style={{fontSize:18,fontFamily:'Arial',color:'#fff'}}>{record_stamp}</i>
        </div>
        <div style={{float:'right',maxWidth:'50%',lineHeight:"50px",overflow: 'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap'}}>
          当前交易额：<span style={{fontSize:25,fontFamily:'Arial Black',color:'#fff'}}>{amount}</span>
        </div>
        {/* <ol>
          {
            sub.map(
              (value,index)=>{
                return <li key={index}>{value}</li>
              }
            )
          }
        </ol> */}
      </div>
    );
  }
}

export default ListItem;