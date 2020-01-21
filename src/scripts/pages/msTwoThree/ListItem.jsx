import React, { Component } from 'react';
class ListItem extends Component {
  render() {
    let {name,v1,v2,v3}=this.props.data;
    return (
      <div className={this.props.className} style={{fontSize:24,height:40,fontFamily:'微软雅黑'}}>      
        <span style={{
          display: 'inline-block',
          marginLeft: 20,
          width: 134,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }} title={name}>{name}</span>
        <span style={{
          display: 'inline-block',
          width: 100,
          textAlign:'center'
        }}>{v1}</span>
         <span style={{
          display: 'inline-block',
          width: 100,
          textAlign:'center'
        }}>{v3}</span>        
      </div>
    );
  }
}

export default ListItem;