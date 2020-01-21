import React, { Component } from 'react';
import R from 'ramda';


class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      off: 0
    };
    this.leftStyle = { marginLeft: this.state.off, whiteSpace: "nowrap" };
    this.rightStyle = { display: 'none', whiteSpace: "nowrap" };
    this.isMoving = false;
    this.needRecal = false;
  }
  componentDidMount() {
    if (this.calNeedMove()) {
      this.flag = window.requestAnimationFrame(this.move);
      this.isMoving = true;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.needRecal = !R.equals(nextProps.data, this.props.data);
    return !(R.equals(nextProps, this.props) && R.equals(nextState, this.state));
  }
  componentDidUpdate() {
    if (this.needRecal) {
      if (this.calNeedMove()) {
        if (!this.isMoving) {
          this.flag = window.requestAnimationFrame(this.move);
          this.isMoving = true;
        }
      } else {
        if (this.isMoving) {
          window.cancelAnimationFrame(this.flag);
          this.isMoving = false;
        }
      }
    }
  }
  calNeedMove() {
    let rectCon = this.spanCon.getBoundingClientRect();
    let rectLeft = this.spanLeft.getBoundingClientRect();

    let conW = rectCon.right - rectCon.left;
    let leftW = rectLeft.right - rectLeft.left;
    if (leftW < conW) {
      return false;
    } else {
      return true;
    }
  }
  calStyle() {
    if (this.spanCon) {
      let rectCon = this.spanCon.getBoundingClientRect();
      let rectLeft = this.spanLeft.getBoundingClientRect();

      let conW = rectCon.right - rectCon.left;
      let leftW = rectLeft.right - rectLeft.left;
      if (leftW < conW) {
        this.leftStyle = { marginLeft: 0, whiteSpace: "nowrap" };
        this.rightStyle = { display: 'none', whiteSpace: "nowrap" };
      } else {
        this.leftStyle = { marginLeft: this.state.off, whiteSpace: "nowrap" };
        this.rightStyle = { display: 'inline', whiteSpace: "nowrap" };
      }
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.flag);
    this.isMoving = false;
  }
  move = () => {
    let rectCon = this.spanCon.getBoundingClientRect();
    let rectLeft = this.spanLeft.getBoundingClientRect();
    let off = rectLeft.right - rectCon.left;
    if (off < 0) {
      this.setState({ off: off - 1 });
    } else {
      this.setState({ off: this.state.off - 1 });
    }
    this.flag = window.requestAnimationFrame(this.move);
  }

  render() {
    this.calStyle();
    return (
      <div className={this.props.className} style={this.props.style}>
        <div ref={(node) => { this.spanCon = node; }} style={{ width: '100%', height: '100%', overflow: 'hidden',whiteSpace:'nowrap'}}>
          <span ref={(node) => { this.spanLeft = node; }} style={this.leftStyle}>{this.props.data}</span>
          <span ref={(node) => { this.spanRight = node; }} style={this.rightStyle} >{this.props.data}</span>
        </div>
      </div>
    );
  }
}

export default Carousel;