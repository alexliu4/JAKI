/*
bottomleft = 1
bottomright = 2
topleft = 3
topright = 4
side = 5
top = 6
grass = 7
floor = 0
*/
var map = [
    [3,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,7,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,7,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,7,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,2],
]

var i,j;
for (i = 0; i<map.length; i++){
    for (j=0; j<map.length; j++){
        if (map[i][j] === 0){
            map[i][j] = 100 + Math.floor((Math.random()*3)+1);
        }
    }
}

body = document.getElementById("body");
for (i = 0; i<map.length; i++){
    for (j=0; j<map.length; j++){
        tile = document.createElement("img");
        if (map[i][j] === 1){
            tile.setAttribute("src","../static/bottomleft.png");
        }
        else if (map[i][j] === 2){
            tile.setAttribute("src","../static/bottomright.png");
        }
        else if (map[i][j] === 3){
            tile.setAttribute("src","../static/topleft.png");
        }
        else if (map[i][j] === 4){
            tile.setAttribute("src","../static/topright.png");
        }
        else if (map[i][j] === 5){
            tile.setAttribute("src","../static/side.png");
        }
        else if (map[i][j] === 6){
            tile.setAttribute("src","../static/top.png");
        }
        else if (map[i][j] === 7){
            tile.setAttribute("src","../static/grass.png");
        }
        else if (map[i][j] === 101){
            tile.setAttribute("src","../static/floor1.png");
        }
        else if (map[i][j] === 102){
            tile.setAttribute("src","../static/floor2.png");
        }
        else if (map[i][j] === 103){
            tile.setAttribute("src","../static/floor3.png");
        }
        tile.setAttribute("class","map");
        tile.setAttribute("width","75");
        tile.setAttribute("height","75");
        tile.style.position = "absolute";
        tile.style.left = (75*j) + "px";
        tile.style.top = (75*i) + "px";
        tile.style.zIndex = 1;
        body.appendChild(tile);
    }
}

directions = ["up","down","left","right"]
for (i=0; i<directions.length; i++){
    for (j=1; j<4; j++){
        var player = document.createElement("img");
        player.setAttribute("src","../static/boywalk" + directions[i] + j+".png");
        player.setAttribute("width","75");
        player.setAttribute("height","75");
        player.setAttribute("id",directions[i] + j);
        player.setAttribute("class","player");
        player.style.position= 'absolute';
        player.style.left = screen.width/2 + "px" ;
        player.style.top = screen.height/2 + "px";
        if (i===1 && j === 2){
            player.style.zIndex = 2;
        }
        else {
            player.style.zIndex = -1;
        }

        body.appendChild(player);
    }
}

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
    map_array = document.getElementsByClassName("map");
    var i;
    for (i=0; i<map_array.length; i++){
        var current = map_array[i];
        current.style.top = parseInt(current.style.top) + 5*(down-up) + 'px';
        current.style.left = parseInt(current.style.left) + 5*(right-left) + 'px';
    }
}, 20);

var previous_direction = "down";
var num = 2;
window.setInterval(() => {
    var all_players = document.getElementsByClassName("player");
    for (i=0; i<all_players.length; i++){
        all_players[i].style.zIndex = -1;
    }
    if (down-up > 0){
        previous_direction = "up";
        if (num === 2){
            num = 3;
            document.getElementById("up2").style.zIndex = 2;
        }
        else if (num === 3){
            num = -2;
            document.getElementById("up3").style.zIndex = 2;
        }
        else if (num === -2){
            num = 1;
            document.getElementById("up2").style.zIndex = 2;
        }
        else if (num === 1){
            num = 2;
            document.getElementById("up1").style.zIndex = 2;
        }
    }
    else if (down - up < 0) {
        previous_direction = "down";
        if (num === 2){
            num = 3;
            document.getElementById("down2").style.zIndex = 2;
        }
        else if (num === 3){
            num = -2;
            document.getElementById("down3").style.zIndex = 2;
        }
        else if (num === -2){
            num = 1;
            document.getElementById("down2").style.zIndex = 2;
        }
        else if (num === 1){
            num = 2;
            document.getElementById("down1").style.zIndex = 2;
        }
    }
    else if (right - left < 0) {
        previous_direction = "right";
        if (num === 2){
            num = 3;
            document.getElementById("right2").style.zIndex = 2;
        }
        else if (num === 3){
            num = -2;
            document.getElementById("right3").style.zIndex = 2;
        }
        else if (num === -2){
            num = 1;
            document.getElementById("right2").style.zIndex = 2;
        }
        else if (num === 1){
            num = 2;
            document.getElementById("right1").style.zIndex = 2;
        }
    }
    else if (right - left > 0) {
        previous_direction = "left";
        if (num === 2){
            num = 3;
            document.getElementById("left2").style.zIndex = 2;
        }
        else if (num === 3){
            num = -2;
            document.getElementById("left3").style.zIndex = 2;
        }
        else if (num === -2){
            num = 1;
            document.getElementById("left2").style.zIndex = 2;
        }
        else if (num === 1){
            num = 2;
            document.getElementById("left1").style.zIndex = 2;
        }
    }
    else {
        num = 2;
        document.getElementById(previous_direction + "2").style.zIndex = 3;
    }
},100);
