### 命令行	

* npm run start_1  调试模式
* npm run build 打包文件
### 部署
#>dist

#### 20180615
    最新的大屏版本：
     1、分行大屏http://itcm-dp.gsbankchina.com/#/branch;， 添加了实时数据，资产总额、昨日对比，负债总额、昨日对比，净利润、昨日对比，存款结构；
     2、甘肃地图大屏http://itcm-dp.gsbankchina.com/#/gsprov，  添加了实时数据，各个网点大额交易播报；
     3、中国地图大屏http://itcm-dp.gsbankchina.com/#/gsweb，网银交易波动，按胡总之前的需求，取各个省份的交易金额，实现不了，目前彻底废弃了波动排名图表，界面布局有所调整；

#### 20180724
    最新的大屏版本：
     1、gsprov mspov2 中 营业网点数 全行员工数 写死
     2、gscard mscard2 交易构成全部添加 `境外`标识
     3、gsprov 三个占比 赞同取数现为实时数据
    当前实时数据存在问题：
     1、gsweb msweb2 支付宝、财付通 当日交易金额占比，12个月交易金额对比 后台数据采集异常，原因：服务每次崩溃，数据就重新采集，当月数据丢失严重
     2、实时数据不好看，
     3、余下数据采集 入库结构存在问题，数据提供参数不合理 `subname=01900四级客户,01900二级客户 。。。`
     #### 20180724
#### 2018731
    最新的大屏版本：
     1、gsprov mspov2 中 营业网点数 全行员工数 写死
     2、gsprov分支行的 资产、负债变化情况 、营收趋势分析、净利润趋势分析4个曲线图无数据

#### 20180810
    最新的大屏版本：
     1、gsweb 、msweb2 支付宝财付通12个月数据问题
     2、资产增长率、营业利润增长率 前端计算，客户customer大屏个人存款TOP10、对公存款TOP10===》获客渠道分布