import * as THREE from 'three';

// Metres. Main dimensions: NASA History / Asif A. Siddiqi.
export function createSputnik() {
  const model = new THREE.Group();
  model.name = 'Sputnik 1';
  model.userData = { units: 'metres', diameter: .58, antennaLengths: [2.9, 2.9, 2.4, 2.4], source: 'https://www.nasa.gov/history/sputnik/siddiqi.html' };
  const aluminium = new THREE.MeshStandardMaterial({ name: 'Polished aluminium', color: 0xdce3e9, metalness: 1, roughness: .2 });
  const steel = new THREE.MeshStandardMaterial({ name: 'Antenna alloy', color: 0xb9c4d0, metalness: .92, roughness: .29 });
  const seamMaterial = new THREE.MeshStandardMaterial({ name: 'Hemisphere joint', color: 0x656d75, metalness: .9, roughness: .35 });
  const insulator = new THREE.MeshStandardMaterial({ name: 'Antenna insulation', color: 0xbbb7a7, metalness: .05, roughness: .55 });
  function mesh(name, geometry, material, position = [0, 0, 0]) {
    const object = new THREE.Mesh(geometry, material);
    object.name = name;
    object.position.set(...position);
    model.add(object);
    return object;
  }
  mesh('58 cm pressure shell', new THREE.SphereGeometry(.29, 96, 64), aluminium);
  const seam = mesh('Equatorial shell seam', new THREE.TorusGeometry(.2899, .0013, 8, 160), seamMaterial);
  seam.rotation.x = Math.PI / 2;
  // Simplified flange fasteners and sockets; not manufacturing drawings.
  for (let i = 0; i < 24; i++) {
    const angle = i * Math.PI / 12;
    const direction = new THREE.Vector3(Math.cos(angle), .02, Math.sin(angle)).normalize();
    const screw = mesh(`Flange fastener ${i + 1}`, new THREE.CylinderGeometry(.0023, .0023, .0015, 8), steel);
    screw.position.copy(direction).multiplyScalar(.2901);
    screw.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
  }
  const antennas = [
    { direction: [-.55, -.78, .28], length: 2.9 },
    { direction: [.55, -.78, -.28], length: 2.9 },
    { direction: [.25, -.78, .56], length: 2.4 },
    { direction: [-.25, -.78, -.56], length: 2.4 },
  ];
  for (const [index, antenna] of antennas.entries()) {
    const direction = new THREE.Vector3(...antenna.direction).normalize();
    const base = direction.clone().multiplyScalar(.285);
    const rotation = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    const socket = mesh(`Antenna ${index + 1} mount`, new THREE.CylinderGeometry(.013, .023, .055, 24), steel);
    socket.position.copy(base).addScaledVector(direction, .018);
    socket.quaternion.copy(rotation);
    const collar = mesh(`Antenna ${index + 1} insulator`, new THREE.CylinderGeometry(.0135, .0135, .018, 24), insulator);
    collar.position.copy(base).addScaledVector(direction, .038);
    collar.quaternion.copy(rotation);
    const rod = mesh(`Antenna ${index + 1} — ${antenna.length} m`, new THREE.CylinderGeometry(.0014, .006, antenna.length, 12, 12), steel);
    rod.position.copy(base).addScaledVector(direction, antenna.length / 2);
    rod.quaternion.copy(rotation);
    rod.userData.lengthMetres = antenna.length;
    for (let joint = 1; joint <= 3; joint++) {
      const fraction = joint / 4;
      const radius = THREE.MathUtils.lerp(.006, .0014, fraction) + .0005;
      const sleeve = mesh(`Antenna ${index + 1} joint ${joint}`, new THREE.CylinderGeometry(radius, radius, .014, 12), steel);
      sleeve.position.copy(base).addScaledVector(direction, antenna.length * fraction);
      sleeve.quaternion.copy(rotation);
    }
  }
  return model;
}
