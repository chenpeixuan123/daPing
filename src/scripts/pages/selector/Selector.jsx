import React, { Component } from 'react'
// import Select from 'react-select';
// import  './react-select.css';
import Multiselect from './Multiselect.jsx';
import List from './List.jsx';
import Tools from 'utils/Tools';

class Selector extends Component {
    constructor(props) {
        super(props);
        window.share.resetPageSize(1920, 1080);
        this.dataArr = [];
        this.state = {
            who: [
                { label: '启动人一', value: '启动人一' },
                { label: '启动人二', value: '启动人二' },
                { label: '启动人三', value: '启动人三' },
                { label: '启动人四', value: '启动人四' }
            ],
            where: [
                { label: '场景一', value: '场景一' },
                { label: '场景二', value: '场景二' },
                { label: '场景三', value: '场景三' },
                { label: '场景四', value: '场景四' }
            ],
            type: [
                { label: 'desktop', value: 'desktop' },
                { label: 'laptop', value: 'laptop' }
            ],
            content: [
                ['启动人一', '场景一', '21321', 'desktop'],
                ['启动人一', '场景二', '21321', 'laptop'],
                ['启动人二', '场景一', '99921321', 'desktop'],
                ['启动人三', '场景三', '21321', 'desktop'],
                ['启动人四', '场景四', '21321', 'desktop']
            ]
        },
        this.preserve = JSON.parse(JSON.stringify(this.state.content))
        this.confilter = this.confilter();
    }
    componentWillUnmount() {}
    componentDidMount() {
        Tools.fetchPost(window.locationConfig.backupPage.interface.allPid.address, {
            'Content-Type': 'application/json',
            'token': 0,
            'userId': 0
        }, { "queryParamList": [{ "fieldName": "processstatus", "fieldValue": "enabled", "operator": "=" }, { "fieldName": "status", "fieldValue": "RUNNING", "operator": "=" }] }, this.fetchCompleted);
        
        Tools.fetchPost(window.locationConfig.backupPage.interface.allPid.address, {
            'Content-Type': 'application/json',
            'token': 0,
            'userId': 0
        }, { "queryParamList": [{ "fieldName": "processstatus", "fieldValue": "enabled", "operator": "=" }, { "fieldName": "status", "fieldValue": "SUCCESSED", "operator": "=" }] }, this.fetchCompleted);
    }
    confilter() {
        let who, where, type;
        return function (factor, tell) {
            switch (tell) {
                case 'who':
                    who = factor;
                    break;
                case 'where':
                    where = factor;
                    break;
                case 'type':
                    type = factor;
                    break;
            }
            let newContent = this.preserve.filter(muiltFac(who, 0)).filter(muiltFac(where, 1)).filter(muiltFac(type, 3));
            this.setState({
                content: newContent
            })
        }
    }
    fetchCompleted=(data)=>{       
        this.dataArr = this.dataArr.concat(data.datalist);
        let d = this.dataArr;
        let who = [], where = [], type = [], content = []
        for (let i = 0; i < d.length; i++) {
            let temp = d[i];
            let who_name = temp.user?temp.user.name:temp.userName;
            let where_name = temp.servicecatalog.name;
            let type_name = temp.processvariable.split(',')[1].split('=')[1];
            let pid = temp.processinstanceid;
            who.push({
                label: who_name,
                value: who_name,
            })
            where.push({
                label: where_name,
                value: where_name,
            })
            type.push({
                label: type_name,
                value: type_name,
            })
            content.push(
                [who_name, where_name, pid, type_name,]
            )
        }
        this.preserve = JSON.parse(JSON.stringify(content))
        this.setState({
            who,
            where,
            type,
            content
        })
    }
    render() {
        return (
            <div style={{textAlign:'center',marginTop: 50}}>
                <Multiselect
                    style={{width:400,float:'left',marginLeft:359}}
                    placeholder='启动人搜索'
                    left={0}
                    changed={factor => this.confilter(factor, 'who')}
                    options={this.state.who}
                />
                <Multiselect
                    style={{width:400,float:'left'}}
                    placeholder='场景名称搜索'
                    left={500}
                    changed={factor => this.confilter(factor, 'where')}
                    options={this.state.where}
                />
                <Multiselect
                    style={{width:400,float:'left'}}
                    placeholder='演练类型搜索'
                    left={1000}
                    changed={factor => this.confilter(factor, 'type')}
                    options={this.state.type}
                />
                <List content={this.state.content} />
            </div>
        )
    }
}


export default Selector

function muiltFac(facs, n) {
    return function (d) {
        if (facs == null) {
            return true
        }
        return facs.includes(d[n])
    }
}
