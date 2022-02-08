import {  Vector3, ShaderMaterial, Color, DoubleSide, SphereGeometry, Mesh } from 'three';
import StarrySkyShader from './StarrySkyShader';


export function createSky(scene) {
    var skyDomeRadius = 1000.01;
    var sphereMaterial = new ShaderMaterial({
        uniforms: {
            skyRadius: { value: skyDomeRadius },
            //env_c1: { value: new Color("#0d1a2f") },
            //env_c2: { value: new Color("#0f8682") },
            noiseOffset: { value: new Vector3(100.01, 100.01, 100.01)},
            starSize: { value: 0.01 },
            starDensity: { value: 0.001 },
            clusterStrength: { value: 0.002 },
            clusterSize: { value: 0.001 },
        },
        vertexShader: StarrySkyShader.vertexShader,
        fragmentShader: StarrySkyShader.fragmentShader,
        side: DoubleSide,
    })
    var sphereGeometry = new SphereGeometry(skyDomeRadius, 20, 20);
    var skyDome = new Mesh(sphereGeometry, sphereMaterial);
    scene.add(skyDome);
}