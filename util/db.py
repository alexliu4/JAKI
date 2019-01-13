import sqlite3
DB = "data/allData.db"

# ===================== USER STUFF==========================
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
    command = "INSERT INTO users (username, password_hash, question, answer, xcor, ycor)VALUES(?,?,?,?,?,?);"
    c.execute(command, (username, hashed_pass, question, hashed_ans, 0, 0))
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

# ========================== POKEMON STUFF ================================

def pokemon_dict(list):
    pokedict = {}
    if list:
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
    return pokedict

def add_Pokemon(username, poke_name, poke_type, poke_max_health, poke_move_list, poke_level, has_room, description):
    '''adds pokemon to use table'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "INSERT INTO user_pokemons(name, type, user_id, health, max_health, move_1_id, move_2_id, move_3_id, move_4_id, exp, level, player_has, description, attack, defense)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    c.execute(command, (poke_name, poke_type, get_user_id_from_username(username), poke_max_health, poke_max_health, poke_move_list[0], poke_move_list[1], poke_move_list[2], poke_move_list[3], 0, poke_level, has_room, description, 10, 5))
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

def add_water(list):
    '''Returns a list of all of the water type pokemon'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "SELECT * FROM user_pokemons WHERE type = 'water';"
    c.execute(command)
    info = c.fetchall()
    db.close()
    output = []
    final = []
    for pokemon in info:
        output.append(pokemon_dict(pokemon))
    final = list + output
    final += output
    return final

def add_ice(list):
    '''Returns a list of all of the ice type pokemon'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "SELECT * FROM user_pokemons WHERE type = 'ice';"
    c.execute(command)
    info = c.fetchall()
    db.close()
    output = []
    final = []
    for pokemon in info:
        output.append(pokemon_dict(pokemon))
    final = list + output
    final += output
    return final

def get_pokemon_from_username(username):
    pokemon_list = []
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "SELECT * FROM user_pokemons WHERE user_id = ?;"
    c.execute(command, (get_user_id_from_username(username),))
    info = c.fetchall()
    db.close()
    for pokemon in info:
        pokemon_list.append(pokemon_dict(info))
    return pokemon_list

def get_user_active_pokemon(username):
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "SELECT * FROM user_pokemons WHERE user_id = ? AND player_has = ?;"
    c.execute(command, (get_user_id_from_username(username), True))
    info = c.fetchall()
    db.close()
    for pokemon in info:
        pokemon_list.append(pokemon_dict(info))
    return pokemon_list

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
    # UPDATE LEVEL HERE if requiredexp(level+1) < current exp: level++
    db.commit()
    db.close()

# =====================MOVES========================

def move_dict(list):
    move = {}
    move["id"] = list[0]
    move["name"] = list[1]
    move["uses"] = list[2]
    move["max_uses"] = list[3]
    move["damage"] = list[4]
    return move

def add_moves(move_name, move_uses, move_max_uses, damage):
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "INSERT INTO moves(name,uses,max_uses,damage) VALUES(?,?,?,?);"
    c.execute(command, (move_name, move_uses, move_max_uses, damage))
    db.commit()
    command = "SELECT id FROM moves;"
    c.execute(command)
    info = c.fetchall()
    db.close()
    return info[-1][0]

def get_move_from_id(move_id):
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "SELECT * FROM moves WHERE id = ?;"
    c.execute(command, (move_id,))
    info = c.fetchone()
    print(info)
    db.close()
    return move_dict(info)

# ==========================ITEMS==========================

def item_dict(list):
    item = {}
    item["id"] = list[0]
    item["name"] = list[1]
    item["type"] = list[2]
    item["quantity"] = list[3]
    item["user_id"] = list[4]
    return item

def add_item(username, item_name, item_type, quantity):
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "INSERT INTO items(name,type,quantity,user_id) VALUES(?,?,?,?);"
    c.execute(command, (item_name, item_type, quantity, get_user_id_from_username(username)))
    db.commit()
    db.close()

def get_item_from_id(item_id):
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "SELECT * FROM items WHERE id = ?;"
    c.execute(command, (item_id,))
    info = c.fetchone()
    db.close()
    return item_dict(info)

def get_item_from_username(username):
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "SELECT * FROM items WHERE user_id = ?;"
    c.execute(command, (get_user_id_from_username(username),))
    info = c.fetchall()
    db.close()
    results = []
    for item in info:
        results.append(item_dict(item))
    return results

def update_item(item_id, new_quantity):
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "UPDATE items SET quantity=" + str(new_quantity) + " WHERE id=" + str(item_id) + ";"
    c.execute(command)
    db.commit()
    db.close()


# MAKE TABLES AND DATABASE IF THEY DONT EXIST
db = sqlite3.connect(DB)
c = db.cursor()
commands = ["CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password_hash TEXT, question TEXT, answer TEXT, xcor INTEGER, ycor INTEGER)"]
commands.append("CREATE TABLE IF NOT EXISTS moves(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, uses INTEGER, max_uses INTEGER, damage INTEGER)")
commands.append("CREATE TABLE IF NOT EXISTS user_pokemons(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, user_id INTEGER, health INTEGER, max_health INTEGER, move_1_id INTEGER, move_2_id INTEGER, move_3_id INTEGER, move_4_id INTEGER, exp INTEGER, level INTEGER, player_has BOOLEAN, description TEXT, attack TEXT, defense TEXT)")
commands.append("CREATE TABLE IF NOT EXISTS items(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, quantity INTEGER, user_id INTEGER)")
for command in commands:
    c.execute(command)

# SEEDING DATA
'''
add_userFull("jack", "wow", "cool", "nice")
add_userFull("bobby", "wow", "cool", "nice")
add_userFull("penelope", "wow", "cool", "nice")
add_userFull("rustin", "wow", "cool", "nice")
add_userFull("amazing", "wow", "cool", "nice")
add_userFull("wonderful", "wow", "cool", "nice")

add_item("jack","potion","heal",5)
add_item("bobby","potion","heal",5)
add_item("amazing","potion","heal",5)
add_item("rustin","potion","heal",5)
add_item("jack","leaf","heal",5)

for i in range(25):
    add_moves("growl", i, 20+i, 50-i)

add_Pokemon("jack", "Charizard", "fire", 1, [1,2,3,4], 1, True, "dragon guy")
add_Pokemon("bobby", "Squirtle", "fire", 2, [5,6,7,8], 21, True, "turtle")
add_Pokemon("penelope", "IvySaur", "fire", 3, [9,10,11,12], 32, True, "drago leaf guy")
add_Pokemon("rustin", "growlie", "fire", 4, [13,14,15,16], 13, True, "dogo guy")
add_Pokemon("amazing", "dog", "fire", 5, [17,18,19,20], 5, True, "dragon dogo guy")
add_Pokemon("rustin", "muchie", "fire", 4, [13,14,15,16], 13, True, "dogo guy")
add_Pokemon("bobby", "popo", "fire", 5, [17,18,19,20], 5, True, "dragon dogo guy")
'''
