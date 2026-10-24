import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// Metres. Main dimensions: National Museum of China, structural test satellite.
export function createDongfanghong() {
  const root = new THREE.Group();
  root.name = 'Dong Fang Hong 1';
  root.userData = { units: 'metres', bodyDiameter: 1, shellPanels: 72, shortwaveAntennaLengths: [3, 3, 3, 3], topAntennaLength: .4, source: 'https://www.chnmuseum.cn/zp/jzrgs/202203/t20220303_254149.shtml' };
  const aluminium = new THREE.MeshStandardMaterial({ name: 'Aluminium copper alloy', color: 0xb5bdc3, metalness: 1, roughness: .23 });
  const muted = new THREE.MeshStandardMaterial({ name: 'Muted silver panels', color: 0x45525d, metalness: 1, roughness: .27 });
  const bright = new THREE.MeshStandardMaterial({ name: 'Brushed silver panels', color: 0xd6d9d8, metalness: 1, roughness: .2 });
  const dark = new THREE.MeshStandardMaterial({ name: 'Recessed antenna apertures', color: 0x172025, metalness: .25, roughness: .65 });
  const trim = new THREE.MeshStandardMaterial({ name: 'Seams and hardware', color: 0x7a858b, metalness: .95, roughness: .3 });
  const ceramic = new THREE.MeshStandardMaterial({ name: 'Antenna insulators', color: 0xb9ad90, metalness: .05, roughness: .6 });
  const hardware = new Map();
  function mesh(name, geometry, material) {
    const object = new THREE.Mesh(geometry, material);
    object.name = name;
    root.add(object);
    return object;
  }
  function batch(geometry, material, position, quaternion = new THREE.Quaternion()) {
    geometry.applyMatrix4(new THREE.Matrix4().compose(position, quaternion, new THREE.Vector3(1, 1, 1)));
    if (!hardware.has(material)) hardware.set(material, []);
    hardware.get(material).push(geometry);
  }
  const Y = new THREE.Vector3(0, 1, 0);
  const Z = new THREE.Vector3(0, 0, 1);
  function rod(name, start, direction, length, radius, endRadius, material) {
    const item = mesh(name, new THREE.CylinderGeometry(endRadius, radius, length, 16), material);
    item.position.copy(start).addScaledVector(direction, length / 2);
    item.quaternion.setFromUnitVectors(Y, direction);
    return item;
  }
  // 12 meridians × 6 latitude bands; equatorial trim covers the centre seam.
  // Panel allocation and hardware spacing are reconstructed from the museum photo.
  const point = (latitude, sector) => {
    const phi = latitude * Math.PI / 180, theta = sector * Math.PI / 6;
    return new THREE.Vector3(.5 * Math.cos(phi) * Math.cos(theta), .5 * Math.sin(phi), .5 * Math.cos(phi) * Math.sin(theta));
  };
  for (let band = 0; band < 6; band++) {
    for (let sector = 0; sector < 12; sector++) {
      const high = 90 - band * 30, low = high - 30;
      let corners = [point(high, sector), point(high, sector + 1), point(low, sector + 1), point(low, sector)];
      if (band === 0) corners.splice(1, 1);
      if (band === 5) corners.splice(2, 1);
      const center = corners.reduce((sum, p) => sum.add(p), new THREE.Vector3()).divideScalar(corners.length);
      const normal = new THREE.Vector3().subVectors(corners[1], corners[0]).cross(new THREE.Vector3().subVectors(corners[2], corners[0])).normalize();
      if (normal.dot(center) < 0) { corners.reverse(); normal.negate(); }
      const inset = corners.map(p => p.clone().lerp(center, .009));
      const positions = [];
      for (let i = 1; i < inset.length - 1; i++) positions.push(...inset[0], ...inset[i], ...inset[i + 1]);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.computeVertexNormals();
      const material = band < 2 && sector % 4 === 1 ? muted : sector % 3 === 0 ? bright : aluminium;
      mesh(`Shell panel ${band * 12 + sector + 1}`, geometry, material);
      // Narrow joint strips and rivet rows follow the actual flat panel edges.
      for (let edge = 0; edge < corners.length; edge++) {
        const a = corners[edge].clone().lerp(center, .035).addScaledVector(normal, .0006);
        const b = corners[(edge + 1) % corners.length].clone().lerp(center, .035).addScaledVector(normal, .0006);
        const count = Math.max(2, Math.round(a.distanceTo(b) / .029));
        for (let k = 1; k < count; k++) {
          const p = a.clone().lerp(b, k / count);
          if (Math.abs(p.y) < .065) continue;
          batch(new THREE.CylinderGeometry(.0018, .0018, .0012, 6), trim, p, new THREE.Quaternion().setFromUnitVectors(Y, normal));
        }
      }
    }
  }
  // An inner dark shell closes the narrow seams between individual panels.
  mesh('Inner shell behind seams', new THREE.SphereGeometry(.489, 12, 6), dark);
  mesh('Equatorial belt', new THREE.CylinderGeometry(.499, .499, .112, 12, 1, true), aluminium);
  for (const y of [-.058, .058]) {
    const ring = mesh('Belt flange', new THREE.CylinderGeometry(.502, .502, .006, 12, 1, true), trim);
    ring.position.y = y;
  }
  for (let sector = 0; sector < 12; sector++) {
    const theta = (sector + .5) * Math.PI / 6;
    const outward = new THREE.Vector3(Math.cos(theta), 0, Math.sin(theta));
    const along = new THREE.Vector3(-Math.sin(theta), 0, Math.cos(theta));
    const q = new THREE.Quaternion().setFromUnitVectors(Z, outward);
    for (const offset of [-.065, .065]) {
      const p = outward.clone().multiplyScalar(.484).addScaledVector(along, offset);
      batch(new THREE.BoxGeometry(.051, .036, .004), trim, p, q);
      batch(new THREE.BoxGeometry(.041, .025, .005), dark, p.clone().addScaledVector(outward, .002), q);
    }
    for (const offset of [-.11, -.033, .033, .11]) {
      for (const y of [-.043, .043]) batch(new THREE.CylinderGeometry(.0021, .0021, .0015, 6), trim,
        outward.clone().multiplyScalar(.4845).addScaledVector(along, offset).add(new THREE.Vector3(0, y, 0)), new THREE.Quaternion().setFromUnitVectors(Y, outward));
    }
  }
  for (let i = 0; i < 4; i++) {
    const theta = i * Math.PI / 2 + Math.PI / 12;
    const direction = new THREE.Vector3(Math.cos(theta), 0, Math.sin(theta));
    const base = direction.clone().multiplyScalar(.49);
    rod(`Shortwave antenna ${i + 1} mount`, base, direction, .055, .022, .017, trim);
    rod(`Shortwave antenna ${i + 1} insulator`, base.clone().addScaledVector(direction, .035), direction, .025, .016, .016, ceramic);
    const start = base.clone().addScaledVector(direction, .055);
    // Four telescoping sections, with total exposed rod length exactly 3 m.
    for (let section = 0; section < 4; section++) {
      const radius = .007 - section * .0014;
      const part = rod(`Shortwave antenna ${i + 1} section ${section + 1}`, start.clone().addScaledVector(direction, section * .75), direction, .75, radius, radius - .0005, aluminium);
      part.userData.lengthMetres = .75;
      if (section) rod(`Antenna ${i + 1} sleeve ${section}`, start.clone().addScaledVector(direction, section * .75), direction, .018, radius + .0012, radius + .0012, trim);
    }
  }
  rod('Top antenna socket', new THREE.Vector3(0, .482, 0), Y, .031, .025, .014, ceramic);
  const top = rod('40 cm ultrashortwave antenna', new THREE.Vector3(0, .505, 0), Y, .4, .0045, .0018, aluminium);
  top.userData.lengthMetres = .4;
  const cone = mesh('Lower structural coupling', new THREE.CylinderGeometry(.12, .075, .115, 12, 1, true), aluminium);
  cone.position.y = -.515;
  const bottom = mesh('Coupling rim', new THREE.TorusGeometry(.077, .007, 8, 48), trim);
  bottom.rotation.x = Math.PI / 2;
  bottom.position.y = -.5725;
  for (const [material, geometries] of hardware) {
    mesh(`Detail hardware — ${material.name}`, mergeGeometries(geometries), material);
    geometries.forEach(geometry => geometry.dispose());
  }
  return root;
}
