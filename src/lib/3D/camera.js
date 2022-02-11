import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export let camera
let controls;

camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 20000);
camera.position.set(100, 40, 10);
camera.lookAt(0, 15, 0)

export const cameras = [
    {id: 0, name: "start", pos: [100, 40, 10], lookAt: [0,15,0]},
    {id: 1, name: "engine", pos: [100, 50, 10], lookAt: [0,15,0]},
    {id: 2, name: "cargo", pos: [100, 70, 10], lookAt: [0,15,0]},
    {id: 3, name: "bridge", pos: [100, 80, 10], lookAt: [0,15,0]},
    {id: 4, name: "data", pos: [100, 90, 10], lookAt: [0,15,0]}
]

export function createOrbitCamera (renderer) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.target.set(0, 10, 0);
    controls.minDistance = 40.0;
    controls.maxDistance = 200.0;
    controls.update();
}

export function moveCamera () {

}