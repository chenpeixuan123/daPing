import React, { Component } from 'react';
import style from './style.css';
class NotFoundPage extends Component {
  constructor(props) {
    super(props);
    window.share.resetPageSize(3840, 1080);
  }
  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    let sty={
        position:'absolute',
        top:"30%",
        left:"50%",
        fontFamily:"fzxs",
        fontSize:300,
        textAlign:'center',
        transform:"translate(-50%,-50%)"
    }
    return (
      <div style={{width:window.innerWidth,height:window.innerHeight,position:'relative'}}>
          <span style={sty} className={`${style.animated} ${style.hinge}`}>404</span>
      </div> 
    );
  }
}

export default NotFoundPage;