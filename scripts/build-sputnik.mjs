import { writeFile } from 'node:fs/promises';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { createSputnik } from '../src/sputnik-model.js';

// GLTFExporter uses FileReader for its binary buffer; Node supplies Blob.
globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((result) => { this.result = result; this.onloadend?.(); });
  }
};
const result = await new GLTFExporter().parseAsync(createSputnik(), { binary: true });
await writeFile(new URL('../public/models/sputnik-1.glb', import.meta.url), new Uint8Array(result));
console.log(`Sputnik GLB written: ${result.byteLength} bytes`);
