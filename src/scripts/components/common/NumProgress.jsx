import React, { Component } from 'react';

class NumProgress extends  React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }
    render(){  
        return (
            <div style={{width:'100%',height:'35px',position:"relative",}}>
                <div style={{
                            width:'100%',
                            height:'100%',
                            border:'1px solid #fff',
                            borderTopLeftRadius:'20px',
                            borderBottomLeftRadius:'20px',
                            borderTopRightRadius:'20px',
                            borderBottomRightRadius:'20px',
                            overflow:'hidden',
                            backgroundColor:'#091827'
                        }}
                    >
                    {/* 条颜色*/}
                    <div style={{
                            width:this.props.real*100+'%',
                            height:'100%',
                            borderTopLeftRadius:'20px',
                            borderBottomLeftRadius:'20px',
                            background:this.props.real>this.props.plan?'#3da300':'red',
                            MozBoxShadow:'0 0 8px #000 inset',
                            WebkitBoxShadow:'0 0 8px #000 inset',         
                            boxShadow:'0 0 8px #000 inset'
                        }}>
                    </div>
                </div>
                 {/* 下滑块 计划*/}
                 <div style={{
                    position:'absolute',
                    left:(this.props.real*100).toFixed(1)+'%',
                    bottom:'-22px',
                    zIndex:3,
                    textAlign:'center',
                    transform:'translateX(-50%)'}}
                    >
                    <img style={{transform:'rotate(180deg)',width:'12px',height:'12px',margin:"auto"}} src={this.props.slide}/>
                    <p style={{wordBreak:'keep-all',whiteSpace:'nowrap',fontSize:'12px',fontFamily: "Adobe黑体"}}>实际</p>
                </div>
                {/* 上滑块 实际*/}
                <div style={{
                    position:'absolute',
                    left:(this.props.plan*100).toFixed(1)+'%',
                    top:'-22px',
                    zIndex:3,
                    textAlign:'center',
                    transform:'translateX(-50%)'}}
                    >
                    <p style={{wordBreak:'keep-all',whiteSpace:'nowrap',fontSize:'12px',fontFamily: "Adobe黑体"}}>计划</p>
                    <img style={{width:'12px',height:'12px',margin:'auto'}} src={this.props.slide}/>
                </div>
            </div>
        )
    }
}
export default NumProgress;