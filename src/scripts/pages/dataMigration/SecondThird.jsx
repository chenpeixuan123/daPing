import React, { Component } from 'react';
import Three from './three/Three';
import FiveRings from './ring/FiveRings';
import R from 'ramda';

class SecondThird extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: 0
    }
    this.secData = null;
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(R.equals(nextProps, this.props) && R.equals(nextState, this.state));
  }

  onIndexChangedHandle=(idx)=>{
    this.setState({idx:idx});
  }
  getSecData() {
    let newIdx = this.state.idx % this.props.secondInfo.length;
    if (newIdx < 0) newIdx += this.props.secondInfo.length;
    return this.props.secondInfo[newIdx];
  }

  render() {
    this.secData = this.getSecData();    

    return (
      <div className={this.props.className} style={this.props.style}>
        <Three data={this.secData} taskList={this.props.taskList} curTime={this.props.curTime}  />
        <FiveRings style={{ left: "50%",width:'50%', position: 'relative',marginTop:25 }} data={this.props.secondInfo} indexChanged={this.onIndexChangedHandle} curTime={this.props.curTime} />
      </div>
    );
  }
}

export default SecondThird;