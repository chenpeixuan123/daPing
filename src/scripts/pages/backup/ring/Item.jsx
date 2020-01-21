import React, { Component } from 'react';
import Ring from './Ring';
import moment from 'moment';
import style from './style.css';
import R from 'ramda';
import Tools from 'utils/Tools';

class Item extends Component {
  constructor(props) {
    super(props);
    this.onClickHandle = this.onClickHandle.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }

  calRingRadgradProgress(data) {
    if (data == null) {
      return [{ radio: 0, color: '#2a7f10' }, { radio: 0.5, color: '#349e14' }, { radio: 1, color: '#2a7f10' }];
    } else {
        return [{ radio: 0, color: '#2a7f10' }, { radio: 0.5, color: '#349e14' }, { radio: 1, color: '#2a7f10' }];     
        // return [{ radio: 0, color: '#583415' }, { radio: 0.5, color: '#5d3716' }, { radio: 1, color: '#583415' }];       
    }
  }
  calRingRadio(data) {
    if (data == null) {
      return 0;
    } else {
      return data.percent;
    }
  }
  getInfoTxts(data) {    
    if (data == null) {
      return [];
    } else {
      if(data.status.indexOf("已完成") != -1){
        let has = moment(data.useTime*1000);
        return [
          // <p key="0" className={style.stateInfo} style={{ opacity: this.props.infoAlpha }}>{data.name}</p>,
          <p key="1" className={style.stateInfo} style={{ opacity: this.props.infoAlpha }}>已用时间：{Tools.timeFormat(has, "h:mm:ss")}</p>,
          <p key="2" className={style.stateInfo} style={{ opacity: this.props.infoAlpha }}>状态:{data.status}</p>
        ];
      }else if(data.status == "正在进行"){
        let has = this.props.curTime - moment(data.startTime*1000);
        return [
          // <p key="0" className={style.stateInfo} style={{ opacity: this.props.infoAlpha }}>{data.name}</p>,
          <p key="1" className={style.stateInfo} style={{ opacity: this.props.infoAlpha }}>已用时间：{Tools.timeFormat(has, "h:mm:ss")}</p>,
          <p key="2" className={style.stateInfo} style={{ opacity: this.props.infoAlpha }}>状态:{data.status}</p>
        ];
      }else if(data.status == "未开始"){
        let has = this.props.curTime - moment(data.startTime*1000);
        return [
          // <p key="0" className={style.stateInfo} style={{ opacity: this.props.infoAlpha }}>{data.name}</p>,
          <p key="1" className={style.stateInfo} style={{ opacity: this.props.infoAlpha }}>状态:{data.status}</p>
        ];
      }else{
        return [];
      }
    }
  }
  onClickHandle(e) {
    if (this.props.onClick) {
      this.props.onClick(e, this.props.data);
    }
  }

  render() {
    let obj = this.props.data.data;

    let ringW = 2 * this.props.ringSize;
    let radgradProgress = this.calRingRadgradProgress(obj);
    let radio = this.calRingRadio(obj);
    let infoTxts = this.getInfoTxts(obj);
    let infoStyle = {
          width: 240,
          textAlign:'center',
          opacity: this.props.infoAlpha,
          display: this.props.infoAlpha < 0.3 ? "none" : "block"
        };
    // if (this.props.dir == 1) {
    //   infoStyle = {
    //     position: 'absolute',
    //     width: 200,
    //     left: ringW + 10,
    //     top: (ringW - 72) / 2,
    //     textAlign:'left',
    //     opacity: this.props.infoAlpha,
    //     display: this.props.infoAlpha < 0.3 ? "none" : "block"
    //   }
    // } else {
    //   infoStyle = {
    //     position: 'absolute',
    //     width: 200,
    //      textAlign:'left',
    //     right: ringW + 10,
    //     top: (ringW - 72) / 2,
    //     opacity: this.props.infoAlpha,
    //     display: this.props.infoAlpha < 0.3 ? "none" : "block"
    //   }
    // }

    let rS = "0%", title = "";
    if (obj) {
      rS = Math.floor(obj.percent*100)+"%";
      title = obj.name;
    }

    return (
      <div style={R.merge(this.props.style, obj ? {} : { display: 'none' })} className={this.props.className} onClick={this.onClickHandle}>
        <div style={{
          position: 'relative',
          margin: '0 auto',
          width: ringW,
          height: ringW,
          opacity: this.props.ringAlpha
        }}>
          <Ring style={{
            position: 'absolute',
            left: 0, top: 0,
            width: "100%",
            height: "100%"
          }}
            radgradProgress={radgradProgress}
            radio={radio} />
          <span className={style.itemIndex}
            style={{ fontSize: this.props.valueSize-15 }}>
            {rS}
          </span>         
        </div>
        <h2 title={title}
          className={style.title}
          style={{
            marginTop: 20,
            width: 240,
            opacity: this.props.titleAlpha,
            fontSize: this.props.titleSize,

            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}>
          {title}
        </h2>
        <div style={infoStyle}>
            {infoTxts}
          </div>
      </div>
    );
  }
}


export default Item;