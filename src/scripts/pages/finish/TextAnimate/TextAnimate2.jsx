import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TweenMax, TimelineLite } from 'gsap';
import $ from 'jquery';

class TextAnimate extends Component {
  constructor(props){
    super(props);    
    this.txts = [];
    this.txtsDom = [];
    this.generateText();
  }

    componentDidMount() {
        this.animInfinite();
    }
    
    animInfinite =()=>{
      // for(var i=0;i<this.txtsDom.length;i++){
      //   if(i==this.txtsDom.length-1){
      //     let baseSize = this.props.fontSize-this.props.shadowWeight;      
      //     TweenMax.fromTo(this.txtsDom[i], 1+0.1*i,{fontSize:baseSize},{fontSize:this.props.fontSize});
      //   }else{
      //     TweenMax.fromTo(this.txtsDom[i], 1, {autoAlpha:0},{autoAlpha:1,delay:0.1*i});
      //   }
      // }
    }

    
    componentWillMount() {
        
    }
    
    

    generateText(){
      let count = this.props.shadowWeight;
      let baseSize = this.props.fontSize-count;      
        for(var i = 0; i < count; i++){
          if(i==count-1){
            this.txts.push(<div key = {i} ref={(node)=>{this.txtsDom.push(node);}} style={{
              position:'absolute',
              top:0,
              left:'50%',
              width:'100%',
              transform:'translateX(-50%)',
              textAlign:'center',
              fontSize:baseSize+i,
              fontWeight:'bold',
              letterSpacing: 10,
              backgroundImage:`url(${window.dominContext.staticPath}/assets/images/dataMigration/gold.png)`,
              WebkitTextStrokeWidth: 2,
              WebkitTextStrokeColor:'#fef04d',
              WebkitBackgroundClip:'text',
              WebkitTextFillColor:'transparent',
              }}>{ this.props.name } 
               </div>)
          }else{
            this.txts.push(<div key = {i} ref={(node)=>{this.txtsDom.push(node);}}  style={{
              position:'absolute',
              top:0,
              left:'50%',
              width:'100%',
              transform:'translateX(-50%)',
               textAlign:'center',
              fontSize:baseSize+i,
              fontWeight:'bold',
              letterSpacing: 10,
              color:this.props.shadowColor,              
              }}> { this.props.name } </div>)
          }
            
        }
        return this.txts;
    }


    render() {
        return (
            <div className={this.props.className} style = {this.props.style}>
              <div style={{height:'100%',width:'100%',position:'relative',textAlign:'center'}}>
                {this.txts}
              </div>
            </div>
        );
    }
}


export default TextAnimate;