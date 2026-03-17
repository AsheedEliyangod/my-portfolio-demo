
const canvas = document.getElementById("canvas")

/* SCENE */
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x111827)

/* CAMERA */
const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
)
camera.position.set(0, 2, 5)
camera.lookAt(0, 0, 0)

/* RENDERER */
const renderer = new THREE.WebGLRenderer({
canvas: canvas,
antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

/* LIGHT */
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1)
scene.add(light)

/* GRID (optional for debugging) */
const grid = new THREE.GridHelper(10, 10)
scene.add(grid)

/* LOADER */
const loader = new THREE.GLTFLoader()

/* LOAD ISLAND */
loader.load(
"pirate_island.glb",

function (gltf) {

    const model = gltf.scene

    model.scale.set(1, 1, 1)

    /* Move island slightly down so it's visible */
    model.position.set(0, -1, 0)

    scene.add(model)

    console.log("ISLAND LOADED ✅")
},

undefined,

function (error) {
    console.error("MODEL ERROR ❌", error)
}
)

/* ANIMATION LOOP */
function animate() {
    requestAnimationFrame(animate)

    renderer.render(scene, camera)
}
animate()

/* RESIZE */
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})
