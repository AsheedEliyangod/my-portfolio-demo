console.log("JS RUNNING")

const canvas = document.getElementById("canvas")

/* SCENE */
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x020617) // dark bg

/* CAMERA */
const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
)
camera.position.set(0, 2, 6) // ✅ set early

/* RENDERER */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})

renderer.setSize(window.innerWidth, window.innerHeight)

/* COLOR FIX */
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1
renderer.physicallyCorrectLights = true

/* LIGHTING */
const ambient = new THREE.AmbientLight(0xffffff, 1.2)
scene.add(ambient)

const dirLight = new THREE.DirectionalLight(0xffffff, 2)
dirLight.position.set(5, 10, 7)
scene.add(dirLight)

/* GRID (optional) */
const grid = new THREE.GridHelper(10, 10)
scene.add(grid)

/* LOADER */
const loader = new THREE.GLTFLoader()

loader.load(
"pirate_island.glb",

function (gltf) {

    const model = gltf.scene
    scene.add(model)

    /* ✅ CENTER MODEL (ONLY ONCE) */
    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    model.position.sub(center)

    /* ✅ SCALE FIX */
    model.scale.set(0.1, 0.1, 0.1)

    /* ✅ LOOK AT CENTER */
    camera.lookAt(0, 0, 0)

    console.log("ISLAND LOADED ✅")
},

undefined,

function (error) {
    console.error("MODEL ERROR ❌", error)
}
)

/* LOOP */
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
