import { PlaneGeometry, TextureLoader, RepeatWrapping, Vector3 } from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';

import waternormals from "../../assets/waternormals.jpg";

 const waterGeometry = new PlaneGeometry(10000, 10000);
 export let water;

 export function createWater(scene) {
    water = new Water(
        waterGeometry,
        {
          textureWidth: 512,
          textureHeight: 512,
          waterNormals: new TextureLoader().load(waternormals, function (texture) {
     
            texture.wrapS = texture.wrapT = RepeatWrapping;
     
          }),
          sunDirection: new Vector3(),
          sunColor: 0xffffff,
          waterColor: 0x001e0f,
          distortionScale: 3.7,
          fog: scene.fog !== undefined
        }
      );
      water.rotation.x = - Math.PI / 2;  
      scene.add(water);
 }

 export function waterPhysics() {
    water.material.uniforms['time'].value += 1.0 / 60.0;
 }
