import React, { Component } from 'react';
import style from '../style.css';
import Item from './Item';
import Info from './Info';
import ScrollList from 'components/common/ScrollList';
import R from 'ramda';

class Three extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }
  
  // filterThreeTask=(data)=>{
  //   if(this.props.data){
  //     return R.propEq('MILESTONE', this.props.data.milestone, data) && R.propEq("CATALOG", this.props.data.catalog, data) && (R.propEq('TASK_SEND_STATUS', "2", data) || R.propEq('TASK_SEND_STATUS', "1", data));
  //   }else{
  //     return false;
  //   }
  // }
  

  render() {
    // let arr = R.filter(this.filterThreeTask, this.props.taskList);
    // let arr =  this.props.taskList;
    return (
      <div className={style.three} style={{ position: "relative" }}>
        <Info style={{ position: 'absolute', left: 92, top: 14 }} data={this.props.data} dataList={this.props.dataList} curTime={this.props.curTime} />
        <div style={{ position: 'absolute', left: 580, top: 20, width: 870, height: 345 }}>
          <ScrollList style={{ width: '100%', height: '100%' }} itemClass={Item} itemProps={{ curTime: this.props.curTime }}
            arrData={this.props.dataList}
            pageCount={7}
            autoPlay={true}
            loop={true}
            delay={3000}
            actionDelay={1000}
            dir={-1}
            moveDis={1}
            itemH={50}
          />
        </div>
      </div>
    );
  }
}

export default Three;