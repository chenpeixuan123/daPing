import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TweenMax, TimelineLite } from 'gsap';
import $ from 'jquery';

class TextAnimate extends Component {

    componentDidMount() {
        this.animInfinite();
    }
    
    animInfinite =()=>{
        $('.animate_text').each(function(index,val) {
            index = index + 1;
            TweenMax.fromTo(
                $(this), 1, {autoAlpha:0},{autoAlpha:0+(0.01*index),delay:0.1*index});
        });
        
        TweenMax.to(
            $('.animate_text:nth-child(30)'), 1,{autoAlpha:1.5,delay:3.5}
        );
    }

    
    componentWillMount() {
        
    }
    
    

    generateText =() =>{
        const childrens = [];
        for(var i = 0; i < 30; i++){
            childrens.push(<div key = {i} className = 'animate_text'> { this.props.name } </div>)
        }
        return childrens;
    }

    generateCss(){
        return {
        }
    }

    render() {
        var styles = this.generateCss();
        return (
            <div id = 'wrapper' 
                ref = {(con)=>{ this.con = con; }}
                style = {{ position:'absolute',top:0}}>
                {
                    this.generateText()
                }
            </div>
        );
    }
}

TextAnimate.propTypes = {

};

export default TextAnimate;