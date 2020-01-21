import React, { Component } from 'react';

class ImgTitleValue extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className = {this.props.className} style={this.props.style}>
         <h3 className={this.props.titleClassName} style={this.props.titleStyle}>{this.props.title}</h3>
         <p className={this.props.valueClassName} style={this.props.valueStyle}>
           <img src={this.props.imgSrc} className={this.props.imgClassName} style={this.props.imgStyle}/>
           {this.props.value}
        </p>
      </div>
    );
  }
};

export default ImgTitleValue;
