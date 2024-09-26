import * as THREE from "three";

const scene = new THREE.Scene();

const aspectRatio = 700/500;

const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 1, 100); // orthographic camera differs from perspective camera in the sense that orthographic camera will always show the real height and width of the object. whereas perspective camera will show the object big or small based on its direction

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: "green",
});

const box = new THREE.Mesh(geometry, material);

camera.position.z = 5;

scene.add(camera);
scene.add(box);

const canvas = document.querySelector(".wbgl");
const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(700, 500);

const clock = new THREE.Clock();

function animate(){
    window.requestAnimationFrame(animate);
    box.rotation.x = clock.getElapsedTime();
    renderer.render(scene, camera);
}

animate();
