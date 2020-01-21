import React, { Component } from 'react';
import R from 'ramda';

class Prog extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }
  render() {
    let src = window.dominContext.staticPath + '/assets/images/dataMigration/prog.png';
    if (this.props.timeOut) {
      src = window.dominContext.staticPath + '/assets/images/dataMigration/progTimeOut.png';
    }
    return (
      <div className={this.props.className} style={this.props.style}>
        <div style={{ position: 'relative', width: 255, height: 14 }}>
          <img style={{ position: 'absolute', left: 0, top: 0 }} src={window.dominContext.staticPath + '/assets/images/dataMigration/progBg.png'} />
          <div style={{ position: 'absolute', left: 0, top: 0, width: this.props.r * 255, height: 14, overflow: 'hidden' }} >
            <img style={{ maxWidth: 'none' }} src={src} />
          </div>
        </div>
      </div>
    );
  }
}

export default Prog;