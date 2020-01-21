import React, { Component } from 'react';
import MilestoneBar from '../milestone/MilestoneBar';
class All extends Component {

  render() {
    let r = 0;
    if (this.props.all != 0) {
      r = this.props.cur / this.props.all;
    }

    return (
      <div className={this.props.className}>
        <span style={{
          lineHeight: 1.5,
          textAlign: 'center',
          fontFamily: 'Arial Black',
          fontSize: 20,
          display: "inline-block",
          width: 30,
          marginTop: 52
        }}>0</span>
        <MilestoneBar style={{
          position: 'relative',
          verticalAlign: "top",
          display: 'inline-block',
          height: 62
        }}
          cur={this.props.cur}
          all={this.props.all}
          barW={1570}
          barH={50}
          barTop={40}
          progColor={'#305875'}
          progRadius={25}
          imgTop={25}
          imgSrc={window.dominContext.staticPath + '/assets/images/dataMigration/allBar.png'} />
        <div style={{
          display: 'inline-block',
          width: 100,
          textAlign: 'center',
          position: 'relative',
          top: 10
        }}>
          <span style={{
            display: 'block',
            fontFamily: 'Arial Black',
            fontSize: 20,
            lineHeight: 1,
          }}>{this.props.all}</span>
          <span style={{
            display: 'block',
            fontSize: 16,
          }}>总任务数</span>
        </div>
      </div>
    );
  }
};

export default All;
