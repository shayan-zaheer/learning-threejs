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

// loading manager

const loadingManager = new THREE.LoadingManager()

loadingManager.onError = () => {

}

loadingManager.onProgress = () => {

}

loadingManager.onLoad = () => {

}

const textureLoader = new THREE.TextureLoader(loadingManager);
const color = textureLoader.load("./us.jpg")
color.colorSpace = THREE.SRGBColorSpace; // gives a realistic look
const minecraft = textureLoader.load("./minecraft.png");

minecraft.colorSpace = THREE.SRGBColorSpace;

minecraft.magFilter = THREE.NearestFilter;

color.repeat.y = 2; // how many times we want the texture to repeat
color.repeat.x = 2;

color.wrapS = THREE.RepeatWrapping; // enables wrapping on x - axis
color.wrapT = THREE.RepeatWrapping; // enables wrapping on y - 

// color.wrapS = THREE.MirroredRepeatWrapping; // mirrors the texture on x - axis
// color.wrapT = THREE.MirroredRepeatWrapping; // mirrors the texture on y - axis

// color.offset.x = 0.5 // moves the texture away for given distance

color.rotation = Math.PI / 4;
color.center.x = 0.5; // brings the points to the center and then rotate
color.center.y = 0.5;

color.minFilter = THREE.NearestFilter; // it is used because when without using it, you zoom into the image and it becomes blurry, to fix that issue. This is used

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
    map: minecraft,
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