import { Raycaster, Vector2, WebGLRenderer } from "three";
import { showEngine } from '../../stores.js';

const clickMouse = new Vector2();
const moveMouse = new Vector2();
const raycaster = new Raycaster();
const pointer = new Vector2();
let INTERSECTED;

export function listenEvents(camera, scene, renderer) {
    

    showEngine.subscribe((value) => {
        if(value === true ){
            let ship = scene.getObjectByName("ship")
            let engine = scene.getObjectByName("Engines")
            let antenna = scene.getObjectByName("Antenna")

            engine.material = ship.material
            //camera.position.set(1000,4000,20)

            console.log(renderer.info)
        }
    });
}









export function addHoverEventHighlight(camera, scene) {
    window.addEventListener('mousemove', event => {

        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

        const found = intersect(pointer, camera, scene);

        if (found[0].object.name === 'ship') {
            let ship = found[0].object;

            if (INTERSECTED != found[0].object) {

                if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

                INTERSECTED = found[0].object;
                // @ts-ignore
                INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                // @ts-ignore
                INTERSECTED.material.emissive.setHex(0xff0000);
            }
        } else {

            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

            INTERSECTED = null;
        }
    });
}

export function addClickEventOpenModal(camera, scene) {
    window.addEventListener('click', event => {

        clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        const found = intersect(clickMouse, camera, scene);

        if (found[2].object.name === 'ship') {

            showModal.update(n => n = true)
        }
    })
}

function intersect(pos, camera, scene) {
    raycaster.setFromCamera(pos, camera);
    return raycaster.intersectObjects(scene.children);
}


