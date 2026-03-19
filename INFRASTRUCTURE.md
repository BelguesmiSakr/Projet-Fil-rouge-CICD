# 🏗️ Documentation d'Infrastructure - Projet Fil Rouge (MyContacts)

Ce document décrit l'architecture technique, les environnements cloud et les pipelines d'intégration continue de l'application **MyContacts**.

## 1. Architecture Globale

L'application repose sur une architecture distribuée, séparant clairement la présentation, la logique métier et les données. L'hébergement est assuré sur le cloud **Microsoft Azure**.

- **Frontend (Client)** : Hébergé sur une Machine Virtuelle (VM) Azure dédiée.
- **Backend (API)** : Hébergé sur une seconde Machine Virtuelle (VM) Azure dédiée.
- **Base de données** : Service cloud MongoDB Atlas (DaaS).
- **CI/CD** : Automatisation gérée par un serveur Jenkins.

---

## 2. Infrastructure Cloud (Microsoft Azure)

### 🖥️ Machine Virtuelle Frontend
- **Rôle :** Héberger et servir les fichiers statiques de l'application React.
- **Exécution :** Sert les fichiers compilés situés dans le dossier `/dist` généré par Vite.
- **Ports réseau (NSG) :** `80` (HTTP) / `443` (HTTPS) pour le trafic web, et `22` (SSH) pour l'administration.

### ⚙️ Machine Virtuelle Backend
- **Rôle :** Exécuter le serveur API Node.js/Express.
- **Environnement :** Node.js 18+ (géré via un processus comme PM2 ou systemd en production).
- **Ports réseau (NSG) :** `5050` (API REST) et `22` (SSH).

---

## 3. Détails des Composants Applicatifs

### Frontend
- **Framework :** React.js + Vite.
- **Tests :** Vitest et React Testing Library (tests unitaires et d'interface).
- **Build :** Génération d'artefacts statiques optimisés (`npm run build`).

### Backend
- **Framework :** Node.js avec Express.js.
- **Sécurité :** JWT (JSON Web Tokens) pour l'authentification, Bcrypt pour le hachage cryptographique des mots de passe.
- **Tests :** Jest associé à `mongodb-memory-server` pour exécuter des tests d'intégration sans impacter la base de données de production.

### Base de données
- **Technologie :** MongoDB NoSQL.
- **Hébergement :** MongoDB Atlas (Cluster Cloud sécurisé).
- **Communication :** URI sécurisée via TLS depuis la VM Backend uniquement.

---

## 4. Intégration Continue (CI) - Jenkins

Le projet automatise la validation du code via des pipelines déclaratives Jenkins s'exécutant à chaque modification du dépôt.

### Pipeline Frontend (`client/Jenkinsfile.groovy`)
1. **Checkout :** Récupération du code source.
2. **Install :** Installation des dépendances via `npm install`.
3. **Test :** Exécution de la suite de tests Vitest en mode CI (`npm run test`).
4. **Build :** Compilation de l'application pour la production (`npm run build`).
5. **Archive :** Stockage de l'artefact généré (`dist/`) dans Jenkins, prêt pour le déploiement sur la VM Azure Frontend.

### Pipeline Backend (`server/Jenkinsfile.groovy`)
1. **Checkout :** Récupération du code source.
2. **Install :** Installation des dépendances (`npm install`).
3. **Test :** Exécution de la suite Jest (`npm test`). La base de données en mémoire est dynamiquement instanciée durant cette étape.

---

## 5. Sécurité et Environnement

L'infrastructure s'appuie sur des variables d'environnement (`.env`) qui ne sont **jamais** versionnées sur le dépôt Git.
La VM Backend nécessite le paramétrage suivant pour démarrer :
- `PORT=5050`
- `MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/mycontacts`
- `JWT_SECRET_KEY=<clé_secrète_jwt>`