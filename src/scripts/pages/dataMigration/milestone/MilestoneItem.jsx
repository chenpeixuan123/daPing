import React, { Component } from 'react';
import MilestoneBar from './MilestoneBar';
import R from 'ramda';

class MilestoneItem extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }

  render() {
    let data = this.props.data;
    if (data == null) {
      return null;
    } else {
      return (
        <div className={this.props.className} style={this.props.style}>
          <span style={{
            fontSize: 16,
            display: "inline-block",
            width: 80,
            marginTop: 32,
            lineHeight: 1.5,
            overflow: 'hidden',
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}>
            {data.milestone}
          </span>
          <span style={{
            lineHeight: 1.5,
            textAlign: 'center',
            fontFamily: 'Arial Black',
            fontSize: 20,
            display: "inline-block",
            width: 30,
            marginTop: 32
          }}>
            0
        </span>
          <MilestoneBar style={{
            position: 'relative',
            verticalAlign: "top",
            display: 'inline-block',
            height: 62
          }}
            cur={data.MFinishCount}
            all={data.MCount}
            barW={615}
            barH={25}
            barTop={37}
            progColor={'#276869'}
            progRadius={12}
            imgTop={27}
            imgSrc={window.dominContext.staticPath + '/assets/images/dataMigration/milestoneBar.png'} />
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
            }}>{data.MCount}</span>
            <span style={{
              display: 'block',
              fontSize: 16,
            }}>总任务数</span>
          </div>
        </div>
      );
    }
  }
}


export default MilestoneItem;