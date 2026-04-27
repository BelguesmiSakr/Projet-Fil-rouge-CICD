# Utiliser une image Node.js légère
FROM node:22-alpine

# Définir le dossier de travail dans le conteneur
WORKDIR /app

# Copier uniquement les fichiers de dépendances pour optimiser le cache Docker
COPY package*.json ./
RUN npm install

# Copier le reste du code source
COPY . .

# Exposer le port sur lequel votre API écoute (5050 selon votre config)
EXPOSE 5050

# Commande pour démarrer le serveur (on utilise node au lieu de nodemon en production)
CMD ["node", "index.js"]