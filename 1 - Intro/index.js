const scene = new THREE.Scene(); // first, we create a scene, a scene can be referred to as the whole world of 3d

const group = new THREE.Group();
scene.add(group);

/* 
*/

const box1 = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshBasicMaterial({color: 0xff000})
);

box1.rotation.x = Math.PI * 0.25;
group.add(box1);

const box2 = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshBasicMaterial({color: 0x000ff})
);

box2.position.x = -3;
group.add(box2);

const box3 = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshBasicMaterial({color: "orange"})
);

box3.position.x = 3;
group.add(box3);
/*

const geometry = new THREE.BoxGeometry(2, 2, 2); // geometry can be said as any shape that we want to add, its parameters are (width, height, depth)
const material = new THREE.MeshBasicMaterial({
    color: "red",
}); // material can be used to give color to the geometry, it takes an object

const box = new THREE.Mesh(geometry, material); // Mesh function is used to merge the geometry and material

// box.rotation.reorder("YZX") // we can define the order in which we want the rotation to occur
box.rotation.x = Math.PI * 0.25;
box.rotation.y = Math.PI * 0.25;
box.rotation.z = Math.PI * 0.25;

// box.position.x = 0.7;
// box.position.y = -0.6;
// box.position.z = 1;

// an alternative

box.position.set(0.7, -0.6, 1);

scene.add(box); // we add the box into the scene

console.log(box.position.length()); // property to find the distance of the box from the center

// box.position.normalize(); // to normalize any distorted object
*/

const camera = new THREE.PerspectiveCamera(75, 700 / 500); // camera is our viewangle
camera.position.z = 5; 

// camera.position.set(1, 1, 3);

// camera.lookAt(new THREE.Vector3(1, 0, 1));
// camera.lookAt(box.position); // thing is that camera always looks at the center, so we can assign a new vector or box's position so that it always follows the box

scene.add(camera); // we add the camera to the scene



const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper); // It shows the axes on to the scene, with RGB representing x,y,z axes.

// console.log(box.position.distanceTo(camera.position)) // property to find the distance of the box from any thing basically, here we're finding the distance of the box from the camera

const canvas = document.querySelector(".wbgl"); // we create a canvas in html and refer to that
const renderer = new THREE.WebGLRenderer({ canvas }); // we render on to the canvas

renderer.setSize(700, 500);
renderer.render(scene, camera); // then we give the scene and camera to render function