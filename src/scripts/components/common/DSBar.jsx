import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import slider from 'images/components/DSBar/slider.png';

class DSBar extends Component {
    constructor(props) {
        super(props);
        let len = this.props.end-this.props.head;
        this.state = { r1: (this.props.v1-this.props.head)/len, r2: (this.props.v2-this.props.head)/len};
        this.operID = "";

        this.onSliderDown = this.onSliderDown.bind(this);
        this.setR = this.setR.bind(this);
        this.fieldUpR = this.fieldUpR.bind(this);

        this.skipToNext = this.skipToNext.bind(this);
    }
    componentWillMount() {

    }
    componentDidMount() {
        if(this.props.skipDelayTime > 0){
            this.addAutoSkipFun();
        }
    };
    componentWillReceiveProps(nextProps){
        let len = nextProps.end-nextProps.head;
        this.setState({ r1: (nextProps.v1-nextProps.head)/len, r2: (nextProps.v2-nextProps.head)/len});

        if(nextProps.skipDelayTime>0){
            this.addAutoSkipFun();
        }else{
            this.removeAutoSkipFun();
        }
    }
    componentWillUnmount(){
        this.removeAutoSkipFun();
    }

    addAutoSkipFun(){
        clearInterval(this.skipFlag);
        this.skipFlag = setInterval(this.skipToNext,this.props.skipDelayTime);
    }
    removeAutoSkipFun(){
        clearInterval(this.skipFlag);
    }
    skipToNext(){
        let v1 = this.getValueByRadio(this.state.r1);
        let v2 = this.getValueByRadio(this.state.r2);
        //以数值跳动
        v1 += this.props.skipDelayLength;
        v2 += this.props.skipDelayLength;
        if(v1>this.props.end || v2>this.props.end){
            let d = Math.abs(v1-v2);
            v1 = this.props.head;
            v2 = this.props.head+d;
        }
        //转换为r
        let len = this.props.end - this.props.head;
        let r1 = this.corrR((v1-this.props.head)/len);
        let r2 = this.corrR((v2-this.props.head)/len);

        this.setValue({r1,r2});
        this.onFinish();
    }


    onSliderDown(e) {
        this.operID = e.currentTarget.id;
        this.setR(e);
        window.addEventListener("mousemove", this.setR);
        window.addEventListener("mouseup", this.fieldUpR);
    }
    setR(e) {
        e.preventDefault();

        const fieldRect = this.bar.getBoundingClientRect();
        let rPos = (e.clientX - fieldRect.left) / (fieldRect.right - fieldRect.left);

       rPos = this.corrR(rPos);

        if (this.operID == "r1") {
            this.setValue({ r1: rPos });
        } else if (this.operID == "r2") {
            this.setValue({ r2: rPos });
        }
    }
    corrR(rPos){
        //精度修正
        let v = (this.props.end - this.props.head) * rPos + this.props.head;
        v = Math.round(v / this.props.precision) * this.props.precision;
        rPos = (v - this.props.head) / (this.props.end - this.props.head);

        if (rPos > 1) {
            rPos = 1;
        } else if (rPos < 0) {
            rPos = 0;
        }
        return rPos;
    }
    fieldUpR(e) {
        this.operID = "";
        window.removeEventListener("mousemove", this.setR);
        window.removeEventListener("mouseup", this.fieldUpR);
        this.onFinish();
    }
    getValueByRadio(r) {
        let v = (this.props.end - this.props.head) * r + this.props.head;
        return Math.round(v / this.props.precision) * this.props.precision;
    }
    getRadioByValue(v){
        let r = (v-this.props.head)/(this.props.end-this.props.head);
        if(r>1)r=1;
        if(r<0)r=0; 
        return r;
    }
    setValue(o) {
        this.setState(o);
        if (this.props.onChange) {
            this.props.onChange(this.getFromTo());
        }
    }
    getFromTo() {
        let v1 = this.getValueByRadio(this.state.r1);
        let v2 = this.getValueByRadio(this.state.r2);
        if (v1 > v2) {
            return { fromV: v2, toV: v1, fromR: this.state.r2, toR: this.state.r1 };
        } else {
            return { fromV: v1, toV: v2, fromR: this.state.r1, toR: this.state.r2 };
        }
    }
    onFinish() {
        if (this.props.onFinishChange) {
            this.props.onFinishChange(this.getFromTo());
        }
    }

    getLabels(head, end, delay, barW) {
        let count = Math.floor((end - head) / delay) + 1;
        let r = new Array(count);
        let delayW = barW / (count - 1);
        for (let i = 0; i < r.length; i++) {
            let v;
            if (i == r.length - 1) {
                v = end;
            } else {
                v = head + i * delay;
            }
            // r[i] = <div key={i} style={{ width: 50, position: 'absolute', textAlign: 'center', marginLeft: i * delayW }}>
            //     <span style={{ position: 'relative', left: '-50%' }}>{v}</span>
            // </div>;
             r[i] = <span key={i} style={{ width: 50, position: 'absolute', textAlign: 'center', left: i * delayW,transform:'translateX(-50%)'}}>{v}</span>;

        }
        return r;
    }


    render() {
      
        let barStyle = R.merge({
            width: 610,
            height: 17,
            backgroundColor: "#2D4160",
            borderRadius: '8px',
            borderTop: '1px solid #000',
            boxShadow: '-1px -1px 1px 0px rgba(255,255,255,0.3) inset',
            overflow: 'hidden'
        }, this.props.barStyle);
        
        let s = R.merge(this.props.style, { position: 'relative' });

        let barW = barStyle.width;
        let r1Pos = barW * this.state.r1;
        let r2Pos = barW * this.state.r2;

        let fromPos, toPos;
        if (r1Pos < r2Pos) {
            fromPos = r1Pos;
            toPos = r2Pos;
        } else {
            fromPos = r2Pos;
            toPos = r1Pos;
        }
        let progressStyle = R.mergeAll([{
            backgroundColor: '#278FD1',
            height: barStyle.height - 1
        }, this.props.progressStyle, {marginLeft: fromPos, width: toPos - fromPos }]);


        let labels = this.getLabels(this.props.head, this.props.end, this.props.delay, barW);

        return (
            <div style={s}>
                <div ref={(node)=>this.bar=node} style={barStyle}>
                     <div style={progressStyle}></div> 
                </div>
                {labels}
                <img id="r1" style={{ position: "absolute", left: r1Pos - 7, bottom: 0 }} src={slider} alt="滑块" onMouseDown={this.onSliderDown} />
                <img id="r2" style={{ position: "absolute", left: r2Pos - 7, bottom: 0 }} src={slider} alt="滑块" onMouseDown={this.onSliderDown} />
            </div>
        );
    }
}

DSBar.protoTypes = {
    head: PropTypes.number,
    end: PropTypes.number,
    delay: PropTypes.number,
    precision: PropTypes.number,
}
DSBar.defaultProps = {
    head: 0,
    end: 24,
    v1:0,
    v2:0,
    delay: 2,
    precision: 1,
    skipDelayTime:0,
    skipDelayLength:1
};

export default DSBar;
