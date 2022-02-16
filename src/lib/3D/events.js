import { activePresentation } from '../../stores.js';
import { presentations } from './presentation'
import { highlightMaterial } from './models.js';
import { camera } from './camera.js';
import TWEEN from '@tweenjs/tween.js'
import { Vector3 } from 'three';

let previousModel
let signal;
let previousPresentation;

export function listenEvents(scene) {

    activePresentation.subscribe((value) => {

        let activePresentation = presentations[value]
        let ship = scene.getObjectByName("ship")
        let activeModel;

        if (signal !== undefined) {
            signal.visible = false;
        }

        ship.material.opacity = activePresentation.modelOpacity;


        if (previousModel) {
            previousModel.material = ship.material
        }

        if (activePresentation.activeModel) {
            activeModel = scene.getObjectByName(activePresentation.activeModel)
            // console.log(activeModel)
            previousModel = scene.getObjectByName(activePresentation.activeModel)
            activeModel.material = highlightMaterial;
        }

        if (activePresentation.showSignal) {
            signal = scene.getObjectByName("signal")
            signal.visible = true;
        }

        if (previousPresentation !== undefined) {
            console.log("here")
            const tweenCamera = new TWEEN.Tween({ x: 10, y: 10, z: 10, lookAtX: 0, lookAtY: 0, lookAtZ: 0 })
                .to({ x: 20, y: 20, z: 20, lookAtX: 0, lookAtY: 0, lookAtZ: 0 }, 7000)

            tweenCamera.onUpdate(updateCamera)
        } else {
            camera.position.set(...activePresentation.cameraPos)
            camera.rotation.order = 'YXZ'
            camera.rotation.y = activePresentation.rotY * Math.PI / 180
            camera.rotation.x = activePresentation.rotX * Math.PI / 180
            camera.rotation.z = activePresentation.rotZ * Math.PI / 180
        }

        previousPresentation = activePresentation
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


