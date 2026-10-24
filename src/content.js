// 页面内容：航天器的数据、部件、时间线与读物。
// 数字取自 NASA、中国空间技术研究院、中国国家航天局等公开页面，
// 逐项出处见每个航天器的 sources。

export const craftOrder = ['voyager', 'sputnik', 'dongfanghong', 'cassini', 'soyuz'];

export const craft = {
  voyager: {
    id: 'voyager',
    name: '旅行者号',
    en: 'VOYAGER',
    tag: '1977 · 双探测器 · 星际空间',
    lede: '两艘外形相同的探测器，带着一张写给未知文明的金唱片，正飞出太阳系。',
    model: 'models/voyager.glb',
    download: { file: 'NASA-Voyager.glb', size: '3.13 MB' },
    view: { min: 2, max: 48, exposure: 1.4, target: [0, 2.6, 2.5], position: [-9, 10, -13], up: [0.9, 1, 0], fit: 1.0 },
    heroFacts: [
      { v: '1977', u: '年', l: '启程' },
      { v: '815', u: '千克', l: '发射质量' },
      { v: '24', u: '小时', l: '信号单程' },
    ],
    modelInfo: {
      tri: '20,390', vert: '23,928', mesh: '4', mat: '5', tex: '4',
      note: 'NASA 可视化部门提供的官方 GLB，内嵌四张纹理。网页重新编排了光照与材质参数，几何与贴图保持原样。',
      method: '官方三维资产',
    },
    parts: {
      antenna: {
        no: '01', title: '高增益天线', en: 'HIGH-GAIN ANTENNA',
        text: '直径 3.7 米的抛物面，是整个任务的通信中枢。它始终指向地球，把四颗巨行星的观测和后来星际空间的数据一路送回，也把地面指令送到 259.02 亿千米之外。',
        value: '3.7', unit: '米 · 抛物面直径',
        anchor: [0, 1.5, 0], target: [0, 1.15, 0], offset: [5, 5.5, -7],
        source: 'https://science.nasa.gov/mission/voyager/frequently-asked-questions/',
      },
      science: {
        no: '02', title: '科学仪器平台', en: 'SCAN PLATFORM',
        text: '3 米伸展臂末端的可转动平台安放相机与红外、紫外光谱仪。两艘探测器在这里拍下木卫一的火山、土星环的辐条，以及天王星和海王星唯一的近照。',
        value: '3', unit: '米 · 仪器伸展臂',
        anchor: [0, .15, -3.6], target: [0, .25, -3.1], offset: [3.2, 2.4, -4.5],
        source: 'https://science.nasa.gov/mission/voyager/spacecraft/',
      },
      rtg: {
        no: '03', title: '放射性同位素电源', en: 'RADIOISOTOPE POWER',
        text: '三台 RTG 并联工作，把钚-238 衰变产生的热转换成电。2023 年每艘探测器的电源输出约 225 瓦，之后每年再少约 4 瓦，仪器只能一台接一台关掉。',
        value: '3', unit: '台 · RTG 电源',
        anchor: [0, -.1, 3.5], target: [0, .1, 3.4], offset: [4, 2.7, -2.8],
        source: 'https://science.nasa.gov/mission/voyager/spacecraft/',
      },
      magnetometer: {
        no: '04', title: '磁强计伸展臂', en: 'MAGNETOMETER BOOM',
        text: '13 米长的桁架把磁强计送到远离本体的位置，避开探测器自身的磁场。日球层顶的位置与星际磁场的走向，都靠这条细长的臂测量。',
        value: '13', unit: '米 · 伸展臂长度',
        anchor: [0, 8.9, 12.5], target: [0, 4.9, 7.2], offset: [11, 6, -8],
        source: 'https://science.nasa.gov/mission/voyager/frequently-asked-questions/',
      },
      record: {
        no: '05', title: '来自地球的金唱片', en: 'THE GOLDEN RECORD',
        text: '12 英寸镀金铜盘，收录 115 张图像、55 种语言的问候和 90 分钟音乐，以每分钟 16⅔ 转播放。铝制封套里放着唱针与使用图示，封面上刻着标出太阳系位置的脉冲星地图。',
        value: '115', unit: '张图像 · 一张镀金铜盘',
        anchor: [.96, 0, 0], target: [.95, 0, 0], offset: [2.6, .35, -.3],
        source: 'https://science.nasa.gov/mission/voyager/golden-record-contents/',
      },
    },
    specs: [
      { v: '1977', u: '年', l: '启程', d: '旅行者 2 号 8 月 20 日先行，旅行者 1 号 9 月 5 日出发' },
      { v: '3.7', u: '米', l: '高增益天线', d: '从发射至今一直朝向地球' },
      { v: '815', u: '千克', l: '发射质量', d: '含肼推进剂；如今约 733 与 735 千克' },
      { v: '13', u: '米', l: '磁强计伸展臂', d: '把仪器送到本体磁场之外' },
      { v: '3.5', u: 'AU／年', l: '离日速度', d: '旅行者 2 号约 3.1 AU／年' },
    ],
    fact: '2026 年 11 月 18 日，旅行者 1 号成为第一个距地球一光日的人造物体：259.02 亿千米，光走完这段路需要 24 小时。',
    readings: [
      {
        no: '01', title: '“大巡游”的窗口',
        body: '两艘探测器在 1977 年的夏天由泰坦 IIIE-半人马座火箭从卡纳维拉尔角送出。旅行者 2 号先走，走的是较慢但更长的路；旅行者 1 号后走，用一条更快的轨道抢先抵达木星，又在土星之后被土卫六的引力甩出黄道。',
        facts: [
          '旅行者 1 号 · 木星 1979-03-05，4.89 个木星半径',
          '旅行者 1 号 · 土星 1980-11-12，3.09 个土星半径',
          '旅行者 2 号 · 木星 1979-07-09，10.11 个木星半径',
          '旅行者 2 号 · 土星 1981-08-25，2.67 个土星半径',
          '旅行者 2 号 · 天王星 1986-01-24，4.19 个天王星半径',
          '旅行者 2 号 · 海王星 1989-08-25，1.18 个海王星半径',
        ],
      },
      {
        no: '02', title: '没有阳光的电源',
        body: '外太阳系的阳光太弱，太阳能板无能为力。三台放射性同位素热电机把钚-238 自然衰变的热量转换为电能，不依赖光照，也不怕远离太阳。',
        facts: [
          '2023 年每艘探测器的 RTG 合计输出约 225 瓦',
          '此后每年下降约 4 瓦',
          '2026 年 4 月，旅行者 1 号只剩磁强计与等离子波两台仪器在工作',
          '旅行者 2 号仍保留宇宙线子系统',
          '地面预计还能与它们保持联系到 2036 年前后',
        ],
      },
      {
        no: '03', title: '写给未知文明的信',
        body: '金唱片的曲目由卡尔·萨根主持的委员会挑选。除了图像与音乐，唱片里还有风、浪、雷、鸟、鲸的声音，以及从六千年前的阿卡德语一直排到现代吴语的问候。',
        facts: [
          '12 英寸镀金铜盘，铝制封套内附唱针与图示',
          '播放速度 16⅔ 转／分',
          '115 张图像，以模拟信号编码',
          '55 种语言的问候',
          '90 分钟音乐，兼收东西方经典与各地民族音乐',
        ],
      },
      {
        no: '04', title: '一条要走近一天的信使',
        body: '信号从探测器出发，以光速追赶地球。距离越远，能传回的比特越少，地面天线却要开得更大。',
        facts: [
          '高增益天线发送 X 波段，约 8.4 GHz',
          '常规遥测 160 bit／秒，等离子波数据回放 1.4 kbps',
          '深空网络在戈尔德斯通、马德里、堪培拉设三座综合体',
          '每座站点配一台 70 米口径天线',
          '机载计算机每秒执行约 8,000 条指令',
        ],
      },
    ],
    timeline: {
      tabs: [
        {
          name: '旅行者 1 号',
          items: [
            { d: '1977.09.05', t: '从卡纳维拉尔角出发', x: '晚于旅行者 2 号 16 天升空，走一条更快、更短的路径。' },
            { d: '1979.03.05', t: '飞掠木星', x: '最近距离 4.89 个木星半径，发现木卫一上有活火山。' },
            { d: '1980.11.12', t: '飞掠土星', x: '掠过土卫六，轨道被引力转向黄道以北。' },
            { d: '1990.02.14', t: '暗淡蓝点', x: '在距太阳 60 亿千米处回望，拍下只有一个像素的地球。' },
            { d: '2012.08.25', t: '穿过日球层顶', x: '成为第一个进入星际空间的人造探测器。' },
            { d: '2026.11.18', t: '抵达一光日', x: '距地球 259.02 亿千米，成为第一个走过一光日的人造物体。' },
          ],
        },
        {
          name: '旅行者 2 号',
          items: [
            { d: '1977.08.20', t: '先行出发', x: '比孪生兄弟早 16 天升空，路线更长，为四颗巨行星留出余地。' },
            { d: '1979.07.09', t: '飞掠木星', x: '最近距离 10.11 个木星半径，细看木卫二的冰面。' },
            { d: '1981.08.25', t: '飞掠土星', x: '从土星环外侧掠过，拍下环中的辐条与 F 环的牧羊犬卫星。' },
            { d: '1986.01.24', t: '飞掠天王星', x: '唯一一次近距离访问这颗侧躺自转的冰巨星。' },
            { d: '1989.08.25', t: '飞掠海王星', x: '完成四颗巨行星的巡游，并拍下海卫一的冰火山。' },
            { d: '2018.11.05', t: '穿过日球层顶', x: '成为第二个进入星际空间的探测器，带回第一份星际等离子体原位数据。' },
          ],
        },
      ],
    },
    sources: [
      { l: '任务年表与工程概况', n: 'NASA · Voyager Fact Sheet', url: 'https://science.nasa.gov/mission/voyager/fact-sheet/' },
      { l: '航天器结构与仪器', n: 'NASA · Spacecraft', url: 'https://science.nasa.gov/mission/voyager/spacecraft/' },
      { l: '尺寸、质量、速度与功率', n: 'NASA · Frequently Asked Questions', url: 'https://science.nasa.gov/mission/voyager/frequently-asked-questions/' },
      { l: '一光日里程碑与当前距离', n: 'NASA · Where Are They Now?', url: 'https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/' },
      { l: '金唱片的内容与制作', n: 'NASA · Golden Record', url: 'https://science.nasa.gov/mission/voyager/golden-record-contents/' },
      { l: '各次飞掠的时刻与距离', n: 'NASA NSSDC · Voyager Periapse', url: 'https://nssdc.gsfc.nasa.gov/planetary/voyager-periapse.html' },
      { l: '暗淡蓝点', n: 'NASA · Pale Blue Dot', url: 'https://science.nasa.gov/mission/voyager/voyager-1s-pale-blue-dot/' },
      { l: '官方三维模型（NASA / VTAD）', n: 'science.nasa.gov', url: 'https://science.nasa.gov/resource/voyager-3d-model/' },
    ],
  },

  sputnik: {
    id: 'sputnik',
    name: '斯普特尼克 1 号',
    en: 'SPUTNIK 1',
    tag: '1957 · 第一颗人造地球卫星',
    lede: '一颗直径 58 厘米的抛光铝球，用三个星期的“哔哔”声，把人类送进了太空时代。',
    model: 'models/sputnik-1.glb',
    download: { file: 'Sputnik-1.glb', size: '0.55 MB' },
    view: { min: .8, max: 16, exposure: 1.15, target: [0, -1.35, 0], position: [2.9, 1.9, 4.4], up: [0.05, 1, 0], fit: 0.62 },
    heroFacts: [
      { v: '1957', u: '年', l: '入轨' },
      { v: '83.6', u: '千克', l: '卫星质量' },
      { v: '96.2', u: '分钟', l: '绕地一圈' },
    ],
    modelInfo: {
      tri: '18,016', vert: '11,974', mesh: '50', mat: '4', tex: '0',
      note: '按 58 厘米球体与四根天线（2.9 米、2.4 米各两根）的参数逐件生成，接缝、紧固件与天线底座按照片排布。',
      method: '参数化建模',
    },
    parts: {
      shell: {
        no: '01', title: '抛光球壳', en: 'PRESSURISED SHELL',
        text: '两个铝合金半球壳合抱成直径 58 厘米的球体，内部充入 1.3 个大气压的氮气，为电池与发射机提供稳定的工作环境。抛光的表面让它在阳光下成为一颗会移动的亮星。',
        value: '58', unit: '厘米 · 球体直径',
        anchor: [0, .29, 0], target: [0, 0, 0], offset: [1.1, .65, 1.2],
        source: 'https://www.nasa.gov/history/sputnik/siddiqi.html',
      },
      aerials: {
        no: '02', title: '四根鞭状天线', en: 'WHIP ANTENNAE',
        text: '四根细长天线从星体后部张开，两根长 2.9 米，两根长 2.4 米。它们在轨道上始终朝同一方向伸出，地面上的业余无线电爱好者因此能稳定收到那串脉冲。',
        value: '4', unit: '根 · 2.9 米与 2.4 米各两根',
        anchor: [-.79, -1.12, .4], target: [0, -1.15, 0], offset: [2.8, 1.6, 3],
        source: 'https://www.nasa.gov/history/sputnik/siddiqi.html',
      },
      radio: {
        no: '03', title: '两台无线电发射机', en: 'RADIO TRANSMITTERS',
        text: '发射机工作在 20.005 兆赫与 40.002 兆赫，波长分别为 1.5 米与 7.5 米。每次脉冲持续 0.2 到 0.6 秒，交替成为那阵著名的“哔哔”声。',
        value: '2', unit: '台 · 20.005 与 40.002 MHz',
        anchor: [.27, .02, .1], target: [0, 0, 0], offset: [1.3, .3, .7],
        source: 'https://www.nasa.gov/history/sputnik/siddiqi.html',
      },
      seam: {
        no: '04', title: '赤道接缝与紧固件', en: 'EQUATORIAL JOINT',
        text: '两个半球在赤道处以环形法兰对接，一圈紧固件把密封壳体锁在一起。球体表面只有这一条明显的接缝，在探照灯下会闪出一圈细线。',
        value: '24', unit: '颗 · 赤道紧固件',
        anchor: [.3, 0, .05], target: [0, 0, 0], offset: [1.35, .45, 1.15],
        source: 'https://www.nasa.gov/history/sputnik/siddiqi.html',
      },
    },
    specs: [
      { v: '1957', u: '年', l: '10 月 4 日入轨', d: '拜科努尔发射场，卫星号运载火箭' },
      { v: '83.6', u: '千克', l: '卫星质量', d: '其中 51 千克是电源' },
      { v: '58', u: '厘米', l: '球体直径', d: '铝合金两半球壳，内充氮气' },
      { v: '215×939', u: '千米', l: '近地点／远地点', d: '倾角 65.10°，偏心率 0.052' },
      { v: '96.2', u: '分钟', l: '绕地一圈', d: '一天约 15 圈' },
    ],
    fact: '83.6 千克的总质量里有 51 千克是电源：银锌电池撑起三个星期的发射，随后卫星静默地继续绕地球飞行了两个月。',
    readings: [
      {
        no: '01', title: '一枚 83.6 千克的球',
        body: '工程师原本设想的是一个带锥度的复杂外形，最终定下来的却是尽可能简单的球体：可靠、容易密封，也让内部仪器均匀受热。',
        facts: [
          '铝合金两半球壳，直径 58 厘米',
          '内部充氮气，压力 1.3 个大气压',
          '总质量 83.6 千克，其中 51 千克为电源',
          '化学电池支撑约三个星期的发射',
        ],
      },
      {
        no: '02', title: '两种频率，一种节拍',
        body: '两台发射机以不同频率交替发声，任何一台都能独立工作。脉冲长短的变化，也顺带携带了内部温度与压力的遥测信息。',
        facts: [
          '20.005 兆赫，波长 1.5 米',
          '40.002 兆赫，波长 7.5 米',
          '每次脉冲 0.2–0.6 秒',
          '全球业余无线电操作者都能直接收到',
        ],
      },
      {
        no: '03', title: '96 分钟一圈的轨道',
        body: '65.1 度的倾角让卫星的星下点扫过几乎全部有人居住的地带，从莫斯科到墨尔本，抬头都可能看见那颗移动的亮点。',
        facts: [
          '近地点 215 千米，远地点 939 千米',
          '半长轴 6,955.2 千米，偏心率 0.052',
          '轨道倾角 65.10°',
          '周期 96.20 分钟',
        ],
      },
      {
        no: '04', title: '静默之后',
        body: '电池在 1957 年 10 月 26 日耗尽，信号从此中断。卫星又无声地绕行了两个多月，直到 1958 年 1 月 4 日再入大气层。',
        facts: [
          '1957-10-26 电池耗尽，发射机停止工作',
          '1958-01-04 再入大气层，在轨 92 天',
          '1958-02-01 美国探险者 1 号入轨，质量 13.97 千克',
          '此后十余年，法国首颗卫星 42 千克，日本首颗 24 千克',
        ],
      },
    ],
    timeline: {
      tabs: [
        {
          name: '大事件',
          items: [
            { d: '1957.10.04', t: '进入地球轨道', x: '苏联用卫星号运载火箭把第一颗人造地球卫星送入 215 × 939 千米的轨道。' },
            { d: '1957.10.26', t: '电池耗尽', x: '发射机在发出三个星期的脉冲后停止工作，卫星继续绕地球运行。' },
            { d: '1958.01.04', t: '再入大气层', x: '在轨 92 天后，卫星再入大气层烧毁。' },
            { d: '1958.02.01', t: '探险者 1 号', x: '美国把 13.97 千克的探险者 1 号送入轨道，太空竞赛全面展开。' },
          ],
        },
      ],
    },
    sources: [
      { l: '球体、天线、发射机与质量', n: 'NASA History · Siddiqi', url: 'https://www.nasa.gov/history/sputnik/siddiqi.html' },
      { l: '发射、电池耗尽与再入日期', n: 'NASA · 65 Years Ago', url: 'https://www.nasa.gov/history/65-years-ago-sputnik-ushers-in-the-space-age/' },
      { l: '太空时代的开端', n: 'NASA History · Dawn of the Space Age', url: 'https://www.nasa.gov/history/dawn-of-the-space-age/' },
      { l: '轨道参数', n: 'NASA NSSDC · 1957-001B', url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1957-001B' },
    ],
  },

  dongfanghong: {
    id: 'dongfanghong',
    name: '东方红一号',
    en: 'DONG FANG HONG 1',
    tag: '1970 · 中国第一颗人造卫星',
    lede: '一颗 72 面体的银色卫星，在 439 千米的高空循环播放《东方红》，至今仍在轨道上。',
    model: 'models/dongfanghong-1.glb',
    download: { file: 'Dong-Fang-Hong-1.glb', size: '2.57 MB' },
    view: { min: .9, max: 26, exposure: .95, target: [0, .16, 0], position: [3.1, 2.9, 4.8], up: [0.05, 1, 0], fit: 0.6 },
    heroFacts: [
      { v: '1970', u: '年', l: '入轨' },
      { v: '173', u: '千克', l: '卫星质量' },
      { v: '28', u: '天', l: '在轨工作' },
    ],
    modelInfo: {
      tri: '42,008', vert: '69,308', mesh: '118', mat: '6', tex: '0',
      note: '72 块独立蒙皮拼成近球形星体，四根各分四节的短波天线、腰带窗口与顶部天线按结构星尺寸逐件生成。',
      method: '参数化重建',
    },
    parts: {
      shell: {
        no: '01', title: '72 面体星体', en: '72-FACET BODY',
        text: '直径约 1 米的外壳由 72 块蒙皮拼成近球形的多面体，分面结构便于加工与贴装，也让它在阳光下的反光格外明显。',
        value: '72', unit: '块 · 蒙皮拼成的多面体',
        anchor: [.28, .29, .27], target: [0, .05, 0], offset: [1.7, 1.1, 2],
        source: 'https://www.chnmuseum.cn/zp/jzrgs/202203/t20220303_254149.shtml',
      },
      aerials: {
        no: '02', title: '伸缩短波天线', en: 'SHORTWAVE ANTENNAE',
        text: '四根 3 米长的拉杆天线装在赤道腰带上。发射时收拢在星体内，入轨解锁后由卫星自旋转动甩开，把 20.009 兆赫的乐曲送向地面。',
        value: '4 × 3', unit: '米 · 展开后的天线',
        anchor: [1.8, 0, .482], target: [.9, 0, .24], offset: [2.2, 2.8, 3],
        source: 'https://bjb.cas.cn/tbzt2016/dnzt/sd/jdwz/202007/t20200722_5640814.html',
      },
      belt: {
        no: '03', title: '环形腰带与信标窗口', en: 'EQUATORIAL BELT',
        text: '腰带连接上下半球，同时承载天线与微波天线口。环绕腰带的矩形窗口属于雷达信标机与应答机，用来帮助地面测量轨道、跟踪卫星。',
        value: '173', unit: '千克 · 卫星质量',
        anchor: [.125, 0, .467], target: [0, 0, 0], offset: [.45, .35, 1.65],
        source: 'https://www.chnmuseum.cn/zp/jzrgs/202203/t20220303_254149.shtml',
      },
      mast: {
        no: '04', title: '顶部超短波天线', en: 'TOP ANTENNA',
        text: '星体顶端立着一根 40 厘米长的超短波天线，与腰带上的短波天线共同组成发射与测控链路。',
        value: '40', unit: '厘米 · 顶部天线',
        anchor: [0, .85, 0], target: [0, .5, 0], offset: [1.4, .6, 1.5],
        source: 'https://www.chnmuseum.cn/zp/jzrgs/202203/t20220303_254149.shtml',
      },
    },
    specs: [
      { v: '1970', u: '年', l: '4 月 24 日入轨', d: '长征一号运载火箭，酒泉卫星发射中心' },
      { v: '173', u: '千克', l: '卫星质量', d: '当时五国首颗卫星中最重的一颗' },
      { v: '1', u: '米', l: '星体直径', d: '近球形 72 面体' },
      { v: '439×2384', u: '千米', l: '近地点／远地点', d: '倾角 68.44°，周期 114 分钟' },
      { v: '20.009', u: 'MHz', l: '乐曲播发频率', d: '循环播送《东方红》开头旋律' },
    ],
    fact: '173 千克，比此前四个国家的首颗卫星都重：斯普特尼克 1 号 83.6 千克，探险者 1 号 13.97 千克，法国首颗 42 千克，日本首颗 24 千克。',
    readings: [
      {
        no: '01', title: '72 面体的构成',
        body: '外壳由上半球壳、下半球壳与环形腰带三部分组成。分面蒙皮与内部骨架共同承力，银灰色的铝铜合金表面在照片里呈现出深浅不一的块面。',
        facts: [
          '直径约 1 米，近球形 72 面体',
          '12 条经线、6 条纬带，模型分 72 块蒙皮',
          '赤道腰带高约 112 毫米，连接上下半球',
          '质量 173 千克',
        ],
      },
      {
        no: '02', title: '20.009 兆赫的《东方红》',
        body: '卫星上的乐音装置循环播放《东方红》的开头旋律，通过 20.009 兆赫的短波信号发向地面。地面站接收、解码后，乐曲与遥测参数一起被转发出去。',
        facts: [
          '播发频率 20.009 兆赫',
          '曲目为《东方红》开头段落',
          '同一链路承担遥测与跟踪信号',
          '地面接收后向全世界播送',
        ],
      },
      {
        no: '03', title: '一条不会掉下来的轨道',
        body: '最初设想的是 300 多千米的圆轨道，受当时火箭能力限制，最终定成近地点 439 千米、远地点 2384 千米的椭圆轨道。高近地点让大气阻力很小，卫星因此能在轨半个多世纪。',
        facts: [
          '近地点 439 千米，远地点 2384 千米',
          '倾角 68.44°，周期 114 分钟',
          '2009 年 2 月观测：430 × 2075 千米',
          '至今仍在轨道上飞行',
        ],
      },
      {
        no: '04', title: '四根会展开的天线',
        body: '四根 3 米长的短波天线在发射时贴着星体收拢，入轨后解锁，靠卫星自旋的离心力逐节甩直。星体顶端另有一根 40 厘米的超短波天线。',
        facts: [
          '四根短波天线，每根 3 米',
          '每根分四节，靠自旋展开',
          '顶部超短波天线长 40 厘米',
          '腰带上的矩形窗口是信标与应答机天线口',
        ],
      },
      {
        no: '05', title: '28 天',
        body: '设计寿命 20 天的化学电池，实际支撑了 28 天的工作。1970 年 5 月 14 日，信号中断，卫星从此沉默地继续绕行。',
        facts: [
          '1970-04-24 发射入轨',
          '实际工作 28 天',
          '1970-05-14 与地面失去联系',
          '此后的观测依靠光学与雷达跟踪',
        ],
      },
    ],
    timeline: {
      tabs: [
        {
          name: '大事件',
          items: [
            { d: '1968.02.20', t: '中国空间技术研究院成立', x: '卫星研制的力量集中到一处，东方红一号的工程节奏由此加快。' },
            { d: '1970.04.24', t: '长征一号点火', x: '从酒泉升空，把 173 千克的卫星送入 439 × 2384 千米的轨道。' },
            { d: '1970.04.24', t: '《东方红》响起', x: '20.009 兆赫的乐曲被地面站接收，中国成为第五个独立发射卫星的国家。' },
            { d: '1970.05.14', t: '信号中断', x: '工作 28 天后电池耗尽，卫星进入静默飞行。' },
            { d: '2009.02', t: '仍在轨', x: '观测显示它运行在 430 × 2075 千米的轨道上，半个世纪未曾坠落。' },
          ],
        },
      ],
    },
    sources: [
      { l: '质量、外形、轨道与工作寿命', n: '中国空间技术研究院', url: 'https://www.cast.cn/news/3721' },
      { l: '第一颗人造地球卫星与 20.009 兆赫', n: '国家航天局', url: 'https://www.sastind.gov.cn/history/n152/n6760142/n6760146/n6760162/c6807616/content.html' },
      { l: '结构星馆藏与工程尺寸', n: '中国国家博物馆', url: 'https://www.chnmuseum.cn/zp/jzrgs/202203/t20220303_254149.shtml' },
      { l: '戚发轫谈东方红一号研制', n: '中国科学院院刊', url: 'https://bjb.cas.cn/tbzt2016/dnzt/sd/jdwz/202007/t20200722_5640814.html' },
      { l: '永远的东方红 · 官方云展览', n: '中国国家博物馆', url: 'https://www.chnmuseum.cn/zhanhuirk/dfhzl/' },
    ],
  },
};

craft.cassini = {
  id: 'cassini',
  name: '卡西尼号',
  en: 'CASSINI–HUYGENS',
  tag: '1997 · 土星环绕器 · 惠更斯探测器',
  lede: '带着惠更斯走进土星的世界，在那里停留十三年，最后把自己送进土星的大气。',
  model: 'models/cassini.glb',
  download: { file: 'NASA-Cassini.glb', size: '5.85 MB' },
  view: { min: 2, max: 70, exposure: 1.2, target: [0, 0, -2], position: [13, 9, -19], up: [0, 1, 0], fit: 1 },
  heroFacts: [
    { v: '1997', u: '年', l: '启程' },
    { v: '13', u: '年', l: '环绕土星' },
    { v: '4', u: '米', l: '高增益天线' },
  ],
  modelInfo: {
    tri: '26,020', vert: '30,788', mesh: '15', mat: '10', tex: '7',
    note: 'NASA / VTAD 官方 GLB，包含侧挂的惠更斯探测器与展开的伸展臂，内嵌七张贴图。保留原始几何、材质与纹理；镜头与光照为网页展示设计，不代表特定时刻的飞行姿态。',
    method: '官方三维资产',
  },
  parts: {
    antenna: {
      no: '01', title: '高增益天线', en: 'HIGH-GAIN ANTENNA',
      text: '直径 4 米的天线承担与地球的主通信链路，也参与雷达与无线电科学观测。飞往土星的早期，它曾朝向太阳，为后面的仪器遮挡强烈日照。',
      value: '4', unit: '米 · 天线口径',
      anchor: [0, 2.25, -.1], target: [0, 1.9, 0], offset: [6, 7, -7],
      source: 'https://www.esa.int/Science_Exploration/Space_Science/Cassini-Huygens/Cassini_spacecraft',
    },
    huygens: {
      no: '02', title: '惠更斯探测器', en: 'HUYGENS PROBE',
      text: '侧挂的金色圆盘是一艘独立的着陆探测器。2004 年底与卡西尼分离后，它于 2005 年 1 月 14 日穿过土卫六的大气，把地表的第一批近照交给仍在空中的卡西尼转传地球。',
      value: '2005', unit: '年 · 着陆土卫六',
      anchor: [1.8, -1.2, 0], target: [1.35, -1.1, 0], offset: [6, 1.6, -2.4],
      source: 'https://www.esa.int/Science_Exploration/Space_Science/Cassini-Huygens/Europe_reaches_new_frontier_Huygens_lands_on_Titan',
    },
    rtg: {
      no: '03', title: '三台同位素电源', en: 'RADIOISOTOPE POWER',
      text: '三台放射性同位素热电机安装在机身下部，把放射性衰变的热转换成电。在远离太阳的土星，它们持续为仪器、计算机和通信设备供能。',
      value: '3', unit: '台 · RTG 电源',
      anchor: [-1.6, -2.9, -.85], target: [-.5, -2.4, 0], offset: [-6, -2, -6],
      source: 'https://www.esa.int/Science_Exploration/Space_Science/Cassini-Huygens/Cassini_spacecraft',
    },
    magnetometer: {
      no: '04', title: '磁强计伸展臂', en: 'MAGNETOMETER BOOM',
      text: '11 米长的非金属伸展臂把磁强计送离本体，减小飞船自身磁场的干扰。沿着这条长臂，仪器测量土星磁场的强度与方向。',
      value: '11', unit: '米 · 磁强计伸展臂',
      anchor: [0, 1.25, -10.85], target: [0, 1.25, -5.5], offset: [7, 5, -9],
      source: 'https://science.nasa.gov/mission/cassini/spacecraft/cassini-orbiter/magnetometer/',
    },
    bus: {
      no: '05', title: '环绕器本体', en: 'CASSINI ORBITER',
      text: '天线下方的多层隔热材料包裹着电子设备与推进系统。卡西尼采用三轴稳定，环绕器携带 12 台科学仪器，在同一艘飞船上结合成像、光谱与原位测量。',
      value: '12', unit: '台 · 环绕器科学仪器',
      anchor: [-.8, .1, -1.2], target: [0, -.5, 0], offset: [-5, 2, -6],
      source: 'https://science.nasa.gov/mission/cassini/spacecraft/cassini-orbiter/',
    },
  },
  specs: [
    { v: '1997', u: '年', l: '10 月 15 日启程', d: '泰坦 IVB／半人马座火箭，从卡纳维拉尔角发射' },
    { v: '5,712', u: '千克', l: '发射总质量', d: '含推进剂、惠更斯探测器与适配器等' },
    { v: '4', u: '米', l: '高增益天线', d: '通信、雷达与无线电科学共用' },
    { v: '11', u: '米', l: '磁强计伸展臂', d: '非金属长臂，远离本体磁场' },
    { v: '12 + 6', u: '台', l: '科学仪器', d: '卡西尼环绕器 12 台，惠更斯探测器 6 台' },
  ],
  fact: '2017 年 9 月 15 日，卡西尼主动进入土星大气，避免日后失控撞上土卫二或土卫六，把可能适宜生命的环境留给未来的探索。',
  readings: [
    {
      no: '01', title: '借四次引力，走到土星',
      body: '这艘沉重的飞船没有直奔土星，而是两次借力金星，再回到地球附近，最后掠过木星。近七年的旅程，把一艘环绕器与一艘着陆探测器一起送进土星系统。',
      facts: ['1997-10-15 发射', '1998、1999 年两次飞掠金星', '1999 年飞掠地球，2000 年飞掠木星', '2004-07-01 进入土星轨道（UTC）'],
    },
    {
      no: '02', title: '一艘飞船，两个目的地',
      body: '卡西尼留在轨道，惠更斯降向土卫六。侧面那枚圆盘一路沉默地同行，直到分离后才走向自己的终点：穿过厚厚的雾霾，在降落伞下测量大气，并拍下冰冷的地表。',
      facts: ['NASA、ESA 与意大利航天局共同实施任务', '惠更斯携带 6 套科学仪器', '2005-01-14 成功着陆土卫六', '首次在外太阳系天体表面成功着陆'],
    },
    {
      no: '03', title: '把仪器送到远处',
      body: '有些观测需要贴近飞船，有些观测却必须离它足够远。磁强计装在细长的非金属臂上，避开机载电路的磁场；三台 RTG 留在机身下部，持续供给探索所需的电。',
      facts: ['磁强计伸展臂长 11 米', '三台放射性同位素热电机', '环绕器采用三轴稳定', '12 台仪器共同研究土星、环与卫星'],
    },
    {
      no: '04', title: '最后二十二次穿越',
      body: '任务末期，卡西尼进入土星与最内侧光环之间的空隙，完成 22 次近距离穿越。推进剂将尽时，团队选择让它在仍可控制的状态下进入土星大气，结束二十年的旅程。',
      facts: ['2004—2017 年环绕土星', '2017 年展开 Grand Finale 最终任务', '22 次穿越土星与光环之间的空隙', '2017-09-15 进入土星大气，任务结束'],
    },
  ],
  timeline: {
    tabs: [{ name: '卡西尼—惠更斯', items: [
      { d: '1997.10.15', t: '带着惠更斯启程', x: '从卡纳维拉尔角发射，开始飞往土星的行星际旅程。' },
      { d: '2000.12.30', t: '借力木星', x: '完成旅途中的最后一次行星引力助推，继续前往土星。' },
      { d: '2004.07.01', t: '进入土星轨道', x: '成为首艘环绕土星的人造探测器；日期采用 UTC。' },
      { d: '2005.01.14', t: '惠更斯着陆土卫六', x: '穿过土卫六大气，传回地表图像与原位测量数据。' },
      { d: '2017.04.26', t: '首次穿越内侧空隙', x: '开始 22 次穿越土星与光环之间空隙的最终任务。' },
      { d: '2017.09.15', t: '进入土星大气', x: '主动结束任务，保护可能具有宜居环境的卫星。' },
    ] }],
  },
  sources: [
    { l: '官方三维模型与署名', n: 'NASA / VTAD · Cassini 3D Model', url: 'https://science.nasa.gov/resource/cassini-3d-model/' },
    { l: '发射、质量与任务数据', n: 'NASA · Quick Facts', url: 'https://science.nasa.gov/mission/cassini/quick-facts/' },
    { l: '环绕器与科学仪器', n: 'NASA · Cassini Orbiter', url: 'https://science.nasa.gov/mission/cassini/spacecraft/cassini-orbiter/' },
    { l: '天线、三台 RTG 与结构', n: 'ESA · Cassini spacecraft', url: 'https://www.esa.int/Science_Exploration/Space_Science/Cassini-Huygens/Cassini_spacecraft' },
    { l: '11 米磁强计伸展臂', n: 'NASA · Magnetometer (MAG)', url: 'https://science.nasa.gov/mission/cassini/spacecraft/cassini-orbiter/magnetometer/' },
    { l: '惠更斯着陆土卫六', n: 'ESA · Huygens lands on Titan', url: 'https://www.esa.int/Science_Exploration/Space_Science/Cassini-Huygens/Europe_reaches_new_frontier_Huygens_lands_on_Titan' },
    { l: '引力助推与任务历史', n: 'ESA · Cassini-Huygens overview', url: 'https://www.esa.int/Science_Exploration/Space_Science/Cassini-Huygens_overview' },
    { l: '最终任务与行星保护', n: 'NASA · Grand Finale', url: 'https://science.nasa.gov/mission/cassini/grand-finale/overview/' },
  ],
};

craft.soyuz = {
  id: 'soyuz', name: '联盟号', en: 'SOYUZ TMA',
  tag: '2002 · TMA 系列 · 国际空间站的来回航程',
  lede: '深色隔热毯裹住两个乘员舱，白色散热器围住推进舱。三段式飞船把生活、返回与推进分开，只让中间的一舱回到地面。',
  model: 'models/soyuz.glb',
  download: { file: 'Soyuz-TMA.glb', size: '16.90 MB' },
  view: { min: 1.2, max: 40, exposure: 1, target: [0, 0, 0], position: [7, 4, 15], up: [0, 1, 0], fit: 1 },
  heroFacts: [
    { v: '2002', u: '年', l: 'TMA 首飞' },
    { v: '3', u: '人', l: '乘员容量' },
    { v: '3', u: '舱', l: '各负其责' },
  ],
  modelInfo: {
    tri: '373,168', vert: '327,429', mesh: '19', mat: '18', tex: '4',
    note: '本站自行制作的 TMA 外观重建：独立建出隔热毯褶皱、包边与缝线、舷窗座圈、探杆式对接机构、Kurs 天线、散热管路及分片电池翼，内嵌原创颜色、法线、粗糙度和电池片贴图。结构参考 NASA / ESA 资料，视觉细节参考 Chris Kuhn 的作品预览；小型附件与布料形态为近似复原。',
    method: '自主建模 · PBR',
  },
  parts: {
    orbital: {
      no: '01', title: '轨道舱', en: 'ORBITAL MODULE',
      text: '前部近球形舱段提供在轨活动空间，前端装着对接机构和交会天线。深色隔热毯之外，舷窗、出入舱口、线束与支架仍各自露出；通向空间站的通道也经过这里。',
      value: '6.5', unit: '立方米 · 轨道舱容积',
      anchor: [.13, 2.18, 1.21], target: [0, 2.1, 0], offset: [2.5, 1.3, 4],
      source: 'https://www.nasa.gov/wp-content/uploads/2024/04/exp11-presskit.pdf',
    },
    descent: {
      no: '02', title: '返回舱', en: 'DESCENT MODULE',
      text: '中间的钟形舱段容纳发射和返回时的乘组，是三个舱段中唯一着陆的部分。隔热毯之下是承受再入的舱体，舱内还装有降落伞、生命保障设备与定制座椅衬垫。',
      value: '3', unit: '人 · 可搭载乘员',
      anchor: [.2, .03, 1.08], target: [0, .05, 0], offset: [2.8, 1.1, 4.2],
      source: 'https://www.nasa.gov/wp-content/uploads/2024/04/exp11-presskit.pdf',
    },
    service: {
      no: '03', title: '仪器与推进舱', en: 'INSTRUMENT / PROPULSION MODULE',
      text: '后部装着航电、推进剂与发动机，承担在轨机动和离轨制动。白色外壁是热控散热器；太阳能翼接在两侧，主发动机喷管和姿态控制喷口位于后端。',
      value: '8', unit: '平方米 · NASA 资料中的散热面积',
      anchor: [.7, -2.2, 1.2], target: [0, -2.25, 0], offset: [3, -2.2, 4.5],
      source: 'https://www.nasa.gov/wp-content/uploads/2024/04/exp11-presskit.pdf',
    },
    solar: {
      no: '04', title: '太阳能电池翼', en: 'SOLAR ARRAYS',
      text: '展开的两翼与蓄电池共同供电。模型把每一翼分为三段，分别制作硅电池片、银色汇流线、铰链与背面支撑；绕到背后，可以看到与正面不同的基板和加强杆。',
      value: '10.6', unit: '米 · 系列展开翼展参考值',
      anchor: [3.55, -1.89, .04], target: [3.55, -1.89, 0], offset: [.3, 2.3, 5],
      source: 'https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/The_Russian_Soyuz_spacecraft',
    },
    docking: {
      no: '05', title: '探杆式对接机构', en: 'PROBE-AND-DROGUE DOCKING UNIT',
      text: '前端探杆先帮助两艘航天器建立初始连接，再收拢到对接环完成连接。这里重建了探杆、缓冲套、环形接口、锁块和紧固件；旁边的 Kurs 天线用于自动交会。',
      value: 'Kurs', unit: '交会测量与自动对接',
      anchor: [0, 3.70, 0], target: [0, 3.15, 0], offset: [1.9, 2.1, 2.7],
      source: 'https://www.nasa.gov/wp-content/uploads/2024/04/exp11-presskit.pdf',
    },
  },
  specs: [
    { v: '2002', u: '年', l: 'TMA 系列首次飞行', d: '10 月 30 日，联盟 TMA-1 发射' },
    { v: '约 7', u: '吨', l: '飞船质量参考', d: 'ESA 的联盟系列概览，具体任务质量有差异' },
    { v: '约 7.2', u: '米', l: '飞船长度参考', d: '系列外形尺度，不作为模型测量精度' },
    { v: '10.6', u: '米', l: '太阳能翼展开参考', d: '采用 ESA 概览给出的系列尺寸' },
    { v: '3', u: '人', l: '乘员容量', d: 'TMA 改善了不同身材乘员的适应范围' },
  ],
  fact: '联盟飞船抵达空间站后，还要留下来充当返回工具。2002 年首飞的 TMA-1 把一组乘员送上去，约半年后又把另一组乘员带回地球。',
  readings: [
    {
      no: '01', title: '三个舱，只回来一个',
      body: '三段式结构把在轨空间与返回的重量分开：轨道舱用于在轨活动，返回舱容纳乘组，仪器与推进舱负责飞船运行和机动。完成离轨制动后，两端舱段分离，只有中间的返回舱进入着陆流程。',
      facts: ['轨道舱在前', '返回舱居中', '仪器与推进舱在后', '只有返回舱着陆'],
    },
    {
      no: '02', title: '隔热毯并不光滑',
      body: '实物外层是贴合舱体包扎的隔热材料，接缝、包边和固定点会改变表面起伏。模型用几何表达较大的折皱与缝线，再用法线和粗糙度贴图补充织物细纹，让它与周围的玻璃和金属有不同的反光。',
      facts: ['几何褶皱保留轮廓起伏', '包边和针脚独立建模', '法线贴图补充细纹', '材质随部件功能区分'],
    },
    {
      no: '03', title: 'TMA 的 A，关乎坐进飞船的人',
      body: 'TMA 在 TM 的基础上改进座舱与着陆系统，扩大了可搭载乘员的身材范围。它也引入改进的显示设备。外形依然能一眼认出联盟家族，但不能把它与 1975 年采用 APAS-75 的联盟 19 号混成同一个型号。',
      facts: ['2002 年首次飞行', '为国际空间站运送与接回乘组', '扩大乘员身材适应范围', '页面模型采用 TMA 家族外观'],
    },
    {
      no: '04', title: '停靠在轨道上的救生艇',
      body: '一次飞行不总由同一组人完成。TMA-1 的首发乘员乘较早抵达的 TM-34 返回，新飞船留在空间站作为返回工具，最后把远征六号乘组带回地球。飞船轮换也让驻站乘组始终有可用的返航座舱。',
      facts: ['TMA-1 于 2002-10-30 发射', '首发乘组改乘 TM-34 返回', 'TMA-1 留在空间站约半年', '2003-05-04 携远征六号乘组着陆'],
    },
  ],
  timeline: { tabs: [{ name: 'TMA-1 · 首次飞行', items: [
    { d: '2002.10.30', t: 'TMA 首飞', x: '三位乘员从拜科努尔出发，开始这一改进型号的首次任务。' },
    { d: '2002.11', t: '轮换返回飞船', x: 'TMA-1 抵达后留在空间站，首发乘组乘 TM-34 回到地球。' },
    { d: '2002—2003', t: '作为驻站返回工具', x: '新飞船留轨约半年，为空间站乘组提供返航座舱。' },
    { d: '2003.05.04', t: '首次返回与着陆', x: 'TMA-1 携远征六号乘组以弹道模式返回，乘员安全着陆。' },
  ] }] },
  sources: [
    { l: 'TMA 舱段、热控与系统改进', n: 'NASA · Expedition 11 Press Kit · pp. 20–23', url: 'https://www.nasa.gov/wp-content/uploads/2024/04/exp11-presskit.pdf' },
    { l: '系列外形尺度与型号沿革', n: 'ESA · The Russian Soyuz spacecraft', url: 'https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/The_Russian_Soyuz_spacecraft' },
    { l: 'TMA-1 乘组、首飞与返回', n: 'ESA · Odissea', url: 'https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Odissea' },
    { l: 'TMA 首次返回与后续改进', n: 'ESA · New Soyuz TMA spacecraft cleared for next mission', url: 'https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Cervantes_Mission/New_Soyuz_TMA_spacecraft_cleared_for_next_mission_with_ESA_astronaut' },
    { l: '建模视觉参考', n: 'Chris Kuhn · Soyuz TMA · 仅参考作品预览', url: 'https://chriskuhn.artstation.com/projects/3Ko5D' },
  ],
};

// 航天器的横向对照，按发射质量排序
export const compare = [
  { id: 'sputnik', name: '斯普特尼克 1 号', year: '1957', mass: 83.6, massText: '83.6 kg', size: '球体 58 cm' },
  { id: 'dongfanghong', name: '东方红一号', year: '1970', mass: 173, massText: '173 kg', size: '多面体 1 m' },
  { id: 'voyager', name: '旅行者号', year: '1977', mass: 815, massText: '815 kg', size: '天线 3.7 m' },
  { id: 'cassini', name: '卡西尼号', year: '1997', mass: 5712, massText: '5,712 kg', size: '天线 4 m' },
  { id: 'soyuz', name: '联盟 TMA', year: '2002', mass: 7000, massText: '约 7,000 kg', size: '总长约 7.2 m' },
];

// B 站：炙弹冰的航天史填词视频，数据截至 2026-10-24
export const videos = [
  {
    bvid: 'BV12N4y1f7QT',
    title: '百分之一的长旅',
    sub: '茫茫星海中，旅行者一号与人类文明',
    craft: 'voyager',
    craftName: '旅行者号',
    date: '2023-10-06',
    duration: '05:07',
    play: '107.3 万',
    like: '3.7 万',
    danmaku: '2,425',
    original: '原作 sm33292157',
    line: '在日球层顶，期盼着再与你重逢时的话语',
  },
  {
    bvid: 'BV129mGY3Efe',
    title: '东方红的心脏',
    sub: '乐正绫 × 洛天依',
    craft: 'dongfanghong',
    craftName: '东方红一号',
    date: '2024-10-14',
    duration: '05:31',
    play: '85.4 万',
    like: '2.9 万',
    danmaku: '2,790',
    original: '原作 UKZt1vq8bKI',
    line: '蜉蝣一般的人生，要如何度过？',
  },
  {
    bvid: 'BV189cyeBEzm',
    title: '卡西尼回旋于夜空',
    sub: '土星与卡西尼号的告别',
    craft: 'cassini',
    craftName: '卡西尼号',
    date: '2025-01-13',
    duration: '02:56',
    play: '101.6 万',
    like: '3.5 万',
    danmaku: '3,247',
    original: '原作 CLywtSOj4NA',
    line: '晚安，卡西尼',
  },
  {
    bvid: 'BV1SPgbzzE3e',
    title: '科罗廖夫十字绽开，卡门线上化作花束',
    sub: '从 R-7 到斯普特尼克',
    craft: 'sputnik',
    craftName: '斯普特尼克 1 号',
    date: '2025-07-20',
    duration: '02:32',
    play: '189.5 万',
    like: '9.2 万',
    danmaku: '8,014',
    original: '原作 7xht3kQO_TM',
    line: '只是向你分享我的心跳',
  },
];

// 网易云音乐：炙弹冰署名的填词歌曲
export const songs = [
  {
    id: '2129652434',
    title: '百分之一的长旅',
    artists: '炙弹冰 / 星辰不唏嘘 / 洛天依',
    album: '1/100のアイ-すりぃ',
    duration: '05:06',
    craft: 'voyager',
    craftName: '旅行者号',
  },
  {
    id: '2699124989',
    title: '卡西尼回旋于夜空',
    artists: '炙弹冰 / 星辰不唏嘘 / 洛天依',
    album: '回る空うさぎ',
    duration: '02:55',
    craft: 'cassini',
    craftName: '卡西尼号',
  },
];

export const up = {
  name: '炙弹冰',
  uid: '69855702',
  space: 'https://space.bilibili.com/69855702/',
};
