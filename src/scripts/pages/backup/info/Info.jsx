import React, { Component } from 'react';
import Item from './Item';
import ScrollList from 'components/common/ScrollList';
import R from 'ramda';

class Info extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }

  sortFun = (a, b) => {
    if (a.endTime == b.endTime) {
      return 0;
    } else if (a.endTime > b.endTime) {
      return -1;
    } else {
      return 1;
    }
  }

  filterDoneTask = (data) => {
    if (data) {
      return data.status.indexOf("已完成") != -1;
    } else {
      return false;
    }
  }

  render() {
    let arr = R.filter(this.filterDoneTask, this.props.data);
    arr = R.sort(this.sortFun, arr);
    if (arr.length > 20) {
      arr = arr.slice(0, 20);
    }
    let lastTwo = [];
    for (var i = 0; i < 2; i++) {
      if (arr[i] != null) {
        lastTwo.push(<Item key={i} data={arr[i]} />);
      }
    }

    return (
      <div className={this.props.className}>
        <h2>反馈信息播报</h2>
        {/* <img style={{ position: 'absolute', left: 0, top: 0,width:868,height:503,maxWidth:"none" }} src={window.dominContext.staticPath + '/assets/images/dataMigration/infoBg.png'} /> */}
        <div style={{
          marginTop: 15,
          width: 868,
          height: 503,
          border: '1px solid #295565',
          boxShadow: '0px 0px 25px 0px rgba(0,0,0,0.3) inset',
        }}>
          <ScrollList style={{ width: '100%', height: 400 }} itemClass={Item}
            arrData={arr}
            pageCount={8}
            autoPlay={true}
            loop={true}
            delay={3000}
            actionDelay={1000}
            dir={-1}
            moveDis={1}
            itemH={50}
          />
          <hr style={{
            marginTop: 5,
            marginBottom: -5,
            marginLeft: 'auto',
            marginRight: 'auto',
            width: 800,
            height: 1,
            borderWidth: 0,
            background: "linear-gradient(to right, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.2) 100%)"
          }} />
          {lastTwo}
        </div>
      </div>
    );
  }
}

export default Info;