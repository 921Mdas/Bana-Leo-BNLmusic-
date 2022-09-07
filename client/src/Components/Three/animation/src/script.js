import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// move camera event
const coords = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", e => {
  coords.x = e.clientX / sizes.width - 0.5;
  coords.y = e.clientY / sizes.height - 0.5;
});

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera, the last two parameters are the near and far
// determines which element should be rendered and not based on distance
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 1;
// controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// control the speed of the animation

const clock = new THREE.Clock();
// get more control on the animation
gsap.to(mesh.position, { duration: 1, delay: 1, x: 1 });

// render the animation
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  //   mesh.rotation.y = Math.sin(elapsedTime);
  //   mesh.position.x = Math.cos(elapsedTime);
  //   camera.position.x = Math.cos(coords.x * Math.PI * 2) * 3;
  //   camera.position.y = Math.sin(coords.y * Math.PI * 2) * 3;
  //   camera.lookAt(mesh.position);
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
