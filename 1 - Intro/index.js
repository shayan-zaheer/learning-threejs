const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({
    color: "red"
});

const box = new THREE.Mesh(geometry, material);

box.position.x = 0.7;
box.position.y = -0.6;
box.position.z = 1;

scene.add(box);

console.log(box.position.length());

const camera = new THREE.PerspectiveCamera(75, 700/500);
camera.position.z = 5;
scene.add(camera);

const canvas = document.querySelector(".wbgl");
const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(700, 500);
renderer.render(scene, camera);

