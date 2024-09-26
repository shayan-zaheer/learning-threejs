const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 700/500);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: "red"});

const box = new THREE.Mesh(geometry, material);

scene.add(box);

camera.position.z = 3;

scene.add(camera);

const canvas = document.querySelector(".wbgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(700, 500);

console.log(box);

// renderer.render(scene, camera);

// box.material.color.r = 1;

const clock = new THREE.Clock();

function animate(){
    window.requestAnimationFrame(animate);
    
    const getElapsedTime = clock.getElapsedTime();
    box.position.x = Math.cos(getElapsedTime);
    box.position.y = Math.sin(getElapsedTime);

    // box.material.color.b = Math.random();
    // box.material.color.g = Math.random();
    // box.material.color.r = Math.random();


    renderer.render(scene, camera);
}

animate();