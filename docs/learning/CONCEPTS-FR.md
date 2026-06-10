# Concepts

Document vivant. Mis à jour au fur et à mesure du projet.
À relire régulièrement et à utiliser pour préparer les entretiens techniques.

---

## 1. Méthodologie projet

### Hiérarchie des besoins
    Vision
        └── Initiative    objectif stratégique (semaines à mois)
                └── Epic    chantier fonctionnel (jours à semaines)
                        └── User Story    un besoin utilisateur
                                    └── Task    une unité de travail

### Format d'une User Story
    En tant que [rôle],
    je veux [action],
    afin de [bénéfice métier].

    Critères d'acceptance :
    - [ ] comportement précis et testable

### ADR — Architecture Decision Record
Un court document qui capture une décision technique :
pourquoi elle a été prise, quelles alternatives ont été considérées,
et quelles en sont les conséquences.
Versionné dans le repo avec le code.

### Docs-first
On documente les décisions avant d'écrire le code.
Le repo est la source de vérité unique pour le code et les décisions.

---

## 2. Patterns d'architecture

### Monolithe vs Microservices
Un monolithe est une seule application qui fait tout.
Les microservices découpent les responsabilités en services indépendants,
chacun avec sa propre base de code et sa propre base de données.

On commence par un monolithe (ou un POC). On découpe en microservices
quand on ressent les limites de tout garder ensemble.

### Une base de données par service
Dans une architecture microservices, chaque service possède ses données.
Aucun service ne lit ou n'écrit directement dans la base d'un autre service.
Ils communiquent via des APIs ou des événements.

### API Gateway
Point d'entrée unique pour toutes les requêtes des clients.
Il route les requêtes vers le bon service, gère l'authentification,
et peut appliquer un rate limiting.

    Client → API Gateway → service-auth
                        → service-bookings
                        → service-hotels

### Architecture Event-Driven
Au lieu que les services s'appellent directement (couplage fort),
ils publient et consomment des événements via un broker (couplage faible).

    service-bookings    publie    BookingCreated
    message broker      le route vers les consommateurs
    service-notifications  consomme  BookingCreated → envoie un email
    data lake              consomme  BookingCreated → stocke pour analytics

Avantage clé : les services n'ont pas besoin de se connaître.

### Conventions REST
    GET     /ressources           liste
    GET     /ressources/:id       récupérer un élément
    POST    /ressources           créer
    PATCH   /ressources/:id       mise à jour partielle
    DELETE  /ressources/:id       supprimer

Format des réponses :
    succès    { data: any, message?: string }
    erreur    { error: string, code: string }

---

## 3. Concepts Backend

### Express
Le framework web le plus populaire pour Node.js.
Gère le routing, les middlewares, et les requêtes/réponses HTTP.

### Pattern Route / Controller / Service

    Route       définit l'URL et la méthode HTTP
    Controller  valide les inputs, appelle le service, formate la réponse
    Service     logique métier pure, sans connaissance du HTTP

Pourquoi les séparer :
- Les services peuvent être testés sans HTTP
- Les controllers restent légers et lisibles
- La logique métier est réutilisable

Flux exemple pour POST /api/v1/auth/login :

    routes/auth.js          reçoit la requête
            ↓
    authController.js       valide email + password
            ↓
    authService.js          vérifie en base, génère le token
            ↓
    réponse JSON            token + infos staff

### Codes HTTP de réponse

Le code HTTP dans la réponse indique le résultat de la requête.

    200   OK                  requête traitée, réponse retournée
    201   Created             ressource créée avec succès
    400   Bad Request         données invalides envoyées par le client
    401   Unauthorized        non authentifié
    403   Forbidden           authentifié mais pas autorisé
    404   Not Found           ressource introuvable
    409   Conflict            conflit — ex. doublon sur un champ unique
    500   Internal Server Error  erreur côté serveur

Utiliser le bon code rend l'API lisible pour les clients
et les outils de monitoring.

### Middleware
Une fonction qui s'exécute entre la requête et le handler de route.
Utilisée pour l'authentification, les logs, la gestion des erreurs, etc.

    Requête → middleware → middleware → handler de route → réponse

### CORS — Cross Origin Resource Sharing
Un mécanisme de sécurité des navigateurs qui bloque par défaut
les requêtes venant d'un domaine différent.

    Frontend sur  http://localhost:3001
    API sur       http://localhost:3000
    Sans CORS → le navigateur bloque la requête
    Avec CORS → l'API l'autorise explicitement

### JWT — JSON Web Token
Un mécanisme d'authentification sans état (stateless).

Flux :
    1. L'utilisateur se connecte avec email + password
    2. Le serveur vérifie les credentials
    3. Le serveur génère un token JWT signé
    4. Le client stocke le token (localStorage dans le POC)
    5. Le client envoie le token dans chaque requête suivante
    6. Le serveur vérifie la signature du token — sans accès à la base

Structure :
    Header     algorithme utilisé
    Payload    données (id, rôle, expiration)
    Signature  garantit que le token n'a pas été modifié

Avantage par rapport aux sessions : le serveur ne stocke rien.
Le token est auto-suffisant.

### bcrypt
Un algorithme de hachage pour les mots de passe.
On ne stocke jamais un mot de passe en clair.
bcrypt transforme un mot de passe en hash irréversible.

    bcrypt.hash('monpassword', 10)      → '$2b$10$...'
    bcrypt.compare('monpassword', hash) → true ou false

### ORM — Prisma
Un Object Relational Mapper.
Au lieu d'écrire du SQL brut, on définit son schéma en code
et Prisma génère les requêtes.

    prisma.booking.findMany({ where: { status: 'CONFIRMED' } })
    est équivalent à :
    SELECT * FROM bookings WHERE status = 'CONFIRMED'

### Migration de base de données
Une migration traduit le schéma Prisma en tables SQL réelles.
Elle génère un fichier SQL versionné dans le repo.

    npx prisma migrate dev --name init    crée et applique la migration
    npx prisma migrate deploy             applique les migrations en production

Chaque migration s'applique une seule fois. Prisma garde l'historique
dans la base (`_prisma_migrations`) et dans `src/prisma/migrations/`.
Si le schéma change, on crée une nouvelle migration — on ne modifie
jamais une migration déjà appliquée.

### binaryTargets Prisma
Prisma génère un binaire natif adapté à l'OS cible.
Si on développe sur Mac et qu'on déploie dans Docker Linux,
il faut déclarer les deux cibles dans le schema :

    binaryTargets = ["native", "linux-musl-arm64-openssl-3.0.x"]

Sans ça, l'app plante dans le container avec une erreur de binaire introuvable.

### include et select — Prisma
`include` demande à Prisma de joindre les tables liées dans la même requête.
`select` à l'intérieur limite les champs retournés.

    prisma.booking.create({
      data: { ... },
      include: {
        room: { select: { number: true, type: true, rate: true } },
        guest: { select: { firstName: true, lastName: true, email: true } },
      }
    })

Sans include, Prisma retourne uniquement les IDs des relations.
Avec include, les données sont jointes directement dans la réponse —
pas besoin de faire plusieurs appels séparés.

---

## 4. Concepts DevOps

### Docker
Empaquète une application et tout ce dont elle a besoin pour tourner
dans un container portable.
Fonctionne de façon identique sur n'importe quelle machine.

Fichiers clés :
    Dockerfile         instructions pour construire l'image du container
    .env.example       liste les variables d'environnement requises (sans valeurs)
    .dockerignore      fichiers à exclure de l'image

### Docker Compose
Orchestre plusieurs containers ensemble.
Un seul fichier, une seule commande pour tout lancer.

    docker-compose up    démarre tous les containers
    docker-compose down  arrête tous les containers

### Variables d'environnement
Valeurs de configuration qui vivent en dehors du code.
On ne hardcode jamais les secrets, URLs ou credentials.

    DATABASE_URL=postgresql://...
    JWT_SECRET=...
    PORT=3000

### CI/CD — Intégration Continue / Déploiement Continu
    CI   lance automatiquement les tests à chaque push
    CD   déploie automatiquement quand les tests passent

Pipeline :
    push sur GitHub → tests → build image Docker → déploiement

### GitHub Actions
Outil CI/CD intégré à GitHub.
Les workflows sont définis dans .github/workflows/*.yml
et déclenchés par des événements git (push, pull request, merge).

---

## 5. Concepts Data

### Pipeline de données
Le flux de données des systèmes opérationnels vers l'analytics.

    Événements (Kafka) → stockage brut (S3) → transformation (dbt) → entrepôt (Snowflake)

### dbt — data build tool
Transforme les données brutes dans l'entrepôt via SQL.
Les modèles sont versionnés, testés et documentés comme du code.

### Snowflake
Un entrepôt de données cloud optimisé pour les requêtes analytiques.
Sépare le stockage et le calcul — on ne paie que ce qu'on utilise.

### Modélisation dimensionnelle
Une technique de modélisation des données pour l'analytics.
    Tables de faits       événements mesurables (réservations, paiements)
    Tables de dimensions  contexte descriptif (chambres, clients, dates)

---

## 6. Concepts agents IA

### Context Engineering
L'art de donner le bon contexte au bon moment à un agent IA.
Pas juste un prompt — tout ce dont l'agent a besoin pour produire
un résultat utile : documents, état courant, contraintes, historique.

### System Prompt
Définit l'identité de l'agent, ses responsabilités, ses règles
et le format de ses outputs.
Lu au début de chaque session.

### Harness
Le cadre d'exécution autour d'un agent.
Définit les outils autorisés, les actions interdites,
les vérifications avant action, et les limites de session.
Empêche l'agent de partir en roue libre.

### Architecture multi-agents
Plusieurs agents spécialisés collaborent sur un projet.
Chacun possède un domaine. Un orchestrateur (agent PM) coordonne le travail.

    PM → Backend, Frontend, DevOps, QA, Data, Doc