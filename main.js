const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


/* sprite */

const playerSprite = new Image();
playerSprite.src = "player.png";

let frame = 0;
let frameCount = 4;


/* clouds */

let clouds=[];

for(let i=0;i<5;i++){

clouds.push({
x:Math.random()*canvas.width,
y:Math.random()*200,
speed:0.3
});

}


/* mountains */

let mountains=[];

for(let i=0;i<4;i++){

mountains.push({
x:i*400,
y:canvas.height-250,
w:400,
h:200
});

}


function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);


/* sky */

let gradient = ctx.createLinearGradient(0,0,0,canvas.height);

gradient.addColorStop(0,"#020617");
gradient.addColorStop(1,"#0f172a");

ctx.fillStyle = gradient;
ctx.fillRect(0,0,canvas.width,canvas.height);


/* clouds */

ctx.fillStyle="#1e293b";

clouds.forEach(c=>{

ctx.beginPath();
ctx.arc(c.x,c.y,40,0,Math.PI*2);
ctx.fill();

c.x-=c.speed;

if(c.x<-50){
c.x=canvas.width+50;
}

});


/* mountains */

ctx.fillStyle="#111827";

mountains.forEach(m=>{

ctx.beginPath();
ctx.moveTo(m.x,m.y+m.h);
ctx.lineTo(m.x+m.w/2,m.y);
ctx.lineTo(m.x+m.w,m.y+m.h);
ctx.fill();

});


/* ground */

ctx.fillStyle="#020617";
ctx.fillRect(0,canvas.height-100,canvas.width,100);


/* player sprite animation */

ctx.drawImage(
playerSprite,
frame*32,0,
32,48,
200,canvas.height-150,
64,96
);


frame++;

if(frame>=frameCount){
frame=0;
}


requestAnimationFrame(draw);

}

draw();
