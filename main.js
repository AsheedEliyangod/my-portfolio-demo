const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight


/* clouds */

let clouds = []

for(let i=0;i<6;i++){

clouds.push({
x:Math.random()*canvas.width,
y:Math.random()*200,
speed:0.3
})

}


/* mountains */

let mountains = []

for(let i=0;i<3;i++){

mountains.push({
x:i*400,
y:canvas.height-300,
w:400,
h:200
})

}


/* trees */

let trees = []

for(let i=0;i<6;i++){

trees.push({
x:i*200,
y:canvas.height-180
})

}


/* player */

let player = {
x:200,
y:canvas.height-170
}


/* draw loop */

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)


/* sky */

let gradient = ctx.createLinearGradient(0,0,0,canvas.height)
gradient.addColorStop(0,"#020617")
gradient.addColorStop(1,"#0f172a")

ctx.fillStyle = gradient
ctx.fillRect(0,0,canvas.width,canvas.height)


/* clouds */

ctx.fillStyle="#1e293b"

clouds.forEach(c=>{

ctx.beginPath()
ctx.arc(c.x,c.y,40,0,Math.PI*2)
ctx.fill()

c.x-=c.speed

if(c.x<-50) c.x=canvas.width

})


/* mountains */

ctx.fillStyle="#111827"

mountains.forEach(m=>{

ctx.beginPath()

ctx.moveTo(m.x,m.y+m.h)
ctx.lineTo(m.x+m.w/2,m.y)
ctx.lineTo(m.x+m.w,m.y+m.h)

ctx.fill()

})


/* trees */

ctx.fillStyle="#1e293b"

trees.forEach(t=>{

ctx.fillRect(t.x,t.y,20,80)

ctx.beginPath()
ctx.arc(t.x+10,t.y,40,0,Math.PI*2)
ctx.fill()

})


/* player */

ctx.fillStyle="#38bdf8"
ctx.fillRect(player.x,player.y,50,80)


requestAnimationFrame(draw)

}

draw()
