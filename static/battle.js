var animate, left=0, right=0, img1=null, img2=null;

function init(){

   img1 = document.getElementById('pokemon1');
   img1.style.position= 'absolute';
   img1.style.top = '240px';
   img1.style.left = '-300px';
   img1.style.visibility='hidden';

   img2 = document.getElementById('pokemon2');
   img2.style.position= 'absolute';
   img2.style.top = '100px';
   img2.style.left = (window.innerWidth + 100) + 'px';
   img2.style.visibility='hidden';

   move();
}

function move(){
    left = parseInt(img1.style.left, 10);
    right = parseInt(img2.style.left, 10);

    if (300 >= left) {
        img1.style.left = (left + 5) + 'px';
        img1.style.visibility='visible';

        img2.style.left = (right - 5) + 'px';
        img2.style.visibility='visible';

        animate = setTimeout(function(){move();},10);

    } else {
        stop();
    }
    //f();
}

function stop(){
   clearTimeout(animate);
}

window.onload = function() {init();};

var tl = document.getElementById("tl");
var tr = document.getElementById("tr");
var bl = document.getElementById("bl");
var br = document.getElementById("br");

var data = JSON.parse(document.getElementById("data").innerHTML)
var pokemon_num = 0;
var mode = 0;
var table = document.getElementsByTagName("table")[0];
var temp = table.innerHTML;
var pkmn_health = document.getElementById("pkmn_health");
var user_health = document.getElementById("user_health");
pkmn_health.innerHTML = "Helth: " + data[0];
user_health.innerHTML = "Helth: " + data[10];

tl.addEventListener("mouseover", function(e) {
  tl.style.backgroundColor = "silver";
});
tr.addEventListener("mouseover", function(e) {
  tr.style.backgroundColor = "silver";
});
bl.addEventListener("mouseover", function(e) {
  bl.style.backgroundColor = "silver";
});
br.addEventListener("mouseover", function(e) {
  br.style.backgroundColor = "silver";
});

tl.addEventListener("mouseout", function(e) {
  tl.style.backgroundColor = "white";
});
tr.addEventListener("mouseout", function(e) {
  tr.style.backgroundColor = "white";
});
bl.addEventListener("mouseout", function(e) {
  bl.style.backgroundColor = "white";
});
br.addEventListener("mouseout", function(e) {
  br.style.backgroundColor = "white";
});

tl.addEventListener("click", function(e) {
  if(mode == 0){
    tl.innerHTML = data[pokemon_num * 10 + 2]
    tr.innerHTML = data[pokemon_num * 10 + 4]
    bl.innerHTML = data[pokemon_num * 10 + 6]
    br.innerHTML = data[pokemon_num * 10 + 8]
    mode = 1;
  }
  else if(mode == 1){
    document.getElementById("table").innerHTML = "<tr><td>" + data[pokemon_num * 10 + 1] +
    " used " + data[pokemon_num * 10 + 2] + "!</tr>";
    document.getElementById("move").innerHTML = "Press enter to continue";
    function after(){
      table.innerHTML = temp;
      console.log(temp);
      document.getElementById("move").innerHTML = "";
      mode = 0;
    }
    function keydownHandler(e){
        if (e.keyCode == 13) {
            after();
        }
    }

    if (document.addEventListener) {
        document.addEventListener('keydown', keydownHandler, false);
    }
    else if (document.attachEvent) {
        document.attachEvent('onkeydown', keydownHandler);
    }
  }
});
