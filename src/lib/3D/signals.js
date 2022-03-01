import { AdditiveBlending, DoubleSide, Points } from "three";
import { PointsMaterial } from "three";
import { BufferGeometry, CatmullRomCurve3, Vector3 } from "three";

const point = new Vector3();
let positions;

export function addSignal(scene) {

    const curve = new CatmullRomCurve3([
        new Vector3(-2, 29.5, 20),
        new Vector3(-173, 127, -130)
    ]);

    //const geometry = new TubeGeometry(curve, 80, 0.3, 1, false)

    positions = curve.getPoints(50);
    const geometry = new BufferGeometry().setFromPoints(positions);

    // const material = new PointsMaterial ({
    //     size: 0.3

    // })

    const material = new PointsMaterial({
        size: 0.4,
        blending: AdditiveBlending,
        color: 0x0086ff,
        side: DoubleSide,
        depthWrite: false,
        transparent: true
    });

    // Create the final object to add to the scene
    const signal = new Points(geometry, material);
    signal.visible = false;
    signal.name = "signal";

    scene.add(signal)
}
