/*
bottomleft = 1
bottomright = 2
topleft = 3
topright = 4
side = 5
top = 6
grass = 7
smalltree = 8

pathtopleft = 11
pathtop = 12
pathtopright = 13

pathright = 14
pathbottomright = 15
pathbottom = 16

pathbottomleft = 17
pathleft = 18
pathmiddle=19

pathleftup = 20
pathupright = 21
pathrightbottom = 22
pathbottomleft = 23
floor = 0


pokecenter =24
pokeblock = 25
pokeenter = 26
*/

// A 2D array of the map.
var map = [
    [3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 4],
    [5, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0,11,12,13, 0, 0, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0,18,19,14, 0, 0, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 8, 8, 8, 8, 0, 0, 0,11,20,19,21,13, 0, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 8,11,12,12,12,12,12,20,19,19,19,21,12,12,12,12,12,12,12,12,12,13, 0, 0, 0, 0, 0, 0, 5],
    [5, 8,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,14, 0, 0, 0, 0, 0, 0, 5],
    [5, 8,17,16,16,16,16,16,23,19,19,19,22,16,16,16,16,16,16,16,16,16,15, 0, 0, 0, 0, 0, 0, 5],
    [5, 8, 8, 8, 8, 0, 0, 0,17,23,19,22,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0,18,19,14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0,18,19,14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0,18,19,14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0,18,19,14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0,18,19,14, 0, 0, 0, 0, 0, 0, 0, 0,25,24,25,25,25, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0,17,16,15, 0, 0, 0, 0, 0, 0, 0, 0,25, 0, 0, 0,25, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,25, 0, 0, 0,25, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,25, 0, 0, 0,25, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,25,25,26,25,25, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2],
]

var i,j;
for (i = 0; i<map.length; i++){
    for (j=0; j<map.length; j++){
        if (map[i][j] === 0){
            map[i][j] = 100 + Math.floor((Math.random()*3)+1);
        }
    }
}

drow = parseInt(document.getElementById("x").innerHTML)-6;
dcol = parseInt(document.getElementById("y").innerHTML)-10;

body = document.getElementsByTagName("body")[0];
body.setAttribute("style","overflow:hidden;background:#70C59C");
for (i = 0; i<map.length; i++){
    for (j=0; j<map.length; j++){
        tile = document.createElement("img");
        tile.setAttribute("class","map");
        tile.setAttribute("id",i + "," + j);
        tile.setAttribute("width","75");
        tile.setAttribute("height","75");
        tile.style.position = "absolute";
        tile.style.left = (75*j - 75*dcol) + "px";
        tile.style.top = (75*i  - 75*drow) + "px";
        tile.style.zIndex = 1;
        if (map[i][j] === 1){
            tile.setAttribute("src","../static/images/bottomleft.png");
        }
        else if (map[i][j] === 2){
            tile.setAttribute("src","../static/images/bottomright.png");
        }
        else if (map[i][j] === 3){
            tile.setAttribute("src","../static/images/topleft.png");
        }
        else if (map[i][j] === 4){
            tile.setAttribute("src","../static/images/topright.png");
        }
        else if (map[i][j] === 5){
            tile.setAttribute("src","../static/images/side.png");
        }
        else if (map[i][j] === 6){
            tile.setAttribute("src","../static/images/top.png");
        }
        else if (map[i][j] === 7){
            tile.setAttribute("src","../static/images/grass.png");
        }
        else if (map[i][j] === 8){
            tile.setAttribute("src","../static/images/smalltree.png");
        }
        else if (map[i][j] === 11){
            tile.setAttribute("src","../static/images/path1.png");
        }
        else if (map[i][j] === 12){
            tile.setAttribute("src","../static/images/path2.png");
        }
        else if (map[i][j] === 13){
            tile.setAttribute("src","../static/images/path3.png");
        }
        else if (map[i][j] === 14){
            tile.setAttribute("src","../static/images/path4.png");
        }
        else if (map[i][j] === 15){
            tile.setAttribute("src","../static/images/path5.png");
        }
        else if (map[i][j] === 16){
            tile.setAttribute("src","../static/images/path6.png");
        }
        else if (map[i][j] === 17){
            tile.setAttribute("src","../static/images/path7.png");
        }
        else if (map[i][j] === 18){
            tile.setAttribute("src","../static/images/path8.png");
        }
        else if (map[i][j] === 19){
            tile.setAttribute("src","../static/images/path9.png");
        }
        else if (map[i][j] === 20){
            tile.setAttribute("src","../static/images/path10.png");
        }
        else if (map[i][j] === 21){
            tile.setAttribute("src","../static/images/path11.png");
        }
        else if (map[i][j] === 22){
            tile.setAttribute("src","../static/images/path12.png");
        }
        else if (map[i][j] === 23){
            tile.setAttribute("src","../static/images/path13.png");
        }
        else if (map[i][j] === 24){
            tile.setAttribute("src","../static/images/pokecenter.png");
            tile.style.zIndex = 2;
            tile.setAttribute("width","375");
            tile.setAttribute("height","375");
            tile.style.left = (75*(j-1) - 75*dcol) + "px";
        }
        else if (map[i][j] === 25){
            tile.setAttribute("src","../static/images/floor1.png");
        }
        else if (map[i][j] === 26){
            tile.setAttribute("src","../static/images/floor1.png");
        }
        else if (map[i][j] === 101){
            tile.setAttribute("src","../static/images/floor1.png");
        }
        else if (map[i][j] === 102){
            tile.setAttribute("src","../static/images/floor2.png");
        }
        else if (map[i][j] === 103){
            tile.setAttribute("src","../static/images/floor3.png");
        }
        body.appendChild(tile);
    }
}

directions = ["up","down","left","right"]
for (i=0; i<directions.length; i++){
    for (j=1; j<4; j++){
        var player = document.createElement("img");
        player.setAttribute("src","../static/images/boywalk" + directions[i] + j+".png");
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
var move = () => {
    map_array = document.getElementsByClassName("map");
    var i;
    for (i=0; i<map_array.length; i++){
        var current = map_array[i];
        if (Math.abs(down-up) > 0){
            current.style.top = parseInt(current.style.top) + 30*(down-up) + 'px';
        }
        else if (Math.abs(right-left) > 0){
            current.style.left = parseInt(current.style.left) + 30*(right-left) + 'px';
        }
    }
}


var isUnwalkable = (row,col) => {
    var bad = [1,2,3,4,5,6,8,24,25];
    for (var i=0; i<10; i++){
        if (map[row][col] === bad[i]){
            return true;
        }
    }
    return false;
}

var cookie = JSON.parse(document.getElementById("cookie").innerHTML.replace(/'/g,'"'));

var grass_steps = 0;
var stop_moving = 0;

var cover_int = 0;

window.setInterval(() => {
    if (stop_moving == 1){
        if (cover_int < 400){
            tile = document.createElement("img");
            tile.setAttribute("src","../static/images/black.png");
            tile.style.height = screen.height/4 + "px";
            tile.style.width = screen.width/80 + "px"
            tile.style.position = "absolute";
            if (Math.floor(cover_int/100) %2 == 0 ){
                tile.style.left = (cover_int%100)*screen.width/80 + "px";
            }
            else {
                tile.style.left = (screen.width+160 - (cover_int%100)*screen.width/80) + "px";
            }
            tile.style.top = Math.floor(cover_int/100) * screen.height/4 + "px";
            tile.style.background = "black";
            tile.style.zIndex = "20";
            body.appendChild(tile);
        }
        cover_int++;
    }
},0.1);

window.setInterval(() => {

    if (stop_moving >= 1){
        return;
    }
    var change_row = document.getElementById("0,0").style.top.toString();
    var change_col = document.getElementById("0,0").style.left.toString();
    grass_row = 6-Math.floor((parseInt(change_row.substring(0,change_row.length-2))) / 75);
    grass_col = 10-Math.floor((parseInt(change_col.substring(0,change_col.length-2))) / 75);
    console.log(grass_row+ " " + grass_col);
    if (map[grass_row][grass_col] === 7 && (Math.abs(right-left) > 0 || Math.abs(down-up) > 0)){
        grass_steps++;
        console.log("grass steps :" +grass_steps);
        if (grass_steps > 20) {
            grass_steps = 0;
            stop_moving = 1;
            console.log("hiufds");
            var form = document.createElement("form");
            form.setAttribute("method","POST");
            form.setAttribute("action","/tobattle")
            var input = document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("hidden","True");
            input.setAttribute("name","location")
            input.setAttribute("value",(grass_row) + " " + (grass_col));
            form.appendChild(input);
            body.appendChild(form);
            form.submit();
        }
    }
    if (map[grass_row][grass_col] === 26){
        stop_moving = 2;
        var form = document.createElement("form");
        form.setAttribute("method","POST");
        form.setAttribute("action","/toheal")
        var input = document.createElement("input");
        input.setAttribute("type","text");
        input.setAttribute("hidden","True");
        input.setAttribute("name","location")
        input.setAttribute("value",(grass_row+1) + " " + (grass_col));
        form.appendChild(input);
        body.appendChild(form);
        form.submit();
    }
    if (down - up > 0){//up
        change_row = 6-Math.floor((parseInt(change_row.substring(0,change_row.length-2))-37) / 75);
        change_col = 10-Math.floor((parseInt(change_col.substring(0,change_col.length-2))) / 75);
        if (!isUnwalkable(change_row-1,change_col)){
            move();
        }
    }
    else if (down - up < 0){//down
        change_row = 6-Math.floor((parseInt(change_row.substring(0,change_row.length-2))+70) / 75);
        change_col = 10-Math.floor((parseInt(change_col.substring(0,change_col.length-2))) / 75);
        if (!isUnwalkable(change_row+1,change_col)){
            move();
        }
    }
    else if (right - left > 0){//right
        change_row = 6-Math.floor((parseInt(change_row.substring(0,change_row.length-2))) / 75);
        change_col = 10-Math.floor((parseInt(change_col.substring(0,change_col.length-2))-50) / 75);
        if (!isUnwalkable(change_row,change_col-1)){
            move();
        }
    }
    else if (right - left < 0){//left
        change_row = 6-Math.floor((parseInt(change_row.substring(0,change_row.length-2))) / 75);
        change_col = 10-Math.floor((parseInt(change_col.substring(0,change_col.length-2))+37) / 75);
        if (!isUnwalkable(change_row,change_col+1)){
            move();
        }
    }
}, 80);

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
},80);
