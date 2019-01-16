import json, urllib, os, datetime, random, math

from flask import Flask, render_template, request, session, url_for, redirect, flash, json, jsonify

from passlib.hash import md5_crypt

from util import pokemon, API, db

''' Rate Limits for APIs:
    # Dark Sky API - 1000/day (needs to be credited)
    # IPAPI - 1000/day
'''

app = Flask(__name__)
app.secret_key = os.urandom(32)

# weather icons
ICONS = dict()
ICONS['clear-day'] = '/static/icons/day.svg'
ICONS['clear-night'] = '/static/icons/night.svg'
ICONS['cloudy'] = '/static/icons/cloudy.svg'
ICONS['rain'] = '/static/icons/rainy-1.svg'
ICONS['snow'] = '/static/icons/snowy-1.svg'
ICONS['sleet'] = '/static/icons/rainy-7.svg'
ICONS['wind'] = '/static/icons/cloudy-day-1.svg'
ICONS['fog'] = '/static/icons/cloudy.svg'
ICONS['partly-cloudy-day'] = '/static/icons/cloudy-day-2.svg'
ICONS['partly-cloudy-night'] = '/static/icons/cloudy-night-2.svg'

def getIP():
    # use another api to get ip, returns a text
    qwerty = urllib.request.urlopen('https://api.ipify.org')
    # decode else binary
    return(qwerty.read().decode('utf-8'))

def typeChance():
    # get all pokemon
    output = []
    output = list(session['pokemon'])
    # 11 is water 15 is ice

    # Try to open up content for weather stuff
    try:
        f = open('data/content.json', 'r')
    except Exception as e:
        f = open('data/content.json', 'x')
    try:
        data = json.loads(f.read())
    except Exception as e:
        data = {}
    f.close()
    # find precipitation data
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    hours = datetime.datetime.now().hour
    current = data[today]['weather-hourly'][hours]
    if (current['type'] == "rain"):
        print("water types will occur x3 more often")
        output = API.water() # adds each water type 2 more times
        chosen = (random.choice(output))
    if (current['type'] == "snow" or current['type'] == "sleet"):
        print("ice types will occur x3 more often")
        output = API.ice() # adds each ice type 2 more times
        chosen = (random.choice(output))
    else:
        print("all pokemon have equal chances of occuring")
        chosen = (random.choice(output))
    print (chosen)
    for i in output:
        print (i)
    return chosen

@app.route('/house')
def house():
    return render_template('about.html')


@app.route('/game')
def game():
    if 'user' in session:
        user_list = db.get_user_active_pokemon(session['user'])
        user_pokemon_url = pokemon.get_pokemon_image(user_list[0]['name'])
        wild_pokemon = random.choice(list(session['pokemon']))
        wild_pokemon_url = pokemon.get_pokemon_image(wild_pokemon)
        data = []
        for pokemons in user_list:
            data.append(pokemons['name'])
            data.append(db.get_move_from_id(pokemons['move_1_id'])['name'])
            data.append(db.get_move_from_id(pokemons['move_1_id'])['damage'])
            data.append(db.get_move_from_id(pokemons['move_2_id'])['name'])
            data.append(db.get_move_from_id(pokemons['move_2_id'])['damage'])
            data.append(db.get_move_from_id(pokemons['move_3_id'])['name'])
            data.append(db.get_move_from_id(pokemons['move_3_id'])['damage'])
            data.append(db.get_move_from_id(pokemons['move_4_id'])['name'])
            data.append(db.get_move_from_id(pokemons['move_4_id'])['damage'])
            data.append(pokemons['health'])
        data.append(wild_pokemon)
        damage = pokemon.get_pokemon_data(wild_pokemon)['stats'][5]['base_stat']
        data.append(damage)
        wild_moves = pokemon.get_random_moves(wild_pokemon)
        for move in wild_moves:
            data.append(move)
        items = db.get_item_from_username(session['user'])
        return render_template('battle.html', user_pkmn = user_pokemon_url, wild_pkmn = wild_pokemon_url, data=data, items=items)
    return redirect(url_for('login'))

@app.route("/about")
def about():
    today = datetime.datetime.now().strftime("%Y-%m-%d")

    # Try to open up content for weather stuff
    try:
        f = open('data/content.json', 'r')
    except Exception as e:
        f = open('data/content.json', 'x')
    try:
        data = json.loads(f.read())
    except Exception as e:
        data = {}
    f.close()
    session['current-hour'] = datetime.datetime.now().hour
    current = data[today]['weather-hourly'][session['current-hour']]
    return render_template('about.html', current = current, data = data[today])


@app.route("/map")
def map():
    if 'user' in session:
        if 'pokemon' not in session:
            session['pokemon'] = API.create_pokemon_list()
        data = session['pokemon']
        user_info = db.get_user_from_username(session['user'])
        xcor = user_info["xcor"]
        ycor = user_info["ycor"]

        today = datetime.datetime.now().strftime("%Y-%m-%d")

        # Try to open up content for weather stuff
        try:
            f = open('data/content.json', 'r')
        except Exception as e:
            f = open('data/content.json', 'x')
        try:
            data = json.loads(f.read())
        except Exception as e:
            data = {}
        f.close()

        session['current-hour'] = datetime.datetime.now().hour
        current = data[today]['weather-hourly'][session['current-hour']]

        return render_template("map.html", current = current, cookie = data, data = data[today], x=xcor, y=ycor)
    return redirect(url_for('login'))

@app.route("/toheal", methods=["POST"])
def toheal():
    if 'user' in session:
        locations = request.form.get('location').split(" ")
        x = locations[0]
        y = locations[1]
        db.modify_user_coordinates(x, y, session['user'])
        return redirect(url_for('heal'))
    return redirect(url_for('login'))

@app.route("/update_health", methods=["POST"])
def update_health():
    if 'user' in session:
        user_pkmn = db.get_user_active_pokemon(session['user'])[0]['id']
        health = request.form.get('health')
        db.update_health(user_pkmn, health)
        return redirect(url_for('map'))
    return redirect(url_for('login'))

@app.route("/updates", methods=["POST"])
def updates():
    if 'user' in session:
        user_pkmn = db.get_user_active_pokemon(session['user'])[0]['id']
        update = request.form.get('update').split(" ")
        db.update_health(user_pkmn, int(update[0]))
        db.add_item(session['user'], update[1], "potion", 1)
        return redirect(url_for('map'))
    return redirect(url_for('login'))

@app.route("/tobattle", methods=["POST"])
def tobattle():
    if 'user' in session:
        locations = request.form.get('location').split(" ")
        x = locations[0]
        y = locations[1]
        db.modify_user_coordinates(x, y, session['user'])
        return redirect(url_for('game'))
    return redirect(url_for('login'))

@app.route("/heal")
def heal():
    if 'user' in session:
        pokemon_list = db.get_user_active_pokemon(session['user'])
        for a_pokemon in pokemon_list:
            a_pokemon["image"] = pokemon.get_pokemon_image(a_pokemon['name'])
            a_pokemon["percent"] = math.floor(a_pokemon['health'] / a_pokemon ['max_health'] * 100)
            temp = a_pokemon["type"]
            a_pokemon["type"] = []
            for type in temp.split(" "):
                a_pokemon["type"].append(type.capitalize())
        return render_template("heal.html", list = pokemon_list)
    return redirect(url_for('login'))

@app.route("/healall")
def healall():
    if 'user' in session:
        pokemon_list = db.get_user_active_pokemon(session['user'])
        for pokemon in pokemon_list:
            db.update_health(pokemon["id"], pokemon["max_health"])
        return redirect(url_for("heal"))
    return redirect(url_for('login'))

# ==========================LANDING PAGE==========================

@app.route('/')
def home():
    if 'user' not in session:
        return redirect(url_for('login'))
    current_id = db.get_user_id_from_username(session['user'])
    all_pokemon = db.get_all_pokemon()

    has_pokemon = False
    for pokemon in all_pokemon:
        if pokemon['user_id'] == current_id:
            has_pokemon = True

    if not has_pokemon:
        return redirect(url_for("starter_pokemon"))
    # read json file containing the api keys
    # with open('data/API_Keys/keys.json') as json_file:
    #    json_data = json.loads(json_file.read())

    # cookie size too small
    # all_memory = ["slow","medium","fast","medium-slow","slow-then-very-fast","fast-then-very-slow","pokemon"]
    if 'pokemon' not in session:
        session['pokemon'] = API.create_pokemon_list()
    if "fast" not in session:
        session["fast"] = API.create_growth_dict()

    # EXAMPLE ON HOW TO DO INCREMENT
    db.increment_pokemon_exp(1, 20, session["fast"])

##########################################################################################################
    # code for the weather
    WEATHER_STUB = "https://api.darksky.net/forecast/{}/{},{}" # api key, longitude, latitude
    IPAPI_STUB = "https://ipapi.co/{}/json/"

    # read json file containing the api keys
    with open('keys/keys.json') as json_file:
        json_data = json.loads(json_file.read())

    # Checking the longitude and latitiude based on the ip address
    p = urllib.request.urlopen(IPAPI_STUB.format(getIP()))
    ip = json.loads(p.read())
    location = ""
    location += ip['city'] + ", " + ip['country_name']

    today = datetime.datetime.now().strftime("%Y-%m-%d")

    try:
        w = urllib.request.urlopen(WEATHER_STUB.format(json_data['Weather'], ip['latitude'], ip['longitude']))
    except Exception as e:
        print(e)
        return render_template('error.html', err = e)

    # Try to open up content
    try:
        f = open('data/content.json', 'r')
    except Exception as e:
        f = open('data/content.json', 'x')
    try:
        data = json.loads(f.read())
    except Exception as e:
        data = {}
    f.close()

    # if it is time to update/never had it
    # update it
    if today not in data:
        # still works with w and n defined in the try/except
        # w = urllib.request.urlopen(WEATHER_STUB.format(json_data['Weather'], ip['latitude'], ip['longitude'])) # based on your ip address location
        weather = json.loads(w.read())

        # Create our own json file for easier read/less space taken
        data[today] = dict()
        data[today]['weather-summary'] = weather['daily']['summary']
        data[today]['weather-hourly'] = []
        data[today]['weather-icon'] = ICONS[weather['currently']['icon']]
        # Weather hourly is a list of dictionaries containing weather info for each hour
        for hour in weather['hourly']['data']:
            d = dict()
            data[today]['weather-hourly'] += [d]
            d['time'] = hour['time']
            d['icon'] = ICONS[hour['icon']]
            temp = float(hour['temperature'])
            d['temp-f'] = str(temp).split('.')[0]
            d['temp-c'] = str((temp - 32.) * 5 / 9).split('.')[0]
            d['summary'] = hour['summary']
            # print("\nPrecipitation:" + str(hour['precipProbability']) + "\n")
            d['prob'] = "0.0"
            d['type'] = ""
            d['result'] = ""
            d['prob'] = str(hour['precipProbability'])
            if ( hour['precipProbability'] > 0):
                d['type'] = hour['precipType']

            if (d['type'] == "rain"):
                d['result'] = "Incease 300% chance of water pokemon!"
            elif (d['type'] == "snow" or d['type'] == "sleet"):
                d['result'] = "Incease 300% chance of ice pokemon!"
            else:
                d['type'] = "no precipitation"
                d['result'] = "No change in pokemon occurances."

        # Add it all to our own file
        f = open('data/content.json', 'w')
        f.write(json.dumps(data, indent=4))
        f.close()

    session['location'] = location
    session['current-hour'] = datetime.datetime.now().hour
    session['date'] = today

    need_to_warn = False
    # POPUP once per session warning of IP use
    if 'warned' not in session:
        session['warned'] = True
        need_to_warn = True
    f = float(data[today]['weather-hourly'][session['current-hour']]['temp-f'])
    c = (f - 32.) * 5 / 9
    session['temp-f'] = str(f).split('.')[0] + '°'
    session['temp-c'] = str(c).split('.')[0] + '°'

    current = data[today]['weather-hourly'][session['current-hour']]

    return render_template('home.html', data = data[today], current = current, session = session, warning = need_to_warn)


# ==========================STARTER POKEMON==========================

@app.route('/starter_pokemon', methods = ['GET'])
def starter_pokemon():
    if 'user' in session:
        pokemon_list = db.get_pokemon_from_username(session['user'])
        print(pokemon_list)
        if pokemon_list:
            return redirect(url_for('home'))
        images = pokemon.starter_images()
        return render_template('starter_pokemon.html', **images)
    return redirect(url_for('home'))

@app.route('/start', methods = ['GET'])
def start():
    if 'user' in session:
        # if pokemon_list:
        #    return redirect(url_for('home'))
        if 'starter' in request.args:
            name = request.args['starter']
            image = pokemon.get_pokemon_image(name)
            pokemon.add_pokemon(session['user'], name)
            return render_template('start_game.html',
                                   starter_name=name,
                                   starter_image=image)
    return redirect(url_for('home'))


# ==========================USER LOGIN, RESET, REGISTER==========================

@app.route('/login')
def login():
    if 'user' in session:
        return redirect(url_for('home'))
    return render_template('login.html')

@app.route('/auth', methods = ["POST"])
def auth():
    if 'user' in session:
        return redirect(url_for('home'))
    '''Intermediate to authenticate login by user'''
    # # # Authenticate
    username_input = request.form.get("username")
    password_input = request.form.get("password")
    all_usernames = db.get_all_users()
    if username_input in all_usernames:
        # If the hashes match
        if md5_crypt.verify(password_input, all_usernames[username_input]):
            # Log them in
            session['user'] = username_input
            return redirect(url_for("home"))
        # Failed password and username match
        else:
            flash("Invalid password")
    else:
        # Username doesnt exist
        flash("Invalid username")
    return redirect(url_for("login"))

@app.route('/register', methods = ["GET", "POST"])
def register():
    if 'user' in session:
        return redirect(url_for('home'))
    '''Adding users to the database'''
    if request.form.get("reg_username") != None:
        r_username = request.form.get("reg_username")
        r_password = request.form.get("reg_password")
        check_pass = request.form.get("check_password")
        r_question = request.form.get("reg_question")
        r_answer = request.form.get("reg_answer")
        if r_username in db.get_all_users():
            flash("Username taken")
        elif r_password != check_pass:
            flash("Passwords do not match!")
        elif r_password.count(' ') != 0:
            flash("Password can not contain spaces")
        elif not r_username.isalnum():
            flash("Username should be alphanumeric")
        else:
            if request.form.get("reg_question") != None:
                session['user'] = r_username
                db.add_userFull(r_username, md5_crypt.encrypt(r_password), r_question, md5_crypt.encrypt(r_answer))
                return redirect(url_for("home"))
            else:
                session['user'] = r_username
                db.add_user(r_username, md5_crypt.encrypt(r_password))
                return redirect(url_for("home"))
    return render_template('register.html')

@app.route('/reset', methods = ["GET", "POST"])
def reset():
    if 'user' in session:
        return redirect(url_for('home'))
    '''To reset userpassword'''
    if request.form.get("reg_username") != None:
        r_username = request.form.get("reg_username")
        r_answer = request.form.get("reg_answer")
        r_password = request.form.get("reg_password")
        check_pass = request.form.get("check_password")
        all_usernames = db.qaDict() #Returns dict {user:answer_to_question}
        if r_username not in db.get_all_users():
            flash("Username not found")
        elif r_password != check_pass:
            flash("Passwords do not match!")
        elif r_password.count(' ') != 0:
            flash("Password can not contain spaces")
        elif not r_username.isalnum():
            flash("Username should be alphanumeric")
        else:
            session['user'] = r_username
            # checks the question and answer in the db
            if r_username in all_usernames:
                # if the hashes match
                if md5_crypt.verify(r_answer, all_usernames[r_username]):
                    # changes the user password
                    db.update_pass(r_username, md5_crypt.encrypt(r_password))
                    return redirect(url_for('home'))
                else:
                    flash("Error occurred")
    return render_template('reset.html')

@app.route('/logout', methods = ['GET'])
def logout():
    if 'user' in session:
        session.pop('user')
    return redirect(url_for('home'))


if __name__ == "__main__":
    app.debug = True #change to False before our demo
    app.run()
