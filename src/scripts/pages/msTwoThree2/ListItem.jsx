import React, { Component } from 'react';

import style from './style.css';
import DataCreater from "pages/msTwoThree2/DataCreater1";
class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            xhClassName:style.xh
        }

    }
    componentDidMount() {
        var xh=this.props.data.v3;
        if(xh===1){
            this.setState({
                    xhClassName: style.firstXh,
                }
            )
        }else if (xh==2){
            this.setState({
                    xhClassName: style.secondXh,
                }
            )
        }else if (xh==3){
            this.setState({
                    xhClassName: style.threeXh,
                }
            )
        }
    }
  render() {
    let {name,v1,v2,v3}=this.props.data;
    return (
      <div className={this.props.className} >
       {/*<span id="xh" className={this.state.xhClassName}>{v3}</span>*/}
          <span className={this.state.xhClassName}
              // v3 ==1 ? style.firstXh : style.secondXh
          //       style={{         //序号
          //           width:43,
          //           textAlign:'center',
          //           display: 'inline-block',
          //           overflow: 'hidden',
          //           textOverflow: 'ellipsis',
          //           whiteSpace: 'nowrap',
          //           margin:'0 auto',
          //           background:'rgba(251,134,239,1)',
          //           borderRadius:9,
          //
          // }}
          >{v3}</span>
        <span style={{         //机构号
            width: 249,
            textAlign:'left',
          display: 'inline-block',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
            paddingLeft:17,
            color:'#76E9FE'
        }} title={name}>{name}</span>
        <span style={{         //存款余额
            width: 130,
          textAlign:'center',
            display: 'inline-block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color:'#A9FBC6'
        }}>{v1}</span>
          <span style={{          //增长
              width: 100,
              textAlign:'center',
              display: 'inline-block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color:'#76E9FE'
          }}>{v2}</span>

      </div>

    );
  }
}

export default ListItem;