let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(65, window.innerWidth/window.innerHeight, .1, 100);
camera.position.z = 5;
scene.add(camera);

let box = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({color: "red"});
let mesh = new THREE.Mesh(box, material);

// in threejs, positive value of y results in upper movement
// negative value of y results in lower movement

// Math.PI plays a huge role in Three.js
// giving Math.PI in rotation means that it completes the whole revolution.
// values are to be given in radians, not in degrees

/*

mesh.position.x = 1;
mesh.position.z = 3;

mesh.rotation.x = 1;

mesh.scale.z = 1;

mesh.rotation.y = Math.PI / 4;

*/

scene.add(mesh);

const canvas = document.querySelector("canvas");
let renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

let clock = new THREE.Clock();

function animate(){
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);

    // mesh.rotation.y += 0.01;
    // mesh.rotation.x += 0.01;

    /* The problem with this approach is that
        it can be that different people have different 
        FPS and a person with 30 FPS monitor will only 
        see the cube move slower when compared to a person with
        60 FPS monitor. Means that for 30 FPS monitor, 0.01 is being added 30 times in a second whereas, for 60 FPS monitor, 0.01 is being added 60 times in a second. Affecting consistency. To fix this, THREEjs introduced 
        clock. Now, we handle animation based on time (a second) passed instead of using FPS concept.
    */

        mesh.rotation.y = clock.getElapsedTime() * 6;

}

animate();