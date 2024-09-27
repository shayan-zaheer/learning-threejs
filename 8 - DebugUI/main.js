import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from "lil-gui";
const gui = new GUI({
    width: 300,
    title: "DEBUGUI",
    closeFolders: true
});

window.addEventListener("keydown", event => {
    if(event.key === "h"){
        gui.show(gui._hidden); // it toggles the debugui with the press of key
    }
})

const scrollers = gui.addFolder("Folder"); // if we want to keep certain controls together
scrollers.close(); // it will remain closed until opened

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

const guiProps = {
    color: "#ff00ff"
}

// const geometry = new THREE.SphereGeometry(1, 32, 32);

const geometry = new THREE.BoxGeometry(2, 2, 2);

const material = new THREE.MeshBasicMaterial({
    color: guiProps.color,
    wireframe: true
});

const box = new THREE.Mesh(geometry, material);
    
scene.add(camera);
scene.add(box);

scrollers.add(box.position, "y").min(-3).max(3).name("positionY"); // in this, we have to add an object and the object's property that we want to tweak in the parameters, with min and max if we want the slider

gui.add(material, "wireframe");

// for adding colors, we use addColor that's a different function

gui.addColor(guiProps, "color").onChange(() => {
    material.color.set(guiProps.color);
})

guiProps.spin = () => {
    gsap.to(box.rotation, {
        y: box.rotation.y + Math.PI * 2,
        duration: 2,
        ease: "power1.inOut"
    });
}

guiProps.segment = 2;

scrollers.add(guiProps, "segment").onChange(() => {
    box.geometry.dispose();
    box.geometry = new THREE.BoxGeometry(2, 2, 2, 
        guiProps.segment,
        guiProps.segment,
        guiProps.segment,
    ).min(1).max(10).step(1);
})

gui.add(guiProps, "spin");

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