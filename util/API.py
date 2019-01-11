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

    #Growth rate
    growth_dict = {}
    for i in range(1,7):
        grow_stub = "https://pokeapi.co/api/v2/growth-rate/" + str(i) + "/"
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


    finalized_data = {
    "growth_rate": growth_dict
    }
    #print("\n\n\n" + str(finalized_data))

    return finalized_data
