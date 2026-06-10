# Journal de projet

Journal chronologique de tout ce qui a été construit et appris.
À relire pour se rappeler pourquoi les décisions ont été prises
et comment le projet a évolué.

---

## Étape 1 — Création du repo GitHub

On a créé le repo `hotel-management-system` sur GitHub.
C'est la source de vérité unique pour tout le code et la documentation.

Configuration :
- Repo public
- README initialisé
- .gitignore configuré sur Node
- Licence MIT

**Tips :**
- Toujours initialiser avec un README pour que le repo ne soit pas vide
- Ajouter le .gitignore à la création, pas après — évite de commiter
  des fichiers indésirables
- Les fichiers .DS_Store sont créés automatiquement par macOS — les ajouter
  au .gitignore immédiatement

---

## Étape 2 — Installation de Node.js et Claude Code

Node.js est le runtime qui exécute JavaScript en dehors du navigateur.
Claude Code est l'outil CLI qui fait tourner les agents IA dans le terminal.

    brew install node
    npm install -g @anthropic-ai/claude-code

**Tips :**
- Homebrew est le gestionnaire de paquets standard sur macOS
- Node.js s'installe globalement — vérification : node --version
- Claude Code nécessite un abonnement Claude Pro pour fonctionner

---

## Étape 3 — Clonage du repo et ouverture dans VS Code

    cd ~/projects
    git clone https://github.com/ayadinsaf/hotel-management-system
    cd hotel-management-system
    code .

La commande `code .` ouvre le dossier courant directement dans VS Code.
Elle nécessite d'activer la commande shell d'abord via Cmd + Shift + P
→ Shell Command: Install 'code' command in PATH.

**Tips :**
- Garder tous les projets dans ~/projects — propre et cohérent
- Ouvrir VS Code depuis le terminal avec `code .` plutôt que de glisser
  des dossiers — plus rapide et moins d'erreurs

---

## Étape 4 — Création de la structure de documentation

Avant d'écrire la moindre ligne de code, on a créé la structure de documentation.
C'est le principe docs-first — les décisions sont documentées
avant d'être implémentées.

    docs/product/       vision, initiatives, roadmap, UX
    docs/architecture/  schémas système
    docs/agents/        équipe d'agents, prompts, contextes, harness
    docs/epics/         épics et user stories
    docs/learning/      concepts, tips, journal, schémas

**Tips :**
- La doc qui vit dans le repo reste synchronisée avec le code
- Ne jamais mettre les décisions d'architecture uniquement dans Notion
  ou Google Drive
- Un nouveau membre de l'équipe (ou un agent) doit comprendre le projet
  en lisant docs/ uniquement

---

## Étape 5 — Rédaction du README.md

Le README est la page d'accueil du projet.
C'est le premier fichier que tout le monde voit en arrivant sur le repo GitHub.
Il répond à : c'est quoi, ça fait quoi, comment je le lance.

Le garder honnête et à jour. Un README qui décrit un état futur est trompeur.

**Tips :**
- Écrire en anglais — convention universelle en tech
- Pas d'emojis, pas de langage marketing — écrire pour des développeurs
- Mettre à jour le README à chaque changement de structure du projet

---

## Étape 6 — Rédaction du VISION.md

Le document de vision répond à trois questions :
- Quel problème est-ce qu'on résout ?
- Qui sont les utilisateurs ?
- Qu'est-ce qu'on construit et dans quel ordre ?

C'est le document de référence de tout le projet.
Chaque agent le lit avant de travailler.

**Tips :**
- Le garder court — une page maximum
- La roadmap dans VISION.md est haut niveau
  La planification détaillée des sprints vit dans ROADMAP.md
- Si on ne peut pas résumer la vision en trois phrases,
  le périmètre du projet n'est pas encore assez clair

---

## Étape 7 — Rédaction de INITIATIVES.md

Les initiatives sont les objectifs stratégiques du projet.
Elles se situent au-dessus des épics dans la hiérarchie.

    Initiative → Epic → User Story → Task

Chaque initiative correspond à une phase dans la roadmap.

Schéma : voir DIAGRAMS-FR.md — Hiérarchie du projet

**Tips :**
- Les initiatives doivent être stables — elles changent rarement
- Si une initiative change souvent, c'est probablement une épic

---

## Étape 8 — Rédaction de SYSTEM.md

Le document d'architecture système décrit comment toutes les pièces
s'assemblent. Il contient des schémas Mermaid pour chaque phase
architecturale.

Mermaid est un langage de diagrammes basé sur du texte.
Les schémas sont versionnés dans le repo — pas d'images perdues
dans Google Drive.

    graph TB        schéma de haut en bas
    sequenceDiagram interactions entre composants dans le temps
    graph LR        schéma de gauche à droite

GitHub rend Mermaid nativement.
VS Code a besoin de l'extension Markdown Preview Mermaid Support.

Schéma : voir DIAGRAMS-FR.md — Trois produits, un seul système

**Tips :**
- Les triple backticks des blocs Mermaid doivent être collés à gauche
  Pas d'indentation, sinon le schéma ne s'affiche pas
- En cas de doute, pusher sur GitHub pour vérifier le rendu
- Garder un schéma par phase architecturale — plus facile à lire

---

## Étape 9 — Rédaction de TEAM.md

Le team charter définit l'équipe d'agents.
Chaque agent a un rôle, des inputs, des outputs et des outils autorisés.

    PM          orchestre, écrit les épics et user stories
    Backend     construit les microservices et APIs
    Frontend    construit les interfaces utilisateur
    DevOps      gère les containers, CI/CD, déploiement
    QA          écrit les tests, valide les livrables
    Data        construit le pipeline data et les modèles dbt
    Doc         maintient la documentation synchronisée avec le code

Schéma : voir DIAGRAMS-FR.md — Équipe d'agents

**Tips :**
- Définir ce que chaque agent ne peut pas faire, pas seulement ce qu'il peut faire
- Les agents communiquent via les fichiers dans docs/ et les GitHub issues
- L'agent PM est le seul à créer des GitHub issues

---

## Étape 10 — Configuration de l'agent PM

Chaque agent a trois fichiers de configuration :

    system-pm.md    identité, responsabilités, règles, templates d'output
    ctx-pm.md       quoi lire et quand, signaux de bon/mauvais contexte
    harness-pm.md   outils autorisés, outils interdits, vérifications préalables

C'est le pattern context engineering + harness.
Il empêche les agents de partir en roue libre et de produire
des résultats inutiles.

Schéma : voir DIAGRAMS-FR.md — Pattern de configuration d'un agent

**Tips :**
- Le system prompt doit être complet — les agents n'ont pas de mémoire
  entre les sessions. Chaque session repart de zéro.
- Mauvais contexte = mauvais output. Si un agent produit des résultats
  incorrects, vérifier ce qu'il avait à lire, pas seulement ce qu'on
  lui a demandé de faire.
- Définir des limites de session — 10 user stories maximum par session
  maintient la qualité

---

## Étape 11 — Rédaction de CLAUDE.md

CLAUDE.md est lu automatiquement par Claude Code au démarrage
de chaque session. C'est le point d'entrée de tout le système d'agents.

Il contient :
- Résumé du projet
- Structure du repo
- Comment invoquer chaque agent
- Phase courante et épic active
- Conventions de code

**Tips :**
- Garder CLAUDE.md à jour — c'est ce que Claude Code lit en premier
- Mettre à jour l'épic active à chaque début de nouvelle phase
- La section conventions évite que les agents fassent des choix incohérents

---

## Étape 12 — Rédaction des épics

### Epic 00 — POC
L'épic POC couvre le flux de réservation minimum viable.
Une seule app, une seule base de données, interface basique.
Pas de microservices.

Objectif : voir quelque chose fonctionner le plus vite possible.
Éviter l'effet tunnel — des semaines de setup avant de voir un résultat.

### Epic 01 — Fondations
Découper le POC en microservices.
Chaque service possède son domaine et sa base de données.
Dépend de la completion de l'Epic 00.

**Tips :**
- Une épic à la fois — ne pas commencer l'epic 01 avant que l'epic 00
  soit terminée
- Le scope creep est la principale raison pour laquelle les projets s'enlisent
- Les critères de complétion d'une épic sont plus importants que
  les user stories — ils définissent ce que "terminé" veut vraiment dire

---

## Étape 13 — Rédaction de ROADMAP.md

La roadmap donne la vue d'ensemble : phases, calendrier et budget.

    Phase 0    POC                    maintenant → fin juin 2026
    Phase 1    Microservices          juillet - août 2026
    Phase 2    Staff app              septembre - octobre 2026
    Phase 3    Event-driven           novembre 2026
    Phase 4    Site de réservation    décembre 2026
    Phase 5    Pipeline data          janvier - février 2027
    Phase 6    ML et pricing          mars - avril 2027

Budget : ~18€/mois (Claude Pro + AWS free tier + Snowflake trial)

**Tips :**
- Estimer en durées, pas en dates fixes — les projets glissent
- Budgéter pour les outils qu'on va vraiment utiliser, pas ceux
  qu'on prévoit d'utiliser
- La planification des sprints et les découpages détaillés sont ajoutés
  au début de chaque phase, pas à l'avance — on en sait plus à ce moment-là

---

## Étape 14 — Rédaction de UX.md

Le document UX décrit chaque écran de la staff app.
Pas une maquette — un wireframe textuel.

Pour chaque écran :
- Objectif : ce que l'utilisateur veut accomplir
- Contenu : ce qu'il voit
- Actions : ce qu'il peut faire
- Comportement : ce qui se passe quand il agit

Les quatre écrans du POC :
    Login        s'authentifier et accéder à l'app
    Dashboard    comprendre l'état de l'hôtel d'un coup d'œil
    Réservations voir toutes les réservations et en créer de nouvelles
    Chambres     voir le statut des chambres et gérer la disponibilité

**Tips :**
- Définir l'UX avant d'écrire le code backend
  L'API doit supporter ce que l'interface a besoin, pas l'inverse
- Un écran, un job — si un écran fait deux choses, le découper
- Le dashboard est toujours l'écran le plus important
  C'est ce que l'utilisateur voit en premier chaque matin

---

## Étape 15 — Configuration de l'agent Backend

Même pattern que l'agent PM — trois fichiers :

    system-backend.md    Node.js, Express, Prisma, Jest, structure du projet
    ctx-backend.md       ordre d'implémentation, quoi lire par tâche
    harness-backend.md   outils autorisés, chemins interdits, conventions de commit

L'ordre d'implémentation est important :
    1. Setup du projet et Docker
    2. Schéma de base de données
    3. Routes auth
    4. Routes rooms
    5. Routes guests
    6. Routes bookings
    7. Route dashboard

Schéma : voir DIAGRAMS-FR.md — Pattern de configuration d'un agent

**Tips :**
- Toujours implémenter l'auth en premier — tout le reste en dépend
- Définir le schéma de base de données avant d'écrire la moindre route
  Les changements de schéma sont coûteux une fois qu'on a des données
- Une user story par session d'agent — au-delà la qualité baisse

---

## Étape 16 — Création du squelette du POC

Fichiers créés avant que Claude Code écrive l'implémentation réelle :

    poc/src/prisma/schema.prisma    schéma de base de données
    poc/.env.example                variables d'environnement requises
    poc/README.md                   instructions de setup
    poc/Dockerfile                  définition du container
    poc/docker-compose.yml          orchestration locale
    poc/package.json                dépendances et scripts
    poc/src/index.js                point d'entrée de l'app
    poc/src/middleware/auth.js      middleware de vérification JWT

Schéma : voir DIAGRAMS-FR.md — Docker Compose setup local

**Tips :**
- Créer le squelette avant de lancer Claude Code
  Les agents produisent de meilleurs résultats quand la structure existe déjà
- Le Dockerfile doit utiliser node:18-alpine — plus léger et plus rapide
- Toujours définir un volume nommé pour le container de base de données
  Sans ça, les données sont perdues à chaque arrêt du container
- Le .env.example est obligatoire — c'est le contrat entre
  le code et l'environnement

---

## Étape 18 — Installation de Docker Desktop

Docker Desktop est l'application macOS qui fait tourner le daemon Docker.
Sans elle, les commandes `docker` et `docker compose` ne fonctionnent pas.

Installation : télécharger depuis docker.com et lancer l'app.
Vérification : `docker info` doit afficher la version du client.

**Tips :**
- Docker Desktop doit être lancé (icône dans la barre de menu) avant
  d'utiliser les commandes docker
- Sur Mac Apple Silicon (M1/M2/M3), Docker tourne dans une VM Linux légère
  — c'est pour ça que les images Linux fonctionnent sur macOS

---

## Étape 19 — Préparation de l'app pour le démarrage

Trois corrections nécessaires avant de pouvoir lancer l'app :

**1. Déclaration du chemin du schema Prisma**
Prisma cherche son schema à `prisma/schema.prisma` par défaut.
Notre schema est dans `src/prisma/schema.prisma`.
Il faut le déclarer dans `package.json` :

    "prisma": { "schema": "src/prisma/schema.prisma" }

**2. Routes stubs**
`src/index.js` importe 5 fichiers de routes. Seul `auth.js` existait.
Sans les autres, l'app plante au démarrage avec `Cannot find module`.
On crée des fichiers vides pour `rooms`, `guests`, `bookings`, `dashboard`.
Ils seront implémentés dans US-002 à US-006.

**3. binaryTargets Prisma**
Prisma génère un binaire natif adapté à l'OS.
Le Mac utilise `native`, le container Linux arm64 sur Docker utilise
`linux-musl-arm64-openssl-3.0.x`. Sans les déclarer tous les deux,
l'app plante dans Docker car le bon binaire est absent.

    binaryTargets = ["native", "linux-musl-arm64-openssl-3.0.x"]

**Tips :**
- Alpine Linux est ultra-léger mais n'inclut pas OpenSSL par défaut
  Ajouter `RUN apk add --no-cache openssl` dans le Dockerfile
- Quand on change les binaryTargets, il faut reconstruire l'image
  Docker entièrement avec `docker compose down -v && docker compose up --build`
  Le `-v` supprime les volumes — nécessaire pour vider le cache de node_modules

---

## Étape 20 — Lancement de l'environnement local

    docker compose up -d          démarre PostgreSQL et l'app Node.js
    npx prisma migrate dev --name init   crée les tables en base

Résultat : l'app répond `{"status":"ok"}` sur `http://localhost:3000/health`.

Tables créées par la migration : `Staff`, `Room`, `Guest`, `Booking`.

La migration génère un fichier SQL dans `src/prisma/migrations/` —
il est versionné dans le repo. C'est la trace de toute l'évolution
du schéma de base de données.

**Tips :**
- `docker compose up -d` : le `-d` lance en arrière-plan (detached)
  Sans `-d`, les logs s'affichent dans le terminal et Ctrl+C arrête tout
- `docker compose logs -f app` : voir les logs de l'app en temps réel
- `docker compose down` : arrête les containers (les données survivent)
- `docker compose down -v` : arrête ET supprime les volumes (données perdues)
  À utiliser uniquement pour repartir de zéro
- Une migration ne s'applique qu'une fois — Prisma garde l'historique
  Si on remodifie le schema, on crée une nouvelle migration

---

## Étape 21 — Test du login (US-001)

Pour tester une route qui écrit ou lit en base, il faut des données.
On crée un script de seed : un fichier qui insère des utilisateurs de test
avec un mot de passe haché via bcrypt.

Fichier créé : `poc/src/prisma/seed.js`
Déclaré dans `package.json` : `"seed": "node src/prisma/seed.js"`
Commande : `npx prisma db seed`

Deux utilisateurs créés :
- `manager@hotel.com` — rôle MANAGER
- `reception@hotel.com` — rôle RECEPTIONIST
- mot de passe commun : `password123`

Test du login :

    curl -X POST http://localhost:3000/api/v1/auth/login \
      -H "Content-Type: application/json" \
      -d '{"email": "reception@hotel.com", "password": "password123"}'

Réponse : token JWT + infos staff (sans mot de passe).

**Tips :**
- `upsert` = insert OR update — permet de relancer le seed sans erreur de doublon
- Coller le token sur jwt.io pour voir son contenu décodé — utile pour débugger
- Le mot de passe n'est jamais retourné dans la réponse — vérifier ça dans chaque route
- Prisma Studio (`npx prisma studio` depuis `poc/`) permet de voir les données
  en temps réel sans écrire de SQL

---

## Étape 17 — Implémentation de l'authentification

Fichiers créés :

    poc/src/routes/auth.js               POST /auth/login
    poc/src/controllers/authController.js
    poc/src/services/authService.js

Le pattern Route / Controller / Service :

    Route       définit l'URL et le verbe HTTP
    Controller  valide les inputs, appelle le service, formate la réponse
    Service     logique métier pure — sans connaissance du HTTP

Schéma : voir DIAGRAMS-FR.md — Pattern Route / Controller / Service
Schéma : voir DIAGRAMS-FR.md — Flux d'authentification JWT
Schéma : voir DIAGRAMS-FR.md — Flux d'une requête authentifiée

**Tips :**
- Mettre la logique dans les services, pas dans les controllers
  Si on ne peut pas tester sans serveur HTTP, c'est au mauvais endroit
- Toujours retourner la même erreur pour un mauvais email et un mauvais password
  Des messages séparés révèlent des informations aux attaquants
- Les tokens JWT sont stateless — le serveur ne stocke rien
  Le token porte l'id utilisateur, le rôle et l'expiration
- Ne jamais stocker les mots de passe en clair
  bcrypt les hache de façon irréversible avant de les stocker

## Étape 22 — Création d'une chambre (US-002)

Première route CRUD du projet. Pas de logique métier complexe —
l'objectif est d'ancrer le pattern Route / Controller / Service
avant d'attaquer les réservations.

Fichiers créés :

    poc/src/services/roomService.js        logique d'insertion en base
    poc/src/controllers/roomController.js  extraction req.body, réponse HTTP
    poc/src/routes/rooms.js                remplacement du stub US-000

Le flux complet :

    POST /api/v1/rooms
      → index.js monte le router sur /api/v1/rooms
      → routes/rooms.js branche POST / sur createRoomHandler
      → roomController.js extrait number, type, capacity, rate
      → roomService.js appelle prisma.room.create()
      → Prisma insère en base et retourne l'objet créé

Champs envoyés : number, type, capacity, rate.
Champs gérés automatiquement : id (uuid), status (AVAILABLE), createdAt, updatedAt.

Cas d'erreur testés :
- Doublon sur number → Prisma retourne "Unique constraint failed"
- Type invalide (hors enum RoomType) → Prisma retourne "Invalid value for argument type"

**Tips :**
- Le service ne sait pas qu'il y a une requête HTTP — il reçoit un objet,
  il insère, il retourne. C'est ce qui le rend réutilisable depuis
  un seed, un test, ou une autre partie du code.
- Le controller ne touche jamais Prisma directement — toujours passer
  par le service.
- Le code HTTP 201 signifie "ressource créée" — différent du 200 "ok".
  Utiliser le bon code rend l'API plus lisible pour les clients.
- prisma.room.create() — Prisma expose les modèles en minuscule.
  Le modèle s'appelle Room dans le schéma, on l'appelle via prisma.room.

## Étape 23 — Création d'un profil client (US-003)

Même pattern que US-002. Pas de nouveau concept —
l'objectif est d'ancrer la mécanique Route / Controller / Service
sur un deuxième cas concret.

Fichiers créés :

    poc/src/services/guestService.js        logique d'insertion en base
    poc/src/controllers/guestController.js  extraction req.body, réponse HTTP
    poc/src/routes/guests.js                remplacement du stub US-000

Le modèle Guest existait déjà dans le schéma Prisma et la migration
était déjà appliquée — pas de nouvelle migration nécessaire.

Cas d'erreur testés :
- Doublon sur email → service vérifie en amont avec findUnique → 409
- Champs obligatoires manquants → controller valide → 400

Pourquoi vérifier l'email dans le service plutôt que laisser Prisma échouer :
Prisma lancerait une erreur générique P2002 sur la contrainte @unique.
En vérifiant en amont avec findUnique, on retourne un 409 explicite
avec un message lisible. Le controller n'a pas à connaître
les codes d'erreur internes de Prisma.

**Tips :**
- L'erreur Prisma sur un @unique est P2002 — utile à connaître
  si on veut centraliser la gestion des erreurs plus tard
- phone est optionnel dans le schéma (String?) — ne pas l'inclure
  dans la validation obligatoire du controller