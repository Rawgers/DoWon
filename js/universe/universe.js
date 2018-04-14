const container = document.createElement( 'div' );
document.body.appendChild( container );

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(SCENE_BACKGROUND);
scene.fog = new THREE.Fog(scene.background, DEFAULT_NEAR, DEFAULT_FAR);
const regions = [];

// Camera and camera controls
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth/window.innerHeight, DEFAULT_NEAR, DEFAULT_FAR);
const clock = new THREE.Clock();
const controls = new THREE.FlyControls(camera);
controls.domElement = container;
controls.movementSpeed = DEFAULT_MOVEMENT_SPEED;
controls.rollSpeed = DEFAULT_ROLL_SPEED;
const initialSphereCenter = new THREE.Vector3().addVectors(
  camera.position, new THREE.Vector3(1000, 1000, 1000))
  //initialize far from camera to spawn on start
let timer;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Raycaster
const raycaster = new THREE.Raycaster();
raycaster.near = DEFAULT_NEAR;
raycaster.far = 50;
const mouse = new THREE.Vector2();

const loadSphere = new SphericalLoading(
  scene, SPAWN_RADIUS, VIEW_RADIUS, initialSphereCenter, SPRITE_SPAWN_PER_LOAD
);

// Animate and Render
function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  controls.update(clock.getDelta());
  console.log(scene.fog);

  if (!isInFocus) {
    loadSphere.checkSpawn(camera.position);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersected && intersected != intersects[0]) {
      // intersected.object.material.color.set(0xffffff);
      $('html,body').css('cursor', 'pointer');
    }else{
      $('html,body').css('cursor', 'default');
    }
    intersected = intersects[0];
    // intersected && intersected.object.material.color.set(0xe57373);
  }
  TWEEN.update();
  renderer.render(scene, camera);
}

setListeners();
animate();
