

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
camera.position.set(4, 3, 6)

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

/* ===== TEST OBJECT (VERY IMPORTANT) ===== */
const cube = new THREE.Mesh(
new THREE.BoxGeometry(),
new THREE.MeshStandardMaterial({ color: 0x00ff00 })
)
scene.add(cube)

/* ===== GRID ===== */
const grid = new THREE.GridHelper(10, 10)
scene.add(grid)

/* ===== LOADER ===== */
const loader = new THREE.GLTFLoader()

/* LOAD ISLAND MODEL */
loader.load(
"pirate_island.glb",

function (gltf) {
    const model = gltf.scene

    /* CENTER MODEL */
    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    model.position.sub(center)

    model.scale.set(0.5, 0.5, 0.5)

    scene.add(model)

    console.log("ISLAND LOADED ✅")
},

undefined,

function (error) {
    console.error("MODEL ERROR ❌", error)
}
)

/* ===== ANIMATION LOOP ===== */
function animate() {
    requestAnimationFrame(animate)

    cube.rotation.y += 0.01

    renderer.render(scene, camera)
}
animate()

/* ===== RESIZE ===== */
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})
