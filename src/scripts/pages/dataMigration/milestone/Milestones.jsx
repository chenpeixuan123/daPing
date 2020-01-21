import React, { Component } from 'react';
import SmallItem from './SmallItem';
// import ScrollList from 'components/common/ScrollList';
import R from 'ramda';

class Milestones extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }


  render() {
    let items = [];
    if (this.props.data) {
      items = this.props.data.map((item) => {
        return <SmallItem key={item.milestone} style={{ display: 'inline-block', marginLeft: 10, marginRight: 10 }} data={item} />
      })
    }
    return (
      <div className={this.props.className}>
        <h2 style={{ fontSize: 36, textAlign: 'center' }}>里程碑</h2>
        <div style={{ margin: "20px auto 0", textAlign: 'center' }}>
          {items}
        </div>
      </div>
    );
  }
}


export default Milestones;