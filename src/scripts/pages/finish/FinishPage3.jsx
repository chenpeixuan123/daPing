import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskComplate from '../dataMigration/taskComplate/TaskComplatebeta';
import TitleChart from 'components/common/TitleChart';
import DC from '../backup/DataCreater';
import DataCreater from './DataCreater';
import $ from 'jquery';
import './firework2';
import style from './style.css';
import TextAnimate from './TextAnimate/TextAnimate2';
import AnalogData from '../dataMigration/AnalogData';
import Tools from 'utils/Tools';

class FinishPage extends Component {

  constructor(props, context) {
    super(props, context);
    window.share.resetPageSize(3840, 1080);
  }

  componentDidMount() {
    if(window.locationConfig.controlPage.firework){
      this.setFireworks();
    }
  }
  componentWillUnmount() {
    if(window.locationConfig.controlPage.firework){
      $("#fireworks_div").fireworks("destroy");
    }    
  }
  setFireworks() {
    let w = 2244;
    let h = 1080;
    $("#fireworks_div").fireworks();
  }

  getTitle(key,obj){
    return [
      <p key={key+"_1"} style={{
        position: 'absolute',
        left: obj.left,
        top: obj.top,
        right: obj.right,
        bottom: obj.bottom,
        fontFamily: obj.fontFamily,
        fontSize: obj.fontSize,    
        letterSpacing:obj.letterSpacing,    
        textAlign:obj.textAlign,
        textShadow: obj.textShadow,          
      }}>
        {obj.name}
      </p>,
      <p key={key+"_2"}  style={{
        position: 'absolute',
        left: obj.left,
        top: obj.top,
        right: obj.right,
        bottom: obj.bottom,
        fontFamily: obj.fontFamily,
        fontSize: obj.fontSize,
        letterSpacing:obj.letterSpacing,   
        textAlign:obj.textAlign,
        backgroundColor:obj.color,
        backgroundImage: obj.color,          
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        WebkitTextStrokeWidth: obj.textStrokeWidth,
        WebkitTextStrokeColor: obj.textStrokeColor,
      }}>
        {obj.name}
      </p>
    ];
  }


  render() {
    let title1 = this.getTitle("title1",window.locationConfig.controlPage.finish3Title1);
    let title2 = this.getTitle("title2",window.locationConfig.controlPage.finish3Title2);
    let title3 = this.getTitle("title3",window.locationConfig.controlPage.finish3Title3);
    return (
      <div className={this.props.className} style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.9)' }}>
        <img ref={(node) => { this.img = node; }} src={window.dominContext.staticPath + '/' + window.locationConfig.controlPage.finish3Bg} alt="" />
        <div id='fireworks_div' style={{ position: 'absolute', top: 0, left: 420, width: 3000, height: 1080 }}></div>
        {title1}
        {title2}
        {title3}
      </div>
    );
  }
}


export default FinishPage;