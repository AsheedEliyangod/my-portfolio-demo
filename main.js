import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js'
import { GLTFLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js'

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
scene.add(new THREE.AmbientLight(0xffffff,0.8))

const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(5,10,5)
scene.add(light)

/* GRID (DEBUG) */
const grid = new THREE.GridHelper(10,10)
scene.add(grid)

/* LOADER */
const loader = new GLTFLoader()

let island

/* LOAD MODEL */
loader.load('./pirate_island.glb',(gltf)=>{

    island = gltf.scene

    /* CENTER MODEL */
    const box = new THREE.Box3().setFromObject(island)
    const center = box.getCenter(new THREE.Vector3())
    island.position.sub(center)

    island.scale.set(0.5,0.5,0.5)

    scene.add(island)

    console.log("Island loaded ✅")

},undefined,(error)=>{
    console.error("ERROR loading model ❌", error)
})

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
    }

})

/* ANIMATION */
function animate(){

    requestAnimationFrame(animate)

    camera.position.lerp(targetPos,0.05)
    camera.lookAt(0,0,0)

    renderer.render(scene,camera)
}
animate()

/* RESIZE */
window.addEventListener("resize",()=>{
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth,window.innerHeight)
})
