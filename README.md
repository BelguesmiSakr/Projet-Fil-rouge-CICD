# Projet Fil Rouge - CI/CD (Contact Manager)

Ce dépôt contient une application de gestion de contacts (MyContacts) complète avec une pipeline CI/CD automatisée.

- **Client** : Application Frontend (React, Vite, TailwindCSS).
- **API** : Backend (Node.js, Express) consommé par le client.
- **Base de données** : Cluster MongoDB (Atlas).
- **CI/CD** : Pipelines automatisées avec Jenkins.

## 🚀 Démarrage local

### 1. Backend (Serveur)
Placez-vous dans le dossier `/server` et créez un fichier `.env` avec vos variables (ex: `MONGO_URI`, `PORT=5050`, `JWT_SECRET_KEY`).
```bash
cd server
npm install
npm run dev
```

### 2. Frontend (Client)
Dans un nouveau terminal, placez-vous dans le dossier `/client`.
```bash
cd client
npm install
npm run dev
```

## 🧪 Tests

Des tests unitaires et d'intégration documentés sont disponibles pour les deux parties du projet.

**Tests Frontend (Vitest) :**
```bash
cd client
npm test
```
