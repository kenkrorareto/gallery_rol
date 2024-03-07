import os
import json

# Ruta de la carpeta que contiene las imágenes
folder_path = "images"

# Ruta del archivo JSON de salida
output_json = "images.json"

# Verificar si la carpeta existe
if os.path.exists(folder_path) and os.path.isdir(folder_path):
    # Obtener la lista de archivos en la carpeta
    file_list = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]

    # Crear el diccionario para el archivo JSON
    json_data = {"images": [f"../images/{file_name}" for file_name in file_list]}

    # Escribir el diccionario en el archivo JSON
    with open(output_json, "w") as json_file:
        json.dump(json_data, json_file, indent=4)

    print(f"Archivo JSON creado correctamente: {output_json}")
else:
    print(f"La carpeta no existe: {folder_path}")
