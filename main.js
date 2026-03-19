console.log("JS START")

const canvas = document.getElementById("canvas")

/* SCENE */
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x020617)

/* CAMERA */
const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
)

/* RENDERER */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})

renderer.setSize(window.innerWidth, window.innerHeight)

/* LIGHT */
scene.add(new THREE.AmbientLight(0xffffff, 1.5))

const light = new THREE.DirectionalLight(0xffffff, 2)
light.position.set(5, 10, 7)
scene.add(light)

/* MODEL */
let island

/* LOADER */
const loader = new THREE.GLTFLoader()

loader.load(
"pirate_island.glb",

function (gltf) {

    console.log("ISLAND LOADED ✅")

    island = gltf.scene
    scene.add(island)

    /* CENTER */
    const box = new THREE.Box3().setFromObject(island)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())

    island.position.sub(center)

    /* SCALE */
    const scale = 10 / Math.max(size.x, size.y, size.z)
    island.scale.set(scale, scale, scale)

    /* CAMERA */
    camera.position.set(2, 3, 6)
    camera.lookAt(0, 0, 0)
},

undefined,

function (error) {
    console.error("MODEL ERROR ❌", error)
}
)

/* ANIMATION */
function animate() {
    requestAnimationFrame(animate)

    if (island) {
        island.rotation.y += 0.003
    }

    renderer.render(scene, camera)
}

animate()

/* RESIZE */
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})
