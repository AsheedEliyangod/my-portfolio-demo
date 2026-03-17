console.log("START")

const canvas = document.getElementById("canvas")

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x020617)

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth, window.innerHeight)

/* LIGHT */
scene.add(new THREE.AmbientLight(0xffffff, 1))
const light = new THREE.DirectionalLight(0xffffff, 2)
light.position.set(5,10,7)
scene.add(light)

/* LOADER */
const loader = new THREE.GLTFLoader()

loader.load(
  "pirate_island.glb",
  function(gltf){

    const island = gltf.scene
    scene.add(island)

    island.scale.set(2,2,2)

    camera.position.set(3,3,6)
    camera.lookAt(0,0,0)

    console.log("MODEL OK")

  },
  undefined,
  function(e){
