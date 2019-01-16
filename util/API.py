import urllib.request, json, os

def create_growth_dict():
    growth_dict = {}
    grow_stub = "https://pokeapi.co/api/v2/growth-rate/3/"
    grow_req = urllib.request.Request(grow_stub, headers={'User-Agent': 'Mozilla/5.0'})
    grow_object = urllib.request.urlopen(grow_req)
    grow_info = grow_object.read()
    grow_data = json.loads(grow_info)
    inner_info = {}
    inner_info["levels"] = grow_data["levels"]
    for pokemon in grow_data["pokemon_species"]:
        growth_dict[grow_data["name"]] = inner_info
    return growth_dict

def create_pokemon_list():
    stub = "https://pokeapi.co/api/v2/pokemon/"
    req = urllib.request.Request(stub, headers={'User-Agent': 'Mozilla/5.0'})
    object = urllib.request.urlopen(req)
    info = object.read()
    data = json.loads(info)

    result = {}
    for pokemon in data["results"]:
        if (int)(pokemon["url"].split("/")[-2]) < 252:
            result[pokemon["name"]] = pokemon["url"]
    return result

def water():
    stub = "https://pokeapi.co/api/v2/pokemon/types/11"
    req = urllib.request.Request(stub, headers={'User-Agent': 'Mozilla/5.0'})
    object = urllib.request.urlopen(req)
    info = object.read()
    data = json.loads(info)

    result = {}
    for pokemon in data["pokemon"]:
        if (int)(pokemon["url"].split("/")[-2]) < 252:
            result[pokemon["name"]] = pokemon["url"]
    return result

def ice():
    stub = "https://pokeapi.co/api/v2/pokemon/types/15"
    req = urllib.request.Request(stub, headers={'User-Agent': 'Mozilla/5.0'})
    object = urllib.request.urlopen(req)
    info = object.read()
    data = json.loads(info)

    result = {}
    for pokemon in data["pokemon"]:
        if (int)(pokemon["url"].split("/")[-2]) < 252:
            result[pokemon["name"]] = pokemon["url"]
    return result
