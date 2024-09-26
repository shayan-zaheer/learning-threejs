import * as THREE from "three"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 700/500);

camera.position.z = 5;

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({
    color: "red"
});

const sizes = {
    width: 700,
    height: 500
}

const cursor = {
    x: 0,
    y: 0
}

const box = new THREE.Mesh(geometry, material);

// box.rotation.x = 0.5;

window.addEventListener("mousemove", event => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.height - 0.5;
    console.log(cursor.x, cursor.y);
})

scene.add(camera);
scene.add(box);

const canvas = document.querySelector(".wbgl");
const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(700, 500);

const clock = new THREE.Clock();

function animate(){
    window.requestAnimationFrame(animate);

    // camera.position.x = cursor.x * 7;
    // camera.position.y = -cursor.y * 7;

    camera.position.x = Math.sin(cursor.x * 3) * 4;
    camera.position.y = cursor.y * 3;
    camera.position.z = Math.cos(cursor.x * 3) * 4;

    camera.lookAt(box.position);

    renderer.render(scene, camera);
}

animate();