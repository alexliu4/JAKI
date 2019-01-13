import json, urllib, os, datetime, random

from flask import Flask, render_template, request, session, url_for, redirect, flash, jsonify

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

def encounters(steps):
    when = (random.randint(4, 18))
    if (steps == when):
        return "pokemon encountered"

def typeChance():
    # get all pokemon
    output = []
    output = db.get_all_pokemon()

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
    prob = data[today]['prob']
    if (prob > 0):
        type = data[today]['type']
        if (type == "rain"):
            print("water types will occur x3 more often")
            output = db.add_water # adds each water type 2 more times
            chosen = (random.choice(output))
        if (type == "snow" or type == "sleet"):
            print("ice types will occur x3 more often")
            output = db.add_ice # adds each ice type 2 more times
            chosen = (random.choice(output))

    else:
        print("all pokemon have equal chances of occuring")
        chosen = (random.choice(output))
    print (chosen)
    return chosen


@app.route('/game')
def game():
    return render_template('battle.html')

@app.route("/map")
def map():
    if 'pokemon' not in session:
        session['pokemon'] = API.create_pokemon_list()
    data = session['pokemon']
    return render_template("map.html",cookie = data)

@app.route('/')
def home():

    # read json file containing the api keys
    # with open('data/API_Keys/keys.json') as json_file:
    #    json_data = json.loads(json_file.read())

    # cookie size too small
    # all_memory = ["slow","medium","fast","medium-slow","slow-then-very-fast","fast-then-very-slow","pokemon"]
    if 'pokemon' not in session:
        session['pokemon'] = API.create_pokemon_list()
    if "fast" not in session:
        session["fast"] = API.create_growth_dict()

##########################################################################################################
    # code for the weather
    WEATHER_STUB = "https://api.darksky.net/forecast/{}/{},{}" # api key, longitude, latitude
    IPAPI_STUB = "https://ipapi.co/{}/json/"

    json_data = "8b3d6a5f90fbe26c7e29aaef01b9875e"

    # Checking the longitude and latitiude based on the ip address
    p = urllib.request.urlopen(IPAPI_STUB.format(getIP()))
    ip = json.loads(p.read())
    location = ""
    location += ip['city'] + ", " + ip['country_name']

    today = datetime.datetime.now().strftime("%Y-%m-%d")

    try:
        w = urllib.request.urlopen(WEATHER_STUB.format(json_data, ip['latitude'], ip['longitude']))
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
            d['prob'] = str(hour['precipProbability'])
            if ( hour['precipProbability'] > 0):
                d['type'] = hour['precipType']

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

    return render_template('home.html', data = data[today], session = session, warning = need_to_warn)


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
        pokemon_list = db.get_pokemon_from_username(session['user'])
        print(pokemon_list)
        if pokemon_list:
            return redirect(url_for('home'))
        if 'starter' in request.args:
            name = request.args['starter']
            image = pokemon.get_pokemon_image(name)

            # still need to add the starter to the db

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
        pokemon_list = db.get_pokemon_from_username(session['user'])
        print(pokemon_list)
        if pokemon_list:
            return redirect(url_for('home'))
        if 'starter' in request.args:
            name = request.args['starter']
            image = pokemon.get_pokemon_image(name)
            pokemon.add_pokemon(session['user'],name)
            # still need to add the starter to the db

            return render_template('start_game.html',
                                   starter_name=name,
                                   starter_image=image)
    return redirect(url_for('home'))


if __name__ == "__main__":
    app.debug = True #change to False before our demo
    app.run()
