import React, { Component } from 'react';
import style from './style.css';

export default class Tips extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        let p = this.props;
        return (
            <div className={p.className}>
                {p.title}<span style={{fontSize:'1.5em',fontFamily:'Arial black'}}>{p.num}</span>{p.unit}
            </div>);
    }
}
