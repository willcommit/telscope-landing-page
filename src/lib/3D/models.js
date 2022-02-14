import { LoadingManager } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import shipModel from '../../assets/ship.gltf?url';
import landModel from '../../assets/land.gltf?url';
import dataCenterdModel from '../../assets/dc.gltf?url';

import { loaded } from '../../stores';


const manager = new LoadingManager();

manager.onLoad = function () {

  loaded.update(n => n = true)

};


const loader = new GLTFLoader(manager);


export function createShip(scene) {

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

  loader.load(landModel, function (gltf) {
    scene.add(gltf.scene);

  }, undefined, function (error) {

    console.error(error);
  });
}

export function createDataCenter(scene) {

  loader.load(dataCenterdModel, function (gltf) {

    scene.add(gltf.scene);

  }, undefined, function (error) {

    console.error(error);
  });
}
