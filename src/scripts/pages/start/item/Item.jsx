import React, { Component } from 'react';
import style from './style.css';
  
class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={style.root + " " + this.props.style} >
        <div className = { style.iconContianer }>
          <img id = 'rotate' 
                ref = 'rotate' 
                className = { style.rotate + " " + style.rotateRun } 
                src={ window.dominContext.staticPath + '/assets/images/start/rotate.png' } 
                alt=""/>
          <img className={style.logo} src={this.props.src} />
        </div>
       
        <figcaption>
          <h2 className={style.title}>{this.props.title}</h2>
          <p className={style.state}>{this.props.state == 1 ? "状态OK" : "状态异常"}</p>
        </figcaption>
      </div>
    );
  }
}

export default Item;