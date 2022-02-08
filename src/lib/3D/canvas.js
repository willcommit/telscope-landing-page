import './canvas.css'

import * as THREE from 'three';

import { createWater, waterPhysics, water } from './water';
import { createSky } from './sky'
import { createOrbitCamera, camera } from './camera';
import { createShip, createLand, createDataCenter} from './models';
import { addHoverEventHighlight, addClickEventOpenModal } from './events';
import { addShoreCurve } from './curves';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

let scene, renderer, composer;

const params = {
  exposure: 0.3,
  bloomStrength: 0.8,
  bloomThreshold: 0,
  bloomRadius: 1
};

function init(bg) {

  renderer = new THREE.WebGLRenderer({ canvas: bg });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  //container.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  createWater(scene);
  createSky(scene)
  createShip(scene)
  createLand(scene)
  createDataCenter(scene)
  //addHoverEventHighlight(camera, scene)
  addClickEventOpenModal(camera, scene)
  addShoreCurve(scene)


  const renderScene = new RenderPass(scene, camera);

  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
  bloomPass.threshold = params.bloomThreshold;
  bloomPass.strength = params.bloomStrength;
  bloomPass.radius = params.bloomRadius;

  composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {

  //waterPhysics();

  composer.render();
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

export const createCanvas = (bg) => {
  init(bg);
  animate();
}

