import { AdditiveBlending, DoubleSide, Points } from "three";
import { PointsMaterial } from "three";
import { BufferGeometry, CatmullRomCurve3 } from "three";

export function createSignal(name, startPos, endPos, points) {

    const curve = new CatmullRomCurve3([
        startPos,
        endPos
    ]);

    const positions = curve.getPoints(points);
    const geometry = new BufferGeometry().setFromPoints(positions);

    const material = new PointsMaterial({
        size: 0.1,
        blending: AdditiveBlending,
        color: 0x0086ff,
        side: DoubleSide,
        depthWrite: false,
        transparent: true
    });

    // Create the final object to add to the scene
    const signal = new Points(geometry, material);
    signal.visible = true;
    signal.name = `${name}Signal`;

    return signal
}