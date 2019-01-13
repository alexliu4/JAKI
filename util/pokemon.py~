import urllib.request, json, os

def get_pokemon_image(pokemon):
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
