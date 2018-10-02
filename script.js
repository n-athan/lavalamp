var canvas = document.querySelector("canvas");
// var width = canvas.width = getWidth();
// var height = canvas.height = Math.floor(window.innerHeight); 
var width = canvas.width = 200;
var height = canvas.height = 200; 
var ctx = canvas.getContext('2d');

function getWidth() {
    if (window.innerWidth < window.innerHeight) {
        return Math.floor(window.innerWidth);
    } else {  
        return Math.floor(window.innerHeight); 
    };
}

// function to make random integer in range
const rnd = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

var imageData= ctx.getImageData(0,0,width,height);
var colorData = imageData.data;
for (var i = 0; i < colorData.length; i += 4) {
    colorData[i] = 255;
    colorData[i+1] = 255;
    colorData[i+2] = 255;
    colorData[i+3] = 0;
};

var d_max = Math.hypot(width, height);
var d_map = 360 / d_max ;

// animate();

function makeBlobs(n) {
    var blobs = [];
    for (var i = 0; i < n; i++) {
        r = rnd(5,15); //radius
        x = rnd(0,width); //start x
        y = rnd(0,height); //start y
        vx = rnd(1, 20);
        vy = rnd(1, 20);
        b = {x: x, y: y, r: r, vx: vx, vy: vy}; 
        blobs.push(b);
    }
    return blobs;
}

function animate() {
    blobs = makeBlobs(3);
    var t = 0;
    var interval = setInterval(function (){    
        resetFrame();
        frameLava(blobs);
        t ++;
        if (t > 3) clearInterval(interval);
    }, 200);
}

animate();

function color(b,i) {
    var x = i % (width*4);
    var y = Math.floor(i/(width*4));
    var d = Math.hypot(x-b.x, y-b.y);
    var hue = d % 360;
    return hue;
}

function moveBlob(b) {
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
        ctx.beginPath(); 
        ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI, true); 
        // ctx.fillStyle = `hsla(100,50%,70%,0.5)`;
        // ctx.fill(); 
        ctx.strokeStyle = "hsl(100,0%,0%)";
        ctx.stroke();
    } 

function frameBlobs(blobs) {
    for (var i = 0; i < blobs.length; i++) {
        b = blobs[i];
        moveBlob(b);
        drawBlob(b);
    }
}

function frameLava(blobs) {
    for (var i = 0; i < blobs.length; i++) {
        b = blobs[i];
        moveBlob(b);
        colorFrame(b);
    };
    for (var i = 0; i < colorData.length; i += 4){
        rgb = hslToRgb(colorData[i+3],50,50);
        console.log(rgb);
        colorData[i] = rgb[0];
        colorData[i+1] = rgb[1];
        colorData[i+2] = rgb[2];
        colorData[i+3] = 255;
    };
    imageData.data = colorData;;  
    ctx.putImageData(imageData,0,0,0,0,width,height);
    // for (var i = 0; i < blobs.length; i++) {
    //     b = blobs[i];
    // drawBlob(b);};
}

function colorFrame(b) {
    for (var i = 0; i < colorData.length; i += 4){
        hue = color(b,i);
        if (hue > colorData[i+3]) {         
            colorData[i+3] = hue;
        };
    };      
}

function resetFrame() {
    for (var i = 3; i < colorData.length; i += 4){
        colorData[i] = 0;
    };
};

function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [r * 255, g * 255, b * 255];
}