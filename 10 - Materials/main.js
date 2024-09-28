import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader.js"

const gui = new GUI();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);

const textureLoader = new THREE.TextureLoader();
const earth = textureLoader.load("./earth.jpg");
earth.colorSpace = THREE.SRGBColorSpace;

const moon = textureLoader.load("./moon.jpg");
moon.colorSpace = THREE.SRGBColorSpace;

const normal = textureLoader.load("./normal.jpg");
normal.colorSpace = THREE.SRGBColorSpace;

const alphaTexture = textureLoader.load("./alpha.jpg");
alphaTexture.colorSpace = THREE.SRGBColorSpace;

const gradient = textureLoader.load("./3.jpg");


// texture.repeat.x = 2;
// texture.repeat.y = 2;

// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;

earth.magFilter = THREE.NearestFilter;
earth.minFilter = THREE.NearestFilter;

moon.magFilter = THREE.NearestFilter;
moon.minFilter = THREE.NearestFilter;

camera.position.z = 5;

const geometry = new THREE.BoxGeometry(2,2,2);
// const material = new THREE.MeshBasicMaterial({
//     map: texture
// });

// const box = new THREE.Mesh(geometry, material);

scene.add(camera);
// scene.add(box);

window.addEventListener("resize", event => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
})

const canvas = document.querySelector(".wbgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);

// const material = new THREE.MeshBasicMaterial({
//     // map: texture
// })

// MESH NORMAL MATERIAL

// a colorful material, (idk what this is, not even explained)

/*
const material = new THREE.MeshNormalMaterial() 
material.flatShading = true; // every shape is shown like its made out of boxes
*/

// MESH METCAP MATERIAL

// used to show shadows and lightings without working hard

// MESH DEPTH MATERIAL

// used when a shape is slightly displayed but is displayed properly when zoomed!

// const material = new THREE.MeshDepthMaterial(); 

// MESH LAMBERT MATERIAL

// used when we want to give proper lighting and stuff

/*

const material = new THREE.MeshLambertMaterial();

const ambientLight = new THREE.AmbientLight(0xffffff, 1);

const pointLight = new THREE.PointLight(0xffffff, 30);

pointLight.position.set(2, 3, 4);

scene.add(ambientLight);
scene.add(pointLight);

*/

// MESH TOON MATERIAL

// similar to lambert material, gives a cartoonish effect

/*

const material = new THREE.MeshToonMaterial();
const ambientLight = new THREE.AmbientLight(0xffffff, 1);

const pointLight = new THREE.PointLight(0xffffff, 30);

pointLight.position.set(2, 3, 4);

scene.add(ambientLight);
scene.add(pointLight);

material.gradientMap = gradient;
gradient.magFilter = THREE.NearestFilter;
gradient.minFilter = THREE.NearestFilter;

*/

// MESH STANDARD MATERIAL

// used most of the time, close to real

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.5;
material.roughness = 1;
material.normalMap = normal;

// material.displacementMap; // takes the texture and it makes it look like popped out, white area is popped out, gray stays intact, and black looks popped in. But for better display, we have to increase the width and height segments in geometries

// material.displacementScale; // the intensity

// material.normalMap; // low level displacementMap, doesn't take much memory when compared to its alternative

const moonMesh = new THREE.MeshStandardMaterial();
moonMesh.metalness = 0.5;
moonMesh.roughness = 1;

gui.add(material, "metalness").min(0).max(1);
gui.add(material, "roughness").min(0).max(1);
material.map = earth;
moonMesh.map = moon;

// const ambientLight = new THREE.AmbientLight(0xffffff, 1);

// const pointLight = new THREE.PointLight(0xffffff, 30);

// pointLight.position.set(2, 3, 4);

// scene.add(ambientLight);
// scene.add(pointLight);

material.gradientMap = gradient;
gradient.magFilter = THREE.NearestFilter;
gradient.minFilter = THREE.NearestFilter;

const rgbeLoader = new RGBELoader();
rgbeLoader.load("./2k.hdr", (enviroMap) => {
    enviroMap.mapping = THREE.EquirectangularReflectionMapping; // to allow moving along with environment

    scene.background = enviroMap;
    scene.environment = enviroMap;
});


// material.map = texture;

// // we can give colors like the following too

// material.color = new THREE.Color("#fff000")

// // opacity

// material.transparent = true;
// material.opacity = 0.5;

// // ALPHAMAP

// material.alphaMap = alphaTexture; // rgba
// material.side = THREE.BackSide; // to see any side of a plane (plane is only showing one side at a moment so for that!)

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 16, 16),
    material
);

const sphere2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    moonMesh
);

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
);

plane.position.x = -2;

sphere2.position.set(2, 0, 0);

// Create a rotation axis
const axis = new THREE.Vector3(0, 1, 0);

torus.position.x = 4;

scene.add(plane);
scene.add(sphere);
// scene.add(sphere2);
sphere.add(sphere2);
scene.add(torus);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();

function animate(){
    window.requestAnimationFrame(animate);

    plane.rotation.x = clock.getElapsedTime();
    sphere.rotation.y = clock.getElapsedTime();

    sphere2.rotation.y = clock.getElapsedTime()/2;

    // sphere2.quaternion.setFromAxisAngle(axis, 0.01);

    torus.rotation.x = clock.getElapsedTime();

    controls.update();
    renderer.render(scene, camera);
}

animate();