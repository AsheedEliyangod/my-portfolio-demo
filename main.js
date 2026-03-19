console.log("JS START")


const canvas = document.getElementById("canvas")


/* UI */
const uiPanel = document.getElementById("uiPanel")
const uiText = document.getElementById("uiText")
let currentPage = ""


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
renderer.setPixelRatio(window.devicePixelRatio)


/* LIGHTING */
const ambient = new THREE.AmbientLight(0xffffff, 1.5)
scene.add(ambient)


const light = new THREE.DirectionalLight(0xffffff, 2)
light.position.set(5, 10, 7)
scene.add(light)


/* RAYCAST */
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()


/* MODEL */
let island


const loader = new THREE.GLTFLoader()


loader.load(
  "pirate_island.glb",


  function (gltf) {
    console.log("ISLAND LOADED ✅")


    island = gltf.scene
    scene.add(island)


    /* ===== FIXED POSITION ===== */
    island.position.set(0, 0, 0)


    /* ===== FIXED SCALE (WORKS EVERYWHERE) ===== */
    island.scale.set(.5, .5, .5)   // 🔥 increase if still small


    /* ===== FIXED CAMERA ===== */
    camera.position.set(0, 2, 5)
    camera.lookAt(0, 0, 0)
  },


  undefined,


  function (error) {
    console.error("MODEL ERROR ❌", error)
  }
)


/* CLICK HANDLER */
function handleClick(x, y) {


  mouse.x = (x / window.innerWidth) * 2 - 1
  mouse.y = -(y / window.innerHeight) * 2 + 1


  raycaster.setFromCamera(mouse, camera)


  if (!island) return


  const intersects = raycaster.intersectObjects(island.children, true)


  if (intersects.length > 0) {


    const name = intersects[0].object.name.toLowerCase()
    console.log("Clicked:", name)


    if (name.includes("house")) {
      currentPage = "about.html"
      uiText.innerText = "About Me"
    }
    else if (name.includes("ship") || name.includes("boat")) {
      currentPage = "projects.html"
      uiText.innerText = "Projects"
    }
    else {
      currentPage = "contact.html"
      uiText.innerText = "Contact"
    }


    uiPanel.style.display = "block"
  }
}


/* EVENTS */
window.addEventListener("click", (e) => {
  handleClick(e.clientX, e.clientY)
})


window.addEventListener("touchstart", (e) => {
  const t = e.touches[0]
  handleClick(t.clientX, t.clientY)
})


/* BUTTON */
function goPage() {
  if (currentPage) {
    window.location.href = currentPage
  }
}


/* ANIMATION */
function animate() {
  requestAnimationFrame(animate)


  if (island) {
    island.rotation.y += 0.002
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
