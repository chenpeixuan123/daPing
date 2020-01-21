import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

class Ring extends Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.setDataByProp(this.props);

    this.draw();
  }
  setDataByProp(props) {
    // let { rx, ry, outerR, innerR } = props;
    let [rx, ry, outerR, innerR] = [110, 110, 110, 75];
    let lineW = outerR - innerR;
    let midR = innerR + lineW / 2;

    this.radgradBg = this.ctx.createRadialGradient(rx, ry, innerR, rx, ry, outerR);
    for (var i = 0; i < this.props.radgradBg.length; i++) {
      this.radgradBg.addColorStop(this.props.radgradBg[i].radio, this.props.radgradBg[i].color);
    }
    this.radgradProgress = this.ctx.createRadialGradient(rx, ry, innerR, rx, ry, outerR);
    for (var i = 0; i < this.props.radgradProgress.length; i++) {
      this.radgradProgress.addColorStop(this.props.radgradProgress[i].radio, this.props.radgradProgress[i].color);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }

  componentDidUpdate() {
    this.setDataByProp(this.props);
    this.draw();
  }

  draw() {
    let ctx = this.ctx;
    // let { rx, ry, outerR, innerR } = this.props;
    let [rx, ry, outerR, innerR] = [110, 110, 110, 75];
    let lineW = outerR - innerR;
    let midR = innerR + lineW / 2;

    if (ctx) {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //背景
      ctx.lineWidth = lineW;
      ctx.strokeStyle = this.radgradBg;
      ctx.lineCap = "square";
      ctx.beginPath();
      ctx.arc(rx, ry, midR, 0, Math.PI * 2, true);
      ctx.stroke();
      //进度
      if (this.props.radio > 0) {
        ctx.strokeStyle = this.radgradProgress;
        ctx.lineCap = this.props.lineCap;
        ctx.beginPath();
        if (this.props.counterclockwise) {
          ctx.arc(rx, ry, midR, this.props.beginAngle, this.props.beginAngle - Math.PI * 2 * this.props.radio, true);
        } else {
          ctx.arc(rx, ry, midR, this.props.beginAngle, this.props.beginAngle + Math.PI * 2 * this.props.radio, false);
        }
        ctx.stroke();
      }


      //边框
      ctx.lineWidth = this.props.boardWidth;
      ctx.strokeStyle = this.props.boardColor;
      ctx.lineCap = "square";
      ctx.beginPath();
      ctx.arc(rx, ry, outerR - this.props.boardWidth / 2, 0, Math.PI * 2, true);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(rx, ry, innerR - this.props.boardWidth / 2, 0, Math.PI * 2, true);
      ctx.stroke();
    }

  }
  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        <canvas ref={node => this.canvas = node} width={220} height={220} style={{ width: "100%", height: "100%" }}></canvas>
      </div>
    );
  }
}

Ring.defaultProps = {
  rx: 100,
  ry: 100,
  innerR: 80,
  outerR: 100,
  counterclockwise: false,
  beginAngle: -Math.PI / 2,
  radio: 0,
  lineCap: 'round',
  radgradBg: [{ radio: 0, color: '#1e2c3d' }, { radio: 0.5, color: '#223246' }, { radio: 1, color: '#1e2c3d' }],
  radgradProgress: [{ radio: 0, color: '#2a7f10' }, { radio: 0.5, color: '#349e14' }, { radio: 1, color: '#2a7f10' }],
  boardColor: '#28588a',
  boardWidth: 1,
}
Ring.PropTypes = {
  rx: PropTypes.number,
  ry: PropTypes.number,
  innerR: PropTypes.number,
  outerR: PropTypes.number,
  counterclockwise: PropTypes.boolean,
  beginAngle: PropTypes.number,
  radio: function (props, propName, componentName) {
    if (props[propName] < 0 || props[propName] > 1) {
      return new Error("Ring组件的radio属性值范围不合法，必须为区间[0,1]的数");
    }
  },
  lineCap: PropTypes.oneOf(['butt', 'round', 'square'])
};


export default Ring;