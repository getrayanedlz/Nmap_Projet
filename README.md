# Nmap App

Lien github du projet nmap:  
https://github.com/getrayanedlz/Nmap_Projet

## Instructions avant de démarrer le serveur

- Créer un fichier `.env` dans le dossier <span style="color:red">backend</span>.

- Copier et Coller le contenu du fichier `.env.example`dans le fichier `.env`.

- Remplir les informations suivantes:

```
PORT=5000
DB_URI=<Lien vers la base de données MongoDB>
JWT_SECRET=<Token de 64 caractères sur https://it-tools.tech/token-generator>

```

## Instructions avant de démarrer le client

- Renseigner le lien vers l'API dans le fichier .env du dossier <span style="color:red"> **frontend**</span>:(Par défaut)

```
REACT_APP_BASE_API_URL=http://localhost:5000/
```
