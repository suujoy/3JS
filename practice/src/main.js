import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
);

const canvas = document.querySelector(".canvas-sphere");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

//sphere
const geometry = new THREE.SphereGeometry(7, 16, 20);
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

//plane
const base = new THREE.PlaneGeometry(10, 10);
const planeMatial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(base, planeMatial);
scene.add(plane);

plane.position.set(15, 0, 0);

//CylinderGeometry
const CylinderGeometry = new THREE.CylinderGeometry(4, 5, 10, 32);
const CylinderMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
});
const Cylinder = new THREE.Mesh(CylinderGeometry, CylinderMaterial);
scene.add(Cylinder);

const axisHelper = new THREE.AxesHelper(10);
scene.add(axisHelper);

Cylinder.position.set(-15, 0, 0);

//ConeGeometry

const ConeGeometry = new THREE.ConeGeometry(5, 15, 25, 15, 10);
const coneMatirial = new THREE.MeshBasicMaterial({
    color: "Green",
    wireframe: true,
});

const cone = new THREE.Mesh(ConeGeometry, coneMatirial);
scene.add(cone);

cone.position.set(0, 0, 15);

//TorusGeometry

const TorusGeometry = new THREE.TorusGeometry(5, 3, 16, 100);
const TorusMaterial = new THREE.MeshBasicMaterial({
    color: "yellow",
    wireframe: true,
});

const torus = new THREE.Mesh(TorusGeometry, TorusMaterial);
scene.add(torus);
torus.position.set(0, 0, -15);

//TorusKnotGeometry

const TorusKnotGeometry = new THREE.TorusKnotGeometry(5, 1, 200, 10);
const TrousKoneMaterial = new THREE.MeshBasicMaterial({
    color: "blue",
    wireframe: true,
});
const torusKnot = new THREE.Mesh(TorusKnotGeometry, TrousKoneMaterial);
scene.add(torusKnot);

torusKnot.position.set(15, 0, 15);

//CircleGeometry

const CircleGeometry = new THREE.CircleGeometry(5, 32);
const CircleMaterial = new THREE.MeshBasicMaterial({
    color: "white",
    wireframe: true,
});
const circle = new THREE.Mesh(CircleGeometry, CircleMaterial);
scene.add(circle);

circle.position.set(-15, 0, -15);

//RingGeometry

const RingGeometry = new THREE.RingGeometry(1, 5, 15, 15);
const ringMaterial = new THREE.MeshBasicMaterial({
    color: "violate",
    wireframe: true,
});

const ring = new THREE.Mesh(RingGeometry, ringMaterial);
scene.add(ring);

ring.position.set(0, 15, 15);

//DodecahedronGeometry
const DodecahedronGeometry = new THREE.DodecahedronGeometry(6, 8);
const DodecaheadronMatirial = new THREE.MeshBasicMaterial({
    color: "0xffff00",
    wireframe: true,
});

const Dodecahedron = new THREE.Mesh(
    DodecahedronGeometry,
    DodecaheadronMatirial,
);
scene.add(Dodecahedron);

Dodecahedron.position.set(0, -15, 15);

//IcosahedronGeometry

const IcosahedronGeometry = new THREE.IcosahedronGeometry(8, 6);
const IcosahedronMaterial = new THREE.MeshBasicMaterial({
    color: "pink",
    wireframe: true,
});
const Icosahedron = new THREE.Mesh(IcosahedronGeometry,IcosahedronMaterial)
scene.add(Icosahedron)

Icosahedron.position.set(-15,0,15)




camera.position.z = 50;
const controls = new OrbitControls(camera, canvas);

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    controls.autoRotate = true;

    renderer.render(scene, camera);
};

animate();
