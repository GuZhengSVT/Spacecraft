import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { craft, craftOrder, compare, videos, songs } from './content.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const ASSET = import.meta.env.BASE_URL;
let active = 'voyager';

/* ---------------- 顶栏切换 ---------------- */

const switchEl = $('#switch');
switchEl.innerHTML = craftOrder.map((id, i) => {
  const c = craft[id];
  return '<button data-craft="' + id + '" aria-pressed="' + (id === active) + '"><i>0' + (i + 1) + '</i>' + c.name + '</button>';
}).join('');
switchEl.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-craft]');
  if (btn) selectCraft(btn.dataset.craft, { scroll: true });
});

/* ---------------- 内容渲染 ---------------- */

function renderCraft(id) {
  const c = craft[id];
  active = id;

  $('#craft-index').textContent = String(craftOrder.indexOf(id) + 1).padStart(2, '0') + ' / ' + String(craftOrder.length).padStart(2, '0');
  $('#craft-name').innerHTML = c.name + '<span class="en">' + c.en + '</span>';
  $('#craft-tag').textContent = c.tag;
  $('#craft-lede').textContent = c.lede;
  $('#hero-facts').innerHTML = c.heroFacts.map((f) =>
    '<div><b>' + f.v + '<i>' + f.u + '</i></b><span>' + f.l + '</span></div>').join('');
  $('#stage-model').textContent = c.en + ' · ' + c.modelInfo.method;
  document.title = c.name + ' · 深空档案';

  $('#parts-flow').innerHTML = Object.entries(c.parts).map(([key, p]) =>
    '<article class="pcard" data-part="' + key + '">' +
      '<button class="go" data-focus="' + key + '">回到模型 ↗</button>' +
      '<p class="no">' + p.no + '</p>' +
      '<h2>' + p.title + '</h2>' +
      '<p class="en">' + p.en + '</p>' +
      '<p>' + p.text + '</p>' +
      '<div class="spec"><b>' + p.value + '</b><span>' + p.unit + '</span></div>' +
    '</article>').join('');

  $('#specs').innerHTML = c.specs.map((s) =>
    '<div><b>' + s.v + '<i>' + s.u + '</i></b><span>' + s.l + '</span><small>' + s.d + '</small></div>').join('');
  $('#fact').textContent = c.fact;

  $('#reads').innerHTML = c.readings.map((r) =>
    '<article class="read"><p class="no">' + r.no + '</p><h3>' + r.title + '</h3>' +
    '<p>' + r.body + '</p><ul>' + r.facts.map((f) => '<li>' + f + '</li>').join('') + '</ul></article>').join('');

  const tabs = c.timeline.tabs;
  const tabsEl = $('#tl-tabs');
  tabsEl.innerHTML = tabs.length > 1
    ? tabs.map((t, i) => '<button role="tab" data-tab="' + i + '" aria-selected="' + (i === 0) + '">' + t.name + '</button>').join('')
    : '<span class="label tl-single">' + tabs[0].name + '</span>';
  renderTimeline(tabs[0].items);

  const m = c.modelInfo;
  $('#model-facts').innerHTML = [
    ['三角面', m.tri], ['顶点', m.vert], ['网格', m.mesh],
    ['材质', m.mat], ['内嵌贴图', m.tex], ['建模方式', m.method],
  ].map(([label, val], i) =>
    '<div><b class="' + (i === 5 ? 'word' : '') + '">' + val + '</b><span>' + label + '</span></div>').join('');
  $('#model-note').textContent = m.note;
  const dl = $('#model-dl');
  dl.href = ASSET + c.model;
  dl.setAttribute('download', c.download.file);
  $('#model-size').textContent = 'GLB · ' + c.download.size;

  $('#sources').innerHTML = c.sources.map((s) =>
    '<a class="src" href="' + s.url + '" target="_blank" rel="noreferrer"><b>' + s.l + '</b><span>' + s.n + ' ↗</span></a>').join('');

  $$('#switch button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.craft === id)));
  observeCards();
}

function renderTimeline(items) {
  $('#timeline').innerHTML = items.map((i) =>
    '<li><time>' + i.d + '</time><div><h3>' + i.t + '</h3><p>' + i.x + '</p></div></li>').join('');
}

$('#tl-tabs').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-tab]');
  if (!btn) return;
  $$('#tl-tabs button').forEach((b) => b.setAttribute('aria-selected', String(b === btn)));
  renderTimeline(craft[active].timeline.tabs[Number(btn.dataset.tab)].items);
});

const maxMass = Math.max(...compare.map((r) => r.mass));
$('#compare-list').innerHTML = compare.map((r) => {
  const pct = Math.max(Math.round(r.mass / maxMass * 100), 4);
  return '<div class="cmp-row" data-jump="' + r.id + '">' +
    '<div class="cmp-name">' + r.name + '<em>' + r.year + '</em></div>' +
    '<div class="cmp-mass">' + r.massText + '</div>' +
    '<div class="cmp-bar"><i style="width:' + pct + '%"></i></div>' +
    '<div class="cmp-size">' + r.size + '</div></div>';
}).join('');
$('#compare-list').addEventListener('click', (e) => {
  const row = e.target.closest('[data-jump]');
  if (row) selectCraft(row.dataset.jump, { scroll: true });
});

/* ---------------- 三维 ---------------- */

const loadingEl = $('#loading');
const pctEl = $('#loading-pct');
const canvas = $('#scene');
const hotspotsEl = $('#hotspots');
let renderer, scene, camera, controls;
let models = {};
let current = null;
let hotspots = [];
let occlusionFrame = 0;
let selectedPart = null;
let fly = null;
let labelsOn = true;
let wireOn = false;
let lastT = 0;
let visible = true;

function makeRenderer() {
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(36, 1, 0.05, 400);
  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.enablePan = true;
  controls.panSpeed = 0.7;
  controls.rotateSpeed = 0.55;
  controls.zoomSpeed = 0.7;
  controls.autoRotateSpeed = 0.3;
  controls.minPolarAngle = 0.08;
  controls.maxPolarAngle = Math.PI * 0.94;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  scene.environment = pmrem.fromScene(room, 0.04).texture;
  scene.environmentIntensity = 0.55;
  room.dispose();
  pmrem.dispose();

  scene.add(new THREE.HemisphereLight(0xc8dcf2, 0x2b2a30, 1.35));
  const key = new THREE.DirectionalLight(0xffe8c8, 2.6); key.position.set(-7, 11, -9); scene.add(key);
  const fill = new THREE.DirectionalLight(0x93c1ee, 1.9); fill.position.set(8, 4, 6); scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffffff, 0.9); rim.position.set(0, -6, -7); scene.add(rim);

  let seed = 1977;
  const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const pos = [], col = [];
  for (let i = 0; i < 720; i++) {
    const th = rnd() * Math.PI * 2, ph = Math.acos(rnd() * 2 - 1), r = 70 + rnd() * 70;
    pos.push(r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th));
    const b = 0.22 + rnd() * 0.5;
    col.push(b * 0.86, b * 0.93, b);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  scene.add(new THREE.Points(g, new THREE.PointsMaterial({ size: 0.085, vertexColors: true, transparent: true, opacity: 0.62, depthWrite: false })));

  const stop = () => {
    fly = null;
    if (controls.autoRotate) {
      controls.autoRotate = false;
      $('#tool-rotate').setAttribute('aria-pressed', 'false');
    }
  };
  canvas.addEventListener('pointerdown', stop);
  canvas.addEventListener('wheel', stop, { passive: true });
}

function prepare(root, id, boundsOnly = false) {
  const meshes = [], defaults = new Map(), pts = [];
  root.traverse((o) => {
    if (!o.isMesh) return;
    if (o.material && o.material.name === 'clear') { o.material.visible = false; return; }
    meshes.push(o);
    for (const mat of (Array.isArray(o.material) ? o.material : [o.material])) {
      mat.side = THREE.DoubleSide;
      if (mat.map) mat.map.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      if (id === 'voyager') {
        mat.metalness = mat.name === 'brass' ? 0.8 : 0.12;
        mat.roughness = mat.name === 'brass' ? 0.42 : 0.64;
      }
      // These ISS atlases use alpha for cutouts, not translucent surfaces.
      // Blending the large combined meshes produces incorrect depth ordering.
      if (id === 'iss' && ['ELC_Base', 'Truss', 'IROSA'].includes(mat.name)) {
        mat.transparent = false;
        mat.alphaTest = .5;
        mat.alphaToCoverage = true;
        mat.depthWrite = true;
      }
      defaults.set(mat, { map: mat.map, color: mat.color.clone(), metalness: mat.metalness, roughness: mat.roughness });
    }
  });
  root.updateMatrixWorld(true);
  const v = new THREE.Vector3();
  for (const mesh of meshes) {
    // The ISS has millions of vertices. Bounds keep framing conservative without
    // allocating a second object for every decoded vertex.
    if (boundsOnly) {
      mesh.geometry.computeBoundingBox();
      const { min, max } = mesh.geometry.boundingBox;
      for (const x of [min.x, max.x]) for (const y of [min.y, max.y]) for (const z of [min.z, max.z]) {
        pts.push(new THREE.Vector3(x, y, z).applyMatrix4(mesh.matrixWorld));
      }
      continue;
    }
    const p = mesh.geometry.attributes.position;
    for (let i = 0; i < p.count; i++) pts.push(v.fromBufferAttribute(p, i).applyMatrix4(mesh.matrixWorld).clone());
  }
  scene.add(root);
  root.visible = false;
  return { root: root, meshes: meshes, defaults: defaults, pts: pts };
}

const loads = new Map();
const dracoLoader = new DRACOLoader().setDecoderPath(ASSET + 'draco/').setWorkerLimit(2);
function loadModel(id) {
  if (models[id]) return Promise.resolve(models[id]);
  if (loads.has(id)) return loads.get(id);
  const c = craft[id];
  const job = new GLTFLoader()
    .setDRACOLoader(dracoLoader)
    .loadAsync(ASSET + c.model, (ev) => {
      if (ev.total) pctEl.textContent = Math.round(ev.loaded / ev.total * 100) + '%';
      else pctEl.textContent = (ev.loaded / 1e6).toFixed(1) + ' MB';
    })
    .then((gltf) => {
      gltf.scene.scale.multiplyScalar(c.view.scale || 1);
      models[id] = prepare(gltf.scene, id, c.view.boundsOnly);
      loads.delete(id);
      return models[id];
    })
    .catch((err) => {
      loads.delete(id);
      throw err;
    });
  loads.set(id, job);
  return job;
}

function frameAll(m) {
  const c = craft[active];
  // 顶点质心更贴近本体；再按投影尺寸求最近可用距离，长臂不浪费画面
  const target = new THREE.Vector3();
  for (const p of m.pts) target.add(p);
  target.divideScalar(m.pts.length || 1);
  const aim = new THREE.Vector3().fromArray(c.view.target);
  const dir = new THREE.Vector3().fromArray(c.view.position).sub(aim).normalize();
  const right = new THREE.Vector3().crossVectors(camera.up, dir).normalize();
  const up = new THREE.Vector3().crossVectors(dir, right).normalize();
  let radius = 0;
  for (const p of m.pts) radius = Math.max(radius, p.distanceTo(target));
  const vfov = THREE.MathUtils.degToRad(camera.fov);
  const hfov = 2 * Math.atan(Math.tan(vfov / 2) * Math.max(camera.aspect, 0.2));
  const tanH = Math.tan(hfov / 2) * 0.86;
  const tanV = Math.tan(vfov / 2) * 0.78;
  const rel = new THREE.Vector3();
  let dist = 1.2;
  for (const p of m.pts) {
    rel.copy(p).sub(target);
    const depth = rel.dot(dir);
    dist = Math.max(dist,
      depth + Math.abs(rel.dot(right)) / tanH,
      depth + Math.abs(rel.dot(up)) / tanV);
  }
  // 各航天器的细长部件差异很大，按自身尺度微调景别
  dist *= c.view.fit || 1;
  // 画面中心略向右偏，给左侧的坐标标注留出呼吸
  const pos = target.clone().addScaledVector(dir, dist);
  pos.addScaledVector(right, -dist * 0.04);
  return { target: target, pos: pos };
}

function clearControlMotion() {
  const damping = controls.enableDamping;
  controls.enableDamping = false;
  controls.update();
  controls.enableDamping = damping;
}

function applyModel(id, opt) {
  clearControlMotion();
  const immediate = opt && opt.immediate;
  const c = craft[id];
  for (const k of Object.keys(models)) models[k].root.visible = k === id;
  current = models[id];
  controls.minDistance = c.view.min;
  controls.maxDistance = c.view.max;
  renderer.toneMappingExposure = c.view.exposure;
  camera.up.fromArray(c.view.up).normalize();
  applyWire(false);
  const f = frameAll(current);
  controls.cursor.copy(f.target);
  controls.target.copy(f.target);
  if (immediate || reduced) {
    camera.position.copy(f.pos);
    controls.update();
    fly = null;
  } else {
    fly = { t0: performance.now(), dur: 1000, fromPos: camera.position.clone(), toPos: f.pos, fromT: controls.target.clone(), toT: f.target };
    controls.target.copy(f.target);
  }
  buildHotspots();
  updateHud(null);
  selectedPart = null;
  $$('.pcard').forEach((p) => p.classList.remove('on'));
}

function buildHotspots() {
  const c = craft[active];
  hotspotsEl.replaceChildren();
  hotspots = Object.entries(c.parts).map(([key, p]) => {
    const el = document.createElement('button');
    el.className = 'hotspot';
    el.type = 'button';
    el.textContent = p.no;
    el.title = p.title;
    el.setAttribute('aria-label', '查看' + p.title);
    el.addEventListener('click', () => focusPart(key));
    hotspotsEl.append(el);
    return { key: key, el: el, point: new THREE.Vector3().fromArray(p.anchor), occluded: false, checkedFrom: new THREE.Vector3(Infinity, Infinity, Infinity) };
  });
}

function updateHud(key) {
  const c = craft[active];
  if (!key) {
    $('#hud-now').textContent = 'OVERVIEW / 整体';
    $('#hud-what').innerHTML = '拖动查看每一处结构<small>' + c.en + ' · ' + c.modelInfo.method + '</small>';
    return;
  }
  const p = c.parts[key];
  $('#hud-now').textContent = '部件 ' + p.no + ' / ' + Object.keys(c.parts).length;
  $('#hud-what').innerHTML = p.title + '<small>' + p.en + '</small>';
}

function focusPart(key) {
  clearControlMotion();
  const p = craft[active].parts[key];
  selectedPart = key;
  const target = new THREE.Vector3().fromArray(p.target);
  controls.cursor.copy(target);
  const pos = target.clone().add(new THREE.Vector3().fromArray(p.offset));
  if (reduced) { camera.position.copy(pos); controls.target.copy(target); controls.update(); }
  else fly = { t0: performance.now(), dur: 1050, fromPos: camera.position.clone(), toPos: pos, fromT: controls.target.clone(), toT: target };
  updateHud(key);
  hotspots.forEach((h) => h.el.classList.toggle('on', h.key === key));
  $$('.pcard').forEach((p2) => p2.classList.toggle('on', p2.dataset.part === key));
}

function resetView() {
  clearControlMotion();
  selectedPart = null;
  cardLockUntil = performance.now() + 1200;
  updateHud(null);
  hotspots.forEach((h) => h.el.classList.remove('on'));
  $$('.pcard').forEach((p) => p.classList.remove('on'));
  const f = frameAll(current);
  controls.cursor.copy(f.target);
  if (reduced) { camera.position.copy(f.pos); controls.target.copy(f.target); controls.update(); }
  else fly = { t0: performance.now(), dur: 950, fromPos: camera.position.clone(), toPos: f.pos, fromT: controls.target.clone(), toT: f.target };
}

function applyWire(on) {
  wireOn = on;
  $('#tool-wire').setAttribute('aria-pressed', String(on));
  if (!current) return;
  for (const [mat, d] of current.defaults) {
    mat.wireframe = on;
    mat.map = on ? null : d.map;
    mat.color.copy(on ? new THREE.Color(0x8fb7c7) : d.color);
    mat.metalness = on ? 0 : d.metalness;
    mat.roughness = on ? 0.95 : d.roughness;
    mat.needsUpdate = true;
  }
}

function size() {
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(rect.width, 1), h = Math.max(rect.height, 1);
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

function projectHotspots() {
  if (!current || !labelsOn) return;
  const w = canvas.clientWidth, h = canvas.clientHeight;
  const v = new THREE.Vector3();
  const ray = new THREE.Raycaster();
  const dir = new THREE.Vector3();
  // Dense models spread occlusion rays across frames; a stationary camera can
  // reuse the result. Screen projection still updates for every label each frame.
  const dense = current.pts.length > 100000;
  const checkIndex = occlusionFrame++ % hotspots.length;
  for (const [index, hs] of hotspots.entries()) {
    v.copy(hs.point).project(camera);
    const x = (v.x * 0.5 + 0.5) * w;
    const y = (-v.y * 0.5 + 0.5) * h;
    let show = v.z > -1 && v.z < 1 && x > 26 && x < w - 26 && y > 96 && y < h - 96;
    if (show && craft[active].view.occlusion !== false && (!dense || index === checkIndex) && hs.checkedFrom.distanceToSquared(camera.position) > 1e-8) {
      dir.copy(hs.point).sub(camera.position);
      const d = dir.length();
      ray.set(camera.position, dir.normalize());
      const hit = ray.intersectObjects(current.meshes, false)[0];
      hs.occluded = !!hit && hit.distance < d - (active === 'voyager' ? 0.55 : 0.045);
      hs.checkedFrom.copy(camera.position);
    }
    if (hs.occluded) show = false;
    hs.el.style.visibility = show ? 'visible' : 'hidden';
    hs.el.style.transform = 'translate(' + (x - 14) + 'px, ' + (y - 14) + 'px)';
  }
}

function tick(time) {
  if (!renderer) return;
  if (document.hidden || !visible) { lastT = time; return; }
  const dt = Math.min((time - lastT) / 1000, 0.05);
  lastT = time;
  if (fly) {
    const t = Math.min((time - fly.t0) / fly.dur, 1);
    const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    camera.position.lerpVectors(fly.fromPos, fly.toPos, e);
    controls.target.lerpVectors(fly.fromT, fly.toT, e);
    controls.cursor.copy(controls.target);
    if (t >= 1) fly = null;
  }
  // Limit panning to 30% of the shorter viewport dimension. The limit follows
  // zoom and each guided view, so close-ups cannot drift arbitrarily far away.
  controls.maxTargetRadius = camera.position.distanceTo(controls.target)
    * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
    * Math.min(camera.aspect, 1) * .6;
  controls.update(dt);
  renderer.render(scene, camera);
  if (labelsOn) projectHotspots();
}

async function boot() {
  makeRenderer();
  await loadModel(active);
  applyModel(active, { immediate: true });
  size();
  new ResizeObserver(() => { size(); projectHotspots(); }).observe(canvas);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 }).observe(canvas);
  renderer.setAnimationLoop(tick);
  loadingEl.classList.add('done');
  setTimeout(() => { loadingEl.hidden = true; }, 700);
  for (const id of craftOrder) if (id !== active && !craft[id].lazy) loadModel(id).catch(() => {});
}

function selectCraft(id, opt) {
  if (!id) return;
  // 切换时的整段滚动不应被当作阅读行为
  cardLockUntil = performance.now() + (opt && opt.scroll ? 2600 : 900);
  if (id === active && current) { if (opt && opt.scroll) scrollToStage(); return; }
  renderCraft(id);
  refreshSongForCraft();
  if (!models[id]) {
    loadingEl.hidden = false;
    loadingEl.classList.remove('done');
    loadModel(id).then(() => {
      if (active !== id) return;
      applyModel(id);
      loadingEl.classList.add('done');
      setTimeout(() => { if (active === id) loadingEl.hidden = true; }, 500);
    }).catch((err) => { if (active === id) showLoadError(err); });
  } else {
    applyModel(id);
    loadingEl.classList.add('done');
    loadingEl.hidden = true;
  }
  if (opt && opt.scroll) { scrollToStage(); cardLockUntil = performance.now() + 2600; }
  else if (scrollY > 200 && $('#deck').getBoundingClientRect().bottom > 0) scrollToStage();
}

function scrollToStage() {
  const top = $('#deck').getBoundingClientRect().top + scrollY + 20;
  scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
}

function showLoadError(err) {
  console.error('model', err);
  loadingEl.hidden = false;
  loadingEl.classList.remove('done');
  loadingEl.innerHTML = '<div class="load-error">模型未能载入。<button onclick="location.reload()">重新载入</button></div>';
}

/* ---------------- 控件 ---------------- */

$('#tool-rotate').addEventListener('click', (e) => {
  const on = e.currentTarget.getAttribute('aria-pressed') !== 'true';
  controls.autoRotate = on;
  e.currentTarget.setAttribute('aria-pressed', String(on));
});
$('#tool-labels').addEventListener('click', (e) => {
  labelsOn = !labelsOn;
  hotspotsEl.hidden = !labelsOn;
  if (labelsOn) projectHotspots();
  e.currentTarget.setAttribute('aria-pressed', String(labelsOn));
});
$('#tool-wire').addEventListener('click', () => applyWire(!wireOn));
$('#tool-reset').addEventListener('click', () => { if (current) resetView(); });
$('#tool-full').addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await $('#deck').requestFullscreen();
  } catch (e) { /* 全屏不可用时保持原状 */ }
});
if (!document.fullscreenEnabled) $('#tool-full').hidden = true;

canvas.addEventListener('keydown', (e) => {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '=', '-', 'Home'];
  if (!keys.includes(e.key)) return;
  e.preventDefault();
  fly = null;
  controls.autoRotate = false;
  $('#tool-rotate').setAttribute('aria-pressed', 'false');
  if (e.key === 'Home') { resetView(); return; }
  const sph = new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target));
  if (e.key === 'ArrowLeft') sph.theta -= 0.1;
  if (e.key === 'ArrowRight') sph.theta += 0.1;
  if (e.key === 'ArrowUp') sph.phi -= 0.08;
  if (e.key === 'ArrowDown') sph.phi += 0.08;
  if (e.key === '+' || e.key === '=') sph.radius *= 0.9;
  if (e.key === '-') sph.radius *= 1.1;
  sph.phi = THREE.MathUtils.clamp(sph.phi, controls.minPolarAngle, controls.maxPolarAngle);
  sph.radius = THREE.MathUtils.clamp(sph.radius, controls.minDistance, controls.maxDistance);
  camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(sph));
  controls.update();
});

document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && selectedPart) resetView(); });

let cardObserver;
let cardLockUntil = 0;
function observeCards() {
  if (cardObserver) cardObserver.disconnect();
  // 只在卡片进入视口中带时联动镜头，避免停在页首时误触发特写
  cardObserver = new IntersectionObserver((entries) => {
    if (performance.now() < cardLockUntil) return;
    for (const en of entries) {
      if (en.isIntersecting) {
        const key = en.target.dataset.part;
        if (key !== selectedPart && current) focusPart(key);
      }
    }
  }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });
  $$('.pcard').forEach((c) => cardObserver.observe(c));
}

$('#parts-flow').addEventListener('click', (e) => {
  const b = e.target.closest('[data-focus]');
  if (b) {
    cardLockUntil = performance.now() + 2600;
    focusPart(b.dataset.focus);
    scrollToStage();
  }
});

const navLinks = $$('[data-nav]');
const sections = ['deck', 'data', 'notes', 'chrono', 'sound', 'archive']
  .map((id) => document.getElementById(id)).filter(Boolean);
const navObs = new IntersectionObserver((entries) => {
  for (const en of entries) if (en.isIntersecting) {
    navLinks.forEach((a) => a.classList.toggle('on', a.dataset.nav === en.target.id));
  }
}, { rootMargin: '-72px 0px -62% 0px', threshold: 0 });
sections.forEach((s) => navObs.observe(s));

/* ---------------- 视频 ---------------- */

const videoStage = $('#video-stage');
const videoList = $('#video-list');
let videoIndex = 0;

function renderVideoList() {
  videoList.innerHTML = videos.map((v, i) =>
    '<button class="vitem' + (i === videoIndex ? ' on' : '') + '" data-video="' + i + '" aria-pressed="' + (i === videoIndex) + '">' +
      '<span class="vi">0' + (i + 1) + '</span>' +
      '<span class="vt">' + v.title + '｜' + v.craftName + '</span>' +
      '<span class="vm">' + v.duration + ' · ' + v.play + '</span>' +
    '</button>').join('');
}

function paintPoster() {
  const v = videos[videoIndex];
  videoStage.innerHTML =
    '<button class="poster" id="video-play" aria-label="播放《' + v.title + '》">' +
      '<span class="play"></span>' +
      '<span class="pl">' + v.craftName + ' · ' + v.date + '</span>' +
      '<span class="pt">《' + v.title + '》</span>' +
      '<span class="ps">' + v.sub + ' · ' + v.original + '</span>' +
    '</button>';
  $('#video-play').addEventListener('click', playVideo);
}

function playVideo() {
  const v = videos[videoIndex];
  videoStage.innerHTML = '<iframe src="https://player.bilibili.com/player.html?bvid=' + v.bvid +
    '&page=1&autoplay=1&danmaku=1&high_quality=1" title="《' + v.title + '》"' +
    ' allow="autoplay; fullscreen; picture-in-picture" allowfullscreen' +
    ' referrerpolicy="no-referrer-when-downgrade" scrolling="no"></iframe>';
}

videoList.addEventListener('click', (e) => {
  const b = e.target.closest('[data-video]');
  if (!b) return;
  videoIndex = Number(b.dataset.video);
  renderVideoList();
  paintPoster();
});

/* ---------------- 音乐 ---------------- */

const audio = new Audio();
audio.preload = 'metadata';
const seek = $('#seek'), fill = $('#seek-fill'), dot = $('#seek-dot');
const tNow = $('#t-now'), tAll = $('#t-all');
const playBtn = $('#play'), vinyl = $('#vinyl');
let songIndex = 0;

const SONG_URL = (id) => 'https://music.163.com/song/media/outer/url?id=' + id + '.mp3';

function fmt(s) {
  if (!Number.isFinite(s)) return '00:00';
  const m = Math.floor(s / 60), x = Math.floor(s % 60);
  return String(m).padStart(2, '0') + ':' + String(x).padStart(2, '0');
}

function renderSongs() {
  $('#song-list').innerHTML = songs.map((s, i) =>
    '<button class="song' + (i === songIndex ? ' on' : '') + '" data-song="' + i + '" aria-pressed="' + (i === songIndex) + '">' +
      '<span><span class="st">' + s.title + '</span><span class="sa">' + s.artists + '</span></span>' +
      '<span class="sd">' + s.duration + '</span></button>').join('');
}

function loadSong(i, autoplay) {
  const s = songs[i];
  songIndex = i;
  renderSongs();
  $('#song-title').textContent = s.title;
  $('#song-meta').textContent = s.artists;
  $('#song-link').href = 'https://music.163.com/song?id=' + s.id;
  audio.src = SONG_URL(s.id);
  audio.load();
  fill.style.width = '0%'; dot.style.left = '0%'; seek.setAttribute('aria-valuenow', '0');
  tNow.textContent = '00:00'; tAll.textContent = s.duration;
  playBtn.classList.remove('playing'); playBtn.setAttribute('aria-label', '播放');
  vinyl.classList.remove('spin');
  if (officialMode) {
    $('#official-frame').src = 'https://music.163.com/outchain/player?type=2&id=' + s.id + '&auto=0&height=66';
    return;
  }
  if (autoplay) togglePlay();
}

function togglePlay() {
  if (audio.paused) audio.play().catch(() => {});
  else audio.pause();
}

playBtn.addEventListener('click', togglePlay);
audio.addEventListener('play', () => {
  playBtn.classList.add('playing'); playBtn.setAttribute('aria-label', '暂停');
  vinyl.classList.add('spin');
});
audio.addEventListener('pause', () => {
  playBtn.classList.remove('playing'); playBtn.setAttribute('aria-label', '播放');
  vinyl.classList.remove('spin');
});
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const p = audio.currentTime / audio.duration * 100;
  fill.style.width = p + '%'; dot.style.left = p + '%';
  seek.setAttribute('aria-valuenow', String(Math.round(p)));
  tNow.textContent = fmt(audio.currentTime);
});
audio.addEventListener('loadedmetadata', () => { tAll.textContent = fmt(audio.duration); });
audio.addEventListener('canplay', () => {
  if (!officialMode) $('#official').hidden = true;
});
audio.addEventListener('ended', () => { loadSong((songIndex + 1) % songs.length, true); });
audio.addEventListener('error', showPlayerFallback);
// 直链可用时用页内播放器，不可用时自动换成网易云官方外链播放器
let officialMode = false;
function showPlayerFallback() {
  if (officialMode) return;
  officialMode = true;
  const player = $('.nowplay .player');
  player.classList.add('official-mode');
  const host = $('#official');
  host.hidden = false;
  $('#official-frame').src = 'https://music.163.com/outchain/player?type=2&id=' +
    songs[songIndex].id + '&auto=0&height=66';
}

$('#song-list').addEventListener('click', (e) => {
  const b = e.target.closest('[data-song]');
  if (!b) return;
  const i = Number(b.dataset.song);
  if (i === songIndex && !audio.paused) { audio.pause(); return; }
  loadSong(i, true);
});

seek.addEventListener('click', (e) => {
  const r = seek.getBoundingClientRect();
  const p = (e.clientX - r.left) / r.width;
  if (audio.duration) audio.currentTime = Math.max(0, Math.min(1, p)) * audio.duration;
});
seek.addEventListener('keydown', (e) => {
  if (!audio.duration) return;
  if (e.key === 'ArrowRight') audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
  if (e.key === 'ArrowLeft') audio.currentTime = Math.max(0, audio.currentTime - 5);
});

function refreshSongForCraft() {
  const i = songs.findIndex((s) => s.craft === active);
  if (i >= 0 && i !== songIndex && audio.paused) loadSong(i, false);
}

/* ---------------- 启动 ---------------- */

renderCraft(active);
renderVideoList();
paintPoster();
renderSongs();
loadSong(0, false);
boot().catch(showLoadError);
