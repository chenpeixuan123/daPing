import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Item from './item/Item';
import style from './style.css';
import moment from 'moment';

class Start extends Component {
  constructor(props) {
    super(props);
    window.share.resetPageSize(3840,1080);
  }
  render() {
    return (
      <div className={style.root} >
        <img className={style.bg} src={ window.dominContext.staticPath + '/assets/images/common/bg4.jpg' }/>
        <img className={style.light2} src={ window.dominContext.staticPath + '/assets/images/common/light.png' }/>
        <img className={style.center_logo} src={ window.dominContext.staticPath + '/assets/images/common/logo.png' }/>        
        <div className={style.items}>
          {/* <Item style={style.item} src={ window.dominContext.staticPath + '/assets/images/start/1.png' } title={"主机"} state={1} />
          <Item style={style.item}  src={ window.dominContext.staticPath + '/assets/images/start/2.png' } title={"数据库"} state={1} />
          <Item style={style.item}  src={ window.dominContext.staticPath + '/assets/images/start/3.png' } title={"中间件"} state={1} />
          <Item style={style.item}  src={ window.dominContext.staticPath + '/assets/images/start/4.png' } title={"系统"} state={1} />
          <Item style={style.item}  src={ window.dominContext.staticPath + '/assets/images/start/5.png' } title={"应用"} state={1} />
          <Item style={style.item}  src={ window.dominContext.staticPath + '/assets/images/start/6.png' } title={"网络"} state={1} /> */}
          <img className={style.item} src={ window.dominContext.staticPath + '/assets/images/start/start_logo2.png' } alt="" />
        </div>
        <p className={style.info}>{"各系统运行正常，切换工作准备就绪!"}</p>
        <Link className={style.start2} to="/datamigration">
          <img src={ window.dominContext.staticPath + '/assets/images/start/start2.png' }></img>
        </Link>        
        <h3 className={style.title}>{window.locationConfig.controlPage.title}</h3>
        <p className={style.time}>{moment().format("YYYY MM/DD")}</p>
      </div>);
  }
}

export default Start;