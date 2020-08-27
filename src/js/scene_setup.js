console.log('main screen')

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ControlsPanel } from './globals'
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// point lights imports
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

let camera, scene, renderer, geometry, material
let light1, light2, light3, light4,
  object
var clock = new THREE.Clock()

init()
animate()

function init() {

  var loader = new FBXLoader()
  loader.load('src/assets/models/goat.fbx', function(obj) {
    console.log('model loaded')
    object = obj
    object.scale.multiplyScalar(0.001)
    object.rotateX(70)
    object.rotateY(70)
    object.rotateZ(70)
    scene.add(object)
  })

  var sphere = new THREE.SphereBufferGeometry(0.5, 16, 8)
  //lights
  light1 = new THREE.PointLight(0xff0040, 2, 50)

  window.addEventListener('resize', onWindowResize, false)
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000)
  camera.position.set(10, 10, 10);
  scene = new THREE.Scene()

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0xf2edd9, 1)
  document.body.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.z -= 0.01

  // switch camera view
  //@TODO: add animation - on click rotation or light fade out / in
  //@TODO: add tooltip
  //@TODO: available only when it makes sense to have two different perspectives
  $('.controls-panel').on('click', function() {

    if (ControlsPanel.cameraView === 'onePoint') {
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000)
      camera.position.set(10, 10, 10)
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.target.z -= 0.01
    } else {
      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.target.z -= 0.01
    }
  })

  const grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000)
  grid.material.opacity = 0.2
  grid.material.transparent = true
  scene.add(grid)
  // end development mode


  const light = new THREE.AmbientLight(0x404040) // soft white light
  scene.add(light)
  geometry = new THREE.PlaneBufferGeometry()
  material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide })

  const count = 1
  const radius = 2

  for (let i = 0; i < count; i++) {

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    var s = i / count * Math.PI * 2

    mesh.position.x = radius * Math.sin(s)
    mesh.position.z = radius * Math.cos(s)

    mesh.lookAt(scene.position)
  }
}

function animate() {

  requestAnimationFrame(animate)
  renderer.render(scene, camera)

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)

}



// particlesJS.load('particles-js', 'assets/particles-config.json', function() {
//   console.log('callback - particles.js config loaded')
// })
