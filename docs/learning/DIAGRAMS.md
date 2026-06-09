# Diagrams

Visual reference for all flows and interactions in the project.
Use this as a quick reference while coding or preparing for interviews.

---

## 1. Project hierarchy

```mermaid
graph TB
Vision --> Initiative
Initiative --> Epic
Epic --> UserStory[User Story]
UserStory --> Task
```

---

## 2. Three products, one system

```mermaid
graph TB
subgraph System
SA[Staff app]
BK[Booking site]
DA[Analytics dashboard]
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

## 3. Agent team

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

## 4. Agent configuration pattern

```mermaid
graph LR
SP[system prompt\nwho the agent is]
CT[context\nwhat it reads]
HR[harness\nwhat it can do]
SP --> Agent
CT --> Agent
HR --> Agent
Agent --> Output
```

---

## 5. Route / Controller / Service pattern

```mermaid
graph LR
Request --> Route
Route --> Controller
Controller --> Service
Service --> Database
Database --> Service
Service --> Controller
Controller --> Response
```

---

## 6. Auth flow — JWT

```mermaid
sequenceDiagram
participant C as Client
participant API as API
participant DB as Database

C->>API: POST /auth/login (email, password)
API->>DB: find staff by email
DB-->>API: staff record
API->>API: bcrypt.compare(password, hash)
API->>API: jwt.sign(id, role, expiration)
API-->>C: { token, staff }
```

---

## 7. Authenticated request flow

```mermaid
sequenceDiagram
participant C as Client
participant MW as Auth middleware
participant CT as Controller
participant SV as Service

C->>MW: GET /rooms (Authorization: Bearer token)
MW->>MW: jwt.verify(token)
MW-->>C: 401 Unauthorized (if invalid)
MW->>CT: next() (if valid)
CT->>SV: getRooms()
SV-->>CT: rooms[]
CT-->>C: { data: rooms[] }
```

---

## 8. Docker Compose — local setup

```mermaid
graph TB
subgraph docker-compose
APP[app container\nNode.js :3000]
DB[db container\nPostgreSQL :5432]
end
APP --> DB
DEV[developer] --> APP
DEV --> DB
```

---

## 9. CI/CD pipeline

```mermaid
graph LR
PUSH[git push] --> CI
subgraph CI
TEST[run tests]
BUILD[build Docker image]
PUSH2[push to registry]
TEST --> BUILD
BUILD --> PUSH2
end
PUSH2 --> DEPLOY[deploy to cloud]
```

---

## 10. Event-driven flow — phase 3

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
NT->>NT: send confirmation email
BR->>DL: BookingCreated
DL->>DL: store for analytics
```

---

## 11. Data pipeline — phase 5

```mermaid
graph LR
BR[Message broker\nKafka] --> S3[S3\nData lake]
S3 --> DBT[dbt\ntransformations]
DBT --> SF[Snowflake\nData warehouse]
SF --> MB[Metabase\nDashboards]
SF --> ML[ML models\nPricing]
```