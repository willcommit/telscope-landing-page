import './canvas.css'

import * as THREE from 'three';

import { createWater, waterPhysics, water } from './water';
import { createSky } from './sky'
import { createOrbitCamera, camera } from './camera';
import { createShip } from './models';
import { addHoverEventHighlight, addClickEventOpenModal } from './events'

let scene, renderer;

function init(bg) {

  renderer = new THREE.WebGLRenderer({ canvas: bg });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  //container.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  createWater(scene);
  createSky(scene, renderer, water)
  createOrbitCamera(camera, renderer)
  createShip(scene)
  addHoverEventHighlight(camera, scene)
  addClickEventOpenModal(camera, scene)

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {

  waterPhysics();

  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

export const createCanvas = (bg) => {
  init(bg);
  animate();
}

