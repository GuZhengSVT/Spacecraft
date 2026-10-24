# Spacecraft · 深空档案

五件航天器的三维档案：旅行者号、斯普特尼克 1 号、东方红一号、卡西尼号、联盟 TMA。页面由 Vite + Three.js 构建，使用项目内的五个 GLB 模型文件，支持整体观察与部件特写。

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
| `src/content.js` | 五件航天器的数据、部件、年表、出处，以及视频与歌曲清单 |
| `src/style.css` | 版式与响应式布局 |
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

- **展台**：左侧粘性三维视口，右侧按顺序滚动的部件导览；鼠标或触控拖动旋转，滚轮缩放；编号标签可点击进入特写。支持自动旋转、标记、线框、复位与全屏；画布聚焦后可用方向键旋转、加减号缩放、Home 复位。
- **工程数据**：五组核对过的参数，以及一条值得记住的结论。
- **读物**：每个航天器四到五篇短文，配关键数字列表。
- **任务年表**：旅行者号可在 1 号与 2 号之间切换。
- **五件航天器，各自的尺度**：按质量排序的横向对比，点击行切换航天器。
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

三维模型：NASA Visualization Technology Applications and Development（VTAD）的旅行者号与卡西尼号，以及本项目依据公开资料自行制作的斯普特尼克 1 号、东方红一号和联盟 TMA。
