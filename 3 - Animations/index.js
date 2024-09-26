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

gsap.to(box.position, {
    x: 2,
    duration: 1,
    delay: 0
})

function animate(){
    window.requestAnimationFrame(animate);
    
    const getElapsedTime = clock.getElapsedTime();
    camera.position.x = Math.cos(getElapsedTime);
    camera.position.y = Math.sin(getElapsedTime);

    camera.lookAt(box.position);

    // box.material.color.b = Math.random();
    // box.material.color.g = Math.random();
    // box.material.color.r = Math.random();


    renderer.render(scene, camera);
}

animate();