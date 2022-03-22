import { get } from 'svelte/store';
import { activePresentation } from '../../stores.js';
import { presentations } from '../../stores'
import { highlightMaterial } from './models.js';
import { camera } from './camera.js';
import TWEEN from '@tweenjs/tween.js'
import { Vector3 } from 'three';
import { createSignal } from './signals';


let previousModel   
let shipSignal, datacenter, datacenterSignal, office, officeSignal, gas, gasSignal, container, containerSignal, sat, antenna, ship;
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
            gas.visible = false;
            container.visible = false;
            sat.visible = false;
        }

        ship.material.opacity = 0.1;


        if (previousModel) {
            previousModel.material = ship.material
        }

        if (activePresentation.activeModel) {
            activeModel = scene.getObjectByName(activePresentation.activeModel)
            previousModel = scene.getObjectByName(activePresentation.activeModel)
            console.log(activeModel)
            console.log(highlightMaterial)
            activeModel.material = highlightMaterial;
        }

        if (activePresentation.showSignal) {

            sat = scene.getObjectByName("sat")
            antenna = scene.getObjectByName("antenna")
            datacenter = scene.getObjectByName("datacenter")
            gas = scene.getObjectByName("gas")
            container = scene.getObjectByName("container")
            ship = scene.getObjectByName("ship")

            shipSignal = createSignal("shipSignal", antenna.position, sat.position, 500)
            house1Signal = createSignal("shipSignal", house1.position, sat.position, 500)
            house2Signal = createSignal("shipSignal", house2.position, sat.position, 500)
            ship1Signal = createSignal("shipSignal", ship1.position, sat.position, 1000)
            ship2Signal = createSignal("shipSignal", ship2.position, sat.position, 600)

            scene.add(shipSignal, house1Signal, house2Signal, ship1Signal, ship2Signal)

            ship1.visible = true;
            ship2.visible = true;
            house1.visible = true;
            house2.visible = true;
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

// export function addHoverEventHighlight(camera, scene) {
//     window.addEventListener('mousemove', event => {

//         pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
//         pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

//         const found = intersect(pointer, camera, scene);

//         if (found[0].object.name === 'ship') {
//             let ship = found[0].object;

//             if (INTERSECTED != found[0].object) {

//                 if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

//                 INTERSECTED = found[0].object;
//                 // @ts-ignore
//                 INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
//                 // @ts-ignore
//                 INTERSECTED.material.emissive.setHex(0xff0000);
//             }
//         } else {

//             if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

//             INTERSECTED = null;
//         }
//     });
// }

// export function addClickEventOpenModal(camera, scene) {
//     window.addEventListener('click', event => {

//         clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//         clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//         const found = intersect(clickMouse, camera, scene);

//         if (found[2].object.name === 'ship') {

//             showModal.update(n => n = true)
//         }
//     })
// }

// function intersect(pos, camera, scene) {
//     raycaster.setFromCamera(pos, camera);
//     return raycaster.intersectObjects(scene.children);
// }


