import React, { PureComponent } from 'react';
import style from './style.css';
import DataCreater from './DataCreater';
import Chart from 'components/common/Chart';

class ThreeCenter extends PureComponent {
  render() {
    let slide=window.dominContext.staticPath + '/assets/images/ms23/slideRock.png';
    return (<div className={this.props.className}>
      <div style={{ position: 'relative' }}>
        {/* <img style={{ position: 'absolute', left: 312, top: 178, maxWidth: 'none' }} src={window.dominContext.staticPath + '/assets/images/ms23/line1.png'} />
        <img style={{ position: 'absolute', left: 242, top: 294, maxWidth: 'none' }} src={window.dominContext.staticPath + '/assets/images/ms23/line2.png'} />
        <img style={{ position: 'absolute', left: 488, top: 285, maxWidth: 'none' }} src={window.dominContext.staticPath + '/assets/images/ms23/line3.png'} />

        <img style={{ position: 'absolute', left: 0, top: 0, maxWidth: 'none' }} src={window.dominContext.staticPath + '/assets/images/ms23/circle1.png'} />
        <img style={{ position: 'absolute', left: 487, top: 0, maxWidth: 'none' }} src={window.dominContext.staticPath + '/assets/images/ms23/circle2.png'} />
        <img style={{ position: 'absolute', left: 305, top: 387, maxWidth: 'none' }} src={window.dominContext.staticPath + '/assets/images/ms23/circle3.png'} /> */}
        <img style={{ position: 'absolute', left: 312, top: 178, maxWidth: 'none' }} src={window.dominContext.staticPath + '/assets/images/ms23/line1.png'} />
        
        {/* css3动画img*/}
        <img className={style.slide} style={{position: 'absolute', left:"221px", top: '249px',maxWidth:"none",zIndex:1}} src={slide}/>
        <img style={{ position: 'absolute', left: 257, top: 280, maxWidth: 'none'}} src={window.dominContext.staticPath + '/assets/images/ms23/line2.png'} />
     
        <img style={{ position: 'absolute', left: 503, top: 280, maxWidth: 'none' }} src={window.dominContext.staticPath + '/assets/images/ms23/line3.png'} />

        <div style={{ position: 'absolute', left: 56, top: 62, maxWidth: 'none',zIndex:2,width:256,height:256,borderRadius:128,boxShadow:'0px 0px 57px 20px #1e76b9'}}/>
        <div style={{ position: 'absolute', left: 543, top: 62, maxWidth: 'none',zIndex:2,width:256,height:256,borderRadius:128,boxShadow:'0px 0px 57px 20px #1e76b9'}}/>
        
        <img style={{ position: 'absolute', left: 56, top: 62, maxWidth: 'none',zIndex:2 }} src={window.dominContext.staticPath + '/assets/images/ms23/circleNew1.png'} />
        <img style={{ position: 'absolute', left: 543, top: 62, maxWidth: 'none',zIndex:2 }} src={window.dominContext.staticPath + '/assets/images/ms23/circleNew2.png'} />
        <img style={{ position: 'absolute', left: 331, top: 387, maxWidth: 'none' ,zIndex:2}} src={window.dominContext.staticPath + '/assets/images/ms23/circleNew3.png'} />
        

        <Chart  style={{position:"absolute",left: 56, top:400, width:"200px",height:"200px"}} option={DataCreater.createLeftCircleOption(this.props.tbsl)}/>
        <Chart  style={{position:"absolute",left: 600, top:400, width:"200px",height:"200px"}} option={DataCreater.createRightCircleOption(this.props.tbys)}/>
        
        <p style={{ position: 'absolute', left: 402, top: 158,width:100 }}>同城双活</p>
      </div>
    </div>);
  }
}

export default ThreeCenter;