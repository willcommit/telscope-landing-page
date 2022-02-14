import { BufferGeometry, Float32BufferAttribute, Points, PointsMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import shipModel from '../../assets/ship.gltf?url';
import landModel from '../../assets/land.gltf?url';
import dataCenterdModel from '../../assets/dc.gltf?url';


export function createShip(scene) {
  const loader = new GLTFLoader();

  loader.load(shipModel, function (gltf) {

    let ship = gltf.scene.getObjectByName("ship")
    // @ts-ignore
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