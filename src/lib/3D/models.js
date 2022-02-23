import { LoadingManager } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import shipModel from '../../assets/ship.gltf?url';
import landModel from '../../assets/land.gltf?url';
import satModel from '../../assets/sat.gltf?url';
import otherModel from '../../assets/other.gltf?url';
import { scene } from './canvas';
import { listenEvents } from './events';

import { loaded } from '../../stores';
import { MeshStandardMaterial } from 'three';

const manager = new LoadingManager();
export let highlightMaterial;

manager.onLoad = function () {

  loaded.update(n => n = true)
  listenEvents(scene)

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

    console.log(gltf.scene)

    gltf.scene.children[0].children[0].material.opacity = 0.2;

  }, undefined, function (error) {

    console.error(error);
  });
}

function createSat() {

  loader.load(satModel, function (gltf) {

    gltf.scene.children[0].material.opacity = 0.4;
    gltf.scene.children[0].visible = false
    scene.add(gltf.scene);

  }, undefined, function (error) {

    console.error(error);
  });
}

function createOther() {

  loader.load(otherModel, function (gltf) {

    gltf.scene.children[0].material.opacity = 0.3;
    gltf.scene.children[0].visible = false;
    gltf.scene.children[0].name = "other1";
    gltf.scene.children[1].material.opacity = 0.2;
    gltf.scene.children[1].visible = false;
    gltf.scene.children[1].name = "other2";

    scene.add(gltf.scene);

  }, undefined, function (error) {

    console.error(error);
  });
}

function createMaterials(bpMaterial) {
  highlightMaterial = new MeshStandardMaterial(bpMaterial);
  highlightMaterial.name = "highlight"
  highlightMaterial.emissive.setHex(0xcc0000)
  highlightMaterial.opacity = 0.4
}

export function loadModels() {
  createShip()
  createLand()
  createSat()
  createOther()
}