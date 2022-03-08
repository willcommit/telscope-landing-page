import { ACESFilmicToneMapping, Scene, Vector2, WebGLRenderer } from 'three';

import { createWater, waterPhysics } from './water';
import { createSky } from './sky'
import { createOrbitCamera, camera } from './camera';
import { loadModels } from './models';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import TWEEN from '@tweenjs/tween.js'


export let scene, renderer, composer;

const params = {
  exposure: 0.3,
  bloomStrength: 0.8,
  bloomThreshold: 0,
  bloomRadius: 1
};

function init(bg) {

  renderer = new WebGLRenderer({ canvas: bg });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = ACESFilmicToneMapping;

  scene = new Scene();

  createWater(scene);
  createSky(scene)
  createOrbitCamera(renderer)

  loadModels()

  const renderScene = new RenderPass(scene, camera);

  const bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
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

  composer.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {

  waterPhysics();

  composer.render();
}

function animate() {
  TWEEN.update()
  requestAnimationFrame(animate);
  render();
}

export const createCanvas = (bg) => {
  init(bg);
  animate();
}

