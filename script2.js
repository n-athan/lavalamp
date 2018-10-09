var canvas = document.querySelector("canvas");
var width = canvas.width = getWidth();
var height = canvas.height = Math.floor(window.innerHeight); 
// var width = canvas.width = 200;
// var height = canvas.height = 200; 
var ctx = canvas.getContext('2d');

const r = 40;


// function to make random integer in range
const rnd = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

animate(15);

function animate(n) {
    blobs = makeBlobs(n);
    var t = 0;
    var interval = setInterval(function (){    
        ctx.clearRect(0,0,width,height);
        frameBlobs(blobs);
        // t ++;
        // if (t > 3) clearInterval(interval);
    }, 30);
}

function getWidth() {
    if (window.innerWidth < window.innerHeight) {
        return Math.floor(window.innerWidth);
    } else {  
        return Math.floor(window.innerHeight); 
    };
}


function makeBlobs(n) {
    var blobs = [];
    for (var i = 0; i < n; i++) {
        x = rnd(0,width); //start x
        y = rnd(0,height); //start y
        vx = rnd(1, 5);
        vy = rnd(1, 20);
        hue = 50*i
        b = {x: x, y: y, r: r, vx: vx, vy: vy, hue: hue}; 
        blobs.push(b);
    }
    return blobs;
}

function moveBlob(b) {
    //bounce of walls
    if (b.x >= width || b.x <= 0 ) {
        var vx = b.vx *-1;
        if (b.y >= height || b.y <= 0 ) {
            var vy = b.vy *-1;} else {
        var vy = b.vy;}
    } else if (b.y >= height|| b.y <= 0) {
        var vy = b.vy *-1;
        if (b.x >= width || b.x <= 0 ) {
            var vx = b.vx *-1;} else {
        var vx = b.vx;}
    } else {
        vx = b.vx;
        vy = b.vy;
    };

    b['x'] = b.x + vx;
    b['y'] = b.y + vy;
    b['vx'] = vx;
    b['vy'] = vy;
}

function drawBlob(b) {
    // ctx.beginPath(); 
    // ctx.arc(b.x, b.y, r*3, 0, 2 * Math.PI, true); 
    // ctx.fillStyle = 'hsla(180,100%,60%, 1.0)';
    // ctx.fill(); 
    // ctx.closePath();

    // ctx.beginPath(); 
    // ctx.arc(b.x, b.y, r*2, 0, 2 * Math.PI, true); 
    // ctx.fillStyle = 'hsla(130,100%,60%, 1.0)';
    // ctx.fill(); 
    // ctx.closePath();

    ctx.beginPath(); 
    ctx.arc(b.x, b.y, r, 0, 2 * Math.PI, true); 
    ctx.fillStyle = 'hsla(80,100%,60%, 1.0)';
    ctx.fill(); 
    ctx.closePath();

} 

function frameBlobs(blobs) {
    for (var i = 0; i < blobs.length; i++) {
        b = blobs[i];
        moveBlob(b);
        ctx.globalCompositeOperation = 'luminosity';
        drawBlob(b);
    }
}

function glowingOrbs(b) {
    var gradient = ctx.createRadialGradient(b.x, b.y, r/2, b.x, b.y, r*3);
    gradient.addColorStop(0, `hsla(${b.hue},50%,70%, 1.0)`);
    gradient.addColorStop(1, `hsla(${b.hue},50%,70%, 0)`);
    return gradient;
}

function slime(b) {
    var gradient = ctx.createRadialGradient(b.x, b.y, r, b.x, b.y, r*2);
    gradient.addColorStop(0, `hsla(80,100%,60%, 1.0)`);
    gradient.addColorStop(1, `hsla(80,100%,60%, 0.0)`);
    return gradient;
}