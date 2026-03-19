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


const loader = new THREE.GLTFLoader()


loader.load(
"pirate_island.glb",


function (gltf) {


    console.log("ISLAND LOADED ✅")


    island = gltf.scene
    scene.add(island)


    /* ===== PERFECT CENTER + SCALE ===== */
    const box = new THREE.Box3().setFromObject(island)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())


    // center model
    island.position.sub(center)


    // scale nicely
    const maxSize = Math.max(size.x, size.y, size.z)
    const scale = 6 / maxSize
    island.scale.set(scale, scale, scale)


    // push slightly down (fix base plane)
    island.position.y -= 0.5


    /* ===== PERFECT CAMERA ===== */
    camera.position.set(4, 3, 8)
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
