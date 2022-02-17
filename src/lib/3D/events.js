import { activePresentation } from '../../stores.js';
import { presentations } from './presentation'
import { highlightMaterial } from './models.js';
import { camera } from './camera.js';
import TWEEN from '@tweenjs/tween.js'
import { Vector3 } from 'three';

let previousModel   
let signal;
let previousCamera = JSON.parse(JSON.stringify(presentations[0].sceneCamera));

export function listenEvents(scene) {

    activePresentation.subscribe((value) => {
        
        let activePresentation = presentations[value]
        let activeCamera = activePresentation.sceneCamera
        let ship = scene.getObjectByName("ship")
        let activeModel;

        console.log(previousCamera)

        if (signal !== undefined) {
            signal.visible = false;
        }

        ship.material.opacity = 0.1;


        if (previousModel) {
            previousModel.material = ship.material
        }

        if (activePresentation.activeModel) {
            activeModel = scene.getObjectByName(activePresentation.activeModel)
            previousModel = scene.getObjectByName(activePresentation.activeModel)
            activeModel.material = highlightMaterial;
        }

        if (activePresentation.showSignal) {
            signal = scene.getObjectByName("signal")
            signal.visible = true;
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


