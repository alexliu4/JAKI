import urllib.request, json, os, random

from util import db

def get_pokemon_data(pokemon):
    '''Gets data about a specific Pokemon from Poke API'''
    url_stub = "https://pokeapi.co/api/v2/pokemon/"
    url = url_stub + pokemon.lower()
    #print("---------------------------\n")
    #print( url)
    #print("---------------------------\n")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    url_object = urllib.request.urlopen(req)
    #print("---------------------------\n")
    #print(url_object)
    #print("---------------------------\n")
    info = url_object.read()
    #print("---------------------------\n")
    #print(info)
    #print("---------------------------\n")
    data = json.loads(info)
    return data

def get_move_id(move):
    '''Retrieves a move's id number given its name'''
    url_stub = "https://pokeapi.co/api/v2/move/"
    url = url_stub + move.lower()
    #print("---------------------------\n")
    #print( url)
    #print("---------------------------\n")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    url_object = urllib.request.urlopen(req)
    #print("---------------------------\n")
    #print(url_object)
    #print("---------------------------\n")
    info = url_object.read()
    #print("---------------------------\n")
    #print(info)
    #print("---------------------------\n")
    data = json.loads(info)
    #print(data["id"])
    return data["id"]

def get_random_moves(pokemon):
    '''Returns four random moves of a Pokemon'''
    data = get_pokemon_data(pokemon)
    unprocessed_moves = data["moves"]
    random.shuffle(unprocessed_moves)
    processed_moves = []
    for move in unprocessed_moves[:4]:
        #print(move["move"]["name"])
        processed_moves.append(get_move_id(move["move"]["name"]))
    print(processed_moves)
    return processed_moves

def get_pokemon_image(pokemon):
    '''Returns the image link for a Pokemon'''
    data = get_pokemon_data(pokemon)
    image_url = data["sprites"]["front_default"]
    #print("---------------------------\n")
    #print(image_url)
    #print("---------------------------\n")
    return image_url


def starter_images():
    '''Returns a dictionary of starter Pokemon images'''
    dict = {}
    starter_pokemon = ["bulbasaur", "charmander", "squirtle"]
    for pokemon in starter_pokemon:
        dict[pokemon] = get_pokemon_image(pokemon)
    #print("---------------------------\n")
    #print(dict)
    #print("---------------------------\n")
    return dict

def add_pokemon(username, pokemon):
    '''Link a Pokemon to a user in the database'''
    data = get_pokemon_data(pokemon)
    poke_type = ""
    poke_max_health = 40
    unprocessed_moves = data["moves"]
    #print(unprocessed_moves)
    processed_moves = []
    for move in unprocessed_moves[:4]:
        processed_moves.append(db.add_moves(move["move"]["name"],35,35,10))
    poke_level = 1
    has_room = True
    #print(db.get_user_active_pokemon(username))
    if len(db.get_user_active_pokemon(username)) >= 6:
        hasroom = False
    description = ""
    db.add_Pokemon(username, pokemon, poke_type, poke_max_health, processed_moves, poke_level, has_room)
