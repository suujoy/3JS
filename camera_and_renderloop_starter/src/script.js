import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// console.log(OrbitControls);
// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

// initialize the PerspectiveCamera camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    30,
);

const aspectRatio = window.innerWidth / window.innerHeight;

// initialize the orthographic camera
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio,
//     1 * aspectRatio,
//     1,
//     -1,
//     0.1,
//     200,
// );

camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});

//intantate the controls

const controls = new OrbitControls(camera, canvas);
renderer.setSize(window.innerWidth, window.innerHeight);
const maxPixalRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixalRatio);

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const renderLoop = () => {
    renderer.render(scene, camera);
    controls.update();
    // controls.autoRotate = true;
    window.requestAnimationFrame(renderLoop);
};
renderLoop();
