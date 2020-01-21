import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'components/common/ProgressBar';

class PBar extends Component {

  render() {
    let barW = 850;
    let barH = 40;

    let curPos = barW * this.props.curR;
    let curS = Math.floor(this.props.curR*100);
    

    return (
      <div style={{height: 70 }} className={this.props.className}>
        <span style={{position:'absolute',left:0,top:0,fontFamily:"黑体",fontSize:24}}>国内</span>
        <span style={{position:'absolute',right:0,top:0,fontFamily:"黑体",fontSize:24}}>境外</span>
        <ProgressBar style={{ position: 'absolute', left: 0, top: 30 }}
          progressOffH={0}
          barStyle={{
            width: barW, height: barH, borderRadius: 20,
            backgroundColor: '#c66f0a',
            border: '1px solid #1a5387',
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,1) inset',
          }}
          progressStyle={{
            backgroundColor: '#16467a',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            boxShadow: '5px 0px 5px 0px rgba(0,0,0,0.1) inset,0px 5px 5px 0px rgba(0,0,0,0.1) inset,0px -5px 5px 0px rgba(0,0,0,0.1) inset',
          }}
          r1={0} r2={this.props.curR} />
          <span style={{position:'absolute',display:"block",paddingTop:5,left:0,top:30,width:curPos,textAlign:'center',fontFamily:"黑体",fontSize:30}}>{curS+"%"}</span>
          <span style={{position:'absolute',display:"block",paddingTop:5,left:curPos,top:30,width:barW-curPos,textAlign:'center',fontFamily:"黑体",fontSize:30}}>{(100-curS)+"%"}</span>            
      </div>
    );
  }
};

PBar.protoTypes = {
  curR: PropTypes.number
}
PBar.defaultProps = {
  curR: 0
};

export default PBar;
