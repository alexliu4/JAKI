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
  var cookie = document.cookie;
  console.log(cookie);
});
