alert("JS WORKING")
const canvas = document.getElementById("canvas")

/* SCENE */
const scene = new THREE.Scene()

/* CAMERA */
const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)
camera.position.set(3,3,5)

/* RENDERER */
const renderer = new THREE.WebGLRenderer({
canvas: canvas,
antialias: true
})
renderer.setSize(window.innerWidth,window.innerHeight)

/* LIGHT */
const light = new THREE.HemisphereLight(0xffffff,0x444444,1)
scene.add(light)

/* DEBUG GRID */
const grid = new THREE.GridHelper(10,10)
scene.add(grid)

/* LOADER */
const loader = new THREE.GLTFLoader()

/* LOAD MODEL */
loader.load(
"pirate_island.glb",

function(gltf){

    const model = gltf.scene

    /* CENTER MODEL */
    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    model.position.sub(center)

    model.scale.set(0.5,0.5,0.5)

    scene.add(model)

    console.log("MODEL LOADED ✅")

},

undefined,

function(error){
    console.error("ERROR ❌", error)
}
)

/* LOOP */
function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}
animate()

/* RESIZE */
window.addEventListener("resize",()=>{
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth,window.innerHeight)
})
