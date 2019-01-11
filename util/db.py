import sqlite3
DB = "data/allData.db"

def pokemon_dict(list):
    pokedict = {};
    pokedict["id"] = list[0]
    pokedict["name"] = list[1]
    pokedict["type"] = list[2]
    pokedict["user_id"] = list[3]
    pokedict["health"] = list[4]
    pokedict["max_health"] = list[5]
    pokedict["move_1_id"] = list[6]
    pokedict["move_2_id"] = list[7]
    pokedict["move_3_id"] = list[8]
    pokedict["move_4_id"] = list[9]
    pokedict["exp"] = list[10]
    pokedict["level"] = list[11]
    pokedict["player_has"] = list[12]
    pokedict["description"] = list[13]
    return pokedict;


#===================== USER STUFF==========================
def add_user(username, hashed_pass):
    '''adds users to use table'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "INSERT INTO users (username,password)VALUES(?,?);"
    c.execute(command, (username, hashed_pass))
    db.commit()
    db.close()

def add_userFull(username, hashed_pass, question, hashed_ans):
    '''adds users to use table'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "INSERT INTO users (username,password, question, answer, xcor, ycor)VALUES(?,?,?,?,?,?);"
    c.execute(command, (username, hashed_pass, question, hashed_ans,0,0))
    db.commit()
    db.close()

def update_pass(user, hashed_pass):
    '''resets users password'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    # command = "SELECT * FROM users;"
    # c.execute(command)
    # something = c.fetchall()
    # print(something)
    # print(user)
    # print(hashed_pass)
    command = "UPDATE users SET password='" + hashed_pass + "'WHERE username='" + user + "';"
    c.execute(command)
    # print("passwords updated")
    db.commit()
    db.close()

def qaDict():
    '''returns all the users and hashed answers in dict {user:answer}'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "SELECT username,answer from users;"
    c.execute(command)
    info = c.fetchall()
    users = {}
    for item in info:
        users[item[0]] = item[1]
    db.close()
    return users


def get_all_users():
    '''returns all the users and hashed passwords in dict {user:pass}'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "SELECT username,password_hash from users;"
    c.execute(command)
    info = c.fetchall()
    users = {}
    for item in info:
        users[item[0]] = item[1]
    db.close()
    return users

def get_user_id_from_username(username):
    '''returns the id of a user given their username'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "SELECT id FROM users WHERE username = ?;"
    c.execute(command, (username,))
    info = c.fetchone()
    db.close()
    return info[0]

#========================== POKEMON STUFF ================================

def add_Pokemon(username, poke_name, poke_type, poke_max_health, poke_move_list, poke_level, has_room, description):
    '''adds pokemon to use table'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "INSERT INTO user_pokemons(name, type, user_id, health, max_health, move_1_id, move_2_id, move_3_id, move_4_id, exp, level, player_has, description, attack, defense)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    c.execute(command, (poke_name, poke_type, get_user_id_from_username(username), poke_max_health, poke_max_health,poke_move_list[0], poke_move_list[1],poke_move_list[2], poke_move_list[3],0,poke_level,has_room,description,10,5))
    db.commit()
    db.close()

def get_all_pokemon():
    '''Returns a list of all of the pokemon'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "SELECT * FROM user_pokemons;"
    c.execute(command)
    info = c.fetchall()
    db.close()
    output = []
    for pokemon in info:
        output.append(pokemon_dict(pokemon))
    return output

def get_pokemons_from_username(username):
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "SELECT * FROM user_pokemons WHERE user_id = ?;"
    c.execute(command, (get_user_id_from_username(username),))
    info = c.fetchall()
    db.close()
    return pokemon_dict(info)

def get_pokemon_from_id(poke_id):
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "SELECT * FROM user_pokemons WHERE id = ?;"
    c.execute(command, (poke_id,))
    info = c.fetchall()
    db.close()
    return pokemon_dict(info[0])

def increment_pokemon_exp(poke_id, experience):
    db = sqlite3.connect(DB)
    c = db.cursor()
    new_exp = get_pokemon_from_id(poke_id)[exp] + experience
    command = "UPDATE user_pokemons SET exp=" + new_exp + " WHERE id=" + poke_id + ";"
    c.execute(command)
    #UPDATE LEVEL HERE if requiredexp(level+1) < current exp: level++
    db.commit()
    db.close()

#=====================MOVES========================


#add_Pokemon("bob","squire","water",40,[3,4,6,3],5,True,"cool man")
#get_user_id_from_username("bob")
#print(get_all_pokemon())
#print(get_pokemon_from_id(2))

#print(get_pokemons_from_username("bob"))
#attack minus defense
# MAKE TABLES AND DATABASE IF THEY DONT EXIST
db = sqlite3.connect(DB)
c = db.cursor()
commands = ["CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password_hash TEXT, question TEXT, answer TEXT, xcor INTEGER, ycor INTEGER)"]
commands.append("CREATE TABLE IF NOT EXISTS moves(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, uses INTEGER, max_uses INTEGER, damage INTEGER)")
commands.append("CREATE TABLE IF NOT EXISTS user_pokemons(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, user_id INTEGER, health INTEGER, max_health INTEGER, move_1_id INTEGER, move_2_id INTEGER, move_3_id INTEGER, move_4_id INTEGER, exp INTEGER, level INTEGER, player_has BOOLEAN, description TEXT, attack TEXT, defense TEXT)")
commands.append("CREATE TABLE IF NOT EXISTS items(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, quantity INTEGER, user_id INTEGER)")
for command in commands:
    c.execute(command)
