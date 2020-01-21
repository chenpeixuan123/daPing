import React, { Component } from 'react';
import Gauge from './Gauge';

class ItemGauge extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    let v=this.props.data.value*100;
    let num=Math.abs(v)>10?v.toFixed(1):v.toFixed(2);
    return (
      <div className={this.props.className} style={this.props.style} >
         <h3 style={{textAlign:'center',fontSize:12}}>{this.props.data.title}</h3>
         <Gauge style={{width: 150,height: 150,margin:"auto"}} data={this.props.data} />
         <h3 style={{textAlign:'center',position:"absolute",top:"80%",left:0,fontFamily:"Arial Black",fontWeight:'bold',fontSize:"20px",width:"100%"}}>
            {num}<i style={{fontSize:15}}>%</i>
         </h3>
      </div>
    )
  }
}
export default ItemGauge;
