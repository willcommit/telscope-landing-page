import { LoadingManager } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import shipModel from '../../assets/ship.gltf?url';
import landModel from '../../assets/land.gltf?url';
import dataCenterdModel from '../../assets/datacenter.gltf?url';
import { scene } from './canvas';
import { camera } from './camera';
import { listenEvents } from './events';

import { loaded } from '../../stores';
import { MeshStandardMaterial } from 'three';

const manager = new LoadingManager();
export let highlightMaterial;

manager.onLoad = function () {

  loaded.update(n => n = true)
  listenEvents(camera, scene)

};

const loader = new GLTFLoader(manager);

function createShip() {

  loader.load(shipModel, function (gltf) {

    // @ts-ignore
    createMaterials(gltf.scene.children[0].material)

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

function createMaterials(bpMaterial) {
  highlightMaterial = new MeshStandardMaterial(bpMaterial);
  highlightMaterial.name = "highlight" 
  highlightMaterial.emissive.setHex(0xed1330)
}

export function loadModels() {
  createShip()
  createLand()
  createDataCenter()
}