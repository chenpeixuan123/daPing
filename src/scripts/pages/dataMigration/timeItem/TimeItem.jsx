import React, { Component } from 'react';
import style from './style.css';

class TimeItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={` ${this.props.className} ${style.root}`} style={this.props.style}>
        <div className={style.hr} />
        <h2 className={style.title}>{this.props.title}</h2>
        <p className={style.time}>
          {this.props.time}
          {this.props.showOff ? <span className={style.off}>{this.props.off}</span> : null}
        </p>
      </div>
    );
  }

}

export default TimeItem;