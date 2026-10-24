import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// Original TMA exterior reconstruction, metres. Arrangement: NASA Expedition 11
// press kit pp.20–23; scale: ESA Soyuz factsheet. Small fittings are interpretive.
export function createSoyuz() {
  const root = new THREE.Group();
  root.name = 'Soyuz TMA — original exterior reconstruction';
  root.userData = { units: 'metres', variant: 'TMA', solarSpan: 10.6,
    authorship: 'Original procedural geometry and textures by the Spacecraft project',
    scope: 'Educational exterior reconstruction; equipment details and blanket folds are approximate.' };
  const material = (name, color, metalness, roughness) => new THREE.MeshStandardMaterial({ name, color, metalness, roughness });
  const m = {
    blanket: material('MLI — charcoal woven thermal blanket', 0x393c38, .08, .88),
    blanket2: material('MLI — olive descent blanket', 0x494b43, .07, .9),
    seam: material('Blanket binding tape', 0x3d3b32, .03, .95),
    stitch: material('Ochre stitching and lacing', 0xada082, .05, .92),
    silver: material('Machined aluminium', 0xb9c4cb, .9, .3),
    brushed: material('Brushed structural aluminium', 0x76858c, .88, .42),
    dark: material('Recesses and seals', 0x141c20, .15, .82),
    white: material('White radiator coating', 0xd9dcd5, .12, .61),
    rib: material('Radiator channel edges', 0x8c9997, .55, .48),
    gold: material('Amber multilayer insulation', 0x9f7435, .72, .48),
    nozzle: material('Engine refractory metal', 0x555c64, .86, .39),
    glass: material('Porthole dark optical glass', 0x142d40, .6, .12),
    cell: material('Solar silicon cells', 0x152e59, .68, .31),
    cell2: material('Solar silicon alternate reflection', 0x203d6a, .7, .34),
    wire: material('Solar silver interconnects', 0x9aabb8, .85, .38),
    back: material('Solar substrate', 0x65513a, .2, .72),
    red: material('Hatch warning red', 0xa74531, .1, .68),
    marking: new THREE.MeshStandardMaterial({name:'Russian tricolour fabric patch',vertexColors:true,roughness:.9,metalness:0}),
  };
  const batches = new Map(), Y = new THREE.Vector3(0,1,0), Z = new THREE.Vector3(0,0,1);
  const v = (x,y,z) => new THREE.Vector3(x,y,z);
  const qY = d => new THREE.Quaternion().setFromUnitVectors(Y,d.clone().normalize());
  const qZ = d => new THREE.Quaternion().setFromUnitVectors(Z,d.clone().normalize());
  function add(geo,mat,pos=v(0,0,0),q=new THREE.Quaternion()) {
    if (!geo.index) geo.setIndex(Array.from({length:geo.attributes.position.count},(_,i)=>i));
    if (!geo.attributes.uv) geo.setAttribute('uv',new THREE.Float32BufferAttribute(new Float32Array(geo.attributes.position.count*2),2));
    geo.applyMatrix4(new THREE.Matrix4().compose(pos,q,v(1,1,1)));
    if (!batches.has(mat)) batches.set(mat,[]);
    batches.get(mat).push(geo);
  }
  function box(size,pos,mat,q) {
    if (Math.min(...size) < .065) {
      add(new THREE.BoxGeometry(...size),mat,v(...pos),q);
      return;
    }
    // Broad equipment cases have machined chamfers that catch the light.
    const [w,h,d]=size,b=Math.min(...size)*.045,s=new THREE.Shape();
    s.moveTo(-w/2+b,-h/2+b);s.lineTo(w/2-b,-h/2+b);
    s.lineTo(w/2-b,h/2-b);s.lineTo(-w/2+b,h/2-b);s.closePath();
    const geo=new THREE.ExtrudeGeometry(s,{depth:d-2*b,steps:1,bevelEnabled:true,bevelSize:b,bevelThickness:b,bevelSegments:2});
    geo.translate(0,0,-d/2+b);add(geo,mat,v(...pos),q);
  }
  function rod(a,b,r,mat=m.silver,segments=10,r2=r) {
    const start=v(...a),end=v(...b),delta=end.clone().sub(start);
    add(new THREE.CylinderGeometry(r2,r,delta.length(),segments),mat,start.add(end).multiplyScalar(.5),qY(delta));
  }
  function cylinder(r,h,y,mat,rt=r) {add(new THREE.CylinderGeometry(rt,r,h,96),mat,v(0,y,0));}
  function ring(r,t,pos,mat=m.silver,n=Y) {add(new THREE.TorusGeometry(r,t,8,96),mat,v(...pos),qZ(n));}
  function tube(points,r,mat,segments=64) {add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>v(...p))),segments,r,6,false),mat);}
  function bolts(center,n,r,count,head=.012,mat=m.silver) {
    const c=v(...center),q=qZ(n);
    for(let i=0;i<count;i++) {
      const a=i*Math.PI*2/count,p=v(r*Math.cos(a),r*Math.sin(a),0).applyQuaternion(q).add(c);
      add(new THREE.CylinderGeometry(head,head,.012,6),mat,p,qY(n));
    }
  }
  function profileAt(profile,y) {
    let i=profile.findIndex(p=>p[0]>=y);
    if(i<=0)return profile[0][1];
    const a=profile[i-1],b=profile[i],before=profile[Math.max(0,i-2)],after=profile[Math.min(profile.length-1,i+1)];
    const t=(y-a[0])/(b[0]-a[0]),d=b[0]-a[0];
    const ma=(b[1]-before[1])/(b[0]-before[0]),mb=(after[1]-a[1])/(after[0]-a[0]);
    return (2*t**3-3*t*t+1)*a[1]+(t**3-2*t*t+t)*d*ma+(-2*t**3+3*t*t)*b[1]+(t**3-t*t)*d*mb;
  }
  function blanket(name,profile,mat,sectors,bands) {
    const lo=profile[0][0],hi=profile.at(-1)[0],around=192,rows=112;
    const sample=(theta,y,lift=0)=>{
      const t=(y-lo)/(hi-lo),envelope=Math.sin(Math.PI*Math.max(0,Math.min(1,t)))**.55;
      const folds=.010*Math.sin(theta*31+t*49+1.3*Math.sin(theta*7))+.006*Math.sin(theta*57-t*91)+.006*Math.sin(theta*13+t*21);
      const quilt=.012*Math.sin(theta*sectors/2)**2*Math.sin(t*Math.PI*bands)**2;
      const r=profileAt(profile,y)+envelope*(folds+quilt)+lift;
      return [r*Math.sin(theta),y,r*Math.cos(theta)];
    };
    const positions=[],uvs=[],indices=[];
    for(let j=0;j<=rows;j++)for(let i=0;i<=around;i++) {
      positions.push(...sample(i/around*Math.PI*2,lo+(hi-lo)*j/rows));uvs.push(i/around,j/rows);
    }
    for(let j=0;j<rows;j++)for(let i=0;i<around;i++) {
      const a=j*(around+1)+i,b=a+around+1;indices.push(a,a+1,b,b,a+1,b+1);
    }
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    geo.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));geo.setIndex(indices);geo.computeVertexNormals();
    const object=new THREE.Mesh(geo,mat);object.name=name;root.add(object);
    for(let i=0;i<sectors;i++) {
      const theta=i/sectors*Math.PI*2;
      tube(Array.from({length:65},(_,j)=>sample(theta,lo+.018+(hi-lo-.036)*j/64,.009)),.012,m.seam,96);
      const count=Math.floor((hi-lo)/.05);
      for(let k=1;k<count;k++) {
        const y=lo+(hi-lo)*k/count;
        rod(sample(theta-.013,y,.021),sample(theta+.013,y+.008,.021),.0025,m.stitch,5);
      }
    }
    for(let j=1;j<bands;j++) {
      const y=lo+(hi-lo)*j/bands;
      tube(Array.from({length:129},(_,i)=>sample(i/128*Math.PI*2,y,.01)),.011,m.seam,192);
      for(let k=0;k<140;k++) {
        const theta=k/140*Math.PI*2;
        rod(sample(theta,y-.014,.021),sample(theta+.008,y+.014,.021),.0023,m.stitch,5);
      }
    }
    return sample;
  }
  const descent=blanket('Descent module — tailored thermal insulation',[
    [-.94,1.05],[-.83,1.12],[-.42,1.10],[.15,.98],[.65,.79],[1.02,.55],
  ],m.blanket2,12,4);
  const orbital=blanket('Orbital module — sewn multilayer thermal blanket',[
    [1.08,.54],[1.23,.72],[1.62,1.01],[2.10,1.12],[2.53,1.01],[2.85,.78],[3.06,.51],
  ],m.blanket,12,5);
  cylinder(.55,.10,1.045,m.brushed);ring(.55,.026,[0,1.07,0]);
  cylinder(1.08,.13,-1,m.white);ring(1.09,.025,[0,-.94,0],m.brushed);ring(1.10,.022,[0,-1.065,0],m.brushed);
  bolts([0,-1.075,0],Y,1.055,48,.012);
  // Instrument bay and aft white radiator, with 96 distinct cooling channels.
  blanket('Instrument bay thermal cover',[[-1.61,1.30],[-1.5,1.32],[-1.2,1.15],[-1.08,1.07]],m.blanket,12,2);
  cylinder(1.34,1.12,-2.19,m.white);cylinder(1.355,.105,-1.65,m.brushed);cylinder(1.355,.09,-2.76,m.brushed);
  for(const y of [-1.73,-2.68])ring(1.345,.018,[0,y,0],m.silver);
  for(let i=0;i<96;i++) {
    const a=i/96*Math.PI*2,x=1.345*Math.sin(a),z=1.345*Math.cos(a);
    rod([x,-2.65,z],[x,-1.76,z],.007,m.rib,6);
    if(i%8===0) {
      const n=v(Math.sin(a),0,Math.cos(a));box([.027,.92,.012],[x,-2.2,z],m.brushed,qZ(n));
      for(const y of [-2.62,-1.79])add(new THREE.CylinderGeometry(.014,.014,.014,6),m.silver,v(x,y,z).addScaledVector(n,.012),qY(n));
    }
  }
  cylinder(1.26,.14,-2.85,m.gold);cylinder(1.12,.06,-2.95,m.dark);ring(1.24,.025,[0,-2.9,0],m.silver);
  // Open main-engine bell, wall thickness, dark throat and cooling ribs.
  add(new THREE.LatheGeometry([[.13,-2.86],[.14,-2.95],[.18,-3.06],[.26,-3.19],[.36,-3.37],[.37,-3.42],
    [.345,-3.42],[.33,-3.37],[.235,-3.19],[.155,-3.06],[.117,-2.95]].map(p=>new THREE.Vector2(...p)),96),m.nozzle);
  ring(.357,.018,[0,-3.42,0],m.brushed);cylinder(.115,.012,-2.97,m.dark);
  for(let i=0;i<24;i++) {
    const a=i/24*Math.PI*2;
    tube([[.14*Math.sin(a),-2.96,.14*Math.cos(a)],[.19*Math.sin(a),-3.10,.19*Math.cos(a)],[.34*Math.sin(a),-3.38,.34*Math.cos(a)]],.005,m.brushed,20);
  }
  for(let i=0;i<4;i++) {
    const a=Math.PI/4+i*Math.PI/2,n=v(Math.sin(a),0,Math.cos(a));
    box([.35,.3,.28],[n.x*1.18,-2.86,n.z*1.18],m.gold,qZ(n));
    for(const side of [-1,1]) {
      const start=n.clone().multiplyScalar(1.29).add(v(0,-2.82+side*.075,0)),dir=n.clone().add(v(0,side*.3,0)).normalize();
      add(new THREE.CylinderGeometry(.09,.047,.16,24,1,true),m.nozzle,start.clone().addScaledVector(dir,.08),qY(dir));
      ring(.09,.009,[...start.clone().addScaledVector(dir,.16)],m.silver,dir);
      add(new THREE.CircleGeometry(.037,24),m.dark,start.clone().addScaledVector(dir,.012),qZ(dir));
    }
    tube([[n.x*1.12,-2.91,n.z*1.12],[n.x*1.32,-2.60,n.z*1.32],[n.x*1.37,-2.31,n.z*1.37]],.012,m.silver,24);
  }
  // Opaque port seats fully cover the underlying cloth. Glass sits inside a
  // raised annular frame, with no coincident faces or painted imitation rims.
  function port(sample,theta,y,radius) {
    const n=v(Math.sin(theta),.08,Math.cos(theta)).normalize(),p=v(...sample(theta,y,.055)),q=qZ(n),at=z=>p.clone().addScaledVector(n,z);
    add(new THREE.CylinderGeometry(radius*1.28,radius*1.30,.06,80),m.dark,at(.008),qY(n));
    const annulus=new THREE.Shape();annulus.absarc(0,0,radius*1.23,0,Math.PI*2,false);
    const hole=new THREE.Path();hole.absarc(0,0,radius*.9,0,Math.PI*2,true);annulus.holes.push(hole);
    add(new THREE.ExtrudeGeometry(annulus,{depth:.04,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.006,bevelThickness:.005,curveSegments:40}),m.silver,at(.035),q);
    add(new THREE.CircleGeometry(radius*.895,80),m.glass,at(.043),q);
    ring(radius*.91,.008,[...at(.053)],m.dark,n);bolts([...at(.083)],n,radius*1.08,16,.008);
    add(new THREE.RingGeometry(radius*.76,radius*.79,64,1,0,Math.PI*.7),m.brushed,at(.044),q);
  }
  port(orbital,.12,2.18,.175);port(orbital,Math.PI+.2,2.05,.15);
  port(descent,.20,.03,.15);port(descent,2.45,.05,.14);
  // Curved cloth patch with explicit per-stripe colours; no repeating label UVs.
  const flagColors=[0xc5c7bc,0x244e8d,0xa64036];
  for(let stripe=0;stripe<3;stripe++) {
    const positions=[],colors=[],indices=[],color=new THREE.Color(flagColors[stripe]);
    for(let row=0;row<=1;row++)for(let col=0;col<=16;col++) {
      positions.push(...orbital(.35+col/16*.3,2.63-(stripe+row)*.066,.042));
      colors.push(color.r,color.g,color.b);
    }
    for(let col=0;col<16;col++)indices.push(col,col+17,col+1,col+1,col+17,col+18);
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    geo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geo.setIndex(indices);geo.computeVertexNormals();add(geo,m.marking);
  }
  // Descent periscope housing and small paired attitude-control apertures.
  const periN=v(.84,.05,.54).normalize(),periP=v(...descent(1,.18,.09));
  box([.17,.20,.19],[...periP],m.brushed,qZ(periN));
  add(new THREE.CircleGeometry(.055,48),m.glass,periP.clone().addScaledVector(periN,.104),qZ(periN));
  for(let i=0;i<4;i++) {
    const a=.78+i*Math.PI/2,n=v(Math.sin(a),-.18,Math.cos(a)).normalize(),p=v(...descent(a,-.65,.08));
    box([.19,.12,.08],[...p],m.brushed,qZ(n));
    for(const dx of [-.049,.049]) {
      const pos=v(dx,0,.055).applyQuaternion(qZ(n)).add(p);
      add(new THREE.CylinderGeometry(.025,.018,.045,20,1,true),m.nozzle,pos,qY(n));
      add(new THREE.CircleGeometry(.017,20),m.dark,pos.clone().addScaledVector(n,-.01),qZ(n));
    }
  }
  const hatchN=v(-.94,-.05,.34).normalize(),hatchP=v(...orbital(-1.22,1.96,.085));
  add(new THREE.CylinderGeometry(.40,.42,.07,96),m.brushed,hatchP,qY(hatchN));
  add(new THREE.CylinderGeometry(.355,.355,.035,96),m.white,hatchP.clone().addScaledVector(hatchN,.048),qY(hatchN));
  ring(.37,.015,[...hatchP.clone().addScaledVector(hatchN,.075)],m.dark,hatchN);
  bolts([...hatchP.clone().addScaledVector(hatchN,.082)],hatchN,.385,24,.011);
  for(const dy of [-.24,.24])box([.13,.10,.085],[...hatchP.clone().add(v(.06,dy,.31))],m.silver,qZ(hatchN));
  const handleQ=qZ(hatchN);
  for(const x of [-.075,.075]) {
    const p=v(x,0,.105).applyQuaternion(handleQ).add(hatchP);
    rod([...p],[...p.clone().addScaledVector(hatchN,.08)],.012,m.red);
  }
  rod([...v(-.075,0,.185).applyQuaternion(handleQ).add(hatchP)],[...v(.075,0,.185).applyQuaternion(handleQ).add(hatchP)],.012,m.red);
  // TMA probe-and-drogue active docking unit; open annulus, locks and probe.
  add(new THREE.LatheGeometry([[.49,3.015],[.49,3.185],[.425,3.185],[.425,3.015]].map(p=>new THREE.Vector2(...p)),96),m.white);
  add(new THREE.LatheGeometry([[.49,3.10],[.52,3.19],[.52,3.28],[.43,3.28],[.43,3.15]].map(p=>new THREE.Vector2(...p)),128),m.silver);
  cylinder(.427,.025,3.155,m.dark);ring(.445,.017,[0,3.265,0],m.dark);ring(.505,.019,[0,3.283,0],m.silver);bolts([0,3.295,0],Y,.477,48,.009);
  for(let i=0;i<8;i++) {
    const a=i/8*Math.PI*2,n=v(Math.sin(a),0,Math.cos(a));
    box([.11,.15,.105],[n.x*.52,3.23,n.z*.52],m.brushed,qZ(n));
    box([.065,.025,.067],[n.x*.52,3.322,n.z*.52],m.silver,qZ(n));
  }
  cylinder(.115,.13,3.25,m.brushed);cylinder(.055,.60,3.56,m.silver,.033);cylinder(.075,.07,3.42,m.brushed);cylinder(.050,.05,3.72,m.brushed);
  add(new THREE.SphereGeometry(.072,32,16),m.silver,v(0,3.845,0));
  for(let i=0;i<3;i++) {
    const a=i/3*Math.PI*2;
    rod([0,3.78,0],[.14*Math.sin(a),3.69,.14*Math.cos(a)],.012,m.brushed);
    rod([.14*Math.sin(a),3.69,.14*Math.cos(a)],[.025*Math.sin(a),3.60,.025*Math.cos(a)],.009,m.silver);
  }
  // Parabolic Kurs dishes, feed supports, rolled rims and triangular mount arms.
  function dish(center,direction,radius) {
    const p=v(...center),n=v(...direction).normalize(),q=qZ(n),shape=[];
    for(let j=0;j<=24;j++){const r=radius*j/24;shape.push(new THREE.Vector2(r,.16*(r/radius)**2));}
    const geo=new THREE.LatheGeometry(shape,80);geo.rotateX(Math.PI/2);add(geo,m.white,p,q);
    ring(radius,.012,[...p.clone().addScaledVector(n,.16)],m.silver,n);
    for(let i=0;i<3;i++) {
      const a=i*Math.PI*2/3,edge=v(radius*.85*Math.cos(a),radius*.85*Math.sin(a),.12).applyQuaternion(q).add(p);
      rod([...edge],[...p.clone().addScaledVector(n,.35)],.006,m.brushed,8);
    }
    add(new THREE.CylinderGeometry(.036,.045,.09,24),m.brushed,p.clone().addScaledVector(n,.36),qY(n));
    for(const t of [.35,.65])ring(radius*t,.0028,[...p.clone().addScaledVector(n,.16*t*t)],m.rib,n);
  }
  for(const [sign,z] of [[1,.42],[-1,-.42]]) {
    const a=[sign*.72,2.83,z*.5],b=[sign*1.53,2.99,z];
    rod(a,b,.026,m.silver,12);rod([sign*.88,2.26,z*.6],b,.015,m.brushed,10);rod([sign*.5,2.91,z+.25],b,.012,m.silver,10);
    box([.18,.14,.19],b,m.brushed);dish([sign*1.56,3.02,z],[sign*.12,.76,.64],.31);
    tube([a,[sign*1.14,2.96,z],[sign*1.5,3.06,z]],.012,m.dark,24);
  }
  for(const x of [-.11,.11])rod([x,2.55,-.91],[x,3.43,-1.04],.018,m.silver);
  for(let i=0;i<7;i++) {
    const y=2.58+i*.13,z=-.91-(y-2.55)*.148;rod([-.11,y,z],[.11,y,z],.012,m.brushed);
    if(i<6)rod([-.11,y,z],[.11,y+.13,z-.019],.009,m.silver);
  }
  dish([-.17,3.42,-1.07],[0,.1,-1],.19);dish([.20,3.42,-1.07],[0,.1,-1],.19);
  box([.28,.29,.24],[.49,2.84,.59],m.silver,qZ(v(.3,.1,1)));
  add(new THREE.CircleGeometry(.083,48),m.glass,v(.52,2.87,.73),qZ(v(.3,.1,1)));bolts([.52,2.87,.74],v(.3,.1,1),.105,8,.007);
  for(const sign of [-1,1]) {
    rod([sign*.93,1.40,.45],[sign*1.35,1.08,.75],.022,m.white);rod([sign*1.35,1.08,.75],[sign*1.81,.73,1.08],.006,m.silver);
  }
  // External harnesses with individual restraint clips.
  for(const theta of [.87,3.7,5.3]) {
    const pts=[];for(let i=0;i<=32;i++)pts.push(orbital(theta+.025*Math.sin(i*.3),1.21+i/32*1.72,.045));tube(pts,.018,m.dark,96);
    for(let i=0;i<8;i++){const y=1.30+i*.2;rod(orbital(theta-.035,y,.047),orbital(theta+.035,y,.047),.008,m.brushed);}
  }
  for(let i=0;i<4;i++) {
    const a=Math.PI/4+i*Math.PI/2;tube([descent(a,-.76,.05),descent(a,-.30,.05),descent(a,.33,.05),descent(a,.75,.05)],.013,m.dark,64);
  }
  // Two articulated solar wings, three panels per wing, 792 discrete cells.
  for(const sign of [-1,1]) {
    rod([sign*1.24,-1.89,0],[sign*1.77,-1.89,0],.075,m.brushed,24);ring(.115,.021,[sign*1.48,-1.89,0],m.silver,v(1,0,0));
    for(const z of [-.11,.11]) {
      rod([sign*1.28,-2.30,z],[sign*1.80,-2.07,z],.018,m.silver);rod([sign*1.28,-1.54,z],[sign*1.80,-1.73,z],.018,m.silver);
    }
    for(let panel=0;panel<3;panel++) {
      const width=1.16,height=1.38,cx=sign*(1.78+width/2+panel*1.18),cy=-1.89;
      box([width,height,.035],[cx,cy,0],m.back);
      for(const y of [cy-height/2,cy+height/2])box([width+.025,.024,.047],[cx,y,.006],m.silver);
      for(const dx of [-width/2,width/2])box([.021,height,.047],[cx+dx,cy,.006],m.silver);
      for(let col=0;col<11;col++)for(let row=0;row<12;row++) {
        const x=cx-width/2+.065+col*.103,y=cy-height/2+.073+row*.112;
        add(new THREE.PlaneGeometry(.095,.103),(row+col)%7===0?m.cell2:m.cell,v(x,y,.024));
        for(const dx of [-.025,.025])box([.002,.107,.001],[x+dx,y,.0255],m.wire);
      }
      for(const side of [-1,1])for(const dy of [-.48,0,.48]) {
        box([.044,.11,.065],[cx+side*width/2,cy+dy,.005],m.brushed);
        add(new THREE.CylinderGeometry(.012,.012,.009,6),m.silver,v(cx+side*width/2,cy+dy,.043),qY(Z));
      }
      rod([cx-width/2,cy-height/2,-.027],[cx+width/2,cy+height/2,-.027],.009,m.brushed);
      rod([cx+width/2,cy-height/2,-.027],[cx-width/2,cy+height/2,-.027],.009,m.brushed);
      for(const dy of [-.32,.32])box([width,.012,.012],[cx,cy+dy,-.028],m.brushed);
    }
  }
  for(const theta of [1.36,4.3]) {
    const n=v(Math.sin(theta),0,Math.cos(theta)),p=v(...orbital(theta,2.32,.08)),q=qZ(n);
    box([.32,.51,.075],[...p],m.brushed,q);box([.28,.46,.015],[...p.clone().addScaledVector(n,.05)],m.silver,q);
    for(const dx of [-.13,.13])for(const dy of [-.20,.20])add(new THREE.CylinderGeometry(.008,.008,.008,6),m.brushed,v(dx,dy,.063).applyQuaternion(q).add(p),qY(n));
  }
  for(const [mat,geometries] of batches) {
    const geo=mergeGeometries(geometries,false);if(!geo)throw new Error(`Cannot merge Soyuz details: ${mat.name}`);
    const mesh=new THREE.Mesh(geo,mat);mesh.name=mat.name;root.add(mesh);for(const g of geometries)g.dispose();
  }
  return root;
}
