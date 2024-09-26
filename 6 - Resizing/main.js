import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene();

// fullscreen

window.addEventListener("dblclick", event => {
    if(!document.fullscreenElement){
        canvas.requestFullscreen();
    } else{
        document.exitFullscreen();
    }
})

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);

camera.position.z = 5;

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({
    color: "red"
});

const cursor = {
    x: 0,
    y: 0
}

const box = new THREE.Mesh(geometry, material);

// window.addEventListener("mousemove", event => {
    //     cursor.x = event.clientX / sizes.width - 0.5;
    //     cursor.y = event.clientY / sizes.height - 0.5;
    //     console.log(cursor.x, cursor.y);
    // })
    
scene.add(camera);
scene.add(box);

const canvas = document.querySelector(".wbgl");
const renderer = new THREE.WebGLRenderer({canvas});
    
// controls

const control = new OrbitControls(camera, canvas);
// control.target.y = 2; => didn't understood
control.enableDamping = true;

// resizing

window.addEventListener("resize", event => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix(); // advanced concept => whenever a camera's aspect is changed, we have to update its projection matrix
    renderer.setSize(sizes.width, sizes.height);
})

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

function animate(){
    window.requestAnimationFrame(animate);
    control.update(); 
    renderer.render(scene, camera);
}

animate();