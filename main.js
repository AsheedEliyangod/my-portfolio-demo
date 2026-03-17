console.log("JS START")

const canvas = document.getElementById("canvas")

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x020617)

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
)

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth, window.innerHeight)

/* LIGHT */
scene.add(new THREE.AmbientLight(0xffffff, 1.2))

const light = new THREE.DirectionalLight(0xffffff, 2)
light.position.set(5,10,7)
scene.add(light)

/* MODEL */
let island

const loader = new THREE.GLTFLoader()

loader.load(
"./pirate_island.glb",

function (gltf) {

    island = gltf.scene
    scene.add(island)

    const box = new THREE.Box3().setFromObject(island)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())

    island.position.sub(center)

    const scale = 15 / Math.max(size.x, size.y, size.z)
    island.scale.set(scale, scale, scale)

    camera.position.set(2, 3, 6)
    camera.lookAt(0, 0, 0)

    console.log("ISLAND LOADED ✅")
},

undefined,

function (error) {
    console.error("MODEL ERROR ❌", error)
}
)

/* ANIMATE */
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
