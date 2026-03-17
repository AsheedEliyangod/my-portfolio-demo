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
canvas:document.getElementById("canvas"),
antialias:true
})

renderer.setSize(window.innerWidth,window.innerHeight)

/* LIGHTING */
const ambient = new THREE.AmbientLight(0xffffff,0.6)
scene.add(ambient)

const sun = new THREE.DirectionalLight(0xffffff,1)
sun.position.set(5,10,5)
scene.add(sun)

/* SKY */
scene.background = new THREE.Color(0x87ceeb)

/* WATER */
const water = new THREE.Mesh(
new THREE.CircleGeometry(20,64),
new THREE.MeshStandardMaterial({
color:0x1e3a8a,
transparent:true,
opacity:0.8
})
)
water.rotation.x = -Math.PI/2
scene.add(water)

/* ISLAND */
const island = new THREE.Mesh(
new THREE.CylinderGeometry(3,3,1,32),
new THREE.MeshStandardMaterial({color:0x3f6212})
)
island.position.y = -1
scene.add(island)

/* TREES */
function createTree(x,z){

const trunk = new THREE.Mesh(
new THREE.CylinderGeometry(0.1,0.1,1),
new THREE.MeshStandardMaterial({color:0x8b5a2b})
)

trunk.position.set(x,-0.2,z)

const leaves = new THREE.Mesh(
new THREE.SphereGeometry(0.5,16,16),
new THREE.MeshStandardMaterial({color:0x16a34a})
)

leaves.position.set(x,0.6,z)

scene.add(trunk)
scene.add(leaves)

}

/* add multiple trees */
createTree(-1.5,-1)
createTree(1.5,1)
createTree(-1.2,1.5)
createTree(1,-1.5)

/* CLOUDS */
const clouds=[]

for(let i=0;i<5;i++){

const cloud = new THREE.Mesh(
new THREE.SphereGeometry(0.6,16,16),
new THREE.MeshStandardMaterial({color:0xffffff})
)

cloud.position.set(
Math.random()*10-5,
3+Math.random(),
Math.random()*10-5
)

scene.add(cloud)
clouds.push(cloud)

}

/* CLICKABLE OBJECTS */
const objects=[]

function createObject(x,z,color,name){

const mesh = new THREE.Mesh(
new THREE.BoxGeometry(),
new THREE.MeshStandardMaterial({color})
)

mesh.position.set(x,0.3,z)
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
