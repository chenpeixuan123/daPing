import React, { Component } from 'react';
import Gauge from './Gauge';

class ItemGauge extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.className} style={this.props.style} >
         <h3 style={{position:'absolute',left:0,bottom:0,width:'100%',textAlign:'center',fontSize:24}}>{this.props.title}</h3>
         <Gauge style={{width: 220,height: 220,margin:"auto",borderRadius:'50%',backgroundColor: 'rgba(0, 0, 0, 0.3)',boxShadow:'inset 0px 0px 144px 10px rgba(0, 0, 0, 0.33)'}} data={this.props.data} />
         <h3 style={{textAlign:'center',position:"absolute",top:"60%",left:0,fontFamily:"Arial Black",fontWeight:"bold",fontSize:"33px",width:"100%"}}>
            {this.props.data.value}<span style={this.props.subStyle}>{this.props.sub}</span>
         </h3>
      </div>
    )
  }
}
export default ItemGauge;