console.log("JS RUNNING")

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

/* MODEL VARIABLE */
let island

/* LOADER */
const loader = new THREE.GLTFLoader()

loader.load(
"pirate_island.glb",

function (gltf) {

    island = gltf.scene
    scene.add(island)

    /* CENTER MODEL */
    const box = new THREE.Box3().setFromObject(island)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())

    island.position.sub(center)

    /* AUTO SCALE */
    const maxSize = Math.max(size.x, size.y, size.z)
    const desiredSize = 12   // 🔥 adjust if needed
    const scale = desiredSize / maxSize

    island.scale.set(scale, scale, scale)

    /* CAMERA POSITION (PERFECT VIEW) */
    camera.position.set(3, 4, 10)
    camera.lookAt(0, 0, 0)

    console.log("ISLAND LOADED ✅")
},

undefined,

function (error) {
    console.error("MODEL ERROR ❌", error)
}
)

/* ANIMATION */
let time = 0

function animate() {
    requestAnimationFrame(animate)

    if (island) {
        island.rotation.y += 0.003   // 🔥 rotation

        time += 0.01
        island.position.y = Math.sin(time) * 0.2  // 🔥 floating
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
