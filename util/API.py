import urllib.request, json, os

def store_poke_api():
    url = "https://pokeapi.co/api/v2/"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    url_object = urllib.request.urlopen(req)
    info = url_object.read()
    data = json.loads(info)
    '''
    print("---------------------------\n")
    print(data)
    print("---------------------------\n")
    '''

    finalized_data = {
    #"growth_rate": create_growth_dict()
    "pokemon": create_pokemon_list()
    }
    print("\n\n\n" + str(finalized_data))

    return finalized_data

def create_growth_dict(type):
    table = {
    "slow":1,
    "medium":2,
    "fast":3,
    "medium-slow":4,
    "slow-then-very-fast":5,
    "fast-then-very-slow":6
    }
    growth_dict = {}
    grow_stub = "https://pokeapi.co/api/v2/growth-rate/" + str(table[type])+ "/"
    grow_req = urllib.request.Request(grow_stub, headers={'User-Agent': 'Mozilla/5.0'})
    grow_object = urllib.request.urlopen(grow_req)
    grow_info = grow_object.read()
    grow_data = json.loads(grow_info)
    inner_info = {}
    inner_info["levels"] = grow_data["levels"]
    inner_info["pokemons"] = []
    for pokemon in grow_data["pokemon_species"]:
        inner_info["pokemons"].append(pokemon["name"])
        growth_dict[grow_data["name"]] = inner_info
    return growth_dict

def create_pokemon_list():
    pokemon_list = []
    stub = "https://pokeapi.co/api/v2/pokemon/"
    req = urllib.request.Request(stub, headers={'User-Agent': 'Mozilla/5.0'})
    object = urllib.request.urlopen(req)
    info = object.read()
    data = json.loads(info)

    for pokemon in data["results"]:
        if (int)(pokemon["url"].split("/")[-2]) < 252:
            pokemon_list.append(pokemon["name"])
    return pokemon_list
