import React, { Component } from 'react';
import style from './style.css';
import LeftTop from './Left-Top';
import LeftDown from './Left-Down';
import Right from './Right';
import Middlezdy from './Middlezdy';
import Tools from 'utils/Tools';
import moment from 'moment';
import R from 'ramda';
import TwoVideo from 'components/common/TwoVideo';
class MSProv extends Component {
  constructor(props) {
    super(props);
    window.share.resetPageSize(720, 1080);
    this.state = {
      map: {
        branch: '-',
        employee: '-',
        today: '-',
        climax: '-',
        tenAvg: '-',
        dualRatio: '-',
        line: [[], []],
        renjuncunkuan: '-',
        renjundaikuan: '-',
        renjunlirun: '-'
      }
    }
  }
  componentDidMount() {}
  componentWillUnmount() {
  }
  render() {
    return (
      <div className={style.root} >
        <Middlezdy data={this.state.map} />
      </div>);
  }
}

export default MSProv;
