import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function createShip(scene) {
    const loader = new GLTFLoader();

    loader.load('src/assets/ship.gltf', function (gltf) {

      let ship = gltf.scene.children[0]
      
      scene.add(gltf.scene);

    }, undefined, function (error) {

      console.error(error);
    });
  }