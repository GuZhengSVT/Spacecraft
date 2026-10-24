# DEEP FIELD · 深空档案

四件航天器的三维档案：旅行者号、斯普特尼克 1 号、东方红一号、卡西尼号。页面由 Vite + Three.js 构建，只使用项目内的四个 GLB 模型文件，界面与交互全部重写。

## 运行

需要 Node.js 20.19+ 或 22.12+。

    git clone https://github.com/GuZhengSVT/Aircraft.git
    cd Aircraft
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
| `src/content.js` | 四件航天器的数据、部件、年表、出处，以及视频与歌曲清单 |
| `src/style.css` | 版式与响应式布局 |
| `public/models/cassini.glb` | NASA / VTAD 官方模型，内嵌 7 张贴图，5,852,640 字节 |
| `public/models/voyager.glb` | NASA / VTAD 官方模型，内嵌纹理，3,128,204 字节 |
| `public/models/sputnik-1.glb` | 斯普特尼克 1 号参数化模型，552,532 字节 |
| `public/models/dongfanghong-1.glb` | 东方红一号参数化模型，2,571,552 字节 |
| `src/sputnik-model.js` | 斯普特尼克球壳、接缝、紧固件与四根天线 |
| `src/dongfanghong-model.js` | 东方红一号 72 块蒙皮、腰带窗口、四根短波天线与顶部天线 |
| `scripts/build-sputnik.mjs` | `npm run model:sputnik` 重新生成 GLB |
| `scripts/build-dongfanghong.mjs` | `npm run model:dongfanghong` 重新生成 GLB |
| `docs/RESEARCH.md` | 研究来源与尺寸依据 |
| `docs/VERIFICATION.md` | 验证记录 |

## 页面

- **展台**：左侧粘性三维视口，右侧按顺序滚动的部件导览；鼠标或触控拖动旋转，滚轮缩放；编号标签可点击进入特写。支持自动旋转、标记、线框、复位与全屏；画布聚焦后可用方向键旋转、加减号缩放、Home 复位。
- **工程数据**：五组核对过的参数，以及一条值得记住的结论。
- **读物**：每个航天器四到五篇短文，配关键数字列表。
- **任务年表**：旅行者号可在 1 号与 2 号之间切换。
- **四件东西，四个年代**：按质量排序的横向对比，点击行切换航天器。
- **模型档案**：三角面、顶点、网格、材质、贴图与建模方式，附 GLB 下载。
- **声音**：四支 B 站航天史填词视频，以及两首网易云音乐的填词作品。

## 数据来源

页面中的数字逐项列在「资料来源」里，主要来自 NASA（任务年表、航天器结构、常见问题、金唱片、一光日里程碑、NSSDC 飞掠数据）、中国空间技术研究院、中国国家航天局和中国国家博物馆。斯普特尼克 1 号的轨道参数引自 NASA NSSDC。

## 视频与音乐

B 站 UP 主「炙弹冰」的航天史填词视频通过官方外链播放器嵌入；网易云音乐的两首填词作品使用页内播放器，直链不可用时自动换成网易云官方外链播放器。词作与音频版权归 UP 主及原作者所有。

- B 站主页：https://space.bilibili.com/69855702/
- 收录视频：BV12N4y1f7QT、BV129mGY3Efe、BV189cyeBEzm、BV1SPgbzzE3e
- 收录歌曲：2129652434、2699124989

## 署名

三维模型：NASA Visualization Technology Applications and Development（VTAD），以及本项目依据公开尺寸的参数化重建。
