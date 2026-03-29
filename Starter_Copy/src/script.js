import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";
// import {} from '../static/texture/space-cruiser-panels2-unity/space-cruiser-panels2-unity/space-cruiser-panels2_albedo.png'


// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

//initialize the loader
const textureLoader = new THREE.TextureLoader();

// initialize the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);

//Initialize the texture
const textureTest = textureLoader.load(
  "/texture/badlands-boulders-unity/badlands-boulders-unity/badlands-boulders_albedo.png"
);
console.log(textureTest);

// initialize the material
const material = new THREE.MeshBasicMaterial();
material.map = textureTest;



// Initialize the group
const group = new THREE.Group();

// initialize the mesh
const cube = new THREE.Mesh(geometry, material);

const knot = new THREE.Mesh(torusKnotGeometry, material);
knot.position.x = 1.5;

const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -1.5;
const sphere = new THREE.Mesh();
sphere.geometry = sphereGeometry;
sphere.material = material;
sphere.position.y = 1.5;

const cylinder = new THREE.Mesh();
cylinder.geometry = cylinderGeometry;
cylinder.material = material;
cylinder.position.y = -1.5;

// add the mesh to the scene
group.add(cube, knot, plane, sphere, cylinder);
scene.add(group);

// initialize the light
const light = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 1.2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// initialize the camera

// initialize the camera
const camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    0.1,
    30,
);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// initialize the controls
const controls = new OrbitControls(camera, renderer.domElement);

// handle window resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// animate the scene

function animate() {
    cube.rotation.x += 0.01;
    group.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
            child.rotation.y += 0.01;
        }
    });
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
