var image = document.getElementById("map");
image.style.position= 'absolute';
image.style.left = "100px";
image.style.top = "200px";

var player = document.getElementById("pokemon1");
player.style.position= 'absolute';
player.style.left = "50%";
player.style.top = "50%";

var up = 0;
var down = 0;
var left = 0;
var right = 0;

var handle_key = (e) => {
    if (e.type === "keyup"){
        if (e.code === "KeyW"){
            down = 0;
        }
        if (e.code === "KeyA"){
            right = 0;
        }
        if (e.code === "KeyS"){
            up = 0;
        }
        if (e.code === "KeyD"){
            left = 0;
        }
    }
    else if (e.type === "keydown"){
        if (e.code === "KeyW"){
            down = 1;
        }
        if (e.code === "KeyA"){
            right = 1;
        }
        if (e.code === "KeyS"){
            up = 1;
        }
        if (e.code === "KeyD"){
            left = 1;
        }
    }
}

document.addEventListener("keydown", handle_key);
document.addEventListener("keyup", handle_key);

window.setInterval(() => {
    image.style.top = parseInt(image.style.top) + 5*(down-up) + 'px';
    image.style.left = parseInt(image.style.left) + 5*(right-left) + 'px';
}, 20);
