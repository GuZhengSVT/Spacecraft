const mission = 'https://www.nasa.gov/history/apollo-11-mission-overview/';
const csmRecord = 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059A';
const lmRecord = 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C';
const drawings = 'https://www.nasa.gov/history/diagrams/apollo.html';
const upstream = 'https://github.com/orbiternassp/NASSP/tree/914090467d085946a95d911cbaca0804047d4665';
const modelSources = [
  { l: '三维模型与原始项目', n: 'Project Apollo – NASSP contributors · 固定版本', url: upstream },
  { l: '可编辑网格、贴图和完整许可', n: 'NASSP 模型源文件 · GPL-2.0 · ZIP', url: './models/sources/apollo-nassp.zip' },
  { l: '模型使用与再分发条款', n: 'GNU General Public License v2', url: './models/LICENSE-NASSP.txt' },
];

export const apolloCraft = {
  apollo: {
    id: 'apollo', name: '阿波罗 CSM', en: 'APOLLO · COMMAND & SERVICE MODULE',
    tag: '1969 · 阿波罗 11 号 · 指令舱与服务舱',
    lede: '锥形指令舱容纳三位宇航员，圆柱形服务舱提供动力、电力与补给。登月舱飞向月面时，这艘母船留在月球轨道，等他们回来。',
    model: 'models/apollo-csm.glb', download: { file: 'Apollo-CSM-NASSP.glb', size: '3.09 MB' },
    view: { min: 1.4, max: 60, exposure: .95, target: [0, 0, 0], position: [-10, 5, 15], up: [0, 1, 0], fit: 1 },
    heroFacts: [
      { v: '1969', u: '年', l: '阿波罗 11 号' },
      { v: '3', u: '人', l: '指令舱乘组' },
      { v: '2', u: '舱', l: '指令与服务' },
    ],
    modelInfo: {
      tri: '45,832', vert: '43,903', mesh: '74', mat: '74', tex: '21', method: '社区模型 · GPL-2.0',
      note: '采用 Project Apollo – NASSP 的外部网格与贴图，按原项目位置组装指令舱、服务舱、六块外壁、姿控喷口、主发动机、四面高增益天线和对接探杆；转换坐标与 PBR 材质，内嵌颜色、法线及金属度／粗糙度贴图。保留上游署名与 GPL-2.0 许可，附可编辑源文件。模型为 Block II 外观展示，页面任务参数采用阿波罗 11 号口径。',
    },
    parts: {
      command: {
        no: '01', title: '哥伦比亚指令舱', en: 'COMMAND MODULE · COLUMBIA',
        text: '锥形乘员舱装着飞行控制、导航、生命保障和返回设备。舱门与舷窗之外是再入防热结构；服务舱分离后，只有这一部分带着三位宇航员进入大气。',
        value: '3', unit: '人 · 发射与返航乘组',
        anchor: [.2, 3.4, 2], target: [.2, 3.45, .3], offset: [-4, 2, 5], source: csmRecord,
      },
      service: {
        no: '02', title: '服务舱与散热器', en: 'SERVICE MODULE',
        text: '圆柱形服务舱承担推进、电力、热控和消耗品储存。表面的分块散热器把设备产生的热量排入太空，舱内燃料电池为整段飞行提供电力并生成水。',
        value: '2', unit: '部分 · CSM 的第二个舱段',
        anchor: [.2, -.4, 2.23], target: [.2, -.4, .2], offset: [5, 1.3, 6], source: drawings,
      },
      rcs: {
        no: '03', title: '姿态控制喷口', en: 'REACTION CONTROL SYSTEM',
        text: '服务舱周围的四组喷口负责转动飞船和小幅平移。与后端的主发动机不同，它们通过不同喷口的组合，帮助飞船瞄准、稳定姿态并完成交会操作。',
        value: '4', unit: '组 · 服务舱姿控组件',
        anchor: [2.36, .55, .2], target: [1.75, .55, .2], offset: [4, 1.5, 4], source: drawings,
      },
      engine: {
        no: '04', title: 'SPS 主发动机', en: 'SERVICE PROPULSION SYSTEM',
        text: '后端的大喷管属于服务推进系统。它承担进入月球轨道与离开月球等关键机动；在离轨返航以前，主发动机和整段服务舱仍与指令舱相连。',
        value: '1', unit: '台 · 服务舱主发动机',
        anchor: [.22, -4.8, 1.05], target: [.22, -3.95, .2], offset: [4, -3, 5], source: drawings,
      },
      antenna: {
        no: '05', title: '四面高增益天线', en: 'S-BAND HIGH-GAIN ANTENNA',
        text: '服务舱后侧的天线由四面抛物面组成，安装在可转动支架上。它把话音、遥测与电视信号送向地球，细密网面与折叠支臂共同构成这件容易被忽略的设备。',
        value: '4', unit: '面 · 组合抛物面天线',
        anchor: [-2.1, -2.15, -1.8], target: [-1.7, -2.05, -1.5], offset: [-3, -1.3, -4], source: csmRecord,
      },
      docking: {
        no: '06', title: '对接环与探杆', en: 'DOCKING PROBE & TUNNEL',
        text: '指令舱前端的探杆先与登月舱的锥形受口接触，再让对接环建立连接。两艘飞船连接后，乘员才能通过舱间通道转移到登月舱，或从月面任务返回母船。',
        value: 'CSM ↔ LM', unit: '月球轨道上的交会与转移',
        anchor: [.23, 5.28, .3], target: [.23, 4.7, .3], offset: [2.6, 2.4, 3.8], source: drawings,
      },
    },
    specs: [
      { v: '1969', u: '年', l: '7 月 16 日发射', d: '阿波罗 11 号，由土星五号送入太空' },
      { v: '28,801', u: '千克', l: 'CSM 发射质量', d: '含推进剂与消耗品，不含登月舱和火箭' },
      { v: '11.0', u: '米', l: '组合体长度参考', d: '指令舱、服务舱及主发动机组合' },
      { v: '3.9', u: '米', l: '舱体直径参考', d: '系列名义尺寸，模型不作工程测量依据' },
      { v: '3', u: '人', l: '阿波罗 11 号乘组', d: '阿姆斯特朗、奥尔德林与柯林斯' },
    ],
    fact: '阿姆斯特朗与奥尔德林飞向月面时，柯林斯独自留在哥伦比亚号中绕月飞行。登月成功以后，两人还必须乘上升级重新追上这艘母船。',
    readings: [
      { no: '01', title: '母船留在轨道上', body: '阿波罗采用月球轨道交会：把落到月面和返回地球的工作交给不同飞船。CSM 不随登月舱下降，它留在轨道上，保存返航所需的设备、补给和推进能力。', facts: ['指令舱负责乘组与返回', '服务舱负责推进、电力与补给', '登月舱独立完成下降和上升', '两艘飞船在绕月轨道重新连接'] },
      { no: '02', title: '银色表面之下', body: '指令舱与服务舱的外表服务于不同任务。前者必须带着乘组再入，后者要在太空中保持设备温度。模型保留了蒙皮分块、舱门、光学设备和服务舱散热器的差异。', facts: ['指令舱具有再入防热结构', '外部舱门与舷窗可近看', '服务舱表面分布散热器', '模型包含独立表面纹理和法线'] },
      { no: '03', title: '一台大发动机，许多小喷口', body: '大喷管解决大幅改变轨道的问题，周围的姿态喷口则让飞船转向与小幅平移。两类发动机各司其职，使远距离机动和最后的缓慢接近都能完成。', facts: ['SPS 位于服务舱后端', '服务舱四周分布四组姿控组件', '指令舱也有自己的返回姿控设备', '交会时要同时控制姿态和相对运动'] },
      { no: '04', title: '最后只留指令舱', body: '返航途中，CSM 仍是组合体。临近再入时，已经完成任务的服务舱与指令舱分离，乘组靠指令舱的防热结构、降落伞与海上回收系统完成旅程。任务年表采用 UTC 日期。', facts: ['1969-07-16 发射', '1969-07-19 进入月球轨道', '1969-07-21 与登月舱上升级重新对接', '1969-07-24 溅落太平洋'] },
    ],
    timeline: { tabs: [{ name: '阿波罗 11 号 · CSM（UTC）', items: [
      { d: '1969.07.16', t: '从肯尼迪出发', x: '三位乘员乘哥伦比亚号发射，开始首次载人登月任务。' },
      { d: '1969.07.19', t: '进入月球轨道', x: '服务推进系统点火，使组合体进入绕月轨道。' },
      { d: '1969.07.20', t: '柯林斯留守母船', x: '鹰号分离并下降，哥伦比亚号继续绕月飞行。' },
      { d: '1969.07.21', t: '接回月面乘组', x: '登月舱上升级与哥伦比亚号交会对接，两位宇航员返回母船。' },
      { d: '1969.07.24', t: '三人返回地球', x: '服务舱分离后，指令舱携三位宇航员溅落太平洋。' },
    ] }] },
    sources: [
      { l: 'CSM 结构、尺寸与发射质量', n: 'NASA NSSDC · Apollo 11 CSM', url: csmRecord },
      { l: '任务与乘组、发射及返回', n: 'NASA · Apollo 11 Mission Overview', url: mission },
      { l: '舱段、喷口与对接系统图解', n: 'NASA · Project Apollo Drawings and Technical Diagrams', url: drawings },
      ...modelSources,
    ],
  },
  lunar: {
    id: 'lunar', name: '鹰号登月舱', en: 'APOLLO · LUNAR MODULE',
    tag: '1969 · 阿波罗 11 号 · 鹰号登月舱',
    lede: '四条腿撑起金色下降级，上方是不对称的乘员舱。它把两人送到月面，再把他们送回轨道；下降级则留在原地，成为起飞的平台。',
    model: 'models/apollo-lm.glb', download: { file: 'Apollo-LM-NASSP.glb', size: '10.14 MB' },
    view: { min: 1.4, max: 65, exposure: .95, target: [0, 0, 0], position: [-12, 7, -16], up: [0, 1, 0], fit: 1 },
    heroFacts: [
      { v: '1969', u: '年', l: '首次载人登月' },
      { v: '2', u: '人', l: '登月乘员' },
      { v: '2', u: '级', l: '下降与上升' },
    ],
    modelInfo: {
      tri: '33,582', vert: '37,032', mesh: '29', mat: '29', tex: '13', method: '社区模型 · GPL-2.0',
      note: '由 Project Apollo – NASSP 的上升级与下降级网格组装，保留隔热层颜色与法线、雷达、支柱、舷窗、阶梯和喷管，展示着陆架与触月探针展开的外观。移除乘员人物、后期 AES 附件、RTG 燃料罐与后期羽流挡板，按阿波罗 11 号早期登月舱布局取舍。部分动画设备采用静态姿态；GPL-2.0 许可和完整可编辑源文件随模型提供。',
    },
    parts: {
      ascent: {
        no: '01', title: '上升级乘员舱', en: 'ASCENT STAGE',
        text: '上方不对称的舱体容纳两位宇航员。它带着控制设备、生命保障和上升推进系统，任务结束后离开下降级，重新飞向月球轨道。',
        value: '2', unit: '人 · 站立操纵的登月乘员',
        anchor: [-.9, 2.15, -1.75], target: [0, 2.2, 0], offset: [-4.5, 2, -6], source: lmRecord,
      },
      descent: {
        no: '02', title: '金色下降级', en: 'DESCENT STAGE',
        text: '下降级装着下降发动机、推进剂和月面任务所需设备，外层隔热材料呈现金、铜与银等颜色。它负责落到月面，并在上升级起飞时充当发射平台。',
        value: '2', unit: '级 · 下降级留在月面',
        anchor: [-1.35, -.65, -2.15], target: [0, -.45, 0], offset: [-5, 2, -6], source: lmRecord,
      },
      gear: {
        no: '03', title: '着陆架与触月探针', en: 'LANDING GEAR & CONTACT PROBES',
        text: '四套着陆架把飞船撑在月面上，圆盘形脚垫分散接地载荷。三根触月探针从脚垫下方伸出，在脚垫接地以前提供接触信号；模型保留探针展开的姿态。',
        value: '4', unit: '条 · 带脚垫的着陆支腿',
        anchor: [-4.1, -2.65, 0], target: [-3.5, -2, 0], offset: [-4.5, 2, -5], source: drawings,
      },
      ladder: {
        no: '04', title: '舱口、平台与阶梯', en: 'FORWARD HATCH & LADDER',
        text: '前部舱口外是出入平台，阶梯沿着前支腿向下延伸。乘员从狭小舱门爬出，再沿平台与阶梯下降到脚垫附近，最后踏上月面。',
        value: '前部', unit: '乘员通向月面的路径',
        anchor: [0, -.2, -2.7], target: [0, .2, -2], offset: [3, 1.6, -5], source: drawings,
      },
      radar: {
        no: '05', title: '雷达与通信天线', en: 'RADAR & COMMUNICATION ANTENNAS',
        text: '上方的交会雷达用于寻找绕月母船，定向 S 波段天线负责与地球通信。下降级下方另有着陆雷达，测量飞船相对月面的高度与速度。',
        value: '交会 / 着陆', unit: '两类雷达承担不同飞行阶段',
        anchor: [0, 3.65, -.5], target: [0, 3, 0], offset: [-4, 3, -5], source: drawings,
      },
      thrusters: {
        no: '06', title: '姿控喷口与推进系统', en: 'REACTION CONTROL & PROPULSION',
        text: '上升级周围的姿态喷口负责转向和小幅平移。下降发动机、上升发动机与姿态控制系统分别服务于不同动作，让着陆、起飞和接近母船各有合适的推进手段。',
        value: '4', unit: '组 · 上升级姿控喷口',
        anchor: [-2.35, 1.9, -.2], target: [-1.8, 1.9, 0], offset: [-4, 1.5, -4], source: drawings,
      },
    },
    specs: [
      { v: '1969', u: '年', l: '7 月 20 日着陆', d: '鹰号在静海着陆，日期采用 UTC' },
      { v: '15,103', u: '千克', l: '鹰号质量参考', d: 'NASA NSSDC 的任务构型，含两级与推进剂' },
      { v: '7.04', u: '米', l: '飞船名义高度', d: '系列结构参考，不包含向下伸出的触月探针' },
      { v: '9.45', u: '米', l: '脚垫对角跨度参考', d: '展开着陆架的系列名义尺寸' },
      { v: '2', u: '人', l: '鹰号登月乘员', d: '尼尔·阿姆斯特朗与巴兹·奥尔德林' },
    ],
    fact: '回到轨道时，鹰号只带走上升级。下降级、着陆架与阶梯留在月面；宇航员最后还要与哥伦比亚号重新对接，才能踏上回家的路。',
    readings: [
      { no: '01', title: '只在真空里飞行的机器', body: '登月舱不需要穿过地球大气，所以不必用流线型外壳包住所有设备。棱面、支架、罐体与天线围着乘员舱展开，形成了与指令舱完全不同的轮廓。', facts: ['只用于太空与月面任务', '无地球再入防热外壳', '舱体围绕设备与视野布置', '由 CSM 携带到月球附近'] },
      { no: '02', title: '金箔不是承力外壳', body: '外部金属化隔热材料保护设备免受温度变化影响，并不承担整个飞船的结构载荷。模型保留不同颜色的隔热层纹理和细小褶皱，支柱与边框则由不同材质表现。', facts: ['隔热层具有不同颜色和表面起伏', '下降级装着发动机与推进剂', '结构支柱负责传递载荷', '脚垫与着陆支腿分散接地冲击'] },
      { no: '03', title: '把起飞平台留在月球', body: '两级结构让返轨时不必继续携带着陆架和已经完成任务的设备。上升级以自己的发动机起飞，下降级留在着陆点，成为这次飞行留给月球的一部分。', facts: ['下降级完成制动与着陆', '上升级容纳两位宇航员', '上升发动机把乘员送回轨道', '下降级与阶梯不返回母船'] },
      { no: '04', title: '同一任务，两艘飞船', body: '1969 年 7 月 20 日，鹰号完成首次载人月面着陆。按 UTC，阿姆斯特朗踏上月面已是 7 月 21 日。月面活动结束后，两位宇航员乘上升级与留在轨道的柯林斯会合。', facts: ['1969-07-20 月面着陆', '1969-07-21 首次踏上月面（UTC）', '1969-07-21 上升级起飞', '1969-07-21 与哥伦比亚号对接'] },
    ],
    timeline: { tabs: [{ name: '阿波罗 11 号 · 鹰号（UTC）', items: [
      { d: '1969.07.16', t: '随母船前往月球', x: '鹰号与指令／服务舱一同发射，随后转移到 CSM 前端对接。' },
      { d: '1969.07.20', t: '分离并下降', x: '两位宇航员乘鹰号离开母船，开始月面下降。' },
      { d: '1969.07.20', t: '鹰号着陆', x: '四套着陆架撑起飞船，人类首次载人月面着陆完成。' },
      { d: '1969.07.21', t: '踏上月面', x: '阿姆斯特朗与奥尔德林通过前部舱口和阶梯走到月面。' },
      { d: '1969.07.21', t: '起飞与重新对接', x: '上升级离开下降级，返回月球轨道并与哥伦比亚号连接。' },
    ] }] },
    sources: [
      { l: '鹰号两级、任务与质量', n: 'NASA NSSDC · Apollo 11 Lunar Module / EASEP', url: lmRecord },
      { l: '登月与出舱、上升和交会', n: 'NASA · Apollo 11 Mission Overview', url: mission },
      { l: '着陆架、雷达、乘员舱和推进图解', n: 'NASA · Project Apollo Drawings and Technical Diagrams', url: drawings },
      { l: '登月舱系列结构尺寸', n: 'NASA NTRS · Lunar Lander Comparison', url: 'https://ntrs.nasa.gov/api/citations/20080030104/downloads/20080030104.pdf' },
      ...modelSources,
    ],
  },
};
