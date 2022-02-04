import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let container
let camera, scene, raycaster, renderer;
let controls, water, sun, mesh;

let INTERSECTED;
let theta = 0;

const pointer = new THREE.Vector2();
const radius = 100;

function init() {

  container = document.getElementById('bg');

  //

  raycaster = new THREE.Raycaster();

  //

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  //

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 20000);
  camera.position.set(30, 30, 100);

  //

  sun = new THREE.Vector3();

  // Water

  const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

  water = new Water(
    waterGeometry,
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load('assets/waternormals.jpg', function (texture) {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

      }),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined
    }
  );

  water.rotation.x = - Math.PI / 2;

  scene.add(water);

  // Skybox

  const sky = new Sky();
  sky.scale.setScalar(10000);
  scene.add(sky);

  const skyUniforms = sky.material.uniforms;

  skyUniforms['turbidity'].value = 10;
  skyUniforms['rayleigh'].value = 2;
  skyUniforms['mieCoefficient'].value = 0.005;
  skyUniforms['mieDirectionalG'].value = 0.8;

  const parameters = {
    elevation: 2,
    azimuth: 180
  };

  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  function updateSun() {

    const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
    const theta = THREE.MathUtils.degToRad(parameters.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);

    sky.material.uniforms['sunPosition'].value.copy(sun);
    water.material.uniforms['sunDirection'].value.copy(sun).normalize();

    scene.environment = pmremGenerator.fromScene(sky).texture;

  }

  updateSun();

  //ADD ASSETS
  function createBox() {
    const geometry = new THREE.BoxGeometry(30, 30, 30);
    const material = new THREE.MeshStandardMaterial({ color: 0xCC0000, roughness: 0 });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  }

  //createBox();

  function createShip() {
    const loader = new GLTFLoader();

    loader.load('./assets/ship.gltf', function (gltf) {

      let ship = gltf.scene.children[0]
      ship.position.set(1,-2,1)
      ship.scale.set(0.5,0.5,0.5)
      ship.material.opacity = 0.5;
      console.log(ship)
      
      scene.add(gltf.scene);

    }, undefined, function (error) {

      console.error(error);
    });
  }

  createShip()


  //

  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 0.495;
  controls.target.set(0, 10, 0);
  controls.minDistance = 40.0;
  controls.maxDistance = 200.0;
  controls.update();

  //
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function onPointerMove(event) {

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

}

function animate() {

  requestAnimationFrame(animate);
  render();
}

function render() {

  water.material.uniforms['time'].value += 1.0 / 60.0;

  raycaster.setFromCamera(pointer, camera);

  // const intersects = raycaster.intersectObjects(mesh, true);

  // if (intersects.length > 0) {

  //   if (INTERSECTED != intersects[0].object) {

  //     if (INTERSECTED) INTERSECTED.material.setHex(INTERSECTED.currentHex);

  //     INTERSECTED = intersects[0].object;
  //     INTERSECTED.currentHex = INTERSECTED.material.getHex();
  //     INTERSECTED.material.setHex(0xff0000);

  //   }

  // } else {

  //   if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

  //   INTERSECTED = null;

  // }

  renderer.render(scene, camera);

}

init();
animate();
