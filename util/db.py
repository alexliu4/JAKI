import sqlite3
DB = "data/allData.db"


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
    command = "INSERT INTO users (username,password, question, answer)VALUES(?,?,?,?);"
    c.execute(command, (username, hashed_pass, question, hashed_ans))
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
    command = "SELECT username,password from users;"
    c.execute(command)
    info = c.fetchall()
    users = {}
    for item in info:
        users[item[0]] = item[1]
    db.close()
    return users


# MAKE TABLES AND DATABASE IF THEY DONT EXIST
db = sqlite3.connect(DB)
c = db.cursor()
commands = ["CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password_hash TEXT, question TEXT, answer TEXT, xcor INTEGER, ycor INTEGER)"]
commands.append("CREATE TABLE IF NOT EXISTS moves(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, uses INTEGER, max_uses INTEGER, damage INTEGER)")
commands.append("CREATE TABLE IF NOT EXISTS user_pokemons(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, user_id TEXT, health INTEGER, max_health INTEGER, move_1_id INTEGER, move_2_id INTEGER, move_3_id INTEGER, move_4_id INTEGER, exp INTEGER, next_exp INTEGER, level INTEGER, player_has BOOLEAN, description TEXT)")
commands.append("CREATE TABLE IF NOT EXISTS items(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, quantity INTEGER, user_id INTEGER)")
for command in commands:
    c.execute(command)
