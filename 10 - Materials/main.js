import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./me.jpg");
texture.colorSpace = THREE.SRGBColorSpace;

texture.repeat.x = 2;
texture.repeat.y = 2;

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

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

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial()
);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({
        wireframe: true
    })
);

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    new THREE.MeshBasicMaterial()
);

plane.position.x = -2;

torus.position.x = 2;

scene.add(plane);
scene.add(sphere);
scene.add(torus);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();

function animate(){
    window.requestAnimationFrame(animate);

    plane.rotation.x = clock.getElapsedTime();
    sphere.rotation.x = clock.getElapsedTime();
    torus.rotation.x = clock.getElapsedTime();

    controls.update();
    renderer.render(scene, camera);
}

animate();