import { readFile, writeFile } from 'node:fs/promises';
import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { unzipSync } from 'three/addons/libs/fflate.module.js';

// Project Apollo - NASSP mesh/texture conversion. Upstream data is GPL-2.0;
// editable MSH/PNG sources and full license accompany both downloadable GLBs.
// Assembly offsets follow src_csm/saturnmesh.cpp and src_lm/lemmesh.cpp at the
// revision pinned in the source archive. No Orbiter code or executable is used.
const archive = unzipSync(new Uint8Array(await readFile(new URL('../public/models/sources/apollo-nassp.zip', import.meta.url))));
const decode = name => new TextDecoder().decode(archive[name]);
const manifest = JSON.parse(decode('manifest.json'));
const sourceURL = `${manifest.repository}/tree/${manifest.revision}`;
globalThis.FileReader = class {
  readAsArrayBuffer(blob) { blob.arrayBuffer().then(result => { this.result=result; this.onloadend?.(); }); }
};
function parseMesh(filename) {
  const lines=decode('meshes/'+filename).split(/\r?\n/).map(line=>line.split(';')[0].trim()).filter(Boolean);
  const groups=[];let i=2, group={label:filename,material:1,texture:0};
  while(i<lines.length&&!lines[i].startsWith('MATERIALS ')) {
    const [key,...args]=lines[i++].split(/\s+/);
    if(key==='LABEL')group.label=args.join(' ');
    if(key==='MATERIAL')group.material=Number(args[0]);
    if(key==='TEXTURE')group.texture=Number(args[0]);
    if(key==='GEOM') {
      const [vertices,triangles]=args.map(Number);
      group.vertices=Array.from({length:vertices},()=>lines[i++].split(/\s+/).map(Number));
      group.indices=Array.from({length:triangles},()=>lines[i++].split(/\s+/).map(Number));
      groups.push(group);group={label:filename,material:1,texture:0};
    }
  }
  const count=Number(lines[i++].split(' ')[1]);const names=lines.slice(i,i+count);i+=count;
  const materials=[];
  for(let n=0;n<count;n++) {
    if(!lines[i].startsWith('MATERIAL '))throw new Error(`Invalid material table in ${filename}`);
    i++;const diffuse=lines[i++].split(/\s+/).map(Number);i++;
    const specular=lines[i++].split(/\s+/).map(Number);const emissive=lines[i++].split(/\s+/).map(Number);
    materials.push({name:names[n],diffuse,specular,emissive});
  }
  const textureIndex=lines.findIndex(line=>line.startsWith('TEXTURES '));
  const textureCount=Number(lines[textureIndex].split(' ')[1]);
  const textures=lines.slice(textureIndex+1,textureIndex+textureCount+1).map(line=>line.split(/\s+/)[0].split(/[\\/]/).at(-1).replace(/\.dds$/i,'').toLowerCase());
  return {groups,materials,textures};
}
function makeMaterial(source, texture, component) {
  const color=new THREE.Color().setRGB(...source.diffuse.slice(0,3));
  const name=source.name.toLowerCase();
  let metalness=.5,roughness=Math.max(.22,Math.min(.82,Math.sqrt(2/((source.specular[4]||8)+2))));
  if(/foil|alluminum|aluminium|silver|gimbal/.test(name)){metalness=.85;roughness=.42;}
  if(/black|interior|white|radiator|hull/.test(name)){metalness=.08;roughness=.7;}
  if(/glass|lens/.test(name)){metalness=.25;roughness=.12;}
  if(texture==='tompa_cm'){metalness=1;roughness=1;}
  const mat=new THREE.MeshStandardMaterial({name:`${component} / ${source.name}${texture?' / '+texture:''}`,color,metalness,roughness,side:THREE.DoubleSide});
  mat.userData={atlas:texture,sourceMaterial:source.name};
  return mat;
}
function createModel(kind) {
  const root=new THREE.Group();root.name=kind==='csm'?'Apollo Command and Service Module':'Apollo Lunar Module';
  root.userData={source:sourceURL,license:'GPL-2.0',units:'metres',modification:'External components assembled, coordinate handedness converted, PBR materials adapted. No simulation or interior cockpit included.'};
  const components=[];
  function component(file,offset,filter=()=>true) {
    const parsed=parseMesh(file),batches=new Map(),part=new THREE.Group();part.name=file.replace('.msh','');
    for(const group of parsed.groups.filter(filter)) {
      const key=group.material+':'+group.texture;
      // MSH material 0 denotes Orbiter's default white material; table entries
      // start at 1, as do texture indices (texture 0 means untextured).
      const source=group.material===0?{name:'Orbiter default',diffuse:[1,1,1,1],specular:[0,0,0,1,0]}:parsed.materials[group.material-1];
      if(!batches.has(key))batches.set(key,{geometries:[],material:makeMaterial(source,parsed.textures[group.texture-1],part.name)});
      const pos=[],normal=[],uv=[],missingNormals=[];
      for(const vert of group.vertices) {
        if(![5,6,8].includes(vert.length)||!vert.every(Number.isFinite))throw new Error(`Invalid vertex in ${file}`);
        const [x,y,z]=vert;
        // MSH also permits xyz+uv vertices without an explicit normal.
        const [nx,ny,nz]=vert.length===5?[0,0,0]:vert.slice(3,6);
        const [u=0,v=0]=vert.length===5?vert.slice(3):vert.slice(6);
        if(vert.length===5)missingNormals.push(pos.length/3);
        // Orbiter left-handed: CSM Z is longitudinal, LM Y is vertical.
        pos.push(...(kind==='csm'?[x+offset[0],z+offset[2],y+offset[1]]:[x+offset[0],y+offset[1],-z-offset[2]]));
        normal.push(...(kind==='csm'?[nx,nz,ny]:[nx,ny,-nz]));uv.push(u,v);
      }
      const indices=[];
      for(const [a,b,c] of group.indices) {
        if(Math.max(a,b,c)>=group.vertices.length)throw new Error(`Invalid index in ${file}`);
        indices.push(a,c,b);
      }
      const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
      geo.setAttribute('normal',new THREE.Float32BufferAttribute(normal,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.setIndex(indices);
      if(missingNormals.length) {
        geo.computeVertexNormals();const computed=geo.getAttribute('normal');
        for(let i=0;i<group.vertices.length;i++)if(group.vertices[i].length!==5)computed.setXYZ(i,normal[i*3],normal[i*3+1],normal[i*3+2]);
      }
      batches.get(key).geometries.push(geo);
    }
    for(const {geometries,material} of batches.values()) {
      const geo=mergeGeometries(geometries,false);const mesh=new THREE.Mesh(geo,material);mesh.name=material.name;part.add(mesh);
      for(const g of geometries)g.dispose();
    }
    root.add(part);components.push(part);
  }
  if(kind==='csm') {
    // SM centre is our longitudinal origin; CM is 34.4 - 30.25 = 4.15 m ahead.
    const sm=[0,-.14,0],cm=[0,0,4.15];
    component('SM-core.msh',sm);component('SM-RCSHI.msh',sm);
    for(let i=1;i<=6;i++)component(`SM-Panel${i}.msh`,sm);
    component('SM-SPS.msh',[0,-.14,-1.654]);
    component('SM-HGA.msh',[-1.308,-1.18,-1.208]);
    component('CM-Nohatch.msh',cm);component('CM-HatchC.msh',cm);component('CM-HatchF.msh',cm);
    component('CM-DockRing.msh',cm);component('CM-ProbeRetracted.msh',cm);component('CM-Docktgt.msh',[.66,1.07,4.15]);
  } else {
    // Apollo 11 style exterior: exclude crew figures, later AES hardware,
    // RTG cask (Apollo 12+) and later plume deflectors. Probes are extended.
    component('LM_AscentStage.msh',[0,.99,0],g=>!/(?:^z?(?:CDR|LMP)\d|^zzz)/.test(g.label));
    component('LM_DescentStage.msh',[0,-1.25,0],g=>!/^zzzCask|^DeflectorStrut$|^RCSdeflector$/.test(g.label));
  }
  const bounds=new THREE.Box3().setFromObject(root),center=bounds.getCenter(new THREE.Vector3());
  for(const part of root.children)part.position.sub(center);
  root.updateMatrixWorld(true);
  const componentBounds=Object.fromEntries(components.map(part=>{const b=new THREE.Box3().setFromObject(part);return [part.name,{min:b.min.toArray(),max:b.max.toArray()}];}));
  return {root,componentBounds};
}
async function exportModel(kind) {
  const {root,componentBounds}=createModel(kind);
  const model=Buffer.from(await new GLTFExporter().parseAsync(root,{binary:true}));
  const jsonSize=model.readUInt32LE(12),gltf=JSON.parse(model.subarray(20,20+jsonSize));
  const originalBin=model.subarray(28+jsonSize),chunks=[originalBin];let length=originalBin.length;
  const images=new Map();gltf.images=[];gltf.textures=[];gltf.samplers=[{magFilter:9729,minFilter:9987,wrapS:10497,wrapT:10497}];
  function texture(name) {
    if(images.has(name))return images.get(name);
    const bytes=archive['textures/'+name+'.png'];if(!bytes)throw new Error(`Missing texture ${name}`);
    const index=gltf.images.length,view=gltf.bufferViews.length;
    gltf.bufferViews.push({buffer:0,byteOffset:length,byteLength:bytes.length});chunks.push(bytes,Buffer.alloc((4-bytes.length%4)%4));length+=bytes.length+(4-bytes.length%4)%4;
    gltf.images.push({name,mimeType:'image/png',bufferView:view});gltf.textures.push({source:index,sampler:0});images.set(name,index);return index;
  }
  for(const mat of gltf.materials) {
    const atlas=mat.extras?.atlas;if(!atlas)continue;
    mat.pbrMetallicRoughness.baseColorTexture={index:texture(atlas)};
    if(archive['textures/'+atlas+'_norm.png'])mat.normalTexture={index:texture(atlas+'_norm'),scale:1};
    if(atlas==='tompa_cm')mat.pbrMetallicRoughness.metallicRoughnessTexture={index:texture('tompa_cm_pbr')};
    if(['higain_a','sraster','sraster2'].includes(atlas)){
      mat.alphaMode='MASK';mat.alphaCutoff=.35;
      if(mat.pbrMetallicRoughness.baseColorFactor)mat.pbrMetallicRoughness.baseColorFactor[3]=1;
    }
  }
  gltf.buffers[0].byteLength=length;
  gltf.asset.copyright='Project Apollo - NASSP contributors; GPL version 2';
  gltf.asset.extras={source:sourceURL,license:'GPL-2.0',editableSource:'sources/apollo-nassp.zip',licenseFile:'LICENSE-NASSP.txt',conversion:'Spacecraft project: static exterior assembly and glTF PBR conversion; CM reflection atlas approximated as metallic/roughness.'};
  const json=Buffer.from(JSON.stringify(gltf)),padded=Buffer.concat([json,Buffer.alloc((4-json.length%4)%4,32)]);
  const header=Buffer.alloc(20);header.writeUInt32LE(0x46546c67,0);header.writeUInt32LE(2,4);header.writeUInt32LE(28+padded.length+length,8);header.writeUInt32LE(padded.length,12);header.writeUInt32LE(0x4e4f534a,16);
  const binHeader=Buffer.alloc(8);binHeader.writeUInt32LE(length,0);binHeader.writeUInt32LE(0x004e4942,4);
  const output=Buffer.concat([header,padded,binHeader,...chunks]);
  await writeFile(new URL(`../public/models/apollo-${kind}.glb`,import.meta.url),output);
  const primitives=gltf.meshes.flatMap(m=>m.primitives),bounds=new THREE.Box3().setFromObject(root);
  return {kind,bytes:output.length,triangles:primitives.reduce((s,p)=>s+gltf.accessors[p.indices].count/3,0),vertices:primitives.reduce((s,p)=>s+gltf.accessors[p.attributes.POSITION].count,0),meshes:primitives.length,materials:gltf.materials.length,textures:gltf.images.length,bounds:{min:bounds.min.toArray(),max:bounds.max.toArray()},components:componentBounds};
}
const results=[];for(const kind of ['csm','lm'])results.push(await exportModel(kind));
console.log(JSON.stringify(results.map(({components,...stats})=>stats),null,2));
