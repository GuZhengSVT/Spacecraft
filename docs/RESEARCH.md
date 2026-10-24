# 研究与资产记录

研究日期：2026-10-23；实现与验证续于 2026-10-24。页面事实来源以 NASA 官方资料为主，中苏两国的航天器数据补充自中国空间技术研究院、中国国家航天局与中国国家博物馆。

## 三维资产

- 名称：Voyager 3D Model
- 作者署名：NASA Visualization Technology Applications and Development (VTAD)
- 资源页：https://science.nasa.gov/resource/voyager-3d-model/
- 原始下载：https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/09/v/Voyager.glb
- 本地：`public/models/voyager.glb`
- 大小：3,128,204 字节，glTF 2.0，Khronos Blender glTF 2.0 I/O 导出，纹理内嵌。
- 使用说明：https://www.nasa.gov/nasa-brand-center/images-and-media/

保留官方几何及纹理。网页的星空、光照、材质反射参数与镜头编排属于展示设计。没有复制 NASA 标志作为本站品牌。

## 工程尺寸与载荷

NASA FAQ：https://science.nasa.gov/mission/voyager/frequently-asked-questions/

| 结构 / 参数 | NASA 公开近似数值 | 用途 |
| --- | --- | --- |
| 高增益天线直径 | 3.7 m | 首页参数、天线说明 |
| 磁强计伸展臂 | 13 m | 部件说明 |
| 科学仪器伸展臂 | 3 m | 部件说明 |
| RTG 伸展臂 | 3.7 m | 研究参考 |
| 两根 PRA / PWS 天线 | 各 10 m | 研究参考 |
| 总线机身直径 | 约 1.8 m | 研究参考 |
| 发射质量，含肼 | 815 kg | 首页参数 |

NASA Spacecraft：https://science.nasa.gov/mission/voyager/spacecraft/

用于三轴稳定、朝地球通信、十边形总线机身、科学扫描平台及三台 RTG 的结构说明。本展馆不展示易变的“当前已开启仪器数”或声称具有实时遥测。

## 金唱片

https://science.nasa.gov/mission/voyager/voyager-golden-record-overview/

镀金铜质唱片，直径 12 英寸，包含图像、自然声音、音乐与 55 种语言的问候。五号热点定位在官方模型的唱片封套纹理所在面；不播放或重新分发唱片音乐。

## 任务历史

- 发射与行星飞掠：https://science.nasa.gov/mission/voyager/fact-sheet/
- 飞掠精确日期：https://nssdc.gsfc.nasa.gov/planetary/voyager-periapse.html
- 旅行者 2 号与星际空间：https://voyager.gsfc.nasa.gov/mission.html
- 暗淡蓝点：https://science.nasa.gov/mission/voyager/voyager-1s-pale-blue-dot/
- 旅行者 1 号星际里程碑：https://www.nasa.gov/history/45-years-ago-voyager-1-begins-its-epic-journey-to-the-outer-planets-and-beyond/

| 事件 | 旅行者 1 号 | 旅行者 2 号 |
| --- | --- | --- |
| 发射 | 1977-09-05 | 1977-08-20 |
| 木星飞掠 | 1979-03-05 | 1979-07-09 |
| 土星飞掠 | 1980-11-12 | 1981-08-25 |
| 天王星飞掠 | — | 1986-01-24 |
| 海王星飞掠 | — | 1989-08-25 |
| 暗淡蓝点拍摄 | 1990-02-14 | — |
| 穿越日球层顶 | 2012-08-25 | 2018-11-05 |

进入星际空间意味着穿越日球层顶，不等同于脱离太阳引力范围。页面中的星空不是精确星图；三维姿态不代表任一时刻的真实遥测。

## 斯普特尼克 1 号（2026-10-24）

- 工程资料：https://www.nasa.gov/history/sputnik/siddiqi.html
  球体直径 58 厘米，铝合金密封壳体；两根 2.4 米、两根 2.9 米天线；内部电池与无线电发射机。模型在 `src/sputnik-model.js` 中以米为单位生成，导出为 `public/models/sputnik-1.glb`。
- 发射与质量：https://www.nasa.gov/history/dawn-of-the-space-age/
  1957-10-04 发射，质量 83.6 千克，首颗人造地球卫星。
- 历史节点：https://www.nasa.gov/history/65-years-ago-sputnik-ushers-in-the-space-age/
  1957-10-26 电池耗尽、无线电信号停止；1958-01-04 重返大气层。

球壳和天线长度按上述尺寸建立。天线开角、接缝、紧固件、底座与套接细节为外观建模；无线电系统通过文字介绍，不展示内部机构。抛光金属反射来自展台环境光。


## 卡西尼号（2026-10-25）

- 资产：Cassini 3D Model，NASA Visualization Technology Applications and Development（VTAD）。
- 官方资源页：https://science.nasa.gov/resource/cassini-3d-model/
- 官方下载：https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/09/c/Cassini.glb
- 本地：`public/models/cassini.glb`，5,852,640 字节；glTF 2.0，Blender glTF 导出，无外部依赖。
- SHA-256：`cacdca3279b28e64280ff8e823f572311f67a83bde2d0435b26f515a1b7926be`。
- 26,020 个三角面、30,788 个顶点、12 个 glTF mesh 定义／15 个渲染 primitive、10 种材质、7 张内嵌贴图。页面网格数按 Three.js 渲染网格计，与现有档案口径一致。
- 保留官方文件原样，含侧挂的惠更斯探测器、展开的磁强计臂与细长天线。这个组合用于结构导览，不表示某一历史时刻的姿态。热点坐标取自模型本地坐标。
- 使用说明：https://www.nasa.gov/nasa-brand-center/images-and-media/

工程数据与任务来源：

- NASA Quick Facts：https://science.nasa.gov/mission/cassini/quick-facts/ （5,712 千克发射质量含推进剂、惠更斯、适配器等；不能与干质量混用。）
- NASA Cassini Orbiter：https://science.nasa.gov/mission/cassini/spacecraft/cassini-orbiter/ （三轴稳定；环绕器 12 台仪器，惠更斯 6 台。）
- ESA Cassini spacecraft：https://www.esa.int/Science_Exploration/Space_Science/Cassini-Huygens/Cassini_spacecraft （4 米天线、三台 RTG；其 5.82 吨质量口径不同，页面统一采用 NASA Quick Facts 的 5,712 千克。）
- NASA MAG：https://science.nasa.gov/mission/cassini/spacecraft/cassini-orbiter/magnetometer/ （11 米非金属伸展臂。）
- ESA 任务概览：https://www.esa.int/Science_Exploration/Space_Science/Cassini-Huygens_overview （发射、引力助推与土星入轨；入轨日期采用 UTC 的 2004-07-01。）
- ESA 惠更斯着陆：https://www.esa.int/Science_Exploration/Space_Science/Cassini-Huygens/Europe_reaches_new_frontier_Huygens_lands_on_Titan （2005-01-14。）
- NASA Grand Finale：https://science.nasa.gov/mission/cassini/grand-finale/overview/ （22 次穿越、2017-09-15 主动进入大气与行星保护目的。）


## 联盟号：本站原创 TMA 外观重建（2026-10-25）

用户选择以 Chris Kuhn 的高细节作品为视觉参考，自行建模。已用原创模型替换早先的 NASA ASTP 联盟 19 号资产；页面也改为 TMA 系列，首飞年表采用 TMA-1，不再混用 1975 年的 APAS-75、两人乘组和 6,680 千克参数。

### 结构与史料

- NASA《Expedition 11 Press Kit》，印刷页 20–23（PDF 页 21–24）：https://www.nasa.gov/wp-content/uploads/2024/04/exp11-presskit.pdf 。TMA 三舱布局、6.5 立方米轨道舱、返回舱、外置交会天线、仪器/推进舱、8 平方米散热器和电池翼；乘员身材适应范围与着陆系统改进。
- ESA 系列概览：https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/The_Russian_Soyuz_spacecraft 。质量约 7 吨、总长约 7.2 米、直径约 2.7 米、展开翼展 10.6 米和最多三位乘员。该页同时谈及多代联盟，页面明确把这些数字标成系列尺度参考，不宣称是某一任务的精确发射质量。
- ESA Odissea：https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Odissea 。TMA-1 于 2002-10-30 首飞，三位首发乘员改乘 TM-34 返回；TMA-1 留站约半年，于 2003-05-04 携远征六号乘组着陆。
- ESA 2003 年调查与改进说明：https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Cervantes_Mission/New_Soyuz_TMA_spacecraft_cleared_for_next_mission_with_ESA_astronaut 。首次返回采用弹道模式；新版 TMA 的改进不能与旧 TM 或 ASTP 19 号混用。
- 视觉参考：Chris Kuhn 的 Soyuz TMA 作品预览 https://chriskuhn.artstation.com/projects/3Ko5D 。仅参考实物表现和细节层次，没有取得、转换或复用该作品的几何、纹理或程序材质。

### 原创模型

- 几何源码：`src/soyuz-model.js`。构建：`npm run model:soyuz`，输出 `public/models/soyuz.glb`；不访问网络，不依赖 Blender。
- 飞船竖直轴为 Y，单位为米；白色推进舱最大直径约 2.7 米，太阳能翼名义跨度 10.6 米，突出铰链使最终包围盒稍宽。它是家族外形复原，不是指定序列号的工程数字样机。
- 轨道舱、返回舱和仪器舱分别生成起伏蒙皮；隔热毯包边、针脚与束线另建几何。褶皱形态、针脚密度、紧固件数量和部分小型设备位置是用于观察的近似表达。
- 舷窗包含完整座圈、带真实内孔的金属边框、密封圈和独立玻璃面；玻璃与布料保持空间间隔。俄罗斯三色标识使用曲面条带顶点色，避免重复 UV、贴图底色块和舱段环带的标识串用。
- TMA 前端采用探杆式对接外形，重建中空环体、暗色凹槽、探杆套筒、锁块和紧固件；不沿用 ASTP 的 APAS-75。Kurs 碟状天线配独立支架、馈源与缆线。
- 推进舱含纵向散热通道、姿态喷口、管路和有内壁的主发动机喷管。两翼共六段结构面板，792 片独立电池，另建汇流线、铰链与背面支撑。
- 四张原创 PNG 贴图均由脚本生成并内嵌：1024² 隔热毯颜色、1024² 法线、512² 粗糙度/金属度、256² 电池片接触栅线。织物、玻璃、铝、涂层散热器与硅片分别使用不同的 PBR 参数。
- 同材质小零件合并为网格；总计 373,168 三角面、327,429 顶点、19 个渲染网格、18 种材质、4 张内嵌图片，16,897,368 字节。没有外部资产 URI。
- 当前 GLB SHA-256：`b0a2ed86ef360679d19379d05b7481ddde1169440add14eebc79cec741466888`。
- GLB 内记录本项目原创署名、官方资料和视觉参考，并明确标注为近似教学外观。页面下载名为 `Soyuz-TMA.glb`。

### 旧资产取舍

此前从 NASA / Michael D. Carbajal 的 Apollo Soyuz 合体资产中提取的联盟 19 号仅有 16,642 三角面；近景确认存在国旗材质串用、UV 重复和舷窗边框穿入舱壳的问题，全套材质也缺少细节法线和粗糙度。该版本已被替换，不再作为现行模型或尺寸依据。

曾筛选 Chris Kuhn 的商业模型、BOOTH Soyuz-TM、Sketchfab 合体模型与 NASA 早期 ISS 的 LWO 资产。用户随后选择自行建模，因此未购买商业资产，也未将候选源文件加入仓库。
