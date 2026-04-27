# Étape 1 : Build de l'application React/Vite
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : Serveur Nginx pour exposer les fichiers en production
FROM nginx:alpine
# On remplace la configuration par défaut de Nginx par la nôtre
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]