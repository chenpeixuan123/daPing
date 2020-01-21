import React, { Component } from 'react';

class Flow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.className}>
        <img src={window.dominContext.staticPath + '/assets/images/dataMigration/flow.png'} />
      </div>
    );
  }

}

export default Flow;