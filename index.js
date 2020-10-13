// function main() {
//   const canvas = document.querySelector("#c");
//   const renderer = new THREE.WebGLRenderer({
//     canvas,
//     alpha: true,
//   });

//   const fov = 75;
//   const aspect = 2; // the canvas default
//   const near = 0.1;
//   const far = 5;
//   const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//   camera.position.z = 2;

//   const scene = new THREE.Scene();

//   {
//     const color = 0xffffff;
//     const intensity = 1;
//     const light = new THREE.DirectionalLight(color, intensity);
//     light.position.set(-1, 2, 4);
//     scene.add(light);
//   }

//   const boxWidth = 1;
//   const boxHeight = 1;
//   const boxDepth = 1;
//   const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

//   function makeInstance(geometry, color, x) {
//     const material = new THREE.MeshPhongMaterial({ color });

//     const cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     cube.position.x = x;

//     return cube;
//   }

//   const cubes = [
//     makeInstance(geometry, 0x44aa88, 0),
//     makeInstance(geometry, 0x8844aa, -2),
//     makeInstance(geometry, 0xaa8844, 2),
//   ];

//   function resizeRendererToDisplaySize(renderer) {
//     const canvas = renderer.domElement;
//     const width = canvas.clientWidth;
//     const height = canvas.clientHeight;
//     const needResize = canvas.width !== width || canvas.height !== height;
//     if (needResize) {
//       renderer.setSize(width, height, false);
//     }
//     return needResize;
//   }

//   function render(time) {
//     time *= 0.001;

//     if (resizeRendererToDisplaySize(renderer)) {
//       const canvas = renderer.domElement;
//       camera.aspect = canvas.clientWidth / canvas.clientHeight;
//       camera.updateProjectionMatrix();
//     }

//     cubes.forEach((cube, ndx) => {
//       const speed = 1 + ndx * 0.1;
//       const rot = time * speed;
//       cube.rotation.x = rot;
//       cube.rotation.y = rot;
//     });

//     renderer.render(scene, camera);

//     requestAnimationFrame(render);
//   }

//   requestAnimationFrame(render);
// }

// main();

let scene, camera, renderer, sphere, wireframe, line;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color("black");
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.55,
    1000
  );

  renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("/moon_images/earth_moon_Base_Color.jpg");
  texture.encoding = THREE.sRGBEncoding;
  texture.anisotropy = 6;
  const geometry = new THREE.SphereBufferGeometry(5, 80, 80);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const light = new THREE.DirectionalLight("#db59ff", 3.5);
  light.position.set(3, 8, 10);
  sphere = new THREE.Mesh(geometry, material);
  
  // wireframe = new THREE.WireframeGeometry(geometry);
  line = new THREE.LineSegments(wireframe);
  line.material.depthTest = false;
  line.material.transparent = false;

  scene.add(sphere);
  scene.add(light);
  camera.position.z = 12;
}

function animate() {
  requestAnimationFrame(animate);
  line.rotation.x += 0.0004;
  line.rotation.y -= 0.0004;
  
  sphere.rotation.x = 0.099;
  sphere.rotation.y += 0.001;
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
}

window.addEventListener("resize", onWindowResize, false);

init();
animate();
