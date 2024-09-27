import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
const gui = new GUI({
    width: 300,
    title: "DEBUGUI",
    closeFolders: true
});

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene();

// texture

const textureLoader = new THREE.TextureLoader();
const color = textureLoader.load("./us2.jpg")


window.addEventListener("dblclick", event => {
    if(!document.fullscreenElement){
        canvas.requestFullscreen();
    } else{
        document.exitFullscreen();
    }
})

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);

camera.position.z = 5;

const geometry = new THREE.BoxGeometry(2, 2, 2, 2, 2, 2);

const material = new THREE.MeshBasicMaterial({
    map: color,
    // wireframe: true
});

const cursor = {
    x: 0,
    y: 0
}

const box = new THREE.Mesh(geometry, material);
    
scene.add(camera);
scene.add(box);

gui.add(material, "wireframe");

const canvas = document.querySelector(".wbgl");
const renderer = new THREE.WebGLRenderer({canvas});

const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

window.addEventListener("resize", event => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
})

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

function animate(){
    window.requestAnimationFrame(animate);
    control.update(); 
    renderer.render(scene, camera);
}

animate();