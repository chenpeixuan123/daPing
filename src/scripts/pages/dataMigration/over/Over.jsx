import React, { Component } from 'react';
import R from 'ramda';
import { Link } from 'react-router-dom';

class Over extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props);
  }

  render() {  
    return (
      <div className={this.props.className} style={this.props.style}>
            <h1 style= {{ fontSize:'100px',paddingTop:'260px' }} >
              {this.props.title}
            </h1>
            <Link to={window.locationConfig.controlPage.finishPage}>
              <img src={window.dominContext.staticPath + '/assets/images/dataMigration/finish.png'} alt="" 
                  style = {{ display:'inline-block', paddingTop:'260px' }} 
              />
            </Link> 
      </div>
    );
  }
}

export default Over;