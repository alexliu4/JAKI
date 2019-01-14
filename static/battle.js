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

var tl;
var tr;
var bl;
var br;
var table;
var temp;

var data = JSON.parse(document.getElementById("data").innerHTML)
var pokemon_num = 0;
var mode = 0;
var pkmn_health_elem = document.getElementById("pkmn_health");
var user_health_elem = document.getElementById("user_health");
var pkmn_health = data[data.length - 5];
var user_health = data[9];

pkmn_health_elem.innerHTML = "Health: " + data[data.length - 5];
user_health_elem.innerHTML = "Health: " + data[9];

function setup(){
  tl = document.getElementById("tl");
  tr = document.getElementById("tr");
  bl = document.getElementById("bl");
  br = document.getElementById("br");
  table = document.getElementsByTagName("table")[0];
  temp = table.innerHTML;
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
    tl.innerHTML = data[pokemon_num * 10 + 1]
    tr.innerHTML = data[pokemon_num * 10 + 3]
    bl.innerHTML = data[pokemon_num * 10 + 5]
    br.innerHTML = data[pokemon_num * 10 + 7]
    mode = 1;
  }
  else if(mode == 1){
    document.getElementById("table").innerHTML = "<tr><td>" + data[pokemon_num * 10] +
    " used " + data[pokemon_num * 10 + 1] + "!</td></tr>";
    document.getElementById("move").innerHTML = "Press enter to continue";
    pkmn_health -= data[pokemon_num * 10 + 2];
    if(pkmn_health < 0){
      pkmn_health = 0;
    }
    pkmn_health_elem.innerHTML = "Health:" + pkmn_health;
    function after(){
      if(pkmn_health == 0){
        document.getElementById("table").innerHTML = "<tr><td>You won!</td></tr>"
        function after2(){
          window.location.replace("/map");
        }
        function keydownHandler(e){
            if (e.keyCode == 13) {
                after2();
            }
        }

        if (document.addEventListener) {
            document.addEventListener('keydown', keydownHandler, false);
        }
        else if (document.attachEvent) {
            document.attachEvent('onkeydown', keydownHandler);
        }
      }else{
        var pkmn_move = data[data.length - (Math.floor(Math.random() * 4) + 1)];
        document.getElementById("table").innerHTML = "<tr><td>" + data[data.length - 6] +
        " used " + pkmn_move + "!</tr>";
        document.getElementById("move").innerHTML = "Press enter to continue";
        user_health -= Math.floor(Math.random() * 30);
        if(user_health < 0){
          user_health = 0;
        }
        user_health_elem.innerHTML = "Health:" + user_health;
        function after3() {
          if(user_health == 0){
            document.getElementById("table").innerHTML = "<tr><td>You lost!</td></tr>"
            function after4(){
              window.location.replace("/map");
            }
            function keydownHandler(e){
                if (e.keyCode == 13) {
                    after4();
                }
            }

            if (document.addEventListener) {
                document.addEventListener('keydown', keydownHandler, false);
            }
            else if (document.attachEvent) {
                document.attachEvent('onkeydown', keydownHandler);
            }
          }else{
            table.innerHTML = temp;
            document.getElementById("move").innerHTML = "";
            mode = 0;
            setup();
          }
        }
        function keydownHandler(e){
            if (e.keyCode == 13) {
                after3();
            }
        }

        if (document.addEventListener) {
          document.addEventListener('keydown', keydownHandler, false);
        }
        else if (document.attachEvent) {
            document.attachEvent('onkeydown', keydownHandler);
        }
      }
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
tr.addEventListener("click", function(e) {
  if(mode == 1){
    document.getElementById("table").innerHTML = "<tr><td>" + data[pokemon_num * 10] +
    " used " + data[pokemon_num * 10 + 3] + "!</tr>";
    document.getElementById("move").innerHTML = "Press enter to continue";
    pkmn_health -= data[pokemon_num * 10 + 4];
    if(pkmn_health < 0){
      pkmn_health = 0;
    }
    pkmn_health_elem.innerHTML = "Health:" + pkmn_health;
    function after(){
      if(pkmn_health == 0){
        document.getElementById("table").innerHTML = "<tr><td>You won!</td></tr>"
        function after2(){
          window.location.replace("/map");
        }
        function keydownHandler(e){
            if (e.keyCode == 13) {
                after2();
            }
        }

        if (document.addEventListener) {
            document.addEventListener('keydown', keydownHandler, false);
        }
        else if (document.attachEvent) {
            document.attachEvent('onkeydown', keydownHandler);
        }
      }else{
        var pkmn_move = data[data.length - (Math.floor(Math.random() * 4) + 1)];
        document.getElementById("table").innerHTML = "<tr><td>" + data[data.length - 6] +
        " used " + pkmn_move + "!</tr>";
        document.getElementById("move").innerHTML = "Press enter to continue";
        user_health -= Math.floor(Math.random() * 30);
        if(user_health < 0){
          user_health = 0;
        }
        user_health_elem.innerHTML = "Health:" + user_health;
        function after3() {
          if(user_health == 0){
            document.getElementById("table").innerHTML = "<tr><td>You lost!</td></tr>"
            function after4(){
              window.location.replace("/map");
            }
            function keydownHandler(e){
                if (e.keyCode == 13) {
                    after4();
                }
            }

            if (document.addEventListener) {
                document.addEventListener('keydown', keydownHandler, false);
            }
            else if (document.attachEvent) {
                document.attachEvent('onkeydown', keydownHandler);
            }
          }else{
            table.innerHTML = temp;
            document.getElementById("move").innerHTML = "";
            mode = 0;
            setup();
          }
        }
        function keydownHandler(e){
            if (e.keyCode == 13) {
                after3();
            }
        }

        if (document.addEventListener) {
          document.addEventListener('keydown', keydownHandler, false);
        }
        else if (document.attachEvent) {
            document.attachEvent('onkeydown', keydownHandler);
        }
      }
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
bl.addEventListener("click", function(e) {
  if(mode == 1){
    document.getElementById("table").innerHTML = "<tr><td>" + data[pokemon_num * 10] +
    " used " + data[pokemon_num * 10 + 5] + "!</tr>";
    document.getElementById("move").innerHTML = "Press enter to continue";
    pkmn_health -= data[pokemon_num * 10 + 6];
    if(pkmn_health < 0){
      pkmn_health = 0;
    }
    pkmn_health_elem.innerHTML = "Health:" + pkmn_health;
    function after(){
      if(pkmn_health == 0){
        document.getElementById("table").innerHTML = "<tr><td>You won!</td></tr>"
        function after2(){
          window.location.replace("/map");
        }
        function keydownHandler(e){
            if (e.keyCode == 13) {
                after2();
            }
        }

        if (document.addEventListener) {
            document.addEventListener('keydown', keydownHandler, false);
        }
        else if (document.attachEvent) {
            document.attachEvent('onkeydown', keydownHandler);
        }
      }else{
        var pkmn_move = data[data.length - (Math.floor(Math.random() * 4) + 1)];
        document.getElementById("table").innerHTML = "<tr><td>" + data[data.length - 6] +
        " used " + pkmn_move + "!</tr>";
        document.getElementById("move").innerHTML = "Press enter to continue";
        user_health -= Math.floor(Math.random() * 30);
        if(user_health < 0){
          user_health = 0;
        }
        user_health_elem.innerHTML = "Health:" + user_health;
        function after3() {
          if(user_health == 0){
            document.getElementById("table").innerHTML = "<tr><td>You lost!</td></tr>"
            function after4(){
              window.location.replace("/map");
            }
            function keydownHandler(e){
                if (e.keyCode == 13) {
                    after4();
                }
            }

            if (document.addEventListener) {
                document.addEventListener('keydown', keydownHandler, false);
            }
            else if (document.attachEvent) {
                document.attachEvent('onkeydown', keydownHandler);
            }
          }else{
            table.innerHTML = temp;
            document.getElementById("move").innerHTML = "";
            mode = 0;
            setup();
          }
        }
        function keydownHandler(e){
            if (e.keyCode == 13) {
                after3();
            }
        }

        if (document.addEventListener) {
          document.addEventListener('keydown', keydownHandler, false);
        }
        else if (document.attachEvent) {
            document.attachEvent('onkeydown', keydownHandler);
        }
      }
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
br.addEventListener("click", function(e) {
  if(mode == 0){
    window.location.replace("/map");
  }
  if(mode == 1){
    document.getElementById("table").innerHTML = "<tr><td>" + data[pokemon_num * 10] +
    " used " + data[pokemon_num * 10 + 7] + "!</tr>";
    document.getElementById("move").innerHTML = "Press enter to continue";
    pkmn_health -= data[pokemon_num * 10 + 8];
    if(pkmn_health < 0){
      pkmn_health = 0;
    }
    pkmn_health_elem.innerHTML = "Health:" + pkmn_health;
    function after(){
      if(pkmn_health == 0){
        document.getElementById("table").innerHTML = "<tr><td>You won!</td></tr>"
        function after2(){
          window.location.replace("/map");
        }
        function keydownHandler(e){
            if (e.keyCode == 13) {
                after2();
            }
        }

        if (document.addEventListener) {
            document.addEventListener('keydown', keydownHandler, false);
        }
        else if (document.attachEvent) {
            document.attachEvent('onkeydown', keydownHandler);
        }
      }else{
        var pkmn_move = data[data.length - (Math.floor(Math.random() * 4) + 1)];
        document.getElementById("table").innerHTML = "<tr><td>" + data[data.length - 6] +
        " used " + pkmn_move + "!</tr>";
        document.getElementById("move").innerHTML = "Press enter to continue";
        user_health -= Math.floor(Math.random() * 30);
        if(user_health < 0){
          user_health = 0;
        }
        user_health_elem.innerHTML = "Health:" + user_health;
        function after3() {
          if(user_health == 0){
            document.getElementById("table").innerHTML = "<tr><td>You lost!</td></tr>"
            function after4(){
              window.location.replace("/map");
            }
            function keydownHandler(e){
                if (e.keyCode == 13) {
                    after4();
                }
            }

            if (document.addEventListener) {
                document.addEventListener('keydown', keydownHandler, false);
            }
            else if (document.attachEvent) {
                document.attachEvent('onkeydown', keydownHandler);
            }
          }else{
            table.innerHTML = temp;
            document.getElementById("move").innerHTML = "";
            mode = 0;
            setup();
          }
        }
        function keydownHandler(e){
            if (e.keyCode == 13) {
                after3();
            }
        }

        if (document.addEventListener) {
          document.addEventListener('keydown', keydownHandler, false);
        }
        else if (document.attachEvent) {
            document.attachEvent('onkeydown', keydownHandler);
        }
      }
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
}

setup();
