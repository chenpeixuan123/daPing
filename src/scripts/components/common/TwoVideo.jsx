/**
 * Created by liukai on 6/25/16.
 */
import React, { Component } from 'react';

export default class TwoVideo extends Component {
  constructor(props) {
    super(props);
  };

  componentWillUnmount(){
    clearTimeout(this.flag);
    if(this.leftV){
      this.leftV.pause();
      this.leftV.src = "";
      this.leftV.load();
    }
    if(this.rightV){
      this.rightV.pause();
      this.rightV.src = "";
      this.rightV.load();
    }
  };

  componentDidMount(){
    this.flag = setTimeout(this.playV,1000);
  };

  playV = ()=>{
    if(this.leftV && this.leftV.play){
      this.leftV.play();
    }
    if(this.rightV && this.rightV.play){
      this.rightV.play();
    }
  };

  render() {
    let bstyleLeft = {
      position: "absolute",
      left:'0%',
      top:'0%',
      width:'50%',
      height:'100%'
    };
    let bstyleRight = {
      position: "absolute",
      left:'50%',
      top:'0%',
      width:'50%',
      height:'100%'
    };
    return (
      <div className={this.props.className} style={this.props.style}>
        <video ref={(v)=>{this.leftV = v;}} loop muted src = {this.props.leftVideoUrl} style={bstyleLeft}>
          Your browser does not support the video tag
        </video>
        <video ref={(v)=>{this.rightV = v;}} loop muted src = {this.props.rightVideoUrl} style={bstyleRight}>
          Your browser does not support the video tag
        </video>
      </div>
    )
  };
}
