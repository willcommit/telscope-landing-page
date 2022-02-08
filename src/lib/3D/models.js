import { BufferGeometry, Float32BufferAttribute, Points, PointsMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function createShip(scene) {
  const loader = new GLTFLoader();

  loader.load('src/assets/ship.gltf', function (gltf) {
    console.log(gltf.scene.children[0]);

    let ship = gltf.scene.children[2]
    ship.material.opacity = 0.2;

    let engine = gltf.scene.children[1]
    engine.material = ship.material

    scene.add(gltf.scene);
    // scene.add(engine);
    // scene.add(antenna)

  }, undefined, function (error) {

    console.error(error);
  });
} 