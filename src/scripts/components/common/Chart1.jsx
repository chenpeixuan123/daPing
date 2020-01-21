import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import echarts from 'echarts/lib/echarts';
// import Chart from "components/common/chart/Chart";
// import 'echarts/lib/chart/pie';
// import 'echarts/lib/chart/bar';
// import 'echarts/lib/chart/line';
// import 'echarts/lib/chart/lines';
// import 'echarts/lib/chart/radar';
// import 'echarts/lib/chart/gauge';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/legend';
// import 'echarts/lib/component/markLine';
// import 'echarts/lib/component/graphic';
// import 'echarts/lib/component/axisPointer';
var ch='';
var fys={};
class    Chart1 extends PureComponent {
  constructor(props) {
    super(props);
    const {pa} =this.props;
    this.dream = this.dream.bind(this);

    this.state = {
      qh:false,
      count:0,
      AreaName:'',
    };
    this.chart1 = {};

  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }


  dream =(index)=>{
    this.chart1.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: index-1,
    });



  }
  componentDidMount() {
    this.chart1 = echarts.init(this.chartDiv);
    if(this.props.getChart){
      this.props.getChart(this.chart);
    }
    var myChart = this.chart1;
    const {parent} =this.props;
    this.chart1.setOption(this.props.option);
    //var dataLength = myChart.props.option.series[0].data.length;
    this.chart1.on('click',function (params) {
      parent.getChildrenMsg(this,params.name);
      // myChart.dispatchAction({
      //   type: 'highlight',
      //   seriesIndex: 0,
      //   dataIndex: params.dataIndex,
      // });

    });







    var timeTicket = null;
    timeTicket && clearInterval(timeTicket);

  }


  componentWillUnmount() {
    this.chart1.clear();
    this.chart1.dispose();
    this.chartDiv = null;
    // Chart.on('click'.this.handleClick);
  }

  componentWillReceiveProps(nextProps) {
    if (this.chart1) {
      this.chart1.resize();
      if (!R.equals(nextProps, this.props)) {
        this.chart1.setOption(nextProps.option);
      }else{
        if(this.props.autoAnimate){
          let tempOp = this.chart.getOption();
          this.chart1.clear();
          this.chart1.setOption(tempOp);
        }
      }
    }
  }
  render() {
    return (
        <div ref={(chartDiv)=>{this.chartDiv=chartDiv;}}
             style={this.props.style} className = {this.props.className}
        >
        </div>
    );
  }
};

Chart1.propTypes = {
  option: PropTypes.object.isRequired
}


export default Chart1;