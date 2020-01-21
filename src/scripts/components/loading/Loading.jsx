import React, { Component } from 'react';
import style from  './loading.css';

export default class Loading extends Component {
  constructor(props){
    super(props)
  }
  render () {
    return (
      <div className={style.loading} style={this.props.style}>
        <div className={style.box1}></div>
        <div className={style.box2}></div>
        <div className={style.text}>{this.props.text}</div>
      </div>
    )
  }
}