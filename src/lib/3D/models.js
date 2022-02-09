import { BufferGeometry, Float32BufferAttribute, Points, PointsMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import shipModel from '../../assets/ship.gltf?raw';
import landModel from '../../assets/land.gltf?raw';
import dataCenterdModel from '../../assets/dc.gltf?raw';


export function createShip(scene) {
  const loader = new GLTFLoader();

  loader.load(shipModel, function (gltf) {

    let ship = gltf.scene.children[2]
    ship.material.opacity = 0.2;

    let engine = gltf.scene.children[1]
    //engine.material = ship.material

    scene.add(gltf.scene);

  }, undefined, function (error) {

    console.error(error);
  });
} 


export function createLand(scene) {
  const loader = new GLTFLoader();

  loader.load(landModel, function (gltf) {
    console.log(gltf.scene)
    scene.add(gltf.scene);

  }, undefined, function (error) {

    console.error(error);
  });
} 

export function createDataCenter(scene) {
    const loader = new GLTFLoader();
  
    loader.load(dataCenterdModel, function (gltf) {
      
      scene.add(gltf.scene);
  
    }, undefined, function (error) {
  
      console.error(error);
    });
  } 