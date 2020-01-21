import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import style from './style.css'
export default class List extends Component {
    constructor(props) {
        super(props)
    }
    vDom() {
        const { content } = this.props;
        let dom = [];
        content.forEach(function (row, i) {
            const tempDom = row.map(function (col, k) {
                return (
                    <div key={k} className={style.selectCell}>{col}</div>
                )
            })
            let pid = row[2];
            dom.push(
                <Link className={style.selectRow} to={'backup/'+pid}  key={i} >
                    {tempDom}
                </Link>
            )
        })
        return dom;
    }
    render() {
        const dom = this.vDom();
        return (
            <div className={style.selectContainer}>
                <div style={{ marginBottom: 10,marginTop: 10,textAlign: 'center' }}>
                    {["启动人", "场景名称", "PID", "演练类型"].map((ele,i)=><div key={i} className={style.selectCell}>{ele}</div>)}
                </div>
                {dom}
            </div>
        )
    }
}