import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene();

window.addEventListener("dblclick", event => {
    if(!document.fullscreenElement){
        canvas.requestFullscreen();
    } else{
        document.exitFullscreen();
    }
})

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);

camera.position.z = 5;

// const geometry = new THREE.BoxGeometry(2, 2, 2, 2, 2, 2);

// const geometry = new THREE.SphereGeometry(1, 32, 32);

const geometry = new THREE.BufferGeometry() // buffergeometry is used to make your own geometries
// const array = new Float32Array([0,0,0,0,1,0,1,0,0]); // float32array is a type of array that takes only float values, takes the size as parameter or the entire array

// const positionAttribute = new THREE.BufferAttribute(array, 3); // we have to specify how many axes are there, e.g: in UV, there are 2

// geometry.setAttribute("position", positionAttribute);


const count = 50;
const array = new Float32Array(50*9);
for(let i=0; i<count*9; i++){
    array[i] = Math.random() - 0.5;
}
const positionAttribute = new THREE.BufferAttribute(array, 3);
geometry.setAttribute("position", positionAttribute);

/*

another approach for filling float32array

array[0] = 0;
array[1] = 0;
array[2] = 0;

// every three array values represent x,y,z axes and these values represent a vertex. Three vertex for triangle

array[3] = 0;
array[4] = 1;
array[5] = 0;

array[6] = 1;
array[7] = 0;
array[8] = 0;

*/

const material = new THREE.MeshBasicMaterial({
    color: "red",
    wireframe: true
});

const cursor = {
    x: 0,
    y: 0
}

const box = new THREE.Mesh(geometry, material);
    
scene.add(camera);
scene.add(box);

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
const clock = new THREE.Clock();

function animate(){
    window.requestAnimationFrame(animate);
    control.update(); 
    renderer.render(scene, camera);
}

animate();