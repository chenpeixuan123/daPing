import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TweenLite } from 'gsap';
import R from 'ramda';

class ScrollList extends Component {
  constructor(props) {
    super(props);
    this.dream = this.dream.bind(this);
    this.state = {
      radioOff: 0
    }
  }

  dream =()=>{
    location.reload();
  }
  set radioOff(v) {
    this.setState({ radioOff: v });
  }
  get radioOff() {
    return this.state.radioOff;
  }
  getAdjustRadio(initR, offR) {
    let willR = initR + offR;
    //范围归于[-1,0,1,2,…,count]
    let justR = ((willR + 1) % (this.props.pageCount + 1) + (this.props.pageCount + 1)) % (this.props.pageCount + 1) - 1
    return justR;
  }
  getIndex(initR, offR, initIdx) {
    let L = this.props.pageCount + 1;
    var c = Math.floor(Math.abs(offR) / L);//大头改变多少区间
    var left = offR % L;

    let willR = initR + left;
    if (willR > this.props.pageCount || willR <= -1) {
      c += 1;
    }
    if (offR > 0) {
      return initIdx - c * L;
    } else {
      return initIdx + c * L;
    }
  }
  getItemByIdx(idx, arr) {
    if (this.props.loop) {
      let i = ((idx % arr.length) + arr.length) % arr.length;
      return arr[i];
    } else {
      if (idx < 0 || idx >= arr.length) {
        return null;
      } else {
        return arr[idx];
      }
    }
  }

  componentDidMount() {
    if (this.props.autoPlay) {
      this.startMove();
    }
  }


  shouldComponentUpdate(nextProps, nextState) {
    return !(R.equals(nextState, this.state) && R.equals(nextProps, this.props));
  }
  componentWillUnmount() {
    clearInterval(this.flagPlay);
    TweenLite.killTweensOf(this);
    this.tween = null;
  }
  startMove() {
    if (this.props.delay > this.props.actionDelay) {
      this.flagPlay = setInterval(this.moveToNext, this.props.delay);
    } else {//持续挪动

    }
  }
  moveToNext = () => {
    this.move(this.state.radioOff + this.props.dir * this.props.moveDis, this.props.actionDelay / 1000)
  }

  move(r, t = 1) {
    TweenLite.killTweensOf(this);
    this.tween = TweenLite.to(this, t, { radioOff: r, ease: Power1.easeOut });
  }

  render() {
    let initRadios = [];
    for (var i = 0; i <= this.props.pageCount; i++) {
      initRadios.push(i)
    }

    let items;
    if (this.props.arrData.length>this.props.pageCount) {
      items = initRadios.map((r, index) => {
        let adjustR = this.getAdjustRadio(r, this.state.radioOff);
        let idx = this.getIndex(r, this.state.radioOff, r);
        let data = this.getItemByIdx(idx, this.props.arrData);
        return (<div key={r} id="sss" style={{ position: 'absolute', left: 0, top: adjustR * this.props.itemH ,paddingLeft:17}}>
          <this.props.itemClass data={data} {...this.props.itemProps} />
        </div>);
      });
    } else {
      items = initRadios.map((r, index) => {
        if (index < this.props.arrData.length) {
          let adjustR = this.getAdjustRadio(r, 0);
          let idx = this.getIndex(r, 0, r);
          let data = this.getItemByIdx(idx, this.props.arrData);
          return (<div key={r} style={{ position: 'absolute', left: 0, top: adjustR * this.props.itemH }}>
            <this.props.itemClass data={data} {...this.props.itemProps} />
          </div>);
        } else {
          return null;
        }
      });
    }

    return (
      <div className={this.props.className} style={this.props.style}>
        <div style={{ position: 'relative', overflow: 'hidden', width: "100%", height: '88%' }}>
          {items}
        </div>
      </div>
    );
  }
}


ScrollList.defaultProps = {
  pageCount: 10,//显示多少个
  autoPlay: true,//是否自动播放
  loop: true,//是否循环播放
  delay: 3000,//多久挪动一次
  actionDelay: 1000,//一次挪动的时长
  dir: -1,//向下，-1向上
  moveDis: 1,//每次挪动的距离，可以是小数

  itemH: 50,
  arrData: []
}
ScrollList.PropTypes = {
  itemClass: PropTypes.node,
  itemProps: PropTypes.object
};


export default ScrollList;