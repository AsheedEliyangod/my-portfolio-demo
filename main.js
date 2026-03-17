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

/* LIGHTING */
const ambient = new THREE.AmbientLight(0xffffff, 1.2)
scene.add(ambient)

const dirLight = new THREE.DirectionalLight(0xffffff, 2)
dirLight.position.set(5, 10, 7)
scene.add(dirLight)

/* RAYCAST */
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

/* UI */
const actionUI = document.getElementById("actionUI")
const actionBtn = document.getElementById("actionBtn")
let currentPage = ""

/* MODEL */
let island

/* CAMERA ANIMATION */
let targetPosition = null
let isZooming = false

/* LOADER */
const loader = new THREE.GLTFLoader()

loader.load(
  "pirate_island.glb",

  function (gltf) {
    island = gltf.scene
    scene.add(island)

    /* DEBUG NAMES */
    island.traverse((obj) => {
      console.log("Object:", obj.name)
    })

    /* CENTER */
    const box = new THREE.Box3().setFromObject(island)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())

    island.position.sub(center)

    /* SCALE */
    const maxSize = Math.max(size.x, size.y, size.z)
    const scale = 20 / maxSize
    island.scale.set(scale, scale, scale)

    /* CAMERA START */
    camera.position.set(2, 3, 6)
    camera.lookAt(0, 1, 0)

    console.log("ISLAND LOADED ✅")
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

  const intersects = raycaster.intersectObject(island, true)

  if (intersects.length > 0) {
    const obj = intersects[0].object
    const name = obj.name.toLowerCase()

    console.log("Clicked:", name)

    /* 🎯 GET WORLD POSITION */
    const worldPos = new THREE.Vector3()
    obj.getWorldPosition(worldPos)

    /* 🎥 CAMERA TARGET */
    targetPosition = worldPos.clone().add(new THREE.Vector3(2, 2, 4))
    isZooming = true

    /* BUTTON TEXT */
    if (name.includes("house")) {
      currentPage = "about.html"
      actionBtn.innerText = "About Me"
    } else if (name.includes("ship") || name.includes("boat")) {
      currentPage = "projects.html"
      actionBtn.innerText = "Projects"
    } else if (name.includes("tree")) {
      currentPage = "skills.html"
      actionBtn.innerText = "Skills"
    } else {
      currentPage = "contact.html"
      actionBtn.innerText = "Contact"
    }

    actionUI.style.display = "none"
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

/* BUTTON NAVIGATION */
actionBtn.addEventListener("click", () => {
  if (currentPage) {
    window.location.href = currentPage
  }
})

/* ANIMATION */
let time = 0

function animate() {
  requestAnimationFrame(animate)

  if (island) {
    island.rotation.y += 0.003
    time += 0.01
    island.position.y = Math.sin(time) * 0.2
  }

  /* 🎥 CAMERA ZOOM */
  if (isZooming && targetPosition) {
    camera.position.lerp(targetPosition, 0.05)

    camera.lookAt(0, 1, 0)

    if (camera.position.distanceTo(targetPosition) < 0.1) {
      isZooming = false
      actionUI.style.display = "block"
    }
  }

  renderer.render(scene, camera)
}

animate()

/* RESIZE */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})})

window.addEventListener("touchstart", (e) => {
    const t = e.touches[0]
    handleClick(t.clientX, t.clientY)
})

actionBtn.addEventListener("click", () => {
    if (currentPage) {
        window.location.href = currentPage
    }
})

/* ANIMATION */
let time = 0

function animate() {
    requestAnimationFrame(animate)

    if (island) {
        island.rotation.y += 0.003
        time += 0.01
        island.position.y = Math.sin(time) * 0.2
    }

    renderer.render(scene, camera)
}

animate()

/* RESIZE */
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})            alert("About Me Page")
            // window.location.href = "about.html"
        }
        else if (name.includes("ship") || name.includes("boat")) {
            alert("Projects Page")
            // window.location.href = "projects.html"
        }
        else if (name.includes("tree")) {
            alert("Skills Page")
        }
        else {
            alert("Contact Page")
        }
    }
}

/* DESKTOP CLICK */
window.addEventListener("click", (e) => {
    handleClick(e.clientX, e.clientY)
})

/* MOBILE TOUCH */
window.addEventListener("touchstart", (e) => {
    const touch = e.touches[0]
    handleClick(touch.clientX, touch.clientY)
})

/* ANIMATION */
let time = 0

function animate() {
    requestAnimationFrame(animate)

    if (island) {
        island.rotation.y += 0.003

        time += 0.01
        island.position.y = Math.sin(time) * 0.2
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
