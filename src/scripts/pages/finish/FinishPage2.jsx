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
    this.setFireworks();
  }
  componentWillUnmount() {
    $("#fireworks_div").fireworks("destroy");
  }
  setFireworks() {
    let w = 2244;
    let h = 1080;
    $("#fireworks_div").fireworks();
  }


  render() {
    return (
      <div className={this.props.className} style={{position:'relative', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.9)' }}>
        <img ref={(node) => { this.img = node; }} src={window.dominContext.staticPath + '/assets/images/dataMigration/bg_over3.png'} alt="" />
        <div id='fireworks_div' style={{ position: 'absolute', top: 0, left: 420, width: 3000, height: 1080 }}></div>
        <TextAnimate
        style={{position:'absolute',left:'50%',top:460,width:'100%',height:250,transform:'translateX(-50%)'}}
         fontSize={235}
         shadowWeight={30}
          color={"#fadb3a"}
           shadowColor={'#535353'} 
           name={window.locationConfig.controlPage.finish2Title2} />
        
        <p style={{ position: 'absolute', left: '50%', top: 370,width:'100%',
        transform:'translateX(-50%)',
        textAlign:'center',
        fontSize:84,
        textShadow:'0px 4px 5px #000',
         }}>
         {window.locationConfig.controlPage.finish2Title1}
        </p>
        
        <p style={{ position: 'absolute', left: '50%', top: 370,width:'100%',
        transform:'translateX(-50%)',
        textAlign:'center',
        fontSize:84,
          backgroundImage:'linear-gradient(to bottom, #f3f3e2, #fffc0c)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor:'transparent',
         }}>
         {window.locationConfig.controlPage.finish2Title1}
        </p>
        <img style={{position:'absolute',left:1300,top:472}} src={window.dominContext.staticPath + '/assets/images/finish/light.png'} alt="" />
        <img style={{position:'absolute',left:1700,top:472}} src={window.dominContext.staticPath + '/assets/images/finish/light.png'} alt="" />
        <img style={{position:'absolute',left:2105,top:513}} src={window.dominContext.staticPath + '/assets/images/finish/light.png'} alt="" />
      </div>
    );
  }
}

FinishPage.propTypes = {

};

export default FinishPage;