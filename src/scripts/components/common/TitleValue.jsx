import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TweenLite from 'gsap';
import 'gsap/src/minified/plugins/EndArrayPlugin.min.js';



class TitleValue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      transition: [0]
    };
  };

  static propTypes = {
    autoAnimate: PropTypes.bool,
    numberFormat: PropTypes.bool
  }

  static defaultProps = {
    autoAnimate: false,
    numberFormat: true
  }

  componentWillUnmount() {
    TweenLite.killTweensOf(this.state.transition);
  }


  componentDidMount() {
    this._updateNumValue(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this._updateNumValue(nextProps);
    }
  }

  _updateNumValue(props) {
    if (this.props.autoAnimate) {
      if (typeof props.value === 'number') {
        var newValue = parseInt(props.value);
        // var newValue = props.value.toFixed(2);        
        TweenLite.to(this.state.transition, 2, { endArray: [newValue], onUpdate: this._updateValue });
      } else {
        this._setValueFormat(props.value);
      }
    } else {
      this._setValueFormat(props.value);
    }
  }

  _updateValue = () => {
    // var newValue = this.state.transition[0].toFixed(2);
    var newValue = parseInt(this.state.transition[0]);
    this._setValueFormat(newValue);
  }

  _setValueFormat(value) {
    if (this.props.numberFormat && typeof value === 'number') {
      value = value.toLocaleString();
    }
    this.setState({ value: value })
  }


  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        <h3 className={this.props.titleClassName} style={this.props.titleStyle}>{this.props.title}</h3>
        <p className={this.props.valueClassName} style={this.props.valueStyle}>
          {this.state.value}
          <span className={this.props.unitClassName} style={this.props.unitStyle}>{this.props.unit}</span>
        </p>
      </div>
    );
  }
};

export default TitleValue;
