import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export let camera
let controls;

camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 20000);

export function createOrbitCamera (renderer) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.target.set(0, 10, 0);
    controls.minDistance = 40.0;
    controls.maxDistance = 200.0;
    controls.enablePan = false;
    controls.update();
}

export function moveCamera () {

}