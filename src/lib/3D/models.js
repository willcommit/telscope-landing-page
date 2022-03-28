import { LoadingManager } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import shipModel from '../../assets/ship.gltf?url';
import antennaModel from '../../assets/antenna.gltf?url';
import landModel from '../../assets/land.gltf?url';
import satModel from '../../assets/sat.gltf?url';
import networkModel from '../../assets/network.gltf?url';
import containerModel from '../../assets/container.gltf?url';
import gasModel from '../../assets/gas.gltf?url';
import datacenterModel from '../../assets/datacenter.gltf?url';
import officeModel from '../../assets/office.gltf?url';
import tankModel from '../../assets/tanks.gltf?url';

import { scene } from './canvas';
import { listenEvents } from './events';
import { loaded } from '../../stores';
import { MeshStandardMaterial } from 'three';

const manager = new LoadingManager();
const loader = new GLTFLoader(manager);
export let highlightMaterial;

export function loadModels() {
  loadModel(shipModel, 0.2, true, true)
  loadModel(antennaModel, 0.2, true, false)
  loadModel(landModel, 0.2, true, false)
  loadModel(satModel, 0.2, false, false)
  loadModel(networkModel, 0.2, true, false)
  loadModel(containerModel, 0.2, false, false)
  loadModel(gasModel, 0.2, false, false)
  loadModel(tankModel, 0.2, false, false)
  loadModel(officeModel, 0.2, false, false)
  loadModel(datacenterModel, 0.2, false, false)
}

manager.onLoad = function () {
  loaded.update(n => n = true);
  listenEvents(scene);
};

function loadModel(model, opacity, visible, createMaterial) {
  

  loader.load(model, function (gltf) {

    try {
      gltf.scene.children[0].material.opacity = opacity;
      
    } catch (error) {

      console.log(gltf.scene.children[0].name)
      
    }

    gltf.scene.children[0].visible = visible;

    if (createMaterial) {
      createMaterials(gltf.scene.children[0].material)
    }

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

