// scene
const scene = new THREE.Scene();

// geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const cube = new THREE.Mesh(geometry, material);
cube.position.y = 1;
scene.add(cube);

// sizes

const sizes = {
  width: 800,
  height: 600,
};

// camera - add a field of view and an aspect ratio
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);

// renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
