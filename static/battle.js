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

var has_potion = false;
var has_super_potion = false;
var potion;

var data = JSON.parse(document.getElementById("data").innerHTML)
var items = JSON.parse(document.getElementById("items").innerHTML)
var pokemon_num = 0;
var mode = 0;
var pkmn_health_elem = document.getElementById("pkmn_health");
var user_health_elem = document.getElementById("user_health");
var pkmn_health = data[data.length - 5];
var user_health = data[9];

pkmn_health_elem.innerHTML = "Health: " + data[pokemon_num * 11 + 9];
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
    tl.innerHTML = data[pokemon_num * 11 + 1]
    tr.innerHTML = data[pokemon_num * 11 + 3]
    bl.innerHTML = data[pokemon_num * 11 + 5]
    br.innerHTML = data[pokemon_num * 11 + 7]
    mode = 1;
  }
  else if(mode == 1){
    document.getElementById("table").innerHTML = "<tr><td>" + data[pokemon_num * 11] +
    " used " + data[pokemon_num * 11 + 1] + "!</td></tr>";
    document.getElementById("move").innerHTML = "Press enter to continue";
    pkmn_health -= (data[pokemon_num * 11 + 2] + 25);
    if(pkmn_health < 0){
      pkmn_health = 0;
    }
    pkmn_health_elem.innerHTML = "Health:" + pkmn_health;
    function after(){
      if(pkmn_health == 0){
        var type = Math.floor(Math.random() * 2);

        if(type == 0){
          potion = "potion";
        }
        if(type == 1){
          potion = "super potion";
        }
        document.getElementById("table").innerHTML = "<tr><td>You won! Enemy dropped a " + potion + "!</td></tr>"
        function after2(){
          var form = document.createElement("form");
          form.setAttribute("method","POST");
          form.setAttribute("action","/updates")
          var input = document.createElement("input");
          input.setAttribute("type","text");
          input.setAttribute("hidden","True");
          input.setAttribute("name","update")
          input.setAttribute("value", user_health + " " + potion);
          form.appendChild(input);
          document.getElementsByTagName("body")[0].appendChild(form);
          form.submit();
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
        user_health -= Math.floor(Math.random() * 8);
        if(user_health < 0){
          user_health = 0;
        }
        user_health_elem.innerHTML = "Health:" + user_health;
        function after3() {
          if(user_health == 0){
            document.getElementById("table").innerHTML = "<tr><td>You lost!</td></tr>"
            function after4(){
              var form = document.createElement("form");
              form.setAttribute("method","POST");
              form.setAttribute("action","/update_health")
              var input = document.createElement("input");
              input.setAttribute("type","number");
              input.setAttribute("hidden","True");
              input.setAttribute("name","health")
              input.setAttribute("value", 0);
              form.appendChild(input);
              document.getElementsByTagName("body")[0].appendChild(form);
              form.submit();
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
  else if(mode == 2){
    if(has_potion){
      user_health += 10;
      user_health_elem.innerHTML = "Health:" + user_health;
      has_potion = false;
      var len = items.length;
      var i;
      for(i = 0; i < len; i++){
        if(items[i]['name'] == "potion"){
          items.splice(i);
          break;
        }
      }
    }
    table.innerHTML = temp;
    document.getElementById("move").innerHTML = "";
    mode = 0;
    setup();
  }
});
tr.addEventListener("click", function(e) {
  if(mode == 0){
    var len = items.length;
    var i;
    for(i = 0; i < len; i++){
      if(items[i]['name'] == "potion"){
        has_potion = true;
      }
      if(items[i]['name'] == "super_potion"){
        has_super_potion = true;
      }
    }
    if(has_potion){
      tl.innerHTML = "potion";
    }else{
      tl.innerHTML = "";
    }
    if(has_super_potion){
      tr.innerHTML = "super potion";
    }else{
      tr.innerHTML = "";
    }
    bl.innerHTML = "Pokeball";
    br.innerHTML = "back";
    mode = 2;
  }
  else if(mode == 1){
    document.getElementById("table").innerHTML = "<tr><td>" + data[pokemon_num * 11] +
    " used " + data[pokemon_num * 11 + 3] + "!</tr>";
    document.getElementById("move").innerHTML = "Press enter to continue";
    pkmn_health -= (data[pokemon_num * 11 + 4] + 25);
    if(pkmn_health < 0){
      pkmn_health = 0;
    }
    pkmn_health_elem.innerHTML = "Health:" + pkmn_health;
    function after(){
      if(pkmn_health == 0){
        var type = Math.floor(Math.random() * 2);

        if(type == 0){
          potion = "potion";
        }
        if(type == 1){
          potion = "super potion";
        }
        document.getElementById("table").innerHTML = "<tr><td>You won! Enemy dropped a " + potion + "!</td></tr>"
        function after2(){
          var form = document.createElement("form");
          form.setAttribute("method","POST");
          form.setAttribute("action","/updates")
          var input = document.createElement("input");
          input.setAttribute("type","text");
          input.setAttribute("hidden","True");
          input.setAttribute("name","update")
          input.setAttribute("value", user_health + " " + potion);
          form.appendChild(input);
          document.getElementsByTagName("body")[0].appendChild(form);
          form.submit();
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
        user_health -= Math.floor(Math.random() * 8);
        if(user_health < 0){
          user_health = 0;
        }
        user_health_elem.innerHTML = "Health:" + user_health;
        function after3() {
          if(user_health == 0){
            document.getElementById("table").innerHTML = "<tr><td>You lost!</td></tr>"
            function after4(){
              var form = document.createElement("form");
              form.setAttribute("method","POST");
              form.setAttribute("action","/update_health")
              var input = document.createElement("input");
              input.setAttribute("type","number");
              input.setAttribute("hidden","True");
              input.setAttribute("name","health")
              input.setAttribute("value", 0);
              form.appendChild(input);
              document.getElementsByTagName("body")[0].appendChild(form);
              form.submit();
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
  else if(mode == 2){
    if(has_super_potion){
      user_health += 20;
      user_health_elem.innerHTML = "Health:" + user_health;
      has_super_potion = false;
      var len = items.length;
      var i;
      for(i = 0; i < len; i++){
        if(items[i]['name'] == "super potion"){
          items.splice(i);
          break;
        }
      }
    }
    table.innerHTML = temp;
    document.getElementById("move").innerHTML = "";
    mode = 0;
    setup()
  }
});
bl.addEventListener("click", function(e) {
  if(mode == 0){
      document.getElementById("table").innerHTML = "<tr><td>You have no other Pokemon!</td></tr>";
      document.getElementById("move").innerHTML = "Press enter to continue";
      function keydownHandler(e){
          if (e.keyCode == 13) {
            table.innerHTML = temp;
            document.getElementById("move").innerHTML = "";
            mode = 0;
            setup();
          }
      }
      if (document.addEventListener) {
          document.addEventListener('keydown', keydownHandler, false);
      }
      else if (document.attachEvent) {
          document.attachEvent('onkeydown', keydownHandler);
      }

  }
  if(mode == 1){
    document.getElementById("table").innerHTML = "<tr><td>" + data[pokemon_num * 11] +
    " used " + data[pokemon_num * 11 + 5] + "!</tr>";
    document.getElementById("move").innerHTML = "Press enter to continue";
    pkmn_health -= (data[pokemon_num * 11 + 6] + 25);
    if(pkmn_health < 0){
      pkmn_health = 0;
    }
    pkmn_health_elem.innerHTML = "Health:" + pkmn_health;
    function after(){
      if(pkmn_health == 0){
        var type = Math.floor(Math.random() * 2);

        if(type == 0){
          potion = "potion";
        }
        if(type == 1){
          potion = "super potion";
        }
        document.getElementById("table").innerHTML = "<tr><td>You won! Enemy dropped a " + potion + "!</td></tr>"
        function after2(){
          var form = document.createElement("form");
          form.setAttribute("method","POST");
          form.setAttribute("action","/updates")
          var input = document.createElement("input");
          input.setAttribute("type","text");
          input.setAttribute("hidden","True");
          input.setAttribute("name","update")
          input.setAttribute("value", user_health + " " + potion);
          form.appendChild(input);
          document.getElementsByTagName("body")[0].appendChild(form);
          form.submit();
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
        user_health -= Math.floor(Math.random() * 8);
        if(user_health < 0){
          user_health = 0;
        }
        user_health_elem.innerHTML = "Health:" + user_health;
        function after3() {
          if(user_health == 0){
            document.getElementById("table").innerHTML = "<tr><td>You lost!</td></tr>"
            function after4(){
              var form = document.createElement("form");
              form.setAttribute("method","POST");
              form.setAttribute("action","/update_health")
              var input = document.createElement("input");
              input.setAttribute("type","number");
              input.setAttribute("hidden","True");
              input.setAttribute("name","health")
              input.setAttribute("value", 0);
              form.appendChild(input);
              document.getElementsByTagName("body")[0].appendChild(form);
              form.submit();
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
  else if(mode == 2){
    var chance = Math.floor(Math.random() * 2);
    if(chance == 0){
      document.getElementById("table").innerHTML = "<tr><td>The other Pokemon escaped the pokeball!</tr>";
      document.getElementById("move").innerHTML = "Press enter to continue";
      function keydownHandler(e){
          if (e.keyCode == 13) {
            table.innerHTML = temp;
            document.getElementById("move").innerHTML = "";
            mode = 0;
            setup();
          }
      }

      if (document.addEventListener) {
          document.addEventListener('keydown', keydownHandler, false);
      }
      else if (document.attachEvent) {
          document.attachEvent('onkeydown', keydownHandler);
      }
    }else{
      document.getElementById("table").innerHTML = "<tr><td>You caught the Pokrmon!</tr>";
      document.getElementById("move").innerHTML = "Press enter to continue";
      function keydownHandler(e){
          if (e.keyCode == 13) {
            var form = document.createElement("form");
            form.setAttribute("method","POST");
            form.setAttribute("action","/updates2")
            var input = document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("hidden","True");
            input.setAttribute("name","update")
            input.setAttribute("value", user_health + " " + data[data.length - 6]);
            form.appendChild(input);
            document.getElementsByTagName("body")[0].appendChild(form);
            form.submit();
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
});
br.addEventListener("click", function(e) {
  if(mode == 0){
    window.location.replace("/map");
  }
  if(mode == 1){
    document.getElementById("table").innerHTML = "<tr><td>" + data[pokemon_num * 11] +
    " used " + data[pokemon_num * 11 + 7] + "!</tr>";
    document.getElementById("move").innerHTML = "Press enter to continue";
    pkmn_health -= (data[pokemon_num * 11 + 8] + 25);
    if(pkmn_health < 0){
      pkmn_health = 0;
    }
    pkmn_health_elem.innerHTML = "Health:" + pkmn_health;
    function after(){
      if(pkmn_health == 0){
        var type = Math.floor(Math.random() * 2);
        if(type == 0){
          potion = "potion";
        }
        if(type == 1){
          potion = "super potion";
        }
        document.getElementById("table").innerHTML = "<tr><td>You won! Enemy dropped a " + potion + "!</td></tr>"
        function after2(){
          var form = document.createElement("form");
          form.setAttribute("method","POST");
          form.setAttribute("action","/updates")
          var input = document.createElement("input");
          input.setAttribute("type","text");
          input.setAttribute("hidden","True");
          input.setAttribute("name","update")
          input.setAttribute("value", user_health + " " + potion);
          form.appendChild(input);
          document.getElementsByTagName("body")[0].appendChild(form);
          form.submit();
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
        user_health -= Math.floor(Math.random() * 8);
        if(user_health < 0){
          user_health = 0;
        }
        user_health_elem.innerHTML = "Health:" + user_health;
        function after3() {
          if(user_health == 0){
            document.getElementById("table").innerHTML = "<tr><td>You lost!</td></tr>"
            function after4(){
              var form = document.createElement("form");
              form.setAttribute("method","POST");
              form.setAttribute("action","/update_health")
              var input = document.createElement("input");
              input.setAttribute("type","number");
              input.setAttribute("hidden","True");
              input.setAttribute("name","health")
              input.setAttribute("value", 0);
              form.appendChild(input);
              document.getElementsByTagName("body")[0].appendChild(form);
              form.submit();
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
  else if(mode == 2){
    table.innerHTML = temp;
    document.getElementById("move").innerHTML = "";
    mode = 0;
    setup();
  }
});
}

setup();
