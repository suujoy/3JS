import * as THREE from "three";

//Initialize the scene
const scene = new THREE.Scene();

//adding matirial to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMatirial = new THREE.MeshBasicMaterial({ color: "red" });

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMatirial);

scene.add(cubeMesh);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    30,
);

// Position the camera

camera.position.z = 5;

//initialize the renderer
const canvas = document.querySelector(".threejs");

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);
