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
scene.add(new THREE.AmbientLight(0xffffff,0.6))

const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(5,10,5)
scene.add(light)

const hemi = new THREE.HemisphereLight(0xffffff,0x444444,1)
scene.add(hemi)

/* DEBUG GRID */
const grid = new THREE.GridHelper(10,10)
scene.add(grid)

/* LOADER */
const loader = new THREE.GLTFLoader()

let island

/* LOAD ISLAND */
loader.load("./pirate_island.glb",(gltf)=>{

    island = gltf.scene

    /* CENTER MODEL */
    const box = new THREE.Box3().setFromObject(island)
    const center = box.getCenter(new THREE.Vector3())
    island.position.sub(center)

    island.scale.set(0.5,0.5,0.5)

    scene.add(island)

    console.log("Model Loaded ✅")

    /* PRINT ALL OBJECT NAMES */
    island.traverse((child)=>{
        if(child.isMesh){
            console.log("Mesh:", child.name)
        }
    })

})

/* CAMERA TARGET */
let targetPos = new THREE.Vector3(3,3,5)

/* RAYCAST */
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

window.addEventListener("click",(e)=>{

    mouse.x = (e.clientX/window.innerWidth)*2 - 1
    mouse.y = -(e.clientY/window.innerHeight)*2 + 1

    raycaster.setFromCamera(mouse,camera)

    if(!island) return

    const intersects = raycaster.intersectObject(island,true)

    if(intersects.length > 0){

        const object = intersects[0].object
        console.log("Clicked:", object.name)

        /* CAMERA ZOOM */
        const point = intersects[0].point
        targetPos.set(point.x+1.5, point.y+1.5, point.z+1.5)

        const ui = document.getElementById("ui")
        ui.style.display = "block"

        /* 🔥 OBJECT BASED LOGIC */
        const name = object.name.toLowerCase()

        if(name.includes("house")){
            ui.innerHTML = "<h2>About Me</h2><p>I am a Game Developer working with Unreal Engine.</p>"
        }
        else if(name.includes("dock") || name.includes("boat")){
            ui.innerHTML = "<h2>Projects</h2><p>Unreal Engine environments and gameplay systems.</p>"
        }
        else if(name.includes("tree")){
            ui.innerHTML = "<h2>Skills</h2><p>Unreal Engine, C, C#, JavaScript</p>"
        }
        else{
            ui.innerHTML = "<h2>Contact</h2><p>asheedeliyangod@gmail.com</p>"
        }

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
