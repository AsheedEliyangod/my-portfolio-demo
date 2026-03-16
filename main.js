const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight


/* stars */

let stars=[]

for(let i=0;i<100;i++){

stars.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2

})

}


/* clouds */

let clouds=[]

for(let i=0;i<5;i++){

clouds.push({

x:Math.random()*canvas.width,
y:Math.random()*200,
speed:0.2

})

}


/* mountains */

let mountains=[]

for(let i=0;i<3;i++){

mountains.push({

x:i*400,
y:canvas.height-300,
w:400,
h:200

})

}


/* trees */

let trees=[]

for(let i=0;i<6;i++){

trees.push({

x:i*250,
y:canvas.height-180

})

}


/* player */

let player={

x:200,
y:canvas.height-160,
frame:0

}


/* animation */

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)


/* sky gradient */

let gradient = ctx.createLinearGradient(0,0,0,canvas.height)

gradient.addColorStop(0,"#020617")
gradient.addColorStop(1,"#0f172a")

ctx.fillStyle = gradient
ctx.fillRect(0,0,canvas.width,canvas.height)


/* stars */

ctx.fillStyle="white"

stars.forEach(s=>{

ctx.fillRect(s.x,s.y,s.size,s.size)

})


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


/* ground */

ctx.fillStyle="#020617"

ctx.fillRect(0,canvas.height-100,canvas.width,100)


/* trees */

ctx.fillStyle="#1e293b"

trees.forEach(t=>{

ctx.fillRect(t.x,t.y,20,80)

ctx.beginPath()
ctx.arc(t.x+10,t.y,40,0,Math.PI*2)
ctx.fill()

t.x-=1

if(t.x<-50) t.x=canvas.width

})


/* walking player */

ctx.fillStyle="#38bdf8"

let step = Math.sin(player.frame)*5

ctx.fillRect(player.x,player.y+step,40,80)

player.frame+=0.1


requestAnimationFrame(draw)

}

draw()
