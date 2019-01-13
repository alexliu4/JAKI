import urllib.request, json, os

from util import db

def get_pokemon_data(pokemon):
    url_stub = "https://pokeapi.co/api/v2/pokemon/"
    url = url_stub + pokemon.lower()
    print("---------------------------\n")
    print( url)
    print("---------------------------\n")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    url_object = urllib.request.urlopen(req)
    print("---------------------------\n")
    print(url_object)
    print("---------------------------\n")
    info = url_object.read()
    print("---------------------------\n")
    print(info)
    print("---------------------------\n")
    data = json.loads(info)
    return data

def get_pokemon_image(pokemon):
    data = get_pokemon_data(pokemon)
    image_url = data["sprites"]["front_default"]
    print("---------------------------\n")
    print(image_url)
    print("---------------------------\n")
    return image_url


def starter_images():
    dict = {}
    starter_pokemon = ["bulbasaur", "charmander", "squirtle"]
    for pokemon in starter_pokemon:
        dict[pokemon] = get_pokemon_image(pokemon)
    print("---------------------------\n")
    print(dict)
    print("---------------------------\n")
    return dict

def add_pokemon(username, pokemon):
    poke_type = ""
    poke_max_health = 0
    poke_move_list = []
    poke_level = 1        
    has_room = False
    print(db.get_user_active_pokemon(username))
    if strlen(db.get_user_active_pokemon(username)) < 6:
        hasroom = True
    db.add_pokemon(username, pokemon, poke_type, poke_max_health, poke_move_list, poke_level, has_room, description)

