import React, { Component } from 'react';
import style from './style.css';
import ProgressBar from '../../../components/common/ProgressBar.jsx';

export default class Right extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        let props = this.props;
        let w = 380;
        let ratio = props.ratio == null ? 0 : props.ratio;
        let plan = props.plan == null ? 0 : props.plan;
        let trans = ratio * w;
        let planTrans = plan * w;
        // 是否需要当前标志
        let title, slide, progressColor = '#409409';
        if (ratio < plan) {
            title = <span style={{ fontSize: 14, zIndex: 2, position: 'absolute', left: -30 + trans, top: -30 }}>当前进度</span>;
            slide = <img style={{ zIndex: 1, transform: 'rotateZ(180deg)  translate(12px,10px)', position: 'absolute', left: trans }} src={window.dominContext.staticPath + '/assets/images/msprov/slide.png'} />;
            progressColor = '#f00';
        }
        return (
            <div className={props.className} style={props.style}>
                <span style={{ position: 'absolute', top: -60 }}>{props.title}</span>
                {title}
                {slide}
                <ProgressBar
                    barStyle={{ background: '#537187', width: w, height: 40, borderRadius: 20, border: '2px solid #fff' }}
                    progressStyle={{ background: progressColor }}
                    r1={ratio} />
                <span style={{ fontSize: 14, zIndex: 2, position: 'absolute', left: -30 + planTrans, top: 50 }}>计划进度</span>
                <img style={{ zIndex: 1, transform: 'translate(-8px, -13px)', position: 'absolute', left: planTrans }} src={window.dominContext.staticPath + '/assets/images/msprov/slide.png'} />
            </div>);
    }
}
