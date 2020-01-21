import React, { Component } from 'react';
import Three from './three/Three';
import FiveRings from './ring/FiveRings';
import R from 'ramda';
import moment from 'moment';
import AnalogData from './AnalogData';
import Tools from 'utils/Tools';

class SecondThird extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: 0,
      secondTaskList:[]
    }
    this.secData = null;
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(R.equals(nextProps, this.props) && R.equals(nextState, this.state));
  }

  componentDidMount(){
    let o = this.getSecData(this.state.idx);
    this.getDataSecondTaskList(o);
  }

  onIndexChangedHandle=(idx)=>{    
    this.setState({idx:idx});
    let o = this.getSecData(idx);
    this.getDataSecondTaskList(o);
  }

  getDataSecondTaskList = (obj) => {
    if (window.locationConfig.debug) {
      this.updateDataSecondTaskList(AnalogData.secondTaskList);
    } else {
      Tools.fetchGetData(window.locationConfig.backupPage.interface.secondTaskList.address+obj.id,
        {
          'Content-Type': 'application/json',
          'token':this.token,
          'userId':this.userId
        },
        this.updateDataSecondTaskList);
    }
  }
  updateDataSecondTaskList=(data)=>{
    this.setState({ secondTaskList: data });
  }


  getSecData(idx) {
    let newIdx = idx % this.props.processList.length;
    if (newIdx < 0) newIdx += this.props.processList.length;
    return this.props.processList[newIdx];
  }

  render() {
    this.secData = this.getSecData(this.state.idx);
       
    return (
      <div className={this.props.className} style={this.props.style}>
        <Three data={this.secData} dataList={this.state.secondTaskList} curTime={this.props.curTime}  /> 
        <FiveRings style={{ left: "50%",width:'50%', position: 'relative',marginTop:25 }} data={this.props.processList} indexChanged={this.onIndexChangedHandle} curTime={this.props.curTime} />
      </div>
    );
  }
}

export default SecondThird;