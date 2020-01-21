/**
 * Created by liukai on 6/25/16.
 */
import React, { Component } from 'react';

export default class OneVideo extends Component {
  constructor(props) {
    super(props);
  };

  componentWillUnmount(){
    if(this.v){
      this.v.pause();
      this.v.src = "";
      this.v.load();
    }
  };
  
  componentDidMount(){
    if(this.v && this.v.play){
      this.v.play();
    }
  };

  render() {
    let bstyle = {
      position: "absolute",
      left:'0%',
      top:'0%',
      width:'100%',
      height:'100%'
    };
    return (
      <div className={this.props.className} style={this.props.style}>
        <video ref={(v)=>{this.v = v;}} loop muted src = {this.props.videoUrl} style={bstyle}>
          Your browser does not support the video tag
        </video>
      </div>
    )
  };
}
