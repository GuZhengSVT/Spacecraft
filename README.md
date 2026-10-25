# Spacecraft · 深空档案

八件航天器的三维档案：旅行者号、斯普特尼克 1 号、东方红一号、卡西尼号、联盟 TMA、阿波罗指令／服务舱、鹰号登月舱和国际空间站。页面由 Vite + Three.js 构建，使用项目内的八个 GLB 模型文件，支持整体观察与部件特写。

## 运行

需要 Node.js 20.19+ 或 22.12+。

    git clone https://github.com/GuZhengSVT/Spacecraft.git
    cd Spacecraft
    npm ci
    npm run dev -- --port 4173

构建与本地预览：

    npm run build
    npm run preview -- --port 4174

`dist/` 是完整静态站点，使用相对路径，可部署在任意子目录。

## 结构

| 文件 | 用途 |
| --- | --- |
| `index.html` | 页面骨架：顶栏、展台、数据、读物、年表、对照、模型档案、声音、资料 |
| `src/main.js` | 三维视口、滚动导览、视频与音乐播放器 |
| `src/apollo-content.js` | 阿波罗 CSM 与登月舱的参数、六处部件导览、年表和来源 |
| `src/content.js` | 八件航天器的数据、部件、年表、出处，以及视频与歌曲清单 |
| `src/iss-content.js` | 国际空间站的八处部件导览、参数、年表和来源 |
| `src/style.css` | 版式与响应式布局 |
| `public/models/iss.glb` | NASA / JSC IGOAL 官方高细节空间站，2,975,912 三角面、114 张内嵌贴图 |
| `public/draco/` | 本地 Draco 解码器及 Apache-2.0 许可 |
| `public/models/apollo-csm.glb` | NASSP 指令／服务舱组合，45,832 三角面、21 张内嵌贴图 |
| `public/models/apollo-lm.glb` | NASSP 登月舱，33,582 三角面、13 张内嵌贴图 |
| `public/models/sources/apollo-nassp.zip` | 两个阿波罗模型的可编辑 MSH / PNG 源文件、固定版本与 GPL-2.0 许可 |
| `scripts/build-apollo.mjs` | `npm run model:apollo` 离线重新生成两个阿波罗 GLB |
| `public/models/soyuz.glb` | 本站原创联盟 TMA 外观重建，4 张内嵌 PBR 贴图，16,897,368 字节 |
| `public/models/cassini.glb` | NASA / VTAD 官方模型，内嵌 7 张贴图，5,852,640 字节 |
| `public/models/voyager.glb` | NASA / VTAD 官方模型，内嵌纹理，3,128,204 字节 |
| `public/models/sputnik-1.glb` | 斯普特尼克 1 号参数化模型，552,532 字节 |
| `public/models/dongfanghong-1.glb` | 东方红一号参数化模型，2,571,552 字节 |
| `src/sputnik-model.js` | 斯普特尼克球壳、接缝、紧固件与四根天线 |
| `src/dongfanghong-model.js` | 东方红一号 72 块蒙皮、腰带窗口、四根短波天线与顶部天线 |
| `src/soyuz-model.js` | 联盟 TMA 的隔热毯、舷窗、对接探杆、天线、散热器和太阳能翼 |
| `scripts/build-soyuz.mjs` | `npm run model:soyuz` 离线生成原创几何、程序贴图与 GLB |
| `scripts/build-sputnik.mjs` | `npm run model:sputnik` 重新生成 GLB |
| `scripts/build-dongfanghong.mjs` | `npm run model:dongfanghong` 重新生成 GLB |
| `docs/RESEARCH.md` | 研究来源与尺寸依据 |
| `docs/VERIFICATION.md` | 验证记录 |

## 页面

- **展台**：左侧粘性三维视口，右侧按顺序滚动的部件导览；左键或单指拖动旋转，右键或 Shift＋左键拖动平移，滚轮或双指捏合缩放，双指拖动平移。平移半径限制为视口短边对应世界尺寸的 30%，随缩放与部件特写调整，点击复位或按 Home 回到整体视角。编号标签可点击进入特写。支持自动旋转、标记、线框与全屏；画布聚焦后可用方向键旋转、加减号缩放。
- **工程数据**：五组核对过的参数，以及一条值得记住的结论。
- **读物**：每个航天器四到五篇短文，配关键数字列表。
- **任务年表**：旅行者号可在 1 号与 2 号之间切换。
- **八件航天器，各自的尺度**：按质量排序的横向对比，点击行切换航天器；空间站标明在轨参考质量。
- **模型档案**：三角面、顶点、网格、材质、贴图与建模方式，附 GLB 下载。
- **声音**：四支 B 站航天史填词视频，以及两首网易云音乐的填词作品。

## 数据来源

页面中的数字逐项列在「资料来源」里，主要来自 NASA（任务年表、航天器结构、常见问题、金唱片、一光日里程碑、NSSDC 飞掠数据）、中国空间技术研究院、中国国家航天局和中国国家博物馆。斯普特尼克 1 号的轨道参数引自 NASA NSSDC。

## 联盟 TMA 模型

联盟 TMA 为本站自主制作的外观重建，包含 373,168 个三角面、327,429 个顶点、19 个网格、18 种材质和 4 张内嵌贴图。几何细节包括隔热毯褶皱、包边针脚、舷窗座圈与玻璃、探杆式对接机构、Kurs 天线、散热管路、发动机喷管，以及由 792 片电池组成的两侧太阳能翼。

材质分别表现织物、金属、玻璃、白色散热涂层和硅电池片；颜色、法线、粗糙度和电池栅线贴图由构建脚本生成。模型可从页面「模型档案」下载为 `Soyuz-TMA.glb`。

在完成 `npm ci` 后，可离线重新生成模型：

```sh
npm run model:soyuz
```

命令读取 [几何源码](src/soyuz-model.js)，通过 [构建脚本](scripts/build-soyuz.mjs) 输出 `public/models/soyuz.glb`，不需要下载源模型、安装 Blender 或调用外部服务。

结构依据为 NASA / ESA 公开资料，视觉细节参考 [Chris Kuhn 的作品预览](https://chriskuhn.artstation.com/projects/3Ko5D)，没有使用该商业作品的网格或贴图。模型属于教学用外观复原，小型附件与布料形态为近似；页面参数采用 TMA 系列参考口径。资料、建模范围和文件校验值见 [研究记录](docs/RESEARCH.md)，检查结果见 [验证记录](docs/VERIFICATION.md)。

## 视频与音乐

B 站 UP 主「炙弹冰」的航天史填词视频通过官方外链播放器嵌入；网易云音乐的两首填词作品使用页内播放器，直链不可用时自动换成网易云官方外链播放器。词作与音频版权归 UP 主及原作者所有。

- B 站主页：https://space.bilibili.com/69855702/
- 收录视频：BV12N4y1f7QT、BV129mGY3Efe、BV189cyeBEzm、BV1SPgbzzE3e
- 收录歌曲：2129652434、2699124989

## 署名

三维模型：NASA Visualization Technology Applications and Development（VTAD）的旅行者号与卡西尼号、NASA / JSC / IGOAL 的国际空间站、NASSP 社区的阿波罗飞船，以及本项目依据公开资料自行制作的斯普特尼克 1 号、东方红一号和联盟 TMA。

## 阿波罗模型与许可

分别展示阿波罗 Block II 指令／服务舱（CSM）与鹰号登月舱（LM）。两者采用 [Project Apollo – NASSP](https://github.com/orbiternassp/NASSP/tree/914090467d085946a95d911cbaca0804047d4665) 社区的外部网格和贴图，保留原项目署名，按 **GPL-2.0** 提供；它们与 NASA 官方模型、本站原创模型分别标注来源。任务和质量数据采用 NASA 的阿波罗 11 号资料，日期采用 UTC。

转换保留几何与贴图，装配舱段、转换坐标并适配 PBR 材质。上游 DDS 已解码成可编辑 PNG，法线方向与 CSM 反射贴图作 glTF 适配；登月舱移除了乘员人物和后期任务附件，展示着陆架、触月探针展开的静态构型。

```sh
npm run model:apollo
```

此命令只需现有 Node.js / Three.js 依赖，从仓库内源文件包生成两个 GLB，无需联网或安装 Orbiter。完整源文件与许可随静态站点一起发布：[源文件 ZIP](public/models/sources/apollo-nassp.zip)、[GPL-2.0 许可](public/models/LICENSE-NASSP.txt)。

## 国际空间站模型

采用 [NASA / JSC / IGOAL 官方 GLB](https://science.nasa.gov/3d-resources/international-space-station-iss-d-igoal/)，完整保留 2,975,912 个三角面、6,415,155 个顶点、114 张内嵌图片与官方 PBR 材质，不进行减面或贴图降采样。文件为 64,846,620 字节，SHA-256：`3b03742fb55f2a495c4a72aaa2cb175aaeff5ee38f4f42b95f92083e30a464ef`。

模型在首次选择国际空间站时加载，通过随站点发布的 Draco 解码器解压，不依赖外部 CDN；展示时缩放至 0.1 倍以适应现有展台，下载文件保持官方原始字节。整体取景使用分组包围盒，ISS 的部件标签不执行逐三角形遮挡检测，以控制内存和交互开销。完整模型对浏览器内存和显卡的要求高于其他展品。

展台对 `ELC_Base`、`Truss`、`IROSA` 三种材质使用透明裁切和深度写入，取代原文件的半透明混合，避免大型合并网格出现前后遮挡错乱；纹理中的真实孔洞保留，其他材质不受此适配影响。下载仍提供 NASA 原始 GLB。

新增太阳能翼、桁架、散热器、美欧实验舱、希望号、俄罗斯舱段、穹顶舱和加拿大臂八处导览。模型为官方发布的静态装配构型，包含 iROSA 等附件；尺寸、体积和质量使用 NASA 的整站参考口径，不表示实时构型。质量对照中特别标注空间站为在轨参考质量。

原作者：NASA/JSC/Integrated Graphics, Operations, and Analysis Laboratory。使用遵循 [NASA Images and Media Usage Guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/)，本页为教育与信息展示。Draco 解码器来自项目现有 Three.js 依赖，采用 Apache-2.0，许可与作者清单保存在 `public/draco/`。
