var canvas = document.querySelector("canvas");
var width = canvas.width = getWidth();
var height = canvas.height = Math.floor(window.innerHeight); 
// var width = canvas.width = 200;
// var height = canvas.height = 200; 
var ctx = canvas.getContext('2d');

function getWidth() {
    if (window.innerWidth < window.innerHeight) {
        return Math.floor(window.innerWidth);
    } else {  
        return Math.floor(window.innerHeight); 
    };
}

const p1 = {x: width*0.3, y: height*0.5, r: width*0.3}
const p2 = {x: width*0.7, y: height*0.5, r: width*0.3}
const dist = Math.sqrt((p1.x-p2.x)**2 + (p1.y-p2.y)**2)
const alfa = Math.acos((dist-p1.r)/p1.r)
const a = {x: p1.x+(dist-p1.r), y: p1.y+Math.sin(-alfa)*p1.r}
const b = {x: p1.x+(dist-p1.r), y: p1.y+Math.sin( alfa)*p1.r}
const c = {x: p2.x-(dist-p1.r), y: p2.y+Math.sin( alfa + Math.PI)*p2.r}
const d = {x: p2.x-(dist-p1.r), y: p2.y+Math.sin(-alfa + Math.PI)*p2.r}
const e = {x: p1.x+(dist/2),    y: p1.y+Math.sin(Math.acos((dist/2)/p1.r))*p1.r }
const f = {x: p1.x+(dist/2),    y: p1.y+Math.sin(Math.acos(-(dist/2)/p1.r))*p1.r }


ctx.beginPath();
ctx.moveTo(a.x,a.y);
ctx.arc(p1.x,p1.y,p1.r,-alfa,alfa,true);
ctx.moveTo(b.x,b.y);
ctx.quadraticCurveTo(e.x,e.y,d.x,d.y);
// ctx.bezierCurveTo(p1.x,p1.y,p2.x,p2.y,d.x,d.y);
ctx.arc(p2.x,p2.y,p2.r,-alfa + Math.PI,alfa + Math.PI, true);
ctx.moveTo(c.x,c.y);
ctx.quadraticCurveTo(f.x,f.y,a.x,a.y);
// ctx.bezierCurveTo(p2.x,p2.y,p1.x,p1.y,a.x,a.y);
// ctx.strokeStyle = 'hsl(10,100%,100%)';
// ctx.stroke();
ctx.fillStyle = 'hsl(10,100%,100%)';
ctx.fill();
ctx.noStroke;
ctx.closePath();

// ctx.beginPath();
// ctx.arc(p1.x,p1.y,p1.r,0,Math.PI*2,false);
// ctx.arc(p2.x,p2.y,p2.r,0,Math.PI*2,false);
// ctx.strokeStyle = 'hsl(50,100%,100%)';
// ctx.stroke();
// ctx.closePath();