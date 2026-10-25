const model = 'https://science.nasa.gov/3d-resources/international-space-station-iss-d-igoal/';
const facts = 'https://www.nasa.gov/international-space-station/space-station-facts-and-figures/';
const elements = 'https://www.nasa.gov/international-space-station/international-space-station-assembly-elements/';
const cupola = 'https://www.nasa.gov/international-space-station/cupola/';
const robotics = 'https://www.csa-asc.gc.ca/eng/iss/canadarm2/canadarm-canadarm2-canadarm3-comparative-table.asp';

export const issCraft = {
  id: 'iss', name: '国际空间站', en: 'ISS · INTERNATIONAL SPACE STATION',
  tag: '1998 · 在轨组装 · 近地轨道实验室',
  lede: '巨大的太阳能翼围着桁架展开，实验舱和生活舱沿另一条轴线连接。这座在轨道上逐件建成的实验室，让人类在太空长期生活、工作与研究。',
  model: 'models/iss.glb', download: { file: 'NASA-ISS-IGOAL.glb', size: '64.85 MB' }, lazy: true,
  view: { min: .3, max: 60, exposure: .85, target: [0, -.4, 0], position: [12, 14, 15], up: [0, 1, 0], fit: .95, scale: .1, boundsOnly: true, occlusion: false },
  heroFacts: [
    { v: '1998', u: '年', l: '首个舱段入轨' },
    { v: '109', u: '米', l: '翼端跨度参考' },
    { v: '2000', u: '年', l: '开始持续驻人' },
  ],
  modelInfo: {
    tri: '2,975,912', vert: '6,415,155', mesh: '45', mat: '45', tex: '114', method: 'NASA / JSC · IGOAL',
    note: 'NASA 约翰逊航天中心 IGOAL 官方模型，原始 GLB 完整保留约 298 万个三角面、114 张内嵌贴图，以及颜色、法线和金属度／粗糙度材质。展台将太阳能翼、桁架与外部设备的三种镂空材质改为透明裁切，修正半透明混合导致的遮挡错乱，下载仍为官方原始文件。模型包含 iROSA、散热器、各国实验舱与外部载荷，保持官方发布的静态装配构型；参数为 NASA 整站参考值，不代表实时在轨状态。一个 glTF 网格含 45 个绘制分组，使用 44 种显式材质与一种默认材质。',
  },
  parts: {
    solar: {
      no: '01', title: '太阳能翼与 iROSA', en: 'SOLAR ARRAYS',
      text: '大面积太阳能翼把阳光变成电力，电池储能则支持进入地影后的运行。较小的卷展式 iROSA 安装在原有太阳能翼前方，帮助补充供电；模型保留电池纹理、支撑杆和翼面分区。',
      value: '8', unit: '组 · 原有主太阳能翼，另有 iROSA',
      anchor: [1.8, .2, 4.4], target: [0, .15, 4.2], offset: [4, 3.5, 4], source: facts,
    },
    truss: {
      no: '02', title: '贯穿全站的桁架', en: 'INTEGRATED TRUSS STRUCTURE',
      text: '横向桁架把供电、热控和外部载荷连成一体。开放的三角支撑承载大型设备，沿线还布置管路、线缆与移动机构，让宇航员和机械臂能够维护远离舱体的部位。',
      value: '94', unit: '米 · NASA 桁架长度参考',
      anchor: [0, .12, 1.9], target: [0, .05, 1.9], offset: [2.6, 2.2, 2.7], source: elements,
    },
    thermal: {
      no: '03', title: '展开式散热器', en: 'THERMAL CONTROL RADIATORS',
      text: '舱内设备持续发热，真空中却没有空气带走热量。外部热控回路把热量送到白色散热板，再通过辐射排向太空；这些板面与深色的发电翼承担不同任务。',
      value: '辐射', unit: '把设备的废热排向太空',
      anchor: [-1.2, .02, 1.5], target: [-1.2, 0, 1.5], offset: [-2, 2.3, 2.3], source: elements,
    },
    labs: {
      no: '04', title: '命运号与哥伦布实验舱', en: 'DESTINY & COLUMBUS LABORATORIES',
      text: '命运号位于美国舱段主轴，欧洲哥伦布实验舱连接在和谐号的一侧。加压壳体里布置实验机柜与生命保障设备；舱外则能看到隔热毯、端盖、扶手和外部实验平台。',
      value: '美 / 欧', unit: '通过连接舱组成共同的研究空间',
      anchor: [.4, -.28, .07], target: [.55, -.48, .1], offset: [2.3, 1.1, 2.6], source: elements,
    },
    kibo: {
      no: '05', title: '希望号日本实验舱', en: 'KIBO · JAPANESE EXPERIMENT MODULE',
      text: '希望号把加压实验空间、储物舱和暴露在太空中的实验平台组合在一起。外部平台不需要把每项实验都关进舱内，可以直接研究真空、辐射及地球环境。',
      value: '舱内 / 舱外', unit: '同一实验系统的两种研究环境',
      anchor: [1.08, -.37, -1.28], target: [1.1, -.5, -1.15], offset: [2.4, 1.5, -2.8], source: elements,
    },
    russian: {
      no: '06', title: '曙光号与星辰号舱段', en: 'ZARYA & ZVEZDA',
      text: '1998 年升空的曙光号是空间站的第一个舱段，星辰号随后提供重要的居住与服务能力。模型中的俄罗斯舱段沿主轴后部延伸，周围连接其他舱室、对接口与小型太阳能翼。',
      value: '1998', unit: '年 · 曙光号开启在轨组装',
      anchor: [-2.65, -.35, .1], target: [-2.65, -.5, 0], offset: [-2.6, 1.8, 2.5], source: elements,
    },
    cupola: {
      no: '07', title: '穹顶舱的七扇窗', en: 'CUPOLA OBSERVATION MODULE',
      text: '穹顶舱从宁静号朝向地球的一侧伸出，六扇侧窗和一扇顶窗提供宽阔视野。乘员在这里观察地球、监视外部活动，也能利用机器人工作站辅助操作机械臂。',
      value: '7', unit: '扇 · 观察窗',
      anchor: [-.45, -.87, -.67], target: [-.45, -.8, -.67], offset: [1, -1.5, -1.8], source: cupola,
    },
    robotics: {
      no: '08', title: '加拿大臂与外部作业', en: 'CANADARM2 & EXTERNAL OPERATIONS',
      text: '加拿大臂 2 通过多个关节搬运载荷、支持舱外作业，并能借助不同基座改变工作位置。它与桁架上的移动系统协作，让大型部件的安装与维护不必完全依靠宇航员手工完成。',
      value: '17', unit: '米 · 加拿大臂 2 伸展长度',
      anchor: [.125, .25, 1.12], target: [.12, .23, 1.05], offset: [2.2, 1.8, 2.3], source: robotics,
    },
  },
  specs: [
    { v: '1998', u: '年', l: '11 月 20 日开始组装', d: '曙光号发射；整站由多次任务逐步建成' },
    { v: '419,725', u: '千克', l: '在轨质量参考', d: 'NASA 常用整站口径，随构型与来访飞船变化' },
    { v: '109', u: '米', l: '翼端到翼端跨度', d: '太阳能翼端之间的整站尺度参考' },
    { v: '1,005', u: '立方米', l: '加压空间体积', d: '包括设备和储物空间；不等于可居住体积' },
    { v: '2000', u: '年', l: '11 月 2 日开始持续驻人', d: '远征 1 乘组抵达，开启长期有人运行' },
  ],
  fact: '这座空间站没有一次性升空。太阳能翼、舱体、桁架和机械臂通过多年发射与舱外作业连接起来；模型里的每一次转折，都是一次装配与协作的结果。',
  readings: [
    { no: '01', title: '先在地面造好，再在轨道拼起来', body: '整站的尺度超出单次发射的能力。不同任务把独立舱段、桁架和设备送入轨道，再通过交会、机械臂操作和舱外活动组合成可以共同工作的系统。', facts: ['1998 年首个舱段发射', '曙光号与团结号首先连接', '舱段沿主轴逐步增加', '横向桁架承载供电与热控设备'] },
    { no: '02', title: '翼面负责发电，白板负责散热', body: '深色太阳能电池和白色散热板都占据很大面积，但能量流向相反。电池把太阳能送进设备；热控系统再把设备不用的热量送往散热器，通过辐射排出去。', facts: ['原有八组主太阳能翼', 'iROSA 补充供电能力', '进入地影后依赖储能', '散热器借助辐射排热'] },
    { no: '03', title: '实验室不止在舱内', body: '加压舱让乘员可以直接操作实验机柜。外部平台则让仪器和材料面对真实的太空环境；日本希望号、欧洲哥伦布舱和桁架载荷共同扩展了研究空间。', facts: ['命运号：美国实验舱', '哥伦布：欧洲实验舱', '希望号：日本实验系统', '桁架与平台支持舱外载荷'] },
    { no: '04', title: '有人居住的复杂机器', body: '长期驻留需要供电、温控、通信、生命保障和运输体系同时工作。对接飞船带来人员与补给；机械臂、扶手、气闸与观察窗则支持不断发生的检查、维护和实验。', facts: ['2000 年开始持续驻人', '来访飞船改变整站质量', '机械臂支持外部作业', '本页展示官方静态模型，非实时构型'] },
  ],
  timeline: { tabs: [{ name: '建造与驻留', items: [
    { d: '1998.11.20', t: '曙光号升空', x: '首个空间站舱段进入轨道，长期装配工程由此开始。' },
    { d: '1998.12.06', t: '团结号连接曙光号', x: 'STS-88 乘组完成最初两个舱段的在轨连接。' },
    { d: '2000.11.02', t: '第一批长期乘员抵达', x: '远征 1 乘组进入空间站，持续驻人运行开始。' },
    { d: '2001', t: '实验与机器人能力扩展', x: '命运号实验舱与加拿大臂 2 陆续加入。' },
    { d: '2008', t: '欧洲与日本实验舱加入', x: '哥伦布舱和希望号的主要组成部分陆续送达。' },
    { d: '2010', t: '宁静号与穹顶舱加入', x: '生活保障设备与宽阔的对地观察视野得到扩展。' },
  ] }] },
  sources: [
    { l: '官方高细节模型与原作者', n: 'NASA / JSC · Integrated Graphics, Operations, and Analysis Laboratory', url: model },
    { l: '整站参考质量、尺度与体积', n: 'NASA · International Space Station Facts and Figures', url: facts },
    { l: '桁架、实验舱、热控与组装部件', n: 'NASA · International Space Station Assembly Elements', url: elements },
    { l: '最初两个舱段的发射与连接', n: 'NASA · Unity Module', url: 'https://www.nasa.gov/international-space-station/unity-module/' },
    { l: '第一批长期乘员抵达', n: 'ESA · Happy birthday, Space Station', url: 'https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/International_Space_Station/Happy_birthday_Space_Station' },
    { l: '穹顶舱、观察窗与机器人工作站', n: 'NASA · Cupola', url: cupola },
    { l: '加拿大臂 2 的尺寸和关节', n: 'Canadian Space Agency · Robotic arms comparative table', url: robotics },
    { l: 'NASA 模型使用指引', n: 'NASA · Images and Media Usage Guidelines', url: 'https://www.nasa.gov/nasa-brand-center/images-and-media/' },
  ],
};
