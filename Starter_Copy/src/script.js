import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";
// import {} from '../static/texture/whispy-grass-meadow-ue/whispy-grass-meadow-ue/whispy-grass-meadow-ue_albedo.jpg';

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
const grassAlbedo = textureLoader.load(
    "/texture/whispy-grass-meadow-ue/whispy-grass-meadow-ue/wispy-grass-meadow_albedo.png",
);

const grassAO = textureLoader.load(
    "/texture/whispy-grass-meadow-ue/whispy-grass-meadow-ue/wispy-grass-meadow_ao.png",
);

const grassHeight = textureLoader.load(
    "/texture/whispy-grass-meadow-ue/whispy-grass-meadow-ue/wispy-grass-meadow_height.png",
);

const grassMetallic = textureLoader.load(
    "/texture/whispy-grass-meadow-ue/whispy-grass-meadow-ue/wispy-grass-meadow_metallic.png",
);

const grassNormal = textureLoader.load(
    "/texture/whispy-grass-meadow-ue/whispy-grass-meadow-ue/wispy-grass-meadow_normal-dx.png",
);

const grassRoughness = textureLoader.load(
    "/texture/whispy-grass-meadow-ue/whispy-grass-meadow-ue/wispy-grass-meadow_roughness.png",
);

// initialize the material
const material = new THREE.MeshStandardMaterial();
material.map = grassAlbedo;
material.roughnessMap = grassRoughness;
material.roughness = 1

material.metalnessMap = grassMetallic;
material.metalness = 0;

material.normalMap = grassNormal;



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

// Lower ambient so point light has visible effect
const light = new THREE.AmbientLight(0xffffff, 0.5); 
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 150); 
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    0.1,
    10000,
);
camera.position.z = 10;
camera.position.y = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace; // ensure correct gamma
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;

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
    // group.children.forEach((child) => {
    //     if (child instanceof THREE.Mesh) {
    //         child.rotation.y += 0.01;
    //     }
    // });
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
