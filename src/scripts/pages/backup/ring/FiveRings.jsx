import React, { Component } from 'react';
import Item from './Item';
import style from './style.css';
import { posLeftFun, titleAlphaFun, titleSizeFun, infoAlphaFun, ringAlphaFun, sizeFun, topFun } from './util.js';
import { TweenLite } from 'gsap';
import R from 'ramda';

class FiveRings extends Component {
  constructor(props) {
    super(props);
    this.idx = 0;
    this.state = {
      radioOff: 0
    };

    this.onClickHandle = this.onClickHandle.bind(this);
    this.onMouseDownHandle = this.onMouseDownHandle.bind(this);
    this.onMouseMoveHandle = this.onMouseMoveHandle.bind(this);
    this.onMouseUpHandle = this.onMouseUpHandle.bind(this);
  }
  set radioOff(v) {
    this.setState({ radioOff: v });
  }
  get radioOff() {
    return this.state.radioOff;
  }
  getRadio(initR, offR) {
    let willR = initR + offR;
    if (willR > 1) {
      willR = (willR + 1) % 2 - 1;
    } else if (willR < -1) {
      willR = (willR - 1) % 2 + 1;
    }
    return willR;
  }
  getIndex(initR, offR, initIdx) {
    var c = Math.floor(Math.abs(offR) / 2);//大头改变多少
    var left = offR % 2;

    let willR = initR + left;
    if (willR > 1 || willR <= -1) {
      c += 1;
    }
    if (offR > 0) {
      return initIdx - c * 6;
    } else {
      return initIdx + c * 6;
    }
  }
  getItemByIdx(idx, arr) {
    if (idx < 0 || idx >= arr.length) {
      let newIdx = idx % arr.length;
      if (newIdx < 0) newIdx += arr.length;
      return { index: idx, data: arr[newIdx] };
    } else {
      return { index: idx, data: arr[idx] };
    }
  }

  componentDidMount() {
    let idx = R.findIndex(R.propEq('status', "正在进行"))(this.props.data);
    if(idx==-1){
      idx = R.findIndex(R.propEq('status', "未开始"))(this.props.data);
      if(idx == -1){
        idx = this.props.data.length - 1;
      }
    }
    this.idx = idx;
    this.move(-this.idxToR(this.idx));
    this.flag = setInterval(this.moveNext, 20000);    
  } 
  componentDidUpdate(prevProps, prevState){
    if(!R.equals(this.props.data,prevProps.data)){
      clearInterval(this.flag);

      let idx = R.findIndex(R.propEq('status', "正在进行"))(this.props.data);
      if(idx==-1){
        idx = R.findIndex(R.propEq('status', "未开始"))(this.props.data);
        if(idx == -1){
          idx = this.props.data.length - 1;
        }
      }
      this.idx = idx;      
      this.move(-this.idxToR(this.idx));
      this.flag = setInterval(this.moveNext, 20000);  
    }
  }

  componentWillUnmount() {
    clearInterval(this.flag);
    TweenLite.killTweensOf(this);
    this.tween = null;
  }
  moveNext = () => {
    this.idx += 1;
    this.move(-this.idxToR(this.idx));
  }

  getPropsByRadio(radio) {
    let left, top, titleAlpha, titleSize, infoAlpha, ringAlpha, ringSize, valueSize, dir;
    if (radio < 0) {
      left = Math.ceil(-1400 * posLeftFun(-radio));
      radio = -radio;
      dir = -1;
    } else {
      left = Math.floor(1400 * posLeftFun(radio));
      dir = 1;
    }
    top = Math.floor(150 * topFun(radio));
    titleAlpha = titleAlphaFun(radio);
    titleSize = 20 + titleSizeFun(radio) * 10;
    infoAlpha = infoAlphaFun(radio);
    ringAlpha = ringAlphaFun(radio);
    ringSize = Math.ceil(45 * sizeFun(radio) + 30);
    valueSize = Math.floor(16 * sizeFun(radio) + 30);

    return {
      // style: { left, top },
      style: { left: 0, top: 0, transform: `translate(${left - 120}px,${top}px)` },
      titleAlpha,
      titleSize,
      infoAlpha,
      ringAlpha,
      ringSize,
      valueSize,
      dir: dir
    }
  }

  idxToR(idx) {
    let r;
    if (idx >= 0) {
      r = Math.floor(idx / 3) + idx % 3 * 0.33333333;
    } else {
      r = -(Math.floor(-idx / 3) - idx % 3 * 0.33333333);
    }
    return r;
  }
  move(r, t = 1) {
    TweenLite.killTweensOf(this);
    this.tween = TweenLite.to(this, t, { radioOff: r, ease: Power1.easeOut, onComplete: this.moveComplete });
  }
  onClickHandle(e, data) {
    if (!this.tween || !this.tween.isActive()) {
      if (data.data) {
        this.idx = data.index;
        this.move(-this.idxToR(this.idx));
        clearInterval(this.flag);
        this.flag = setInterval(this.moveNext, 20000);
      }
    }
  }
  moveComplete = () => {
    if (this.props.indexChanged) {
      this.props.indexChanged(this.idx);
    }
  }

  onMouseDownHandle(e) {
    // console.log("down");
    // this.downX = e.clientX;
    // window.addEventListener("mousemove",this.onMouseMoveHandle);
    // window.addEventListener("mouseup",this.onMouseUpHandle);
  }
  onMouseMoveHandle(e) {
    // let r = (e.clientX - this.downX)/1250/window.share.ratio + this.state.radioOff;
    // this.move(r,0);
  }
  onMouseUpHandle(e) {
    // window.removeEventListener("mousemove",this.onMouseMoveHandle);
    // window.removeEventListener("mouseup",this.onMouseUpHandle);
  }

  render() {
    // let arr = [-0.6666,-0.3333,0,0.3333,0.6666,1];
    let initIdx = [-2, -1, 0, 1, 2, 3];
    let items = initIdx.map((v) => {
      let p = this.getPropsByRadio(this.getRadio(v / 3, this.state.radioOff));
      let d = this.getItemByIdx(this.getIndex(v / 3, this.state.radioOff, v), this.props.data);
      return <Item key={v} className={style.itemPos} {...p}
        data={d} curTime={this.props.curTime} onClick={this.onClickHandle} />
    });

    return (
      <div className={this.props.className} style={this.props.style}>
        {items}
      </div>
    );
  }
}


export default FiveRings;