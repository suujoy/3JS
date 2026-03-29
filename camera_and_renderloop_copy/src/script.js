import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//Initialize the scene
const scene = new THREE.Scene();

//Initialize the Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
);
scene.add(camera);

//Initialize the Geometry

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1,1,0,1);
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
});
// Create custom geometry
// const vertices = new Float32Array([0, 0, 0, 0, 2, 0, 2, 0, 0]);

// const bufferAttribute = new THREE.BufferAttribute(vertices, 3);

// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute("position", bufferAttribute);

const cube = new THREE.Mesh(cubeGeometry , cubeMaterial);
scene.add(cube);

//Initialize the Canvas Element form the HTML
const canvas = document.querySelector(".threejs");

//Initialize the Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
});

//Initialize the Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//Initialize the Camera Position
camera.position.z = 2;

//Initialize the Renderer Size
renderer.setSize(window.innerWidth, window.innerHeight);

//Initialize the clock
const clock = new THREE.Clock();
let previousTime = 0;

//Initialize the window resize event
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

//Initialize the rendererLoop
const rendererLoop = () => {
    window.requestAnimationFrame(rendererLoop);

    const currentTime = clock.getElapsedTime();
    const delta = currentTime - previousTime;

    previousTime = currentTime;

    cube.rotation.y += THREE.MathUtils.degToRad(1) * delta * 14;

    cube.scale.x = Math.sin(currentTime) * 0.5 + 1;

    controls.update();
    renderer.render(scene, camera);
};

rendererLoop();
