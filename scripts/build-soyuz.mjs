import { writeFile } from 'node:fs/promises';
import { deflateSync } from 'node:zlib';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { createSoyuz } from '../src/soyuz-model.js';

// Original geometry and deterministic texture maps; no remote model or canvas.
globalThis.FileReader = class {
  readAsArrayBuffer(blob) { blob.arrayBuffer().then(result => {this.result=result;this.onloadend?.();}); }
};
const crcTable=Array.from({length:256},(_,n)=>{for(let k=0;k<8;k++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n>>>0;});
function chunk(name,data) {
  const type=Buffer.from(name),size=Buffer.alloc(4),crc=Buffer.alloc(4);size.writeUInt32BE(data.length);
  let c=0xffffffff;for(const b of Buffer.concat([type,data]))c=crcTable[(c^b)&255]^(c>>>8);
  crc.writeUInt32BE((c^0xffffffff)>>>0);return Buffer.concat([size,type,data,crc]);
}
function png(width,height,pixel) {
  const bytes=Buffer.alloc((width*3+1)*height);
  for(let y=0;y<height;y++)for(let x=0;x<width;x++) {
    const rgb=pixel(x,y),offset=y*(width*3+1)+1+x*3;
    for(let k=0;k<3;k++)bytes[offset+k]=Math.max(0,Math.min(255,Math.round(rgb[k])));
  }
  const header=Buffer.alloc(13);header.writeUInt32BE(width,0);header.writeUInt32BE(height,4);header[8]=8;header[9]=2;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',header),chunk('IDAT',deflateSync(bytes,{level:9})),chunk('IEND',Buffer.alloc(0))]);
}
const noise=(x,y)=>{const n=Math.sin(x*127.1+y*311.7)*43758.5453;return n-Math.floor(n);};
const heightAt=(x,y)=>.22*Math.sin(x*.17+Math.sin(y*.071)*4)+.16*Math.sin(x*.063-y*.14)+.07*Math.sin(x*.69+y*.52)+.025*((x%3===0?1:0)+(y%3===0?1:0));
const clothColor=png(1024,1024,(x,y)=>{
  const shade=.91+.055*Math.sin(x*.043+Math.sin(y*.027)*3)+.035*Math.sin(y*.13+x*.05)+.07*(noise(x,y)-.5);
  const weave=(x%3===0||y%3===0)?-.035:0;return [231,231,222].map(c=>c*(shade+weave));
});
const clothNormal=png(1024,1024,(x,y)=>{
  const dx=(heightAt(x+1,y)-heightAt(x-1,y))*2.5,dy=(heightAt(x,y+1)-heightAt(x,y-1))*2.5;
  const inv=1/Math.hypot(dx,dy,1);return [128-dx*127*inv,128-dy*127*inv,128+127*inv];
});
const clothRough=png(512,512,(x,y)=>[255,205+22*noise(x,y),255]);
const cellColor=png(256,256,(x,y)=>{
  const fingers=y%16<1,edge=x<5||x>250||y<5||y>250;
  if(fingers)return [133,153,179];if(edge)return [78,102,133];
  const shade=.86+.13*Math.sin((x+y)*.012)+.035*(noise(x,y)-.5);return [192*shade,211*shade,245*shade];
});
const model=Buffer.from(await new GLTFExporter().parseAsync(createSoyuz(),{binary:true}));
const jsonSize=model.readUInt32LE(12),gltf=JSON.parse(model.subarray(20,20+jsonSize));
const originalBin=model.subarray(28+jsonSize),data=[originalBin];let length=originalBin.length;
gltf.images=[];gltf.textures=[];gltf.samplers=[{magFilter:9729,minFilter:9987,wrapS:10497,wrapT:10497}];
function texture(name,pngData) {
  const view=gltf.bufferViews.length;gltf.bufferViews.push({buffer:0,byteOffset:length,byteLength:pngData.length});
  data.push(pngData,Buffer.alloc((4-pngData.length%4)%4));length+=pngData.length+(4-pngData.length%4)%4;
  const index=gltf.images.length;gltf.images.push({name,mimeType:'image/png',bufferView:view});gltf.textures.push({source:index,sampler:0});return index;
}
const base=texture('Original woven insulation albedo',clothColor),normal=texture('Original woven insulation normal',clothNormal),rough=texture('Original insulation roughness',clothRough),cell=texture('Original solar cell contact fingers',cellColor);
for(const mat of gltf.materials) {
  if(mat.name.startsWith('MLI')) {
    mat.pbrMetallicRoughness.baseColorTexture={index:base};mat.pbrMetallicRoughness.roughnessFactor=1;
    mat.pbrMetallicRoughness.metallicRoughnessTexture={index:rough};mat.normalTexture={index:normal,scale:.7};
  }
  if(mat.name.startsWith('Solar silicon'))mat.pbrMetallicRoughness.baseColorTexture={index:cell};
  if(mat.name==='Amber multilayer insulation')mat.normalTexture={index:normal,scale:.22};
}
gltf.buffers[0].byteLength=length;
gltf.asset.copyright='Spacecraft project — original geometry and procedural texture maps';
gltf.asset.extras={reference:'NASA Expedition 11 press kit / ESA Soyuz factsheet',visualReference:'Chris Kuhn Soyuz TMA portfolio; no mesh or texture reused',modelScope:'Approximate educational TMA exterior, not a flight article or engineering model'};
const json=Buffer.from(JSON.stringify(gltf)),padded=Buffer.concat([json,Buffer.alloc((4-json.length%4)%4,32)]);
const header=Buffer.alloc(20);header.writeUInt32LE(0x46546c67,0);header.writeUInt32LE(2,4);header.writeUInt32LE(28+padded.length+length,8);header.writeUInt32LE(padded.length,12);header.writeUInt32LE(0x4e4f534a,16);
const binHeader=Buffer.alloc(8);binHeader.writeUInt32LE(length,0);binHeader.writeUInt32LE(0x004e4942,4);
const output=Buffer.concat([header,padded,binHeader,...data]);
await writeFile(new URL('../public/models/soyuz.glb',import.meta.url),output);
const primitives=gltf.meshes.flatMap(mesh=>mesh.primitives);
console.log(JSON.stringify({bytes:output.length,triangles:primitives.reduce((sum,p)=>sum+gltf.accessors[p.indices].count/3,0),vertices:primitives.reduce((sum,p)=>sum+gltf.accessors[p.attributes.POSITION].count,0),meshes:gltf.meshes.length,materials:gltf.materials.length,textures:gltf.textures.length},null,2));
