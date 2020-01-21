import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import s from './Popover.css';
import RemoveButton from './RemoveButton';

class Popover extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
  }

  componentWillUnmount(){
  };

  componentDidMount(){

  }

  componentDidUpdate() {

  }


  render() {
    return (
      <div className={s.root} style={this.props.style}>
        <div className={s.root1}></div>
        <div className = {s.container}>
          <div style={{width:'100%', height:'100%', position: 'absolute'}}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

}

export default CSSModules(Popover,s);
