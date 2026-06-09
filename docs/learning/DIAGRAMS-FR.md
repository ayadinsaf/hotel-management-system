# Schémas

Référence visuelle de tous les flux et interactions du projet.
À consulter rapidement pendant le développement ou pour préparer des entretiens.

---

## 1. Hiérarchie du projet

```mermaid
graph TB
Vision --> Initiative
Initiative --> Epic
Epic --> UserStory[User Story]
UserStory --> Task
```

---

## 2. Trois produits, un seul système

```mermaid
graph TB
subgraph Système
SA[Staff app]
BK[Site de réservation]
DA[Dashboard analytics]
end
subgraph Core
GW[API Gateway]
AUTH[service-auth]
HOTELS[service-hotels]
BOOKINGS[service-bookings]
GUESTS[service-guests]
end
SA --> GW
BK --> GW
DA --> GW
GW --> AUTH
GW --> HOTELS
GW --> BOOKINGS
GW --> GUESTS
```

---

## 3. Équipe d'agents

```mermaid
graph TB
PM --> Backend
PM --> Frontend
PM --> DevOps
PM --> QA
PM --> Data
PM --> Doc
```

---

## 4. Pattern de configuration d'un agent

```mermaid
graph LR
SP[system prompt\nqui est l'agent]
CT[context\nce qu'il lit]
HR[harness\nce qu'il peut faire]
SP --> Agent
CT --> Agent
HR --> Agent
Agent --> Output[résultat]
```

---

## 5. Pattern Route / Controller / Service

```mermaid
graph LR
Requête --> Route
Route --> Controller
Controller --> Service
Service --> Base[Base de données]
Base --> Service
Service --> Controller
Controller --> Réponse
```

---

## 6. Flux d'authentification — JWT

```mermaid
sequenceDiagram
participant C as Client
participant API as API
participant DB as Base de données

C->>API: POST /auth/login (email, password)
API->>DB: cherche le staff par email
DB-->>API: enregistrement staff
API->>API: bcrypt.compare(password, hash)
API->>API: jwt.sign(id, role, expiration)
API-->>C: { token, staff }
```

---

## 7. Flux d'une requête authentifiée

```mermaid
sequenceDiagram
participant C as Client
participant MW as Middleware auth
participant CT as Controller
participant SV as Service

C->>MW: GET /rooms (Authorization: Bearer token)
MW->>MW: jwt.verify(token)
MW-->>C: 401 Non autorisé (si invalide)
MW->>CT: next() (si valide)
CT->>SV: getRoooms()
SV-->>CT: rooms[]
CT-->>C: { data: rooms[] }
```

---

## 8. Docker Compose — setup local

```mermaid
graph TB
subgraph docker-compose
APP[container app\nNode.js :3000]
DB[container db\nPostgreSQL :5432]
VOL[(volume\npostgres_data)]
end
APP -->|DATABASE_URL| DB
DB -->|persistance| VOL
DEV[développeur\nlocalhost] -->|curl :3000| APP
DEV -->|prisma studio :5555| DB
```

---

## 8b. Flux de migration Prisma

```mermaid
sequenceDiagram
participant Dev as Développeur
participant Schema as schema.prisma
participant Prisma as Prisma CLI
participant DB as PostgreSQL

Dev->>Schema: modifie le schéma
Dev->>Prisma: prisma migrate dev --name init
Prisma->>Schema: lit les modèles
Prisma->>DB: compare avec l'état actuel
Prisma->>DB: applique le SQL généré
Prisma-->>Dev: migrations/ créé et appliqué
```

---

## 9. Pipeline CI/CD

```mermaid
graph LR
PUSH[git push] --> CI
subgraph CI
TEST[tests automatiques]
BUILD[build image Docker]
PUSH2[push vers le registry]
TEST --> BUILD
BUILD --> PUSH2
end
PUSH2 --> DEPLOY[déploiement cloud]
```

---

## 10. Flux event-driven — phase 3

```mermaid
sequenceDiagram
participant Staff as Staff app
participant BK as service-bookings
participant BR as Message broker
participant NT as service-notifications
participant DL as Data lake

Staff->>BK: POST /bookings
BK->>BR: BookingCreated
BK-->>Staff: 201 Created
BR->>NT: BookingCreated
NT->>NT: envoie email de confirmation
BR->>DL: BookingCreated
DL->>DL: stocke pour analytics
```

---

## 11. Pipeline data — phase 5

```mermaid
graph LR
BR[Message broker\nKafka] --> S3[S3\nData lake]
S3 --> DBT[dbt\ntransformations]
DBT --> SF[Snowflake\nEntrepôt de données]
SF --> MB[Metabase\nDashboards]
SF --> ML[Modèles ML\nPricing]
```