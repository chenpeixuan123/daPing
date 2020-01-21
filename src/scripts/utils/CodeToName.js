const CodeToName = {
    "0742": "兽医服务",
    "0743": "葡萄酒生产商",
    "0744": "香槟生产商",
    "0763": "农业合作",
    "0780": "景观美化和园艺服务",
    "0700": "农业服务",
    "1520": "一般承包商-住宅和商业楼",
    "1711": "空调承包商",
    "1731": "电气承包商",
    "1740": "石膏和绝缘工程承包商",
    "1750": "木工工程承包商",
    "1761": "(铁皮)安装工程承包商",
    "1771": "混凝土工程承包商",
    "1799": "未列入其它代码的专项贸易承包商",
    "2741": "各种出版和印刷服务",
    "2791": "刻版及相关服务",
    "2842": "抛光和卫生服务",
    "1500": "承包服务",
    "4011": "铁路运输",
    "4111": "本地和市郊通勤旅客运输(包括轮渡)",
    "4112": "铁路客运",
    "4119": "救护车服务",
    "4121": "出租车和豪华轿车服务",
    "4131": "公共汽车",
    "4214": "长短途机动车与卡车货运",
    "4215": "快递服务(空运地面运输或海运)",
    "4225": "冷冻品和家用产品",
    "4411": "轮船及巡游航线服务",
    "4457": "出租船只",
    "4468": "海运服务和供给",
    "4511": "航空公司",
    "4582": "机场服务",
    "4722": "旅行社和旅游服务",
    "4784": "路桥通行费",
    "4789": "未列入其它代码的运输服务",
    "4812": "通信设备和电话销售",
    "4814": "信用卡电话磁卡电话和传真",
    "4815": "月结电话收费",
    "4816": "计算机网络/信息服务",
    "4821": "电报服务",
    "4829": "电汇和汇票服务",
    "4899": "有线和其它付费电视服务",
    "4900": "公用事业(电力煤气自来水)",
    "5013": "机动车供应及新零件",
    "5021": "办公及商务家俱",
    "5039": "未列入其它代码的建筑材料",
    "5044": "影印及缩微摄影器材",
    "5045": "计算机外围设备",
    "5046": "未列入其它代码的商用器材",
    "5047": "牙科/实验室/医疗/眼科医院器材和用品",
    "5051": "金属产品服务商和公司",
    "5065": "电器零件和设备",
    "5072": "五金器材及用品",
    "5074": "管道和供暖设备",
    "5085": "未列入其它代码的工业用品",
    "5094": "宝石和贵金属",
    "5099": "未列入其它代码的耐用品",
    "5111": "复印纸和书写纸",
    "5122": "药品经营者",
    "5131": "缝纫用品和其他纺织品",
    "5137": "男女及儿童制服和服装",
    "5139": "鞋类",
    "5169": "未列入其它代码的化学制品和相关产品",
    "5172": "石油和石油产品",
    "5192": "期刊和报纸",
    "5193": "花木栽种用品",
    "5198": "清漆用品",
    "5199": "未列入其它代码的非耐用品",
    "5200": "家庭用品大卖场",
    "5211": "木材和建材卖场",
    "5231": "壁纸商店",
    "5251": "五金商店",
    "5261": "草坪花园用品商店(包括苗圃)",
    "5271": "活动房车经销商",
    "5300": "会员制批量零售店",
    "5309": "免税商店",
    "5310": "折扣商店",
    "5311": "百货商店",
    "5331": "杂货店",
    "5399": "各类综合超市",
    "5411": "食品杂货店和超级市场",
    "5422": "冷藏和冷冻肉类供应商",
    "5441": "糖果店",
    "5451": "乳制品店",
    "5462": "面包房",
    "5499": "各类食品店-便利及专营店",
    "5511": "汽车和卡车经销商(新车和旧车)",
    "5521": "轿车和卡车经销商(旧车)-销售",
    "5531": "汽车和家庭用品店",
    "5532": "汽车轮胎商店",
    "5533": "汽车配件商店",
    "5541": "汽车服务站",
    "5542": "自助加油站",
    "5551": "船只经销商",
    "5561": "娱乐和公共事业活动车经销商",
    "5571": "摩托车商店和经销商",
    "5592": "房车商",
    "5598": "雪车商",
    "5599": "未列入其它代码的各种机动车商",
    "5611": "男子和男童服装及用品商店",
    "5621": "妇女时装商店",
    "5631": "妇女用品商店",
    "5641": "儿童婴儿服装商店",
    "5651": "家庭服装商店",
    "5655": "运动和马术服装商店",
    "5661": "鞋店",
    "5681": "皮货商店",
    "5691": "男女服装店",
    "5697": "改衣店",
    "5698": "假发商店",
    "5699": "各种服装及饰物店",
    "5712": "制造商(不包含电器)",
    "5713": "地板铺设服务",
    "5714": "室内装潢商店",
    "5715": "酒精饮料批发商",
    "5718": "壁炉防护网及配件商店",
    "5719": "各种家庭装饰专营店",
    "5722": "家用电器商店",
    "5732": "电子设备商店",
    "5733": "音乐商店-乐器",
    "5734": "计算机软件商店",
    "5735": "音像制品商店",
    "5811": "宴会承包商",
    "5812": "餐厅",
    "5813": "饮品店(酒精饮料)-酒吧",
    "5814": "快餐店",
    "5912": "药房",
    "5913": "未列入其它代码的批发类",
    "5921": "瓶装酒小卖店",
    "5931": "旧商品店",
    "5932": "古玩店-销售",
    "5933": "当铺",
    "5935": "海上船只遇难救助场",
    "5937": "古玩复制店",
    "5940": "自行车商店销售和服务",
    "5941": "体育用品店",
    "5942": "书店",
    "5943": "学校用品商店",
    "5944": "钟表和银器商店",
    "5945": "玩具游戏店",
    "5946": "照相器材店",
    "5947": "纪念品商店",
    "5948": "皮具店",
    "5949": "织物和布料商店",
    "5950": "玻璃器具和水晶饰品商店",
    "5960": "直销-保险服务",
    "5962": "电话销售-旅行相关的服务",
    "5963": "送货上门销售",
    "5964": "直销-目录邮购商",
    "5965": "直销-目录邮购与零售兼营的商户",
    "5966": "直销-呼出型电话行销商",
    "5967": "直销-接入型电话行销商",
    "5968": "直销-长期定购或会员制商户",
    "5969": "未列入其它代码的直销业务和直销商",
    "5970": "工艺美术商店",
    "5971": "艺术商和画廊",
    "5972": "邮票和纪念币商店",
    "5973": "宗教品商店",
    "5975": "助听器-销售",
    "5976": "假肢店",
    "5977": "化妆品商店",
    "5978": "打字机商店-销售",
    "5983": "煤炭和液化石油",
    "5992": "花店",
    "5993": "雪茄店",
    "5994": "报亭",
    "5995": "宠物食品及用品",
    "5996": "供应和服务",
    "5997": "电动剃刀商店-销售和服务",
    "5998": "帐篷和遮阳篷商店",
    "5999": "其它专营零售店",
    "6010": "金融机构-人工现金支付",
    "6011": "金融机构-自动现金支付",
    "6012": "金融机构-购买商品和服务",
    "6051": "非金融机构-外币兑换",
    "6211": "证券公司-经纪人和经销商",
    "6300": "保险业和保险金",
    "6760": "储蓄",
    "7011": "住宿服务",
    "7012": "分时使用的别墅或度假用房",
    "7032": "运动和娱乐露营地",
    "7033": "活动房车场及露营场所",
    "7210": "洗衣服务",
    "7211": "洗熨服务-家庭和商业",
    "7216": "干洗店",
    "7217": "室内清洁服务",
    "7221": "摄影工作室",
    "7230": "美容理发店",
    "7251": "帽子清洗店",
    "7261": "丧仪殡葬服务",
    "7273": "婚姻介绍及陪同服务",
    "7276": "交税准备服务",
    "7277": "咨询服务-债务",
    "7278": "购物服务及会所",
    "7295": "家政服务",
    "7296": "出租衣物-服装",
    "7297": "按摩店",
    "7298": "健身及美容室",
    "7299": "未列入其它代码的其他个人服务",
    "7311": "广告服务",
    "7321": "消费者信用报告机构",
    "7322": "债务催收机构",
    "7333": "商业摄影",
    "7338": "复制及绘图服务",
    "7339": "速记和秘书类服务",
    "7342": "灭虫(蝇等)及消毒服务",
    "7349": "门卫服务",
    "7361": "临时帮佣服务",
    "7372": "数据处理和系统集成设计服务",
    "7375": "信息检索服务",
    "7379": "未列入其它代码的计算机维护和修理服务",
    "7392": "管理咨询和公共关系服务",
    "7393": "保安安全服务(包括防弹车和警犬)",
    "7394": "家俱和电器出租",
    "7395": "照相洗印服务",
    "7399": "未列入其它代码的商业服务",
    "7512": "汽车出租",
    "7513": "卡车及拖车出租",
    "7519": "房车和娱乐车辆出租",
    "7523": "停车场及车库",
    "7531": "车体维修店",
    "7534": "轮胎翻新",
    "7535": "汽车喷漆店",
    "7538": "汽车服务商店(非经销商)",
    "7542": "洗车",
    "7549": "拖车服务",
    "7622": "电器维修",
    "7623": "空调及冷藏设备维修店",
    "7629": "电气设备及小家电维修店",
    "7631": "钟表和首饰维修店",
    "7641": "家俱维修",
    "7692": "焊接维修服务",
    "7699": "各类维修店及相关服务",
    "7829": "电影和录像带制片",
    "7832": "电影院",
    "7841": "出租录像带服务",
    "7911": "舞蹈工作室和学校",
    "7922": "戏剧制片(不含电影)",
    "7929": "管弦乐队和各类演艺人员",
    "7932": "撞球场所",
    "7933": "保龄球馆",
    "7941": "职业体育俱乐部",
    "7991": "展览",
    "7992": "公共高尔夫球场",
    "7993": "电子游戏供给",
    "7994": "大型游戏机和游戏场所",
    "7995": "博彩业(包括彩票等)",
    "7996": "嘉年华等",
    "7997": "乡村俱乐部和私人高尔夫球场",
    "7998": "海洋馆和海豚馆",
    "7999": "未列入其它代码的其他娱乐服务",
    "8011": "未列入其它代码的医生和医师",
    "8021": "牙科医生",
    "8031": "正骨医生",
    "8041": "按摩医生",
    "8042": "验光配镜师",
    "8043": "光学仪器商",
    "8049": "手足病医生",
    "8050": "护理和照料服务",
    "8062": "医院",
    "8071": "医学和牙科实验室",
    "8099": "未列入其它代码的医疗保健服务",
    "8111": "法律服务和律师事务所",
    "8211": "小学和中校",
    "8220": "专科和职业学院",
    "8241": "函授学校",
    "8244": "商业和文秘学校",
    "8249": "贸易和职业学校",
    "8299": "未列入其它代码的学校与教育服务",
    "8351": "儿童保育服务",
    "8398": "慈善和社会公益服务组织",
    "8641": "公民社团和共济会",
    "8651": "政治组织",
    "8661": "宗教组织",
    "8675": "汽车协会",
    "8699": "未列入其它代码的会员组织",
    "8734": "测试实验室(非医学)",
    "8911": "工程和测量服务",
    "8912": "装修",
    "8931": "财务服务",
    "8999": "未列入其它代码的其他专业服务",
    "9211": "包括赡养费和子女抚养费",
    "9222": "罚款",
    "9223": "保释金",
    "9311": "纳税",
    "9399": "未列入其它代码的政府服务",
    "9400": "使领馆收费",
    "9402": "邮政服务-仅限政府",
    "9411": "政府贷款",
}

export default CodeToName;