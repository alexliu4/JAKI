import urllib.request, json, os, random

from util import db

def get_pokemon_data(pokemon):
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
    data = get_pokemon_data(pokemon)
    image_url = data["sprites"]["front_default"]
    #print("---------------------------\n")
    #print(image_url)
    #print("---------------------------\n")
    return image_url


def starter_images():
    dict = {}
    starter_pokemon = ["bulbasaur", "charmander", "squirtle"]
    for pokemon in starter_pokemon:
        dict[pokemon] = get_pokemon_image(pokemon)
    #print("---------------------------\n")
    #print(dict)
    #print("---------------------------\n")
    return dict

def add_pokemon(username, pokemon):
    data = get_pokemon_data(pokemon)
    poke_type = ""
    poke_max_health = 0
    unprocessed_moves = data["moves"]
    #print(unprocessed_moves)
    processed_moves = [] 
    for move in unprocessed_moves[:4]:
        #print(move["move"]["name"])
        processed_moves.append(get_move_id(move["move"]["name"]))
    print(processed_moves)
    poke_level = 1        
    has_room = True
    #print(db.get_user_active_pokemon(username))
    if len(db.get_user_active_pokemon(username)) >= 6:
        hasroom = False
    description = ""
    db.add_Pokemon(username, pokemon, poke_type, poke_max_health, processed_moves, poke_level, has_room, description)


get_random_moves("charmander")

