# Utiliser une image Node.js comme point de départ
FROM node:lts

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de l'application dans le conteneur
COPY . .

# Installer les dépendances
RUN npm install --ignore-fund --audit false

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application Next.js
CMD npm run build && npm run start
