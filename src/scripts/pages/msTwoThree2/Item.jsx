import React, { PureComponent } from 'react';

class Item extends PureComponent {
  render() {
    let s = { display: 'inline-block', width: 120,fontSize:18,textAlign:'center'};
    return (<div className={this.props.className} style={{fontFamily:'微软雅黑',padding:24}}>
      <h3 style={{display:'inline-block',fontSize:24,width:110}}>{this.props.title}</h3>
      <div style={{display:'inline-block'}}>
        <p>
          <span style={s}>{this.props.data.rv1+"%"}</span>
          <span style={s}>{this.props.data.rv2+"%"}</span>
          <span style={s}>{this.props.data.rv3+"s"}</span>
        </p>
      </div>

    </div>);
  }
}

export default Item;