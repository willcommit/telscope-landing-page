import { AdditiveBlending, DoubleSide, MeshBasicMaterial, MeshStandardMaterial } from "three";
import { Mesh } from "three";
import { TubeGeometry } from "three";
import { Material } from "three";
import { BufferGeometry, CatmullRomCurve3, Line, LineBasicMaterial, Vector3 } from "three";

const positions = [];
const splineHelperObjects = [];
let splinePointsLength = 4;
const point = new Vector3();

const ARC_SEGMENTS = 200;

export function addShoreCurve(scene) {

    const curve = new CatmullRomCurve3([
        new Vector3(-1, 30, 20.5),
        new Vector3(-200, 150, -100),
        new Vector3(-460, 8, -240)
    ]);

    const geometry = new TubeGeometry(curve,80, 0.3, 8, false)

    // const points = curve.getPoints(100);
    // const geometry = new BufferGeometry().setFromPoints(points);

    const material = new MeshBasicMaterial({
        blending: AdditiveBlending,
        color: 0x0086ff,
        side: DoubleSide,
        depthWrite: false,
        transparent: true
    });


    // Create the final object to add to the scene
    const tube = new Mesh(geometry, material);

    scene.add(tube)
}

