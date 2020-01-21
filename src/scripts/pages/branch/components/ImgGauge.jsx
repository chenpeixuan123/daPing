import React, { Component } from 'react';
import Gauge from './Gauge';

class ItemGauge extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.className} style={this.props.style} >
         <Gauge style={{width: 220,height: 220,margin:"auto"}} data={this.props.data} />
         <h3 style={{textAlign:'center',position:"absolute",top:"62%",left:0,fontSize:"38px",width:"100%"}}>
            <div style={{width:"20px",margin:"auto",height:"20px",backgroundColor:"green",borderRadius:"50%"}}></div>
            {this.props.data.title}
         </h3>
      </div>
    )
  }
}
export default ItemGauge;