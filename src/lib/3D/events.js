import { get } from 'svelte/store';
import { activePresentation, presentations } from '../../stores.js';
import { highlightMaterial } from './models.js';
import { camera } from './camera.js';
import TWEEN from '@tweenjs/tween.js'
import { Vector3 } from 'three';
import { createSignal } from './signals';
import { controls } from './camera'


let previousModel   
let shipSignal, datacenter, datacenterSignal, office, officeSignal, tanks, gas, gasSignal, container, containerSignal, sat, antenna, ship;
let startPresentations = get(presentations)
let previousCamera = JSON.parse(JSON.stringify(startPresentations[0].sceneCamera));

export function listenEvents(scene) {

    activePresentation.subscribe((value) => {
        
        let latestPresentations = get(presentations)
        let activePresentation = latestPresentations[value]
        let activeCamera = activePresentation.sceneCamera
        let activeModel;
        ship = scene.getObjectByName("ship")
        

        if (shipSignal !== undefined) {
            datacenterSignal.visible = false;
            officeSignal.visible = false;
            containerSignal.visible = false;
            gasSignal.visible = false;
            shipSignal.visible = false;

            datacenter.visible = false;
            office.visible = false;
            container.visible = false;
            sat.visible = false;
            gas.visible = false;
            tanks.visible = false;
        }

        ship.material.opacity = 0.1;


        if (previousModel) {
            previousModel.material = ship.material
        }

        if (activePresentation.activeModel) {

            activeModel = scene.getObjectByName(activePresentation.activeModel)
            previousModel = scene.getObjectByName(activePresentation.activeModel)
            activeModel.material = highlightMaterial;
            controls.target.set(activeModel.position.x, activeModel.position.y, activeModel.position.z)

            if(activePresentation.activeModel === 'tanks') {
                gas.visible = true;
                tanks.visible = true;
            }
        }

        if (activePresentation.showSignal) {

            sat = scene.getObjectByName("sat")
            antenna = scene.getObjectByName("antenna")
            office = scene.getObjectByName("office")
            datacenter = scene.getObjectByName("datacenter")
            gas = scene.getObjectByName("gas")
            tanks = scene.getObjectByName("tanks")
            container = scene.getObjectByName("container")
            ship = scene.getObjectByName("ship")

            shipSignal = createSignal("shipSignal", antenna.position, sat.position, 500)
            officeSignal = createSignal("officeSignal", office.position, sat.position, 500)
            datacenterSignal = createSignal("datacenterSignal", datacenter.position, sat.position, 500)
            gasSignal = createSignal("gasSignal", gas.position, sat.position, 1000)
            containerSignal = createSignal("containerSignal", container.position, sat.position, 600)

            scene.add(shipSignal, officeSignal, datacenterSignal, gasSignal, containerSignal)

            gas.visible = true;
            tanks.visible = true;
            container.visible = true;
            office.visible = true;
            datacenter.visible = true;
            sat.visible = true;
        }

        if (previousCamera !== undefined) {
            const tweenCamera = new TWEEN.Tween(previousCamera)
                .to(activeCamera, 4000)

            tweenCamera.onUpdate(updateCamera).start()

        } else {
            camera.position.set(activeCamera.x, activeCamera.y, activeCamera.z)
            camera.lookAt(new Vector3(activeCamera.lookAtX, activeCamera.lookAtY, activeCamera.lookAtZ))
        }
    });
}


const updateCamera = function (object) {
    camera.position.set(object.x, object.y, object.z);
    camera.lookAt(new Vector3(object.lookAtX, object.lookAtY, object.lookAtZ))
}

