console.log("JS START")

const canvas = document.getElementById("canvas")

const scene = new THREE.Scene()

/* 🔥 FORCE DARK BACKGROUND */
scene.background = new THREE.Color(0x000000)

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
)

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth, window.innerHeight)

/* LIGHT */
scene.add(new THREE.AmbientLight(0xffffff, 1.5))

const light = new THREE.DirectionalLight(0xffffff, 2)
light.position.set(5,10,7)
scene.add(light)

/* TEST CUBE (IMPORTANT) */
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(cube)

/* MODEL */
let island

const loader = new THREE.GLTFLoader()

loader.load(
"/my-portfolio-demo/pirate_island.glb",  // 🔥 FORCE FULL PATH

function (gltf) {

    console.log("LOADED ✅")

    island = gltf.scene
    scene.add(island)

    const box = new THREE.Box3().setFromObject(island)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())

    island.position.sub(center)

    const scale = 10 / Math.max(size.x, size.y, size.z)
    island.scale.set(scale, scale, scale)

},

undefined,

function (error) {
    console.error("ERROR ❌", error)
}
)

/* CAMERA */
camera.position.set(0, 2, 6)
camera.lookAt(0, 0, 0)

/* ANIMATE */
function animate() {
    requestAnimationFrame(animate)

    cube.rotation.y += 0.01

    if (island) {
        island.rotation.y += 0.003
    }

    renderer.render(scene, camera)
}

animate()
