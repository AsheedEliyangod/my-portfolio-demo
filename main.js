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
camera.position.set(6,4,6)

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

/* SKY */
scene.background = new THREE.Color(0x87ceeb)

/* LOADER */
const loader = new THREE.GLTFLoader()

let island
let character
let mixer

/* LOAD ISLAND */
loader.load("pirate_island.glb",(gltf)=>{
island = gltf.scene
island.scale.set(1.5,1.5,1.5)
scene.add(island)
})

/* LOAD CHARACTER */
loader.load("character.glb",(gltf)=>{
character = gltf.scene
character.scale.set(0.8,0.8,0.8)
character.position.set(0,0,2)
scene.add(character)

/* animation */
mixer = new THREE.AnimationMixer(character)
if(gltf.animations.length > 0){
const action = mixer.clipAction(gltf.animations[0])
action.play()
}
})

/* CAMERA TARGET */
let targetPos = new THREE.Vector3(6,4,6)

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

const point = intersects[0].point

/* CAMERA MOVE */
targetPos.set(
point.x + 2,
point.y + 2,
point.z + 2
)

/* UI */
const ui = document.getElementById("ui")
ui.style.display = "block"

/* AREA LOGIC */
if(point.x < 0){
ui.innerHTML = "<h2>About Me</h2><p>Aspiring Game Developer working with Unreal Engine.</p>"
}
else if(point.x > 1){
ui.innerHTML = "<h2>Projects</h2><p>Unreal landscapes and gameplay systems.</p>"
}
else if(point.z < 0){
ui.innerHTML = "<h2>Skills</h2><p>Unreal Engine, C, C#, JavaScript</p>"
}
else{
ui.innerHTML = "<h2>Contact</h2><p>asheedeliyangod@gmail.com</p>"
}

}

})

/* ANIMATION LOOP */
const clock = new THREE.Clock()

function animate(){

requestAnimationFrame(animate)

const delta = clock.getDelta()

if(mixer) mixer.update(delta)

/* SMOOTH CAMERA */
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
})mesh.position.set(x,0.3,z)
mesh.userData.name = name

scene.add(mesh)
objects.push(mesh)

}

createObject(-2,0,0xff8800,"ABOUT")
createObject(2,0,0x0088ff,"PROJECTS")
createObject(0,-2,0x00ff88,"SKILLS")
createObject(0,2,0xff0000,"CONTACT")

/* RAYCASTER */
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

window.addEventListener("click",(e)=>{

mouse.x = (e.clientX/window.innerWidth)*2 - 1
mouse.y = -(e.clientY/window.innerHeight)*2 + 1

raycaster.setFromCamera(mouse,camera)

const hit = raycaster.intersectObjects(objects)

if(hit.length>0){

document.getElementById("ui").style.display="block"
document.getElementById("ui").innerHTML =
"<h2>"+hit[0].object.userData.name+"</h2>"

}

})

/* ANIMATION */
function animate(){

requestAnimationFrame(animate)

/* CAMERA ROTATION */
camera.position.x = Math.sin(Date.now()*0.0005)*6
camera.position.z = Math.cos(Date.now()*0.0005)*6

camera.lookAt(0,0,0)

/* FLOAT OBJECTS */
objects.forEach((obj,i)=>{
obj.position.y = 0.3 + Math.sin(Date.now()*0.002+i)*0.2
})

/* MOVE CLOUDS */
clouds.forEach(c=>{
c.position.x += 0.01
if(c.position.x > 6) c.position.x = -6
})

renderer.render(scene,camera)

}

animate()

/* RESIZE FIX */
window.addEventListener("resize",()=>{
camera.aspect = window.innerWidth/window.innerHeight
camera.updateProjectionMatrix()
renderer.setSize(window.innerWidth,window.innerHeight)
})
