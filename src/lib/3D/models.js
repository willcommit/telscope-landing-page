import { LoadingManager } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import shipModel from '../../assets/ship.gltf?url';
import landModel from '../../assets/land.gltf?url';
import dataCenterdModel from '../../assets/dc.gltf?url';
import { scene } from './canvas';

import { loaded } from '../../stores';

const manager = new LoadingManager();

manager.onLoad = function () {

  loaded.update(n => n = true)

};

const loader = new GLTFLoader(manager);

function createShip() {

  loader.load(shipModel, function (gltf) {

    scene.add(gltf.scene);

  }, undefined, function (error) {

    console.error(error);
  });
}


function createLand() {

  loader.load(landModel, function (gltf) {
    scene.add(gltf.scene);

  }, undefined, function (error) {

    console.error(error);
  });
}

function createDataCenter() {

  loader.load(dataCenterdModel, function (gltf) {

    scene.add(gltf.scene);

  }, undefined, function (error) {

    console.error(error);
  });
}

export function loadModels() {
  createShip()
  createLand()
  createDataCenter()

}